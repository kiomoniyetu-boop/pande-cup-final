import React, { useEffect, useState } from 'react';
import { X, Play } from 'lucide-react';

const SPACE_ID = 'ax6wvfd84net';
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';

const PcTvPage = () => {
  const [videos, setVideos] = useState([]);
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          title: item.fields.title || 'PC TV',
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

  // Apply both location AND season filtering (matching HomePage logic)
  const [activeSeason, setActiveSeason] = useState('2026');
  
  const filtered = videos.filter(v => {
    const vLocation = (v.location || 'kiomoni').toLowerCase();
    const isLocationMatch = vLocation.includes(activeLocation);
    
    // Extract 4-digit year from season field (handles "June 2026" format)
    const vSeasonRaw = v.season || '2026';
    const vYearMatch = vSeasonRaw.match(/(\d{4})/);
    const vYear = vYearMatch ? vYearMatch[1] : vSeasonRaw.trim();
    const activeYearMatch = activeSeason.match(/(\d{4})/);
    const activeYear = activeYearMatch ? activeYearMatch[1] : activeSeason.trim();
    
    return isLocationMatch && vYear === activeYear;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
      <header style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '900', fontSize: '20px' }}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></a>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setActiveSeason('2025')} style={{ padding: '8px 12px', borderRadius: '4px', border: activeSeason === '2025' ? '2px solid #a3e635' : '1px solid rgba(255,255,255,0.2)', background: activeSeason === '2025' ? '#a3e635' : 'transparent', color: activeSeason === '2025' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>2025</button>
              <button onClick={() => setActiveSeason('2026')} style={{ padding: '8px 12px', borderRadius: '4px', border: activeSeason === '2026' ? '2px solid #a3e635' : '1px solid rgba(255,255,255,0.2)', background: activeSeason === '2026' ? '#a3e635' : 'transparent', color: activeSeason === '2026' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>2026</button>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setActiveLocation('kiomoni')} style={{ padding: '8px 14px', borderRadius: '4px', border: activeLocation === 'kiomoni' ? 'none' : '1px solid rgba(255,255,255,0.08)', background: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', color: activeLocation === 'kiomoni' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>KIOMONI</button>
              <button onClick={() => setActiveLocation('goba')} style={{ padding: '8px 14px', borderRadius: '4px', border: activeLocation === 'goba' ? 'none' : '1px solid rgba(255,255,255,0.08)', background: activeLocation === 'goba' ? '#a3e635' : 'transparent', color: activeLocation === 'goba' ? 'black' : 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>GOBA</button>
            </div>
            <a href="/admin" style={{ color: '#a3e635', textDecoration: 'none', fontWeight: '700', padding: '8px 12px' }}>ADMIN</a>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900' }}>PC TV <span style={{ color: '#a3e635' }}>{activeLocation.toUpperCase()}</span> <span style={{ color: '#94a3b8', fontSize: '24px', fontWeight: '400' }}>({activeSeason})</span></h1>
        <p style={{ color: '#94a3b8', marginTop: '8px' }}>Video highlights and community clips. Click a tile to view.</p>

        {isLoading ? (
          <div style={{ marginTop: 40, color: '#64748b' }}>Loading videos...</div>
        ) : (
          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {filtered.length === 0 ? (
              <div style={{ color: '#64748b' }}>Hakuna video kwa eneo hili.</div>
            ) : (
              filtered.map(v => (
                <div key={v.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', cursor: 'pointer' }} onClick={() => setSelected(v)}>
                  {v.thumbnail ? (
                    <img src={v.thumbnail} alt={v.title} style={{ width: '100%', height: '150px', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#071028' }}>{v.title}</div>
                  )}
                  <div style={{ padding: '12px' }}>
                    <div style={{ fontWeight: '800' }}>{v.title}</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '6px' }}>{v.season || ''}</div>
                  </div>
                  <div style={{ position: 'absolute', right: 12, bottom: 12, background: 'rgba(0,0,0,0.6)', padding: '8px', borderRadius: '999px' }}><Play size={18} /></div>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)' }}>
          <div style={{ width: '90%', maxWidth: '900px', background: '#071028', padding: '18px', borderRadius: '12px', position: 'relative' }}>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', right: 12, top: 12, background: 'transparent', border: 'none', color: '#cbd5e1' }}><X size={26} /></button>
            <h3 style={{ color: 'white', marginBottom: 12 }}>{selected.title}</h3>
            {selected.videoUrl && (selected.videoUrl.includes('youtube') || selected.videoUrl.includes('youtu.be')) ? (
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe title={selected.title} src={selected.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} allowFullScreen />
              </div>
            ) : selected.videoUrl && (selected.videoUrl.includes('tiktok') || selected.videoUrl.includes('vm.tiktok') || selected.videoUrl.includes('vt.tiktok')) ? (
              <div style={{ color: '#94a3b8', paddingTop: '20px', textAlign: 'center' }}>
                <p style={{ marginBottom: '16px' }}>TikTok videos cannot be played directly. Tap the button below to open in new tab.</p>
                <button onClick={() => window.open(selected.videoUrl, '_blank')} style={{ padding: '12px 24px', backgroundColor: '#a3e635', color: 'black', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '24px' }}>OPEN ON TIKTOK</button>
              </div>
            ) : selected.videoUrl ? (
              <video controls style={{ width: '100%' }} src={selected.videoUrl} />
            ) : (
              <div style={{ color: '#94a3b8' }}>Video URL not available. You can open the thumbnail or contact admin.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PcTvPage;
