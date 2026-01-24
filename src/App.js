import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Phone, History, Newspaper, Info, Play
} from 'lucide-react';

// --- USANIDI (CONFIG) ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};
const FEES = { amount: "Tsh 100,000/=", number: "556677", name: "PANDE SPORTS ENT" };

// --- DATA ZA KUAZIMIA (FALLBACK - VISUALS ONLY) ---
// Hizi zinahakikisha site haiko tupu wakati inatafuta data
const FALLBACK_DATA = {
  hero: [
    { 
      location: 'kiomoni', 
      title: "HII GAME NI YETU.", 
      subtitle: "Soka la mtaani lenye hadhi ya kitaifa. Kutoka vumbi la Kiomoni hadi taa za Goba.", 
      bgImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1600" // Football texture
    },
    { 
      location: 'goba', 
      title: "PANDE CUP JIJI.", 
      subtitle: "Tunawasha taa Goba! Soka safi, burudani na uchumi.", 
      bgImage: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=1600" // Stadium lights
    }
  ],
  matches: [
    { home: "MTI PESA", away: "MABAYANI", score: "2-1", status: "FT", location: "kiomoni", season: "June 2025" },
    { home: "MPIRANI", away: "MNYENZANI", score: "5-2", status: "FT", location: "kiomoni", season: "June 2025" },
    { home: "URUGUAY", away: "PAMBA", score: "1-0", status: "FT", location: "kiomoni", season: "June 2025" }
  ],
  news: [
    { 
      date: "2025-06-29", 
      title: "Shangwe la Ufunguzi: Zaidi ya Soka", 
      excerpt: "Vumbi la Kiomoni lilitimka si kwa soka tu! Kufukuza kuku, kuvuta kamba na ngoma za asili vilitawala.", 
      image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=500", // Soccer generic
      location: "kiomoni", season: "June 2025" 
    },
    { 
      date: "2025-08-30", 
      title: "Historia: Mpirani Bingwa!", 
      excerpt: "Timu ya Mpirani (Uruguay) imenyakua taji la kwanza la Pande Cup mbele ya umati wa kihistoria.", 
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=500", // Trophy generic
      location: "kiomoni", season: "June 2025" 
    }
  ],
  videos: [
    { 
      title: "Highlights: Fainali 2025", 
      videoUrl: "https://youtube.com", 
      duration: "10:00", 
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=500",
      location: "kiomoni", season: "June 2025" 
    }
  ],
  standings: [
    { pos: 1, team: "Mti Pesa FC", p: 3, gd: "+4", pts: 9, location: "kiomoni", season: "June 2025" },
    { pos: 2, team: "Mpirani FC", p: 3, gd: "+3", pts: 7, location: "kiomoni", season: "June 2025" },
    { pos: 3, team: "Mabayani FC", p: 3, gd: "-1", pts: 4, location: "kiomoni", season: "June 2025" }
  ],
  sponsors: [
    { name: "VODACOM", logo: "/images/vodacom.png" }, { name: "CRDB", logo: "/images/crdb.png" },
    { name: "YAS", logo: "/images/yas.png" }, { name: "POLISI", logo: "/images/polisi.png" },
    { name: "AZAM", logo: "/images/azam.png" }
  ]
};

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal' }) => (
  <div style={{ 
    fontSize: size === 'large' ? '32px' : '24px', 
    fontWeight: '900', 
    fontStyle: 'italic', 
    textTransform: 'uppercase', 
    color: 'white', 
    fontFamily: '"Oswald", sans-serif',
    letterSpacing: '-1px'
  }}>
    PANDE<span style={{ color: '#a3e635' }}>CUP</span>
  </div>
);

const TikTokIcon = ({ size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>);

const SectionHeader = ({ icon: Icon, title, highlight }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' }}>
    {Icon && <Icon color="#a3e635" size={24} />}
    <h2 style={{ fontSize: '24px', margin: 0, textTransform: 'uppercase', fontStyle: 'italic', fontFamily: '"Oswald", sans-serif' }}>
      {title} <span style={{ color: '#a3e635' }}>{highlight}</span>
    </h2>
  </div>
);

const App = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('June 2025'); // Default 2025 ili tuone data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teamData, setTeamData] = useState({ name: '', coach: '', phone: '', terms: false });
  const [selectedNews, setSelectedNews] = useState(null);
  
  // Start with Fallback, fill with Contentful later
  const [cmsData, setCmsData] = useState(FALLBACK_DATA);

  // --- ACTIONS ---
  const handleFinalSubmit = () => { alert("Asante! Tutawasiliana."); setModalStep(3); };
  const openModal = () => { setIsModalOpen(true); setModalStep(1); setIsMobileMenuOpen(false); };
  const closeModal = () => setIsModalOpen(false);

  // --- FONT INJECTION ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // --- DATA FETCHING (SILENT) ---
  useEffect(() => {
    const fetchContentfulData = async () => {
      const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;
      const fetchSafe = async (type) => {
        try {
          const res = await fetch(`${baseUrl}&content_type=${type}&include=1`);
          return res.ok ? await res.json() : { items: [] };
        } catch { return { items: [] }; }
      };

      const [hero, matches, news, standings, videos] = await Promise.all([
        fetchSafe('heroSection'), fetchSafe('match'), fetchSafe('news'), fetchSafe('standing'), fetchSafe('video')
      ]);

      const getUrl = (item) => item?.fields?.file?.url ? `https:${item.fields.file.url}` : null;
      const getAsset = (id, assets) => assets?.find(a => a.sys.id === id);

      // Process only if we have data, otherwise keep fallback
      if (matches.items.length > 0 || news.items.length > 0) {
        setCmsData({
          hero: hero.items.map(i => ({
            title: i.fields.title, subtitle: i.fields.subtitle, location: i.fields.location?.toLowerCase() || 'kiomoni',
            bgImage: getUrl(getAsset(i.fields.backgroundImage?.sys?.id || i.fields.image?.sys?.id, hero.includes))
          })),
          matches: matches.items.map(i => ({
            home: i.fields.homeTeam, away: i.fields.awayTeam, score: i.fields.score, status: i.fields.status,
            location: i.fields.location || 'kiomoni', season: i.fields.season || 'June 2026'
          })),
          news: news.items.map(i => ({
            date: i.fields.date, title: i.fields.title, excerpt: i.fields.excerpt, body: i.fields.body,
            image: getUrl(getAsset(i.fields.image?.sys?.id, news.includes)) || "https://via.placeholder.com/500",
            location: i.fields.location || 'kiomoni', season: i.fields.season || 'June 2026'
          })),
          standings: standings.items.map(i => ({
            pos: i.fields.position, team: i.fields.teamName, p: i.fields.played, gd: i.fields.goalDifference, pts: i.fields.points,
            location: i.fields.location || 'kiomoni', season: i.fields.season || 'June 2026'
          })).sort((a,b)=>a.pos-b.pos),
          videos: videos.items.map(i => ({
            title: i.fields.title, videoUrl: i.fields.videoUrl, thumbnail: getUrl(getAsset(i.fields.thumbnail?.sys?.id, videos.includes)),
            location: i.fields.location || 'kiomoni', season: i.fields.season || 'June 2026'
          })),
          sponsors: FALLBACK_DATA.sponsors
        });
      }
    };
    fetchContentfulData();
  }, []);

  // --- FILTERING ---
  const filterData = (arr) => {
    if (!arr) return [];
    return arr.filter(i => {
      const iLoc = (i.location || 'kiomoni').toLowerCase();
      const iSea = (i.season || 'June 2026').toLowerCase();
      return iLoc.includes(activeLocation) && iSea === activeSeason.toLowerCase();
    });
  };

  const currentHero = cmsData.hero.find(h => h.location.includes(activeLocation)) || cmsData.hero[0] || FALLBACK_DATA.hero[0];
  const filteredMatches = filterData(cmsData.matches);
  const filteredNews = filterData(cmsData.news);
  const filteredStandings = filterData(cmsData.standings);
  const filteredVideos = filterData(cmsData.videos);
  const isGoba2025 = activeLocation === 'goba' && activeSeason === 'June 2025';

  let heroTitle = isGoba2025 ? "HISTORIA: JUNI 2025" : (currentHero.title || "PANDE CUP");
  let heroSub = isGoba2025 ? "Msimu wa Historia." : (currentHero.subtitle || "Karibu.");
  let heroBg = isGoba2025 ? "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600" : (currentHero.bgImage || FALLBACK_DATA.hero[0].bgImage);

  // --- STYLES ---
  const s = {
    container: { backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' },
    nav: { position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 20px' },
    glassCard: { backgroundColor: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' },
    btn: { background: '#a3e635', color: '#020617', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontFamily: '"Oswald", sans-serif', cursor: 'pointer' },
    section: { maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' },
    btnSeason: (active) => ({ background: 'none', border: 'none', color: active ? '#a3e635' : '#64748b', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }),
    btnLoc: (active) => ({ padding: '8px 20px', borderRadius: '50px', border: active ? '1px solid #a3e635' : '1px solid rgba(255,255,255,0.3)', background: active ? '#a3e635' : 'transparent', color: active ? 'black' : 'white', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' })
  };

  return (
    <div style={s.container}>
      <style>{`
        body { margin: 0; }
        h1, h2, h3 { font-family: 'Oswald', sans-serif; }
        .hover-up:hover { transform: translateY(-5px); transition: transform 0.3s; }
        .grid-responsive { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
        @media(max-width:768px){ .desktop{display:none} .mobile-hero{min-height:70vh} .hero-text{font-size:3rem!important} }
      `}</style>

      {/* TOP BAR */}
      <div style={{ background: '#020617', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b' }}>
        <div className="desktop" style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}><History size={12}/> SEASON: <span style={{color:'#22c55e', fontWeight:'bold'}}>{activeSeason}</span></div>
        <div style={{ display: 'flex', gap: 16 }}>
           <button onClick={()=>{setActiveSeason('June 2025'); setActiveLocation('kiomoni')}} style={s.btnSeason(activeSeason==='June 2025')}>2025 (HISTORIA)</button>
           <button onClick={()=>setActiveSeason('June 2026')} style={s.btnSeason(activeSeason==='June 2026')}>2026 (LIVE)</button>
        </div>
      </div>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PandeLogo />
          <div className="desktop" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            <a href="#news" style={{color:'#94a3b8', textDecoration:'none', fontWeight:'600', fontSize:13}}>HABARI</a>
            <a href="#ratiba" style={{color:'#94a3b8', textDecoration:'none', fontWeight:'600', fontSize:13}}>RATIBA</a>
            <button onClick={openModal} style={s.btn}>SAJILI TIMU</button>
          </div>
          <button onClick={()=>setIsMobileMenuOpen(true)} style={{background:'none', border:'none', color:'white'}} className="mobile-only-btn"><Menu/></button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }} className="mobile-hero">
        <img src={heroBg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="hero" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.1), #0f172a)' }}></div>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 800 }}>
          <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'center', gap: 12 }}>
            <button onClick={()=>setActiveLocation('kiomoni')} style={s.btnLoc(activeLocation==='kiomoni')}>KIOMONI</button>
            <button onClick={()=>setActiveLocation('goba')} style={s.btnLoc(activeLocation==='goba')}>GOBA</button>
          </div>
          <h1 className="hero-text" style={{ fontSize: '5rem', lineHeight: 0.9, textTransform: 'uppercase', fontStyle: 'italic', marginBottom: 24, textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>{heroTitle}</h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: 32 }}>{heroSub}</p>
          <div style={{color:'#a3e635', fontWeight:'bold', letterSpacing:2, fontSize:12}}>{activeSeason} • {activeLocation.toUpperCase()}</div>
        </div>
      </div>

      {/* CONTENT */}
      {!isGoba2025 && (
        <>
          {/* HABARI */}
          <section id="news" style={s.section}>
            <SectionHeader icon={Newspaper} title="HABARI" highlight="ZA MSIMU" />
            <div className="grid-responsive">
              {filteredNews.map((n, i) => (
                <div key={i} onClick={()=>setSelectedNews(n)} className="hover-up" style={{...s.glassCard, cursor:'pointer'}}>
                  <div style={{height: 200, background: '#1e293b'}}>
                    {n.image && <img src={n.image} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="news" />}
                  </div>
                  <div style={{padding: 24}}>
                    <div style={{color:'#a3e635', fontSize:11, fontWeight:'bold', marginBottom:8}}>{formatDate(n.date)}</div>
                    <h3 style={{fontSize:18, margin:'0 0 12px'}}>{n.title}</h3>
                    <p style={{color:'#94a3b8', fontSize:14}}>{n.excerpt}</p>
                  </div>
                </div>
              ))}
              {filteredNews.length === 0 && <div style={{color:'#64748b', gridColumn:'1/-1', textAlign:'center', padding:40, background:'rgba(255,255,255,0.02)', borderRadius:16}}><Info style={{margin:'0 auto 10px'}}/>Hakuna habari bado.</div>}
            </div>
          </section>

          {/* RATIBA */}
          <section id="ratiba" style={{...s.section, background:'#020617'}}>
            <div className="grid-responsive">
              <div>
                <SectionHeader icon={Clock} title="RATIBA" highlight="& MATOKEO" />
                <div style={{display:'flex', flexDirection:'column', gap:16}}>
                  {filteredMatches.map((m,i) => (
                    <div key={i} style={{...s.glassCard, padding:20, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <span style={{fontWeight:800, width:'35%', fontSize:14}}>{m.home}</span>
                      <div style={{textAlign:'center'}}>
                        <div style={{color:'#a3e635', fontWeight:900, fontSize:20}}>{m.score}</div>
                        <div style={{fontSize:10, color:'#64748b', fontWeight:'bold'}}>{m.status}</div>
                      </div>
                      <span style={{fontWeight:800, width:'35%', textAlign:'right', fontSize:14}}>{m.away}</span>
                    </div>
                  ))}
                  {filteredMatches.length === 0 && <p style={{color:'#64748b'}}>Hakuna mechi.</p>}
                </div>
              </div>
              <div>
                <SectionHeader icon={ListOrdered} title="MSIMAMO" highlight="WA LIGI" />
                <div style={{...s.glassCard, padding:24}}>
                  <table style={{width:'100%', borderCollapse:'collapse', fontSize:14}}>
                    <thead>
                      <tr style={{color:'#64748b', borderBottom:'1px solid #333'}}>
                        <th style={{textAlign:'left', paddingBottom:12}}>POS</th>
                        <th style={{textAlign:'left', paddingBottom:12}}>TIMU</th>
                        <th style={{paddingBottom:12}}>P</th>
                        <th style={{paddingBottom:12}}>PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStandings.map((t,i) => (
                        <tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                          <td style={{padding:'12px 0', color: i===0?'#a3e635':'white', fontWeight:'bold'}}>{t.pos}</td>
                          <td style={{padding:'12px 0', fontWeight:'bold'}}>{t.team}</td>
                          <td style={{padding:'12px 0', textAlign:'center'}}>{t.p}</td>
                          <td style={{padding:'12px 0', textAlign:'center', fontWeight:'bold'}}>{t.pts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredStandings.length === 0 && <p style={{color:'#64748b', marginTop:20}}>Msimamo haujatoka.</p>}
                </div>
              </div>
            </div>
          </section>

          {/* VIDEO */}
          <section id="tv" style={s.section}>
            <SectionHeader icon={Video} title="PANDE CUP" highlight="TV" />
            <div className="grid-responsive">
              {filteredVideos.map((v,i) => (
                <a key={i} href={v.videoUrl} target="_blank" rel="noreferrer" style={{...s.glassCard, display:'block', position:'relative', textDecoration:'none'}}>
                  <div style={{height:180, background:'#000', position:'relative'}}>
                    {v.thumbnail && <img src={v.thumbnail} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="video" />}
                    <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <div style={{width:50, height:50, background:'#a3e635', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center'}}><Play color="black" fill="black" size={20} style={{marginLeft:4}}/></div>
                    </div>
                  </div>
                  <div style={{padding:16}}><p style={{margin:0, fontWeight:'bold', color:'white', fontSize:14}}>{v.title}</p></div>
                </a>
              ))}
              {filteredVideos.length === 0 && <p style={{color:'#64748b'}}>Hakuna video.</p>}
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer style={{background:'black', padding:'80px 24px', borderTop:'1px solid #333'}}>
        <div style={{maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:60}}>
          <div>
            <div style={{marginBottom:24}}><PandeLogo size="large" /></div>
            <p style={{color:'#94a3b8', fontSize:14, lineHeight:1.6}}>Pande Cup si ligi tu, ni maisha. Tunajenga umoja na vipaji kupitia soka.</p>
            <div style={{display:'flex', gap:16, marginTop:24}}>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.7}}><Instagram size={20}/></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.7}}><Facebook size={20}/></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.7}}><Youtube size={20}/></a>
            </div>
          </div>
          <div>
            <h4 style={{color:'white', marginBottom:24}}>VIUNGO</h4>
            <div style={{display:'flex', flexDirection:'column', gap:12}}>
              <a href="#news" style={{color:'#64748b', textDecoration:'none', fontSize:14}}>Habari</a>
              <a href="#ratiba" style={{color:'#64748b', textDecoration:'none', fontSize:14}}>Ratiba</a>
              <button onClick={openModal} style={{background:'none', border:'none', color:'#a3e635', textAlign:'left', padding:0, fontWeight:'bold', cursor:'pointer', fontSize:14}}>Sajili Timu</button>
            </div>
          </div>
          <div>
            <h4 style={{color:'white', marginBottom:24}}>MAWASILIANO</h4>
            <div style={{display:'flex', flexDirection:'column', gap:12, color:'#94a3b8', fontSize:14}}>
              <div style={{display:'flex', gap:10}}><Phone size={16}/> +255 700 000 000</div>
              <div style={{display:'flex', gap:10}}><MapPin size={16}/> Goba & Kiomoni</div>
            </div>
          </div>
        </div>
        <div style={{textAlign:'center', marginTop:60, paddingTop:40, borderTop:'1px solid #222', color:'#444', fontSize:12}}>© 2026 Pande Cup.</div>
      </footer>

      {/* MODAL */}
      {isModalOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(5px)'}}>
          <div style={{background:'#0f172a', padding:32, borderRadius:24, width:'100%', maxWidth:450, border:'1px solid #333', position:'relative'}}>
            <button onClick={closeModal} style={{position:'absolute', top:20, right:20, background:'none', border:'none', color:'#64748b', cursor:'pointer'}}><X/></button>
            {modalStep === 1 && (
              <>
                <h2 style={{margin:'0 0 8px', textTransform:'uppercase'}}>Fomu ya <span style={{color:'#a3e635'}}>Maombi</span></h2>
                <p style={{color:'#94a3b8', fontSize:14, marginBottom:24}}>Jaza taarifa sahihi.</p>
                <input placeholder="Jina la Timu" value={teamData.name} onChange={e=>setTeamData({...teamData, name:e.target.value})} style={{width:'100%', padding:14, background:'#020617', border:'1px solid #333', borderRadius:8, color:'white', marginBottom:12}} />
                <input placeholder="Jina la Kocha" value={teamData.coach} onChange={e=>setTeamData({...teamData, coach:e.target.value})} style={{width:'100%', padding:14, background:'#020617', border:'1px solid #333', borderRadius:8, color:'white', marginBottom:12}} />
                <input placeholder="Namba ya Simu" value={teamData.phone} onChange={e=>setTeamData({...teamData, phone:e.target.value})} style={{width:'100%', padding:14, background:'#020617', border:'1px solid #333', borderRadius:8, color:'white', marginBottom:24}} />
                <button onClick={()=>setModalStep(2)} style={{...s.btn, width:'100%'}}>ENDELEA</button>
              </>
            )}
            {modalStep === 2 && (
              <div style={{textAlign:'center'}}>
                <h2 style={{marginTop:0}}>Thibitisha</h2>
                <div style={{background:'rgba(255,255,255,0.05)', padding:20, borderRadius:12, marginBottom:20}}>
                  <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}><span style={{color:'#94a3b8'}}>Ada:</span> <b>{FEES.amount}</b></div>
                  <div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:'#94a3b8'}}>Namba:</span> <b style={{color:'#a3e635'}}>{FEES.number}</b></div>
                </div>
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:24}}>
                  <input type="checkbox" checked={teamData.terms} onChange={e=>setTeamData({...teamData, terms:e.target.checked})} />
                  <span style={{color:'#cbd5e1', fontSize:13}}>Nakubaliana na masharti</span>
                </div>
                <button disabled={!teamData.terms} onClick={handleFinalSubmit} style={{...s.btn, width:'100%', opacity:teamData.terms?1:0.5}}>TUMA MAOMBI</button>
              </div>
            )}
            {modalStep === 3 && (
              <div style={{textAlign:'center', padding:'20px 0'}}>
                <div style={{width:60, height:60, background:'rgba(34,197,94,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}><Check color="#22c55e" size={32}/></div>
                <h2>Imepokelewa!</h2>
                <button onClick={closeModal} style={{background:'none', border:'none', color:'#a3e635', fontWeight:'bold', marginTop:16, cursor:'pointer'}}>FUNGA</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div style={{position:'fixed', inset:0, background:'#0f172a', zIndex:60, padding:32}}>
          <button onClick={()=>setIsMobileMenuOpen(false)} style={{position:'absolute', top:24, right:24, background:'none', border:'none', color:'white'}}><X size={32}/></button>
          <div style={{marginTop:80, display:'flex', flexDirection:'column', gap:32}}>
            <a href="#news" onClick={()=>setIsMobileMenuOpen(false)} style={{color:'white', fontSize:24, fontWeight:'bold', textDecoration:'none', fontFamily:'Oswald'}}>HABARI</a>
            <a href="#ratiba" onClick={()=>setIsMobileMenuOpen(false)} style={{color:'white', fontSize:24, fontWeight:'bold', textDecoration:'none', fontFamily:'Oswald'}}>RATIBA</a>
            <button onClick={openModal} style={{...s.btn, width:'100%', fontSize:18, padding:16}}>SAJILI TIMU</button>
          </div>
        </div>
      )}

      {/* NEWS FULL */}
      {selectedNews && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:110, padding:20, overflowY:'auto'}}>
          <button onClick={()=>setSelectedNews(null)} style={{position:'fixed', top:20, right:20, background:'white', border:'none', borderRadius:'50%', width:40, height:40, zIndex:120}}><X color="black"/></button>
          <div style={{maxWidth:600, margin:'40px auto', color:'white'}}>
            <h1>{selectedNews.title}</h1>
            {selectedNews.image && <img src={selectedNews.image} style={{width:'100%', borderRadius:16}} alt="full" />}
            <p style={{lineHeight:1.8, fontSize:18, marginTop:24, whiteSpace:'pre-wrap'}}>{selectedNews.body || selectedNews.excerpt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;