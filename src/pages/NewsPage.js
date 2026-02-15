import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet"; 
import { Link } from 'react-router-dom';
import SeasonSwitcher from '../components/SeasonSwitcher';
import { 
  Menu, X, Newspaper, ChevronRight, Share2, MapPin, Phone, Mail 
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";

const formatDate = (dateString) => {
  if (!dateString) return "Tarehe";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; 
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const NewsPage = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('2026'); 
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- EFFECTS ---
  useEffect(() => { 
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.scrollTo(0, 0); // Hakikisha page inaanza juu inavyofunguka
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- FETCHING DATA ONLY FOR NEWS ---
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=news&include=1&locale=en-US`;
        const res = await fetch(baseUrl);
        const data = await res.json();

        const fetchedNews = data.items ? data.items.map(item => {
             const getNewsImage = (id) => {
                if (!id || !data.includes || !data.includes.Asset) return null;
                const asset = data.includes.Asset.find(a => a.sys.id === id);
                return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
             };
             
             // 🔥 ULINZI WA KIBABE: Tunasoma Field ID iwe kubwa au ndogo! 🔥
             const f = item.fields;
             
             return {
                id: item.sys.id, 
                date: String(f.date || f.Date || ""), 
                title: String(f.title || f.Title || "Habari Mpya"),
                excerpt: String(f.excerpt || f.Excerpt || "Soma zaidi..."),
                image: getNewsImage(f.image?.sys?.id || f.Image?.sys?.id) || "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=800",
                location: String(f.location || f.Location || "").toLowerCase(),
                season: String(f.season || f.Season || "2026")
             };
        }) : [];

        setNewsData(fetchedNews);
      } catch (error) { 
        console.error("CMS Error fetching news:", error); 
      } finally { 
        setIsLoading(false); 
      }
    };
    fetchNews();
  }, []);

  const handleNewsShare = async (newsItem) => {
    const shareText = `${newsItem.title} - Pande Cup`;
    const shareUrl = `${window.location.origin}/news/${newsItem.id}`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Pande Cup', text: shareText, url: shareUrl }); } 
      catch (err) { console.error('Web Share error:', err); }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => alert('Link copied!')).catch(err => console.error('Copy failed:', err));
    }
  };

  // --- SMART FILTER LOGIC (HABARI ZOTE ZINAONEKANA, CHUJIO LA LOCATION TU) ---
  const filteredNews = newsData.filter(item => {
      const loc = item.location ? String(item.location).toLowerCase() : ''; 
      
      // Tunachuja Mkoa tu (Location), lakini tunaruhusu habari za "Global" (Zisizo na Mkoa) kuonekana kote
      const isTanga = activeLocation === 'kiomoni' && (loc.includes('kiomoni') || loc.includes('tanga') || loc === '');
      const isDar = activeLocation === 'goba' && (loc.includes('goba') || loc.includes('dar') || loc === '');
      
      return activeLocation === 'kiomoni' ? isTanga : isDar;
  }).sort((a, b) => {
      // Panga kwa tarehe, mpya iwe juu
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) return dateB - dateA; 
      return 0; 
  });

  const styles = {
    container: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative', overflowX: 'hidden' },
    topBar: { backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    nav: { background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 0', position: 'sticky', top: 0, zIndex: 100, width: '100%' },
    navContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', width: '100%' },
    navLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', transition: 'color 0.2s', padding: '8px', display: 'inline-block' },
    pageHeader: { padding: '60px 24px', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(163, 230, 53, 0.05), transparent)', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    mainTitle: { fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', margin: '0 0 16px', fontFamily: 'Oswald, sans-serif' },
    locationButton: { padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', border: '1px solid' },
    newsCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', height: '100%' }
  };

  return (
    <>
      <style>
        {`
          * { box-sizing: border-box; } 
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
          body { margin: 0; padding: 0; background: #0f172a; }
          .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px -10px rgba(163, 230, 53, 0.2); border-color: rgba(163, 230, 53, 0.3) !important; }
          .nav-glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(15, 23, 42, 0.85) !important; }
          .desktop-only a { position: relative; overflow: visible; }
          .desktop-only a:hover { color: #a3e635 !important; }
          .desktop-only a::after { content: ''; display: block; position: absolute; left: 50%; bottom: 2px; width: 0; height: 2px; background: #a3e635; border-radius: 2px; transition: width 0.25s, left 0.25s; }
          .desktop-only a:hover::after { width: 70%; left: 15%; }
          .loading-spinner { border: 4px solid rgba(255,255,255,0.1); border-left-color: #a3e635; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @media (max-width: 768px) { .desktop-only { display: none !important; } }
        `}
      </style>

      <Helmet>
        <title>Habari na Matukio - Pande Cup</title>
        <meta name="description" content="Pata habari zote mpya, matukio, na update za ligi ya Pande Cup." />
      </Helmet>

      <div style={styles.container}>
        {/* TOP BAR */}
        <div style={styles.topBar}>
          <SeasonSwitcher activeSeason={activeSeason} setActiveSeason={setActiveSeason} />
        </div>

        {/* NAVIGATION */}
        <nav style={styles.nav} className="nav-glass">
          <div style={styles.navContent}>
            <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer', zIndex: 10 }}>
              <img src={LOGO_PATH} alt="Pande Cup Logo" style={{ height: isMobile ? '40px' : '50px', filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.3))' }} />
            </Link>
            
            <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Link to="/" style={styles.navLink}>Nyumbani</Link>
              <Link to="/news" style={{...styles.navLink, color: '#a3e635'}}>Habari</Link>
              <Link to="/fixtures" style={styles.navLink}>Ratiba</Link>
              <Link to="/pctv" style={styles.navLink}>PC TV</Link>
              <Link to="/sponsors" style={styles.navLink}>Wadhamini</Link>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', display: isMobile ? 'block' : 'none' }}>
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: '85%', height: '100vh', backgroundColor: '#0f172a', zIndex: 200, padding: '32px 24px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Nyumbani</Link>
              <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Habari & Updates</Link>
              <Link to="/fixtures" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Ratiba & Matokeo</Link>
            </div>
          </div>
        )}

        {/* PAGE HEADER & FILTERS */}
        <header style={styles.pageHeader}>
          <h1 style={styles.mainTitle}>HABARI <span style={{ color: '#a3e635' }}>NA MATUKIO</span></h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 30px' }}>Pata taarifa zote za uhakika zinazoendelea ndani na nje ya viwanja vya Pande Cup.</p>
          
          <div style={{ display: 'inline-flex', justifyContent: 'center', gap: '16px', padding: '8px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setActiveLocation('kiomoni')} style={{ ...styles.locationButton, borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', color: activeLocation === 'kiomoni' ? 'black' : 'rgba(255,255,255,0.85)' }}>TANGA</button>
            <button onClick={() => setActiveLocation('goba')} style={{ ...styles.locationButton, borderColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', color: activeLocation === 'goba' ? 'black' : 'rgba(255,255,255,0.85)' }}>DAR</button>
          </div>
        </header>

        {/* NEWS GRID */}
        <main style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto', minHeight: '40vh' }}>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}><div className="loading-spinner"></div><p style={{ color: '#94a3b8', marginTop: '16px' }}>Inapakua habari...</p></div>
          ) : filteredNews.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                {filteredNews.map((item, idx) => (
                    <div key={idx} className="hover-card" style={styles.newsCard}>
                        <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                            <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.title} />
                            {item.season && item.season !== 'undefined' && (
                                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', padding: '6px 12px', borderRadius: '50px', color: '#a3e635', fontSize: '11px', fontWeight: 'bold' }}>MSIMU {item.season}</div>
                            )}
                        </div>
                        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '12px', color: '#a3e635', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}><Newspaper size={14}/> {formatDate(item.date)}</span>
                            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 12px', lineHeight: '1.4', fontFamily: 'Oswald, sans-serif' }}>{item.title}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: '0 0 24px', flex: 1 }}>{item.excerpt}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                              
                              <Link to={`/news/${item.id}`} style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                SOMA ZAIDI <ChevronRight size={16} color="#a3e635" />
                              </Link>
                              
                              <button onClick={() => handleNewsShare(item)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}>
                                <Share2 size={18} />
                              </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}><p>Hakuna habari zilizopakiwa kwa mkoa huu bado.</p></div>
          )}
        </main>

        {/* FOOTER ILE ILE YA KIBABE */}
        <footer style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(163, 230, 53, 0.1)', padding: '50px 24px 30px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            <div>
              <img src={LOGO_PATH} alt="Logo" style={{ height: '40px', marginBottom: '16px', filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.3))' }}/>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', maxWidth: '300px' }}>Zaidi ya soka, hii ni harakati. Tunatoa "Pande" kwa vipaji vya mtaani kuonekana. Ligi Moja, Upendo Mmoja.</p>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '16px' }}>Mawasiliano</h4>
              <div style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{display: 'flex', gap: '8px'}}><Phone size={16} color="#a3e635"/> +255 653 292 935</span>
                <span style={{display: 'flex', gap: '8px'}}><Mail size={16} color="#a3e635"/> pandecup2023@gmail.com</span>
                <span style={{display: 'flex', gap: '8px'}}><MapPin size={16} color="#a3e635"/> The Root, Kiomoni & Goba</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '12px' }}>
            © 2026 Pande Cup. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default NewsPage;