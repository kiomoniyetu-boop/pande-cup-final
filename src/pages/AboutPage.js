import React from 'react';
import { Target, Users, ShieldCheck, Zap, Globe } from 'lucide-react';

const AboutPage = () => {
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px'
  };

  return (
    <div style={{ background: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* HERO SECTION - Emotional & Impactful */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(to bottom, rgba(163,230,53,0.05), transparent)' }}>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: '900', marginBottom: '20px', lineHeight: '1.1' }}>
          BEYOND THE <span style={{ color: '#a3e635' }}>GAME</span>
        </h1>
        <p style={{ fontSize: 'clamp(16px, 4vw, 19px)', color: '#94a3b8', maxWidth: '850px', margin: '0 auto', lineHeight: '1.7' }}>
          Pande Cup siyo ligi tu ya kutafuta mshindi; ni harakati ya kutoa **"Pande" (Opportunity)** kwa vijana wenye vipaji adimu mitaani. Tunajenga **Sense of Belonging** na umoja kwa jamii, tukiamini kuwa kila shuti lina nguvu ya kuunganisha watu na kubadilisha maisha.
        </p>
      </section>

      {/* CORE NARRATIVE - Glass Cards */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          <div style={{ ...glassStyle, padding: '32px' }}>
            <div style={{ color: '#a3e635', marginBottom: '16px' }}><Users size={36} /></div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>Umoja na Utengamano</h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
              Tunawaleta pamoja vijana na jamii inayowazunguka, tukivunja vizuizi na kutengeneza undugu. Hapa, uwanjani ndipo mahali ambapo kila mtu anajihisi yuko nyumbani.
            </p>
          </div>

          <div style={{ ...glassStyle, padding: '32px' }}>
            <div style={{ color: '#a3e635', marginBottom: '16px' }}><Zap size={36} /></div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>The Underserved Talent</h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
              Tunaangazia "Underserved Players" wa mchangani—wale wenye uwezo mkubwa lakini hawajapata jukwaa la kuonekana. Tunawapa **Visibility** inayohitajika kufikia ndoto zao.
            </p>
          </div>

          <div style={{ ...glassStyle, padding: '32px' }}>
            <div style={{ color: '#a3e635', marginBottom: '16px' }}><ShieldCheck size={36} /></div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>Economic Empowerment</h3>
            <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>
              Udhamini wako unatafsiriwa kuwa fursa za kiuchumi kwa vijana, wajasiriamali wadogo uwanjani, na kukuza **Brand Equity** ya washirika wetu ndani ya jamii.
            </p>
          </div>

        </div>
      </section>

      {/* EXPANSION & SLOGANS */}
      <section style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ ...glassStyle, padding: '50px 20px', border: '1px solid rgba(163,230,53,0.2)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '24px', color: '#a3e635' }}>Ligi Moja. Upendo Mmoja. Vumbi Moja.</h2>
          <p style={{ fontSize: '17px', color: '#94a3b8', lineHeight: '1.8', marginBottom: '32px' }}>
            Kutoka vijiji vya Kata ya Kiomoni, Tanga, hadi mitaa ya Goba, Dar es Salaam. Pande Cup ina-expand narrative yake: Hatulazimishi kuingia mjini, tunakuja na fursa, tunakuja na upendo, na tunakuja na ile vumbi ya asili ya mshikamano wa Kitanzania.
          </p>
          <div style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '2px', color: '#a3e635' }}>
            PANDE CUP: UMOJA KATIKA KILA SHUTI
          </div>
        </div>
      </section>

      {/* STATS AREA */}
      <section style={{ padding: '60px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '42px', fontWeight: '900', color: '#a3e635' }}>50+</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase' }}>Timu Zilizosajiliwa</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '42px', fontWeight: '900', color: '#a3e635' }}>2000+</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase' }}>Vijana Walioshiriki</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '42px', fontWeight: '900', color: '#a3e635' }}>5 MIJI</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase' }}>Impact Coverage</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;