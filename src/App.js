import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Video, Play, Phone, History, Newspaper, Trophy, Info
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "/logo.png";
const USE_IMAGE_LOGO = true;

// --- SOCIAL MEDIA LINKS ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

// --- STATIC TEXT (KILLER WORDS) ---
const ABOUT_TEXT = {
  title: "Kuhusu Pande Cup",
  description: "Pande Cup si ligi ya soka ya kawaida; ni jukwaa la kijamii na kiuchumi linalotumia nguvu ya mchezo wa mpira wa miguu kuunganisha jamii na kuleta mabadiliko chanya. Ilizaliwa katika kijiji cha Pande, Kata ya Kiomoni mkoani Tanga, na sasa imepanua mbawa zake mpaka Goba, Dar es Salaam.\n\nMaono yetu ni kuwa zaidi ya mashindano ya uwanjani. Tunalenga kujenga Umoja wa Jamii, Fursa za Kiuchumi, na Maendeleo ya Kijamii kupitia elimu na afya.",
  slogans: "Pande Cup Umoja Katika Kila Shuti • Pamoja Sisi Ni Pande • Pamoja Sisi Ni Kiomoni • Mimi Na Mto Zigi Dam dam"
};

// --- FALLBACK EMPTY DATA (Just structure, no content) ---
const EMPTY_DATA = {
  hero: [], matches: [], news: [], videos: [], standings: [],
  sponsors: [
    { name: "VODACOM", logo: "/images/vodacom.png" }, { name: "CRDB BANK", logo: "/images/crdb.png" },
    { name: "YAS", logo: "/images/yas.png" }, { name: "POLISI TANZANIA", logo: "/images/polisi.png" },
    { name: "AZAM TV", logo: "/images/azam.png" }
  ]
};

const FEES = { amount: "Tsh 100,000/=", number: "556677", name: "PANDE SPORTS ENT" };

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal' }) => {
  const height = size === 'large' ? '120px' : '56px';
  const [imgError, setImgError] = useState(false);
  if (USE_IMAGE_LOGO && !imgError) {
    return <div style={{ display: 'flex', alignItems: 'center' }}><img src={LOGO_PATH} alt="Pande Cup Logo" style={{ height: height, objectFit: 'contain' }} onError={() => setImgError(true)} /></div>;
  }
  return <div style={{ fontSize: size === 'large' ? '32px' : '24px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', color: 'white' }}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></div>;
};

const TikTokIcon = ({ size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>);
const formatDate = (d) => { if (!d) return "Tarehe"; const date = new Date(d); return isNaN(date.getTime()) ? d : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }); };
const renderWithLinks = (text) => { if (!text) return ""; return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => part.match(/https?:\/\/[^\s]+/) ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{color: '#a3e635', textDecoration: 'underline'}}>{part}</a> : part); };

const App = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('June 2026'); 
  const [modalStep, setModalStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teamData, setTeamData] = useState({ name: '', location: '', coachName: '', phone: '', termsAccepted: false });
  const [selectedNews, setSelectedNews] = useState(null);
  
  // HAPA: Tunatumia Data tupu kuanzia, zikija zinajaa.
  const [cmsData, setCmsData] = useState(EMPTY_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // --- ACTIONS ---
  const handleFinalSubmit = () => { 
    alert(`Asante ${teamData.coachName}! Maombi yamepokelewa. Tutawasiliana nawe.`); 
    setModalStep(3); 
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalStep(1);
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeNews = () => {
    setSelectedNews(null);
  };

  // --- FONT LOADING ---
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // --- CONTENTFUL FETCHING LOGIC (RESTORED) ---
  useEffect(() => {
    const fetchContentfulData = async () => {
      setIsLoading(true);
      const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;
      
      const fetchSafe = async (type) => {
        try {
          const res = await fetch(`${baseUrl}&content_type=${type}&include=1`);
          if (!res.ok) throw new Error(type);
          return await res.json();
        } catch (e) {
          console.warn(`Failed to load ${type}`, e);
          return { items: [] }; 
        }
      };

      // Vuta data
      const heroData = await fetchSafe('heroSection');
      const matchesData = await fetchSafe('match');
      const newsData = await fetchSafe('news');
      const standingsData = await fetchSafe('standing');
      const videosData = await fetchSafe('video');

      const getAssetUrl = (id, assets) => { if (!assets) return null; const asset = assets.find(a => a.sys.id === id); return asset?.fields?.file ? `https:${asset.fields.file.url}` : null; };

      const fetchedHero = heroData.items.map(item => ({
          title: item.fields.title || "HII GAME NI YETU.",
          subtitle: item.fields.subtitle || "",
          location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
          bgImage: getAssetUrl(item.fields.backgroundImage?.sys?.id || item.fields.image?.sys?.id, heroData.includes)
      }));

      const fetchedMatches = matchesData.items.map(item => ({
          home: item.fields.homeTeam || "Team A", 
          away: item.fields.awayTeam || "Team B", 
          score: item.fields.score || "VS", 
          status: item.fields.status || "-", 
          location: item.fields.location || "kiomoni", 
          season: item.fields.season || "June 2026"
      }));

      const fetchedNews = newsData.items.map(item => ({
          date: item.fields.date || new Date().toISOString(), 
          title: item.fields.title || "Habari", 
          excerpt: item.fields.excerpt || "", 
          body: item.fields.body || "",
          image: getAssetUrl(item.fields.image?.sys?.id, newsData.includes),
          location: item.fields.location || "kiomoni", 
          season: item.fields.season || "June 2026"
      }));

      const fetchedStandings = standingsData.items.map(item => ({
          pos: item.fields.position || 0, 
          team: item.fields.teamName || "Team", 
          p: item.fields.played || 0, 
          gd: item.fields.goalDifference || "0", 
          pts: item.fields.points || 0,
          location: item.fields.location || "kiomoni", 
          season: item.fields.season || "June 2026"
      })).sort((a,b) => a.pos - b.pos);

      const fetchedVideos = videosData.items.map(item => ({
          title: item.fields.title || "Video", 
          videoUrl: item.fields.videoUrl || "#", 
          duration: item.fields.duration || "0:00",
          thumbnail: getAssetUrl(item.fields.thumbnail?.sys?.id, videosData.includes),
          location: item.fields.location || "kiomoni", 
          season: item.fields.season || "June 2026"
      }));

      setCmsData({ 
          hero: fetchedHero,
          matches: fetchedMatches,
          news: fetchedNews,
          standings: fetchedStandings,
          videos: fetchedVideos,
          sponsors: EMPTY_DATA.sponsors 
      });
      setIsLoading(false);
    };

    fetchContentfulData();
  }, []);

  const getFilteredData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.filter(item => {
        const itemLoc = item.location ? String(item.location).trim().toLowerCase() : 'kiomoni';
        const itemSeason = item.season ? String(item.season).trim().toLowerCase() : 'june 2026';
        const activeSeasonClean = activeSeason.trim().toLowerCase();
        return itemLoc.includes(activeLocation) && itemSeason === activeSeasonClean;
    });
  };

  const currentHero = (cmsData.hero.find(h => h.location.includes(activeLocation))) || cmsData.hero[0] || {title: "PANDE CUP", subtitle: "Loading...", bgImage: null};
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
  if (activeSeason === 'June 2025' && !isGoba2025) { displayTitle = "HISTORIA: JUNI 2025"; displaySubtitle = "Msimu wa Historia. Bingwa alipatikana kwa jasho na damu."; }

  const styles = {
    container: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
    topBar: { backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    nav: { position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 0' },
    heroWrapper: { position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617' },
    mobileMenu: { position: 'fixed', top: 0, right: 0, width: '85%', maxWidth: '320px', height: '100vh', backgroundColor: '#0f172a', zIndex: 60, padding: '32px', transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease' },
    buttonPrimary: { backgroundColor: '#a3e635', color: '#020617', padding: '14px 28px', borderRadius: '8px', fontWeight: '800', border: 'none', cursor: 'pointer', fontStyle: 'italic', fontSize: '14px' }
  };

  // LOADING SCREEN
  if (isLoading) {
    return (
      <div style={{height: '100vh', width: '100%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <PandeLogo size="large" />
        <p style={{color: '#a3e635', marginTop: '20px', fontWeight: 'bold', animation: 'pulse 1s infinite'}}>INAPAKIA...</p>
        <style>{`@keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        body { margin: 0; font-family: 'Inter', sans-serif; }
        h1, h2, h3 { font-family: 'Oswald', sans-serif; }
        @media (max-width: 768px) { .desktop-only { display: none !important; } .mobile-center { justify-content: center !important; width: 100%; } .hero-mobile { min-height: 70vh !important; } }
      `}</style>
      <div style={styles.container}>
        
        {/* TOP BAR */}
        <div style={styles.topBar}>
            <div className="desktop-only" style={{ display: 'flex', gap: '8px', color: '#64748b' }}><History size={14} /> SEASON: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>{activeSeason}</span></div>
            <div className="mobile-center" style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => { setActiveSeason('June 2025'); setActiveLocation('kiomoni'); }} style={{ background: 'none', border: 'none', color: activeSeason === 'June 2025' ? '#a3e635' : '#64748b', fontWeight: 'bold', fontSize: '11px' }}>JUNE 2025</button>
                <button onClick={() => setActiveSeason('June 2026')} style={{ background: 'none', border: 'none', color: activeSeason === 'June 2026' ? '#a3e635' : '#64748b', fontWeight: 'bold', fontSize: '11px' }}>JUNE 2026</button>
            </div>
        </div>

        {/* NAV */}
        <nav style={styles.nav}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#"><PandeLogo /></a>
                <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <a href="#news" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>HABARI</a>
                    <a href="#ratiba" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>RATIBA</a>
                    <a href="#tv" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>PC TV</a>
                    <button onClick={openModal} style={{...styles.buttonPrimary, padding: '10px 24px', fontSize: '12px'}}>SAJILI TIMU</button>
                </div>
                <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white' }} className="mobile-only"><Menu /></button>
            </div>
        </nav>

        {/* HERO */}
        <div id="hero" style={styles.heroWrapper} className="hero-mobile">
            {currentHero.bgImage && (
              <img 
                src={currentHero.bgImage} 
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: isGoba2025 ? 'grayscale(1)' : 'none' }} 
                alt="Hero Section"
              />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.9))' }}></div>
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '800px' }}>
                <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button onClick={() => setActiveLocation('kiomoni')} style={{ padding: '10px 24px', borderRadius: '50px', border: activeLocation==='kiomoni'?'1px solid #a3e635':'1px solid white', background: activeLocation==='kiomoni'?'#a3e635':'transparent', color: activeLocation==='kiomoni'?'black':'white', fontWeight: 'bold' }}>KIOMONI</button>
                    <button onClick={() => setActiveLocation('goba')} style={{ padding: '10px 24px', borderRadius: '50px', border: activeLocation==='goba'?'1px solid #a3e635':'1px solid white', background: activeLocation==='goba'?'#a3e635':'transparent', color: activeLocation==='goba'?'black':'white', fontWeight: 'bold' }}>GOBA</button>
                </div>
                {isGoba2025 ? (
                    <div style={{ padding: '40px', background: 'rgba(0,0,0,0.5)', borderRadius: '16px' }}>
                        <Info size={48} color="#a3e635" style={{margin:'0 auto 16px'}} /><h1 style={{ fontSize: '32px', margin: 0 }}>HAKUNA DATA</h1><p>Hakuna data za 2025 Goba.</p>
                    </div>
                ) : (
                    <>
                        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', margin: '0 0 16px', lineHeight: 0.9, fontStyle: 'italic', textTransform: 'uppercase' }}>{displayTitle}</h1>
                        <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '24px' }}>{displaySubtitle}</p>
                        <p style={{ color: '#a3e635', fontSize: '16px', fontWeight: 'bold' }}>{displayTag}</p>
                    </>
                )}
            </div>
        </div>

        {/* CONTENT SECTIONS */}
        {!isGoba2025 && (
            <>
            <section id="news" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' }}><Newspaper color="#a3e635" /><h2 style={{ fontSize: '24px', margin: 0, textTransform: 'uppercase', fontStyle: 'italic' }}>HABARI <span style={{ color: '#a3e635' }}>{activeSeason}</span></h2></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {filteredNews.map((item, i) => (
                        <div key={i} onClick={() => setSelectedNews(item)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' }}>
                            <div style={{height: '200px', width: '100%', backgroundColor: '#1e293b'}}>
                              {item.image && <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.title} />}
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ color: '#a3e635', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px' }}>{formatDate(item.date)}</div>
                                <h3 style={{ fontSize: '18px', margin: '0 0 12px' }}>{item.title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px' }}>{item.excerpt}</p>
                                <button style={{background:'none', border:'none', color:'white', fontSize:'13px', fontWeight:'bold', marginTop:'12px', padding:0}}>SOMA ZAIDI &rarr;</button>
                            </div>
                        </div>
                    ))}
                    {filteredNews.length === 0 && <p style={{color:'#64748b'}}>Hakuna habari bado.</p>}
                </div>
            </section>

            <section id="ratiba" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' }}><Clock color="#a3e635" /><h2 style={{ fontSize: '24px', margin: 0, textTransform: 'uppercase', fontStyle: 'italic' }}>RATIBA & <span style={{ color: '#a3e635' }}>MATOKEO</span></h2></div>
                        {upcomingMatches.map((m,i) => <div key={i} style={{background:'rgba(255,255,255,0.05)', padding:'24px', borderRadius:'16px', marginBottom:'16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}><span style={{fontWeight:'900', width:'35%'}}>{m.home}</span><div style={{textAlign:'center'}}><div style={{color:'#a3e635', fontWeight:'900', fontSize:'20px'}}>{m.score}</div><small style={{color:'#64748b'}}>{m.status}</small></div><span style={{fontWeight:'900', width:'35%', textAlign:'right'}}>{m.away}</span></div>)}
                        {upcomingMatches.length === 0 && pastMatches.length === 0 && <p style={{color:'#64748b'}}>Hakuna mechi.</p>}
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' }}><ListOrdered color="#a3e635" /><h2 style={{ fontSize: '24px', margin: 0, textTransform: 'uppercase', fontStyle: 'italic' }}>MSIMAMO</h2></div>
                        <div style={{background:'#020617', padding:'20px', borderRadius:'16px'}}><table style={{width:'100%', borderCollapse:'collapse', fontSize:'14px'}}><thead><tr><th style={{textAlign:'left', color:'#64748b', paddingBottom:'12px'}}>POS</th><th style={{textAlign:'left', color:'#64748b', paddingBottom:'12px'}}>TIMU</th><th style={{color:'#64748b', paddingBottom:'12px'}}>P</th><th style={{color:'#64748b', paddingBottom:'12px'}}>PTS</th></tr></thead><tbody>{filteredStandings.map((t,i)=><tr key={i}><td style={{padding:'12px 0', borderTop:'1px solid rgba(255,255,255,0.1)', color: i===0?'#a3e635':'white'}}>{t.pos}</td><td style={{padding:'12px 0', borderTop:'1px solid rgba(255,255,255,0.1)', fontWeight:'bold'}}>{t.team}</td><td style={{textAlign:'center', padding:'12px 0', borderTop:'1px solid rgba(255,255,255,0.1)'}}>{t.p}</td><td style={{textAlign:'center', padding:'12px 0', borderTop:'1px solid rgba(255,255,255,0.1)', fontWeight:'bold'}}>{t.pts}</td></tr>)}</tbody></table>{filteredStandings.length === 0 && <p style={{color:'#64748b'}}>Msimamo haujatoka.</p>}</div>
                    </div>
                </div>
            </section>
            
            <section id="tv" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' }}><Video color="#a3e635" /><h2 style={{ fontSize: '24px', margin: 0, textTransform: 'uppercase', fontStyle: 'italic' }}>PANDE CUP <span style={{ color: '#a3e635' }}>TV</span></h2></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                    {filteredVideos.map((v, i) => (
                        <a key={i} href={v.videoUrl} target="_blank" rel="noreferrer" style={{position:'relative', borderRadius:'16px', overflow:'hidden', aspectRatio:'16/9', display:'block'}}>
                            {v.thumbnail && <img src={v.thumbnail} style={{width:'100%', height:'100%', objectFit:'cover'}} alt={v.title} />}
                            <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{width:'50px', height:'50px', background:'#a3e635', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}><Play size={20} color="black" fill="black" style={{marginLeft:'4px'}} /></div></div>
                            <div style={{position:'absolute', bottom:0, left:0, right:0, padding:'16px', background:'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'}}><p style={{margin:0, fontWeight:'bold', fontSize:'14px'}}>{v.title}</p></div>
                        </a>
                    ))}
                    {filteredVideos.length === 0 && <p style={{color:'#64748b'}}>Hakuna video.</p>}
                </div>
            </section>
            </>
        )}

        {/* WADHAMINI */}
        <section style={{ padding: '60px 24px', background: '#020617', textAlign: 'center', borderTop:'1px solid rgba(255,255,255,0.1)' }}>
             <p style={{ color: '#64748b', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom:'40px' }}>Wanaofanikisha Msimu huu</p>
             <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.7 }}>
                 {cmsData.sponsors.map((s,i) => <div key={i} style={{fontSize:'24px', fontWeight:'900', fontStyle:'italic'}}>{s.logo ? <img src={s.logo} style={{height:'40px'}} alt={s.name} /> : s.name}</div>)}
             </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: '80px 24px', background: 'black' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
                <div>
                    <div style={{ marginBottom: '24px' }}><PandeLogo size="large" /></div>
                    <h4 style={{color:'#a3e635', marginBottom:'12px', textTransform:'uppercase'}}>{ABOUT_TEXT.title}</h4>
                    <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{ABOUT_TEXT.description}</p>
                    <div style={{ marginTop:'20px', borderLeft: '3px solid #a3e635', paddingLeft: '12px', fontStyle: 'italic', color: '#a3e635', fontSize: '13px', lineHeight:'1.8' }}>
                        {ABOUT_TEXT.slogans.split('•').map((s,i) => <div key={i}>{s.trim()}</div>)}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.7}}><Instagram /></a>
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.7}}><Facebook /></a>
                        <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.7}}><Youtube /></a>
                        <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.7}}><TikTokIcon /></a>
                    </div>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '24px' }}>VIUNGO</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <a href="#news" style={{ color: '#64748b', textDecoration: 'none' }}>Habari</a>
                        <a href="#ratiba" style={{ color: '#64748b', textDecoration: 'none' }}>Ratiba</a>
                        <button onClick={openModal} style={{ color: '#a3e635', background: 'none', border: 'none', padding: 0, fontWeight: 'bold', textAlign:'left', cursor:'pointer' }}>Sajili Timu</button>
                    </div>
                </div>
                <div>
                    <h4 style={{ color: 'white', marginBottom: '24px' }}>MAWASILIANO</h4>
                    <p style={{ color: '#64748b', marginBottom: '12px', display: 'flex', gap: '8px' }}><Phone size={16} /> +255 700 000 000</p>
                    <p style={{ color: '#64748b', marginBottom: '12px', display: 'flex', gap: '8px' }}><MapPin size={16} /> Goba Center & Kiomoni Tanga</p>
                </div>
            </div>
            <div style={{textAlign:'center', marginTop:'60px', borderTop:'1px solid #333', paddingTop:'40px', color:'#475569', fontSize:'12px'}}>© 2026 Pande Cup Events. All rights reserved.</div>
        </footer>

        {/* MODAL */}
        {isModalOpen && (
             <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px'}}>
                 <div style={{background:'#0f172a', padding:'32px', borderRadius:'24px', width:'100%', maxWidth:'450px', border:'1px solid rgba(255,255,255,0.1)', position:'relative'}}>
                     <button onClick={closeModal} style={{position:'absolute', top:'20px', right:'20px', background:'none', border:'none', color:'white', cursor:'pointer'}}><X /></button>
                     {modalStep === 1 && (
                         <>
                             <h2 style={{marginTop:0, textTransform:'uppercase'}}>Fomu ya <span style={{color:'#a3e635'}}>Maombi</span></h2>
                             <p style={{color:'#94a3b8', fontSize:'14px'}}>Jaza taarifa sahihi.</p>
                             <input placeholder="Jina la Timu" value={teamData.name} onChange={e=>setTeamData({...teamData, name:e.target.value})} style={{width:'100%', padding:'14px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #333', background:'black', color:'white'}} />
                             <input placeholder="Jina la Kocha" value={teamData.coachName} onChange={e=>setTeamData({...teamData, coachName:e.target.value})} style={{width:'100%', padding:'14px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #333', background:'black', color:'white'}} />
                             <input placeholder="Namba ya Simu" value={teamData.phone} onChange={e=>setTeamData({...teamData, phone:e.target.value})} style={{width:'100%', padding:'14px', marginBottom:'24px', borderRadius:'8px', border:'1px solid #333', background:'black', color:'white'}} />
                             <button onClick={()=>setModalStep(2)} style={{...styles.buttonPrimary, width:'100%'}}>ENDELEA</button>
                         </>
                     )}
                     {modalStep === 2 && (
                         <div style={{textAlign:'center'}}>
                             <h2 style={{marginTop:0}}>Thibitisha</h2>
                             <div style={{background:'rgba(255,255,255,0.05)', padding:'20px', borderRadius:'16px', marginBottom:'20px'}}>
                                 <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}><span style={{color:'#94a3b8'}}>Ada:</span> <b>{FEES.amount}</b></div>
                                 <div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:'#94a3b8'}}>Namba:</span> <b style={{color:'#a3e635'}}>{FEES.number}</b></div>
                             </div>
                             <div style={{display:'flex', alignItems:'center', gap:'10px', justifyContent:'center', marginBottom:'20px'}}>
                                 <input type="checkbox" checked={teamData.termsAccepted} onChange={e=>setTeamData({...teamData, termsAccepted:e.target.checked})} />
                                 <span style={{color:'#cbd5e1', fontSize:'13px'}}>Nakubaliana na Sheria na Masharti</span>
                             </div>
                             <button disabled={!teamData.termsAccepted} onClick={handleFinalSubmit} style={{...styles.buttonPrimary, width:'100%', background: teamData.termsAccepted?'#a3e635':'#333', color: teamData.termsAccepted?'black':'#666'}}>WASILISHA</button>
                         </div>
                     )}
                     {modalStep === 3 && (
                         <div style={{textAlign:'center'}}>
                             <div style={{width:'60px', height:'60px', background:'rgba(34,197,94,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}><Check color="#22c55e" /></div>
                             <h2>Imepokelewa!</h2>
                             <button onClick={closeModal} style={{color:'#a3e635', background:'none', border:'none', fontWeight:'bold', cursor:'pointer'}}>FUNGA</button>
                         </div>
                     )}
                 </div>
             </div>
        )}

        {/* NEWS POPUP */}
        {selectedNews && (
            <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:110, padding:'20px', overflowY:'auto'}}>
                <button onClick={closeNews} style={{position:'fixed', top:'20px', right:'20px', background:'white', border:'none', borderRadius:'50%', width:'40px', height:'40px', zIndex:120}}><X color="black" /></button>
                <div style={{maxWidth:'600px', margin:'40px auto', color:'white'}}>
                    <h1>{selectedNews.title}</h1>
                    {selectedNews.image && <img src={selectedNews.image} style={{width:'100%', borderRadius:'16px'}} alt={selectedNews.title} />}
                    <p style={{lineHeight:1.8, fontSize:'18px', marginTop:'24px', whiteSpace:'pre-wrap'}}>{selectedNews.body || selectedNews.excerpt}</p>
                </div>
            </div>
        )}

      </div>
    </>
  );
};

export default App;