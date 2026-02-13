import React, { useState } from 'react';
import { Zap, Heart, Globe, Phone, Mail, Award, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ backgroundColor: '#020617', color: '#fff', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ==================== 1. ABOUT US (Grok Narrative) ==================== */}
      <section style={{ padding: '80px 24px 40px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: '900', fontStyle: 'italic', color: '#fff', marginBottom: '10px' }}>
            NIPE <span style={{ color: '#a3e635' }}>PANDE.</span>
          </h1>
          <p style={{ color: '#64748b', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '14px' }}>The Dust • The Stage • The Future</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 24, padding: '40px 30px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#a3e635', fontWeight: 800, fontSize: '12px', letterSpacing: '2px', marginBottom: 15, textTransform: 'uppercase' }}>The Dust of Kiomoni</h3>
            <p style={{ color: '#cbd5e1', fontSize: 16, lineHeight: 1.8 }}>
              In 2023, the streets of Kiomoni, Tanga were loud with nothing. No jobs, no scouts. Just raw talent kicking balls made of plastic bags under the sun. <strong>Pande Cup</strong> was born to refuse that silence.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 24, padding: '40px 30px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#a3e635', fontWeight: 800, fontSize: '12px', letterSpacing: '2px', marginBottom: 15, textTransform: 'uppercase' }}>The Traveling Circus</h3>
            <p style={{ color: '#cbd5e1', fontSize: 16, lineHeight: 1.8 }}>
              From crowning champions in Tanga 2025 to landing in Goba, Dar es Salaam 2026. We are a movement, taking our kids from the Sunday dust to the <strong>National Stage</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== 2. SPONSORSHIP PACKAGES (The Pitch) ==================== */}
      <section style={{ padding: '100px 24px', backgroundColor: '#050a18' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', textAlign: 'center', color: '#a3e635', marginBottom: '10px' }}>INVEST IN THE PANDE</h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '60px' }}>Choose your bridge to the next generation of talent.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            
            {/* TIER 1: SILVER / MCHONGO WA KATI */}
            <PackageCard 
              icon={<Zap size={40} />}
              title="MCHONGO WA KATI"
              tier="SILVER PARTNER"
              description="Supporting local ward-level talent. Branding on training kits and pitch-side banners during group stages."
              quote="Fueling the grassroots engine. Turning the silence of local wards into the roar of the stadium."
            />

            {/* TIER 2: GOLD / MDAU WETU (RECOMMENDED) */}
            <PackageCard 
              icon={<Heart size={40} />}
              title="MDAU WETU"
              tier="GOLD PARTNER"
              recommended={true}
              description="Full branding on match-day jerseys. Social media features ('Player of the Month') and direct impact on the mtaa economy."
              quote="More than a sponsor; you are the pulse of the street. You keep the mtaa calm and the youth focused."
            />

            {/* TIER 3: PLATINUM / PANDE LA TAIFA */}
            <PackageCard 
              icon={<Globe size={40} />}
              title="PANDE LA TAIFA"
              tier="PLATINUM PARTNER"
              description="Title sponsorship rights. Logo on the main trophy. Scouting data access and National TV coverage slots."
              quote="Architects of the future. You are not just supporting a league; you are exporting talent to the world."
            />

          </div>
        </div>
      </section>

      {/* ==================== 3. CURRENT SPONSORS (Polished) ==================== */}
      <section style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ color: '#64748b', fontWeight: 900, fontSize: 14, textAlign: 'center', marginBottom: 40, letterSpacing: 3, textTransform: 'uppercase' }}>The Bridges Who Built Us</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center', alignItems: 'center' }}>
          {[
            { name: "VODACOM", logo: "/images/vodacom.png" },
            { name: "CRDB BANK", logo: "/images/crdb.png" },
            { name: "YAS", logo: "/images/yas.png" },
            { name: "POLISI", logo: "/images/polisi.png" },
            { name: "AZAM TV", logo: "/images/azam.png" }
          ].map((s, idx) => (
            <SponsorLogo key={idx} s={s} />
          ))}
        </div>
      </section>

      {/* ==================== 4. CONTACT / DIRECT LINE ==================== */}
      <section style={{ padding: '100px 24px', textAlign: 'center', background: 'linear-gradient(to top, #a3e63510, transparent)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '20px' }}>READY TO GIVE A PANDE?</h2>
        <p style={{ color: '#cbd5e1', marginBottom: '40px' }}>Contact our executive team for custom partnership inquiries.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
          <a href="tel:0746510805" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#a3e635', color: '#020617', padding: '15px 30px', borderRadius: '50px', fontWeight: '900', textDecoration: 'none' }}>
            <Phone size={20} /> 0746510805
          </a>
          <a href="mailto:info@pandecup.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', padding: '15px 30px', borderRadius: '50px', fontWeight: '900', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Mail size={20} /> EMAIL US
          </a>
        </div>
      </section>
    </div>
  );
};

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const PackageCard = ({ icon, title, tier, description, quote, recommended }) => {
  const [hover, setHover] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: recommended ? 'rgba(163,230,53,0.05)' : 'rgba(255,255,255,0.02)',
        borderRadius: '30px',
        border: recommended ? '2px solid #a3e635' : '1px solid rgba(255,255,255,0.05)',
        padding: '50px 30px',
        textAlign: 'center',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: hover ? 'translateY(-15px)' : 'scale(1)',
        position: 'relative'
      }}
    >
      {recommended && (
        <span style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#a3e635', color: '#020617', padding: '5px 20px', borderRadius: '20px', fontSize: '10px', fontWeight: '900' }}>RECOMMENDED</span>
      )}
      <div style={{ color: '#a3e635', marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '5px' }}>{title}</h3>
      <p style={{ color: '#a3e635', fontSize: '12px', fontWeight: '800', letterSpacing: '2px', marginBottom: '25px' }}>{tier}</p>
      <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '30px', minHeight: '80px' }}>{description}</p>
      <p style={{ fontStyle: 'italic', color: '#cbd5e1', fontSize: '14px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>"{quote}"</p>
    </div>
  );
};

const SponsorLogo = ({ s }) => {
  const [active, setActive] = useState(false);
  return (
    <div 
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{ textAlign: 'center', cursor: 'pointer' }}
    >
      <div style={{ 
        background: 'white', 
        padding: '12px', 
        borderRadius: '15px', 
        transition: '0.4s', 
        transform: active ? 'scale(1.2)' : 'scale(1)',
        filter: active ? 'grayscale(0%)' : 'grayscale(100%) opacity(0.5)'
      }}>
        <img src={s.logo} alt={s.name} style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <p style={{ color: '#a3e635', fontSize: '10px', fontWeight: '900', marginTop: '10px', opacity: active ? 1 : 0 }}>{s.name}</p>
    </div>
  );
};

export default AboutPage;