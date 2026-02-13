// path: src/components/GorillaBot.jsx
import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react'; // Hakikisha una lucide-react, kama huna tumia icon yoyote
import { StatsEngine } from '../services/StatsEngine'; // Hii ina-import ile file ya juu

const GorillaBot = ({ standings, matches, season }) => {
  const [isOpen, setIsOpen] = useState(true); // Tunaanza ikiwa imefunguka
  const [currentThought, setCurrentThought] = useState(0);
  const [thoughts, setThoughts] = useState([]);

  // Pata maneno mapya data zikibadilika
  useEffect(() => {
    const generatedThoughts = StatsEngine.getGorillaBanter(standings, matches);
    setThoughts(generatedThoughts);
  }, [standings, matches]);

  // Badilisha maneno kila baada ya sekunde 6
  useEffect(() => {
    if (thoughts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [thoughts]);

  // Hii ndio button ndogo inayoonekana uki-close
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="animate-bounce"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: '#a3e635',
          color: 'black',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '30px' }}>🦍</span>
      </button>
    );
  }

  // Hii ndio Box kubwa la Mwakere
  return (
    <div style={{
      margin: '0 auto',
      maxWidth: '800px',
      padding: '0 24px',
      position: 'relative',
      zIndex: 50,
      marginTop: '-40px', // Hii inaisogeza juu kidogo ikae pazuri
      marginBottom: '40px'
    }}>
      <div style={{
        backgroundColor: 'rgba(15, 23, 42, 0.9)', // Giza kidogo
        border: '1px solid #a3e635', // Mpaka wa Kijani
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'row', // Kwenye PC inakaa sambamba
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 0 20px rgba(163, 230, 53, 0.15)',
        position: 'relative',
        backdropFilter: 'blur(10px)'
      }}>
        
        {/* Close Button (X) */}
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          <X size={18} />
        </button>

        {/* Picha ya Gorilla (Avatar) */}
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid #a3e635',
          flexShrink: 0,
          backgroundColor: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
           {/* Weka picha halisi ya Gorilla hapa ukipenda */}
           <span style={{ fontSize: '40px' }}>🦍</span>
        </div>

        {/* Maandishi (Content) */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, color: '#a3e635', fontFamily: 'Oswald, sans-serif', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              GORILLA MWAKERE
            </h3>
            <span style={{ backgroundColor: '#a3e635', color: 'black', fontSize: '9px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>LIVE</span>
          </div>
          
          <div style={{
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center'
          }}>
             <p style={{ 
               margin: 0, 
               color: '#e2e8f0', 
               fontSize: '14px', 
               lineHeight: '1.5',
               fontFamily: '"Inter", sans-serif',
               fontStyle: 'italic'
             }}>
               "{thoughts.length > 0 ? thoughts[currentThought] : "Natafakari takwimu... subiri kidogo..."}"
             </p>
          </div>
        </div>

      </div>
      
      {/* CSS ya dharura ya Mobile Responsive (Ili isikatike kwenye simu) */}
      <style>{`
        @media (max-width: 600px) {
          div[style*="flex-direction: row"] {
            flex-direction: column !important;
            text-align: center;
          }
          div[style*="align-items: center"] {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default GorillaBot;