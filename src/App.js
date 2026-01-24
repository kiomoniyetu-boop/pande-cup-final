import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Video, Play, ChevronRight, Phone, Info, History, Newspaper, Trophy, FileText, User, Mail
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "/logo.png";
const USE_IMAGE_LOGO = true;

// --- LINKS ZA SOCIAL MEDIA ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

// --- ABOUT TEXT ---
const ABOUT_TEXT = {
  description: `Pande Cup si ligi ya soka ya kawaida; ni jukwaa la kijamii na kiuchumi linalotumia nguvu ya soka kuunganisha jamii. Ilizaliwa Pande, Tanga na sasa imefika Goba, Dar es Salaam.

Maono yetu ni kuwa kitovu cha:
• Umoja wa Jamii: Kuwajengea vijana hisia ya "Sense of Belonging".
• Fursa za Kiuchumi: Kufungua milango ya biashara.
• Maendeleo ya Kijamii: Elimu na afya kupitia michezo.

Kutoka dimba la Uruguayi Tanga hadi Goba, tunaandika historia.`,
  slogan: `"Umoja Katika Kila Shuti" • "Pamoja Sisi Ni Pande" • "Mimi Na Mto Zigi Dam Dam"`
};

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
    { name: "VODACOM", logo: "/images/vodacom.png" }, 
    { name: "CRDB BANK", logo: "/images/crdb.png" },
    { name: "YAS", logo: "/images/yas.png" },
    { name: "POLISI TANZANIA", logo: "/images/polisi.png" },
    { name: "AZAM TV", logo: "/images/azam.png" }
  ]
};

const FEES = {
  amount: "Tsh 100,000/=", 
  number: "556677",
  name: "PANDE SPORTS ENT"
};

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal', useImage = true }) => {
  const height = size === 'large' ? '120px' : '56px';
  const [imgError, setImgError] = useState(false);

  if (USE_IMAGE_LOGO && !imgError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={LOGO_PATH} 
            alt="Pande Cup Logo" 
            style={{ height: height, objectFit: 'contain' }} 
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

const App = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('June 2026'); 
  
  const [modalStep, setModalStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teamData, setTeamData] = useState({ name: '', location: '', coachName: '', nidaNumber: '', phone: '', termsAccepted: false });
  const [selectedNews, setSelectedNews] = useState(null);
  const [cmsData, setCmsData] = useState(FALLBACK_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // --- HANDLERS ---
  const openModal = () => { setIsModalOpen(true); setModalStep(1); setIsMobileMenuOpen(false); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { setIsModalOpen(false); document.body.style.overflow = 'auto'; };
  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
  const handleFinalSubmit = () => { alert(`Asante ${teamData.coachName}! Maombi ya timu ya ${teamData.name} yamepokelewa. Ofisi itawasiliana nawe kwa hatua zaidi.`); setModalStep(3); };
  const openNews = (newsItem) => { setSelectedNews(newsItem); document.body.style.overflow = 'hidden'; };
  const closeNews = () => { setSelectedNews(null); document.body.style.overflow = 'auto'; };

  // --- FILTER LOGIC ---
  const getFilteredData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.filter(item => {
        const itemLoc = item.location ? String(item.location).trim().toLowerCase() : 'kiomoni';
        const isLocationMatch = itemLoc.includes(activeLocation);
        const itemSeasonRaw = item.season ? String(item.season) : 'June 2026';
        const itemSeasonClean = itemSeasonRaw.trim().toLowerCase();
        const activeSeasonClean = activeSeason.trim().toLowerCase();
        return isLocationMatch && itemSeasonClean === activeSeasonClean;
    });
  };

  // --- EFFECTS ---
  useEffect(() => {
    const fetchContentfulData = async () => {
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;

        // 1. HERO
        const heroRes = await fetch(`${baseUrl}&content_type=heroSection&include=1`);
        let fetchedHero = FALLBACK_DATA.hero;
        if (heroRes.ok) {
            const heroJson = await heroRes.json();
            const getAssetUrl = (id, includes) => {
                if (!id || !includes || !includes.Asset) return null;
                const asset = includes.Asset.find(a => a.sys.id === id);
                return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
            };
            if (heroJson.items && heroJson.items.length > 0) {
                fetchedHero = heroJson.items.map(item => ({
                    title: item.fields.title || "HII GAME NI YETU.",
                    subtitle: item.fields.subtitle || "",
                    location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
                    bgImage: getAssetUrl(item.fields.backgroundImage?.sys?.id || item.fields.image?.sys?.id, heroJson.includes)
                }));
            }
        }

        // 2. DATA ZOTE
        const fetchData = async (type) => {
            const res = await fetch(`${baseUrl}&content_type=${type}&include=1`);
            if (!res.ok) return [];
            return await res.json();
        };

        const [matchesData, newsData, standingsData, videosData] = await Promise.all([
            fetchData('match'), fetchData('news'), fetchData('standing'), fetchData('video')
        ]);

        // Process Matches
        const fetchedMatches = matchesData.items ? matchesData.items.map(item => ({
            home: String(item.fields.homeTeam || "Home"),
            away: String(item.fields.awayTeam || "Away"),
            score: String(item.fields.score || "VS"),
            status: String(item.fields.status || "Ratiba"),
            location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
            season: item.fields.season || "June 2026"
        })) : [];

        // Process News
        const fetchedNews = newsData.items ? newsData.items.map(item => {
             const getNewsImage = (id) => {
                if (!id || !newsData.includes || !newsData.includes.Asset) return null;
                const asset = newsData.includes.Asset.find(a => a.sys.id === id);
                return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
             };
             return {
                date: String(item.fields.date || "Mpya"),
                title: String(item.fields.title || "Habari Mpya"),
                excerpt: String(item.fields.excerpt || "Soma zaidi..."),
                body: item.fields.body || "",
                image: getNewsImage(item.fields.image?.sys?.id) || "/images/IMG_5866.jpeg",
                location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
                season: item.fields.season || "June 2026"
             };
        }) : [];

        // Process Standings
        const fetchedStandings = standingsData.items ? standingsData.items.map(item => ({
            pos: item.fields.position || 0,
            team: String(item.fields.teamName || "Team"),
            p: item.fields.played || 0,
            gd: String(item.fields.goalDifference || "0"),
            pts: item.fields.points || 0,
            location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
            season: item.fields.season || "June 2026"
        })).sort((a, b) => a.pos - b.pos) : [];

        // Process Videos
        const fetchedVideos = videosData.items ? videosData.items.map(item => {
             const getThumb = (id) => {
                if (!id || !videosData.includes || !videosData.includes.Asset) return null;
                const asset = videosData.includes.Asset.find(a => a.sys.id === id);
                return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
             };
             return {
                title: String(item.fields.title || "Video"),
                videoUrl: String(item.fields.videoUrl || "#"),
                duration: String(item.fields.duration || ""),
                thumbnail: getThumb(item.fields.thumbnail?.sys?.id) || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=500",
                location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
                season: item.fields.season || "June 2026"
             };
        }) : [];

        setCmsData({
            hero: fetchedHero,
            matches: fetchedMatches,
            news: fetchedNews,
            standings: fetchedStandings, 
            videos: fetchedVideos,
            sponsors: FALLBACK_DATA.sponsors
        });

      } catch (error) {
        console.error("CMS Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContentfulData();
  }, []);

  const getCurrentHero = () => {
    const heroList = cmsData.hero && cmsData.hero.length > 0 ? cmsData.hero : FALLBACK_DATA.hero;
    const heroItem = heroList.find(h => h.location.includes(activeLocation));
    return heroItem || FALLBACK_DATA.hero[0];
  };

  const currentHero = getCurrentHero();
  
  const filteredMatches = getFilteredData(cmsData.matches);
  const upcomingMatches = filteredMatches.filter(m => m.score.toUpperCase() === 'VS' || m.score.includes(':'));
  const pastMatches = filteredMatches.filter(m => m.score.toUpperCase() !== 'VS' && !m.score.includes(':'));
  const filteredNews = getFilteredData(cmsData.news);
  const filteredStandings = getFilteredData(cmsData.standings);
  const filteredVideos = getFilteredData(cmsData.videos);

  const isGoba2025 = activeLocation === 'goba' && activeSeason === 'June 2025';

  let displayTitle = currentHero.title;
  let displaySubtitle = currentHero.subtitle;
  let displayTag = `${activeSeason} • ${activeLocation.toUpperCase()}`;

  if (activeSeason === 'June 2025' && !isGoba2025) {
     displayTitle = "HISTORIA: JUNI 2025";
     displaySubtitle = "Msimu wa Historia. Bingwa alipatikana kwa jasho na damu mbele ya maelfu ya wakazi wa Kiomoni.";
  }

  const styles = {
    container: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif', scrollBehavior: 'smooth', position: 'relative', overflowX: 'hidden' },
    topBar: { 
      backgroundColor: '#1e293b', 
      padding: '8px 24px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      fontSize: '11px', 
      borderBottom: '1px solid rgba(255,255,255,0.05)' 
    },
    nav: { borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 0', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' },
    navContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' },
    navLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', transition: 'color 0.2s', cursor: 'pointer', padding: '8px' },
    heroWrapper: { position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(163, 230, 53, 0.1)' },
    heroMedia: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, objectFit: 'cover' },
    heroOverlay: { position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9))' },
    heroContent: { position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    mainTitle: { fontSize: 'clamp(3rem, 11vw, 7rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '0.9', letterSpacing: '-0.03em', margin: '0 0 24px', textShadow: '0 10px 30px rgba(0,0,0,0.8)' },
    limeText: { color: '#a3e635' },
    buttonPrimary: { backgroundColor: '#a3e635', color: '#020617', padding: '14px 28px', borderRadius: '8px', fontWeight: '800', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontStyle: 'italic', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(163, 230, 53, 0.2)' },
    locationButton: { padding: '10px 24px', borderRadius: '50px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', border: '1px solid' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' },
    sectionTitle: { fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', margin: 0 },
    newsCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', height: '100%' },
    mobileMenu: { position: 'fixed', top: '0', right: '0', width: '85%', maxWidth: '320px', height: '100vh', backgroundColor: '#0f172a', zIndex: 60, padding: '32px 24px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', borderLeft: '1px solid rgba(255,255,255,0.1)' },
    matchCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '14px' },
    th: { textAlign: 'left', padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#64748b', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' },
    td: { padding: '16px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
          body { font-family: 'Inter', sans-serif; }
          h1, h2, h3, .logo-text { font-family: 'Oswald', sans-serif; }
          .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px -10px rgba(163, 230, 53, 0.2); border-color: rgba(163, 230, 53, 0.3) !important; }
          .nav-glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(15, 23, 42, 0.85) !important; }
          
          /* MOBILE ADJUSTMENTS */
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .mobile-center { justify-content: center !important; width: 100%; }
            .top-bar-mobile { padding: 8px 12px !important; }
            .hero-mobile-height { min-height: 70vh !important; }
          }
        `}
      </style>
      <div style={styles.container}>
      {/* 1. TOP BAR */}
      <div style={styles.topBar} className="top-bar-mobile">
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
            <History size={14} /><span style={{ fontWeight: 'bold' }}>SEASON:</span>
            {isLoading ? 
                <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: 8 }}>Loading...</span> : 
                <span style={{ fontSize: '10px', color: '#22c55e', marginLeft: 8, fontWeight: 'bold' }}>{activeSeason}</span>
            }
        </div>
        <div className="mobile-center" style={{ display: 'flex', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', color: activeSeason === 'June 2025' ? '#a3e635' : '#64748b', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setActiveSeason('June 2025'); setActiveLocation('kiomoni'); }}>JUNE 2025 (HISTORIA)</button>
            <button style={{ background: 'none', border: 'none', color: activeSeason === 'June 2026' ? '#a3e635' : '#64748b', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveSeason('June 2026')}>JUNE 2026 (LIVE)</button>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav style={styles.nav} className="nav-glass nav-mobile">
        <div style={styles.navContent}>
          <a href="#hero" style={{ textDecoration: 'none', cursor: 'pointer' }}><PandeLogo /></a>
          <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a onClick={() => window.location.href='#news'} style={styles.navLink}>Habari</a>
            <a onClick={() => window.location.href='#ratiba'} style={styles.navLink}>Ratiba</a>
            <a onClick={() => window.location.href='#tv'} style={styles.navLink}>PC TV</a>
            <button onClick={openModal} style={{ ...styles.buttonPrimary, padding: '10px 24px', fontSize: '12px' }}>SAJILI TIMU</button>
          </div>
          <div style={{ display: 'block' }}>
             <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: window.innerWidth <= 768 ? 'block' : 'none' }}>{isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div style={styles.mobileMenu}>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Nyumbani</a>
            <a href="#news" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Habari & Updates</a>
            <a href="#ratiba" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Ratiba & Matokeo</a>
            <button onClick={openModal} style={{ ...styles.buttonPrimary, marginTop: '20px', width: '100%', justifyContent: 'center' }}>SAJILI TIMU</button>
        </div>
      </div>
      {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 55, backdropFilter: 'blur(4px)' }}></div>}

      {/* 3. HERO SECTION */}
      <div id="hero" style={styles.heroWrapper} className="hero-mobile-height">
        <img 
            src={isGoba2025 ? "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600" : (currentHero.bgImage || "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600")}
            style={{...styles.heroMedia, filter: isGoba2025 ? 'grayscale(100%) brightness(0.4)' : 'none'}}
            alt="Background" 
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600"; }}
        />
        <div style={styles.heroOverlay}></div>
        <section style={styles.heroContent}>
           <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveLocation('kiomoni')} style={{ ...styles.locationButton, borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'rgba(255,255,255,0.2)', backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', color: activeLocation === 'kiomoni' ? 'black' : 'white' }}>KIOMONI</button>
                <button onClick={() => setActiveLocation('goba')} style={{ ...styles.locationButton, borderColor: activeLocation === 'goba' ? '#a3e635' : 'rgba(255,255,255,0.2)', backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', color: activeLocation === 'goba' ? 'black' : 'white', opacity: activeSeason === 'June 2025' ? 0.5 : 1 }}>GOBA</button>
           </div>
           
           {isGoba2025 ? (
              <div className="animate-fade-in text-center p-8 bg-black/40 rounded-2xl backdrop-blur-sm border border-white/10">
                <Info size={48} className="text-[#a3e635] mx-auto mb-4" />
                <h1 style={{...styles.mainTitle, fontSize: '32px', marginBottom: '16px'}}>HAKUNA DATA</h1>
                <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '600px', lineHeight: '1.6' }}>Mashindano ya Pande Cup Goba yalianza rasmi 2026. Hakuna data za 2025.</p>
              </div>
           ) : (
             <>
               <h1 style={styles.mainTitle}>{displayTitle}</h1>
               <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '600px', margin: '0 auto 16px', lineHeight: '1.6' }}>
                  {displaySubtitle}
               </p>
               <p style={{ color: '#a3e635', fontSize: '16px', fontWeight: 'bold', fontStyle: 'italic', margin: '0 auto 30px', textTransform: 'uppercase', letterSpacing: '1px' }}>{displayTag}</p>
             </>
           )}
        </section>
      </div>

      {!isGoba2025 && (
      <>
        {/* 4. NEWS */}
        <section id="news" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={styles.sectionHeader}><Newspaper style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Habari <span style={styles.limeText}>{activeSeason}</span></h2></div>
          {filteredNews.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {filteredNews.map((item, idx) => (
                    <div key={idx} className="hover-card" style={styles.newsCard}>
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                          <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="News" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=500"; }} />
                        </div>
                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold', marginBottom: '8px' }}>{formatDate(item.date)}</span>
                            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 12px', lineHeight: '1.4' }}>{item.title}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px', flex: 1 }}>{item.excerpt}</p>
                            <button onClick={() => openNews(item)} style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>SOMA ZAIDI <ChevronRight size={14} color="#a3e635" /></button>
                        </div>
                    </div>
                ))}
            </div>
          ) : ( <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}><p>Hakuna habari zilizopakiwa kwa msimu huu bado.</p></div> )}
        </section>

        {/* 5. MATCH CENTER */}
        <section id="ratiba" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            {/* COLUMN 1: RATIBA & MATOKEO */}
            <div>
              {upcomingMatches.length > 0 && (
                  <div style={{ marginBottom: '48px' }}>
                      <div style={styles.sectionHeader}><Clock style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Ratiba <span style={styles.limeText}>Ijayo</span></h2></div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {upcomingMatches.map((m, idx) => (
                              <div key={idx} className="hover-card" style={styles.matchCard}>
                                  <div style={{ fontWeight: '900', fontSize: '15px', width: '35%' }}>{m.home}</div>
                                  <div style={{ textAlign: 'center' }}>
                                      <div style={{ color: '#a3e635', fontWeight: '900', fontSize: '20px' }}>{m.score}</div>
                                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', marginTop: '4px' }}>{m.status}</div>
                                  </div>
                                  <div style={{ fontWeight: '900', fontSize: '15px', textAlign: 'right', width: '35%' }}>{m.away}</div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
              {pastMatches.length > 0 && (
                  <div>
                      <div style={styles.sectionHeader}><Trophy style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Matokeo <span style={styles.limeText}>Yaliyopita</span></h2></div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {pastMatches.map((m, idx) => (
                              <div key={idx} className="hover-card" style={styles.matchCard}>
                                  <div style={{ fontWeight: '900', fontSize: '15px', width: '35%' }}>{m.home}</div>
                                  <div style={{ textAlign: 'center' }}>
                                      <div style={{ color: 'white', fontWeight: '900', fontSize: '20px' }}>{m.score}</div>
                                      <div style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.status}</div>
                                  </div>
                                  <div style={{ fontWeight: '900', fontSize: '15px', textAlign: 'right', width: '35%' }}>{m.away}</div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
              {upcomingMatches.length === 0 && pastMatches.length === 0 && (
                  <p style={{ color: '#64748b', fontStyle: 'italic' }}>Hakuna mechi zilizorekodiwa kwa msimu huu.</p>
              )}
            </div>

            {/* COLUMN 2: MSIMAMO */}
            <div>
              <div style={styles.sectionHeader}><ListOrdered style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Msimamo wa <span style={styles.limeText}>Ligi</span></h2></div>
              {filteredStandings.length > 0 ? (
                <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px', overflowX: 'auto' }}>
                  <table style={styles.table}><thead><tr><th style={styles.th}>Pos</th><th style={styles.th}>Timu</th><th style={{ ...styles.th, textAlign: 'center' }}>P</th><th style={{ ...styles.th, textAlign: 'center' }}>GD</th><th style={{ ...styles.th, textAlign: 'center' }}>PTS</th></tr></thead><tbody>{filteredStandings.map((team, idx) => (<tr key={idx}><td style={{ ...styles.td, fontWeight: 'bold', color: idx === 0 ? '#a3e635' : 'white' }}>{team.pos}</td><td style={{ ...styles.td, fontWeight: '900' }}>{team.team}</td><td style={{ ...styles.td, textAlign: 'center' }}>{team.p}</td><td style={{ ...styles.td, textAlign: 'center', color: team.gd.startsWith('+') ? '#a3e635' : 'white' }}>{team.gd}</td><td style={{ ...styles.td, textAlign: 'center', fontWeight: 'bold' }}>{team.pts}</td></tr>))}</tbody></table>
                </div>
              ) : (<p style={{ color: '#64748b', fontStyle: 'italic' }}>Msimamo haujatoka bado kwa msimu huu.</p>)}
            </div>
          </div>
        </section>

        {/* 6. TV */}
        <section id="tv" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={styles.sectionHeader}><Video style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Pande Cup <span style={styles.limeText}>TV</span></h2></div>
            {filteredVideos.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {filteredVideos.map((video, idx) => (
                      <a key={idx} href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="hover-card" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
                          <img src={video.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={video.title} />
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}><div style={{ width: '50px', height: '50px', backgroundColor: '#a3e635', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(163,230,53,0.4)' }}><Play size={20} color="black" fill="black" style={{ marginLeft: '4px' }} /></div></div>
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{video.title}</p>
                              <p style={{ color: '#cbd5e1', fontSize: '11px', margin: '4px 0 0' }}>{video.duration}</p>
                          </div>
                      </a>
                  ))}
              </div>
            ) : ( <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}><p>Hakuna video.</p></div> )}
        </section>
      </>
      )}

      {/* 7. WADHAMINI */}
      <section id="partners" style={{ padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#020617' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}><p style={{ color: '#64748b', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}>Wanaofanikisha Msimu huu</p></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.7, maxWidth: '1000px', margin: '0 auto' }}>
            {cmsData.sponsors.map((brand, i) => (<div key={i} style={{ fontSize: '24px', fontWeight: '900', color: '#fff', fontStyle: 'italic' }}>{brand.logo ? <img src={brand.logo} alt={brand.name} style={{height: '50px', objectFit: 'contain'}} /> : brand.name}</div>))}
        </div>
      </section>

      {/* 8. FOOTER (UPDATED - DYNAMIC ABOUT & REAL LINKS) */}
      <footer id="about" style={{ padding: '80px 24px 40px', backgroundColor: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
          <div>
            <div style={{ marginBottom: '24px' }}><PandeLogo size="large" /></div>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '14px', margin: '0 0 16px', whiteSpace: 'pre-line' }}>
                  {ABOUT_TEXT.description}
                </p>
                <div style={{ borderLeft: '3px solid #a3e635', paddingLeft: '12px', fontStyle: 'italic', color: '#a3e635', fontSize: '13px' }}>"{ABOUT_TEXT.slogan}"</div>
            </div>
            {/* SOCIAL LINKS - UPDATED */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><Instagram size={20} /></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><Facebook size={20} /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><TikTokIcon size={20} /></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><Youtube size={20} /></a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>VIUNGO VYA HARAKA</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}><a href="#news" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Habari</a><a href="#ratiba" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Ratiba</a><a href="#" onClick={openModal} style={{ color: '#a3e635', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Sajili Timu</a></div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>TUWASILIANE</h4>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +255 653 292 935</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> pandecup2023@gmail.com</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Goba Center & Kiomoni Tanga</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', marginTop: '60px' }}><p style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>© 2026 Pande Cup Events</p></div>
      </footer>

      {/* MODAL - USAJILI (UPDATED WITH NIDA) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(5px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '450px', borderRadius: '24px', padding: '32px', position: 'relative' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={24} /></button>
            {modalStep === 1 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>Fomu ya <span style={styles.limeText}>Maombi</span></h2>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>Jaza taarifa sahihi ili kusajili timu yako.</p>
                
                {/* JINA LA TIMU */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input type="text" placeholder="Jina la Timu" value={teamData.name} onChange={(e) => setTeamData({...teamData, name: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <Trophy size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* JINA LA KOCHA */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input type="text" placeholder="Jina la Kocha/Nahodha" value={teamData.coachName} onChange={(e) => setTeamData({...teamData, coachName: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <User size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* NAMBA YA NIDA (NEW) */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input type="text" placeholder="Namba ya NIDA ya Kocha" value={teamData.nidaNumber} onChange={(e) => setTeamData({...teamData, nidaNumber: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <FileText size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* NAMBA YA SIMU */}
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                    <input type="tel" placeholder="Namba ya Simu" value={teamData.phone} onChange={(e) => setTeamData({...teamData, phone: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <Phone size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                    <button onClick={() => setTeamData({...teamData, location: 'Kiomoni'})} style={{ padding: '12px', borderRadius: '8px', border: teamData.location === 'Kiomoni' ? '1px solid #a3e635' : '1px solid rgba(255,255,255,0.1)', backgroundColor: teamData.location === 'Kiomoni' ? 'rgba(163,230,53,0.1)' : 'transparent', color: 'white', fontWeight: 'bold' }}>KIOMONI</button>
                    <button onClick={() => setTeamData({...teamData, location: 'Goba'})} style={{ padding: '12px', borderRadius: '8px', border: teamData.location === 'Goba' ? '1px solid #a3e635' : '1px solid rgba(255,255,255,0.1)', backgroundColor: teamData.location === 'Goba' ? 'rgba(163,230,53,0.1)' : 'transparent', color: 'white', fontWeight: 'bold' }}>GOBA</button>
                </div>
                <button onClick={() => setModalStep(2)} style={{ ...styles.buttonPrimary, width: '100%', justifyContent: 'center' }}>ENDELEA</button>
              </div>
            )}
            {modalStep === 2 && (
                 <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>Thibitisha Maombi</h2>
                    <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Tafadhali lipia ada ili kukamilisha usajili.</p>
                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}><span style={{ color: '#94a3b8' }}>Ada ya Usajili:</span><span style={{ fontWeight: 'bold' }}>{FEES.amount}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}><span style={{ color: '#94a3b8' }}>Lipa Namba:</span><span style={{ color: '#a3e635', fontWeight: 'bold' }}>{FEES.number}</span></div>
                        <div style={{ fontSize: '11px', color: '#f87171', marginTop: '12px', fontStyle: 'italic' }}>*Ada hii hairudishwi (Non-refundable)</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}>
                      <input type="checkbox" checked={teamData.termsAccepted} onChange={(e) => setTeamData({...teamData, termsAccepted: e.target.checked})} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                      <span style={{ fontSize: '12px', color: '#cbd5e1' }}>Nakubaliana na Sheria na Masharti</span>
                    </div>

                    <button disabled={!teamData.termsAccepted} onClick={handleFinalSubmit} style={{ ...styles.buttonPrimary, width: '100%', justifyContent: 'center', backgroundColor: teamData.termsAccepted ? 'white' : '#475569', color: teamData.termsAccepted ? 'black' : '#94a3b8', cursor: teamData.termsAccepted ? 'pointer' : 'not-allowed' }}>WASILISHA MAOMBI</button>
                 </div>
            )}
            {modalStep === 3 && (
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: 'rgba(34,197,94,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Check color="#22c55e" /></div>
                    <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase' }}>Hongera!</h2>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>Maombi yamepokelewa. Tutawasiliana nawe.</p>
                    <button onClick={closeModal} style={{ marginTop: '24px', background: 'none', border: 'none', color: '#a3e635', fontWeight: 'bold', cursor: 'pointer' }}>FUNGA</button>
                 </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL - NEWS READ MORE */}
      {selectedNews && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(5px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '600px', borderRadius: '24px', padding: '0', position: 'relative', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <button onClick={closeNews} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', padding: '8px' }}><X size={24} /></button>
            <div style={{ height: '250px', width: '100%', flexShrink: 0 }}>
                <img src={selectedNews.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={selectedNews.title} />
            </div>
            <div style={{ padding: '32px' }}>
                <span style={{ fontSize: '12px', color: '#a3e635', fontWeight: 'bold', textTransform: 'uppercase' }}>{formatDate(selectedNews.date)} • {selectedNews.season}</span>
                <h2 style={{ fontSize: '24px', fontWeight: '900', marginTop: '12px', marginBottom: '24px', lineHeight: '1.3' }}>{selectedNews.title}</h2>
                <div style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
                    {renderWithLinks(selectedNews.body || selectedNews.excerpt)}
                </div>
                <button onClick={closeNews} style={{ marginTop: '32px', width: '100%', padding: '16px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>FUNGA</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default App;