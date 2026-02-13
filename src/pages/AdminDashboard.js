import React, { useState, useEffect } from 'react';
import { 
  Lock, Trash2, Users, Trophy, Radio, MessageSquare, 
  LayoutDashboard, Plus, Send, Zap, ClipboardList, 
  RefreshCw, MapPin, Calendar, Activity, ChevronRight, 
  CheckCircle, Maximize2, X, Shield
} from 'lucide-react';

// --- CONFIG ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@700&display=swap');
  
  body { font-family: 'Inter', sans-serif; background: #020617; color: #f8fafc; margin: 0; height: 100vh; overflow: hidden; }
  .oswald { font-family: 'Oswald', sans-serif; letter-spacing: 0.5px; }
  .glass { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.05); }
  
  .btn-lime { background: #a3e635; color: #020617; font-weight: 700; transition: 0.3s; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; justify-content: center; text-transform: uppercase; }
  .btn-lime:hover { background: #bef264; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(163, 230, 53, 0.3); }
  
  .nav-item { transition: 0.2s; cursor: pointer; border-radius: 12px; color: #94a3b8; padding: 12px 18px; display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 500; }
  .nav-active { background: rgba(163, 230, 53, 0.1) !important; color: #a3e635 !important; border: 1px solid rgba(163, 230, 53, 0.1); }
  
  select { background: #0f172a; border: 1px solid #334155; color: white; padding: 8px 12px; border-radius: 8px; outline: none; cursor: pointer; font-size: 12px; }

  /* COBRA ANIMATION */
  .cobra-loader {
    position: absolute; inset: -15px; border: 2px solid #a3e635; border-radius: 50%;
    border-top-color: transparent; border-bottom-color: transparent;
    animation: spin 3s linear infinite;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .logo-float { animation: float 3s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

  .custom-scroll::-webkit-scrollbar { width: 4px; }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.2); border-radius: 10px; }
`;

const ADMIN_PASSWORD = 'pandecup2024';

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLocation, setActiveLocation] = useState('kiomoni'); 
  const [activeSeason, setActiveSeason] = useState('2026');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [rawTeams, setRawTeams] = useState([]);
  const [rawMatches, setRawMatches] = useState([]);
  const [rawPlayers, setRawPlayers] = useState([]);
  const [liveMatch, setLiveMatch] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&limit=1000`;
      const [tRes, mRes, pRes] = await Promise.all([
        fetch(`${baseUrl}&content_type=standing`),
        fetch(`${baseUrl}&content_type=match`),
        fetch(`${baseUrl}&content_type=player`)
      ]);
      const [tData, mData, pData] = await Promise.all([tRes.json(), mRes.json(), pRes.json()]);

      setRawTeams(tData.items.map(i => ({ id: i.sys.id, ...i.fields })));
      setRawMatches(mData.items.map(i => ({ id: i.sys.id, ...i.fields })));
      setRawPlayers(pData.items ? pData.items.map(i => ({ id: i.sys.id, ...i.fields })) : []);
      showMsg("⚡ Dojo Refreshed!");
    } catch (err) { showMsg("⚠️ Sync Failed!"); } finally { setIsLoading(false); }
  };

  useEffect(() => { if (authenticated) fetchData(); }, [authenticated]);

  const showMsg = (txt) => { setMessage(txt); setTimeout(() => setMessage(''), 5000); };

  // FILTER LOGIC (Matazamio ya Sensei: Tanga 2025/2026 & Dar)
  const filteredTeams = rawTeams.filter(t => 
    String(t.location || '').toLowerCase().includes(activeLocation) && 
    String(t.season || '').includes(activeSeason)
  );

  const filteredMatches = rawMatches.filter(m => 
    String(m.location || '').toLowerCase().includes(activeLocation) && 
    String(m.season || '').includes(activeSeason)
  );

  // GROUPING LOGIC
  const groupedStandings = filteredTeams.reduce((groups, team) => {
    const groupName = team.group ? `GROUP ${team.group}`.toUpperCase() : 'LEAGUE TABLE';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(team);
    return groups;
  }, {});

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
        <style>{fontStyles}</style>
        <div className="glass" style={{ padding: '60px 40px', borderRadius: '40px', width: '400px', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '110px', height: '110px', margin: '0 auto 25px' }}>
            <div className="cobra-loader"></div>
            <img src={LOGO_PATH} className="logo-float" style={{ width: '100%', position: 'relative', zIndex: 2 }} alt="Logo" />
          </div>
          <h2 className="oswald" style={{ fontSize: '26px', color: 'white', marginBottom: '8px' }}>Pande Cup Control Center</h2>
          <p style={{ color: '#a3e635', fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '35px' }}>
            Strike First • Strike Hard • No Mercy
          </p>
          <form onSubmit={(e) => { e.preventDefault(); password === ADMIN_PASSWORD ? setAuthenticated(true) : showMsg('❌ NO MERCY! Incorrect Code'); }}>
            <input 
              type="password" 
              placeholder="ENTER PASSCODE" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid #334155', color: '#a3e635', textAlign: 'center', fontSize: '18px', letterSpacing: '8px', marginBottom: '25px', outline: 'none' }} 
            />
            <button type="submit" className="btn-lime" style={{ width: '100%', padding: '18px', borderRadius: '12px', fontSize: '15px' }}>
                STRIKE FIRST <Zap size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <style>{fontStyles}</style>
      
      {/* SIDEBAR */}
      <aside className="glass" style={{ width: '260px', padding: '35px 20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <img src={LOGO_PATH} style={{ width: '70px', marginBottom: '12px' }} alt="Logo" />
          <h3 className="oswald" style={{ color: '#a3e635', fontSize: '22px', margin: 0 }}>PANDE DOJO</h3>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'nav-active' : ''}`}><LayoutDashboard size={18} /> Overview</div>
          <div onClick={() => setActiveTab('live')} className={`nav-item ${activeTab === 'live' ? 'nav-active' : ''}`}><Radio size={18} /> Live Engine</div>
          <div onClick={() => setActiveTab('inbox')} className={`nav-item ${activeTab === 'inbox' ? 'nav-active' : ''}`}><ClipboardList size={18} /> Registration</div>
          <div onClick={() => setActiveTab('teams')} className={`nav-item ${activeTab === 'teams' ? 'nav-active' : ''}`}><Users size={18} /> Team & Squads</div>
          <div onClick={() => setActiveTab('bot')} className={`nav-item ${activeTab === 'bot' ? 'nav-active' : ''}`}><MessageSquare size={18} /> Gorilla Brain</div>
        </nav>

        <div style={{ padding: '18px', background: 'rgba(163, 230, 53, 0.05)', borderRadius: '15px', border: '1px solid rgba(163, 230, 53, 0.1)' }}>
          <div style={{ color: '#a3e635', fontSize: '10px', fontWeight: 'bold' }}>SENSEI STATUS</div>
          <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Msangawix</div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        <header className="glass" style={{ padding: '25px 45px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h1 className="oswald" style={{ margin: 0, fontSize: '28px', color: 'white' }}>Welcome Sensei Msangawix</h1>
            <p style={{ color: '#a3e635', fontSize: '14px', marginTop: '2px' }}>This here Dojo is ready for you.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <select value={activeLocation} onChange={(e) => setActiveLocation(e.target.value)}>
              <option value="kiomoni">TANGA (KIOMONI)</option>
              <option value="goba">DAR (GOBA)</option>
            </select>
            <select value={activeSeason} onChange={(e) => setActiveSeason(e.target.value)}>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
            <button onClick={fetchData} className="btn-lime" style={{ padding: '10px', borderRadius: '10px' }}>
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </header>

        <main className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: '40px 45px' }}>
          {message && <div style={{ padding: '15px 25px', background: 'rgba(163, 230, 53, 0.1)', border: '1px solid #a3e635', color: '#a3e635', borderRadius: '12px', marginBottom: '30px' }}>{message}</div>}

          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #a3e635' }}>
                  <Trophy size={22} color="#a3e635" />
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '15px', textTransform: 'uppercase' }}>Teams in Dojo</p>
                  <h2 style={{ fontSize: '38px', margin: 0 }}>{filteredTeams.length}</h2>
                </div>
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #3b82f6' }}>
                  <Activity size={22} color="#3b82f6" />
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '15px', textTransform: 'uppercase' }}>Fixtures Synced</p>
                  <h2 style={{ fontSize: '38px', margin: 0 }}>{filteredMatches.length}</h2>
                </div>
              </div>

              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px' }}>GROUP STANDINGS ({activeSeason})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {Object.keys(groupedStandings).length > 0 ? Object.keys(groupedStandings).map((groupName, idx) => (
                  <div key={idx} className="glass" style={{ padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={16} color="#a3e635" />
                        <span style={{ fontWeight: '900', fontSize: '14px', color: '#fff' }}>{groupName}</span>
                      </div>
                      <button onClick={() => setSelectedGroup({ name: groupName, teams: groupedStandings[groupName] })} style={{ background: 'rgba(163,230,53,0.1)', color: '#a3e635', border: 'none', padding: '5px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                        OPEN TABLE
                      </button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{groupedStandings[groupName].length} Teams Registered</div>
                  </div>
                )) : <div style={{ color: '#64748b' }}>Hakuna data za msimu wa {activeSeason} kwa {activeLocation.toUpperCase()}.</div>}
              </div>
            </div>
          )}

          {/* STANDINGS MODAL (Sawa na site yako) */}
          {selectedGroup && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}>
              <div className="glass" style={{ width: '100%', maxWidth: '600px', borderRadius: '25px', overflow: 'hidden', border: '1px solid #a3e63533' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(163,230,53,0.05)' }}>
                  <h3 className="oswald" style={{ margin: 0 }}>{selectedGroup.name}</h3>
                  <button onClick={() => setSelectedGroup(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
                </div>
                <div className="custom-scroll" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead style={{ background: '#0f172a' }}>
                      <tr>
                        <th style={{ padding: '15px', textAlign: 'left' }}>#</th>
                        <th style={{ padding: '15px', textAlign: 'left' }}>Team</th>
                        <th style={{ padding: '15px' }}>P</th>
                        <th style={{ padding: '15px' }}>GD</th>
                        <th style={{ padding: '15px' }}>PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedGroup.teams.sort((a,b) => b.points - a.points).map((t, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '15px' }}>{i + 1}</td>
                          <td style={{ padding: '15px', fontWeight: 'bold' }}>{t.teamName}</td>
                          <td style={{ padding: '15px', textAlign: 'center' }}>{t.played || 0}</td>
                          <td style={{ padding: '15px', textAlign: 'center' }}>{t.goalDifference || 0}</td>
                          <td style={{ padding: '15px', textAlign: 'center', color: '#a3e635', fontWeight: 'bold' }}>{t.points || 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* LIVE ENGINE */}
          {activeTab === 'live' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
              <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
                <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px' }}>MATCH SELECTOR</h3>
                {filteredMatches.length > 0 ? filteredMatches.map((m, idx) => (
                  <div key={idx} onClick={() => setLiveMatch(m)} style={{ padding: '18px', background: liveMatch?.id === m.id ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255,255,255,0.02)', borderRadius: '15px', marginBottom: '12px', cursor: 'pointer', border: liveMatch?.id === m.id ? '1px solid #a3e635' : '1px solid transparent' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{m.homeTeam} VS {m.awayTeam}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '5px' }}>{m.score} | {m.status}</div>
                  </div>
                )) : <p style={{ color: '#64748b' }}>Hakuna mechi zilizopangwa.</p>}
              </div>
              {liveMatch && (
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', border: '1px solid #a3e635' }}>
                  <h3 className="oswald">SCORING UNIT</h3>
                  <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                    <button className="btn-lime" style={{ flex: 1, padding: '15px', borderRadius: '12px' }}>⚽ GOAL</button>
                    <button style={{ flex: 1, background: '#ef4444', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '12px' }}>🟥 CARD</button>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;