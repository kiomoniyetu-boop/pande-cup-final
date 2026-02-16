import React from 'react';
import { Trophy, Star, Shield, Zap, Target } from 'lucide-react';

const GorillaCard = ({ player, type = "MOTM" }) => {
  // Config kulingana na aina ya kadi
  const cardConfigs = {
    MOTM: {
      label: "MAN OF THE MATCH",
      color: "#a3e635",
      icon: <Star size={16} />,
      bg: "linear-gradient(135deg, rgba(163, 230, 53, 0.2) 0%, rgba(2, 6, 23, 0.9) 100%)"
    },
    TOP_SCORER: {
      label: "GOLDEN BOOT RACE",
      color: "#fbbf24",
      icon: <Target size={16} />,
      bg: "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(2, 6, 23, 0.9) 100%)"
    },
    CLEAN_SHEET: {
      label: "WALL OF PANDE",
      color: "#3b82f6",
      icon: <Shield size={16} />,
      bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(2, 6, 23, 0.9) 100%)"
    }
  };

  const config = cardConfigs[type] || cardConfigs.MOTM;

  return (
    <div style={{
      width: '240px',
      height: '320px',
      position: 'relative',
      background: config.bg,
      borderRadius: '20px',
      border: `2px solid ${config.color}`,
      overflow: 'hidden',
      boxShadow: `0 0 30px ${config.color}33`,
      fontFamily: "'Oswald', sans-serif"
    }}>
      {/* Glossy Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 45%, transparent 50%)',
        zIndex: 2
      }} />

      {/* Header Label */}
      <div style={{
        backgroundColor: config.color,
        color: '#020617',
        fontSize: '10px',
        fontWeight: '900',
        padding: '4px 0',
        textAlign: 'center',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        {config.label}
      </div>

      {/* Player Image Area */}
      <div style={{
        height: '180px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {player?.photo ? (
          <img 
            src={player.photo} 
            alt={player.name} 
            style={{ height: '100%', objectFit: 'cover', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))' }} 
          />
        ) : (
          <div style={{ fontSize: '80px', opacity: 0.2 }}>👤</div>
        )}
        
        {/* Badge Corner */}
        <div style={{
          position: 'absolute', top: '10px', left: '10px',
          background: 'rgba(2, 6, 23, 0.8)', padding: '5px', borderRadius: '8px',
          border: `1px solid ${config.color}`
        }}>
          {config.icon}
        </div>
      </div>

      {/* Player Details */}
      <div style={{ padding: '15px', textAlign: 'center', background: 'rgba(2, 6, 23, 0.8)', flex: 1 }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '20px', textTransform: 'uppercase', lineHeight: 1.2 }}>
          {player?.name || "Mchezaji"}
        </h2>
        <p style={{ color: config.color, margin: '2px 0', fontSize: '12px', fontWeight: 'bold' }}>
          {player?.team || "KIKOSI CHA PANDE"}
        </p>

        {/* Mini Stats Grid */}
        <div style={{ 
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '5px', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '10px' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '8px', color: '#64748b' }}>POS</span>
            <span style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>{player?.pos || "-"}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '8px', color: '#64748b' }}>NO</span>
            <span style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>{player?.no || "-"}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '8px', color: '#64748b' }}>G/S</span>
            <span style={{ fontSize: '14px', color: config.color, fontWeight: 'bold' }}>{player?.goals || player?.stats || "0"}</span>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div style={{
        position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)',
        width: '80%', height: '20px', background: config.color,
        filter: 'blur(20px)', opacity: 0.3, zIndex: 1
      }} />
    </div>
  );
};

export default GorillaCard;