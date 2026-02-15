import React, { useEffect, useState } from 'react';
import { X, Play, MapPin, Phone, Mail, Instagram, Facebook, Youtube, ChevronRight, Share2, Clock, Calendar, Search, Filter, Video, ExternalLink } from 'lucide-react';

const SPACE_ID = 'ax6wvfd84net';
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';

// --- COMPONENTS NDOGO ---
const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/",
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

const PcTvPage = () => {
  const [videos, setVideos] = useState([]);
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('2026');
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // --- FETCHING DATA ---
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US&content_type=video&include=1`;
        const res = await fetch(baseUrl);
        if (!res.ok) throw new Error('Failed to fetch videos');
        const json = await res.json();

        const getAssetUrl = (id, includes) => {
          if (!id || !includes || !includes.Asset) return null;
          const asset = includes.Asset.find(a => a.sys.id === id);
          return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
        };

        const mapped = (json.items || []).map(item => ({
          id: item.sys.id,
          title: item.fields.title || 'Pande Cup TV',
          location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
          season: item.fields.season || '2026',
          thumbnail: getAssetUrl(item.fields.thumbnail?.sys?.id, json.includes) || null,
          videoUrl: item.fields.videoUrl || '',
          date: item.sys.createdAt
        }));

        setVideos(mapped.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (err) {
        console.warn('PC TV fetch error', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // --- DETECT VIDEO TYPE ---
  const getVideoType = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
    return 'other';
  };

  // --- OPEN TIKTOK DIRECTLY ---
  const handleVideoClick = (video) => {
    const type = getVideoType(video.videoUrl);
    
    if (type === 'tiktok') {
      // Open TikTok directly in app or browser
      window.open(video.videoUrl, '_blank');
    } else {
      setSelected(video);
    }
  };

  // --- FILTER LOGIC ---
  const filtered = videos.filter(v => {
    const vLocation = (v.location || 'kiomoni').toLowerCase();
    const isLocationMatch = vLocation.includes(activeLocation);
    
    const vSeasonRaw = v.season || '2026';
    const vYearMatch = vSeasonRaw.match(/(\d{4})/);
    const vYear = vYearMatch ? vYearMatch[1] : vSeasonRaw.trim();
    const activeYearMatch = activeSeason.match(/(\d{4})/);
    const activeYear = activeYearMatch ? activeYearMatch[1] : activeSeason.trim();
    
    const isSearchMatch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return isLocationMatch && vYear === activeYear && isSearchMatch;
  });

  // --- RESPONSIVE STYLES (OPTIMIZED) ---
  const styles = {
    container: { 
      minHeight: '100vh', 
      background: '#020617', 
      color: 'white', 
      fontFamily: '"Inter", sans-serif', 
      overflowX: 'hidden' 
    },
    nav: { 
      background: 'rgba(2, 6, 23, 0.9)', 
      backdropFilter: 'blur(20px)', 
      borderBottom: '1px solid rgba(163, 230, 53, 0.1)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100 
    },
    logoText: { 
      fontFamily: '"Oswald", sans-serif', 
      fontSize: 'clamp(20px, 4vw, 22px)', 
      fontWeight: '900', 
      color: 'white', 
      textDecoration: 'none', 
      letterSpacing: '-0.5px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px' 
    },
    pill: { 
      padding: 'clamp(6px, 2vw, 8px) clamp(14px, 3vw, 18px)', 
      borderRadius: '50px', 
      fontSize: 'clamp(11px, 2vw, 13px)', 
      fontWeight: 'bold', 
      cursor: 'pointer', 
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
      border: '1px solid transparent',
      whiteSpace: 'nowrap'
    },
    card: { 
      position: 'relative', 
      borderRadius: 'clamp(12px, 3vw, 16px)', 
      overflow: 'hidden', 
      background: 'rgba(255,255,255,0.02)', 
      border: '1px solid rgba(255,255,255,0.05)', 
      cursor: 'pointer', 
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
    },
    footer: { 
      background: '#020617', 
      borderTop: '1px solid rgba(163, 230, 53, 0.1)', 
      padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 24px) clamp(24px, 5vw, 40px)' 
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&family=Inter:wght@400;600;700;800&display=swap');
        
        * { box-sizing: border-box; }
        
        .video-card {
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        
        .video-card:hover {
          transform: translateY(-6px);
          border-color: rgba(163, 230, 53, 0.3) !important;
          box-shadow: 0 16px 32px -12px rgba(0, 0, 0, 0.4), 0 0 16px rgba(163, 230, 53, 0.1);
        }
        
        .video-card:hover .play-btn {
          transform: scale(1.15);
          background: #a3e635 !important;
        }

        .video-card:hover img {
          transform: scale(1.08);
          opacity: 1 !important;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); border-radius: 10px; }
        
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }

        /* RESPONSIVE BREAKPOINTS */
        @media (max-width: 768px) {
          .mobile-hide { display: none !important; }
          .mobile-stack { flex-direction: column !important; }
          .mobile-center { text-align: center !important; }
        }

        @media (min-width: 769px) and (max-width: 1200px) {
          .tablet-adjust { padding: 32px 20px !important; }
        }

        /* SMOOTH ANIMATIONS */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* --- NAVIGATION (OPTIMIZED) --- */}
      <nav style={styles.nav}>
        <div style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: '12px'
        }}>
          <a href="/" style={styles.logoText}>
            <div style={{ 
              background: '#a3e635', 
              borderRadius: '6px', 
              padding: 'clamp(3px, 1vw, 4px) clamp(6px, 2vw, 8px)', 
              color: '#020617',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: '900'
            }}>PC</div>
            <span>TV</span>
          </a>

          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="mobile-hide" style={{ position: 'relative' }}>
              <Search size={16} style={{ 
                position: 'absolute', 
                left: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#64748b' 
              }} />
              <input 
                type="text" 
                placeholder="Tafuta..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: '50px', 
                  padding: '8px 14px 8px 36px', 
                  color: 'white', 
                  outline: 'none', 
                  width: 'clamp(140px, 20vw, 200px)', 
                  fontSize: 'clamp(11px, 2vw, 13px)' 
                }}
              />
            </div>
            <a href="/" style={{ 
              ...styles.pill, 
              background: 'rgba(255,255,255,0.05)', 
              color: 'white', 
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center'
            }}>HOME</a>
          </div>
        </div>
      </nav>

      {/* --- HERO / FILTERS (OPTIMIZED) --- */}
      <div style={{ 
        background: 'linear-gradient(to bottom, rgba(163, 230, 53, 0.05), transparent)', 
        padding: 'clamp(32px, 8vw, 60px) clamp(16px, 4vw, 24px) clamp(24px, 6vw, 40px)' 
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: '"Oswald", sans-serif', 
            fontSize: 'clamp(2rem, 8vw, 4rem)', 
            fontWeight: '900', 
            textTransform: 'uppercase', 
            lineHeight: '1', 
            marginBottom: 'clamp(16px, 4vw, 24px)', 
            fontStyle: 'italic',
            letterSpacing: '-1px'
          }}>
            NIPE <span style={{ color: '#a3e635' }}>PANDE</span> TV
          </h1>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 'clamp(8px, 2vw, 12px)', 
            flexWrap: 'wrap', 
            marginBottom: 'clamp(24px, 6vw, 40px)' 
          }}>
            {/* Location Pills */}
            <div style={{ 
              display: 'flex', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '3px', 
              borderRadius: '50px', 
              border: '1px solid rgba(255,255,255,0.1)' 
            }}>
              <button 
                onClick={() => setActiveLocation('kiomoni')}
                style={{ 
                  ...styles.pill, 
                  background: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', 
                  color: activeLocation === 'kiomoni' ? '#020617' : '#94a3b8',
                  border: 'none'
                }}
              >
                TANGA
              </button>
              <button 
                onClick={() => setActiveLocation('goba')}
                style={{ 
                  ...styles.pill, 
                  background: activeLocation === 'goba' ? '#a3e635' : 'transparent', 
                  color: activeLocation === 'goba' ? '#020617' : '#94a3b8',
                  border: 'none'
                }}
              >
                DAR
              </button>
            </div>

            {/* Season Pills */}
            <div style={{ 
              display: 'flex', 
              background: 'rgba(255,255,255,0.05)', 
              padding: '3px', 
              borderRadius: '50px', 
              border: '1px solid rgba(255,255,255,0.1)' 
            }}>
              {['2025', '2026'].map(year => (
                <button 
                  key={year}
                  onClick={() => setActiveSeason(year)}
                  style={{ 
                    ...styles.pill, 
                    background: activeSeason === year ? '#a3e635' : 'transparent', 
                    color: activeSeason === year ? '#020617' : '#94a3b8',
                    border: 'none'
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- VIDEO GRID (OPTIMIZED) --- */}
      <main style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 clamp(16px, 4vw, 24px) clamp(60px, 12vw, 100px)' 
      }}>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 'clamp(60px, 12vw, 100px) 0' }}>
            <div style={{ 
              width: 'clamp(32px, 6vw, 40px)', 
              height: 'clamp(32px, 6vw, 40px)', 
              border: '3px solid rgba(163, 230, 53, 0.2)', 
              borderTopColor: '#a3e635', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite', 
              margin: '0 auto clamp(12px, 3vw, 20px)' 
            }}></div>
            <p style={{ 
              color: '#64748b', 
              fontWeight: 'bold', 
              letterSpacing: '1px',
              fontSize: 'clamp(11px, 2vw, 13px)'
            }}>INAPAKUA...</p>
          </div>
        ) : (
          <>
            {/* FEATURED VIDEO */}
            {filtered.length > 0 && !searchQuery && (
              <div style={{ marginBottom: 'clamp(32px, 8vw, 48px)' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'clamp(8px, 2vw, 12px)', 
                  marginBottom: 'clamp(16px, 4vw, 24px)' 
                }}>
                  <div style={{ 
                    width: 'clamp(8px, 2vw, 12px)', 
                    height: 'clamp(8px, 2vw, 12px)', 
                    background: '#a3e635', 
                    borderRadius: '50%', 
                    boxShadow: '0 0 10px #a3e635' 
                  }}></div>
                  <h2 style={{ 
                    fontSize: 'clamp(14px, 3vw, 18px)', 
                    fontWeight: '800', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    margin: 0
                  }}>Video Mpya</h2>
                </div>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr', 
                  gap: 'clamp(20px, 4vw, 32px)' 
                }}>
                  {filtered.slice(0, 1).map(v => {
                    const videoType = getVideoType(v.videoUrl);
                    const isTikTok = videoType === 'tiktok';
                    
                    return (
                      <div 
                        key={v.id} 
                        style={{ 
                          ...styles.card, 
                          height: 'clamp(280px, 45vh, 500px)' 
                        }} 
                        className="video-card" 
                        onClick={() => handleVideoClick(v)}
                      >
                        <img 
                          src={v.thumbnail} 
                          alt={v.title} 
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            opacity: 0.7, 
                            transition: '0.5s' 
                          }} 
                        />
                        <div style={{ 
                          position: 'absolute', 
                          inset: 0, 
                          background: 'linear-gradient(to top, rgba(2, 6, 23, 0.95), transparent)', 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'flex-end', 
                          padding: 'clamp(20px, 5vw, 40px)' 
                        }}>
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 'clamp(8px, 2vw, 12px)', 
                            marginBottom: 'clamp(10px, 3vw, 16px)',
                            flexWrap: 'wrap'
                          }}>
                            <span style={{ 
                              background: '#a3e635', 
                              color: '#020617', 
                              padding: 'clamp(3px, 1vw, 4px) clamp(8px, 2vw, 12px)', 
                              borderRadius: '4px', 
                              fontSize: 'clamp(9px, 2vw, 11px)', 
                              fontWeight: '900' 
                            }}>
                              {isTikTok ? '📱 TIKTOK' : 'FEATURED'}
                            </span>
                            <span style={{ 
                              color: 'rgba(255,255,255,0.6)', 
                              fontSize: 'clamp(10px, 2vw, 12px)' 
                            }}>
                              {new Date(v.date).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 style={{ 
                            fontSize: 'clamp(18px, 4vw, 32px)', 
                            fontWeight: '900', 
                            margin: '0 0 clamp(12px, 3vw, 16px)', 
                            lineHeight: '1.1' 
                          }}>
                            {v.title}
                          </h3>
                          <div className="play-btn" style={{ 
                            width: 'clamp(48px, 10vw, 64px)', 
                            height: 'clamp(48px, 10vw, 64px)', 
                            background: isTikTok ? 'rgba(37, 244, 238, 0.15)' : 'rgba(255,255,255,0.1)', 
                            backdropFilter: 'blur(10px)', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            transition: '0.4s',
                            border: isTikTok ? '2px solid rgba(37, 244, 238, 0.4)' : 'none'
                          }}>
                            {isTikTok ? (
                              <ExternalLink size={clamp(20, 4, 24)} color="#25f4ee" />
                            ) : (
                              <Play size={clamp(20, 4, 24)} fill="white" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VIDEO GRID */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px, 35vw, 280px), 1fr))', 
              gap: 'clamp(16px, 4vw, 24px)' 
            }}>
              {filtered.slice(searchQuery ? 0 : 1).map(v => {
                const videoType = getVideoType(v.videoUrl);
                const isTikTok = videoType === 'tiktok';
                
                return (
                  <div 
                    key={v.id} 
                    style={styles.card} 
                    className="video-card" 
                    onClick={() => handleVideoClick(v)}
                  >
                    <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
                      <img 
                        src={v.thumbnail} 
                        alt={v.title} 
                        style={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          opacity: 0.8, 
                          transition: '0.5s' 
                        }} 
                      />
                      <div style={{ 
                        position: 'absolute', 
                        inset: 0, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        <div className="play-btn" style={{ 
                          width: 'clamp(40px, 8vw, 48px)', 
                          height: 'clamp(40px, 8vw, 48px)', 
                          background: isTikTok ? 'rgba(37, 244, 238, 0.85)' : 'rgba(163, 230, 53, 0.85)', 
                          borderRadius: '50%', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          transition: '0.3s' 
                        }}>
                          {isTikTok ? (
                            <ExternalLink size={clamp(16, 3, 20)} color="#020617" />
                          ) : (
                            <Play size={clamp(16, 3, 20)} fill="#020617" color="#020617" />
                          )}
                        </div>
                      </div>
                      {isTikTok && (
                        <div style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'rgba(37, 244, 238, 0.9)',
                          color: '#020617',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '9px',
                          fontWeight: '900',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <TikTokIcon size={12} color="#020617" />
                          TIKTOK
                        </div>
                      )}
                    </div>
                    <div style={{ padding: 'clamp(14px, 3vw, 20px)' }}>
                      <h3 style={{ 
                        fontSize: 'clamp(13px, 2.5vw, 15px)', 
                        fontWeight: '700', 
                        margin: '0 0 clamp(8px, 2vw, 12px)', 
                        lineHeight: '1.4', 
                        height: 'clamp(36px, 8vw, 42px)', 
                        overflow: 'hidden', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical' 
                      }}>
                        {v.title}
                      </h3>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 'clamp(4px, 1vw, 6px)' 
                        }}>
                          <Calendar size={clamp(10, 2, 12)} color="#a3e635" />
                          <span style={{ 
                            fontSize: 'clamp(9px, 2vw, 11px)', 
                            color: '#94a3b8' 
                          }}>
                            {v.season}
                          </span>
                        </div>
                        <span style={{ 
                          fontSize: 'clamp(8px, 2vw, 10px)', 
                          color: '#a3e635', 
                          fontWeight: '900', 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.5px' 
                        }}>
                          {v.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EMPTY STATE */}
            {filtered.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: 'clamp(48px, 10vw, 80px) clamp(16px, 4vw, 24px)', 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: 'clamp(20px, 5vw, 32px)', 
                border: '1px dashed rgba(255,255,255,0.1)' 
              }}>
                <Video size={clamp(40, 8, 48)} color="#64748b" style={{ margin: '0 auto clamp(12px, 3vw, 20px)' }} />
                <h3 style={{ 
                  fontSize: 'clamp(16px, 4vw, 20px)', 
                  fontWeight: '800', 
                  marginBottom: 'clamp(6px, 2vw, 8px)' 
                }}>
                  Hakuna Video
                </h3>
                <p style={{ 
                  color: '#64748b',
                  fontSize: 'clamp(12px, 2.5vw, 14px)'
                }}>
                  Samahani, hatujapata video kwa vigezo hivi.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* --- FOOTER (OPTIMIZED) --- */}
      <footer style={styles.footer}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            flexWrap: 'wrap', 
            gap: 'clamp(24px, 6vw, 40px)', 
            marginBottom: 'clamp(32px, 8vw, 60px)' 
          }} className="mobile-stack mobile-center">
            <div style={{ maxWidth: '400px' }}>
              <a href="/" style={styles.logoText}>
                <div style={{ 
                  background: '#a3e635', 
                  borderRadius: '6px', 
                  padding: 'clamp(3px, 1vw, 4px) clamp(6px, 2vw, 8px)', 
                  color: '#020617',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }}>PC</div>
                <span>TV</span>
              </a>
              <p style={{ 
                color: '#94a3b8', 
                fontSize: 'clamp(12px, 2.5vw, 14px)', 
                lineHeight: '1.7', 
                marginTop: 'clamp(16px, 4vw, 24px)' 
              }}>
                Burudani ya soka la mtaani katika kiganja chako. Nipe Pande, nikupe burudani. Mashindano makubwa zaidi ya Grassroots Tanzania.
              </p>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: 'clamp(11px, 2.5vw, 14px)', 
                fontWeight: '900', 
                textTransform: 'uppercase', 
                letterSpacing: '2px', 
                color: '#a3e635', 
                marginBottom: 'clamp(16px, 4vw, 24px)' 
              }}>
                Socials
              </h4>
              <div style={{ 
                display: 'flex', 
                gap: 'clamp(12px, 3vw, 16px)',
                justifyContent: 'flex-start'
              }} className="mobile-center">
                <a 
                  href={SOCIAL_LINKS.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    padding: 'clamp(10px, 2vw, 12px)', 
                    borderRadius: '10px', 
                    color: 'white',
                    transition: '0.3s',
                    display: 'inline-flex'
                  }}
                >
                  <Instagram size={clamp(18, 4, 20)} />
                </a>
                <a 
                  href={SOCIAL_LINKS.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    padding: 'clamp(10px, 2vw, 12px)', 
                    borderRadius: '10px', 
                    color: 'white',
                    transition: '0.3s',
                    display: 'inline-flex'
                  }}
                >
                  <Youtube size={clamp(18, 4, 20)} />
                </a>
                <a 
                  href={SOCIAL_LINKS.tiktok} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    padding: 'clamp(10px, 2vw, 12px)', 
                    borderRadius: '10px', 
                    color: 'white',
                    transition: '0.3s',
                    display: 'inline-flex'
                  }}
                >
                  <TikTokIcon size={clamp(18, 4, 20)} />
                </a>
              </div>
            </div>
          </div>
          <div style={{ 
            borderTop: '1px solid rgba(255,255,255,0.05)', 
            paddingTop: 'clamp(20px, 5vw, 32px)', 
            textAlign: 'center', 
            color: '#475569', 
            fontSize: 'clamp(10px, 2vw, 12px)', 
            fontWeight: '600', 
            letterSpacing: '0.5px' 
          }}>
            © 2026 PANDE CUP EVENTS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

      {/* --- PLAYER MODAL (NON-TIKTOK ONLY) --- */}
      {selected && getVideoType(selected.videoUrl) !== 'tiktok' && (
        <div 
          onClick={() => setSelected(null)}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            zIndex: 200, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'rgba(2, 6, 23, 0.98)', 
            backdropFilter: 'blur(10px)', 
            padding: 'clamp(16px, 4vw, 20px)',
            overflowY: 'auto'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '100%', 
              maxWidth: '1000px', 
              position: 'relative',
              margin: 'auto'
            }}
          >
            <button 
              onClick={() => setSelected(null)}
              style={{ 
                position: 'absolute', 
                top: 'clamp(-40px, -8vw, -50px)', 
                right: '0', 
                background: 'rgba(255,255,255,0.1)', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontWeight: 'bold',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: 'clamp(12px, 2.5vw, 14px)',
                backdropFilter: 'blur(10px)',
                transition: '0.3s'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(163, 230, 53, 0.2)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
            >
              FUNGA <X size={clamp(18, 4, 24)} />
            </button>
            <div style={{ 
              position: 'relative', 
              paddingTop: '56.25%', 
              background: '#000', 
              borderRadius: 'clamp(12px, 3vw, 24px)', 
              overflow: 'hidden', 
              boxShadow: '0 0 50px rgba(163, 230, 53, 0.2)' 
            }}>
              <iframe 
                src={selected.videoUrl.replace('watch?v=', 'embed/')} 
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  border: 'none' 
                }}
                allowFullScreen
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
            <div style={{ marginTop: 'clamp(16px, 4vw, 24px)' }}>
              <h2 style={{ 
                fontSize: 'clamp(18px, 4vw, 24px)', 
                fontWeight: '900', 
                marginBottom: 'clamp(6px, 2vw, 8px)' 
              }}>
                {selected.title}
              </h2>
              <div style={{ 
                display: 'flex', 
                gap: 'clamp(12px, 3vw, 16px)', 
                color: '#a3e635', 
                fontSize: 'clamp(11px, 2.5vw, 13px)', 
                fontWeight: 'bold',
                flexWrap: 'wrap'
              }}>
                <span>{selected.season}</span>
                <span>•</span>
                <span>{selected.location.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for clamp (not native to inline styles)
const clamp = (min, vw, max) => {
  return Math.max(min, Math.min(vw, max));
};

export default PcTvPage;