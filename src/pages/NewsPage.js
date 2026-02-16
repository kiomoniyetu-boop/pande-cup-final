import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import SeasonSwitcher from '../components/SeasonSwitcher';
import { 
  Menu, X, Calendar, ArrowRight, Clock, MapPin, 
  Phone, Mail, Instagram, Facebook, Youtube, Filter
} from 'lucide-react';

const SPACE_ID = 'ax6wvfd84net';
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/",
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('sw-TZ', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState('all');
  const [activeSeason, setActiveSeason] = useState('2026');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=news&include=2&order=-fields.date`;
        const response = await fetch(url);
        const data = await response.json();

        const fetchedNews = data.items.map(item => {
          const getAsset = (assetId) => {
            const asset = data.includes?.Asset?.find(a => a.sys.id === assetId);
            return asset ? `https:${asset.fields.file.url}` : null;
          };

          return {
            id: item.sys.id,
            title: item.fields.Title || item.fields.title || 'Habari',
            date: item.fields.date || '',
            excerpt: item.fields.Excerpt || item.fields.excerpt || '',
            image: getAsset(item.fields.Image?.sys?.id || item.fields.image?.sys?.id) || 'https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=800',
            location: (item.fields.Location || item.fields.location || '').toLowerCase(),
            season: item.fields.Season || item.fields.season || '2026'
          };
        });

        setNews(fetchedNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const locationMatch = activeLocation === 'all' || item.location.includes(activeLocation);
    const seasonYear = String(item.season).match(/(\d{4})/)?.[1] || item.season;
    const activeYear = String(activeSeason).match(/(\d{4})/)?.[1] || activeSeason;
    const seasonMatch = seasonYear === activeYear;
    return locationMatch && seasonMatch;
  });

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&family=Inter:wght@400;600;700;800;900&display=swap');
          body { margin: 0; padding: 0; background: #0f172a; }
          .nav-glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(15,23,42,0.85) !important; }
          .nav-link { color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; transition: color 0.2s; }
          .nav-link:hover { color: #a3e635; }
          .desktop-only { display: flex; gap: 24px; align-items: center; }
          .news-card { 
            background: rgba(30,41,59,0.5); 
            backdrop-filter: blur(16px); 
            border: 1px solid rgba(255,255,255,0.08); 
            border-radius: 20px; 
            overflow: hidden; 
            transition: all 0.3s;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          .news-card:hover { 
            transform: translateY(-6px); 
            box-shadow: 0 20px 60px -10px rgba(163,230,53,0.3); 
            border-color: rgba(163,230,53,0.4);
          }
          .news-card img {
            aspect-ratio: 16/9;
            object-fit: cover;
            transition: transform 0.4s;
          }
          .news-card:hover img { transform: scale(1.05); }
          .read-more-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 20px;
            background: rgba(163,230,53,0.1);
            border: 1px solid rgba(163,230,53,0.3);
            color: #a3e635;
            border-radius: 50px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s;
          }
          .read-more-btn:hover {
            background: #a3e635;
            color: #020617;
            border-color: #a3e635;
            transform: translateX(4px);
          }
          .loading-spinner { 
            border: 4px solid rgba(255,255,255,0.1); 
            border-left-color: #a3e635; 
            border-radius: 50%; 
            width: 50px; 
            height: 50px; 
            animation: spin 1s linear infinite; 
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @media (max-width: 768px) { .desktop-only { display: none !important; } }
        `}
      </style>

      <Helmet>
        <title>Habari & Matukio - Pande Cup</title>
        <meta name="description" content="Soma habari zote za Pande Cup - matokeo, michezo, na matukio." />
      </Helmet>

      <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'Inter, sans-serif' }}>
        {/* TOP BAR */}
        <div style={{ backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <SeasonSwitcher activeSeason={activeSeason} setActiveSeason={setActiveSeason} />
        </div>

        {/* NAVIGATION */}
        <nav className="nav-glass" style={{ padding: '10px 0', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={LOGO_PATH} alt="Logo" style={{ height: isMobile ? '35px' : '45px', filter: 'drop-shadow(0 0 8px rgba(163,230,53,0.3))' }} />
            </Link>
            <div className="desktop-only">
              <Link to="/" className="nav-link">Nyumbani</Link>
              <Link to="/news" className="nav-link" style={{ color: '#a3e635' }}>Habari</Link>
              <Link to="/fixtures" className="nav-link">Ratiba</Link>
              <Link to="/pctv" className="nav-link">PC TV</Link>
              <Link to="/sponsors" className="nav-link">Wadhamini</Link>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div style={{ position: 'fixed', top: 0, right: 0, width: '85%', height: '100vh', backgroundColor: '#0f172a', zIndex: 200, padding: '80px 24px 32px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>Nyumbani</Link>
              <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ color: '#a3e635', fontSize: '18px' }}>Habari</Link>
              <Link to="/fixtures" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>Ratiba</Link>
            </div>
          </div>
        )}

        {/* HEADER */}
        <header style={{ padding: isMobile ? '60px 20px 40px' : '80px 24px 60px', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(163,230,53,0.05), transparent)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h1 style={{ fontSize: isMobile ? 'clamp(2rem, 6vw, 3rem)' : 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', margin: '0 0 16px', fontFamily: 'Oswald, sans-serif', letterSpacing: '-0.02em' }}>
            HABARI & <span style={{ color: '#a3e635' }}>MATUKIO</span>
          </h1>
          <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 40px', fontSize: '15px', lineHeight: '1.6' }}>
            Fuatilia habari zote za Pande Cup - matokeo, michezo, na matukio muhimu.
          </p>

          {/* LOCATION FILTER */}
          <div style={{ display: 'inline-flex', gap: '12px', padding: '8px 16px', borderRadius: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {['all', 'kiomoni', 'goba'].map(loc => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '50px',
                  border: '1px solid',
                  borderColor: activeLocation === loc ? '#a3e635' : 'transparent',
                  background: activeLocation === loc ? '#a3e635' : 'transparent',
                  color: activeLocation === loc ? 'black' : 'white',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s'
                }}
              >
                {loc === 'all' ? 'ZOTE' : loc === 'kiomoni' ? 'TANGA' : 'DAR'}
              </button>
            ))}
          </div>
        </header>

        {/* NEWS GRID */}
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '40px 16px 80px' : '60px 24px 100px' }}>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0' }}>
              <div className="loading-spinner"></div>
              <p style={{ marginTop: '20px', color: '#94a3b8', fontWeight: 'bold' }}>Inapakua habari...</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: isMobile ? '24px' : '32px' }}>
              {filteredNews.map((article) => (
                <article key={article.id} className="news-card">
                  <div style={{ overflow: 'hidden', height: '220px' }}>
                    <img 
                      src={article.image} 
                      alt={article.title}
                      style={{ width: '100%', height: '100%', display: 'block' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=800'; }}
                    />
                  </div>
                  
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#a3e635', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={12} /> {formatDate(article.date)}
                      </span>
                      {article.location && (
                        <span style={{ padding: '3px 10px', background: 'rgba(163,230,53,0.1)', borderRadius: '50px', fontSize: '10px' }}>
                          {article.location === 'kiomoni' ? 'TANGA' : article.location === 'goba' ? 'DAR' : article.location.toUpperCase()}
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontSize: '20px', fontWeight: '800', lineHeight: '1.3', margin: 0, fontFamily: 'Oswald, sans-serif', letterSpacing: '-0.3px', flex: 1 }}>
                      {article.title}
                    </h2>

                    <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.excerpt}
                    </p>

                    <Link to={`/news/${article.id}`} className="read-more-btn">
                      SOMA ZAIDI <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: '#64748b' }}>
              <p style={{ fontSize: '18px' }}>😔 Hakuna habari kwa msimu na eneo ulilochagua.</p>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(163,230,53,0.1)', padding: isMobile ? '40px 20px 24px' : '50px 24px 30px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: isMobile ? '24px' : '32px' }}>
            <div>
              <img src={LOGO_PATH} alt="Logo" style={{ height: '40px', marginBottom: '16px', filter: 'drop-shadow(0 0 8px rgba(163,230,53,0.3))' }}/>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', maxWidth: '300px' }}>
                Zaidi ya soka, hii ni harakati. Ligi Moja, Upendo Mmoja.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><Instagram size={20} /></a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><Facebook size={20} /></a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><TikTokIcon size={20} /></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><Youtube size={20} /></a>
              </div>
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
          <div style={{ textAlign: 'center', marginTop: isMobile ? '30px' : '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '12px' }}>
            © 2026 Pande Cup. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default NewsPage;