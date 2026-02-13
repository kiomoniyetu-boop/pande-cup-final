import SeasonSwitcher from '../components/SeasonSwitcher';
import GorillaBot from '../components/GorillaBot'; // 🦍 Huyu hapa Mwakere!
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet"; 
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Video, Play, ChevronRight, Phone, Info, History, Newspaper, Trophy, FileText, User, Mail, Calendar, Grid, Shield, Maximize2, ChevronDown, ChevronUp, CheckCircle, Copy, Shirt, Tag, Share2, Target, Bot
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";
const USE_IMAGE_LOGO = true;

// --- LINKS ZA SOCIAL MEDIA ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

// --- ORODHA YA MITAA ---
const LOCATIONS_LIST = [
  { 
    group: 'KIOMONI (Nyumbani - The Root)', 
    areas: ['Kiomoni', 'Mpirani', 'Mabayani', 'Ndumi', 'Magubeni', 'Kivuleni', 'Cross Z', 'Mbogo', 'Kilimanjaro', 'Mowe', 'Masaini', 'Muheza', 'Kikuluni', 'Chote', 'Lwande', 'Marembwe', 'Mavumbi', 'Mijohoroni', 'Mjesani', 'Mnyenzani'] 
  },
  { 
    group: 'TANGA MJINI (Kata & Mitaa)', 
    areas: ['Ngamiani', 'Majengo', 'Mabawa', 'Central', 'Makorora', 'Mzingani', 'Tanga Sisi', 'Mnyanjani', 'Usagara', 'Nguvumali', 'Pongwe', 'Magaoni', 'Duga', 'Maweni', 'Chongoleani', 'Raskazone', 'Donge', 'Gofu'] 
  },
  { 
    group: 'DAR ES SALAAM', 
    areas: ['Goba', 'Madale', 'Makongo', 'Mbezi Mwisho', 'Kimara', 'Sinza', 'Ubungo', 'Mabibo', 'Tegeta', 'Bunju', 'Kinondoni', 'Ilala'] 
  },
  { 
    group: 'ENGINE', 
    areas: ['Nje ya Tanga/Dar'] 
  }
];

// --- DATA ZA KUAZIMIA (FALLBACK) ---
const FALLBACK_DATA = {
  hero: [
    {
      location: 'kiomoni',
      title: "HII GAME NI YETU.",
      subtitle: "Soka la mtaani lenye hadhi ya kitaifa. Tunakuza vipaji, tunajenga undugu, na kutetea heshima ya kwetu.",
      bgImage: "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600" 
    },
    {
      location: 'goba',
      title: "HII GAME NI YETU.",
      subtitle: "Pande Cup Imetua Jijini! Kutoka vumbi la Kiomoni hadi Goba.",
      bgImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600"
    }
  ],
  matches: [],
  standings: [],
  news: [],
  videos: [],
  sponsors: [
    { name: "VODACOM", logo: "/images/vodacom.png", websiteUrl: "https://www.vodacom.co.tz" }, 
    { name: "CRDB BANK", logo: "/images/crdb.png", websiteUrl: "https://www.crdbbank.co.tz" },
    { name: "YAS", logo: "/images/yas.png", websiteUrl: "https://yastz.com" },
    { name: "POLISI TANZANIA", logo: "/images/polisi.png", websiteUrl: "https://www.polisi.go.tz" },
    { name: "AZAM TV", logo: "/images/azam.png", websiteUrl: "https://www.azam.co.tz" }
  ]
};

// --- COMPONENTS ---

// 1. Loading Screen Component (Professional Preloader)
const LoadingScreen = () => (
  <div style={{
    position: 'fixed',
    inset: 0,
    backgroundColor: '#0f172a',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px'
  }}>
    <style>{`
      @keyframes pulse-logo {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }
    `}</style>
    <img 
      src={LOGO_PATH} 
      alt="Loading..." 
      style={{ 
        height: '80px', 
        width: 'auto',
        animation: 'pulse-logo 1.5s infinite ease-in-out'
      }} 
    />
    <div style={{ 
      width: '40px', 
      height: '4px', 
      background: 'rgba(255,255,255,0.1)', 
      borderRadius: '2px', 
      overflow: 'hidden' 
    }}>
      <div style={{ 
        width: '50%', 
        height: '100%', 
        background: '#a3e635', 
        animation: 'loading-bar 1s infinite linear',
        transform: 'translateX(-100%)'
      }}></div>
    </div>
    <style>{`
      @keyframes loading-bar {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
    `}</style>
  </div>
);

const PandeLogo = ({ size = 'normal', isMobile }) => {
  const mobileHeight = '40px';
  const desktopHeight = size === 'large' ? '120px' : '50px';
  const height = isMobile ? mobileHeight : desktopHeight;
  
  const [imgError, setImgError] = useState(false);

  if (USE_IMAGE_LOGO && !imgError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <img 
            src={LOGO_PATH} 
            alt="Pande Cup Logo" 
            style={{ 
              height: height, 
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain', 
              filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.3))',
              transition: 'all 0.3s ease'
            }} 
            onError={() => setImgError(true)} 
          />
      </div>
    );
  }
  return (
    <div style={{ fontSize: size === 'large' ? '32px' : '24px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-1px', color: 'white' }}>
      PANDE<span style={{ color: '#a3e635' }}>CUP</span>
    </div>
  );
};

const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const formatDate = (dateString) => {
  if (!dateString) return "Tarehe";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; 
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatMatchTime = (dateString) => {
    if (!dateString) return { date: '', time: '' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { date: '', time: '' };
    return {
      date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
};

const renderWithLinks = (text) => {
  if (!text) return "";
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) => {
    if (part.match(/https?:\/\/[^\s]+/)) {
      return <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{color: '#a3e635', textDecoration: 'underline', wordBreak: 'break-word'}}>{part}</a>;
    }
    return part;
  });
};

export const HomePage = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('2026'); 
  
  const [isMobile, setIsMobile] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [submitError, setSubmitError] = useState(''); 
  const [teamData, setTeamData] = useState({ 
    name: '', location: '', coachName: '', nidaNumber: '', phone: '', jerseyColor: ''
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  // Start with NULL to trigger Loading Screen
  const [cmsData, setCmsData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // --- HANDLERS ---
  const openModal = () => { setIsModalOpen(true); setModalStep(1); setIsMobileMenuOpen(false); document.body.style.overflow = 'hidden'; setSubmitError(''); };
  const closeModal = () => { setIsModalOpen(false); document.body.style.overflow = 'auto'; };
  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
  
  const handleRegistrationSubmit = async () => {
    setSubmitError('');
    if (!teamData.name || !teamData.coachName || !teamData.phone || !teamData.location) {
        setSubmitError('Tafadhali jaza taarifa zote muhimu.');
        return;
    }
    setIsSubmitting(true);
    // Simulation for Demo
    setTimeout(() => {
        setIsSubmitting(false);
        setModalStep(2);
    }, 1500);
  };

  const openNews = (newsItem) => { setSelectedNews(newsItem); document.body.style.overflow = 'hidden'; };
  const closeNews = () => { setSelectedNews(null); document.body.style.overflow = 'auto'; };
  const openGroupModal = (groupName, teams) => { setSelectedGroup({ name: groupName, teams: teams }); document.body.style.overflow = 'hidden'; };
  const closeGroupModal = () => { setSelectedGroup(null); document.body.style.overflow = 'auto'; };
  
  const handleNewsShare = async (newsItem) => {
    const shareText = `${newsItem.title} - Pande Cup`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: 'Pande Cup', text: shareText, url: shareUrl }); } catch (err) { console.error('Web Share error:', err); }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => alert('Link copied!')).catch(err => console.error('Copy failed:', err));
    }
  };

  // --- FILTER LOGIC ---
  const getFilteredData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.filter(item => {
        const itemLoc = item.location ? String(item.location).trim().toLowerCase() : 'kiomoni';
        const isLocationMatch = itemLoc.includes(activeLocation);
        const itemSeasonRaw = item.season ? String(item.season) : '2026';
        const activeYearMatch = String(activeSeason).match(/(\d{4})/);
        const activeYear = activeYearMatch ? activeYearMatch[1] : String(activeSeason).trim();
        return isLocationMatch && String(itemSeasonRaw).includes(activeYear);
    });
  };

  // --- EFFECTS ---
  useEffect(() => { 
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchContentfulData = async () => {
      // Loader delay to prevent flicker
      const minLoaderTime = new Promise(resolve => setTimeout(resolve, 800));
      
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;
        const getAssetUrl = (id, includes ) => {
            if (!id || !includes || !includes.Asset) return null;
            const asset = includes.Asset.find(a => a.sys.id === id);
            return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
        };
        const fetchData = async (type ) => {
            const res = await fetch(`${baseUrl}&content_type=${type}&include=1`);
            return res.ok ? await res.json() : { items: [] };
        };

        const [heroData, matchesData, newsData, standingsData, videosData, sponsorsData] = await Promise.all([
            fetchData('heroSection'), fetchData('match'), fetchData('news'), fetchData('standing'), fetchData('video'), fetchData('sponsor')
        ]);

        // Mapping Data (Simplified for brevity but functional)
        const fetchedHero = heroData.items ? heroData.items.map(item => ({
            title: item.fields.title, subtitle: item.fields.subtitle, location: String(item.fields.location).toLowerCase(),
            bgImage: getAssetUrl(item.fields.backgroundImage?.sys?.id || item.fields.image?.sys?.id, heroData.includes)
        })) : [];

        const fetchedMatches = matchesData.items ? matchesData.items.map(item => ({
            home: String(item.fields.homeTeam), away: String(item.fields.awayTeam), score: String(item.fields.score || "VS"),
            status: String(item.fields.status), location: String(item.fields.location).toLowerCase(), season: item.fields.season,
            matchDate: item.fields.matchDate, stadium: item.fields.stadium
        })) : [];

        const fetchedNews = newsData.items ? newsData.items.map(item => ({
            date: String(item.fields.date), title: String(item.fields.title), excerpt: String(item.fields.excerpt), body: item.fields.body,
            image: getAssetUrl(item.fields.image?.sys?.id, newsData.includes) || "/images/IMG_5866.jpeg",
            location: String(item.fields.location).toLowerCase(), season: item.fields.season
        })) : [];

        const fetchedStandings = standingsData.items ? standingsData.items.map(item => ({
            team: String(item.fields.teamName), p: item.fields.played, gd: String(item.fields.goalDifference), pts: item.fields.points,
            group: String(item.fields.group).toUpperCase(), location: String(item.fields.location).toLowerCase(), season: item.fields.season
        })) : [];

        const fetchedSponsors = sponsorsData.items ? sponsorsData.items.map(item => ({
            name: item.fields.name, logo: getAssetUrl(item.fields.logo?.sys?.id, sponsorsData.includes), websiteUrl: item.fields.websiteUrl
        })) : [];

        await minLoaderTime;
        setCmsData({
            hero: fetchedHero.length > 0 ? fetchedHero : FALLBACK_DATA.hero,
            matches: fetchedMatches, news: fetchedNews, standings: fetchedStandings, videos: [],
            sponsors: fetchedSponsors.length > 0 ? fetchedSponsors : FALLBACK_DATA.sponsors
        });

      } catch (error) { 
        console.error("CMS Error:", error); 
        setCmsData(FALLBACK_DATA); 
      } finally { setIsLoading(false); }
    };
    fetchContentfulData();
  }, []);

  if (isLoading || !cmsData) return <LoadingScreen />;

  const currentHero = (cmsData.hero.find(h => h.location.includes(activeLocation))) || FALLBACK_DATA.hero[0];
  const filteredMatches = getFilteredData(cmsData.matches);
  const filteredNews = getFilteredData(cmsData.news).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Sort Standings Logic
  const filteredStandings = getFilteredData(cmsData.standings).sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return parseInt(b.gd) - parseInt(a.gd);
  });
  
  // Group Standings
  const groupedStandings = filteredStandings.reduce((groups, team) => {
      const groupName = team.group ? `GROUP ${team.group}` : 'LIGI KUU';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(team);
      return groups;
  }, {});
  const sortedGroupKeys = Object.keys(groupedStandings).sort();

  const isGoba2025 = activeLocation === 'goba' && activeSeason === '2025';

  const upcomingMatches = filteredMatches.filter(m => m.score.toUpperCase() === 'VS' || m.score.includes(':'))
    .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate));
  const pastMatches = filteredMatches.filter(m => m.score.toUpperCase() !== 'VS' && !m.score.includes(':'))
    .sort((a, b) => new Date(b.matchDate) - new Date(a.matchDate));

  // --- STYLES ---
  const styles = {
    container: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif', scrollBehavior: 'smooth', position: 'relative', overflowX: 'hidden' },
    topBar: { backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    nav: { background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 0', position: 'sticky', top: 0, zIndex: 100, width: '100%' },
    navContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', width: '100%' },
    navLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', padding: '8px', background: 'none', border: 'none' },
    heroWrapper: { position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(163, 230, 53, 0.1)', width: '100%' },
    heroMedia: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, objectFit: 'cover' },
    heroOverlay: { position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9))' },
    heroContent: { position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto' },
    mainTitle: { fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1.1', margin: '0 0 16px', textShadow: '0 4px 16px rgba(0,0,0,0.6)' },
    limeText: { color: '#a3e635' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' },
    sectionTitle: { fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', margin: 0 },
    newsCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' },
    matchCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
    groupCard: { backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' },
    locationButton: { padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', border: '1px solid' },
  };

  return (
    <>
      <style>{`
          html { scroll-behavior: smooth; }
          * { box-sizing: border-box; } 
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
          body { font-family: 'Inter', sans-serif; overflow-x: hidden; margin: 0; padding: 0; }
          h1, h2, h3 { font-family: 'Oswald', sans-serif; }
          .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px -10px rgba(163, 230, 53, 0.2); border-color: rgba(163, 230, 53, 0.3) !important; }
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); borderRadius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); borderRadius: 10px; }
          @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .sponsor-marquee { display: flex; gap: 40px; animation: scroll 30s linear infinite; }
          .sponsor-marquee-item { flex-shrink: 0; min-width: 140px; }
          @media (max-width: 768px) { .desktop-only { display: none !important; } }
      `}</style>

      <Helmet><title>Pande Cup - Hii Game Ni Yetu</title></Helmet>

      <div style={styles.container}>
      {/* 1. TOP BAR */}
      <div style={styles.topBar}>
        <SeasonSwitcher activeSeason={activeSeason} setActiveSeason={setActiveSeason} />
      </div>

      {/* 2. NAVIGATION */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <a href="#hero"><PandeLogo isMobile={isMobile} /></a>
          <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a onClick={() => window.location.href='#news'} style={styles.navLink}>Habari</a>
            <a onClick={() => window.location.href='#ratiba'} style={styles.navLink}>Ratiba</a>
            <a href="/sponsors" style={{...styles.navLink, color: '#cbd5e1'}}>Wadhamini</a>
            <button onClick={openModal} style={{...styles.navLink, border: '1px solid #a3e635', borderRadius: '6px', color: '#94a3b8', padding: '6px 18px'}}>SAJILI TIMU</button>
            {process.env.NODE_ENV === 'development' && <a href="/admin" style={{...styles.navLink, color: '#a3e635'}}>ADMIN</a>}
          </div>
          <div style={{ display: 'block', zIndex: 10 }}>
              <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}>{isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#0f172a', zIndex: 200, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <button onClick={toggleMobileMenu} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'white' }}><X size={32} /></button>
            <a href="#hero" onClick={toggleMobileMenu} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Nyumbani</a>
            <a href="#ratiba" onClick={toggleMobileMenu} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Ratiba & Matokeo</a>
            <button onClick={openModal} style={{ background: '#a3e635', color: 'black', padding: '16px', borderRadius: '8px', fontWeight: 'bold', border: 'none', fontSize: '18px' }}>SAJILI TIMU</button>
        </div>
      )}

      {/* 3. HERO */}
      <div id="hero" style={styles.heroWrapper}>
        <img src={currentHero.bgImage || "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600"} style={{...styles.heroMedia, filter: isGoba2025 ? 'grayscale(100%) brightness(0.4)' : 'none'}} alt="Hero" />
        <div style={styles.heroOverlay}></div>
        <section style={styles.heroContent}>
           {/* LOCATION SWITCHER */}
           <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
             <button onClick={() => setActiveLocation('kiomoni')} style={{ ...styles.locationButton, borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', color: activeLocation === 'kiomoni' ? 'black' : 'rgba(255,255,255,0.85)' }}>TANGA</button>
             <button onClick={() => setActiveLocation('goba')} style={{ ...styles.locationButton, borderColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', color: activeLocation === 'goba' ? 'black' : 'rgba(255,255,255,0.85)' }}>DAR</button>
           </div>
           
           {isGoba2025 ? (
              <div style={{textAlign: 'center'}}>
                <h1 style={{...styles.mainTitle, fontSize: '32px'}}>HAKUNA DATA</h1>
                <p style={{ color: '#cbd5e1' }}>Mashindano ya Pande Cup Goba yalianza rasmi 2026.</p>
              </div>
            ) : (
              <>
                <h1 style={styles.mainTitle}>{currentHero.title}</h1>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', marginBottom: '16px' }}>{currentHero.subtitle}</p>
                <div style={{ display: 'flex', gap: '18px', justifyContent: 'center' }}>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{ color: '#fff' }}><Instagram size={28} /></a>
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: '#fff' }}><Facebook size={28} /></a>
                </div>
              </>
            )}
        </section>
      </div>
      
      {/* SPONSORS */}
      <section style={{ padding: '40px 0', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
        <div className="sponsor-marquee">
            {[...cmsData.sponsors, ...cmsData.sponsors].map((s, idx) => (
                <div key={idx} className="sponsor-marquee-item">
                    <img src={s.logo} alt={s.name} style={{ height: '40px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7 }} />
                </div>
            ))}
        </div>
      </section>

      {!isGoba2025 && (
      <>
        {/* 4. NEWS (SCROLLABLE) */}
        <section id="news" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={styles.sectionHeader}><Newspaper style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Habari <span style={styles.limeText}>{activeSeason}</span></h2></div>
          <div className="custom-scroll" style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {filteredNews.map((item, idx) => (
                    <div key={idx} className="hover-card" style={styles.newsCard}>
                        <img src={item.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="News" />
                        <div style={{ padding: '24px' }}>
                            <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold' }}>{formatDate(item.date)}</span>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '8px 0' }}>{item.title}</h3>
                            <button onClick={() => openNews(item)} style={{ background: 'none', border: 'none', color: '#a3e635', fontWeight: 'bold', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>SOMA <ChevronRight size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* 5. MATCH CENTER */}
        <section id="ratiba" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            {/* MATCHES */}
            <div>
               <div style={styles.sectionHeader}><Clock style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Ratiba</h2></div>
               <div className="custom-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                   {[...upcomingMatches, ...pastMatches].map((m, idx) => (
                       <div key={idx} className="hover-card" style={styles.matchCard}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}><span>{formatMatchTime(m.matchDate).date}</span><span>{m.stadium}</span></div>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                               <span style={{ fontWeight: '900' }}>{m.home}</span>
                               <div style={{ textAlign: 'center' }}><span style={{ fontSize: '18px', fontWeight: '900', color: '#fff' }}>{m.score}</span></div>
                               <span style={{ fontWeight: '900' }}>{m.away}</span>
                           </div>
                       </div>
                   ))}
               </div>
            </div>

            {/* STANDINGS */}
            <div>
              <div style={styles.sectionHeader}><Grid style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Msimamo</h2></div>
              <div className="custom-scroll" style={{ maxHeight: '500px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingRight: '10px' }}>
                  {sortedGroupKeys.map((group, idx) => (
                      <div key={idx} style={styles.groupCard}>
                          <div style={{ padding: '16px', backgroundColor: 'rgba(163,230,53,0.1)', color: 'white', fontWeight: 'bold' }}>{group}</div>
                          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                              <thead><tr style={{ textAlign: 'left', color: '#64748b' }}><th style={{ padding: '12px' }}>TIMU</th><th style={{ padding: '12px' }}>P</th><th style={{ padding: '12px' }}>GD</th><th style={{ padding: '12px' }}>PTS</th></tr></thead>
                              <tbody>
                                  {groupedStandings[group].map((t, i) => (
                                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                          <td style={{ padding: '12px' }}>{t.team}</td><td style={{ padding: '12px' }}>{t.p}</td><td style={{ padding: '12px' }}>{t.gd}</td><td style={{ padding: '12px', fontWeight: 'bold', color: '#a3e635' }}>{t.pts}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. GORILLA MWAKERE ZONE - AMEKAA HAPA */}
        <section id="mwakere-zone" style={{ backgroundColor: '#0f172a', paddingBottom: '60px', position: 'relative', zIndex: 20 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(163, 230, 53, 0.1)' }}></div>
            <GorillaBot 
              standings={filteredStandings} 
              matches={filteredMatches} 
              season={activeSeason} 
            />
        </section>
      </>
      )}

      {/* 7. FOOTER (LEFT ALIGNED) */}
      <footer id="about" style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(163, 230, 53, 0.1)', position: 'relative', padding: '50px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <PandeLogo size="large" isMobile={isMobile} />
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '16px', lineHeight: '1.6', textAlign: 'left' }}>Zaidi ya soka, hii ni harakati. Tunatoa "Pande" kwa vipaji vya mtaani kuonekana.</p>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <a href={SOCIAL_LINKS.instagram} className="hover-icon" style={{ color: 'white' }}><Instagram size={18} /></a>
                      <a href={SOCIAL_LINKS.facebook} className="hover-icon" style={{ color: 'white' }}><Facebook size={18} /></a>
                  </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <h4 style={{ color: 'white', fontSize: '13px', fontWeight: '800', marginBottom: '16px', textTransform: 'uppercase' }}>Viungo vya Haraka</h4>
                  <a href="#hero" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', marginBottom: '8px' }}>Nyumbani</a>
                  <a href="#ratiba" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', marginBottom: '8px' }}>Ratiba & Matokeo</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                   <h4 style={{ color: 'white', fontSize: '13px', fontWeight: '800', marginBottom: '16px', textTransform: 'uppercase' }}>Mawasiliano</h4>
                   <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><Phone size={16} color="#a3e635"/><span style={{ fontSize: '13px', color: '#cbd5e1' }}>+255 653 292 935</span></div>
                   <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><Mail size={16} color="#a3e635"/><span style={{ fontSize: '13px', color: '#cbd5e1' }}>pandecup2023@gmail.com</span></div>
              </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '20px', textAlign: 'center', marginTop: '40px' }}>
             <p style={{ fontSize: '12px', color: '#64748b' }}>© 2026 Pande Cup. All Rights Reserved.</p>
          </div>
      </footer>

      {/* MODALS */}
      {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#1e293b', padding: '24px', borderRadius: '16px', width: '90%', maxWidth: '400px', position: 'relative' }}>
                  <button onClick={closeModal} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: 'white' }}><X size={24} /></button>
                  <h2 style={{ color: '#a3e635', textAlign: 'center' }}>Sajili Timu</h2>
                  <p style={{ color: '#cbd5e1', textAlign: 'center', fontSize: '14px' }}>Wasiliana nasi WhatsApp kwa namba hii:</p>
                  <a href="https://wa.me/255653292935" style={{ display: 'block', background: '#25D366', color: 'white', padding: '12px', textAlign: 'center', borderRadius: '8px', marginTop: '16px', textDecoration: 'none', fontWeight: 'bold' }}>Chat WhatsApp</a>
              </div>
          </div>
      )}
      </div>
    </>
  );
};

export default HomePage;