import React, { useState, useEffect } from 'react';
import { X, Award, Shield, Activity, TrendingUp, Trophy, User } from 'lucide-react';
import { StatsEngine } from '../services/StatsEngine';

const GorillaBot = ({ standings, matches }) => {
  const [isOpen, setIsOpen] = useState(true); // Bubble la chini
  const [isExpanded, setIsExpanded] = useState(false); // Dashboard kubwa
  const [currentThought, setCurrentThought] = useState(0);
  const [thoughts, setThoughts] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [overallLeader, setOverallLeader] = useState(null);

  // Load Data & Calculate Logic
  useEffect(() => {
    const generatedThoughts = StatsEngine.getGorillaBanter(standings, matches);
    setThoughts(generatedThoughts);

    // 1. Weka Dummy Data za Wafungaji (Hapa baadaye tutavuta halisi)
    setTopScorers([
      { name: 'Juma Kaseja', team: 'Kiomoni FC', goals: 5 },
      { name: 'Mwakere Jr', team: 'Goba United', goals: 4 },
      { name: 'Chinga', team: 'Mpirani Stars', goals: 3 },
      { name: 'Beki Katili', team: 'Ndumi FC', goals: 2 },
    ]);

    // 2. Tafuta TIMU KINARA (Yenye points nyingi kuliko wote)
    if (standings.length > 0) {
      const leader = [...standings].sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts; // Angalia Pointi kwanza
        return parseInt(b.gd) - parseInt(a.gd);  // Kisha Goal Difference
      })[0];
      setOverallLeader(leader);
    }
  }, [standings, matches]);

  // Rotate Banter
  useEffect(() => {
    if (thoughts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [thoughts]);

  // 1. MINI MODE (Floating Button)
  if (!isOpen && !isExpanded) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="animate-bounce"
        style={{
          position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000,
          backgroundColor: '#a3e635', color: 'black', border: 'none', borderRadius: '50%',
          width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)', cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: '30px' }}>🦍</span>
      </button>
    );
  }

  // 2. FULL DASHBOARD MODE (Kadi 4 Sasa)
  if (isExpanded) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2000, backgroundColor: 'rgba(15, 23, 42, 0.98)',
        backdropFilter: 'blur(10px)', overflowY: 'auto', padding: '20px'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontSize: '40px' }}>🦍</span>
              <div>
                <h2 style={{ color: '#a3e635', margin: 0, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Gorilla Stats Hub</h2>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px' }}>Uchambuzi wa Kina, Takwimu & Ubabe</p>
              </div>
            </div>
            <button onClick={() => setIsExpanded(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}><X size={24}/></button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            {/* KADI 1: TIMU KINARA (MPYA) */}
            <div style={{ backgroundColor: 'rgba(163, 230, 53, 0.1)', borderRadius: '16px', padding: '24px', border: '1px solid #a3e635', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}><Trophy size={100} color="#a3e635"/></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Trophy color="#a3e635" size={24} />
                <h3 style={{ color: '#a3e635', margin: 0, fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>TIMU KINARA PANDE CUP</h3>
              </div>
              
              {overallLeader ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                   <h1 style={{ color: 'white', fontSize: '32px', margin: '0 0 10px 0', fontFamily: 'Oswald', textTransform: 'uppercase' }}>{overallLeader.team}</h1>
                   <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{overallLeader.pts}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Pointi</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{overallLeader.gd}</span>
                        <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Goli (GD)</span>
                      </div>
                   </div>
                   <p style={{ marginTop: '20px', color: '#cbd5e1', fontSize: '13px', fontStyle: 'italic' }}>"Hawa jamaa wanatembeza Pira Biriani!"</p>
                </div>
              ) : (
                <p style={{ color: '#cbd5e1' }}>Data bado zinajikusanya...</p>
              )}
            </div>

            {/* KADI 2: WAFUNGAJI BORA (Updated Layout) */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Award color="#a3e635" size={20} />
                <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>WAFUNGAJI BORA</h3>
              </div>
              {topScorers.map((player, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', background: idx === 0 ? '#a3e635' : '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: idx === 0 ? 'black' : 'white', fontWeight: 'bold', fontSize: '12px' }}>{idx + 1}</div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>{player.name}</span>
                        <span style={{ color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase' }}>{player.team}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                     <span style={{ display: 'block', color: '#a3e635', fontWeight: '900', fontSize: '16px' }}>{player.goals}</span>
                     <span style={{ fontSize: '9px', color: '#64748b' }}>GOLI</span>
                  </div>
                </div>
              ))}
            </div>

            {/* KADI 3: FORM GUIDE */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Activity color="#a3e635" size={20} />
                <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>FORM YA TIMU (5 ZA JUU)</h3>
              </div>
              {standings.slice(0, 5).map((team, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: 'bold' }}>{team.team}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {team.formGuide ? team.formGuide.split('').map((res, i) => (
                      <span key={i} style={{ 
                        width: '20px', height: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', color: 'white',
                        backgroundColor: res === 'W' ? '#22c55e' : (res === 'L' ? '#ef4444' : '#64748b')
                      }}>{res}</span>
                    )) : <span style={{ color: '#64748b', fontSize: '12px' }}>-</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* KADI 4: UKUTA MGUMU */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Shield color="#a3e635" size={20} />
                <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold' }}>UKUTA MGUMU (BILA KUFUNGWA)</h3>
              </div>
              {standings.sort((a,b) => b.cleanSheets - a.cleanSheets).slice(0, 3).map((team, idx) => (
                 <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'white', fontWeight: 'bold' }}>{team.team}</span>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#a3e635', fontWeight: 'bold', fontSize: '16px' }}>{team.cleanSheets}</span>
                        <span style={{ fontSize: '10px', color: '#64748b', marginLeft: '4px' }}>GAMES</span>
                    </div>
                 </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ color: '#64748b', fontStyle: 'italic', fontSize: '13px' }}>"Takwimu hazidanganyi, mpira unadunda!" - Gorilla Mwakere</p>
          </div>
        </div>
      </div>
    );
  }

  // 3. DEFAULT MODE (Banter Bar)
  return (
    <div style={{
      margin: '0 auto', maxWidth: '800px', padding: '0 24px', position: 'relative', zIndex: 50,
      marginTop: '-40px', marginBottom: '40px'
    }}>
      <div style={{
        backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #a3e635', borderRadius: '16px', padding: '20px',
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px',
        boxShadow: '0 0 20px rgba(163, 230, 53, 0.15)', position: 'relative', backdropFilter: 'blur(10px)'
      }}>
        
        <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>

        <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #a3e635', flexShrink: 0, backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <span style={{ fontSize: '40px' }}>🦍</span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, color: '#a3e635', fontFamily: 'Oswald', fontSize: '16px', textTransform: 'uppercase' }}>GORILLA MWAKERE</h3>
            <span style={{ backgroundColor: '#a3e635', color: 'black', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>LIVE</span>
          </div>
          <p style={{ margin: '0 0 12px 0', color: '#e2e8f0', fontSize: '14px', lineHeight: '1.5', fontStyle: 'italic' }}>
            "{thoughts.length > 0 ? thoughts[currentThought] : "Natafakari takwimu... subiri kidogo..."}"
          </p>
          
          <button 
            onClick={() => setIsExpanded(true)}
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#a3e635', border: 'none', padding: '6px 12px', borderRadius: '4px', 
              fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
          >
            <TrendingUp size={14} /> ONA TAKWIMU KAMILI
          </button>
        </div>
      </div>
      
      <style>{`@media (max-width: 600px) { div[style*="flex-direction: row"] { flex-direction: column !important; text-align: center; } div[style*="align-items: center"] { justify-content: center; } button[style*="display: flex"] { margin: 0 auto; } }`}</style>
    </div>
  );
};

export default GorillaBot;