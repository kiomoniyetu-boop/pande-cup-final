import SeasonSwitcher from '../components/SeasonSwitcher';
import GorillaBot from '../components/GorillaBot'; 
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet"; 
import { 
  Menu, X, Clock, Instagram, Facebook, Youtube,
  Newspaper, Phone, Mail, Grid, ChevronRight
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png?w=200&fmt=webp"; // Optimized Logo
const USE_IMAGE_LOGO = true;

// --- LINKS ZA SOCIAL MEDIA ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

// --- ORODHA YA MITAA ---
const LOCATIONS_LIST = [
  { group: 'KIOMONI (Nyumbani)', areas: ['Kiomoni', 'Mpirani', 'Mabayani', 'Ndumi', 'Magubeni', 'Kivuleni', 'Cross Z', 'Mbogo', 'Kilimanjaro'] },
  { group: 'TANGA MJINI', areas: ['Ngamiani', 'Majengo', 'Mabawa', 'Central', 'Makorora', 'Mzingani', 'Tanga Sisi', 'Donge', 'Gofu'] },
  { group: 'DAR ES SALAAM', areas: ['Goba', 'Madale', 'Makongo', 'Mbezi', 'Kimara', 'Sinza', 'Ubungo', 'Tegeta', 'Bunju'] },
  { group: 'ENGINE', areas: ['Nje ya Tanga/Dar'] }
];

// --- FALLBACK DATA ---
const FALLBACK_DATA = {
  hero: [{ location: 'kiomoni', title: "HII GAME NI YETU.", subtitle: "Soka la mtaani lenye hadhi ya kitaifa.", bgImage: "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1200" }],
  matches: [], standings: [], news: [], sponsors: []
};

// --- OPTIMIZED COMPONENTS ---

const LoadingScreen = () => (
  <div style={{ position: 'fixed', inset: 0, backgroundColor: '#0f172a', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
    <img src={LOGO_PATH} alt="Loading..." style={{ height: '60px', width: 'auto', animation: 'pulse 1.5s infinite' }} />
    <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }`}</style>
  </div>
);

const PandeLogo = ({ size = 'normal', isMobile }) => {
  const height = isMobile ? '35px' : (size === 'large' ? '100px' : '45px');
  if (USE_IMAGE_LOGO) {
    return <img src={LOGO_PATH} alt="Logo" style={{ height: height, width: 'auto', objectFit: 'contain', transition: 'all 0.3s ease' }} />;
  }
  return <div style={{ fontSize: '24px', fontWeight: '900', color: 'white' }}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></div>;
};

// Helpers
const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
const formatTime = (d) => new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export const HomePage = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('2026'); 
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Registration States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamData, setTeamData] = useState({ name: '', location: '', coachName: '', phone: '' });

  // Data States
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [cmsData, setCmsData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  // --- OPTIMIZED FETCH ---
  useEffect(() => {
    const fetchContentfulData = async () => {
      // Delay slightly less for perceived speed
      const minLoaderTime = new Promise(resolve => setTimeout(resolve, 500));
      
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;
        
        // HELPER: Auto-optimize images (WebP + Resize) to fix "Uzito"
        const getAssetUrl = (id, includes, width = 800) => {
            if (!id || !includes || !includes.Asset) return null;
            const asset = includes.Asset.find(a => a.sys.id === id);
            return asset && asset.fields.file ? `https:${asset.fields.file.url}?w=${width}&fmt=webp&q=80` : null;
        };

        const fetchData = async (type) => (await fetch(`${baseUrl}&content_type=${type}&include=1`)).json();

        const [heroRes, matchesRes, newsRes, standingsRes, vidRes, sponsorRes] = await Promise.all([
            fetchData('heroSection'), fetchData('match'), fetchData('news'), fetchData('standing'), fetchData('video'), fetchData('sponsor')
        ]);

        const hero = heroRes.items.map(i => ({
            title: i.fields.title, subtitle: i.fields.subtitle, location: String(i.fields.location).toLowerCase(),
            bgImage: getAssetUrl(i.fields.backgroundImage?.sys?.id || i.fields.image?.sys?.id, heroRes.includes, 1200) // HD for Hero
        }));

        const matches = matchesRes.items.map(i => ({
            home: i.fields.homeTeam, away: i.fields.awayTeam, score: i.fields.score || "VS", status: i.fields.status,
            location: String(i.fields.location).toLowerCase(), season: i.fields.season, matchDate: i.fields.matchDate, stadium: i.fields.stadium
        }));

        const news = newsRes.items.map(i => ({
            date: i.fields.date, title: i.fields.title, excerpt: i.fields.excerpt, body: i.fields.body,
            image: getAssetUrl(i.fields.image?.sys?.id, newsRes.includes, 500), // Smaller for cards
            location: String(i.fields.location).toLowerCase(), season: i.fields.season
        }));

        const standings = standingsRes.items.map(i => ({
            team: i.fields.teamName, p: i.fields.played, gd: i.fields.goalDifference, pts: i.fields.points, cleanSheets: i.fields.cleanSheets || 0, // NEW field
            group: String(i.fields.group).toUpperCase(), location: String(i.fields.location).toLowerCase(), season: i.fields.season
        }));

        const sponsors = sponsorRes.items.map(i => ({
            name: i.fields.name, 
            logo: getAssetUrl(i.fields.logo?.sys?.id, sponsorRes.includes, 200), // Small optimized logos (Crucial for fix)
            websiteUrl: i.fields.websiteUrl
        }));

        await minLoaderTime;
        setCmsData({
            hero: hero.length ? hero : FALLBACK_DATA.hero,
            matches, news, standings, sponsors: sponsors.length ? sponsors : FALLBACK_DATA.sponsors
        });

      } catch (e) { console.error(e); setCmsData(FALLBACK_DATA); } 
      finally { setIsLoading(false); }
    };
    fetchContentfulData();
  }, []);

  // Window Resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading || !cmsData) return <LoadingScreen />;

  // --- FILTERING ---
  const currentHero = cmsData.hero.find(h => h.location.includes(activeLocation)) || FALLBACK_DATA.hero[0];
  const activeData = (arr) => arr.filter(i => 
    (i.location?.includes(activeLocation) || i.location === 'kiomoni') && 
    String(i.season || '2026').includes(String(activeSeason).match(/(\d{4})/)?.[1] || '2026')
  );
  
  const filteredMatches = activeData(cmsData.matches);
  const filteredNews = activeData(cmsData.news).sort((a,b) => new Date(b.date) - new Date(a.date));
  const filteredStandings = activeData(cmsData.standings).sort((a,b) => b.pts - a.pts || parseInt(b.gd) - parseInt(a.gd));
  
  const groupedStandings = filteredStandings.reduce((acc, team) => {
    const g = team.group ? `GROUP ${team.group}` : 'LIGI KUU';
    if (!acc[g]) acc[g] = []; acc[g].push(team); return acc;
  }, {});

  const isGoba2025 = activeLocation === 'goba' && activeSeason === '2025';

  // --- STYLES ---
  const s = {
    bg: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' },
    nav: { position: 'sticky', top: 0, zIndex: 100, background: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 0' },
    hero: { position: 'relative', minHeight: isMobile ? '85vh' : '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(163,230,53,0.1)' },
    title: { fontFamily: 'Oswald', fontSize: isMobile ? '36px' : '56px', fontWeight: '900', fontStyle: 'italic', lineHeight: 1.1, margin: '0 0 16px', textTransform: 'uppercase' },
    lime: { color: '#a3e635' },
    card: { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' },
    btn: { background: '#a3e635', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }
  };

  return (
    <div style={s.bg}>
      <Helmet><title>Pande Cup - Hii Game Ni Yetu</title></Helmet>
      
      {/* GLOBAL STYLES & ANIMATIONS */}
      <style>{`
        html { scroll-behavior: smooth; }
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #a3e635; borderRadius: 4px; }
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; gap: 40px; animation: scroll 30s linear infinite; width: max-content; }
        .hover-lift:hover { transform: translateY(-4px); transition: transform 0.2s; border-color: #a3e635 !important; }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
        @media (max-width: 768px) { .desktop-only { display: none !important; } }
      `}</style>

      {/* TOP BAR */}
      <div style={{ background: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <SeasonSwitcher activeSeason={activeSeason} setActiveSeason={setActiveSeason} />
        <div className="desktop-only" style={{ display: 'flex', gap: '16px' }}><span>DAR ES SALAAM</span><span>TANGA</span></div>
      </div>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
          <a href="#"><PandeLogo isMobile={isMobile} /></a>
          <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center', fontSize: '13px', fontWeight: 'bold' }}>
            {['Habari', 'Ratiba', 'Wadhamini'].map(item => <a key={item} href={`#${item.toLowerCase()}`} style={{ color: '#94a3b8', textDecoration: 'none' }}>{item.toUpperCase()}</a>)}
            <button onClick={() => setIsModalOpen(true)} style={{ ...s.btn, padding: '8px 16px', background: 'transparent', border: '1px solid #a3e635', color: '#a3e635' }}>SAJILI TIMU</button>
          </div>
          <button className="mobile-only" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white' }}>{isMobileMenuOpen ? <X/> : <Menu/>}</button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, top: '60px', background: '#0f172a', zIndex: 90, padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
           {['Nyumbani', 'Ratiba & Matokeo', 'Wadhamini', 'Kutuhusu'].map(i => <a key={i} href="#" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>{i}</a>)}
           <button onClick={() => { setIsMobileMenuOpen(false); setIsModalOpen(true); }} style={{ ...s.btn, width: '100%', marginTop: '20px' }}>SAJILI TIMU</button>
        </div>
      )}

      {/* HERO SECTION - Fixed Socials Layout */}
      <div style={s.hero}>
        <img src={currentHero.bgImage} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: isGoba2025 ? 'grayscale(100%) brightness(0.3)' : 'brightness(0.5)' }} alt="Hero" />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px', width: '100%', maxWidth: '800px' }}>
          
          {/* Location Tabs */}
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', borderRadius: '50px', padding: '4px', marginBottom: '30px', backdropFilter: 'blur(4px)' }}>
            {['kiomoni', 'goba'].map(loc => (
               <button key={loc} onClick={() => setActiveLocation(loc)} style={{ padding: '8px 24px', borderRadius: '50px', border: 'none', background: activeLocation === loc ? '#a3e635' : 'transparent', color: activeLocation === loc ? 'black' : 'white', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                 {loc === 'kiomoni' ? 'TANGA' : 'DAR'}
               </button>
            ))}
          </div>

          {isGoba2025 ? (
             <div className="animate-fade-in"><h1 style={s.title}>HAKUNA DATA</h1><p style={{ color: '#cbd5e1' }}>Msimu wa 2025 Goba haukuwepo.</p></div>
          ) : (
             <div className="animate-fade-in">
                <h1 style={s.title}>{currentHero.title}</h1>
                <p style={{ fontSize: isMobile ? '16px' : '18px', color: '#cbd5e1', marginBottom: '24px', lineHeight: 1.6 }}>{currentHero.subtitle}</p>
                
                {/* Fixed Social Icons Wrapper */}
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
                  {[
                    { icon: Instagram, link: SOCIAL_LINKS.instagram },
                    { icon: Facebook, link: SOCIAL_LINKS.facebook },
                    { icon: Youtube, link: SOCIAL_LINKS.youtube },
                    { icon: TikTokIcon, link: SOCIAL_LINKS.tiktok }
                  ].map((S, i) => (
                    <a key={i} href={S.link} target="_blank" rel="noreferrer" style={{ color: 'white', background: 'rgba(255,255,255,0.1)', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                      <S.icon size={20} />
                    </a>
                  ))}
                </div>
             </div>
          )}
        </div>
      </div>

      {/* SPONSOR MARQUEE - Optimized Images */}
      <div style={{ padding: '30px 0', background: '#020617', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
         <div className="marquee-track">
            {[...cmsData.sponsors, ...cmsData.sponsors].map((sp, i) => (
               <div key={i} className="sponsor-marquee-item">
                  <img src={sp.logo} alt={sp.name} style={{ height: '40px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6 }} />
               </div>
            ))}
         </div>
      </div>

      {!isGoba2025 && (
      <>
        {/* NEWS */}
        <section id="news" style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ borderLeft: '4px solid #a3e635', paddingLeft: '16px', marginBottom: '30px' }}><h2 style={{ ...s.title, fontSize: '24px', margin: 0 }}>HABARI <span style={s.lime}>{activeSeason}</span></h2></div>
          <div className="custom-scroll" style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
             {filteredNews.length > 0 ? filteredNews.map((n, i) => (
               <div key={i} className="hover-lift" style={{ ...s.card, minWidth: '280px', maxWidth: '300px' }}>
                  <img src={n.image} style={{ width: '100%', height: '180px', objectFit: 'cover' }} alt="News" />
                  <div style={{ padding: '20px' }}>
                     <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold' }}>{formatDate(n.date)}</span>
                     <h3 style={{ fontSize: '16px', margin: '8px 0', lineHeight: 1.4 }}>{n.title}</h3>
                     <button onClick={() => setSelectedNews(n)} style={{ background: 'none', border: 'none', color: '#a3e635', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>SOMA ZAIDI</button>
                  </div>
               </div>
             )) : <p style={{ color: '#64748b' }}>Hakuna habari mpya.</p>}
          </div>
        </section>

        {/* MATCH CENTER */}
        <section id="ratiba" style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px' }}>
              
              {/* Matches */}
              <div>
                <div style={{ borderLeft: '4px solid #a3e635', paddingLeft: '16px', marginBottom: '20px' }}><h2 style={{ ...s.title, fontSize: '24px', margin: 0 }}>RATIBA</h2></div>
                <div className="custom-scroll" style={{ maxHeight: '500px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   {filteredMatches.length ? filteredMatches.map((m, i) => (
                      <div key={i} className="hover-lift" style={{ ...s.card, padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}><span>{formatDate(m.matchDate)}</span><span>{m.stadium}</span></div>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', fontWeight: '900' }}>
                            <span style={{ width: '35%' }}>{m.home}</span>
                            <span style={{ color: '#a3e635', fontSize: '18px' }}>{m.score}</span>
                            <span style={{ width: '35%', textAlign: 'right' }}>{m.away}</span>
                         </div>
                      </div>
                   )) : <p style={{ color: '#64748b' }}>Hakuna mechi.</p>}
                </div>
              </div>

              {/* Standings */}
              <div>
                <div style={{ borderLeft: '4px solid #a3e635', paddingLeft: '16px', marginBottom: '20px' }}><h2 style={{ ...s.title, fontSize: '24px', margin: 0 }}>MSIMAMO</h2></div>
                <div className="custom-scroll" style={{ maxHeight: '500px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   {Object.keys(groupedStandings).sort().map(g => (
                      <div key={g} style={s.card}>
                         <div style={{ padding: '12px', background: 'rgba(163,230,53,0.1)', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>{g}</div>
                         <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                            <thead><tr style={{ color: '#94a3b8', textAlign: 'left' }}><th style={{ padding: '10px' }}>TIMU</th><th style={{ padding: '10px' }}>P</th><th style={{ padding: '10px' }}>GD</th><th style={{ padding: '10px' }}>PTS</th></tr></thead>
                            <tbody>
                               {groupedStandings[g].map((t, i) => (
                                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                     <td style={{ padding: '10px', fontWeight: 'bold' }}>{i+1}. {t.team}</td>
                                     <td style={{ padding: '10px' }}>{t.p}</td>
                                     <td style={{ padding: '10px' }}>{t.gd}</td>
                                     <td style={{ padding: '10px', color: '#a3e635', fontWeight: 'bold' }}>{t.pts}</td>
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

        {/* 6. GORILLA MWAKERE ZONE */}
        <section id="mwakere-zone" style={{ background: '#0f172a', paddingBottom: '60px', position: 'relative', zIndex: 20 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(163,230,53,0.1)', marginBottom: '30px' }}></div>
            <GorillaBot standings={filteredStandings} matches={filteredMatches} />
        </section>
      </>
      )}

      {/* FOOTER */}
      <footer style={{ background: '#020617', borderTop: '1px solid rgba(163,230,53,0.1)', padding: '50px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
              <div>
                  <PandeLogo size="large" isMobile={isMobile} />
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '16px', lineHeight: 1.6 }}>Harakati za soka la mtaani. Vipaji, Burudani na Umoja.</p>
              </div>
              <div>
                  <h4 style={{ color: 'white', marginBottom: '16px', fontWeight: '800' }}>MAWASILIANO</h4>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={14} color="#a3e635"/> +255 653 292 935</p>
                  <p style={{ color: '#cbd5e1', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}><Mail size={14} color="#a3e635"/> pandecup2023@gmail.com</p>
              </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '20px', fontSize: '12px', color: '#64748b' }}>
             © 2026 Pande Cup. All Rights Reserved.
          </div>
      </footer>
      
      {/* MODALS (Simplified for brevity) */}
      {selectedNews && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.9)', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <div className="custom-scroll" style={{ background: '#1e293b', borderRadius: '16px', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                <img src={selectedNews.image} style={{ width: '100%', height: '250px', objectFit: 'cover' }} alt="Detail"/>
                <div style={{ padding: '30px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ color: '#a3e635', fontWeight: 'bold', fontSize: '12px' }}>{formatDate(selectedNews.date)}</span>
                      <button onClick={() => setSelectedNews(null)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X/></button>
                   </div>
                   <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>{selectedNews.title}</h2>
                   <p style={{ color: '#cbd5e1', lineHeight: 1.8 }}>{selectedNews.body || selectedNews.excerpt}</p>
                </div>
             </div>
          </div>
      )}

      {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ background: '#1e293b', padding: '30px', borderRadius: '16px', width: '90%', maxWidth: '400px', position: 'relative', textAlign: 'center' }}>
                  <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: 'white' }}><X/></button>
                  <h2 style={{ color: '#a3e635', marginBottom: '10px' }}>Sajili Timu</h2>
                  <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>Usajili unafanyika kwa njia ya WhatsApp.</p>
                  <a href="https://wa.me/255653292935" style={{ display: 'block', background: '#25D366', color: 'white', padding: '14px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>Chat WhatsApp</a>
              </div>
          </div>
      )}
    </div>
  );
};

export default HomePage;