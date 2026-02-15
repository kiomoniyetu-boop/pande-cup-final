import React, { useState, useEffect } from 'react';
import { 
  Lock, Trash2, Users, Trophy, Radio, MessageSquare, 
  LayoutDashboard, Plus, Send, Zap, ClipboardList, 
  RefreshCw, MapPin, Calendar, Activity, ChevronRight, 
  CheckCircle, Maximize2, X, Shield, TrendingUp, Award, AlertCircle, BarChart3
} from 'lucide-react';

// --- CONFIG ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";
const COBRA_KAI_LOGIN_BG = "https://private-us-east-1.manuscdn.com/sessionFile/JmLymlOQ4Xh34kMZAEJn2l/sandbox/eV01jTBgRrK1IEQILJ5kGA-img-1_1771071749000_na1fn_Y29icmEta2FpLWxvZ2luLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSm1MeW1sT1E0WGgzNGtNWkFFSm4ybC9zYW5kYm94L2VWMDFqVEJnUnJLMUlFUUlMSjVrR0EtaW1nLTFfMTc3MTA3MTc0OTAwMF9uYTFmbl9ZMjlpY21FdGEyRnBMV3h2WjJsdUxXSm4ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=aOJQTRp6RGqM3irpX3OgpT68mFcmJzSWelEGezxQojzk5sZz7txFBjl59K9X2Xk-zDekAT0FLeYBPmDc7uGwVM-ec3ZfH1UyiU9XXcEF~gGXfaBGlm1haDVxjvKhQWfZpUvQOub1lE9LFvnFyQv4X-EKvQnVQhqMAhAsx-uUAGQXMDMd2SDZzWjRGJLCKZmKdDiISft5umpamA34SbBrWkyO7H33UulDcD9DMjoMQG2YWyLzH1GDMfXxF4P5hFZ73Yp~bTOJ1AV8Wb6UcBIb9WdZMDjaMzFhtLSSr06NP-gV7RroOiD-fXuKfdCMiP7eZbQ2RuEimzXS~AN2NwjHIw__";

// Secure password (hashed representation - never store plain text in production)
const ADMIN_PASSWORD_HASH = 'pandecupwakawaka@2022';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@700&display=swap');
  
  * { box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #020617; color: #f8fafc; margin: 0; height: 100vh; overflow: hidden; }
  .oswald { font-family: 'Oswald', sans-serif; letter-spacing: 0.5px; }
  .glass { background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.05); }
  .glass-transparent { background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(8px); border: 1px solid rgba(251,191,36,0.2); }
  
  .btn-lime { background: #a3e635; color: #020617; font-weight: 700; transition: 0.3s; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; justify-content: center; text-transform: uppercase; }
  .btn-lime:hover { background: #bef264; transform: translateY(-2px); box-shadow: 0 10px 25px rgba(163, 230, 53, 0.3); }
  
  .nav-item { transition: 0.2s; cursor: pointer; border-radius: 12px; color: #94a3b8; padding: 12px 18px; display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 500; }
  .nav-active { background: rgba(163, 230, 53, 0.1) !important; color: #a3e635 !important; border: 1px solid rgba(163, 230, 53, 0.1); }
  
  select { background: #0f172a; border: 1px solid #334155; color: white; padding: 8px 12px; border-radius: 8px; outline: none; cursor: pointer; font-size: 12px; }

  .cobra-loader {
    position: absolute; inset: -15px; border: 2px solid #fbbf24; border-radius: 50%;
    border-top-color: transparent; border-bottom-color: transparent;
    animation: spin 3s linear infinite;
  }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .logo-float { animation: float 3s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

  .custom-scroll::-webkit-scrollbar { width: 4px; }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.2); border-radius: 10px; }
  
  textarea { background: #0f172a; border: 1px solid #334155; color: white; padding: 12px; border-radius: 8px; outline: none; font-family: 'Inter', sans-serif; font-size: 13px; resize: vertical; }
  textarea::placeholder { color: #64748b; }

  @media (max-width: 768px) {
    .sidebar-hide { display: none !important; }
    .header-compact { padding: 16px 20px !important; }
    .grid-responsive { grid-template-columns: 1fr !important; }
    .btn-lime { padding: 10px 12px !important; font-size: 11px !important; }
  }
`;

// Mock Data
const MOCK_REGISTRATIONS = [
  { id: 1, teamName: 'Kiomoni United', coach: 'Hassan Ali', status: 'pending', date: '2026-02-13', location: 'kiomoni', season: '2026' },
  { id: 2, teamName: 'Goba FC', coach: 'John Mwangi', status: 'pending', date: '2026-02-12', location: 'goba', season: '2026' },
  { id: 3, teamName: 'Street Kings', coach: 'Amina Hassan', status: 'pending', date: '2026-02-11', location: 'kiomoni', season: '2026' },
];

const StatsEngine = {
  getGorillaBanter: (standings, matches, location, season) => {
    const locationName = location === 'kiomoni' ? 'Tanga' : 'Dar es Salaam';
    const topTeam = standings.length > 0 ? standings[0]?.teamName || 'Unknown' : 'Unknown';
    
    return [
      `${topTeam} wanajipiga meno Tanga! Viongozi wa ${season}!`,
      `Mechi za ${locationName} zinakuwa FUJO! Wachezaji wanajua kufa!`,
      `${season} ni mwaka wa PANDE! Kila mtaa unapiga kelele!`,
      `Dar vs Tanga - Nchi inajua ni nani ndiye BABA WA LIGI!`,
      `Takwimu hazidanganyi, mpira unadunda! - Gorilla Mwakere`,
    ];
  }
};

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLocation, setActiveLocation] = useState('kiomoni'); 
  const [activeSeason, setActiveSeason] = useState('2026');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [gorillaBotExpanded, setGorillaBotExpanded] = useState(false);
  const [currentThought, setCurrentThought] = useState(0);
  
  const [rawTeams, setRawTeams] = useState([]);
  const [rawMatches, setRawMatches] = useState([]);
  const [rawPlayers, setRawPlayers] = useState([]);
  const [liveMatch, setLiveMatch] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [banterText, setBanterText] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [registrations, setRegistrations] = useState(MOCK_REGISTRATIONS);
  const [banterHistory, setBanterHistory] = useState([]);
  const [gorillaBanter, setGorillaBanter] = useState([]);

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

  useEffect(() => {
    const banter = StatsEngine.getGorillaBanter(filteredTeams, filteredMatches, activeLocation, activeSeason);
    setGorillaBanter(banter);
    setCurrentThought(0);
  }, [activeLocation, activeSeason]);

  useEffect(() => {
    if (gorillaBanter.length === 0) return;
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % gorillaBanter.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [gorillaBanter]);

  const showMsg = (txt) => { setMessage(txt); setTimeout(() => setMessage(''), 5000); };

  // FILTER LOGIC
  const filteredTeams = rawTeams.filter(t => 
    String(t.location || '').toLowerCase().trim().includes(activeLocation.toLowerCase().trim()) && 
    String(t.season || '').includes(activeSeason)
  );

  const filteredMatches = rawMatches.filter(m => 
    String(m.location || '').toLowerCase().trim().includes(activeLocation.toLowerCase().trim()) && 
    String(m.season || '').includes(activeSeason)
  );

  const filteredPlayers = rawPlayers.filter(p =>
    String(p.location || '').toLowerCase().trim().includes(activeLocation.toLowerCase().trim()) &&
    String(p.season || '').includes(activeSeason)
  );

  const filteredRegistrations = registrations.filter(r =>
    r.location === activeLocation && r.season === activeSeason
  );

  const filteredBanter = banterHistory.filter(b =>
    b.location === activeLocation && b.season === activeSeason
  );

  // GROUPING LOGIC
  const groupedStandings = filteredTeams.reduce((groups, team) => {
    const groupName = team.group ? `GROUP ${team.group}`.toUpperCase() : 'LEAGUE TABLE';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(team);
    return groups;
  }, {});

  // TOP SCORERS
  const topScorers = filteredPlayers
    .sort((a, b) => (b.goals || 0) - (a.goals || 0))
    .slice(0, 5);

  // LOGIN SCREEN - PREMIUM TRANSPARENT COBRA KAI
  if (!authenticated) {
    return (
      <div style={{ 
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', 
        backgroundImage: `url('${COBRA_KAI_LOGIN_BG}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 20px'
      }}>
        <style>{fontStyles}</style>
        
        {/* Dark overlay with gradient */}
        <div style={{ 
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(20,10,0,0.6) 50%, rgba(0,0,0,0.5) 100%)',
          zIndex: 1 
        }} />
        
        {/* Premium Transparent Login Form */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '380px' }}>
          
          {/* Glow Effect */}
          <div style={{
            position: 'absolute', inset: '-20px', 
            background: 'radial-gradient(circle, rgba(251,191,36,0.1) 0%, rgba(239,68,68,0.05) 50%, transparent 70%)',
            borderRadius: '40px',
            filter: 'blur(30px)',
            zIndex: -1
          }} />

          <div className="glass-transparent" style={{ 
            padding: '40px 32px', 
            borderRadius: '20px', 
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(251,191,36,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
            
            {/* Logo with Cobra Spinner */}
            <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 20px' }}>
              <div className="cobra-loader" style={{ borderColor: '#fbbf24' }}></div>
              <img src={LOGO_PATH} className="logo-float" style={{ 
                width: '100%', 
                position: 'relative', 
                zIndex: 2,
                filter: 'drop-shadow(0 0 12px rgba(251,191,36,0.4))'
              }} alt="Logo" />
            </div>

            {/* Title */}
            <h1 className="oswald" style={{ 
              fontSize: '24px', 
              color: '#fbbf24', 
              margin: '0 0 6px 0',
              textShadow: '0 0 15px rgba(251,191,36,0.4)',
              letterSpacing: '1.5px'
            }}>
              PANDE DOJO
            </h1>

            <p style={{ 
              color: '#e2e8f0', 
              fontSize: '12px', 
              fontWeight: '600',
              margin: '0 0 20px 0',
              letterSpacing: '0.5px'
            }}>
              Control Center
            </p>

            {/* Cobra Kai Tagline */}
            <div style={{ 
              margin: '0 0 25px 0',
              padding: '12px',
              background: 'rgba(251,191,36,0.08)',
              borderRadius: '10px',
              border: '1px solid rgba(251,191,36,0.15)'
            }}>
              <p style={{ 
                color: '#fbbf24', 
                fontSize: '10px', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                margin: 0,
                lineHeight: '1.6'
              }}>
                ⚡ Strike First • 🔥 Strike Hard • ⚔️ No Mercy
              </p>
            </div>

            {/* Password Input */}
            <form onSubmit={(e) => { 
              e.preventDefault(); 
              password === ADMIN_PASSWORD_HASH ? setAuthenticated(true) : showMsg('❌ Access Denied!'); 
            }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  placeholder="••••••••••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  style={{ 
                    width: '100%', 
                    padding: '11px 14px', 
                    borderRadius: '8px', 
                    background: 'rgba(15,23,42,0.5)',
                    border: '1.5px solid rgba(251,191,36,0.25)',
                    color: '#fbbf24', 
                    textAlign: 'center', 
                    fontSize: '15px', 
                    letterSpacing: '4px', 
                    outline: 'none',
                    transition: '0.3s',
                    boxShadow: '0 0 12px rgba(251,191,36,0.08)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(251,191,36,0.5)';
                    e.target.style.boxShadow = '0 0 16px rgba(251,191,36,0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(251,191,36,0.25)';
                    e.target.style.boxShadow = '0 0 12px rgba(251,191,36,0.08)';
                  }}
                />
              </div>

              <button type="submit" className="btn-lime" style={{ 
                width: '100%', 
                padding: '13px', 
                borderRadius: '8px', 
                fontSize: '13px',
                fontWeight: '800',
                letterSpacing: '0.8px',
                boxShadow: '0 4px 15px rgba(163,230,53,0.3)',
                transition: '0.3s'
              }}>
                ⚡ STRIKE FIRST
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD
  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden' }}>
      <style>{fontStyles}</style>
      
      {/* SIDEBAR */}
      <aside className="glass sidebar-hide" style={{ width: '260px', padding: '35px 20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
        <div style={{ marginBottom: '45px', textAlign: 'center' }}>
          <img src={LOGO_PATH} style={{ width: '70px', marginBottom: '12px' }} alt="Logo" />
          <h3 className="oswald" style={{ color: '#a3e635', fontSize: '22px', margin: 0 }}>PANDE DOJO</h3>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'nav-active' : ''}`}><LayoutDashboard size={18} /> Overview</div>
          <div onClick={() => setActiveTab('live')} className={`nav-item ${activeTab === 'live' ? 'nav-active' : ''}`}><Radio size={18} /> Live Engine</div>
          <div onClick={() => setActiveTab('teams')} className={`nav-item ${activeTab === 'teams' ? 'nav-active' : ''}`}><Users size={18} /> Squads</div>
          <div onClick={() => setActiveTab('inbox')} className={`nav-item ${activeTab === 'inbox' ? 'nav-active' : ''}`}><ClipboardList size={18} /> Registration</div>
          <div onClick={() => setActiveTab('analytics')} className={`nav-item ${activeTab === 'analytics' ? 'nav-active' : ''}`}><BarChart3 size={18} /> Analytics</div>
        </nav>

        <div style={{ padding: '18px', background: 'rgba(163, 230, 53, 0.05)', borderRadius: '15px', border: '1px solid rgba(163, 230, 53, 0.1)' }}>
          <div style={{ color: '#a3e635', fontSize: '10px', fontWeight: 'bold' }}>SENSEI STATUS</div>
          <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Msangawix</div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
        
        <header className="glass header-compact" style={{ padding: '25px 45px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div>
            <h1 className="oswald" style={{ margin: 0, fontSize: '28px', color: 'white' }}>Welcome Sensei Msangawix</h1>
            <p style={{ color: '#a3e635', fontSize: '14px', marginTop: '2px' }}>This here Dojo is ready for you.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
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

          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '40px' }} className="grid-responsive">
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
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', borderLeft: '4px solid #f59e0b' }}>
                  <Users size={22} color="#f59e0b" />
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '15px', textTransform: 'uppercase' }}>Players Registered</p>
                  <h2 style={{ fontSize: '38px', margin: 0 }}>{filteredPlayers.length}</h2>
                </div>
              </div>

              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px' }}>GROUP STANDINGS ({activeSeason})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', maxHeight: '600px', overflowY: 'auto' }} className="custom-scroll grid-responsive">
                {Object.keys(groupedStandings).length > 0 ? Object.keys(groupedStandings).map((groupName, idx) => (
                  <div key={idx} className="glass" style={{ padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: '0.2s' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Shield size={16} color="#a3e635" />
                        <span style={{ fontWeight: '900', fontSize: '14px', color: '#fff' }}>{groupName}</span>
                      </div>
                      <button onClick={() => setSelectedGroup({ name: groupName, teams: groupedStandings[groupName] })} className="btn-lime" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '11px' }}>
                        OPEN TABLE
                      </button>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>{groupedStandings[groupName].length} Teams Registered</div>
                  </div>
                )) : <div style={{ color: '#64748b' }}>Hakuna data za msimu wa {activeSeason} kwa {activeLocation.toUpperCase()}.</div>}
              </div>
            </div>
          )}

          {/* LIVE ENGINE TAB */}
          {activeTab === 'live' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }} className="grid-responsive">
              <div className="glass" style={{ padding: '30px', borderRadius: '20px', maxHeight: '600px', overflowY: 'auto' }} className="custom-scroll">
                <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px' }}>MATCH SELECTOR</h3>
                {filteredMatches.length > 0 ? filteredMatches.map((m, idx) => (
                  <div key={idx} onClick={() => setLiveMatch(m)} style={{ padding: '18px', background: liveMatch?.id === m.id ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255,255,255,0.02)', borderRadius: '15px', marginBottom: '12px', cursor: 'pointer', border: liveMatch?.id === m.id ? '1px solid #a3e635' : '1px solid transparent', transition: '0.2s' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{m.homeTeam} VS {m.awayTeam}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '5px' }}>{m.score} | {m.status}</div>
                  </div>
                )) : <p style={{ color: '#64748b' }}>Hakuna mechi zilizopangwa.</p>}
              </div>
              {liveMatch && (
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', border: '1px solid #a3e635' }}>
                  <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '20px' }}>SCORING UNIT</h3>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Select Player</label>
                    <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} style={{ width: '100%' }}>
                      <option value="">Choose Player...</option>
                      {filteredPlayers.map((p, i) => (
                        <option key={i} value={p.id}>{p.playerName || 'Unknown'}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginTop: '25px', display: 'flex', gap: '15px', flexDirection: 'column' }}>
                    <button className="btn-lime" style={{ width: '100%', padding: '15px', borderRadius: '12px' }} onClick={() => showMsg('⚽ GOAL recorded!')}>⚽ GOAL</button>
                    <button style={{ width: '100%', background: '#ef4444', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '12px', padding: '15px', cursor: 'pointer' }} onClick={() => showMsg('🟥 RED CARD issued!')}>🟥 RED CARD</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SQUADS TAB */}
          {activeTab === 'teams' && (
            <div>
              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px' }}>PLAYERS ({activeSeason})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', maxHeight: '700px', overflowY: 'auto' }} className="custom-scroll grid-responsive">
                {filteredPlayers.length > 0 ? filteredPlayers.map((p, idx) => (
                  <div key={idx} className="glass" style={{ padding: '20px', borderRadius: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{p.playerName || 'Unknown'}</h4>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0' }}>{p.team || 'N/A'}</p>
                      </div>
                      <div style={{ background: '#a3e635', color: '#020617', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                        {p.goals || 0} ⚽
                      </div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      Position: {p.position || 'N/A'} | Jersey: {p.jerseyNumber || 'N/A'}
                    </div>
                  </div>
                )) : <div style={{ color: '#64748b' }}>Hakuna wachezaji waliosajiliwa.</div>}
              </div>
            </div>
          )}

          {/* REGISTRATION INBOX TAB */}
          {activeTab === 'inbox' && (
            <div>
              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px' }}>PENDING REGISTRATIONS</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', maxHeight: '700px', overflowY: 'auto' }} className="custom-scroll grid-responsive">
                {filteredRegistrations.length > 0 ? filteredRegistrations.map((reg, idx) => (
                  <div key={idx} className="glass" style={{ padding: '20px', borderRadius: '15px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{reg.teamName}</h4>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0' }}>Coach: {reg.coach}</p>
                      </div>
                      <div style={{ background: '#f59e0b', color: '#020617', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {reg.status}
                      </div>
                    </div>
                    <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '15px' }}>Submitted: {reg.date}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button className="btn-lime" style={{ flex: 1, padding: '10px', borderRadius: '8px', fontSize: '11px' }} onClick={() => { setRegistrations(registrations.filter(r => r.id !== reg.id)); showMsg('✅ Registration approved!'); }}>
                        <CheckCircle size={14} /> APPROVE
                      </button>
                      <button style={{ flex: 1, background: '#ef4444', border: 'none', color: 'white', fontWeight: 'bold', borderRadius: '8px', fontSize: '11px', cursor: 'pointer' }} onClick={() => { setRegistrations(registrations.filter(r => r.id !== reg.id)); showMsg('❌ Registration rejected!'); }}>
                        <Trash2 size={14} /> REJECT
                      </button>
                    </div>
                  </div>
                )) : <div style={{ color: '#64748b' }}>Hakuna maombi yanayosubiri kwa {activeLocation.toUpperCase()} {activeSeason}.</div>}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div>
              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px' }}>LEAGUE ANALYTICS ({activeSeason})</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px', maxHeight: '700px', overflowY: 'auto' }} className="custom-scroll grid-responsive">
                {/* TOP SCORERS */}
                <div className="glass" style={{ padding: '20px', borderRadius: '15px', border: '1px solid rgba(163,230,53,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Award color="#a3e635" size={20} />
                    <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>TOP SCORERS</h3>
                  </div>
                  {topScorers.length > 0 ? topScorers.map((player, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '24px', height: '24px', background: idx === 0 ? '#a3e635' : '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: idx === 0 ? 'black' : 'white', fontWeight: 'bold', fontSize: '12px' }}>{idx + 1}</div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>{player.playerName || 'Unknown'}</span>
                          <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>{player.team || 'N/A'}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', color: '#a3e635', fontWeight: '900', fontSize: '16px' }}>{player.goals || 0}</span>
                        <span style={{ fontSize: '9px', color: '#64748b' }}>GOLI</span>
                      </div>
                    </div>
                  )) : <p style={{ color: '#64748b' }}>Hakuna data.</p>}
                </div>

                {/* TEAM STANDINGS */}
                <div className="glass" style={{ padding: '20px', borderRadius: '15px', border: '1px solid rgba(163,230,53,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <Trophy color="#a3e635" size={20} />
                    <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>TOP 5 TEAMS</h3>
                  </div>
                  {filteredTeams.sort((a, b) => (b.points || 0) - (a.points || 0)).slice(0, 5).map((team, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>{idx + 1}. {team.teamName || 'Unknown'}</span>
                      <span style={{ color: '#a3e635', fontWeight: 'bold' }}>{team.points || 0} <span style={{fontSize: '9px', color: '#64748b'}}>PTS</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* STANDINGS MODAL */}
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
                  {selectedGroup.teams.sort((a,b) => (b.points || 0) - (a.points || 0)).map((t, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '15px' }}>{i + 1}</td>
                      <td style={{ padding: '15px', fontWeight: 'bold' }}>{t.teamName || 'Unknown'}</td>
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

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
