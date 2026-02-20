import React, { useState, useEffect } from 'react';
import { 
  Lock, Trash2, Users, Trophy, Radio, MessageSquare, 
  LayoutDashboard, Plus, Send, Zap, ClipboardList, 
  RefreshCw, MapPin, Calendar, Activity, ChevronRight, 
  CheckCircle, Maximize2, X, Shield, TrendingUp, Award, 
  AlertCircle, BarChart3, ChevronDown, ChevronUp, XCircle,
  Star, Target, Clock, List
} from 'lucide-react';

// --- GORILLA CARD (PROFESSIONAL & MOBILE-FRIENDLY) ---
const GorillaCard = ({ player, type = "MOTM" }) => {
  const cardConfigs = {
    MOTM: { label: "MAN OF THE MATCH", color: "#a3e635", icon: <Star size={14} />, bg: "linear-gradient(135deg, rgba(163, 230, 53, 0.15) 0%, rgba(2, 6, 23, 0.95) 100%)" },
    TOP_SCORER: { label: "GOLDEN BOOT", color: "#fbbf24", icon: <Target size={14} />, bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(2, 6, 23, 0.95) 100%)" },
    CLEAN_SHEET: { label: "WALL OF PANDE", color: "#3b82f6", icon: <Shield size={14} />, bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(2, 6, 23, 0.95) 100%)" }
  };
  const config = cardConfigs[type] || cardConfigs.MOTM;

  return (
    <div style={{
      width: '100%', maxWidth: '220px', height: '300px', position: 'relative', background: config.bg,
      borderRadius: '16px', border: `2px solid ${config.color}`, overflow: 'hidden',
      boxShadow: `0 8px 24px ${config.color}22`, fontFamily: "'Oswald', sans-serif",
      transition: 'all 0.3s ease', cursor: 'pointer', margin: '0 auto'
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${config.color}44`; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${config.color}22`; }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.03) 50%, transparent 70%)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ backgroundColor: config.color, color: '#020617', fontSize: '9px', fontWeight: '900', padding: '4px 0', textAlign: 'center', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
        {config.label}
      </div>

      <div style={{ height: '150px', width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)' }}>
        {player?.photo && player.photo.startsWith('http') ? (
          <img src={player.photo} alt={player.name} style={{ height: '100%', width: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
        ) : (
          <div style={{ fontSize: '60px', opacity: 0.2 }}>👤</div>
        )}
        <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(8px)', padding: '4px 8px', borderRadius: '6px', border: `1px solid ${config.color}`, display: 'flex', alignItems: 'center', gap: '4px', color: config.color }}>
          {config.icon}
        </div>
      </div>

      <div style={{ padding: '12px', textAlign: 'center', background: 'rgba(2, 6, 23, 0.98)', position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', borderTop: `1px solid ${config.color}33` }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {player?.name || "Mchezaji"}
        </h2>
        <p style={{ color: config.color, margin: '3px 0 8px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '0.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {player?.team || "PANDE CUP"}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 'bold' }}>POS</span>
            <span style={{ fontSize: '13px', color: 'white', fontWeight: '900' }}>{player?.pos || "-"}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 'bold' }}>NO</span>
            <span style={{ fontSize: '13px', color: 'white', fontWeight: '900' }}>{player?.no || "-"}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '8px', color: '#64748b', fontWeight: 'bold' }}>GOALS</span>
            <span style={{ fontSize: '13px', color: config.color, fontWeight: '900' }}>{player?.goals || "0"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🔥 CONFIG YETU HAPA (ONGEZA PREVIEW TOKEN KAMA CLAUDE ALIVYOSHAURI)
const SPACE_ID = process.env.REACT_APP_SPACE_ID || 'ax6wvfd84net';
const PREVIEW_TOKEN = process.env.REACT_APP_PREVIEW_TOKEN || 'OmUmdEXkdk9xv49fwsz2hm9eSKO2dT1UK1ZSVQpWteo'; // 👈 Weka Content Preview Token hapa
const MANAGEMENT_TOKEN = process.env.REACT_APP_ACCESS_TOKEN; 

const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";
const COBRA_KAI_LOGIN_BG = "https://private-us-east-1.manuscdn.com/sessionFile/JmLymlOQ4Xh34kMZAEJn2l/sandbox/eV01jTBgRrK1IEQILJ5kGA-img-1_1771071749000_na1fn_Y29icmEta2FpLWxvZ2luLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80";
const ADMIN_PASSWORD_HASH = 'pandecupwakawaka@2022';

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@700&display=swap');
  * { box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; background: #020617; color: #f8fafc; margin: 0; height: 100vh; overflow: hidden; }
  .oswald { font-family: 'Oswald', sans-serif; letter-spacing: 0.5px; }
  .glass { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
  .dashboard-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; transition: all 0.3s ease; }
  .btn-lime { background: #a3e635; color: #020617; font-weight: 800; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; justify-content: center; text-transform: uppercase; transition: 0.3s; }
  .btn-lime:hover:not(:disabled) { background: #bef264; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(163, 230, 53, 0.3); }
  .btn-lime:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-red { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; justify-content: center; text-transform: uppercase; padding: 12px; border-radius: 10px; transition: 0.3s; }
  .btn-red:hover:not(:disabled) { background: #ef4444; color: white; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3); }
  .btn-cobra { background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%); color: #000; font-family: 'Oswald', sans-serif; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; border: none; cursor: pointer; transition: all 0.2s; }
  .btn-cobra:hover { transform: scale(1.02); box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }
  .nav-item { transition: all 0.2s ease; cursor: pointer; border-radius: 12px; color: #94a3b8; padding: 14px 20px; display: flex; align-items: center; gap: 12px; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
  .nav-active { background: linear-gradient(90deg, rgba(163, 230, 53, 0.15) 0%, rgba(163, 230, 53, 0.05) 100%) !important; color: #a3e635 !important; border-left: 3px solid #a3e635; border-radius: 0 12px 12px 0; }
  select, input { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 16px; border-radius: 10px; outline: none; font-size: 13px; font-weight: 600; width: 100%; }
  select:focus, input:focus { border-color: #a3e635; box-shadow: 0 0 0 2px rgba(163, 230, 53, 0.2); }
  .custom-scroll::-webkit-scrollbar { width: 6px; }
  .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); }
  .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); border-radius: 10px; }
  .inbox-player-card { background: linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; align-items: center; position: relative; }
  .inbox-player-avatar { width: 100px; height: 110px; border-radius: 12px; border: 2px solid #a3e635; background: #334155; margin-bottom: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
  .inbox-player-avatar img { width: 100%; height: 100%; object-fit: cover; }
  
  .bottom-nav { display: none; }
  @media (max-width: 768px) {
    .sidebar-hide { display: none !important; }
    .header-compact { flex-direction: column; gap: 16px; align-items: flex-start !important; }
    .grid-responsive { grid-template-columns: 1fr !important; }
    .main-content-area { padding: 20px !important; padding-bottom: 100px !important; }
    .bottom-nav { display: flex; position: fixed; bottom: 0; left: 0; right: 0; background: rgba(15,23,42,0.98); backdrop-filter: blur(10px); z-index: 100; border-top: 1px solid rgba(255,255,255,0.05); padding: 12px 8px; justify-content: space-around; align-items: center; }
    .nav-item-mobile { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #64748b; font-size: 10px; font-weight: bold; padding: 8px; }
    .nav-active-mobile { color: #a3e635; }
  }
`;

const calculateLiveStandings = (matches, initialStandings) => {
  const teamStats = {};
  initialStandings.forEach(team => {
    const normalizedName = team.teamName ? team.teamName.trim() : 'Unknown';
    teamStats[normalizedName] = { teamName: normalizedName, group: team.group || 'LIGI KUU', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
  });
  matches.forEach(match => {
    const validScore = match.score && match.score.match(/\d+[-:]\d+/);
    if (validScore) {
      const parts = match.score.split(/[-:]/);
      const homeGoals = parseInt(parts[0]); const awayGoals = parseInt(parts[1]);
      const homeName = match.homeTeam.trim(); const awayName = match.awayTeam.trim();
      if (!teamStats[homeName]) teamStats[homeName] = { teamName: homeName, group: 'LIGI KUU', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
      if (!teamStats[awayName]) teamStats[awayName] = { teamName: awayName, group: 'LIGI KUU', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 };
      teamStats[homeName].played += 1; teamStats[homeName].gf += homeGoals; teamStats[homeName].ga += awayGoals; teamStats[homeName].gd += (homeGoals - awayGoals);
      teamStats[awayName].played += 1; teamStats[awayName].gf += awayGoals; teamStats[awayName].ga += homeGoals; teamStats[awayName].gd += (awayGoals - homeGoals);
      if (homeGoals > awayGoals) { teamStats[homeName].won += 1; teamStats[homeName].points += 3; teamStats[awayName].lost += 1; }
      else if (awayGoals > homeGoals) { teamStats[awayName].won += 1; teamStats[awayName].points += 3; teamStats[homeName].lost += 1; }
      else { teamStats[homeName].drawn += 1; teamStats[homeName].points += 1; teamStats[awayName].drawn += 1; teamStats[awayName].points += 1; }
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
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false); 
  const [rawMatches, setRawMatches] = useState([]);
  const [rawStandings, setRawStandings] = useState([]);
  const [rawRegistrations, setRawRegistrations] = useState([]);
  const [rawPlayers, setRawPlayers] = useState([]);
  const [calculatedStandings, setCalculatedStandings] = useState([]);
  const [liveMatch, setLiveMatch] = useState(null);
  const [selectedGoalScorer, setSelectedGoalScorer] = useState(''); 
  const [expandedSquad, setExpandedSquad] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [newMatch, setNewMatch] = useState({ homeTeam: '', awayTeam: '', matchDate: '', time: '', stadium: '' });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 🔥 SENSEI FIX: HAPA NDIPO TUNAPOTUMIA PREVIEW API (Kama Claude Alivyoshauri)
      // Imebadilishwa kutoka cdn.contentful.com kwenda preview.contentful.com
      const baseUrl = `https://preview.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${PREVIEW_TOKEN}&limit=1000`;
      
      // Lazimisha browser isitunze cache yake yenyewe
      const fetchOptions = { cache: 'no-store' };

      const [tRes, mRes, pRes, rRes] = await Promise.all([
        fetch(`${baseUrl}&content_type=standing`, fetchOptions), 
        fetch(`${baseUrl}&content_type=match`, fetchOptions), 
        fetch(`${baseUrl}&content_type=players`, fetchOptions), 
        fetch(`${baseUrl}&content_type=registration&order=-sys.createdAt`, fetchOptions)
      ]);
      const [tData, mData, pData, rData] = await Promise.all([ tRes.json(), mRes.json(), pRes.json(), rRes.json() ]);
      
      if (tData.sys?.type === "Error") throw new Error("API Key ina shida. Angalia Preview Token yako.");

      const tDataItems = tData.items ? tData.items.map(i => ({ 
        id: i.sys.id, 
        teamName: (i.fields.teamName || 'Unknown').trim(), 
        group: i.fields.group || 'LIGI KUU', 
        location: i.fields.location ? String(i.fields.location).toLowerCase().trim() : 'kiomoni', 
        season: i.fields.season ? String(i.fields.season).trim() : '2026' 
      })) : [];
      setRawStandings(tDataItems);

      setRawMatches(mData.items ? mData.items.map(i => ({ 
        id: i.sys.id, 
        homeTeam: String(i.fields.homeTeam || 'Home').trim(), 
        awayTeam: String(i.fields.awayTeam || 'Away').trim(), 
        score: i.fields.score || '0-0', date: i.fields.matchDate, status: i.fields.status || 'Scheduled', 
        location: i.fields.location ? String(i.fields.location).toLowerCase().trim() : 'kiomoni', 
        season: i.fields.season ? String(i.fields.season).trim() : '2026', stadium: i.fields.stadium || '' 
      })) : []);
      
      setRawPlayers(pData.items ? pData.items.map(i => {
         let tName = String(i.fields.team || i.fields.Team || 'Free Agent').trim();
         
         return { 
           id: i.sys.id, 
           playerName: String(i.fields.playerName || i.fields['Player Name'] || 'Unknown').trim(), 
           team: tName, 
           goals: parseInt(i.fields.goals || i.fields.Goals || 0), 
           location: String(i.fields.location || i.fields.Location || 'kiomoni').toLowerCase().trim(), 
           season: String(i.fields.season || i.fields.Season || '2026').trim(), 
           position: String(i.fields.position || i.fields.Position || 'N/A').trim(), 
           jerseyNumber: i.fields.jerseyNumber || i.fields['Jersey Number'] || '-', 
           photo: i.fields.photo || i.fields.Photo || '' 
         };
      }) : []);
      
      setRawRegistrations(rData.items ? rData.items.map(item => { 
        let players = []; 
        try { if (item.fields.playersData) players = JSON.parse(item.fields.playersData); } catch (e) {} 
        if (players.length === 0) { try { if (item.fields.players) players = JSON.parse(item.fields.players); } catch (e) {} } 
        
        return { 
          id: item.sys.id, 
          teamName: String(item.fields.teamName || 'Timu Mpya').trim(), 
          coach: item.fields.coachName || 'N/A', 
          phone: item.fields.phoneNumber || 'N/A', 
          location: String(item.fields.Location || item.fields.location || item.fields.rawLocation || 'kiomoni').toLowerCase().trim(), 
          season: String(item.fields.Season || item.fields.season || '2026').trim(), 
          date: item.fields.registrationDate || item.fields['Registration Date'] || '', 
          totalPlayers: item.fields.totalPlayers || item.fields['Total Players'] || 0, 
          status: item.fields.status || item.fields.Status || 'Pending', 
          playersList: players 
        }; 
      }) : []);
      
      showMsg("⚡ System Synced (Live Preview Engine).", "success");
    } catch (err) { 
      showMsg(`⚠️ Sync Error: ${err.message}`, "error"); 
      console.error(err); 
    } finally { setIsLoading(false); }
  };

  useEffect(() => { if (authenticated) fetchData(); }, [authenticated]);
  
  const showMsg = (txt, type) => { setMessage({text: txt, type}); setTimeout(() => setMessage({text: '', type: ''}), 8000); };
  
  const filteredMatches = rawMatches.filter(m => String(m.location || '').includes(activeLocation) && String(m.season || '').includes(activeSeason));
  const filteredRegistrations = rawRegistrations.filter(r => String(r.location || '').includes(activeLocation) && String(r.season || '').includes(activeSeason));
  const filteredPlayers = rawPlayers.filter(p => String(p.location || '').includes(activeLocation) && String(p.season || '').includes(activeSeason));
  const standingTeamsBase = rawStandings.filter(t => String(t.location || '').includes(activeLocation) && String(t.season || '').includes(activeSeason));
  const pendingInbox = filteredRegistrations.filter(r => { const currentStatus = r.status?.toLowerCase() || 'pending'; return currentStatus === 'pending' || currentStatus === 'inasubiri'; });
  
  const activeMatchPlayers = liveMatch ? filteredPlayers.filter(p => {
    const pTeam = (p.team || '').toLowerCase();
    const hTeam = (liveMatch.homeTeam || '').toLowerCase();
    const aTeam = (liveMatch.awayTeam || '').toLowerCase();
    return pTeam === hTeam || pTeam === aTeam;
  }) : [];

  useEffect(() => {
    const computed = calculateLiveStandings(filteredMatches, standingTeamsBase);
    setCalculatedStandings(computed.sort((a,b) => { if (b.points !== a.points) return b.points - a.points; if (b.gd !== a.gd) return b.gd - a.gd; return b.gf - a.gf; }));
  }, [filteredMatches, standingTeamsBase, activeLocation, activeSeason]);

  const handleApproveRegistration = async (reg) => {
    if (!MANAGEMENT_TOKEN) return showMsg('❌ Management Token missing kwenye .env!', 'error');
    setIsLoading(true);
    let successCount = 0;
    let failedCount = 0;
    const safeTeamName = reg.teamName.trim();
    const universalLocation = reg.location;

    try {
      const getRegRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${reg.id}`, { headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }});
      if(!getRegRes.ok) throw new Error("Haikuweza kuvuta data za usajili Contentful.");
      
      const regEntry = await getRegRes.json(); 
      if (regEntry.fields.Status) delete regEntry.fields.Status;
      regEntry.fields.status = { 'en-US': 'Approved' };
      
      const putRegRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${reg.id}`, { 
        method: 'PUT', 
        headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Version': regEntry.sys.version }, 
        body: JSON.stringify(regEntry) 
      });
      
      if(!putRegRes.ok) throw new Error("Contentful imegoma kubadili Status ya Usajili.");
      const updatedRegEntry = await putRegRes.json();
      await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${reg.id}/published`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': updatedRegEntry.sys.version } });
      
      setRawRegistrations(prev => prev.map(r => r.id === reg.id ? {...r, status: 'Approved'} : r));
      
      // 1. CREATE STANDING
      try {
        const standingData = { 
          fields: { 
            teamName: { 'en-US': safeTeamName }, group: { 'en-US': 'LIGI KUU' }, location: { 'en-US': universalLocation }, 
            season: { 'en-US': reg.season }, points: { 'en-US': 0 }, played: { 'en-US': 0 }, won: { 'en-US': 0 }, drawn: { 'en-US': 0 }, lost: { 'en-US': 0 }, goalsFor: { 'en-US': 0 }, goalsAgainst: { 'en-US': 0 }, goalDifference: { 'en-US': 0 } 
          } 
        };
        const res = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, { method: 'POST', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Content-Type': 'standing' }, body: JSON.stringify(standingData) });
        if (res.ok) {
          const entry = await res.json();
          await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}/published`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': entry.sys.version } });
          setRawStandings(prev => [...prev, { id: entry.sys.id, teamName: safeTeamName, group: 'LIGI KUU', location: reg.location, season: reg.season }]);
        }
      } catch (e) { console.error("Error creating standing", e); }

      let newPlayers = [];
      
      // 2. CREATE PLAYERS
      if (reg.playersList && reg.playersList.length > 0) {
          for (const p of reg.playersList) {
             if (!p.name || !p.name.trim()) continue;
             
             const safeNum = parseInt(p.number);
             const finalJersey = (isNaN(safeNum) || safeNum < 1 || safeNum > 99) ? 99 : safeNum;
             const finalPosition = (p.position && p.position.trim() !== '') ? p.position : 'MID';

             const playerData = { 
               fields: { 
                 playerName: { 'en-US': p.name }, jerseyNumber: { 'en-US': finalJersey }, position: { 'en-US': finalPosition }, goals: { 'en-US': 0 }, season: { 'en-US': reg.season }, location: { 'en-US': universalLocation }, team: { 'en-US': safeTeamName } 
               } 
             };

             if (p.photo && typeof p.photo === 'string') playerData.fields.photo = { 'en-US': p.photo };
             
             try {
                 let pRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, { 
                    method: 'POST', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Content-Type': 'players' }, body: JSON.stringify(playerData) 
                 });

                 if(pRes.ok) {
                    const pEntry = await pRes.json(); 
                    await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${pEntry.sys.id}/published`, { 
                       method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': pEntry.sys.version } 
                    }); 
                    newPlayers.push({ id: pEntry.sys.id, playerName: p.name, team: safeTeamName, goals: 0, location: reg.location, season: reg.season, position: finalPosition, jerseyNumber: finalJersey, photo: p.photo }); 
                    successCount++;
                 } else {
                    failedCount++;
                 }
             } catch(e) { failedCount++; }

             // 🔥 PUMZI NDEFU ILI KUZUIA KUKATAA (Sekunde 0.8)
             await new Promise(resolve => setTimeout(resolve, 800));
          }
      }

      // 3. CREATE COACH (Tengeneza Kocha)
      if (reg.coach && reg.coach !== 'N/A') {
          try {
              const coachData = { 
                 fields: { 
                   playerName: { 'en-US': reg.coach }, jerseyNumber: { 'en-US': 99 }, team: { 'en-US': safeTeamName }, position: { 'en-US': 'Coach' }, goals: { 'en-US': 0 }, season: { 'en-US': reg.season }, location: { 'en-US': universalLocation } 
                 } 
              };

              if (reg.coachPhotoUrl) {
                  coachData.fields.photo = { 'en-US': reg.coachPhotoUrl };
              }

              let cRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, { 
                 method: 'POST', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Content-Type': 'players' }, body: JSON.stringify(coachData) 
              });

              if(cRes.ok) {
                 const cEntry = await cRes.json(); 
                 await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${cEntry.sys.id}/published`, { 
                    method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': cEntry.sys.version } 
                 });
                 newPlayers.push({ id: cEntry.sys.id, playerName: reg.coach, team: safeTeamName, goals: 0, location: reg.location, season: reg.season, position: 'Coach', jerseyNumber: 99, photo: reg.coachPhotoUrl || null });
              }
          } catch(e) { console.error("Coach save error", e); }
      }

      // 🔥 SENSEI FIX: OPTIMISTIC UI KAMA CLAUDE ALIVYOSHAURI
      // Tunaweka data mpya kwenye state hapo hapo kabla hata hatujarefresh
      setRawPlayers(prev => [...prev, ...newPlayers]);
      
      if (failedCount > 0) {
         showMsg(`⚠️ Wachezaji ${successCount} Wameingia, ${failedCount} waligoma kwa mtandao. Nenda kwenye tab ya wachezaji kuangalia.`, 'error');
      } else {
         showMsg(`✅ ${safeTeamName} Imekubaliwa! Wachezaji na Kocha wamesajiliwa kikamilifu! Sasa hivi ukirefresh hawatapotea.`, 'success');
      }
      
    } catch (err) { 
      showMsg(`❌ Kosa: ${err.message}`, 'error'); 
      console.error(err); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleRejectRegistration = async (reg) => {
    if (!window.confirm(`Una uhakika unataka kukataa timu ya ${reg.teamName}?`)) return;
    setIsLoading(true);
    try {
      const getRegRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${reg.id}`, { headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }});
      if(!getRegRes.ok) throw new Error("Haikuweza kupata entry Contentful.");
      
      const regEntry = await getRegRes.json(); 
      if (regEntry.fields.Status) delete regEntry.fields.Status;
      regEntry.fields.status = { 'en-US': 'Rejected' };
      
      const putRegRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${reg.id}`, { 
        method: 'PUT', 
        headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Version': regEntry.sys.version }, 
        body: JSON.stringify(regEntry) 
      });
      if(!putRegRes.ok) throw new Error("Haikuweza kuhifadhi mabadiliko.");
      
      const updatedRegEntry = await putRegRes.json();
      await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${reg.id}/published`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': updatedRegEntry.sys.version } });
      
      setRawRegistrations(prev => prev.map(r => r.id === reg.id ? {...r, status: 'Rejected'} : r));
      showMsg(`⛔ ${reg.teamName} Imekataliwa.`, 'success');
    } catch (err) { 
      showMsg(`❌ Kosa: ${err.message}`, 'error'); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleScheduleMatch = async (e) => {
    e.preventDefault();
    if (!newMatch.homeTeam || !newMatch.awayTeam || !newMatch.matchDate) return showMsg("⚠️ Jaza timu zote mbili na tarehe.", "error");
    if (newMatch.homeTeam === newMatch.awayTeam) return showMsg("⚠️ Timu haiwezi kucheza yenyewe!", "error");
    setIsPublishing(true);

    const universalLocation = activeLocation.toLowerCase();

    try {
      const matchPayload = { 
        fields: { 
          homeTeam: { 'en-US': newMatch.homeTeam }, 
          awayTeam: { 'en-US': newMatch.awayTeam }, 
          score: { 'en-US': 'VS' }, 
          matchDate: { 'en-US': `${newMatch.matchDate}T${newMatch.time || '16:00'}:00Z` }, 
          status: { 'en-US': 'Scheduled' }, 
          location: { 'en-US': universalLocation }, 
          season: { 'en-US': activeSeason }, 
          stadium: { 'en-US': newMatch.stadium || 'Uwanja Mkuu' } 
        } 
      };
      const res = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`, { method: 'POST', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Content-Type': 'match' }, body: JSON.stringify(matchPayload) });
      if (!res.ok) throw new Error('Kuna shida kwenye rules za Contentful!');
      const entry = await res.json();
      await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}/published`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': entry.sys.version } });
      setRawMatches(prev => [...prev, { id: entry.sys.id, homeTeam: newMatch.homeTeam, awayTeam: newMatch.awayTeam, score: 'VS', date: `${newMatch.matchDate}T${newMatch.time || '16:00'}:00`, status: 'Scheduled', location: activeLocation, season: activeSeason, stadium: newMatch.stadium }]);
      setShowMatchModal(false); setNewMatch({ homeTeam: '', awayTeam: '', matchDate: '', time: '', stadium: '' });
      showMsg("✅ Mechi imepangwa!", "success");
    } catch (err) { showMsg(`❌ Error: ${err.message}`, "error"); } finally { setIsPublishing(false); }
  };

  const handleRecordGoal = async (teamSide) => {
    if (!liveMatch) return;
    if (!selectedGoalScorer) { showMsg('⚠️ Chagua mchezaji kwanza!', 'error'); return; }
    setIsPublishing(true); 
    const currentScore = liveMatch.score || "0-0";
    const parts = currentScore.includes('-') ? currentScore.split('-') : currentScore.split(':');
    let h = parseInt(parts[0]) || 0; let a = parseInt(parts[1]) || 0;
    if (teamSide === 'home') h++; else a++;
    const newScore = `${h}-${a}`;
    const updatedMatch = { ...liveMatch, score: newScore, status: 'LIVE' };
    setLiveMatch(updatedMatch); 
    setRawMatches(prev => prev.map(m => m.id === liveMatch.id ? updatedMatch : m));
    setRawPlayers(prev => prev.map(p => p.id === selectedGoalScorer ? { ...p, goals: p.goals + 1 } : p));
    
    if (MANAGEMENT_TOKEN) {
      try {
        const getMatchRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${liveMatch.id}`, { headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }});
        const matchEntry = await getMatchRes.json(); 
        matchEntry.fields.score = { 'en-US': newScore }; 
        matchEntry.fields.status = { 'en-US': 'LIVE' };
        const putMatchRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${liveMatch.id}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Version': matchEntry.sys.version }, body: JSON.stringify(matchEntry) });
        const updatedMatchEntry = await putMatchRes.json();
        await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${liveMatch.id}/published`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': updatedMatchEntry.sys.version } });
        
        const getPlayerRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${selectedGoalScorer}`, { headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}` }});
        const playerEntry = await getPlayerRes.json(); 
        const currentGoals = playerEntry.fields.goals ? playerEntry.fields.goals['en-US'] : 0;
        playerEntry.fields.goals = { 'en-US': currentGoals + 1 };
        const putPlayerRes = await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${selectedGoalScorer}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'Content-Type': 'application/vnd.contentful.management.v1+json', 'X-Contentful-Version': playerEntry.sys.version }, body: JSON.stringify(playerEntry) });
        const updatedPlayerEntry = await putPlayerRes.json();
        await fetch(`https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${selectedGoalScorer}/published`, { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': updatedPlayerEntry.sys.version } });
        
        const scorerName = rawPlayers.find(p => p.id === selectedGoalScorer)?.playerName || 'Mchezaji';
        showMsg(`⚽ GOLI! ${scorerName}! ${newScore}`, 'success'); 
        setSelectedGoalScorer(''); 
      } catch (err) { showMsg(`⚠️ Goli limehesabiwa local.`, 'error'); console.error(err); }
    } else { showMsg(`⚽ GOLI! (Local)`, 'success'); }
    setIsPublishing(false); 
  };

  const playersGroupedByTeam = filteredPlayers.reduce((groups, player) => {
    if (player.position === 'Coach') return groups;
    const tName = (player.team && player.team !== 'Free Agent') ? player.team.toUpperCase().trim() : 'FREE AGENT';
    if (!groups[tName]) groups[tName] = [];
    groups[tName].push(player);
    return groups;
  }, {});

  const groupedStandings = calculatedStandings.reduce((groups, team) => { const groupName = team.group ? `KUNDI ${team.group}`.toUpperCase() : 'LIGI KUU'; if (!groups[groupName]) groups[groupName] = []; groups[groupName].push(team); return groups; }, {});

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: `url('${COBRA_KAI_LOGIN_BG}')`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', padding: '60px 20px' }}>
        <style>{fontStyles}</style>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(20,10,0,0.9) 50%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '420px' }}>
          <div className="glass" style={{ padding: '40px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 8px 32px rgba(251,191,36,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
            <img src={LOGO_PATH} style={{ width: '90px', margin: '0 auto 24px', filter: 'drop-shadow(0 0 15px rgba(251,191,36,0.5))' }} alt="Logo" />
            <h1 className="oswald" style={{ fontSize: '24px', color: '#fbbf24', margin: '0 0 8px 0', letterSpacing: '1px' }}>PANDE CUP COMMAND CENTRE</h1>
            <p className="oswald" style={{ color: '#ef4444', fontSize: '14px', fontWeight: '900', margin: '0 0 30px 0', letterSpacing: '2px' }}>STRIKE FIRST. STRIKE HARD. NO MERCY.</p>
            <form onSubmit={(e) => { e.preventDefault(); password === ADMIN_PASSWORD_HASH ? setAuthenticated(true) : showMsg('❌ Access Denied!', 'error'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="password" placeholder="NENOSIRI LA SENSEI" value={password} onChange={(e) => setPassword(e.target.value)} style={{ textAlign: 'center', fontSize: '16px', letterSpacing: '3px', background: 'rgba(15,23,42,0.8)', borderColor: 'rgba(251,191,36,0.3)', color: '#fbbf24', padding: '16px', borderRadius: '10px' }} />
              {message.text && <div style={{ color: message.type === 'error' ? '#ef4444' : '#a3e635', fontSize: '12px', fontWeight: 'bold' }}>{message.text}</div>}
              <button type="submit" className="btn-cobra" style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '16px' }}>STRIKE HARD 👊</button>
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
          <div onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'nav-active' : ''}`}><LayoutDashboard size={20} /> Overview</div>
          <div onClick={() => setActiveTab('live')} className={`nav-item ${activeTab === 'live' ? 'nav-active' : ''}`}><Radio size={20} /> Live Engine</div>
          <div onClick={() => setActiveTab('inbox')} className={`nav-item ${activeTab === 'inbox' ? 'nav-active' : ''}`}><ClipboardList size={20} /> Pending {pendingInbox.length > 0 && <span style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '50px', fontSize: '10px', marginLeft: 'auto' }}>{pendingInbox.length}</span>}</div>
          <div onClick={() => setActiveTab('all-regs')} className={`nav-item ${activeTab === 'all-regs' ? 'nav-active' : ''}`}><List size={20} /> All Regs <span style={{ background: 'rgba(163,230,53,0.2)', color: '#a3e635', padding: '2px 8px', borderRadius: '50px', fontSize: '10px', marginLeft: 'auto' }}>{filteredRegistrations.length}</span></div>
          <div onClick={() => setActiveTab('teams')} className={`nav-item ${activeTab === 'teams' ? 'nav-active' : ''}`}><Users size={20} /> Wachezaji</div>
        </nav>
      </aside>
      
      {/* MOBILE BOTTOM NAV */}
      <div className="bottom-nav">
        <div onClick={() => setActiveTab('dashboard')} className={`nav-item-mobile ${activeTab === 'dashboard' ? 'nav-active-mobile' : ''}`}><LayoutDashboard size={24} /><span>Home</span></div>
        <div onClick={() => setActiveTab('live')} className={`nav-item-mobile ${activeTab === 'live' ? 'nav-active-mobile' : ''}`}><Radio size={24} /><span>Live</span></div>
        <div onClick={() => setActiveTab('inbox')} className={`nav-item-mobile ${activeTab === 'inbox' ? 'nav-active-mobile' : ''}`} style={{position:'relative'}}><ClipboardList size={24} /><span>Inbox</span>{pendingInbox.length > 0 && <div style={{position:'absolute', top: 0, right: '10px', background:'#ef4444', width:'10px', height:'10px', borderRadius:'50%'}}/>}</div>
        <div onClick={() => setActiveTab('all-regs')} className={`nav-item-mobile ${activeTab === 'all-regs' ? 'nav-active-mobile' : ''}`}><List size={24} /><span>All</span></div>
        <div onClick={() => setActiveTab('teams')} className={`nav-item-mobile ${activeTab === 'teams' ? 'nav-active-mobile' : ''}`}><Users size={24} /><span>Players</span></div>
      </div>
      
      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        
        <header className="glass header-compact" style={{ padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 10 }}>
          <div>
            <h1 className="oswald" style={{ margin: 0, fontSize: '26px', color: 'white', letterSpacing: '0.5px' }}>Welcome Sensei Msangawale! 🥋</h1>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '6px', margin: '6px 0 0', fontStyle: 'italic' }}>This here Dojo is ready for you.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <select value={activeLocation} onChange={(e) => setActiveLocation(e.target.value)} style={{padding:'10px 16px'}}><option value="kiomoni">📍 TANGA</option><option value="goba">📍 DAR</option></select>
            <select value={activeSeason} onChange={(e) => setActiveSeason(e.target.value)} style={{padding:'10px 16px'}}><option value="2026">🏆 2026</option><option value="2025">🏆 2025</option></select>
            <button onClick={fetchData} className="btn-lime" style={{ padding: '12px', borderRadius: '12px' }}><RefreshCw size={18} style={{animation: isLoading ? 'spin 1s linear infinite' : 'none'}} /></button>
          </div>
        </header>
        
        <main className="custom-scroll main-content-area" style={{ flex: 1, overflowY: 'auto', padding: '40px', position: 'relative', zIndex: 10 }}>
          
          {/* 🔥 ENHANCED NOTIFICATION SYSTEM */}
          {message.text && (
            <div style={{ padding: '16px 24px', background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(163, 230, 53, 0.1)', border: `1px solid ${message.type === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(163,230,53,0.3)'}`, color: message.type === 'error' ? '#ef4444' : '#a3e635', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 'bold' }}>
              {message.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />} 
              {message.text}
            </div>
          )}
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }} className="grid-responsive">
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #a3e635' }}><Trophy size={28} color="#a3e635" /><p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Timu</p><h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{calculatedStandings.length}</h2></div>
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #f59e0b' }}><ClipboardList size={28} color="#f59e0b" /><p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Maombi</p><h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{pendingInbox.length}</h2></div>
                <div className="dashboard-card" style={{ padding: '32px 24px', borderLeft: '4px solid #3b82f6' }}><Radio size={28} color="#3b82f6" /><p style={{ fontSize: '13px', color: '#94a3b8', margin: '16px 0 4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Mechi</p><h2 style={{ fontSize: '42px', margin: 0, fontFamily: 'Oswald', color: 'white' }}>{filteredMatches.length}</h2></div>
              </div>
              <h3 className="oswald" style={{ color: 'white', marginBottom: '24px', fontSize: '22px' }}>MISIMAMO ({activeSeason})</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }} className="grid-responsive">
                {Object.keys(groupedStandings).length > 0 ? Object.keys(groupedStandings).map((groupName, idx) => (
                  <div key={idx} className="dashboard-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ background: 'rgba(163,230,53,0.1)', padding: '8px', borderRadius: '10px' }}><Shield size={20} color="#a3e635" /></div><span style={{ fontWeight: '900', fontSize: '16px', color: '#fff', textTransform: 'uppercase' }}>{groupName}</span></div></div>
                    {groupedStandings[groupName].sort((a,b) => b.points - a.points).map((t, i) => (<div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }}><span style={{ color: 'white' }}>{i+1}. {t.teamName}</span><span style={{ color: '#a3e635', fontWeight: 'bold' }}>{t.points} PTS</span></div>))}
                  </div>
                )) : <p style={{ color: '#64748b', fontSize: '14px' }}>Hakuna mechi.</p>}
              </div>
            </div>
          )}
          
          {/* PENDING INBOX TAB */}
          {activeTab === 'inbox' && (
            <div>
              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px', fontSize: '22px' }}>MAOMBI MAPYA (PENDING)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {pendingInbox.length > 0 ? pendingInbox.map((reg) => (
                  <div key={reg.id} className="dashboard-card" style={{ padding: '24px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                      <div><h4 style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: 'white' }}>{reg.teamName}</h4><p style={{ fontSize: '14px', color: '#94a3b8', margin: '6px 0' }}>Kocha: {reg.coach} | {reg.phone}</p></div>
                      <div style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold' }}>PENDING</div>
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedSquad(expandedSquad === reg.id ? null : reg.id)}>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#a3e635' }}>WACHEZAJI ({reg.totalPlayers || 0})</span>
                          {expandedSquad === reg.id ? <ChevronUp size={20} color="#a3e635"/> : <ChevronDown size={20} color="#a3e635"/>}
                       </div>
                       {expandedSquad === reg.id && (
                          <div style={{ marginTop: '20px', maxHeight: '550px', overflowY: 'auto', paddingRight: '5px' }} className="custom-scroll">
                             {reg.playersList && reg.playersList.length > 0 ? (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                                   {reg.playersList.map((p, i) => (
                                      <div key={i} className="inbox-player-card">
                                         <div className="inbox-player-avatar">
                                           {p.photo && p.photo.startsWith('http') ? (<img src={p.photo} alt={p.name} />) : ( <div style={{ fontSize: '32px' }}>👤</div> )}
                                         </div>
                                         <div style={{ fontWeight: '800', fontSize: '14px', textAlign: 'center', marginBottom: '6px', color: 'white' }}>{p.name}</div>
                                         <div style={{ background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.2)', color: '#a3e635', fontSize: '11px', padding: '4px 12px', borderRadius: '50px', fontWeight: '900' }}>{p.position || 'N/A'}</div>
                                      </div>
                                   ))}
                                </div>
                             ) : <p style={{ fontSize: '14px', color: '#ef4444' }}>Hakuna wachezaji.</p>}
                          </div>
                       )}
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button className="btn-lime" style={{ flex: 1, padding: '16px', borderRadius: '12px', fontSize: '14px' }} onClick={() => handleApproveRegistration(reg)} disabled={isLoading}><CheckCircle size={20} /> {isLoading ? 'INAKUBALI...' : 'KUBALI'}</button>
                      <button className="btn-red" style={{ flex: 0.3, padding: '16px', borderRadius: '12px' }} onClick={() => handleRejectRegistration(reg)} disabled={isLoading}><XCircle size={20} /> KATAA</button>
                    </div>
                  </div>
                )) : <p style={{ color: '#64748b', textAlign: 'center', padding: '40px', fontSize: '16px' }}>🎉 Hakuna maombi!</p>}
              </div>
            </div>
          )}

          {/* ALL REGISTRATIONS TAB */}
          {activeTab === 'all-regs' && (
            <div>
              <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px', fontSize: '22px' }}>
                ALL REGISTRATIONS ({filteredRegistrations.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredRegistrations.length > 0 ? filteredRegistrations.map((reg) => (
                  <div key={reg.id} className="dashboard-card" style={{ padding: '20px', borderLeft: reg.status === 'Approved' ? '4px solid #22c55e' : reg.status === 'Rejected' ? '4px solid #ef4444' : '4px solid #f59e0b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '18px', color: 'white', fontWeight: '900' }}>{reg.teamName}</h4>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0' }}>
                          {reg.coach} | {reg.phone}
                        </p>
                      </div>
                      <div style={{ 
                        background: reg.status === 'Approved' ? 'rgba(34, 197, 94, 0.2)' : 
                                   reg.status === 'Rejected' ? 'rgba(239, 68, 68, 0.2)' : 
                                   'rgba(245, 158, 11, 0.2)', 
                        color: reg.status === 'Approved' ? '#22c55e' : 
                               reg.status === 'Rejected' ? '#ef4444' : '#f59e0b',
                        padding: '6px 12px', 
                        borderRadius: '8px', 
                        fontSize: '11px', 
                        fontWeight: 'bold' 
                      }}>
                        {reg.status?.toUpperCase() || 'PENDING'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748b', flexWrap: 'wrap' }}>
                      <span>📍 {reg.location}</span>
                      <span>🏆 {reg.season}</span>
                      <span>👥 {reg.totalPlayers} players</span>
                      <span>📅 {reg.date ? new Date(reg.date).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                )) : <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>Hakuna registrations</p>}
              </div>
            </div>
          )}
          
          {/* LIVE TAB */}
          {activeTab === 'live' && (
             <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }} className="grid-responsive">
               <div className="dashboard-card custom-scroll" style={{ padding: '32px', maxHeight: '700px', overflowY: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 className="oswald" style={{ color: 'white', margin: 0, fontSize: '20px' }}>MECHI ({activeSeason})</h3>
                    <button className="btn-lime" style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '13px' }} onClick={() => setShowMatchModal(true)}><Plus size={16} /> PANGA</button>
                  </div>
                  {filteredMatches.length > 0 ? filteredMatches.map((m, idx) => (
                    <div key={idx} onClick={() => {setLiveMatch(m); setSelectedGoalScorer('');}} style={{ padding: '20px', background: liveMatch?.id === m.id ? 'rgba(163, 230, 53, 0.1)' : 'rgba(255,255,255,0.03)', borderRadius: '16px', marginBottom: '16px', cursor: 'pointer', border: liveMatch?.id === m.id ? '1px solid #a3e635' : '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div><div style={{ fontWeight: '900', fontSize: '16px', color: 'white' }}>{m.homeTeam} <span style={{color: '#64748b'}}>VS</span> {m.awayTeam}</div><div style={{ fontSize: '12px', color: '#a3e635' }}><Clock size={12} style={{display:'inline', marginRight:'4px', verticalAlign:'middle'}}/> {m.date ? new Date(m.date).toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'}) : ''} | {m.stadium || 'TBA'}</div></div>
                       <div style={{ fontWeight: '900', fontSize: '18px' }}>{m.score}</div>
                    </div>
                  )) : <p style={{ color: '#64748b' }}>Hakuna mechi.</p>}
               </div>
               <div>
                  {liveMatch ? (
                    <div className="dashboard-card" style={{ padding: '32px', border: '1px solid #a3e635' }}>
                       <h2 style={{ fontSize: '20px', margin: '0 0 16px', fontFamily: 'Oswald', color: 'white', textAlign: 'center' }}>{liveMatch.homeTeam} VS {liveMatch.awayTeam}</h2>
                       <div style={{ fontSize: '48px', fontWeight: '900', color: '#a3e635', textAlign: 'center', marginBottom: '24px' }}>{liveMatch.score}</div>
                       <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                          <label style={{ display: 'block', fontSize: '12px', color: '#a3e635', fontWeight: 'bold', marginBottom: '8px' }}>⚽ NANI AMEFUNGA?</label>
                          <select className="input" value={selectedGoalScorer} onChange={(e) => setSelectedGoalScorer(e.target.value)} style={{ padding: '12px', fontSize: '14px', border: '1px solid rgba(163,230,53,0.3)' }}>
                             <option value="">-- Chagua --</option>
                             {activeMatchPlayers.length > 0 ? activeMatchPlayers.map(p => (<option key={p.id} value={p.id}>{p.playerName} ({p.team})</option>)) : (<option value="" disabled>Hakuna wachezaji</option>)}
                          </select>
                       </div>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <button className="btn-lime" style={{ padding: '16px', opacity: isPublishing ? 0.7 : 1 }} disabled={isPublishing} onClick={() => handleRecordGoal('home')}>{isPublishing ? 'SAVING...' : `+ ${liveMatch.homeTeam.substring(0, 8)}`}</button>
                          <button className="btn-lime" style={{ padding: '16px', opacity: isPublishing ? 0.7 : 1 }} disabled={isPublishing} onClick={() => handleRecordGoal('away')}>{isPublishing ? 'SAVING...' : `+ ${liveMatch.awayTeam.substring(0, 8)}`}</button>
                       </div>
                    </div>
                  ) : <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>Chagua mechi.</p>}
               </div>
             </div>
          )}
          
          {/* TEAMS TAB */}
          {activeTab === 'teams' && (
             <div>
                <h3 className="oswald" style={{ color: '#a3e635', marginBottom: '25px', fontSize: '24px', borderBottom: '2px solid rgba(163,230,53,0.2)', paddingBottom: '10px', display: 'inline-block' }}>WACHEZAJI / WAFUNGAJI BORA ({activeSeason})</h3>
                
                {Object.keys(playersGroupedByTeam).length > 0 ? (
                  Object.keys(playersGroupedByTeam).map((teamName, idx) => (
                    <div key={idx} style={{ marginBottom: '40px' }}>
                       <h4 style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '20px', fontSize: '18px', textTransform: 'uppercase' }}>
                         🛡️ {teamName} <span style={{ color: '#64748b', fontSize: '14px' }}>({playersGroupedByTeam[teamName].length} Wachezaji/Kocha)</span>
                       </h4>
                       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                         {playersGroupedByTeam[teamName].sort((a, b) => b.goals - a.goals).map((p, pIdx) => { 
                           const gorillaPlayerObj = { name: p.playerName, team: p.team, pos: p.position, no: p.jerseyNumber, goals: p.goals, photo: p.photo }; 
                           const isTopScorer = pIdx === 0 && p.goals > 0; 
                           return ( <GorillaCard key={pIdx} player={gorillaPlayerObj} type={isTopScorer ? "TOP_SCORER" : "MOTM"} /> ); 
                         })}
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="dashboard-card" style={{ padding: '40px', textAlign: 'center' }}>
                     <p style={{ color: '#64748b', fontSize: '16px' }}>Database mpya haina wachezaji. Tafadhali Approve timu mpya kisha subiri dakika 3.</p>
                  </div>
                )}
             </div>
          )}
        </main>
      </div>
      
      {/* MATCH MODAL */}
      {showMatchModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass" style={{ background: 'rgba(15,23,42,0.98)', width: '100%', maxWidth: '420px', borderRadius: '24px', padding: '32px', border: '1px solid rgba(163,230,53,0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
               <h3 className="oswald" style={{ color: '#a3e635', margin: 0, fontSize: '22px' }}>PANGA MECHI</h3>
               <button onClick={() => setShowMatchModal(false)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><X size={24}/></button>
             </div>
             <form onSubmit={handleScheduleMatch} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div><label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>Home</label><select className="input" required value={newMatch.homeTeam} onChange={e => setNewMatch({...newMatch, homeTeam: e.target.value})} style={{padding:'12px'}}><option value="">-- Chagua --</option>{calculatedStandings.map(t => <option key={`h-${t.teamName}`} value={t.teamName}>{t.teamName}</option>)}</select></div>
                <div><label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>Away</label><select className="input" required value={newMatch.awayTeam} onChange={e => setNewMatch({...newMatch, awayTeam: e.target.value})} style={{padding:'12px'}}><option value="">-- Chagua --</option>{calculatedStandings.map(t => <option key={`a-${t.teamName}`} value={t.teamName}>{t.teamName}</option>)}</select></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>Tarehe</label><input className="input" type="date" required value={newMatch.matchDate} onChange={e => setNewMatch({...newMatch, matchDate: e.target.value})} style={{padding:'12px'}} /></div>
                  <div><label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>Muda</label><input className="input" type="time" required value={newMatch.time} onChange={e => setNewMatch({...newMatch, time: e.target.value})} style={{padding:'12px'}} /></div>
                </div>
                <div><label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', display: 'block', fontWeight: 'bold' }}>Stadium</label><input className="input" type="text" placeholder="Uwanja" required value={newMatch.stadium} onChange={e => setNewMatch({...newMatch, stadium: e.target.value})} style={{padding:'12px'}} /></div>
                <button type="submit" className="btn-lime" style={{ padding: '16px', marginTop: '16px', fontSize: '16px', borderRadius: '12px', width: '100%' }} disabled={isPublishing}>{isPublishing ? 'INATUMA...' : 'TUMA ⚽'}</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;