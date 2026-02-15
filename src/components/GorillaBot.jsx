import React, { useState, useEffect } from 'react';
import { X, Award, Shield, Activity, TrendingUp, Trophy } from 'lucide-react';
import { StatsEngine } from '../services/StatsEngine';

const GorillaBot = ({ standings, matches }) => {
  const [isOpen, setIsOpen] = useState(true); // Bubble la chini (Floating Mode)
  const [isExpanded, setIsExpanded] = useState(false); // Dashboard kubwa
  const [currentThought, setCurrentThought] = useState(0);
  const [thoughts, setThoughts] = useState([]);
  
  // Data States
  const [topScorers, setTopScorers] = useState([]);
  const [topTeams, setTopTeams] = useState([]); // Array ya Top 5

  // 1. Load Data & Calculate Logic
  useEffect(() => {
    const generatedThoughts = StatsEngine.getGorillaBanter(standings, matches);
    setThoughts(generatedThoughts);

    // Dummy Wafungaji (Mpaka tuunganishe na Admin Panel)
    setTopScorers([
      { name: 'Juma Kaseja', team: 'Kiomoni FC', goals: 5 },
      { name: 'Mwakere Jr', team: 'Goba United', goals: 4 },
      { name: 'Chinga', team: 'Mpirani Stars', goals: 3 },
      { name: 'Beki Katili', team: 'Ndumi FC', goals: 2 },
    ]);

    // Calculate TOP 5 TEAMS (Overall)
    if (standings && standings.length > 0) {
      const sortedTeams = [...standings].sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts; // Pointi kwanza
        return parseInt(b.gd || 0) - parseInt(a.gd || 0);  // Kisha Goal Difference
      });
      setTopTeams(sortedTeams.slice(0, 5)); // Chukua 5 za juu
    } else {
      setTopTeams([]);
    }
  }, [standings, matches]);

  // 2. Rotate Banter (Maneno ya Gorilla)
  useEffect(() => {
    if (thoughts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [thoughts]);

  // --- MINI MODE (Floating Button) ---
  if (!isOpen && !isExpanded) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="animate-bounce"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000,
          backgroundColor: '#a3e635', color: '#020617', border: 'none', borderRadius: '50%',
          width: '65px', height: '65px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(163,230,53,0.4)', cursor: 'pointer', transition: 'transform 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <span style={{ fontSize: '32px', transform: 'translateY(-2px)' }}>🦍</span>
      </button>
    );
  }

  // --- FULL DASHBOARD MODE (Kadi 4 za Kioo) ---
  if (isExpanded) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 2000, backgroundColor: 'rgba(2, 6, 23, 0.95)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column',
        animation: 'fadeIn 0.3s ease-out'
      }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .dashboard-card { background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 24px; transition: transform 0.2s; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
          .dashboard-card:hover { transform: translateY(-4px); border-color: rgba(163,230,53,0.2); }
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); border-radius: 10px; }
        `}</style>

        {/* Dashboard Container (Scrollable) */}
        <div className="custom-scroll" style={{ overflowY: 'auto', padding: '24px', flex: 1, scrollBehavior: 'smooth' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '60px' }}>
            
            {/* Header ya Dashboard */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#a3e635', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(163,230,53,0.3)' }}>
                  <span style={{ fontSize: '32px', transform: 'translateY(-2px)' }}>🦍</span>
                </div>
                <div>
                  <h2 style={{ color: 'white', margin: '0 0 4px', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', fontSize: '28px', letterSpacing: '1px' }}>Gorilla <span style={{ color: '#a3e635' }}>Mwakere</span> Hub</h2>
                  <p style={{ color: '#94a3b8', margin: 0, fontSize: '14px', letterSpacing: '0.5px' }}>Uchambuzi wa Kina, Takwimu & Ubabe wa Mtaani</p>
                </div>
              </div>
              <button onClick={() => setIsExpanded(false)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#ef4444'; }} onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                <X size={20}/>
              </button>
            </div>

            {/* Grid Layout ya Kadi 4 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              
              {/* KADI 1: TOP 5 TIMU KINARA */}
              <div className="dashboard-card" style={{ background: 'linear-gradient(145deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)', border: '1px solid rgba(163,230,53,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <Trophy color="#a3e635" size={24} />
                  <h3 style={{ color: 'white', margin: 0, fontSize: '16px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase' }}>Viongozi wa Ligi</h3>
                </div>
                
                {topTeams.length > 0 ? (
                  <div>
                     {/* No. 1 - Big Display */}
                     <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(163,230,53,0.05)', borderRadius: '16px', border: '1px solid rgba(163,230,53,0.1)', marginBottom: '20px' }}>
                         <span style={{ fontSize: '10px', color: '#a3e635', fontWeight: 'bold', letterSpacing: '2px' }}>OVERALL LEADER</span>
                         <h1 style={{ color: 'white', fontSize: '32px', margin: '8px 0', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase' }}>{topTeams[0].team || topTeams[0].teamName}</h1>
                         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#cbd5e1' }}>
                            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><strong style={{ color: '#a3e635', fontSize: '18px' }}>{topTeams[0].pts || topTeams[0].points || 0}</strong> PTS</span>
                            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><strong style={{ color: 'white', fontSize: '18px' }}>{topTeams[0].gd || topTeams[0].goalDifference || 0}</strong> GD</span>
                            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><strong style={{ color: '#94a3b8', fontSize: '18px' }}>{topTeams[0].group || '-'}</strong> GRP</span>
                         </div>
                     </div>

                     {/* The Rest (2-5) - List */}
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {topTeams.slice(1).map((team, idx) => (
                           <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                 <span style={{ color: '#64748b', fontWeight: '900', fontSize: '16px' }}>{idx + 2}.</span>
                                 <span style={{ color: 'white', fontWeight: 'bold' }}>{team.team || team.teamName}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ color: '#94a3b8', fontSize: '12px' }}>{team.gd || team.goalDifference || 0} GD</span>
                                <span style={{ color: '#a3e635', fontWeight: '900', fontSize: '16px' }}>{team.pts || team.points || 0} <span style={{fontSize: '10px', color: '#64748b'}}>PTS</span></span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
                ) : (
                  <div style={{ padding: '40px 0', textAlign: 'center', color: '#64748b' }}>Data za msimamo bado zinajikusanya...</div>
                )}
              </div>

              {/* COL 2: WAFUNGAJI & FORM */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* KADI 2: WAFUNGAJI BORA */}
                <div className="dashboard-card" style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <Award color="#a3e635" size={20} />
                    <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Wafungaji Bora</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {topScorers.map((player, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: idx === 0 ? 'rgba(163,230,53,0.05)' : 'transparent', borderRadius: '12px', borderBottom: idx !== topScorers.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ width: '28px', height: '28px', background: idx === 0 ? '#a3e635' : 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: idx === 0 ? 'black' : '#cbd5e1', fontWeight: '900', fontSize: '13px' }}>{idx + 1}</div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ color: idx === 0 ? 'white' : '#cbd5e1', fontWeight: 'bold', fontSize: '15px' }}>{player.name}</span>
                              <span style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>{player.team}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                           <span style={{ color: idx === 0 ? '#a3e635' : 'white', fontWeight: '900', fontSize: '20px' }}>{player.goals}</span>
                           <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>GOLI</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* KADI 4: UKUTA MGUMU */}
                <div className="dashboard-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <Shield color="#a3e635" size={20} />
                    <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Ukuta Mgumu (Clean Sheets)</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {standings && standings.length > 0 ? standings.sort((a,b) => (b.cleanSheets || 0) - (a.cleanSheets || 0)).slice(0, 3).map((team, idx) => (
                       <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                          <span style={{ color: '#cbd5e1', fontWeight: 'bold', fontSize: '14px' }}>{team.team || team.teamName}</span>
                          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                              <span style={{ color: '#a3e635', fontWeight: '900', fontSize: '18px' }}>{team.cleanSheets || 0}</span>
                              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>CS</span>
                          </div>
                       </div>
                    )) : <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Hakuna data za clean sheets bado.</p>}
                  </div>
                </div>

              </div>

              {/* KADI 3: FORM GUIDE (Full Width on Desktop) */}
              <div className="dashboard-card" style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Activity color="#a3e635" size={20} />
                  <h3 style={{ color: 'white', margin: 0, fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Form Ya Timu (5 Za Juu)</h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {standings && standings.length > 0 ? standings.slice(0, 5).map((team, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{team.team || team.teamName}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {team.formGuide ? team.formGuide.split('').map((res, i) => (
                          <span key={i} style={{ 
                            width: '24px', height: '24px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900', color: 'white',
                            backgroundColor: res === 'W' ? '#22c55e' : (res === 'L' ? '#ef4444' : '#64748b'),
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                          }}>{res}</span>
                        )) : <span style={{ color: '#64748b', fontSize: '12px', fontStyle: 'italic' }}>Hakuna Rekodi</span>}
                      </div>
                    </div>
                  )) : <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Hakuna data za form bado.</p>}
                </div>
              </div>

            </div>
            
            <div style={{ marginTop: '50px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '30px' }}>🦍🎤</span>
              <p style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '15px', maxWidth: '500px', lineHeight: '1.6', margin: 0 }}>
                "Takwimu hazidanganyi, mpira unadunda! Kama huna pointi tatu, usinipigie kelele mtaani."
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- DEFAULT MODE (Banter Bar ya Kioo) ---
  return (
    <div style={{ margin: '0 auto', maxWidth: '900px', padding: '0 24px', position: 'relative', zIndex: 50, marginTop: '-50px', marginBottom: '50px' }}>
      
      <div className="banter-bar" style={{
        background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(163, 230, 53, 0.3)', borderRadius: '24px', padding: '24px',
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)', position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}>
        <style>{`
          .banter-bar:hover { transform: translateY(-4px); box-shadow: 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(163, 230, 53, 0.1); }
          .banter-btn { background: rgba(163, 230, 53, 0.1); color: #a3e635; border: 1px solid rgba(163, 230, 53, 0.2); padding: 10px 20px; border-radius: 50px; font-size: 13px; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; letter-spacing: 0.5px; }
          .banter-btn:hover { background: #a3e635; color: #020617; transform: scale(1.05); }
          @media (max-width: 600px) { 
            .banter-bar { flex-direction: column !important; text-align: center; padding: 32px 20px 24px !important; border-radius: 20px !important; } 
            .banter-bar > div:nth-child(2) { margin-top: -50px; background: #0f172a; }
            .banter-btn { margin: 16px auto 0; width: 100%; justify-content: center; } 
          }
        `}</style>
        
        <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
          <X size={16} />
        </button>

        <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #a3e635', flexShrink: 0, backgroundColor: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(163,230,53,0.3)', zIndex: 2 }}>
           <span style={{ fontSize: '45px', transform: 'translateY(-2px)' }}>🦍</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, color: 'white', fontFamily: 'Oswald, sans-serif', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px' }}>Gorilla <span style={{ color: '#a3e635' }}>Mwakere</span></h3>
            <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '9px', fontWeight: '900', padding: '3px 8px', borderRadius: '50px', letterSpacing: '1px', animation: 'pulse 2s infinite' }}>LIVE SAA HII</span>
          </div>
          <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
          
          <p style={{ margin: '0 0 16px 0', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic', minHeight: '48px', display: 'flex', alignItems: 'center' }}>
            "{thoughts.length > 0 ? thoughts[currentThought] : "Natafakari takwimu... Subiri nishushe nondo..."}"
          </p>
          
          <div>
            <button className="banter-btn" onClick={() => setIsExpanded(true)}>
              <TrendingUp size={16} /> FUNGUA DASHBOARD YA TAKWIMU
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GorillaBot;