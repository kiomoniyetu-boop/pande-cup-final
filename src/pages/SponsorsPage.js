import React from 'react';
import { CheckCircle2, Trophy, Star, Heart, Globe, MapPin, Zap, Store, ShoppingBag, MessageCircle } from 'lucide-react';

const SponsorsPage = () => {
  const WHATSAPP_PHONE = '+255789123456'; // Update with actual WhatsApp number
  
  const generateWhatsAppLink = (packageName, price) => {
    const messages = {
      'PLATINUM PARTNER': `Habari Pande Cup! Nahitaji maelezo zaidi kuhusu kifurushi cha PLATINUM PARTNER (${price} TZS).`,
      'GOLD PARTNER': `Habari Pande Cup! Nahitaji maelezo zaidi kuhusu kifurushi cha GOLD PARTNER (${price} TZS).`,
      'MCHONGO WA KATI': `Habari Pande Cup! Nahitaji maelezo zaidi kuhusu kifurushi cha MCHONGO WA KATI (${price} TZS).`,
      'MCHONGO WA MTAANI': `Habari Pande Cup! Nahitaji maelezo zaidi kuhusu kifurushi cha MCHONGO WA MTAANI (${price} TZS).`,
      'WEWE NI MDAU WETU': `Habari! Nataka kuwa mdau wa Pande Cup kwa kifurushi cha ${price} TZS.`
    };
    const message = messages[packageName] || `Habari Pande Cup! Ningependa kujua kuhusu ${packageName}.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_PHONE.replace('+', '')}?text=${encodedMessage}`;
  };
  
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px'
  };

  const corporatePackages = [
    {
      name: 'PLATINUM PARTNER',
      price: '10,000,000+',
      color: '#E5E4E2',
      icon: <Trophy size={22} color="#E5E4E2" />,
      benefits: [
        'Branding kuu kwenye Jezi za timu ZOTE 20',
        'Headline placement katika kampeni zote za matangazo',
        'Social Media dominance: 50,000+ Engagement kidijitali',
        'Strategic Access: Soko la Tanga na Dar es Salaam live',
        'Digital Rights ya PC TV highlights na maudhui yote'
      ]
    },
    {
      name: 'GOLD PARTNER',
      price: '5,000,000',
      color: '#FFD700',
      icon: <Star size={22} color="#FFD700" />,
      benefits: [
        'Branding kwenye Jezi za timu shiriki za Fainali',
        'Premium Pitch-side banners uwanja wa Goba na Kiomoni',
        'Nafasi ya kutoa zawadi kuu mbele ya viongozi na wadau',
        'Brand feature maalum kwenye kurasa zetu rasmi',
        'Logo placement kwenye kila video ya matangazo'
      ]
    }
  ];

  const communityPackages = [
    {
      name: 'MCHONGO WA KATI',
      price: '1,000,000',
      color: '#a3e635',
      icon: <Store size={18} />,
      benefits: ['Banner uwanjani msimu mzima', 'Shoutout kwenye Social Media (Post 3)', 'Nafasi ya kuanzisha duka la muda uwanjani']
    },
    {
      name: 'MCHONGO WA MTAANI',
      price: '500,000',
      color: '#cbd5e1',
      icon: <ShoppingBag size={18} />,
      benefits: ['Logo kwenye bango la pamoja la washirika', 'Mention kwenye PC TV highlights', 'Shoutout kwenye Instagram Story']
    },
    {
      name: 'WEWE NI MDAU WETU',
      price: '250,000',
      color: '#94a3b8',
      icon: <Heart size={18} />,
      benefits: ['Logo kwenye ukuta wa wadau (Community Wall)', 'Shoutout ya pamoja kwenye kurasa zetu', 'Cheti rasmi cha uthamini wa jamii']
    }
  ];

  return (
    <div style={{ background: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif', paddingBottom: '100px' }}>
      
      {/* Header - No asterisks here */}
      <section style={{ padding: '80px 20px 50px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(163,230,53,0.08)', padding: '8px 16px', borderRadius: '40px', marginBottom: '24px' }}>
          <Globe size={14} color="#a3e635" />
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#a3e635', letterSpacing: '1.5px', textTransform: 'uppercase' }}>National Visibility • Local Impact</span>
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: '900', marginBottom: '24px', lineHeight: '1.1' }}>
          DOMINATE THE <span style={{ color: '#a3e635' }}>MARKET</span>
        </h2>
        <h3 style={{ fontSize: '22px', fontWeight: '900', marginBottom: '20px', color: 'white', lineHeight: '1.3' }}>
          Pande Cup: Daraja Lako la Dhahabu Kati ya Dar na Tanga.
        </h3>
        <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '900px', margin: '0 auto', lineHeight: '1.8' }}>
          Usisubiri kesho uonekane mgeni. Pande Cup inakupa ufunguo wa soko la mikoani lenye watu zaidi ya 50,000 wanaofuatilia msisimko huu kila msimu kupitia <span style={{ fontWeight: '900', color: '#a3e635' }}>tovuti yetu rasmi</span>, PC TV, na mitandao yetu ya kijamii. Huu sio uthamini tu; ni uwekezaji kwenye jamii unaojenga brand yako ndani ya mioyo ya watu. Weka brand yako pale macho ya maelfu yanapotazama—mtaani, viwanjani, na kiganjani.
        </p>
      </section>

      {/* Statistics Bar */}
      <section style={{ padding: '50px 20px', background: 'rgba(163, 230, 53, 0.05)', borderTop: '1px solid rgba(163, 230, 53, 0.2)', borderBottom: '1px solid rgba(163, 230, 53, 0.2)', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: '#a3e635', marginBottom: '8px' }}>50K+</div>
            <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Reach (Mwezi)</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: '#a3e635', marginBottom: '8px' }}>24/7</div>
            <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Visibility (Tovuti)</div>
          </div>
          <div>
            <div style={{ fontSize: '32px', fontWeight: '900', color: '#a3e635', marginBottom: '8px' }}>100%</div>
            <div style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600' }}>Community Support (CSR)</div>
          </div>
        </div>
      </section>
      <section style={{ padding: '0 20px 80px', maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {[
          { icon: <MapPin />, title: "Two Regions, One Vibe", desc: "Visibility ya kudumu kwenye masoko ya kimkakati ya Tanga na Dar es Salaam." },
          { icon: <Zap />, title: "Digital Domination", desc: "Engagement ya uhakika kupitia PC TV na mitandao ya kijamii msimu mzima." },
          { icon: <Heart />, title: "Sense of Belonging", desc: "Jenga uaminifu kwa kuunganisha chapa yako na hisia za dhati za jamii." }
        ].map((item, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ color: '#a3e635', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
            <h4 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '12px' }}>{item.title}</h4>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Corporate Partnerships */}
      <section style={{ padding: '0 20px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <h3 style={{ color: '#a3e635', fontSize: '13px', fontWeight: '900', letterSpacing: '2px', textAlign: 'center', marginBottom: '40px', textTransform: 'uppercase' }}>Corporate Partnerships</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {corporatePackages.map((pkg, idx) => (
            <div key={idx} style={{ ...glassStyle, padding: '48px', borderTop: `4px solid ${pkg.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                {pkg.icon}
                <h3 style={{ fontSize: '15px', fontWeight: '900', letterSpacing: '0.5px' }}>{pkg.name}</h3>
              </div>
              <div style={{ fontSize: '34px', fontWeight: '900', marginBottom: '32px' }}>{pkg.price} <span style={{ fontSize: '14px', color: '#64748b' }}>TZS</span></div>
              <div style={{ marginBottom: '40px' }}>
                {pkg.benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'start' }}>
                    <CheckCircle2 size={16} color="#a3e635" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.5' }}>{benefit}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => window.open(generateWhatsAppLink(pkg.name, pkg.price), '_blank')}
                style={{ 
                  width: '100%', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  background: idx === 0 ? '#a3e635' : 'white', 
                  color: 'black', 
                  border: 'none', 
                  fontWeight: '900', 
                  cursor: 'pointer', 
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: idx === 0 ? '0 0 0 0px rgba(163, 230, 53, 0.5)' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 20px 4px rgba(163, 230, 53, 0.6)';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = idx === 0 ? '0 0 0 0px rgba(163, 230, 53, 0.5)' : 'none';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <MessageCircle size={16} />
                GET FULL VISIBILITY
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SME / Community Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <h3 style={{ color: '#a3e635', fontSize: '13px', fontWeight: '900', letterSpacing: '2px', textAlign: 'center', marginBottom: '40px', textTransform: 'uppercase' }}>Biashara Ndogo na Wadau</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {communityPackages.map((pkg, idx) => (
            <div key={idx} style={{ ...glassStyle, padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                {pkg.icon}
                <h3 style={{ fontSize: '13px', fontWeight: '800' }}>{pkg.name}</h3>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '900', marginBottom: '20px', color: '#a3e635' }}>{pkg.price} <span style={{ fontSize: '12px', color: '#64748b' }}>TZS</span></div>
              <div style={{ minHeight: '120px' }}>
                {pkg.benefits.map((benefit, i) => (
                  <p key={i} style={{ fontSize: '13px', color: '#94a3b8', margin: '10px 0', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#a3e635' }}>•</span> {benefit}
                  </p>
                ))}
              </div>
              <button 
                onClick={() => window.open(generateWhatsAppLink(pkg.name, pkg.price), '_blank')}
                style={{ 
                  width: '100%', 
                  marginTop: '24px', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  background: 'rgba(255,255,255,0.04)', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  color: 'white', 
                  fontSize: '12px', 
                  fontWeight: '800', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 15px 3px rgba(163, 230, 53, 0.5)';
                  e.target.style.borderColor = '#a3e635';
                  e.target.style.color = '#a3e635';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = 'none';
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <MessageCircle size={14} />
                WEKEZA SASA
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '80px 20px 0' }}>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>Unahitaji mchanganuo kamili wa ushirikiano?</p>
        <a href="mailto:pandecup2023@gmail.com" style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
          pandecup2023@gmail.com
        </a>
      </footer>
    </div>
  );
};

export default SponsorsPage;