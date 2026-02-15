import React, { useState, useEffect } from 'react';
import { 
  Lock, Trash2, Users, Trophy, Radio, MessageSquare, 
  LayoutDashboard, Plus, Send, Zap, ClipboardList, 
  RefreshCw, MapPin, Calendar, Activity, ChevronRight, 
  CheckCircle, Maximize2, X, Shield, TrendingUp, Award, AlertCircle, BarChart3
} from 'lucide-react';

// StatsEngine inaingia hapa kumpa Mwakere akili
import { StatsEngine } from '../services/StatsEngine'; 

// --- CONFIG ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";
const COBRA_KAI_LOGIN_BG = "https://private-us-east-1.manuscdn.com/sessionFile/JmLymlOQ4Xh34kMZAEJn2l/sandbox/eV01jTBgRrK1IEQILJ5kGA-img-1_1771071749000_na1fn_Y29icmEta2FpLWxvZ2luLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80";

const ADMIN_PASSWORD_HASH = 'pandecupwakawaka@2022';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@700&display=swap');
  * { box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #020617; color: #f8fafc; margin: 0; height: 100vh; overflow: hidden; }
  .oswald { font-family: 'Oswald', sans-serif; letter-spacing: 0.5px; }
  
  .glass { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
  .glass-transparent { background: rgba(15, 23, 42, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(251,191,36,0.2); }
  .dashboard-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; transition: all 0.3s ease; }
  .dashboard-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-color: rgba(163,230,53,0.3); }
  
  .btn-lime { background: #a3e635; color: #020617; font-weight: 800; transition: all 0.3s ease; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; justify-content: center; text-transform: uppercase; letter-spacing: 0.5px; }
  .btn-lime:hover { background: #bef264; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(163, 230, 53, 0.3); }
  .btn-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); transition: all 0.3s ease; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .btn-danger:hover { background: #ef4444; color: white; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3); }
  
  .nav-item { transition: all 0.2s ease; cursor: pointer; border-radius: 12px; color: #94a3b8; padding: 14px 20px; display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
  .nav-active { background: linear-gradient(90deg, rgba(163, 230, 53, 0.15) 0%, rgba(163, 230, 53, 0.05) 100%) !important; color: #a3e635 !important; border-left: 3px solid #a3e635; border-radius: 0 12px 12px 0; }
  
  select, input { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 16px; border-radius: 10px; outline: none; font-size: 13px; font-weight: 600; }
  select:focus, input:focus { border-color: #a3e635; box-shadow: 0 0 0 2px rgba(163, 230, 53, 0.2); }
  
  .cobra-loader { position: absolute; inset: -15px; border: 2px solid #fbbf24; border-radius: 50%; border-top-color: transparent; border-bottom-color: transparent; animation: spin 3s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .logo-float { animation: float 3s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes pulseLive { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

  .custom-scroll::-webkit-scrollbar { width: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); border-radius: 10px; }

  @media (max-width: 768px) {
    .sidebar-hide { display: none !important; }
    .header-compact { flex-direction: column; gap: 16px; align-items: flex-start !important; }
    .grid-responsive { grid-template-columns: 1fr !important; }
  }
`;

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLocation, setActiveLocation] = useState('kiomoni'); 
  const [activeSeason, setActiveSeason] = useState('2026');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State za Takwimu
  const [rawTeams, setRawTeams] = useState([]);
  const [rawMatches, setRawMatches] = useState([]);
  const [rawPlayers, setRawPlayers] = useState([]);
  
  // HAPA NDIO UCHAWI WA VISOMANE UPO (Inasoma LocalStorage mwanzo)
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  
  const [liveMatch, setLiveMatch] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [mwakereQuote, setMwakereQuote] = useState('');

  // 1. DATA FETCHING
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
      
      // Vuta maombi mapya kutoka kwa fomu ya public
      loadPendingRegistrations();
      
      showMsg("⚡ Command Centre imesawazishwa! Data zipo Live.");
    } catch (err) { 
      showMsg("⚠️ Mtandao unasumbua, lakini mfumo wa ndani unafanya kazi."); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const loadPendingRegistrations = () => {
    try {
      const savedRegs = JSON.parse(localStorage.getItem('pande_pending_regs')) || [];
      setPendingRegistrations(savedRegs);
    } catch (error) {
      console.error("Error loading registrations", error);
    }
  };

  useEffect(() => { 
    if (authenticated) {
      fetchData(); 
    }
  }, [authenticated]);

  // Hakikisha kila unapoingia tab ya Inbox, ina-refresh kuangalia kama kuna mpya
  useEffect(() => {
    if (activeTab === 'inbox') {
      loadPendingRegistrations();
    }
  }, [activeTab]);

  const showMsg = (txt) => { setMessage(txt); setTimeout(() => setMessage(''), 5000); };

  // 2. FILTERS 
  const filteredTeams = rawTeams.filter(t => String(t.location).toLowerCase().includes(activeLocation) && String(t.season).includes(activeSeason));
  const filteredMatches = rawMatches.filter(m => String(m.location).toLowerCase().includes(activeLocation) && String(m.season).includes(activeSeason));
  const filteredPlayers = rawPlayers.filter(p => String(p.location).toLowerCase().includes(activeLocation) && String(p.season).includes(activeSeason));
  const filteredRegistrations = pendingRegistrations.filter(r => r.location === activeLocation && r.season === activeSeason);

  // Update Mwakere Brain
  useEffect(() => {
    if(StatsEngine) {
       const thoughts = StatsEngine.getGorillaBanter(filteredTeams, filteredMatches);
       setMwakereQuote(thoughts[0]);
    }
  }, [filteredTeams, filteredMatches]);

  // 3. LOGIC YA VISOMANE KABISA (APPROVE / REJECT)
  const handleApproveRegistration = (reg) => {
    // Futa kwenye State na kwenye LocalStorage
    setPendingRegistrations(prev => {
       const newPending = prev.filter(r => r.id !== reg.id);
       localStorage.setItem('pande_pending_regs', JSON.stringify(newPending));
       return newPending;
    });
    
    // Ingiza kwenye Timu Rasmi
    const newTeam = {
      id: `team_${Date.now()}`,
      teamName: reg.teamName,
      location: reg.location,
      season: reg.season,
      points: 0, played: 0, goalDifference: 0, group: 'A' 
    };
    
    setRawTeams(prev => [...prev, newTeam]);
    showMsg(`✅ Timu ya ${reg.teamName} imesajiliwa rasmi kwenye ligi!`);
  };

  const handleRejectRegistration = (reg) => {
    setPendingRegistrations(prev => {
       const newPending = prev.filter(r => r.id !== reg.id);
       localStorage.setItem('pande_pending_regs', JSON.stringify(newPending));
       return newPending;
    });
    showMsg('❌ Ombi Limekataliwa na kuondolewa.');
  };

  // 4. LOGIC YA LIVE SCORE ENGINE
  const handleRecordGoal = (teamSide) => {
    if (!liveMatch) return;
    if (!selectedPlayer) { showMsg('⚠️ Tafadhali chagua mchezaji aliyefunga kwanza!'); return; }

    const currentScore = liveMatch.score || "0-0";
    const parts = currentScore.includes('-') ? currentScore.split('-') : currentScore.split(':');
    let homeScore = parseInt(parts[0]) || 0;
    let awayScore = parseInt(parts[1]) || 0;

    if (teamSide === 'home') homeScore += 1;
    if (teamSide === 'away') awayScore += 1;

    const newScore = `${homeScore} - ${awayScore}`;
    
    const updatedMatch = { ...liveMatch, score: newScore, status: 'LIVE' };
    setLiveMatch(updatedMatch);
    
    setRawMatches(prev => prev.map(m => m.id === liveMatch.id ? updatedMatch : m));
    showMsg(`⚽ GOLI! Matokeo sasa ni: ${newScore}`);
  };

  // GROUPING LIGI
  const groupedStandings = filteredTeams.reduce((groups, team) => {
    const groupName = team.group ? `KUNDI ${team.group}`.toUpperCase() : 'LIGI KUU';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(team);
    return groups;
  }, {});


  // ==========================================
  // VIEW: LOGIN SCREEN
  // ==========================================
  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url('${COBRA_KAI_LOGIN_BG}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', padding: '60px 20px' }}>
        <style>{fontStyles}</style>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,10,0,0.8) 50%, rgba(0,0,0,0.6) 100%)', zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '420px' }}>
          <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, rgba(239,68,68,0.05) 50%, transparent 70%)', borderRadius: '40px', filter: 'blur(30px)', zIndex: -1 }} />

          <div className="glass-transparent" style={{ padding: '40px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 8px 32px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 24px' }}>
              <div className="cobra-loader" style={{ borderColor: '#fbbf24' }}></div>
              <img src={LOGO_PATH} className="logo-float" style={{ width: '100%', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }} alt="Logo" />
            </div>

            <h1 className="oswald" style={{ fontSize: '32px', color: '#fbbf24', margin: '0 0 8px 0', textShadow: '0 0 15px rgba(251,191,36,0.4)', letterSpacing: '1px' }}>
              PANDE CUP
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: '800', margin: '0 0 24px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
              COMMAND CENTRE
            </p>

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              password === ADMIN_PASSWORD_HASH ? setAuthenticated(true) : showMsg('❌ Access Denied! Nenosiri sio sahihi.'); 
            }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <input type="password" placeholder="NENOSIRI LA SENSEI" value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'center', fontSize: '16px', letterSpacing: '3px', background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(251,191,36,0.3)', color: '#fbbf24' }} />
              
              {message && <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 'bold' }}>{message}</div>}

              <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'linear-gradient(to right, #fbbf24, #f59e0b)', color: '#020617', border: 'none', fontSize: '15px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                INGIA COMMAND CENTRE
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: COMMAND CENTRE DASHBOARD
  // ==========================================
  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden', background: '#020617' }}>
      <style>{fontStyles}</style>
      
      {/* SIDEBAR */}
      <aside className="glass sidebar-hide" style={{ width: '280px', padding: '40px 20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <img src={LOGO_PATH} style={{ width: '70px', marginBottom: '16px', filter: 'drop-shadow(0 0 10px rgba(163,230,53,0.3))' }} alt="Logo" />
          <h3 className="oswald" style={{ color: '#a3e635', fontSize: '20px', margin: 0, letterSpacing: '1px' }}>COMMAND CENTRE</h3>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'nav-active' : ''}`}><LayoutDashboard size={20} /> Overview & Misimamo</div>
          <div onClick={() => setActiveTab('live')} className={`nav-item ${activeTab === 'live' ? 'nav-active' : ''}`}><Radio size={20} /> Live Match Engine</div>
          <div onClick={() => setActiveTab('inbox')} className={`nav-item ${activeTab === 'inbox' ? 'nav-active' : ''}`}>
             <ClipboardList size={20} /> Usajili Timu 
             {filteredRegistrations.length > 0 && <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '50px', fontSize: '10px', marginLeft: 'auto' }}>{filteredRegistrations.length} Mpya</span>}
          </div>
          <div onClick={() => setActiveTab('teams')} className={`nav-item ${activeTab === 'teams' ? 'nav-active' : ''}`}><Users size={20} /> Squads & Wachezaji</div>
        </nav>

        {/* Gorilla Insight Preview */}
        <div style={{ padding: '16px', background: 'rgba(30, 41, 59, 0.8)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
             <span style={{ fontSize: '20px' }}>🦍</span>
             <span style={{ color: '#a3e635', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>MWAKERE AI INSIGHT</span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
            "{mwakereQuote || "Natafakari data zilizopo..."}"
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
        
        {/* Background Gradients */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

        {/* HEADER */}
        <header className="glass header-compact" style={{ padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }}>
          <div>
            <h1 className="oswald" style={{ margin: 0, fontSize: '26px', color: 'white', letterSpacing: '0.5px' }}>Karibu Sensei Msangawix! 🥋</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px', margin: '4px 0 0' }}>Command Centre inasoma data zote live.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <select value={activeLocation} onChange={(e) => setActiveLocation(e.target.value)}>
              <option value="kiomoni">📍 TANGA (KIOMONI)</option>
              <option value="goba">📍 DAR (GOBA)</option>
            </select>
            <select value={activeSeason} onChange={(e) => setActiveSeason(e.target.value)}>
              <option value="2026">🏆 Msimu 2026</option>
              <option value="2025">🏆 Msimu 2025</option>
            </select>
            <button onClick={fetchData} className="btn-lime" style={{ padding: '12px', borderRadius: '12px' }} title="Refresh System">
              <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </header>

        {/* MAIN VIEWS */}
        <main className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: '40px', position: 'relative', zIndex: 10 }}>
          
          {message && (
            <div style={{ padding: '16px 24px', background: 'rgba(163, 230, 53, 0.1)', border: '1px solid rgba(163,230,53,0.3)', color: '#a3e635', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}>
              <CheckCircle size={20} /> {message}
            </div>
          )}

          {/* =========================================
              1. OVERVIEW TAB 
              ========================================= */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }} className="grid-responsive">
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #a3e635' }}>
                  <Trophy size={28} color="#a3e635" />
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Timu Ndani ya Mfumo</p>
                  <h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{filteredTeams.length}</h2>
                </div>
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #f59e0b' }}>
                  <ClipboardList size={28} color="#f59e0b" />
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Maombi Mapya Ya Usajili</p>
                  <h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{filteredRegistrations.length}</h2>
                </div>
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #3b82f6' }}>
                  <Radio size={28} color="#3b82f6" />
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Mechi Zilizopangwa</p>
                  <h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{filteredMatches.length}</h2>
                </div>
              </div>

              <h3 className="oswald" style={{ color: 'white', marginBottom: '24px', fontSize: '22px' }}>
                MISIMAMO YA MAKUNDI <span style={{ color: '#a3e635' }}>({activeSeason})</span>
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="grid-responsive">
                {Object.keys(groupedStandings).length > 0 ? Object.keys(groupedStandings).map((groupName, idx) => (
                  <div key={idx} className="dashboard-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: 'rgba(163,230,53,0.1)', padding: '8px', borderRadius: '10px' }}><Shield size={20} color="#a3e635" /></div>
                        <span style={{ fontWeight: '900', fontSize: '16px', color: '#fff', textTransform: 'uppercase' }}>{groupName}</span>
                      </div>
                    </div>
                    {groupedStandings[groupName].sort((a,b) => (b.points || 0) - (a.points || 0)).map((t, i) => (
                       <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }}>
                          <span style={{ color: 'white' }}>{i+1}. {t.teamName || t.team}</span>
                          <span style={{ color: '#a3e635', fontWeight: 'bold' }}>{t.points || 0} PTS</span>
                       </div>
                    ))}
                  </div>
                )) : <p style={{ color: '#64748b' }}>Hakuna data za msimamo.</p>}
              </div>
            </div>
          )}

          {/* =========================================
              2. TEAM REGISTRATION INBOX TAB (VISOMANE)
              ========================================= */}
          {activeTab === 'inbox' && (
            <div>
              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px', fontSize: '22px' }}>MAOMBI YA USAJILI (PENDING)</h3>
              <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Hizi ni timu zilizojaza fomu ya "Sajili Timu" mtandaoni. Ukizikubali zinaingia moja kwa moja kwenye Mfumo.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="grid-responsive">
                {filteredRegistrations.length > 0 ? filteredRegistrations.map((reg) => (
                  <div key={reg.id} className="dashboard-card" style={{ padding: '24px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: 'white' }}>{reg.teamName}</h4>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0' }}>Kocha: <span style={{ color: 'white' }}>{reg.coach}</span></p>
                        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '4px 0' }}>Simu: <span style={{ color: 'white' }}>{reg.phone}</span></p>
                      </div>
                      <div style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
                        NEW
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <button className="btn-lime" style={{ flex: 1, padding: '12px', borderRadius: '10px', fontSize: '12px' }} onClick={() => handleApproveRegistration(reg)}>
                        <CheckCircle size={16} /> KUBALI (APPROVE)
                      </button>
                      <button className="btn-danger" style={{ padding: '12px', borderRadius: '10px' }} onClick={() => handleRejectRegistration(reg)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )) : (
                  <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', border: '1px dashed rgba(255,255,255,0.1)' }}>
                    <ClipboardList size={32} color="#64748b" style={{ margin: '0 auto 16px' }} />
                    <p style={{ color: '#94a3b8', fontSize: '15px', margin: 0 }}>Hakuna maombi mapya ya usajili kwa sasa.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================
              3. LIVE ENGINE TAB (MATCH SCORING)
              ========================================= */}
          {activeTab === 'live' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }} className="grid-responsive">
              <div className="dashboard-card custom-scroll" style={{ padding: '32px', maxHeight: '700px', overflowY: 'auto' }}>                
                <h3 className="oswald" style={{ color: 'white', marginBottom: '24px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Radio color="#ef4444" style={{ animation: 'pulseLive 2s infinite' }} /> CHAGUA MECHI KUREKODI MATOKEO
                </h3>
                
                {filteredMatches.length > 0 ? filteredMatches.map((m, idx) => (
                  <div key={idx} onClick={() => setLiveMatch(m)} style={{ 
                    padding: '20px', background: liveMatch?.id === m.id ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255,255,255,0.03)', 
                    borderRadius: '16px', marginBottom: '16px', cursor: 'pointer', 
                    border: liveMatch?.id === m.id ? '1px solid #a3e635' : '1px solid rgba(255,255,255,0.05)', 
                    transition: 'all 0.2s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: '900', fontSize: '16px', color: 'white' }}>{m.homeTeam || m.home} <span style={{ color: '#64748b', margin: '0 8px' }}>VS</span> {m.awayTeam || m.away}</div>
                      <div style={{ fontSize: '12px', color: '#a3e635', marginTop: '8px', fontWeight: 'bold' }}>{m.status || 'RATIBA'}</div>
                    </div>
                    <div style={{ background: '#020617', padding: '10px 16px', borderRadius: '10px', fontWeight: '900', fontSize: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {m.score || '0 - 0'}
                    </div>
                  </div>
                )) : <p style={{ color: '#64748b' }}>Hakuna mechi.</p>}
              </div>
              
              <div>
                {liveMatch ? (
                  <div className="dashboard-card" style={{ padding: '32px', border: '1px solid #a3e635', position: 'sticky', top: '0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '12px', animation: 'pulseLive 2s infinite' }}>🔴 LIVE ENGINE ACTIVE</div>
                      <h2 style={{ fontSize: '24px', margin: '0 0 16px', fontFamily: 'Oswald', color: 'white' }}>{liveMatch.homeTeam || liveMatch.home} VS {liveMatch.awayTeam || liveMatch.away}</h2>
                      <div style={{ fontSize: '48px', fontWeight: '900', color: '#a3e635', background: 'rgba(163,230,53,0.1)', display: 'inline-block', padding: '10px 30px', borderRadius: '16px', border: '1px solid rgba(163,230,53,0.3)' }}>
                        {liveMatch.score || '0 - 0'}
                      </div>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Mchezaji (Goal Scorer)</label>
                      <select value={selectedPlayer} onChange={(e) => setSelectedPlayer(e.target.value)} style={{ width: '100%' }}>
                        <option value="">-- Chagua --</option>
                        {filteredPlayers.map((p, i) => (
                          <option key={i} value={p.id}>{p.playerName || 'Unknown'} ({p.team})</option>
                        ))}
                      </select>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <button className="btn-lime" style={{ padding: '16px', borderRadius: '12px', flexDirection: 'column', gap: '4px' }} onClick={() => handleRecordGoal('home')}>
                        <span style={{ fontSize: '24px' }}>⚽</span> 
                        <span style={{ fontSize: '11px' }}>{liveMatch.homeTeam || liveMatch.home}</span>
                      </button>
                      <button className="btn-lime" style={{ padding: '16px', borderRadius: '12px', flexDirection: 'column', gap: '4px' }} onClick={() => handleRecordGoal('away')}>
                        <span style={{ fontSize: '24px' }}>⚽</span> 
                        <span style={{ fontSize: '11px' }}>{liveMatch.awayTeam || liveMatch.away}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="dashboard-card" style={{ padding: '40px', textAlign: 'center', height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Radio size={48} color="#334155" style={{ marginBottom: '16px' }} />
                    <p style={{ color: '#94a3b8', fontSize: '15px' }}>Chagua mechi upande wa kushoto kuanza kurekodi matokeo.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB YA SQUADS / WACHEZAJI */}
          {activeTab === 'teams' && (
             <div>
                <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px', fontSize: '22px' }}>ORODHA YA WACHEZAJI</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }} className="grid-responsive">
                  {filteredPlayers.map((p, idx) => (
                    <div key={idx} className="dashboard-card" style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{p.playerName || 'Unknown'}</h4>
                          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0' }}>{p.team || 'N/A'}</p>
                        </div>
                        <div style={{ background: '#a3e635', color: '#020617', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
                          {p.goals || 0} ⚽
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;