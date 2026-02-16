import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import SeasonSwitcher from '../components/SeasonSwitcher';
import GorillaBot from '../components/GorillaBot';
import { Menu, X, Calendar, MapPin, Trophy, Clock, Shield, Phone, Mail, Filter, Activity } from 'lucide-react';

const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";

const HERO_BACKGROUNDS = {
  kiomoni: "https://images.ctfassets.net/ax6wvfd84net/1vdIuoy6E7R5lqNqv9Z9ML/c004e70367f236b553af19e124c89752/__Pande_Cup_Finals_.jpg",
  goba: "https://images.ctfassets.net/ax6wvfd84net/5OU770QPTByiemzIycqDOU/1eebda85780038f027c36edce5c77c7d/cheche.jpg"
};

const formatDate = (ds) => {
  if (!ds) return "Tarehe";
  const d = new Date(ds);
  return isNaN(d.getTime()) ? ds : d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
};

const formatTime = (t) => t ? String(t).trim() : "TBA";

// --- ENGINE MPYA: CALCULATOR YA MSIMAMO ---
// Hii function inachukua mechi zote na kupiga hesabu za ligi
const calculateLiveStandings = (matches, initialStandings) => {
  // 1. Tengeneza Map ya Timu zote zilizopo kwenye Standings (ili kupata Group)
  const teamStats = {};

  // Initialize teams from Standings (ili tujue wako group gani)
  initialStandings.forEach(team => {
    const normalizedName = team.team.trim();
    teamStats[normalizedName] = {
      team: normalizedName,
      group: team.group,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      gf: 0,
      ga: 0,
      gd: 0,
      points: 0, // Tunaanza na sifuri, tunapiga hesabu upya
      form: []
    };
  });

  // 2. Pitia kila mechi iliyochezwa na update stats
  matches.forEach(match => {
    // Angalia kama mechi imeisha na ina matokeo
    const status = String(match.status || '').toLowerCase();
    const validScore = match.score && match.score.match(/\d+[-:]\d+/);
    
    // Tunapiga hesabu tu kama kuna matokeo halisi (mfano "2-1")
    if (validScore) {
      const parts = match.score.split(/[-:]/);
      const homeGoals = parseInt(parts[0]);
      const awayGoals = parseInt(parts[1]);
      const homeTeamName = match.homeTeam.trim();
      const awayTeamName = match.awayTeam.trim();

      // Hakikisha timu zipo kwenye list yetu, kama hazipo ziongeze (kwa safety)
      if (!teamStats[homeTeamName]) teamStats[homeTeamName] = { team: homeTeamName, group: 'LIGI KUU', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [] };
      if (!teamStats[awayTeamName]) teamStats[awayTeamName] = { team: awayTeamName, group: 'LIGI KUU', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [] };

      // Update HOME Team
      teamStats[homeTeamName].played += 1;
      teamStats[homeTeamName].gf += homeGoals;
      teamStats[homeTeamName].ga += awayGoals;
      teamStats[homeTeamName].gd += (homeGoals - awayGoals);

      // Update AWAY Team
      teamStats[awayTeamName].played += 1;
      teamStats[awayTeamName].gf += awayGoals;
      teamStats[awayTeamName].ga += homeGoals;
      teamStats[awayTeamName].gd += (awayGoals - homeGoals);

      // POINTS & W/D/L
      if (homeGoals > awayGoals) {
        // Home Win
        teamStats[homeTeamName].won += 1;
        teamStats[homeTeamName].points += 3;
        teamStats[homeTeamName].form.push('W');
        
        teamStats[awayTeamName].lost += 1;
        teamStats[awayTeamName].form.push('L');
      } else if (awayGoals > homeGoals) {
        // Away Win
        teamStats[awayTeamName].won += 1;
        teamStats[awayTeamName].points += 3;
        teamStats[awayTeamName].form.push('W');

        teamStats[homeTeamName].lost += 1;
        teamStats[homeTeamName].form.push('L');
      } else {
        // Draw
        teamStats[homeTeamName].drawn += 1;
        teamStats[homeTeamName].points += 1;
        teamStats[homeTeamName].form.push('D');

        teamStats[awayTeamName].drawn += 1;
        teamStats[awayTeamName].points += 1;
        teamStats[awayTeamName].form.push('D');
      }
    }
  });

  // Rudisha array ya timu
  return Object.values(teamStats);
};


// Smart round generator
const generateSmartRounds = (matches) => {
  if (!matches || !matches.length) return [];
  const sorted = [...matches].sort((a,b) => new Date(a.date) - new Date(b.date));
  const rounds = [];
  let current = [];
  let last = null;
  let num = 1;
  
  sorted.forEach((m) => {
    const d = new Date(m.date);
    if (m.round && !m.round.toLowerCase().includes('wiki') && !m.round.toLowerCase().includes('week')) {
      const existing = rounds.find(r => r.id === m.round);
      if (!existing) {
        rounds.push({ id: m.round, label: m.round, count: 1 });
      } else {
        existing.count++;
      }
      return;
    }
    
    if (!last) {
      last = d;
      current.push(m);
    } else {
      const diff = Math.abs((d - last) / (1000 * 60 * 60 * 24));
      if (diff > 4 && current.length > 0) { 
        rounds.push({ id: `Week ${num}`, label: `Wiki ${num}`, count: current.length });
        num++;
        current = [m];
      } else {
        current.push(m);
      }
      last = d;
    }
  });
  
  if (current.length) rounds.push({ id: `Week ${num}`, label: `Wiki ${num}`, count: current.length });
  return rounds;
};

const categorizeMatchStatus = (m) => {
  const st = String(m.status || '').toLowerCase().trim();
  const sc = String(m.score || '').trim();
  const hasScores = sc && sc.match(/\d/); 
  
  if (st.includes('live') || st === 'in progress') return 'live';
  const doneKeywords = ['full time', 'ft', 'penalties', 'pen', 'finished', 'completed', 'final', 'ended'];
  if (doneKeywords.some(s => st.includes(s)) || (hasScores && !st.includes('upcoming'))) return 'completed';
  return 'upcoming';
};

const FixturesPage = () => {
  const [activeTab, setActiveTab] = useState('fixtures');
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('2026'); 
  const [selectedRound, setSelectedRound] = useState('all');
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Data States
  const [fixturesData, setFixturesData] = useState([]);
  const [standingsData, setStandingsData] = useState([]);
  const [calculatedStandings, setCalculatedStandings] = useState([]); // HAPA: Data Mpya
  const [isLoading, setIsLoading] = useState(true);
  const [smartRounds, setSmartRounds] = useState([]);

  useEffect(() => { 
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // DATA FETCHING
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const base = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US&limit=1000`;
        
        const [mRes, sRes] = await Promise.all([
          fetch(`${base}&content_type=match`),
          fetch(`${base}&content_type=standing`)
        ]);

        const [mData, sData] = await Promise.all([mRes.json(), sRes.json()]);

        const processedMatches = (mData.items || []).map(i => ({
          id: i.sys.id,
          homeTeam: i.fields.homeTeam || i.fields.home || "Team A",
          awayTeam: i.fields.awayTeam || i.fields.away || "Team B",
          score: i.fields.score || "",
          status: i.fields.status || "Scheduled",
          date: i.fields.matchDate || i.fields.date || new Date().toISOString(),
          time: i.fields.matchTime || i.fields.time || "16:00",
          location: (i.fields.location || "kiomoni").toLowerCase(),
          season: String(i.fields.season || "2026"),
          round: i.fields.round || "",
          venue: i.fields.venue || i.fields.stadium || "The Root"
        }));

        const processedStandings = (sData.items || []).map(i => ({
          id: i.sys.id,
          team: i.fields.teamName || i.fields.team || "Unknown Team",
          // Tunachukua Group tu, namba nyingine tutazipiga hesabu wenyewe
          group: (i.fields.group || "Ligi Kuu").toUpperCase(),
          location: (i.fields.location || "kiomoni").toLowerCase(),
          season: String(i.fields.season || "2026"),
        }));

        setFixturesData(processedMatches);
        setStandingsData(processedStandings);
      } catch (e) {
        console.error("Data Load Error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  // FILTER & CALCULATE LOGIC
  const filterByContext = (arr) => {
    if (!arr) return [];
    return arr.filter(item => {
      const itemLoc = item.location || '';
      const itemSeason = item.season || '';
      return itemLoc.includes(activeLocation) && itemSeason.includes(activeSeason);
    });
  };

  const filteredFixtures = filterByContext(fixturesData).sort((a,b) => new Date(a.date) - new Date(b.date));
  const rawStandings = filterByContext(standingsData);

  // 🔥 UCHAWI WA CALCULATOR: Piga hesabu hapa kila data zinapobadilika
  useEffect(() => {
    if (fixturesData.length > 0 && standingsData.length > 0) {
      // 1. Filter Mechi za eneo/msimu husika
      const relevantMatches = filterByContext(fixturesData);
      // 2. Filter Timu za eneo/msimu husika
      const relevantTeams = filterByContext(standingsData);
      
      // 3. Piga Hesabu
      const computed = calculateLiveStandings(relevantMatches, relevantTeams);
      
      // 4. Panga (Sort) kwa Pointi > GD > GF
      const sorted = computed.sort((a,b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gd !== a.gd) return b.gd - a.gd;
        return b.gf - a.gf;
      });

      setCalculatedStandings(sorted);
    }
  }, [fixturesData, standingsData, activeLocation, activeSeason]);


  // Generate Rounds
  useEffect(() => {
    if (filteredFixtures.length) setSmartRounds(generateSmartRounds(filteredFixtures));
  }, [filteredFixtures.length, activeLocation, activeSeason]);

  const displayedMatches = selectedRound === 'all' ? filteredFixtures : filteredFixtures.filter(m => {
    if (m.round === selectedRound) return true;
    const roundInfo = smartRounds.find(r => r.id === selectedRound);
    if (!roundInfo) return false;
    const idx = smartRounds.findIndex(r => r.id === selectedRound);
    const startIndex = smartRounds.slice(0, idx).reduce((acc, curr) => acc + curr.count, 0);
    const endIndex = startIndex + roundInfo.count;
    const matchIndex = filteredFixtures.findIndex(f => f.id === m.id);
    return matchIndex >= startIndex && matchIndex < endIndex;
  });

  const liveMatches = displayedMatches.filter(f => categorizeMatchStatus(f) === 'live');
  const upcomingMatches = displayedMatches.filter(f => categorizeMatchStatus(f) === 'upcoming');
  const completedMatches = displayedMatches.filter(f => categorizeMatchStatus(f) === 'completed').reverse();

  // Group Standings (Sasa tunatumia Calculated Standings badala ya Raw)
  const groupedStandings = calculatedStandings.reduce((groups, team) => {
    const groupName = team.group || 'LIGI KUU';
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(team);
    return groups;
  }, {});

  // RENDER MATCH CARD
  const renderMatchCard = (f, i) => {
    const statusCategory = categorizeMatchStatus(f);
    let homeScore = '-', awayScore = '-';
    
    if (f.score && f.score.match(/\d/)) {
      const scores = f.score.split(/[-:]/).map(s => s.trim());
      if (scores.length >= 2) { homeScore = scores[0]; awayScore = scores[1]; }
    }
    const hasScores = homeScore !== '-';
    
    return (
      <div key={i} className="hover-card" style={{ backgroundColor: 'rgba(30,41,59,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: isMobile ? '14px' : '16px', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: isMobile ? '6px' : '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: isMobile ? '9px' : '10px', color: '#a3e635', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={isMobile ? 10 : 11}/> {formatDate(f.date)}
            </span>
            {f.time && f.time !== 'TBA' && (
              <span style={{ fontSize: isMobile ? '9px' : '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={isMobile ? 10 : 11}/> {formatTime(f.time)}
              </span>
            )}
          </div>
          {statusCategory === 'live' ? (
            <div style={{ background: '#ef4444', color: 'white', padding: '3px 8px', borderRadius: '50px', fontSize: '8px', fontWeight: 'bold', animation: 'pulse 2s infinite', display: 'flex', alignItems: 'center', gap: '4px' }}><Activity size={8} /> LIVE</div>
          ) : statusCategory === 'completed' ? (
            <div style={{ background: 'rgba(100,116,139,0.3)', color: '#cbd5e1', padding: '3px 8px', borderRadius: '50px', fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>{f.status || 'FT'}</div>
          ) : (
            <div style={{ background: 'rgba(163,230,53,0.2)', color: '#a3e635', padding: '3px 8px', borderRadius: '50px', fontSize: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>VS</div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: isMobile ? '8px' : '10px', marginBottom: '8px' }}>
          <div style={{ flex: 1, textAlign: 'right' }}><h3 style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '800', margin: 0, fontFamily: 'Oswald, sans-serif', color: homeScore > awayScore ? '#a3e635' : 'white' }}>{f.homeTeam}</h3></div>
          {hasScores ? (
            <div style={{ display: 'flex', gap: isMobile ? '6px' : '8px', padding: isMobile ? '5px 12px' : '6px 14px', background: 'rgba(163,230,53,0.1)', borderRadius: '8px', minWidth: isMobile ? '60px' : '70px', justifyContent: 'center' }}><span style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '900', color: '#a3e635' }}>{homeScore}</span><span style={{ fontSize: isMobile ? '10px' : '12px', color: '#64748b' }}>:</span><span style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '900', color: '#a3e635' }}>{awayScore}</span></div>
          ) : (
            <div style={{ padding: isMobile ? '5px 10px' : '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', minWidth: '45px', display: 'flex', justifyContent: 'center' }}><span style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b' }}>vs</span></div>
          )}
          <div style={{ flex: 1, textAlign: 'left' }}><h3 style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: '800', margin: 0, fontFamily: 'Oswald, sans-serif', color: awayScore > homeScore ? '#a3e635' : 'white' }}>{f.awayTeam}</h3></div>
        </div>
        {f.venue && (<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}><span style={{ fontSize: isMobile ? '9px' : '10px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={isMobile ? 9 : 10}/> {f.venue}</span></div>)}
      </div>
    );
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; } 
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&family=Inter:wght@400;600;700;800;900&display=swap');
        body { margin: 0; padding: 0; background: #0f172a; }
        .hover-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px -10px rgba(163,230,53,0.2); border-color: rgba(163,230,53,0.3) !important; }
        .loading-spinner { border: 4px solid rgba(255,255,255,0.1); border-left-color: #a3e635; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163,230,53,0.4); border-radius: 10px; }
        @media (max-width: 768px) { .desktop-only { display: none !important; } }
      `}</style>
      <Helmet><title>Ratiba na Matokeo | Pande Cup</title><meta name="description" content="Angalia ratiba za mechi, matokeo na misimamo ya makundi ya Pande Cup." /></Helmet>
      <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}><SeasonSwitcher activeSeason={activeSeason} setActiveSeason={setActiveSeason} /></div>
        <nav style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 0', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}><img src={LOGO_PATH} alt="Logo" style={{ height: isMobile ? '40px' : '50px', filter: 'drop-shadow(0 0 8px rgba(163,230,53,0.3))' }} /></Link>
            <div className="desktop-only" style={{ display: 'flex', gap: '24px' }}>
              <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', padding: '8px' }}>Nyumbani</Link>
              <Link to="/news" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', padding: '8px' }}>Habari</Link>
              <Link to="/fixtures" style={{ color: '#a3e635', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', padding: '8px' }}>Ratiba</Link>
              <Link to="/pctv" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', padding: '8px' }}>PC TV</Link>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}>{isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </nav>
        {isMobileMenuOpen && (<div style={{ position: 'fixed', top: 0, right: 0, width: '85%', height: '100vh', backgroundColor: '#0f172a', zIndex: 200, padding: '32px 24px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}><div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}><Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Nyumbani</Link><Link to="/news" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Habari</Link><Link to="/fixtures" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Ratiba</Link></div></div>)}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: isMobile ? '50vh' : '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={HERO_BACKGROUNDS[activeLocation] || HERO_BACKGROUNDS.kiomoni} alt="BG" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(15,23,42,0.6), rgba(15,23,42,0.95))' }}></div>
          <div style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: '900px' }}>
            <h1 style={{ fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', margin: '0 0 16px', fontFamily: 'Oswald, sans-serif', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>RATIBA <span style={{ color: '#a3e635' }}>NA MATOKEO</span></h1>
            <p style={{ color: '#cbd5e1', maxWidth: '600px', margin: isMobile ? '0 auto 24px' : '0 auto 30px', fontSize: isMobile ? '14px' : '15px' }}>Ligi Kuu ya Pande Cup {activeSeason} - {activeLocation.toUpperCase()}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', gap: '12px', padding: '8px 14px', borderRadius: '50px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <button onClick={() => setActiveLocation('kiomoni')} style={{ padding: isMobile ? '6px 16px' : '8px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: isMobile ? '11px' : '12px', cursor: 'pointer', border: '1px solid', borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', color: activeLocation === 'kiomoni' ? 'black' : 'rgba(255,255,255,0.85)' }}>TANGA</button>
                <button onClick={() => setActiveLocation('goba')} style={{ padding: isMobile ? '6px 16px' : '8px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: isMobile ? '11px' : '12px', cursor: 'pointer', border: '1px solid', borderColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', color: activeLocation === 'goba' ? 'black' : 'rgba(255,255,255,0.85)' }}>DAR</button>
              </div>
              {activeTab === 'fixtures' && smartRounds.length > 0 && (<div style={{ position: 'relative' }}><Filter size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a3e635', pointerEvents: 'none', zIndex: 1 }} /><select value={selectedRound} onChange={(e) => setSelectedRound(e.target.value)} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(163,230,53,0.3)', color: 'white', padding: isMobile ? '8px 12px 8px 32px' : '10px 16px 10px 36px', borderRadius: '50px', fontSize: isMobile ? '11px' : '13px', fontWeight: 'bold', cursor: 'pointer', outline: 'none', appearance: 'none', minWidth: isMobile ? '140px' : '180px' }}><option value="all">Vipindi Vyote ({filteredFixtures.length})</option>{smartRounds.map(r => (<option key={r.id} value={r.id}>{r.label} ({r.count})</option>))}</select></div>)}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '800px', margin: isMobile ? '0 auto 30px' : '0 auto 40px', padding: isMobile ? '0 16px' : '0 24px', display: 'flex', gap: isMobile ? '12px' : '16px' }}>
          <button onClick={() => setActiveTab('fixtures')} style={{ flex: 1, padding: isMobile ? '12px' : '14px', fontWeight: '800', fontSize: isMobile ? '11px' : '13px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: activeTab === 'fixtures' ? '#a3e635' : 'rgba(255,255,255,0.05)', color: activeTab === 'fixtures' ? '#020617' : 'white' }}><Calendar size={isMobile ? 16 : 18} /> RATIBA</button>
          <button onClick={() => setActiveTab('standings')} style={{ flex: 1, padding: isMobile ? '12px' : '14px', fontWeight: '800', fontSize: isMobile ? '11px' : '13px', textTransform: 'uppercase', border: 'none', cursor: 'pointer', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: activeTab === 'standings' ? '#a3e635' : 'rgba(255,255,255,0.05)', color: activeTab === 'standings' ? '#020617' : 'white' }}><Trophy size={isMobile ? 16 : 18} /> MSIMAMO</button>
        </div>
        {!isLoading && (<GorillaBot standings={calculatedStandings} matches={filteredFixtures} />)}
        <main style={{ padding: isMobile ? '0 16px 60px' : '0 24px 80px', maxWidth: '1200px', margin: '0 auto', minHeight: '40vh' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}><div className="loading-spinner"></div><p style={{ color: '#94a3b8', marginTop: '16px', fontSize: '14px' }}>Inapakua data...</p></div>
          ) : activeTab === 'fixtures' ? (
            displayedMatches.length > 0 ? (
              <>
                {liveMatches.length > 0 && (<section style={{ marginBottom: isMobile ? '40px' : '50px' }}><h2 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '800', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#a3e635' }}><Activity size={isMobile ? 18 : 20} className="animate-pulse" /> Mechi Zinaendelea</h2><div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '12px' : '16px' }}>{liveMatches.map(renderMatchCard)}</div></section>)}
                {upcomingMatches.length > 0 && (<section style={{ marginBottom: isMobile ? '40px' : '50px' }}><h2 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '800', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#a3e635' }}><Calendar size={isMobile ? 18 : 20} /> Mechi Zinazokuja</h2><div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '12px' : '16px' }}>{upcomingMatches.map(renderMatchCard)}</div></section>)}
                {completedMatches.length > 0 && (<section><h2 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '800', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#a3e635' }}><Trophy size={isMobile ? 18 : 20} /> Mechi Zilizokwisha</h2><div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '12px' : '16px' }}>{completedMatches.map(renderMatchCard)}</div></section>)}
              </>
            ) : (<div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}><Calendar size={48} style={{ opacity: 0.3, marginBottom: '10px' }}/><p style={{ fontSize: isMobile ? '16px' : '18px' }}>Hakuna ratiba bado.</p></div>)
          ) : (
            Object.keys(groupedStandings).length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '16px' : '20px' }}>
                {Object.keys(groupedStandings).map((g, i) => (
                  <div key={i} className="hover-card" style={{ background: 'rgba(30,41,59,0.5)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: isMobile ? '14px' : '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(163,230,53,0.2)' }}><Shield size={isMobile ? 14 : 16} color="#a3e635" /><h3 style={{ margin: 0, fontFamily: 'Oswald, sans-serif', fontSize: isMobile ? '13px' : '14px', color: '#a3e635', fontWeight: '800' }}>{g}</h3></div>
                    <div style={{ maxHeight: '350px', overflowY: 'auto' }} className="custom-scroll">
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ position: 'sticky', top: 0, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(8px)', zIndex: 10 }}>
                          <tr style={{ fontSize: isMobile ? '8px' : '9px', color: '#64748b', textTransform: 'uppercase' }}>
                            <th style={{ padding: isMobile ? '6px 4px' : '8px 6px', fontWeight: '800' }}>#</th>
                            <th style={{ padding: isMobile ? '6px 4px' : '8px 6px', fontWeight: '800', textAlign: 'left' }}>Team</th>
                            <th style={{ padding: isMobile ? '6px 3px' : '8px 4px', textAlign: 'center', fontWeight: '800' }}>P</th>
                            <th style={{ padding: isMobile ? '6px 3px' : '8px 4px', textAlign: 'center', fontWeight: '800' }}>W</th>
                            <th style={{ padding: isMobile ? '6px 3px' : '8px 4px', textAlign: 'center', fontWeight: '800' }}>D</th>
                            <th style={{ padding: isMobile ? '6px 3px' : '8px 4px', textAlign: 'center', fontWeight: '800' }}>L</th>
                            <th style={{ padding: isMobile ? '6px 3px' : '8px 4px', textAlign: 'center', fontWeight: '800' }}>GD</th>
                            <th style={{ padding: isMobile ? '6px 4px' : '8px 6px', textAlign: 'center', fontWeight: '800', color: '#a3e635' }}>Pts</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedStandings[g].map((t, j) => (
                            <tr key={j} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', backgroundColor: j === 0 ? 'rgba(163,230,53,0.08)' : 'transparent' }}>
                              <td style={{ padding: isMobile ? '8px 4px' : '10px 6px', fontWeight: '900', color: j === 0 ? '#a3e635' : j < 3 ? '#cbd5e1' : '#64748b', fontSize: isMobile ? '11px' : '12px' }}>{j + 1}</td>
                              <td style={{ padding: isMobile ? '8px 4px' : '10px 6px', fontWeight: '700', color: 'white', fontSize: isMobile ? '11px' : '12px', fontFamily: 'Oswald, sans-serif' }}>
                                {t.team}
                                {t.form && t.form.length > 0 && (
                                   <div style={{display: 'flex', gap: '2px', marginTop: '2px'}}>
                                      {t.form.slice(-3).map((r, fi) => (
                                        <span key={fi} style={{width: '6px', height: '6px', borderRadius: '50%', background: r === 'W' ? '#22c55e' : r === 'L' ? '#ef4444' : '#64748b'}}></span>
                                      ))}
                                   </div>
                                )}
                              </td>
                              <td style={{ padding: isMobile ? '8px 3px' : '10px 4px', textAlign: 'center', color: '#cbd5e1', fontSize: isMobile ? '10px' : '11px' }}>{t.played}</td>
                              <td style={{ padding: isMobile ? '8px 3px' : '10px 4px', textAlign: 'center', color: '#94a3b8', fontSize: isMobile ? '10px' : '11px' }}>{t.won}</td>
                              <td style={{ padding: isMobile ? '8px 3px' : '10px 4px', textAlign: 'center', color: '#94a3b8', fontSize: isMobile ? '10px' : '11px' }}>{t.drawn}</td>
                              <td style={{ padding: isMobile ? '8px 3px' : '10px 4px', textAlign: 'center', color: '#94a3b8', fontSize: isMobile ? '10px' : '11px' }}>{t.lost}</td>
                              <td style={{ padding: isMobile ? '8px 3px' : '10px 4px', textAlign: 'center', color: t.gd > 0 ? '#a3e635' : t.gd < 0 ? '#ef4444' : '#94a3b8', fontSize: isMobile ? '10px' : '11px', fontWeight: '700' }}>{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
                              <td style={{ padding: isMobile ? '8px 4px' : '10px 6px', textAlign: 'center', fontWeight: '900', color: '#a3e635', fontSize: isMobile ? '13px' : '14px' }}>{t.points}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            ) : (<div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}><Shield size={48} color="#334155" style={{ marginBottom: '16px', opacity: 0.5 }} /><p style={{ fontSize: isMobile ? '14px' : '16px' }}>Hakuna misimamo bado.</p></div>)
          )}
        </main>
        <footer style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(163,230,53,0.1)', padding: isMobile ? '40px 20px 24px' : '50px 24px 30px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: isMobile ? '24px' : '32px' }}>
            <div><img src={LOGO_PATH} alt="Logo" style={{ height: isMobile ? '35px' : '40px', marginBottom: '16px', filter: 'drop-shadow(0 0 8px rgba(163,230,53,0.3))' }}/><p style={{ color: '#94a3b8', fontSize: isMobile ? '12px' : '13px', lineHeight: '1.6', maxWidth: '300px' }}>Zaidi ya soka, hii ni harakati. Ligi Moja, Upendo Mmoja.</p></div>
            <div><h4 style={{ color: 'white', fontSize: isMobile ? '12px' : '13px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '16px' }}>Mawasiliano</h4><div style={{ color: '#94a3b8', fontSize: isMobile ? '12px' : '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}><span style={{display: 'flex', gap: '8px'}}><Phone size={isMobile ? 14 : 16} color="#a3e635"/> +255 653 292 935</span><span style={{display: 'flex', gap: '8px'}}><Mail size={isMobile ? 14 : 16} color="#a3e635"/> pandecup2023@gmail.com</span><span style={{display: 'flex', gap: '8px'}}><MapPin size={isMobile ? 14 : 16} color="#a3e635"/> The Root, Kiomoni & Goba</span></div></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: isMobile ? '30px' : '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: isMobile ? '11px' : '12px' }}>© 2026 Pande Cup. All Rights Reserved.</div>
        </footer>
      </div>
    </>
  );
};

export default FixturesPage;