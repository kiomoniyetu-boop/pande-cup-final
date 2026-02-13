// --- Moved from HomePage.js hero section ---
// The following code is for future handling of season/location switchers:
//
// <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginBottom: '24px', marginTop: '12px' }}>
//   <button
//     style={{ background: activeSeason === '2025' ? '#a3e635' : 'rgba(255,255,255,0.08)', color: activeSeason === '2025' ? '#020617' : '#cbd5e1', fontWeight: 'bold', border: '1px solid #a3e635', borderRadius: '20px', padding: '8px 24px', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
//     onClick={() => { setActiveSeason('2025'); setActiveLocation('kiomoni'); }}
//   >2025</button>
//   <button
//     style={{ background: activeSeason === '2026' ? '#a3e635' : 'rgba(255,255,255,0.08)', color: activeSeason === '2026' ? '#020617' : '#cbd5e1', fontWeight: 'bold', border: '1px solid #a3e635', borderRadius: '20px', padding: '8px 24px', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
//     onClick={() => setActiveSeason('2026')}
//   >2026</button>
// </div>
//
// <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', marginBottom: '8px' }}>
//   <button
//     onClick={() => setActiveLocation('kiomoni')}
//     style={{ ...styles.locationButton, borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'rgba(255,255,255,0.2)', backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'rgba(255,255,255,0.08)', color: activeLocation === 'kiomoni' ? 'black' : 'rgba(255,255,255,0.85)', opacity: 1, fontWeight: 700, fontSize: '15px', minWidth: 90, minHeight: 36, borderRadius: 12, boxShadow: activeLocation === 'kiomoni' ? '0 0 8px 1px rgba(163,230,53,0.13)' : 'none', transition: 'all 0.2s cubic-bezier(.4,0,.2,1)', outline: 'none', cursor: 'pointer', letterSpacing: '1px' }}
//     onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
//     onMouseUp={e => e.currentTarget.style.transform = 'scale(1.03)'}
//     onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//     onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
//     onTouchEnd={e => e.currentTarget.style.transform = 'scale(1.03)'}
//     onTouchCancel={e => e.currentTarget.style.transform = 'scale(1)'}
//   >TANGA</button>
//   <button
//     onClick={() => setActiveLocation('goba')}
//     style={{ ...styles.locationButton, borderColor: activeLocation === 'goba' ? '#a3e635' : 'rgba(255,255,255,0.2)', backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'rgba(255,255,255,0.08)', color: activeLocation === 'goba' ? 'black' : 'rgba(255,255,255,0.85)', opacity: activeSeason === '2025' ? 0.5 : 1, fontWeight: 700, fontSize: '15px', minWidth: 90, minHeight: 36, borderRadius: 12, boxShadow: activeLocation === 'goba' ? '0 0 8px 1px rgba(163,230,53,0.13)' : 'none', transition: 'all 0.2s cubic-bezier(.4,0,.2,1)', outline: 'none', cursor: 'pointer', letterSpacing: '1px' }}
//     onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
//     onMouseUp={e => e.currentTarget.style.transform = 'scale(1.03)'}
//     onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//     onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
//     onTouchEnd={e => e.currentTarget.style.transform = 'scale(1.03)'}
//     onTouchCancel={e => e.currentTarget.style.transform = 'scale(1)'}
//   >DAR</button>
// </div>
import React from 'react';

const SeasonSwitcher = ({ activeSeason, setActiveSeason }) => {
  const seasons = ['2025', '2026'];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: 'rgba(30, 41, 59, 0.5)',
      padding: '4px 8px',
      borderRadius: '8px',
      border: '1px solid rgba(163, 230, 53, 0.2)',
      marginLeft: '12px'
    }}>
      {seasons.map((season) => (
        <span
          key={season}
          onClick={() => setActiveSeason(season)}
          style={{
            padding: '4px 12px',
            fontSize: '13px',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: activeSeason === season ? '#a3e635' : 'transparent',
            color: activeSeason === season ? '#0f172a' : '#94a3b8',
            userSelect: 'none'
          }}
        >
          {season}
        </span>
      ))}
    </div>
  );
};

export default SeasonSwitcher;