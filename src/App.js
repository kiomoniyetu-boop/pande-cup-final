import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Video, Play, Phone, History, Newspaper, Trophy
} from 'lucide-react';

// --- CONSTANTS ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

const FEES = { amount: "Tsh 100,000/=", number: "556677", name: "PANDE SPORTS ENT" };

const MANUAL_DATA = {
  hero: {
    title: "HII GAME NI YETU.",
    subtitle: "Soka la mtaani lenye hadhi ya kitaifa. Kutoka vumbi la Kiomoni hadi taa za Goba.",
    bgImage: "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600"
  },
  matches: [
    { home: "MTI PESA", away: "MABAYANI", score: "2-1", status: "FT" },
    { home: "MPIRANI", away: "MNYENZANI", score: "5-2", status: "FT" },
    { home: "URUGUAY", away: "PAMBA", score: "1-0", status: "FT" }
  ],
  news: [
    { date: "29 JUN 2025", title: "Shangwe la Ufunguzi: Zaidi ya Soka", excerpt: "Vumbi la Kiomoni lilitimka si kwa soka tu! Kufukuza kuku, kuvuta kamba na ngoma za asili vilitawala.", image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6d?auto=format&fit=crop&q=80&w=500" },
    { date: "30 AUG 2025", title: "Historia: Mpirani Bingwa!", excerpt: "Timu ya Mpirani (Uruguay) imenyakua taji la kwanza la Pande Cup mbele ya umati wa kihistoria.", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=500" },
    { date: "20 JAN 2026", title: "Usajili wa Msimu Mpya Waanza", excerpt: "Fomu za usajili kwa msimu wa 2026 zinapatikana sasa. Wahi mapema nafasi ni chache.", image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=500" }
  ],
  standings: [
    { pos: 1, team: "Mti Pesa FC", p: 3, gd: "+4", pts: 9 },
    { pos: 2, team: "Mpirani FC", p: 3, gd: "+3", pts: 7 },
    { pos: 3, team: "Mabayani FC", p: 3, gd: "-1", pts: 4 },
    { pos: 4, team: "Uruguay FC", p: 3, gd: "-2", pts: 3 }
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
    fontSize: size === 'large' ? '36px' : '28px', 
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

const SectionTitle = ({ title, highlight }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' }}>
    <h2 style={{ fontSize: '24px', margin: 0, textTransform: 'uppercase', fontStyle: 'italic', fontFamily: '"Oswald", sans-serif', color: 'white' }}>
      {title} <span style={{ color: '#a3e635' }}>{highlight}</span>
    </h2>
  </div>
);

const App = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('June 2026'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [teamData, setTeamData] = useState({ name: '', coach: '', phone: '', terms: false });
  const [selectedNews, setSelectedNews] = useState(null);

  // Handlers
  const handleFinalSubmit = () => { alert("Asante! Tufawasiliana."); setModalStep(3); };
  const openModal = () => { setIsModalOpen(true); setModalStep(1); setIsMobileMenuOpen(false); };

  // Styles Object
  const s = {
    container: { backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' },
    nav: { position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 20px' },
    hero: { position: 'relative', height: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px' },
    glassCard: { backgroundColor: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden' },
    btnPrimary: { background: '#a3e635', color: '#020617', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontFamily: '"Oswald", sans-serif', textTransform: 'uppercase', cursor: 'pointer', fontSize: '14px', letterSpacing: '1px' },
    section: { maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' },
    locationBtn: (active) => ({ padding: '8px 20px', borderRadius: '50px', border: active ? '1px solid #a3e635' : '1px solid rgba(255,255,255,0.3)', background: active ? '#a3e635' : 'transparent', color: active ? 'black' : 'white', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', transition: 'all 0.3s' })
  };

  return (
    <div style={s.container}>
      {/* GLOBAL STYLES & FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        h1, h2, h3, h4 { font-family: 'Oswald', sans-serif; }
        .hover-scale { transition: transform 0.3s ease; }
        .hover-scale:hover { transform: translateY(-5px); }
        .grid-news { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
        .grid-match { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 40px; }
        @media (max-width: 768px) {
          .hero-title { font-size: 3rem !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>

      {/* TOP BAR */}
      <div style={{ background: '#020617', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="desktop-only" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}><History size={12}/> SEASON: <span style={{color:'#22c55e', fontWeight:'bold'}}>{activeSeason}</span></div>
        <div style={{ display: 'flex', gap: 12 }}>
           <button onClick={() => {setActiveSeason('June 2025'); setActiveLocation('kiomoni')}} style={{background:'none', border:'none', color: activeSeason==='June 2025'?'#a3e635':'#64748b', fontWeight:'bold', cursor:'pointer'}}>2025 (HISTORIA)</button>
           <button onClick={() => setActiveSeason('June 2026')} style={{background:'none', border:'none', color: activeSeason==='June 2026'?'#a3e635':'#64748b', fontWeight:'bold', cursor:'pointer'}}>2026 (LIVE)</button>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav style={s.nav}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <PandeLogo />
          <div className="desktop-only" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#news" style={{color:'white', textDecoration:'none', fontWeight:'600', fontSize:'14px'}}>HABARI</a>
            <a href="#ratiba" style={{color:'white', textDecoration:'none', fontWeight:'600', fontSize:'14px'}}>RATIBA</a>
            <button onClick={openModal} style={s.btnPrimary}>SAJILI TIMU</button>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="desktop-only" style={{ display: window.innerWidth < 768 ? 'block' : 'none', background: 'none', border: 'none', color: 'white' }}><Menu size={28} /></button>
          {/* Force Mobile Menu Button for safety */}
          <button onClick={() => setIsMobileMenuOpen(true)} style={{ display: 'block', background: 'none', border: 'none', color: 'white', cursor:'pointer' }} className="mobile-only-btn"><Menu size={28} /></button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header style={s.hero}>
        <img src={MANUAL_DATA.hero.bgImage} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Hero" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.2), #0f172a)' }}></div>
        
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
            <button onClick={() => setActiveLocation('kiomoni')} style={s.locationBtn(activeLocation === 'kiomoni')}>KIOMONI</button>
            <button onClick={() => setActiveLocation('goba')} style={s.locationBtn(activeLocation === 'goba')}>GOBA</button>
          </div>
          
          <h1 className="hero-title" style={{ fontSize: '5rem', lineHeight: '0.9', fontStyle: 'italic', textTransform: 'uppercase', marginBottom: '16px', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            {MANUAL_DATA.hero.title}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '32px', lineHeight: '1.6' }}>{MANUAL_DATA.hero.subtitle}</p>
          <div style={{color:'#a3e635', fontWeight:'bold', letterSpacing:'2px', fontSize:'14px'}}>{activeSeason} • {activeLocation.toUpperCase()}</div>
        </div>
      </header>

      {/* HABARI */}
      <section id="news" style={s.section}>
        <SectionTitle title="HABARI" highlight="ZA HIVI PUNDE" />
        <div className="grid-news">
          {MANUAL_DATA.news.map((item, i) => (
            <div key={i} className="hover-scale" style={s.glassCard}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="News" />
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ color: '#a3e635', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>{item.date}</div>
                <h3 style={{ margin: '0 0 12px', fontSize: '18px', lineHeight: '1.3' }}>{item.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' }}>{item.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RATIBA & MSIMAMO */}
      <section id="ratiba" style={{ ...s.section, background: '#020617' }}>
        <div className="grid-match">
          {/* Matokeo */}
          <div>
            <SectionTitle title="MATOKEO" highlight="YALIYOPITA" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MANUAL_DATA.matches.map((match, i) => (
                <div key={i} style={{ ...s.glassCard, padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', width: '35%', fontSize: '14px' }}>{match.home}</span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: '#a3e635', fontWeight: '900', fontSize: '24px' }}>{match.score}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>{match.status}</div>
                  </div>
                  <span style={{ fontWeight: '800', width: '35%', textAlign: 'right', fontSize: '14px' }}>{match.away}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Msimamo */}
          <div>
            <SectionTitle title="MSIMAMO" highlight="WA LIGI" />
            <div style={{ ...s.glassCard, padding: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ textAlign: 'left', paddingBottom: '12px' }}>POS</th>
                    <th style={{ textAlign: 'left', paddingBottom: '12px' }}>TIMU</th>
                    <th style={{ paddingBottom: '12px' }}>P</th>
                    <th style={{ paddingBottom: '12px' }}>GD</th>
                    <th style={{ paddingBottom: '12px' }}>PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {MANUAL_DATA.standings.map((team, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '16px 0', fontWeight: 'bold', color: i===0 ? '#a3e635' : 'white' }}>{team.pos}</td>
                      <td style={{ padding: '16px 0', fontWeight: 'bold' }}>{team.team}</td>
                      <td style={{ padding: '16px 0', textAlign: 'center' }}>{team.p}</td>
                      <td style={{ padding: '16px 0', textAlign: 'center' }}>{team.gd}</td>
                      <td style={{ padding: '16px 0', textAlign: 'center', fontWeight: 'bold' }}>{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000', padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '60px' }}>
          
          {/* About */}
          <div>
            <div style={{ marginBottom: '24px' }}><PandeLogo size="large" /></div>
            <p style={{ color: '#94a3b8', lineHeight: '1.7', fontSize: '14px', marginBottom: '24px' }}>{ABOUT_TEXT.description}</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.8}}><Instagram size={20}/></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.8}}><Facebook size={20}/></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.8}}><Youtube size={20}/></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" style={{color:'white', opacity:0.8}}><TikTokIcon size={20}/></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '16px' }}>VIUNGO VYA HARAKA</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <a href="#news" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Habari & Matukio</a>
              <a href="#ratiba" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Ratiba ya Ligi</a>
              <button onClick={openModal} style={{ background: 'none', border: 'none', color: '#a3e635', textAlign: 'left', padding: 0, fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>Sajili Timu</button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '16px' }}>MAWASILIANO</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={16} color="#a3e635"/> +255 700 000 000</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={16} color="#a3e635"/> Goba Center & Kiomoni Tanga</div>
              <div style={{ marginTop: '16px', borderLeft: '3px solid #a3e635', paddingLeft: '12px', fontStyle: 'italic', color: 'white' }}>
                "Pamoja sisi ni Pande."
              </div>
            </div>
          </div>

        </div>
        <div style={{ textAlign: 'center', marginTop: '60px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#475569', fontSize: '12px' }}>
          © 2026 Pande Cup. All Rights Reserved.
        </div>
      </footer>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div style={s.mobileMenu}>
          <button onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'white' }}><X size={32} /></button>
          <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <a href="#news" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', fontFamily: '"Oswald", sans-serif' }}>HABARI</a>
            <a href="#ratiba" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', fontFamily: '"Oswald", sans-serif' }}>RATIBA</a>
            <button onClick={openModal} style={{ ...s.btnPrimary, width: '100%', fontSize: '18px', padding: '16px' }}>SAJILI TIMU</button>
          </div>
        </div>
      )}

      {/* MODAL - USAJILI */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(5px)' }}>
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '450px', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X /></button>
            
            {modalStep === 1 ? (
              <>
                <h2 style={{ margin: '0 0 8px', fontSize: '24px', textTransform: 'uppercase' }}>Fomu ya <span style={{ color: '#a3e635' }}>Maombi</span></h2>
                <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Jaza taarifa sahihi ili kusajili timu.</p>
                <input placeholder="Jina la Timu" style={{ width: '100%', padding: '14px', background: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', marginBottom: '12px' }} />
                <input placeholder="Jina la Kocha" style={{ width: '100%', padding: '14px', background: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', marginBottom: '12px' }} />
                <input placeholder="Namba ya Simu" style={{ width: '100%', padding: '14px', background: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', marginBottom: '24px' }} />
                <button onClick={() => setModalStep(2)} style={{ ...s.btnPrimary, width: '100%' }}>ENDELEA</button>
              </>
            ) : modalStep === 2 ? (
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ margin: '0 0 16px' }}>Thibitisha</h2>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#94a3b8' }}>Ada:</span> <b>{FEES.amount}</b></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Namba:</span> <b style={{ color: '#a3e635' }}>{FEES.number}</b></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
                  <input type="checkbox" onChange={(e) => setTeamData({...teamData, terms: e.target.checked})} />
                  <span style={{ color: '#cbd5e1', fontSize: '13px' }}>Nakubaliana na masharti</span>
                </div>
                <button disabled={!teamData.terms} onClick={handleFinalSubmit} style={{ ...s.btnPrimary, width: '100%', opacity: teamData.terms ? 1 : 0.5 }}>TUMA MAOMBI</button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(34,197,94,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Check color="#22c55e" size={32} /></div>
                <h2>Imepokelewa!</h2>
                <p style={{ color: '#94a3b8' }}>Tutawasiliana nawe hivi punde.</p>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#a3e635', fontWeight: 'bold', marginTop: '16px', cursor: 'pointer' }}>FUNGA</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default App;