import React, { useState, useEffect } from 'react';
import { ShieldCheck, Globe, Zap, Heart, MapPin, TrendingUp, Users } from 'lucide-react';

const AboutPage = () => {

  const FALLBACK_SPONSORS = [
    { name: 'VODACOM', logo: '/images/vodacom.png', link: 'https://www.vodacom.co.tz' },
    { name: 'CRDB BANK', logo: '/images/crdb.png', link: 'https://www.crdbbank.co.tz' },
    { name: 'YAS', logo: '/images/yas.png', link: 'https://yastz.com' },
    { name: 'POLISI TANZANIA', logo: '/images/polisi.png', link: 'https://www.polisi.go.tz' },
    { name: 'AZAM TV', logo: '/images/azam.png', link: 'https://www.azam.co.tz' },
  ];

  const [sponsors, setSponsors] = useState(FALLBACK_SPONSORS);

  useEffect(() => {
    // Try to get sponsors from window.cmsData if available (as in HomePage.js)
    if (window && window.cmsData && Array.isArray(window.cmsData.sponsors) && window.cmsData.sponsors.length > 0) {
      const contentfulSponsors = window.cmsData.sponsors.map(s => {
        const fields = s.fields || {};
        return {
          name: fields.name || s.name || '',
          logo: fields.logo || s.logo || '',
          link: fields.link || fields.websiteUrl || s.link || '',
        };
      });
      setSponsors(contentfulSponsors);
    }
  }, []);

  return (
    <div style={{ background: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* 1. SLOGAN BAR - BRAND CONSISTENCY */}
      <div style={{ background: '#a3e635', padding: '12px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '60px', whiteSpace: 'nowrap', animation: 'marqueeAbout 25s linear infinite' }}>
          {[1, 2, 3].map((i) => (
            <span key={i} style={{ color: 'black', fontWeight: '900', fontSize: '11px', letterSpacing: '2px' }}>
              LIGI MOJA • UPENDO MMOJA • VUMBI MOJA • LIGI MOJA • UPENDO MMOJA • VUMBI MOJA •
            </span>
          ))}
        </div>
      </div>

      {/* 2. HERO SECTION - REFINED "NIPE PANDE" */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(163,230,53,0.08)', padding: '8px 16px', borderRadius: '40px', marginBottom: '24px', border: '1px solid rgba(163,230,53,0.2)' }}>
          <ShieldCheck size={14} color="#a3e635" />
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#a3e635', letterSpacing: '2px', textTransform: 'uppercase' }}>Established 2023 • Tanga to Dar</span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.8rem)', fontWeight: '900', fontStyle: 'italic', lineHeight: '0.9', letterSpacing: '-2px', textTransform: 'uppercase', marginBottom: '20px' }}>
          NIPE <span style={{ color: '#a3e635' }}>PANDE.</span>
        </h1>
          <div style={{ display: 'inline-block', background: 'rgba(2,6,23,0.92)', color: 'white', padding: '12px 32px', borderRadius: '30px', marginTop: '10px', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.18)' }}>
            <span style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '5px', fontStyle: 'italic' }}>
              The Dust. The Stage. The Future.
            </span>
          </div>
      </section>

      {/* 3. LOGO SECTION - THE HOVER FIX (Individual State) */}
      <section style={{ padding: '40px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28, marginTop: -18 }}>
          <span style={{ fontSize: 12, color: '#cbd5e1', fontWeight: 600, letterSpacing: 2, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
            WANAOTUPA PANDE MSIMU HUU
          </span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          {sponsors.map((s, idx) => (
            <a
              key={idx}
              href={s.link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', minWidth: 100, textDecoration: 'none' }}
            >
              <img
                src={s.logo}
                alt={s.name}
                style={{
                  height: '32px',
                  width: 'auto',
                  filter: 'grayscale(100%)',
                  opacity: 0.7,
                  transition: 'all 0.4s ease',
                  borderRadius: 8,
                  background: 'white',
                  padding: 0,
                  marginBottom: 4,
                  boxShadow: 'none',
                  border: 'none',
                }}
                onMouseOver={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1'; }}
                onMouseOut={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.7'; }}
                onError={e => { e.target.onerror = null; e.target.src = '/images/placeholder.png'; }}
              />
              <span style={{ fontSize: '10px', fontWeight: '900', color: '#a3e635', opacity: 1, transition: '0.3s', textAlign: 'center' }}>{s.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* 4. THE GROK STORY - REAL DEPTH */}
      <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '36px' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 18, padding: '32px 24px', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)', maxWidth: 700, width: '100%', margin: '0 auto' }}>
            <h3 style={{ color: '#a3e635', fontWeight: 800, fontSize: 18, textAlign: 'center', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>The Dust of Kiomoni</h3>
            <p style={{ color: '#cbd5e1', fontSize: 16, lineHeight: 1.7, textAlign: 'center', margin: 0 }}>
              In 2023, the streets of Kiomoni, Tanga were loud with nothing. No jobs, no scouts. Just raw talent kicking balls made of plastic bags under the sun. Pande Cup was born as a <strong>movement</strong> to refuse that silence.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 18, padding: '32px 24px', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.10)', maxWidth: 700, width: '100%', margin: '0 auto' }}>
            <h3 style={{ color: '#a3e635', fontWeight: 800, fontSize: 18, textAlign: 'center', marginBottom: 12, letterSpacing: 1, textTransform: 'uppercase' }}>The Traveling Circus</h3>
            <p style={{ color: '#cbd5e1', fontSize: 16, lineHeight: 1.7, textAlign: 'center', margin: 0 }}>
              What began in one ward is now crossing borders. From crowning champions in Tanga 2025 to landing in Goba, Dar es Salaam 2026. We take our kids from the vumbi to the <strong>National Stage</strong>.
            </p>
          </div>

          <div style={{ gridColumn: '1 / -1', padding: '50px', background: 'rgba(163,230,53,0.03)', borderRadius: '30px', border: '1px solid rgba(163,230,53,0.1)', textAlign: 'center' }}>
            <h4 style={{ fontSize: '22px', fontWeight: '800', fontStyle: 'italic', marginBottom: '15px' }}>
              "Nipe Pande means: Give me a future."
            </h4>
            <p style={{ color: '#cbd5e1', fontSize: '16px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7' }}>
              We don’t just play football. We build economies. We turn Sunday dust into Monday opportunities, bridging street credibility with corporate scale.
            </p>
          </div>
        </div>
      </section>

      {/* 4. IMPACT SECTION (THE SOUL) */}
      <section style={{ padding: '40px 20px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center', marginBottom: '50px', fontStyle: 'italic' }}>BEYOND THE <span style={{ color: '#a3e635' }}>90 MINUTES</span></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '32px 24px', background: 'rgba(2,6,23,0.92)', borderRadius: '22px', border: '1px solid #a3e635', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.18)', color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '18px', width: '100%' }}>
              <MapPin size={32} color="#a3e635" />
            </div>
            <h5 style={{ fontWeight: '900', marginBottom: '12px', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>MTAA UNATULIA</h5>
            <p style={{ fontSize: '14px', color: 'white', lineHeight: '1.7', fontWeight: '400' }}>Kijana akipewa Pande, uhalifu unakosa nafasi. Tunabadilisha vijiwe kuwa viwanja vya nidhamu na malengo.</p>
          </div>

          <div style={{ padding: '32px 24px', background: 'rgba(2,6,23,0.92)', borderRadius: '22px', border: '1px solid #a3e635', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.18)', color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '18px', width: '100%' }}>
              <Users size={32} color="#a3e635" />
            </div>
            <h5 style={{ fontWeight: '900', marginBottom: '12px', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>SENSE OF BELONGING</h5>
            <p style={{ fontSize: '14px', color: 'white', lineHeight: '1.7', fontWeight: '400' }}>Ligi Moja, Upendo Mmoja. Tunatengeneza familia kwa vijana ambao hapo awali walionekana hawana thamani.</p>
          </div>

          <div style={{ padding: '32px 24px', background: 'rgba(2,6,23,0.92)', borderRadius: '22px', border: '1px solid #a3e635', boxShadow: '0 2px 16px 0 rgba(0,0,0,0.18)', color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '18px', width: '100%' }}>
              <TrendingUp size={32} color="#a3e635" />
            </div>
            <h5 style={{ fontWeight: '900', marginBottom: '12px', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase' }}>UCHUMI WA MTAANI</h5>
            <p style={{ fontSize: '14px', color: 'white', lineHeight: '1.7', fontWeight: '400' }}>Kuanzia Mama Lishe hadi Bodaboda; Pande Cup ni injini ya fedha inayozunguka ndani ya jamii yetu msimu mzima.</p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marqueeAbout {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

// SUB-COMPONENT FOR LOGOS (This fixes the hover issue)
const SponsorLogo = ({ s }) => {
  const [active, setActive] = useState(false);
  return (
    <div 
      onMouseEnter={() => setActive(true)} 
      onMouseLeave={() => setActive(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: '0.3s' }}
    >
      <img 
        src={s.logo} 
        alt={s.name} 
        style={{ 
          height: '32px', 
          width: 'auto', 
          filter: active ? 'grayscale(0%)' : 'grayscale(100%)', 
          opacity: active ? '1' : '0.4',
          transition: 'all 0.4s ease',
          transform: active ? 'scale(1.1)' : 'scale(1)'
        }} 
      />
      <span style={{ fontSize: '10px', fontWeight: '900', color: '#a3e635', opacity: active ? 1 : 0, transition: '0.3s' }}>
        {s.name}
      </span>
    </div>
  );
};

export default AboutPage;
