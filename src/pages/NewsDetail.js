import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { 
  ArrowLeft, Calendar, Share2, Menu, X, 
  MapPin, Phone, Mail, Instagram, Facebook, Youtube 
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

// ✅ PROFESSIONAL RICH TEXT RENDERING OPTIONS
const richTextOptions = (includes) => ({
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p style={{ 
        marginBottom: '28px', 
        color: '#cbd5e1', 
        fontSize: '18px', 
        lineHeight: '1.9',
        textAlign: 'justify'
      }}>{children}</p>
    ),
    
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 style={{ 
        fontSize: '38px', 
        fontWeight: '900', 
        marginTop: '50px', 
        marginBottom: '24px', 
        color: 'white',
        fontFamily: 'Oswald, sans-serif',
        letterSpacing: '-0.5px',
        lineHeight: '1.2'
      }}>{children}</h1>
    ),
    
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 style={{ 
        fontSize: '30px', 
        fontWeight: '800', 
        marginTop: '44px', 
        marginBottom: '20px', 
        color: '#a3e635',
        fontFamily: 'Oswald, sans-serif',
        letterSpacing: '-0.3px',
        lineHeight: '1.3'
      }}>{children}</h2>
    ),
    
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        marginTop: '36px', 
        marginBottom: '16px', 
        color: 'white',
        fontFamily: 'Oswald, sans-serif',
        letterSpacing: '0px'
      }}>{children}</h3>
    ),
    
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul style={{ 
        marginBottom: '28px', 
        paddingLeft: '28px',
        color: '#cbd5e1',
        fontSize: '17px',
        lineHeight: '1.8'
      }}>{children}</ul>
    ),
    
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol style={{ 
        marginBottom: '28px', 
        paddingLeft: '28px',
        color: '#cbd5e1',
        fontSize: '17px',
        lineHeight: '1.8'
      }}>{children}</ol>
    ),
    
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li style={{ 
        marginBottom: '12px',
        paddingLeft: '8px'
      }}>{children}</li>
    ),
    
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote style={{ 
        borderLeft: '5px solid #a3e635', 
        paddingLeft: '28px',
        paddingRight: '28px',
        marginLeft: '0',
        marginRight: '0',
        marginBottom: '32px',
        marginTop: '32px',
        fontStyle: 'italic', 
        color: '#94a3b8',
        fontSize: '20px',
        lineHeight: '1.7',
        background: 'rgba(163, 230, 53, 0.05)',
        padding: '24px 28px',
        borderRadius: '8px'
      }}>{children}</blockquote>
    ),
    
    // ✅ EMBEDDED IMAGES (Picha Ndani ya Article!)
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const assetId = node.data?.target?.sys?.id;
      if (!assetId || !includes?.Asset) return null;
      
      const asset = includes.Asset.find(a => a.sys.id === assetId);
      if (!asset?.fields?.file?.url) return null;
      
      const url = asset.fields.file.url.startsWith('http') 
        ? asset.fields.file.url 
        : `https:${asset.fields.file.url}`;
      
      const title = asset.fields.title || asset.fields.description || '';
      
      return (
        <figure style={{ 
          margin: '40px 0', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)', 
          border: '1px solid rgba(255,255,255,0.05)' 
        }}>
          <img 
            src={url} 
            alt={title}
            style={{ 
              width: '100%', 
              height: 'auto',
              display: 'block' 
            }} 
          />
          {title && (
            <figcaption style={{ 
              padding: '16px 20px', 
              background: 'rgba(0,0,0,0.4)',
              color: '#94a3b8', 
              fontSize: '14px',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              {title}
            </figcaption>
          )}
        </figure>
      );
    },
    
    // ✅ HYPERLINKS
    [INLINES.HYPERLINK]: (node, children) => (
      <a 
        href={node.data.uri} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ 
          color: '#a3e635', 
          textDecoration: 'underline',
          fontWeight: '600',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >{children}</a>
    ),
  },
});

// ✅ FALLBACK: Plain Text Rendering (for old articles)
const renderPlainTextBody = (text) => {
  if (!text || typeof text !== 'string') {
    return <p style={{ color: '#64748b', fontStyle: 'italic' }}>Maudhui hayapatikani.</p>;
  }
  
  return text.split('\n\n').filter(para => para.trim()).map((para, idx) => (
    <p key={idx} style={{ 
      marginBottom: '28px', 
      color: '#cbd5e1', 
      fontSize: '18px', 
      lineHeight: '1.9',
      textAlign: 'justify'
    }}>
      {para.split('\n').map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </p>
  ));
};

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => { 
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('resize', checkMobile);
  }, [id]);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      try {
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${id}?access_token=${ACCESS_TOKEN}&include=2`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (!data.fields) {
          throw new Error("Habari haijapatikana");
        }

        // Asset helper
        const getAsset = (assetId) => {
            const asset = data.includes?.Asset?.find(a => a.sys.id === assetId);
            return asset ? `https:${asset.fields.file.url}` : null;
        };

        // ✅ SMART: Use Rich Text if available, fallback to Plain Text
        const bodyContent = data.fields.bodyRichText || data.fields.Body || data.fields.body || '';
        const isRichText = !!data.fields.bodyRichText; // Check if Rich Text exists

        setArticle({
          title: data.fields.Title || data.fields.title || 'Habari',
          date: data.fields.date || '',
          excerpt: data.fields.Excerpt || data.fields.excerpt || '',
          body: bodyContent,
          isRichText: isRichText, // Flag to know which renderer to use
          location: data.fields.Location || data.fields.location || '',
          season: data.fields.Season || data.fields.season || '2026',
          featuredImage: getAsset(data.fields.Image?.sys?.id || data.fields.image?.sys?.id) || "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600",
          includes: data.includes
        });
      } catch (e) {
        console.error("Error fetching article:", e);
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  const handleShare = () => {
    const shareText = `${article.title} - Pande Cup\nSoma zaidi hapa: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: 'Pande Cup News', text: article.title, url: window.location.href }).catch(console.error);
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    }
  };

  if (isLoading) {
    return (
      <div style={{ background: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ border: '4px solid rgba(255,255,255,0.1)', borderLeftColor: '#a3e635', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }} />
         <p style={{ marginTop: '20px', color: '#94a3b8', fontWeight: 'bold', letterSpacing: '1px' }}>Inapakua habari...</p>
         <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!article && !isLoading) {
    return (
      <div style={{ background: '#0f172a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#ef4444', fontSize: '32px', marginBottom: '16px' }}>Habari Haijapatikana</h1>
        <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Inaonekana habari unayotafuta imeondolewa au link ina shida.</p>
        <button onClick={() => navigate('/news')} style={{ padding: '12px 32px', background: '#a3e635', color: '#0f172a', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} /> KURUDI KWENYE HABARI
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: '"Inter", sans-serif', overflowX: 'hidden' }}>
      
      <Helmet>
        <title>{article.title} - Pande Cup</title>
        <meta name="description" content={article.excerpt || "Soma habari kamili kutoka Pande Cup."} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt || "Soma habari kamili kutoka Pande Cup."} />
        <meta property="og:image" content={article.featuredImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
      </Helmet>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&family=Inter:wght@400;600;800&display=swap');
          .nav-glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(15, 23, 42, 0.85) !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .nav-link { color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; transition: color 0.2s; position: relative; }
          .nav-link:hover { color: #a3e635; }
          .desktop-only { display: flex; gap: 24px; align-items: center; }
          .back-btn-float:hover { transform: translateX(-5px); background: #84cc16 !important; }
          
          /* Professional Article Styling */
          .article-body strong, .article-body b { color: white; font-weight: 700; }
          .article-body em, .article-body i { font-style: italic; color: #e2e8f0; }
          .article-body code { background: rgba(163,230,53,0.1); padding: 2px 6px; border-radius: 4px; color: #a3e635; font-size: 16px; }
          .article-body hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 40px 0; }
          
          @media (max-width: 768px) { 
            .desktop-only { display: none !important; } 
            .article-card { margin-top: -40px !important; padding: 24px 20px !important; border-radius: 20px 20px 0 0 !important; }
            .hero-img-container { height: 45vh !important; }
          }
        `}
      </style>

      {/* NAVIGATION */}
      <nav className="nav-glass" style={{ padding: '10px 0', position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
          <Link to="/" style={{ textDecoration: 'none', zIndex: 10 }}>
            <img src={LOGO_PATH} alt="Pande Cup Logo" style={{ height: isMobile ? '35px' : '45px', filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.3))' }} />
          </Link>
          <div className="desktop-only">
            <Link to="/" className="nav-link">Nyumbani</Link>
            <Link to="/news" className="nav-link" style={{ color: '#a3e635' }}>Habari</Link>
            <Link to="/fixtures" className="nav-link">Ratiba</Link>
            <Link to="/pctv" className="nav-link">PC TV</Link>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', display: isMobile ? 'block' : 'none', cursor: 'pointer' }}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, width: '85%', height: '100vh', backgroundColor: '#0f172a', zIndex: 90, padding: '80px 24px 32px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>Nyumbani</Link>
            <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ color: '#a3e635', fontSize: '18px' }}>Habari & Updates</Link>
            <Link to="/fixtures" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>Ratiba & Matokeo</Link>
            <Link to="/pctv" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>PC TV</Link>
          </div>
        </div>
      )}

      {/* HERO IMAGE */}
      <div className="hero-img-container" style={{ position: 'relative', height: '65vh', width: '100%', marginTop: '60px' }}>
        <img src={article.featuredImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600'; }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.6) 60%, rgba(15,23,42,1) 100%)' }} />
        
        <button onClick={() => navigate('/news')} className="back-btn-float" style={{ position: 'absolute', top: '30px', left: isMobile ? '16px' : '40px', background: 'rgba(163,230,53,0.9)', color: '#020617', padding: '10px 20px', borderRadius: '50px', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '12px', zIndex: 10, cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <ArrowLeft size={16} /> HABARI ZOTE
        </button>
      </div>

      {/* ARTICLE BODY */}
      <main style={{ maxWidth: '850px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 5, paddingBottom: '80px' }}>
        <div className="article-card" style={{ background: 'rgba(30, 41, 59, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', padding: isMobile ? '30px 24px' : '50px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 -20px 40px rgba(0,0,0,0.5)', marginTop: '-120px' }}>
          
          <div style={{ color: '#a3e635', fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={14}/> {new Date(article.date).toLocaleDateString('sw-TZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ background: 'rgba(163,230,53,0.1)', padding: '4px 10px', borderRadius: '50px' }}>
              Msimu {article.season}
            </span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: '900', lineHeight: '1.2', marginBottom: '32px', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            {article.title}
          </h1>
          
          {/* ✅ SMART RENDERING: Rich Text OR Plain Text */}
          <div className="article-body">
            {article.isRichText ? (
              // NEW: Rich Text with embedded images
              documentToReactComponents(article.body, richTextOptions(article.includes))
            ) : (
              // OLD: Plain text fallback
              renderPlainTextBody(article.body)
            )}
          </div>

          <div style={{ marginTop: '50px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleShare} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: '800', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }} onMouseEnter={e => { e.currentTarget.style.background = '#a3e635'; e.currentTarget.style.color = '#020617'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'white'; }}>
              <Share2 size={18} /> SAMBAZA HABARI HII
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(163, 230, 53, 0.1)', padding: '50px 24px 30px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          <div>
            <img src={LOGO_PATH} alt="Logo" style={{ height: '40px', marginBottom: '16px', filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.3))' }}/>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', maxWidth: '300px' }}>Zaidi ya soka, hii ni harakati. Tunatoa "Pande" kwa vipaji vya mtaani kuonekana. Ligi Moja, Upendo Mmoja.</p>
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
        <div style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '12px' }}>
          © 2026 Pande Cup. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default NewsDetail;