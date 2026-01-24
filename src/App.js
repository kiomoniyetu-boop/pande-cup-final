import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, 
  ListOrdered, Video, Play, Image as ImageIcon, ChevronRight, Phone, Info, History, Newspaper, Trophy
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "/logo.png";
const USE_IMAGE_LOGO = true;

// --- FALLBACK DATA ---
const FALLBACK_DATA = {
  hero: [
    { location: 'kiomoni', title: "HII GAME NI YETU.", subtitle: "Soka la mtaani lenye hadhi ya kitaifa.", bgImage: "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600" },
    { location: 'goba', title: "HII GAME NI YETU.", subtitle: "Pande Cup Imetua Jijini!", bgImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600" }
  ],
  matches: [], standings: [], news: [], videos: [],
  sponsors: [{ name: "VODACOM", logo: "/images/vodacom.png" }, { name: "CRDB", logo: "/images/crdb.png" }, { name: "YAS", logo: "/images/yas.png" }, { name: "POLISI", logo: "/images/polisi.png" }, { name: "AZAM", logo: "/images/azam.png" }]
};

const FEES = { amount: "Tsh 100,000/=", number: "556677", name: "PANDE SPORTS ENT" };

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal' }) => {
  const height = size === 'large' ? '120px' : '56px';
  if (USE_IMAGE_LOGO) return <div style={{ display: 'flex', alignItems: 'center' }}><img src={LOGO_PATH} alt="Logo" style={{ height: height, objectFit: 'contain' }} onError={(e) => e.target.style.display='none'} /></div>;
  return <div style={{ fontSize: size === 'large' ? '32px' : '24px', fontWeight: '900', color: 'white' }}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></div>;
};

const TikTokIcon = ({ size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>);
const formatDate = (d) => { if (!d) return "Tarehe"; const date = new Date(d); return isNaN(date.getTime()) ? d : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }); };
const renderWithLinks = (text) => { if (!text) return ""; return text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => part.match(/https?:\/\/[^\s]+/) ? <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{color: '#a3e635', textDecoration: 'underline'}}>{part}</a> : part); };

const App = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('June 2026'); 
  const [modalStep, setModalStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teamData, setTeamData] = useState({ name: '', location: '', coachName: '', phone: '' });
  const [selectedNews, setSelectedNews] = useState(null);
  const [cmsData, setCmsData] = useState(FALLBACK_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // --- STRICT FILTER LOGIC (DEBUG VERSION) ---
  const getFilteredData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.filter(item => {
        const itemLoc = item.location ? String(item.location).trim().toLowerCase() : 'kiomoni';
        const itemSeason = item.season ? String(item.season).trim().toLowerCase() : 'june 2026'; // Default to 2026 if empty
        const currentSeason = activeSeason.trim().toLowerCase();
        
        // Debug Log (utaona kwenye console ya browser)
        // console.log(`Item: ${item.title}, Season: ${itemSeason}, Active: ${currentSeason}, Match: ${itemSeason === currentSeason}`);
        
        return itemLoc.includes(activeLocation) && itemSeason === currentSeason;
    });
  };

  useEffect(() => {
    const fetchContentfulData = async () => {
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;
        const fetchData = async (type) => { const res = await fetch(`${baseUrl}&content_type=${type}&include=1`); return res.ok ? await res.json() : { items: [] }; };
        
        const [heroData, matchesData, newsData, standingsData, videosData] = await Promise.all([
            fetchData('heroSection'), fetchData('match'), fetchData('news'), fetchData('standing'), fetchData('video')
        ]);

        const getAssetUrl = (id, assets) => { if (!assets) return null; const asset = assets.find(a => a.sys.id === id); return asset?.fields?.file ? `https:${asset.fields.file.url}` : null; };

        // Process Hero
        const fetchedHero = heroData.items.map(item => ({
            title: item.fields.title || "HII GAME NI YETU.",
            subtitle: item.fields.subtitle || "",
            location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
            bgImage: getAssetUrl(item.fields.backgroundImage?.sys?.id || item.fields.image?.sys?.id, heroData.includes)
        }));

        // Process Matches
        const fetchedMatches = matchesData.items.map(item => ({
            home: item.fields.homeTeam || "Home", away: item.fields.awayTeam || "Away", score: item.fields.score || "VS", status: item.fields.status || "Ratiba",
            location: item.fields.location, season: item.fields.season
        }));

        // Process News
        const fetchedNews = newsData.items.map(item => ({
            date: item.fields.date, title: item.fields.title, excerpt: item.fields.excerpt, body: item.fields.body,
            image: getAssetUrl(item.fields.image?.sys?.id, newsData.includes) || "https://via.placeholder.com/500",
            location: item.fields.location, season: item.fields.season
        }));

        // Process Standings
        const fetchedStandings = standingsData.items.map(item => ({
            pos: item.fields.position, team: item.fields.teamName, p: item.fields.played, gd: item.fields.goalDifference, pts: item.fields.points,
            location: item.fields.location, season: item.fields.season
        })).sort((a,b) => a.pos - b.pos);

        // Process Videos
        const fetchedVideos = videosData.items.map(item => ({
            title: item.fields.title, videoUrl: item.fields.videoUrl, duration: item.fields.duration,
            thumbnail: getAssetUrl(item.fields.thumbnail?.sys?.id, videosData.includes) || "https://via.placeholder.com/500",
            location: item.fields.location, season: item.fields.season
        }));

        setCmsData({ 
            hero: fetchedHero.length > 0 ? fetchedHero : FALLBACK_DATA.hero, 
            matches: fetchedMatches, news: fetchedNews, standings: fetchedStandings, videos: fetchedVideos, sponsors: FALLBACK_DATA.sponsors 
        });

      } catch (err) { console.error(err); } finally { setIsLoading(false); }
    };
    fetchContentfulData();
  }, []);

  // --- RENDER HELPERS ---
  const currentHero = (cmsData.hero.find(h => h.location.includes(activeLocation))) || cmsData.hero[0] || FALLBACK_DATA.hero[0];
  const filteredMatches = getFilteredData(cmsData.matches);
  const upcomingMatches = filteredMatches.filter(m => m.score.toUpperCase() === 'VS' || m.score.includes(':'));
  const pastMatches = filteredMatches.filter(m => m.score.toUpperCase() !== 'VS' && !m.score.includes(':'));
  const filteredNews = getFilteredData(cmsData.news);
  const filteredStandings = getFilteredData(cmsData.standings);
  const filteredVideos = getFilteredData(cmsData.videos);

  const isGoba2025 = activeLocation === 'goba' && activeSeason === 'June 2025';
  
  // UNIFIED HERO TEXT
  let displayTitle = currentHero.title;
  let displaySubtitle = currentHero.subtitle;
  if (activeSeason === 'June 2025' && !isGoba2025) {
     displayTitle = "HISTORIA: JUNI 2025";
     displaySubtitle = "Msimu wa Historia. Bingwa alipatikana kwa jasho na damu.";
  }

  const styles = {
    container: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
    topBar: { backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    nav: { position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 0' },
    heroWrapper: { position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    mobileMenu: { position: 'fixed', top: 0, right: 0, width: '85%', maxWidth: '320px', height: '100vh', backgroundColor: '#0f172a', zIndex: 60, padding: '32px', transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease' }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
        body { margin: 0; font-family: 'Inter', sans-serif; }
        h1, h2, h3 { font-family: 'Oswald', sans-serif; }
        @media (max-width: 768px) { .desktop-only { display: none !important; } .mobile-center { justify-content: center !important; width: 100%; } .hero-mobile { min-height: 70vh !important; } }
      `}</style>

      <div style={styles.container}>
        {/* DEBUG STRIP - HII LAZIMA IONEKANE */}
        <div style={{ backgroundColor: 'red', color: 'white', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', padding: '4px' }}>
            VERSION 3.0 LIVE - DEBUG MODE
        </div>

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
                <div className="desktop-only" style={{ display: 'flex', gap: '24px' }}>
                    <a href="#news" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>HABARI</a>
                    <a href="#ratiba" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>RATIBA</a>
                    <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#a3e635', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>SAJILI TIMU</button>
                </div>
                <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white' }} className="mobile-only"><Menu /></button>
            </div>
        </nav>

        {/* HERO */}
        <div style={styles.heroWrapper} className="hero-mobile">
            <img src={isGoba2025 ? "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c" : (currentHero.bgImage || "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66")} 
                 style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: isGoba2025 ? 'grayscale(1)' : 'none' }} alt="Hero" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.9))' }}></div>
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '800px' }}>
                <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
                    <button onClick={() => setActiveLocation('kiomoni')} style={{ padding: '10px 24px', borderRadius: '50px', border: activeLocation==='kiomoni'?'1px solid #a3e635':'1px solid white', background: activeLocation==='kiomoni'?'#a3e635':'transparent', color: activeLocation==='kiomoni'?'black':'white', fontWeight: 'bold' }}>KIOMONI</button>
                    <button onClick={() => setActiveLocation('goba')} style={{ padding: '10px 24px', borderRadius: '50px', border: activeLocation==='goba'?'1px solid #a3e635':'1px solid white', background: activeLocation==='goba'?'#a3e635':'transparent', color: activeLocation==='goba'?'black':'white', fontWeight: 'bold' }}>GOBA</button>
                </div>
                {isGoba2025 ? (
                    <div style={{ padding: '40px', background: 'rgba(0,0,0,0.5)', borderRadius: '16px' }}>
                        <Info size={48} color="#a3e635" style={{margin:'0 auto 16px'}} />
                        <h1 style={{ fontSize: '32px', margin: 0 }}>HAKUNA DATA</h1>
                        <p>Hakuna data za 2025 Goba.</p>
                    </div>
                ) : (
                    <>
                        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', margin: '0 0 16px', lineHeight: 0.9, fontStyle: 'italic', textTransform: 'uppercase' }}>{displayTitle}</h1>
                        <p style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '24px' }}>{displaySubtitle}</p>
                    </>
                )}
            </div>
        </div>

        {/* NEWS */}
        {!isGoba2025 && (
            <section id="news" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}><Newspaper color="#a3e635" /><h2 style={{ fontSize: '24px', margin: 0 }}>HABARI <span style={{ color: '#a3e635' }}>{activeSeason}</span></h2></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {filteredNews.map((item, i) => (
                        <div key={i} onClick={() => setSelectedNews(item)} style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' }}>
                            <img src={item.image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} alt="News" />
                            <div style={{ padding: '24px' }}>
                                <div style={{ fontSize: '10px', color: 'orange', marginBottom: '8px', fontFamily: 'monospace' }}>[DEBUG: {item.season || 'No Season Tag'}]</div>
                                <div style={{ color: '#a3e635', fontSize: '11px', fontWeight: 'bold', marginBottom: '8px' }}>{formatDate(item.date)}</div>
                                <h3 style={{ fontSize: '18px', margin: '0 0 12px' }}>{item.title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px' }}>{item.excerpt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* MOBILE MENU OVERLAY */}
        {isMobileMenuOpen && (
            <div style={styles.mobileMenu}>
                <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: 'white', position: 'absolute', top: '24px', right: '24px' }}><X size={32} /></button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '60px' }}>
                    <a href="#news" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>Habari</a>
                    <a href="#ratiba" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>Ratiba</a>
                    <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} style={{ backgroundColor: '#a3e635', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px' }}>SAJILI TIMU</button>
                </div>
            </div>
        )}

        {/* MODAL & NEWS POPUP (SIMPLIFIED FOR DEBUG) */}
        {isModalOpen && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center'}}><div style={{background:'#1e293b', padding:'32px', borderRadius:'24px', width:'90%', maxWidth:'400px', textAlign:'center'}}><h2 style={{marginTop:0}}>SAJILI TIMU</h2><p>Fomu ya usajili inapatikana hapa.</p><button onClick={()=>setIsModalOpen(false)} style={{background:'#a3e635', border:'none', padding:'12px 24px', borderRadius:'8px', fontWeight:'bold'}}>FUNGA</button></div></div>}
        
        {selectedNews && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:110, padding:'20px', overflowY:'auto'}}><button onClick={()=>setSelectedNews(null)} style={{position:'fixed', top:'20px', right:'20px', background:'white', border:'none', borderRadius:'50%', width:'40px', height:'40px', zIndex:120}}><X color="black" /></button><div style={{maxWidth:'600px', margin:'40px auto', color:'white'}}><h1>{selectedNews.title}</h1><img src={selectedNews.image} style={{width:'100%', borderRadius:'16px'}} /><p style={{lineHeight:1.8, fontSize:'18px', marginTop:'24px'}}>{selectedNews.body || selectedNews.excerpt}</p></div></div>}
      </div>
    </>
  );
};

export default App;