import React, { useState, useEffect } from 'react';
import { 
  Lock, Trash2, Users, Trophy, Radio, MessageSquare, 
  LayoutDashboard, Plus, Send, Zap, ClipboardList, 
  RefreshCw, MapPin, Calendar, Activity, ChevronRight, 
  CheckCircle, Maximize2, X, Shield, TrendingUp, Award, AlertCircle, BarChart3, ChevronDown, ChevronUp
} from 'lucide-react';

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
  .glass-transparent { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(251,191,36,0.2); }
  .dashboard-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; transition: all 0.3s ease; }
  .dashboard-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.3); border-color: rgba(163,230,53,0.3); }
  
  .btn-lime { background: #a3e635; color: #020617; font-weight: 800; transition: all 0.3s ease; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; justify-content: center; text-transform: uppercase; letter-spacing: 0.5px; }
  .btn-lime:hover { background: #bef264; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(163, 230, 53, 0.3); }
  .btn-cobra { background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); color: #000; font-family: 'Oswald', sans-serif; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.2s; }
  .btn-cobra:hover { transform: scale(1.02); box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
  
  .nav-item { transition: all 0.2s ease; cursor: pointer; border-radius: 12px; color: #94a3b8; padding: 14px 20px; display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
  .nav-active { background: linear-gradient(90deg, rgba(163, 230, 53, 0.15) 0%, rgba(163, 230, 53, 0.05) 100%) !important; color: #a3e635 !important; border-left: 3px solid #a3e635; border-radius: 0 12px 12px 0; }
  
  select, input { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 16px; border-radius: 10px; outline: none; font-size: 13px; font-weight: 600; }
  select:focus, input:focus { border-color: #a3e635; box-shadow: 0 0 0 2px rgba(163, 230, 53, 0.2); }
  
  .cobra-loader { position: absolute; inset: -15px; border: 2px solid #fbbf24; border-radius: 50%; border-top-color: transparent; border-bottom-color: transparent; animation: spin 3s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .logo-float { animation: float 3s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  
  .custom-scroll::-webkit-scrollbar { width: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); border-radius: 10px; }

  @media (max-width: 768px) {
    .sidebar-hide { display: none !important; }
    .header-compact { flex-direction: column; gap: 16px; align-items: flex-start !important; }
    .grid-responsive { grid-template-columns: 1fr !important; }
  }
`;

// --- ENGINE: CALCULATOR (Auto-Discovery Mode) ---
const calculateLiveStandings = (matches, initialStandings) => {
  const teamStats = {};

  // 1. Initialize from existing Standings entries (if any)
  initialStandings.forEach(team => {
    const normalizedName = team.teamName ? team.teamName.trim() : 'Unknown';
    teamStats[normalizedName] = {
      teamName: normalizedName,
      group: team.group || 'LIGI KUU', // Default group
      played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0,
    };
  });

  // 2. Process Matches (The Auto-Discovery Magic)
  matches.forEach(match => {
    // Check if valid score exists
    const validScore = match.score && match.score.match(/\d+[-:]\d+/);
    
    if (validScore) {
      const parts = match.score.split(/[-:]/);
      const homeGoals = parseInt(parts[0]);
      const awayGoals = parseInt(parts[1]);
      const homeName = match.homeTeam.trim();
      const awayName = match.awayTeam.trim();

      // AUTO-DISCOVERY: Kama timu haipo kwenye list, iunde hapa hapa
      if (!teamStats[homeName]) {
        teamStats[homeName] = { teamName: homeName, group: 'LIGI KUU', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
      }
      if (!teamStats[awayName]) {
        teamStats[awayName] = { teamName: awayName, group: 'LIGI KUU', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
      }

      // Update HOME Stats
      teamStats[homeName].played += 1;
      teamStats[homeName].gf += homeGoals;
      teamStats[homeName].ga += awayGoals;
      teamStats[homeName].gd += (homeGoals - awayGoals);

      // Update AWAY Stats
      teamStats[awayName].played += 1;
      teamStats[awayName].gf += awayGoals;
      teamStats[awayName].ga += homeGoals;
      teamStats[awayName].gd += (awayGoals - homeGoals);

      // Points Logic
      if (homeGoals > awayGoals) {
        teamStats[homeName].won += 1;
        teamStats[homeName].points += 3;
        teamStats[awayName].lost += 1;
      } else if (awayGoals > homeGoals) {
        teamStats[awayName].won += 1;
        teamStats[awayName].points += 3;
        teamStats[homeName].lost += 1;
      } else {
        teamStats[homeName].drawn += 1;
        teamStats[homeName].points += 1;
        teamStats[awayName].drawn += 1;
        teamStats[awayName].points += 1;
      }
    }
  });

  return Object.values(teamStats);
};

const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeLocation, setActiveLocation] = useState('kiomoni'); 
  const [activeSeason, setActiveSeason] = useState('2026');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Data States
  const [rawMatches, setRawMatches] = useState([]);
  const [rawStandings, setRawStandings] = useState([]); // Base teams list
  const [rawRegistrations, setRawRegistrations] = useState([]);
  const [rawPlayers, setRawPlayers] = useState([]);
  const [calculatedStandings, setCalculatedStandings] = useState([]);
  
  const [liveMatch, setLiveMatch] = useState(null);
  const [expandedSquad, setExpandedSquad] = useState(null);

  // 1. DATA FETCHING
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&limit=1000`;
      
      const [tRes, mRes, pRes, rRes] = await Promise.all([
        fetch(`${baseUrl}&content_type=standing`),
        fetch(`${baseUrl}&content_type=match`),
        fetch(`${baseUrl}&content_type=player`),
        fetch(`${baseUrl}&content_type=registration&order=-sys.createdAt`)
      ]);

      const [tData, mData, pData, rData] = await Promise.all([
        tRes.json(), mRes.json(), pRes.json(), rRes.json()
      ]);

      // Normalize Matches
      const parsedMatches = mData.items.map(i => ({
        id: i.sys.id,
        homeTeam: i.fields.homeTeam || i.fields.home || 'Home',
        awayTeam: i.fields.awayTeam || i.fields.away || 'Away',
        score: i.fields.score || '0-0',
        date: i.fields.date || i.fields.matchDate,
        status: i.fields.status || 'Scheduled',
        location: i.fields.location ? String(i.fields.location).toLowerCase() : 'kiomoni',
        season: i.fields.season ? String(i.fields.season) : '2026'
      }));

      // Normalize Standings
      const parsedStandings = tData.items.map(i => ({
        id: i.sys.id,
        teamName: i.fields.teamName || i.fields.team || 'Unknown',
        group: i.fields.group || 'A',
        location: i.fields.location ? String(i.fields.location).toLowerCase() : 'kiomoni',
        season: i.fields.season ? String(i.fields.season) : '2026',
      }));

      // Normalize Registrations
      const parsedRegistrations = rData.items.map(item => {
        let players = [];
        try { if (item.fields.players) players = JSON.parse(item.fields.players); } catch (e) {}
        return {
            id: item.sys.id,
            teamName: item.fields.teamName,
            coach: item.fields.coachName,
            phone: item.fields.phoneNumber,
            location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
            season: item.fields.season ? String(item.fields.season) : '2026',
            date: item.fields.registrationDate,
            totalPlayers: item.fields.totalPlayers,
            playersList: players
        };
      });

      // Normalize Players
      const parsedPlayers = pData.items ? pData.items.map(i => ({
        id: i.sys.id,
        playerName: i.fields.playerName || i.fields.name,
        team: i.fields.team || 'Free Agent',
        goals: parseInt(i.fields.goals || 0),
        location: i.fields.location ? String(i.fields.location).toLowerCase() : 'kiomoni',
        season: i.fields.season ? String(i.fields.season) : '2026'
      })) : [];

      setRawMatches(parsedMatches);
      setRawStandings(parsedStandings);
      setRawRegistrations(parsedRegistrations);
      setRawPlayers(parsedPlayers);
      
      showMsg("⚡ Data Synced Successfully.");
    } catch (err) { 
      console.error(err);
      showMsg("⚠️ Sync Error."); 
    } finally { 
      setIsLoading(false); 
    }
  };

  useEffect(() => { 
    if (authenticated) fetchData(); 
  }, [authenticated]);

  const showMsg = (txt) => { setMessage(txt); setTimeout(() => setMessage(''), 5000); };

  // 2. FILTERING LOGIC
  const filteredMatches = rawMatches.filter(m => m.location.includes(activeLocation) && m.season === String(activeSeason));
  const filteredRegistrations = rawRegistrations.filter(r => r.location.includes(activeLocation) && r.season === String(activeSeason));
  const filteredPlayers = rawPlayers.filter(p => p.location.includes(activeLocation) && p.season === String(activeSeason));
  const standingTeamsBase = rawStandings.filter(t => t.location.includes(activeLocation) && t.season === String(activeSeason));

  // 3. RE-CALCULATE
  useEffect(() => {
    const computed = calculateLiveStandings(filteredMatches, standingTeamsBase);
    const sorted = computed.sort((a,b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.gd !== a.gd) return b.gd - a.gd;
      return b.gf - a.gf;
    });
    setCalculatedStandings(sorted);
  }, [filteredMatches, standingTeamsBase, activeLocation, activeSeason]);

  const handleApproveRegistration = (reg) => showMsg(`✅ ${reg.teamName} Approved (Sync logic pending)`);
  
  const handleRecordGoal = (teamSide) => {
    if (!liveMatch) return;
    const currentScore = liveMatch.score || "0-0";
    const parts = currentScore.includes('-') ? currentScore.split('-') : currentScore.split(':');
    let h = parseInt(parts[0]) || 0; let a = parseInt(parts[1]) || 0;
    if (teamSide === 'home') h++; else a++;
    
    const newScore = `${h}-${a}`;
    const updatedMatch = { ...liveMatch, score: newScore, status: 'LIVE' };
    setLiveMatch(updatedMatch);
    setRawMatches(prev => prev.map(m => m.id === liveMatch.id ? updatedMatch : m));
    showMsg(`⚽ GOLI! ${newScore}`);
  };

  const groupedStandings = calculatedStandings.reduce((groups, team) => {
    const groupName = team.group ? `KUNDI ${team.group}`.toUpperCase() : 'LIGI KUU';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(team);
    return groups;
  }, {});

  // LOGIN SCREEN
  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url('${COBRA_KAI_LOGIN_BG}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', padding: '60px 20px' }}>
        <style>{fontStyles}</style>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,10,0,0.9) 50%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '420px' }}>
          <div className="glass-transparent" style={{ padding: '40px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 8px 32px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            <div style={{ position: 'relative', width: '90px', height: '90px', margin: '0 auto 24px' }}>
              <div className="cobra-loader" style={{ borderColor: '#fbbf24' }}></div>
              <img src={LOGO_PATH} className="logo-float" style={{ width: '100%', position: 'relative', zIndex: 2, filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }} alt="Logo" />
            </div>
            <h1 className="oswald" style={{ fontSize: '24px', color: '#fbbf24', margin: '0 0 8px 0', textShadow: '0 0 15px rgba(251,191,36,0.4)', letterSpacing: '1px' }}>
              PANDE CUP COMMAND CENTRE
            </h1>
            <p className="oswald" style={{ color: '#ef4444', fontSize: '14px', fontWeight: '900', margin: '0 0 30px 0', letterSpacing: '2px', textTransform: 'uppercase' }}>
              STRIKE FIRST. STRIKE HARD. NO MERCY.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); password === ADMIN_PASSWORD_HASH ? setAuthenticated(true) : showMsg('❌ Access Denied!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="password" placeholder="NENOSIRI LA SENSEI" value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'center', fontSize: '16px', letterSpacing: '3px', background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(251,191,36,0.3)', color: '#fbbf24' }} />
              {message && <div style={{ color: '#ef4444', fontSize: '12px', fontWeight: 'bold' }}>{message}</div>}
              <button type="submit" className="btn-cobra" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '16px' }}>
                STRIKE HARD 👊
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

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
             {filteredRegistrations.length > 0 && <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '50px', fontSize: '10px', marginLeft: 'auto' }}>{filteredRegistrations.length}</span>}
          </div>
          <div onClick={() => setActiveTab('teams')} className={`nav-item ${activeTab === 'teams' ? 'nav-active' : ''}`}><Users size={20} /> Squads & Wachezaji</div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

        {/* HEADER */}
        <header className="glass header-compact" style={{ padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }}>
          <div>
            <h1 className="oswald" style={{ margin: 0, fontSize: '26px', color: 'white', letterSpacing: '0.5px' }}>Karibu Sensei Msangawix! 🥋</h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px', margin: '4px 0 0' }}>Data: {activeLocation.toUpperCase()} | {activeSeason}</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <select value={activeLocation} onChange={(e) => setActiveLocation(e.target.value)}><option value="kiomoni">📍 TANGA (KIOMONI)</option><option value="goba">📍 DAR (GOBA)</option></select>
            <select value={activeSeason} onChange={(e) => setActiveSeason(e.target.value)}><option value="2026">🏆 Msimu 2026</option><option value="2025">🏆 Msimu 2025</option></select>
            <button onClick={fetchData} className="btn-lime" style={{ padding: '12px', borderRadius: '12px' }} title="Refresh System"><RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} /></button>
          </div>
        </header>

        {/* MAIN VIEWS */}
        <main className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: '40px', position: 'relative', zIndex: 10 }}>
          {message && <div style={{ padding: '16px 24px', background: 'rgba(163, 230, 53, 0.1)', border: '1px solid rgba(163,230,53,0.3)', color: '#a3e635', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}><CheckCircle size={20} /> {message}</div>}

          {/* 1. OVERVIEW TAB */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }} className="grid-responsive">
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #a3e635' }}><Trophy size={28} color="#a3e635" /><p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Timu Ndani ya Mfumo</p><h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{calculatedStandings.length}</h2></div>
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #f59e0b' }}><ClipboardList size={28} color="#f59e0b" /><p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Maombi Mapya Ya Usajili</p><h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{filteredRegistrations.length}</h2></div>
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #3b82f6' }}><Radio size={28} color="#3b82f6" /><p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Mechi Zilizopangwa</p><h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{filteredMatches.length}</h2></div>
              </div>
              <h3 className="oswald" style={{ color: 'white', marginBottom: '24px', fontSize: '22px' }}>MISIMAMO YA MAKUNDI <span style={{ color: '#a3e635' }}>({activeSeason})</span></h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="grid-responsive">
                {Object.keys(groupedStandings).length > 0 ? Object.keys(groupedStandings).map((groupName, idx) => (
                  <div key={idx} className="dashboard-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: 'rgba(163,230,53,0.1)', padding: '8px', borderRadius: '10px' }}><Shield size={20} color="#a3e635" /></div><span style={{ fontWeight: '900', fontSize: '16px', color: '#fff', textTransform: 'uppercase' }}>{groupName}</span></div></div>
                    {groupedStandings[groupName].sort((a,b) => b.points - a.points).map((t, i) => (<div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }}><span style={{ color: 'white' }}>{i+1}. {t.teamName}</span><span style={{ color: '#a3e635', fontWeight: 'bold' }}>{t.points} PTS</span></div>))}
                  </div>
                )) : <p style={{ color: '#64748b', fontSize: '14px' }}>Hakuna mechi za kutosha kukokotoa msimamo wa {activeSeason}.</p>}
              </div>
            </div>
          )}
          
          {/* 2. INBOX (USAJILI) - WITH IMAGE SUPPORT */}
          {activeTab === 'inbox' && (
            <div>
              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px', fontSize: '22px' }}>MAOMBI YA USAJILI</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }} className="grid-responsive">
                {filteredRegistrations.length > 0 ? filteredRegistrations.map((reg) => (
                  <div key={reg.id} className="dashboard-card" style={{ padding: '24px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                      <div><h4 style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: 'white' }}>{reg.teamName}</h4><p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0' }}>Kocha: {reg.coach}</p></div>
                      <div style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>NEW</div>
                    </div>
                    
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedSquad(expandedSquad === reg.id ? null : reg.id)}>
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#a3e635' }}>WACHEZAJI ({reg.totalPlayers || reg.playersList?.length || 0})</span>
                          {expandedSquad === reg.id ? <ChevronUp size={16} color="#a3e635"/> : <ChevronDown size={16} color="#a3e635"/>}
                       </div>
                       
                       {/* IMAGE-AWARE SQUAD LIST */}
                       {expandedSquad === reg.id && (
                          <div style={{ marginTop: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }} className="custom-scroll">
                             {reg.playersList && reg.playersList.length > 0 ? (
                                <table style={{ width: '100%', fontSize: '12px', color: '#cbd5e1', borderCollapse: 'collapse' }}>
                                   <thead>
                                     <tr style={{ color: '#64748b', textAlign: 'left', fontSize: '10px' }}>
                                       <th style={{ paddingBottom: '8px' }}>Picha</th>
                                       <th style={{ paddingBottom: '8px' }}>No</th>
                                       <th style={{ paddingBottom: '8px' }}>Jina</th>
                                       <th style={{ paddingBottom: '8px' }}>Pos</th>
                                     </tr>
                                   </thead>
                                   <tbody>
                                     {reg.playersList.map((p, i) => (
                                        <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                          <td style={{ padding: '6px 0' }}>
                                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', background: '#334155', border: '1px solid #a3e635' }}>
                                              {p.photo ? (
                                                <img src={p.photo} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                              ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>👤</div>
                                              )}
                                            </div>
                                          </td>
                                          <td style={{ padding: '6px 0', color: '#a3e635', fontWeight: 'bold' }}>{p.number || p.no || '-'}</td>
                                          <td style={{ padding: '6px 0' }}>{p.name}</td>
                                          <td style={{ padding: '6px 0' }}>{p.position || p.pos}</td>
                                        </tr>
                                     ))}
                                   </tbody>
                                </table>
                             ) : <p style={{ fontSize: '12px', color: '#ef4444' }}>Empty Squad.</p>}
                          </div>
                       )}
                    </div>
                    <button className="btn-lime" style={{ width: '100%', padding: '12px', borderRadius: '10px', fontSize: '12px' }} onClick={() => handleApproveRegistration(reg)}><CheckCircle size={16} /> KUBALI</button>
                  </div>
                )) : <p style={{ color: '#64748b', gridColumn: '1/-1', textAlign: 'center' }}>Hakuna maombi mapya.</p>}
              </div>
            </div>
          )}

          {activeTab === 'live' && (
             <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }} className="grid-responsive">
               <div className="dashboard-card custom-scroll" style={{ padding: '32px', maxHeight: '700px', overflowY: 'auto' }}>
                  <h3 className="oswald" style={{ color: 'white', marginBottom: '24px', fontSize: '20px' }}>MECHI ZILIZOPO ({activeSeason})</h3>
                  {filteredMatches.length > 0 ? filteredMatches.map((m, idx) => (
                    <div key={idx} onClick={() => setLiveMatch(m)} style={{ padding: '20px', background: liveMatch?.id === m.id ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255,255,255,0.03)', borderRadius: '16px', marginBottom: '16px', cursor: 'pointer', border: liveMatch?.id === m.id ? '1px solid #a3e635' : '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div><div style={{ fontWeight: '900', fontSize: '16px', color: 'white' }}>{m.homeTeam} <span style={{color: '#64748b'}}>VS</span> {m.awayTeam}</div><div style={{ fontSize: '12px', color: '#a3e635' }}>{m.date ? new Date(m.date).toLocaleDateString() : ''} - {m.status}</div></div>
                       <div style={{ fontWeight: '900', fontSize: '18px' }}>{m.score}</div>
                    </div>
                  )) : <p style={{ color: '#64748b' }}>Hakuna mechi kwa msimu huu.</p>}
               </div>
               <div>
                  {liveMatch ? (
                    <div className="dashboard-card" style={{ padding: '32px', border: '1px solid #a3e635' }}>
                       <h2 style={{ fontSize: '24px', margin: '0 0 16px', fontFamily: 'Oswald', color: 'white', textAlign: 'center' }}>{liveMatch.homeTeam} VS {liveMatch.awayTeam}</h2>
                       <div style={{ fontSize: '48px', fontWeight: '900', color: '#a3e635', textAlign: 'center', marginBottom: '24px' }}>{liveMatch.score}</div>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <button className="btn-lime" style={{ padding: '16px' }} onClick={() => handleRecordGoal('home')}>+ HOME</button>
                          <button className="btn-lime" style={{ padding: '16px' }} onClick={() => handleRecordGoal('away')}>+ AWAY</button>
                       </div>
                    </div>
                  ) : <p style={{ color: '#64748b' }}>Chagua mechi kushoto.</p>}
               </div>
             </div>
          )}
          {activeTab === 'teams' && (
             <div>
                <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px', fontSize: '22px' }}>WACHEZAJI ({activeSeason})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {filteredPlayers.length > 0 ? filteredPlayers.map((p, idx) => (
                    <div key={idx} className="dashboard-card" style={{ padding: '20px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px', color: 'white' }}>{p.playerName}</h4>
                      <p style={{ fontSize: '12px', color: '#94a3b8' }}>{p.team}</p>
                      <div style={{marginTop: '8px', fontSize: '12px', color: '#a3e635'}}>⚽ {p.goals}</div>
                    </div>
                  )) : <p style={{ color: '#64748b' }}>Hakuna wachezaji kwa msimu huu.</p>}
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;