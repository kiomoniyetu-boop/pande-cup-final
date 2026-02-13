import React, { useState, useEffect } from 'react';
import { 
  Lock, Trash2, Users, Trophy, Radio, MessageSquare, 
  LayoutDashboard, Plus, Send, Zap, CheckCircle, 
  UserPlus, ClipboardList, Timer, Award
} from 'lucide-react';
import { AdminService } from '../services/AdminService';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@700&display=swap');
  body { font-family: 'Inter', sans-serif; background: #020617; color: #f8fafc; margin: 0; }
  .oswald { font-family: 'Oswald', sans-serif; letter-spacing: 0.5px; }
  .glass { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.05); }
  .btn-lime { background: #a3e635; color: #020617; font-weight: 700; transition: all 0.2s; border: none; cursor: pointer; }
  .btn-lime:hover { background: #bef264; transform: scale(1.02); }
  .nav-item { transition: all 0.2s; cursor: pointer; border-radius: 10px; color: #94a3b8; padding: 12px 15px; display: flex; alignItems: center; gap: 12px; font-size: 14px; }
  .nav-active { background: rgba(163, 230, 53, 0.1) !important; color: #a3e635 !important; }
  input, select, textarea { background: #0f172a; border: 1px solid #1e293b; color: #fff; padding: 10px; borderRadius: 8px; outline: none; }
  .badge-new { background: #ef4444; color: white; font-size: 10px; padding: 2px 6px; borderRadius: 4px; margin-left: auto; }
`;

const ADMIN_PASSWORD = 'pandecup2024';

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [message, setMessage] = useState('');
  
  // Data States
  const [pendingRegs, setPendingRegs] = useState([
    { id: 1, teamName: 'Magubeni City', coach: 'Babu Ali', phone: '0712...', date: 'Leo' },
    { id: 2, teamName: 'Goba Boys', coach: 'Kassim', phone: '0655...', date: 'Jana' }
  ]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [liveMatch, setLiveMatch] = useState(null);
  const [selectedScorer, setSelectedScorer] = useState('');

  // Players logic (Hii inatengeneza Wafungaji Bora)
  const [teamRosters, setTeamRosters] = useState({
    'Kiomoni FC': ['Juma Kaseja', 'Mwakere Jr', 'Chinga'],
    'Mpirani Stars': ['Beki Katili', 'Striker Hatari']
  });

  useEffect(() => {
    if (authenticated) {
      AdminService.initialize();
      const data = AdminService.getData();
      setTeams(data.teams || []);
      setMatches(data.matches || []);
    }
  }, [authenticated]);

  const showMsg = (txt) => { setMessage(txt); setTimeout(() => setMessage(''), 4000); };

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617' }}>
        <style>{fontStyles}</style>
        <div className="glass" style={{ padding: '40px', borderRadius: '24px', width: '340px', textAlign: 'center' }}>
          <Zap size={40} color="#a3e635" style={{ marginBottom: '20px', display: 'inline-block' }} />
          <h2 className="oswald">PANDE CONTROL</h2>
          <form onSubmit={(e) => { e.preventDefault(); password === ADMIN_PASSWORD ? setAuthenticated(true) : showMsg('❌ Access Denied'); }}>
            <input type="password" placeholder="Passcode..." value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', marginBottom: '15px', textAlign: 'center' }} />
            <button type="submit" className="btn-lime" style={{ width: '100%', padding: '12px', borderRadius: '8px' }}>AUTHENTICATE</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <style>{fontStyles}</style>
      
      {/* SIDEBAR */}
      <aside className="glass" style={{ width: '260px', padding: '30px 20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '40px' }}>
          <h3 className="oswald" style={{ color: '#a3e635', fontSize: '22px', margin: 0 }}>PANDE CUP</h3>
          <p style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px' }}>MANAGEMENT UNIT</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <div onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'nav-active' : ''}`}><LayoutDashboard size={18} /> Overview</div>
          
          <div onClick={() => setActiveTab('inbox')} className={`nav-item ${activeTab === 'inbox' ? 'nav-active' : ''}`}>
            <ClipboardList size={18} /> Usajili Mpya 
            {pendingRegs.length > 0 && <span className="badge-new">{pendingRegs.length}</span>}
          </div>

          <div onClick={() => setActiveTab('live')} className={`nav-item ${activeTab === 'live' ? 'nav-active' : ''}`}><Radio size={18} /> Live Engine</div>
          
          <div onClick={() => setActiveTab('squads')} className={`nav-item ${activeTab === 'squads' ? 'nav-active' : ''}`}><Users size={18} /> Squads & Players</div>
          
          <div onClick={() => setActiveTab('bot')} className={`nav-item ${activeTab === 'bot' ? 'nav-active' : ''}`}><MessageSquare size={18} /> Gorilla Brain</div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div>
            <h1 className="oswald" style={{ margin: 0, fontSize: '28px' }}>Welcome Sensei Msangawix</h1>
            <p style={{ color: '#a3e635', fontSize: '13px' }}>System status: All engines operational.</p>
          </div>
        </header>

        {message && <div style={{ padding: '12px 20px', background: '#a3e635', color: '#020617', borderRadius: '10px', marginBottom: '25px', fontWeight: 'bold' }}>{message}</div>}

        {/* 1. USAJILI INBOX (Vuta data kutoka site) */}
        {activeTab === 'inbox' && (
          <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
            <h2 className="oswald" style={{ color: '#a3e635' }}>MAOMBI YA USAJILI (SITE DATA)</h2>
            <p style={{ color: '#94a3b8', fontSize: '14px' }}>Hizi ni timu zilizojaza fomu kule site. Zi-approve ili zianze kuonekana.</p>
            
            <div style={{ marginTop: '20px' }}>
              {pendingRegs.map(reg => (
                <div key={reg.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', marginBottom: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px' }}>{reg.teamName}</h3>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Kocha: {reg.coach} | Simu: {reg.phone}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => showMsg(`✅ ${reg.teamName} Imeingizwa kwenye Ligi!`)} style={{ background: '#a3e635', border: 'none', padding: '8px 15px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>APPROVE</button>
                    <button style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer' }}>REJECT</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. SQUADS & PLAYERS (Wachezaji & Wafungaji) */}
        {activeTab === 'squads' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '25px' }}>
             <div className="glass" style={{ padding: '25px', borderRadius: '20px' }}>
                <h3 className="oswald">TIMU ZAKO</h3>
                {teams.map(t => (
                  <div key={t.id} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', marginBottom: '8px', cursor: 'pointer', border: '1px solid transparent' }} className="nav-item">
                    {t.name}
                  </div>
                ))}
             </div>
             <div className="glass" style={{ padding: '25px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 className="oswald">WACHEZAJI (ROSTER)</h3>
                  <button className="btn-lime" style={{ padding: '5px 15px', borderRadius: '6px', fontSize: '12px' }}><UserPlus size={14} /> ONGEZA</button>
                </div>
                {/* Orodha ya wachezaji itatokea hapa */}
                <p style={{ color: '#64748b', fontSize: '13px' }}>Chagua timu kuona wachezaji wake na kurekodi takwimu zao.</p>
             </div>
          </div>
        )}

        {/* 3. LIVE ENGINE (Zingatia Wafungaji) */}
        {activeTab === 'live' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '25px' }}>
            <div className="glass" style={{ padding: '25px', borderRadius: '20px' }}>
              <h3 className="oswald">MECHI ZA LEO</h3>
              {matches.map(m => (
                <div key={m.id} style={{ padding: '15px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{m.homeTeam} v {m.awayTeam}</span>
                  <button onClick={() => setLiveMatch(m)} className="btn-lime" style={{ padding: '5px 12px', borderRadius: '6px' }}>SET LIVE</button>
                </div>
              ))}
            </div>

            {liveMatch && (
              <div className="glass" style={{ padding: '25px', borderRadius: '20px', border: '1px solid #a3e635' }}>
                <h3 className="oswald" style={{ color: '#a3e635' }}>REKODI TUKIO: {liveMatch.homeTeam}</h3>
                <div style={{ marginTop: '20px' }}>
                  <label style={{ fontSize: '12px', color: '#94a3b8' }}>CHAGUA MFUNGAJI:</label>
                  <select 
                    value={selectedScorer} 
                    onChange={(e) => setSelectedScorer(e.target.value)}
                    style={{ width: '100%', marginTop: '10px', padding: '12px' }}
                  >
                    <option>Chagua Mchezaji...</option>
                    {teamRosters[liveMatch.homeTeam]?.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  
                  <button 
                    onClick={() => {
                      showMsg(`⚽ GOLI! ${selectedScorer} ameipatia ${liveMatch.homeTeam} goli!`);
                      // Hapa tuta-update Contentful sasa hivi
                    }}
                    className="btn-lime" 
                    style={{ width: '100%', marginTop: '20px', padding: '15px', borderRadius: '10px' }}
                  >
                    HIFADHI GOLI
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #a3e635' }}>
              <Users size={24} color="#a3e635" />
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '15px' }}>USAJILI MPYA (PENDING)</p>
              <h2 style={{ fontSize: '32px', margin: 0 }}>{pendingRegs.length}</h2>
            </div>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #3b82f6' }}>
              <Award size={24} color="#3b82f6" />
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '15px' }}>WAFUNGAJI WANAOONGOZA</p>
              <h2 style={{ fontSize: '32px', margin: 0 }}>08</h2>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default AdminDashboard;