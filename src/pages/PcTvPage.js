import React, { useEffect, useState } from 'react';
import { X, Play, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

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
          videoUrl: item.fields.videoUrl || ''
        }));

        setVideos(mapped);
      } catch (err) {
        console.warn('PC TV fetch error', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // --- FILTER LOGIC ---
  const filtered = videos.filter(v => {
    const vLocation = (v.location || 'kiomoni').toLowerCase();
    const isLocationMatch = vLocation.includes(activeLocation);
    
    // Extract 4-digit year from season field
    const vSeasonRaw = v.season || '2026';
    const vYearMatch = vSeasonRaw.match(/(\d{4})/);
    const vYear = vYearMatch ? vYearMatch[1] : vSeasonRaw.trim();
    const activeYearMatch = activeSeason.match(/(\d{4})/);
    const activeYear = activeYearMatch ? activeYearMatch[1] : activeSeason.trim();
    
    return isLocationMatch && vYear === activeYear;
  });

  // --- STYLES ---
  const styles = {
    container: { minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: '"Inter", sans-serif' },
    navGlass: { background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, zIndex: 100 },
    logoText: { fontFamily: '"Oswald", sans-serif', fontSize: '24px', fontWeight: '900', color: 'white', textDecoration: 'none', letterSpacing: '-1px' },
    filterBtn: { padding: '8px 20px', borderRadius: '50px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', border: '1px solid' },
    sectionTitle: { fontFamily: '"Oswald", sans-serif', fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' },
    videoCard: { position: 'relative', borderRadius: '16px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: 'transform 0.3s' },
    footer: { backgroundColor: '#020617', borderTop: '1px solid rgba(163, 230, 53, 0.1)', position: 'relative', padding: '60px 24px 30px', marginTop: '80px' }
  };

  return (
    <div style={styles.container}>
      {/* 1. HEADER (Consistent Navigation) */}
      <header style={styles.navGlass}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <a href="/" style={styles.logoText}>PANDE<span style={{ color: '#a3e635' }}>CUP</span> TV</a>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Season Switcher */}
            <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '50px' }}>
              {['2025', '2026'].map(year => (
                <button 
                  key={year}
                  onClick={() => setActiveSeason(year)} 
                  style={{ 
                    ...styles.filterBtn,
                    border: 'none',
                    background: activeSeason === year ? '#a3e635' : 'transparent', 
                    color: activeSeason === year ? 'black' : 'rgba(255,255,255,0.6)' 
                  }}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Location Switcher */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setActiveLocation('kiomoni')} 
                style={{ 
                  ...styles.filterBtn, 
                  borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'rgba(255,255,255,0.2)',
                  background: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent',
                  color: activeLocation === 'kiomoni' ? 'black' : 'white',
                  boxShadow: activeLocation === 'kiomoni' ? '0 0 15px rgba(163,230,53,0.4)' : 'none'
                }}
              >
                TANGA
              </button>
              <button 
                onClick={() => setActiveLocation('goba')} 
                style={{ 
                  ...styles.filterBtn, 
                  borderColor: activeLocation === 'goba' ? '#a3e635' : 'rgba(255,255,255,0.2)',
                  background: activeLocation === 'goba' ? '#a3e635' : 'transparent',
                  color: activeLocation === 'goba' ? 'black' : 'white',
                  opacity: activeSeason === '2025' ? 0.5 : 1,
                  boxShadow: activeLocation === 'goba' ? '0 0 15px rgba(163,230,53,0.4)' : 'none'
                }}
              >
                DAR
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
        <div style={{ borderLeft: '4px solid #a3e635', paddingLeft: '16px', marginBottom: '32px' }}>
            <h1 style={styles.sectionTitle}>PANDE CUP <span style={{ color: '#a3e635' }}>TV</span></h1>
            <p style={{ color: '#94a3b8', marginTop: '4px', fontSize: '14px' }}>
              Matukio yote, Magoli, na Shangwe za {activeLocation === 'kiomoni' ? 'Kiomoni' : 'Goba'} ({activeSeason})
            </p>
        </div>

        {isLoading ? (
          <div style={{ marginTop: 40, textAlign: 'center', color: '#64748b' }}>Inapakua video...</div>
        ) : (
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {filtered.length === 0 ? (
              <div style={{ color: '#64748b', gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px' }}>
                Hakuna video zilizopatikana kwa {activeLocation.toUpperCase()} msimu wa {activeSeason}.
              </div>
            ) : (
              filtered.map(v => (
                <div key={v.id} style={styles.videoCard} className="hover-card" onClick={() => setSelected(v)}>
                  <div style={{ position: 'relative', paddingTop: '56.25%', background: '#000' }}>
                    {v.thumbnail ? (
                      <img src={v.thumbnail} alt={v.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontWeight: 'bold' }}>PANDE CUP TV</div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                        <div style={{ background: 'rgba(163, 230, 53, 0.9)', borderRadius: '50%', padding: '16px', display: 'flex', boxShadow: '0 0 20px rgba(163,230,53,0.4)' }}>
                            <Play size={24} color="black" fill="black" />
                        </div>
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontWeight: '800', fontSize: '16px', margin: '0 0 8px 0', lineHeight: '1.4' }}>{v.title}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold', textTransform: 'uppercase' }}>{v.season}</span>
                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>{v.location.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {/* 3. FOOTER (Consistent Footer) */}
      <footer style={styles.footer}>
        <div style={{ position: 'absolute', top: 0, left: '10%', width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, #a3e635, transparent)', opacity: 0.5 }}></div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div>
                <a href="/" style={styles.logoText}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></a>
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', marginTop: '20px' }}>NIPE PANDE. NIKUPE BURUDANI. Zaidi ya soka, hii ni harakati ya kukuza vipaji vya mtaani.</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                    <a href={SOCIAL_LINKS.instagram} style={{ color: 'white' }}><Instagram size={20} /></a>
                    <a href={SOCIAL_LINKS.facebook} style={{ color: 'white' }}><Facebook size={20} /></a>
                    <a href={SOCIAL_LINKS.youtube} style={{ color: 'white' }}><Youtube size={20} /></a>
                    <a href={SOCIAL_LINKS.tiktok} style={{ color: 'white' }}><TikTokIcon size={20} /></a>
                </div>
            </div>
            <div>
                <h4 style={{ color: 'white', fontSize: '14px', fontWeight: '800', marginBottom: '20px', textTransform: 'uppercase' }}>Mawasiliano</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}><MapPin size={18} color="#a3e635" /><span style={{ color: '#94a3b8', fontSize: '13px' }}>The Root, Kiomoni, Tanga</span></div>
                    <div style={{ display: 'flex', gap: '10px' }}><Phone size={18} color="#a3e635" /><span style={{ color: '#94a3b8', fontSize: '13px' }}>+255 653 292 935</span></div>
                    <div style={{ display: 'flex', gap: '10px' }}><Mail size={18} color="#a3e635" /><span style={{ color: '#94a3b8', fontSize: '13px' }}>pandecup2023@gmail.com</span></div>
                </div>
            </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '50px', paddingTop: '20px', textAlign: 'center', color: '#64748b', fontSize: '12px' }}>© 2026 Pande Cup. All Rights Reserved.</div>
      </footer>

      {/* 4. VIDEO PLAYER MODAL */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(5px)' }}>
          <div style={{ width: '90%', maxWidth: '900px', background: '#0f172a', padding: '0', borderRadius: '24px', position: 'relative', border: '1px solid rgba(163, 230, 53, 0.2)', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <h3 style={{ color: 'white', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{selected.title}</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '8px', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
            </div>
            
            <div style={{ background: 'black' }}>
                {selected.videoUrl && (selected.videoUrl.includes('youtube') || selected.videoUrl.includes('youtu.be')) ? (
                <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe title={selected.title} src={selected.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen />
                </div>
                ) : selected.videoUrl && (selected.videoUrl.includes('tiktok') || selected.videoUrl.includes('vm.tiktok') || selected.videoUrl.includes('vt.tiktok')) ? (
                <div style={{ color: '#94a3b8', padding: '60px 20px', textAlign: 'center' }}>
                    <TikTokIcon size={48} color="#a3e635" />
                    <p style={{ marginBottom: '24px', marginTop: '16px', fontSize: '16px' }}>Video za TikTok zinahitaji kufunguka kwenye App.</p>
                    <button onClick={() => window.open(selected.videoUrl, '_blank')} style={{ padding: '14px 28px', backgroundColor: '#a3e635', color: 'black', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>FUNGUA TIKTOK</button>
                </div>
                ) : selected.videoUrl ? (
                <video controls style={{ width: '100%', display: 'block', maxHeight: '70vh' }} src={selected.videoUrl} autoPlay />
                ) : (
                <div style={{ color: '#94a3b8', padding: '40px', textAlign: 'center' }}>Video URL haipatikani. Tafadhali wasiliana na admin.</div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PcTvPage;