import React, { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  Trophy, Megaphone, Users, Target, Heart, Phone, Mail,
  Menu, X, MapPin, Instagram, Facebook, Youtube
} from "lucide-react";

const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/",
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const PackageCard = ({
  icon,
  title,
  label,
  tier,
  perks,
  recommended = false,
  onGetQuote,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: recommended
          ? "rgba(163,230,53,0.08)"
          : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "16px",
        border: recommended
          ? "2px solid #a3e635"
          : "1px solid rgba(255,255,255,0.08)",
        padding: "clamp(16px, 5vw, 24px)",
        textAlign: "center",
        transition: "all 0.3s ease",
        transform: hover ? "translateY(-8px)" : "scale(1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: hover ? "0 20px 60px -10px rgba(163,230,53,0.3)" : "0 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      {recommended && (
        <span
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#a3e635",
            color: "#020617",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "clamp(8px, 2vw, 10px)",
            fontWeight: "900",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
          }}
        >
          RECOMMENDED
        </span>
      )}
      <div
        style={{
          color: "#a3e635",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "clamp(14px, 4vw, 18px)",
          fontWeight: "900",
          marginBottom: "4px",
          fontFamily: "Oswald, sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "#a3e635",
          fontSize: "clamp(9px, 2vw, 11px)",
          fontWeight: "800",
          letterSpacing: "0.5px",
          marginBottom: "8px",
        }}
      >
        {tier}
      </p>

      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            display: "inline-block",
            background: "#a3e635",
            color: "#020617",
            padding: "5px 10px",
            borderRadius: "14px",
            fontSize: "clamp(9px, 2vw, 11px)",
            fontWeight: "900",
            letterSpacing: "0.5px",
          }}
        >
          {label}
        </span>
      </div>

      <div
        style={{
          flex: 1,
          marginBottom: "12px",
          textAlign: "left",
        }}
      >
        {perks.map((perk, idx) => (
          <p
            key={idx}
            style={{
              color: "#cbd5e1",
              fontSize: "clamp(10px, 2.5vw, 12px)",
              lineHeight: "1.6",
              marginBottom: "6px",
            }}
          >
            {perk}
          </p>
        ))}
      </div>

      <button
        onClick={onGetQuote}
        style={{
          background: "#a3e635",
          color: "#020617",
          border: "none",
          padding: "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px)",
          borderRadius: "10px",
          fontWeight: "900",
          fontSize: "clamp(10px, 2.5vw, 12px)",
          letterSpacing: "0.5px",
          cursor: "pointer",
          transition: "all 0.2s ease",
          width: "100%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#8bc925";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#a3e635";
        }}
      >
        OMBA MUONGOZO
      </button>
    </div>
  );
};

const SponsorsPage = () => {
  const contactRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.scrollTo(0, 0);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Wadhamini - Pande Cup | Invest in Grassroots Football</title>
        <meta name="description" content="Partner with Pande Cup - Strategic sponsorship opportunities for brands targeting Gen Z & Millennials in Tanzania." />
      </Helmet>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700;900&family=Inter:wght@400;600;700;800;900&display=swap');
          body { margin: 0; padding: 0; }
          .nav-glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(15,23,42,0.85) !important; }
          .nav-link { color: #94a3b8; text-decoration: none; font-size: 13px; font-weight: 600; text-transform: uppercase; transition: color 0.2s; }
          .nav-link:hover { color: #a3e635; }
          .desktop-only { display: flex; gap: 24px; align-items: center; }
          @media (max-width: 768px) { .desktop-only { display: none !important; } }
        `}
      </style>

      <div
        style={{
          backgroundColor: "#020617",
          color: "#fff",
          minHeight: "100vh",
          fontFamily: "Inter, system-ui, sans-serif",
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/JmLymlOQ4Xh34kMZAEJn2l/sandbox/my8SQS72gRGDYun8sWfilz-img-1_1770988364000_na1fn_ZHVzdHktcGl0Y2gtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvSm1MeW1sT1E0WGgzNGtNWkFFSm4ybC9zYW5kYm94L215OFNRUzcyZ1JHRFl1bjhzV2ZpbHotaW1nLTFfMTc3MDk4ODM2NDAwMF9uYTFmbl9aSFZ6ZEhrdGNHbDBZMmd0WW1jLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dvtBHnNBefMIJdMpmYI4wtb0kN6~bipTXYdniNuBPr8moSu870-3as61g3p-8xUYbm~~G-9v2xzoThq5tXVwhHG7Z6FAp4itKkVLjV~eJjM-vrJJ9Q-N04pVlXX~WekvnmWT334I1GYk-bCkcMmNeaV2OypPGeRVrbKkAG318TIXBpnLfvvR4NBzUq0N2mdOEmzYhj0dq3AvkCefU6rNxrLUrjoZBBdxJQUWTq4A~ef98sEycnOwFUZjgMKQKko5eTQ5PtQJPjjAt7QTOQyT8z5XD~1zlOpAWHubk5KWumGwGPlEiqagpzmfO7BD-drwmiVFdj-gPRJsk2btWYUfeA__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          position: "relative",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(2, 6, 23, 0.85)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* NAVIGATION */}
        <nav className="nav-glass" style={{ padding: '10px 0', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={LOGO_PATH} alt="Logo" style={{ height: isMobile ? '35px' : '45px', filter: 'drop-shadow(0 0 8px rgba(163,230,53,0.3))' }} />
            </Link>
            <div className="desktop-only">
              <Link to="/" className="nav-link">Nyumbani</Link>
              <Link to="/news" className="nav-link">Habari</Link>
              <Link to="/fixtures" className="nav-link">Ratiba</Link>
              <Link to="/pctv" className="nav-link">PC TV</Link>
              <Link to="/sponsors" className="nav-link" style={{ color: '#a3e635' }}>Wadhamini</Link>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <>
            <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 199, backdropFilter: 'blur(4px)' }} />
            <div style={{ position: 'fixed', top: 0, right: 0, width: '85%', maxWidth: '320px', height: '100vh', backgroundColor: '#0f172a', zIndex: 200, padding: '80px 24px 32px', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>Nyumbani</Link>
                <Link to="/news" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>Habari</Link>
                <Link to="/fixtures" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>Ratiba</Link>
                <Link to="/pctv" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ fontSize: '18px' }}>PC TV</Link>
                <Link to="/sponsors" onClick={() => setIsMobileMenuOpen(false)} className="nav-link" style={{ color: '#a3e635', fontSize: '18px' }}>Wadhamini</Link>
              </div>
            </div>
          </>
        )}

        {/* Content wrapper */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* HERO & THE HOOK */}
          <section
            style={{
              padding: "clamp(28px, 8vw, 48px) clamp(16px, 5vw, 32px)",
              maxWidth: 1200,
              margin: "0 auto",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "clamp(20px, 5vw, 32px)" }}>
              <h1
                style={{
                  fontSize: "clamp(1.6rem, 6vw, 3rem)",
                  fontWeight: "900",
                  fontStyle: "italic",
                  color: "#fff",
                  marginBottom: "clamp(6px, 2vw, 12px)",
                  lineHeight: 1.1,
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                KWANINI UTUPE <span style={{ color: "#a3e635" }}>PANDE?</span>
              </h1>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "clamp(12px, 3vw, 20px)",
              }}
            >
              <div
                style={{
                  background: "rgba(163,230,53,0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(163,230,53,0.2)",
                  borderRadius: "12px",
                  padding: "clamp(14px, 4vw, 20px)",
                }}
              >
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "clamp(12px, 3vw, 14px)",
                    lineHeight: "1.7",
                    marginBottom: "12px",
                  }}
                >
                  <strong style={{ color: "#a3e635" }}>Huu sio msaada.</strong> Ni Strategic Partnership inayokuunganisha na soko la vijana 50,000+ kutoka Tanga mpaka Dar es Salaam.
                </p>
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "clamp(12px, 3vw, 14px)",
                    lineHeight: "1.7",
                  }}
                >
                  <strong style={{ color: "#a3e635" }}>Usidhamini tu mechi, Miliki Mtaa.</strong> Pande Cup inakupa 'Direct Access' kwa kizazi cha Digital (Gen Z & Millennials) ambao hawaangalii TV—wapo viwanjani Kiomoni na Goba, na wapo online.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "12px",
                  padding: "clamp(14px, 4vw, 20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "clamp(12px, 3vw, 14px)",
                    lineHeight: "1.7",
                  }}
                >
                  Tunabadilisha 'Vumbi' kuwa Thamani. Tunajenga nidhamu, ajira, na vipaji. Brand yako inapata heshima ya kuwa sehemu ya suluhisho. <strong style={{ color: "#a3e635" }}>Wape Pande. Wape Njia.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* THE ROI */}
          <section
            style={{
              padding: "clamp(28px, 8vw, 48px) clamp(16px, 5vw, 32px)",
              backgroundColor: "rgba(5, 10, 24, 0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.1rem, 5vw, 1.5rem)",
                  fontWeight: "900",
                  textAlign: "center",
                  color: "#a3e635",
                  marginBottom: "clamp(16px, 4vw, 28px)",
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                What's in it for You?
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "clamp(12px, 3vw, 20px)",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "12px",
                    padding: "clamp(14px, 4vw, 20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Trophy size={24} style={{ color: "#a3e635", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "900", color: "#a3e635", marginBottom: "6px" }}>
                        BRAND DOMINANCE
                      </h3>
                      <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#cbd5e1", lineHeight: "1.5" }}>
                        Logo yako inakaa kwenye vifua vya wachezaji na mabango ya uwanjani. Hupotei.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "12px",
                    padding: "clamp(14px, 4vw, 20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Megaphone size={24} style={{ color: "#a3e635", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "900", color: "#a3e635", marginBottom: "6px" }}>
                        DIGITAL FUJO
                      </h3>
                      <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#cbd5e1", lineHeight: "1.5" }}>
                        Content zetu zinaenda viral. Tunakupa mileage ya bure Social Media.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "12px",
                    padding: "clamp(14px, 4vw, 20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <Users size={24} style={{ color: "#a3e635", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "900", color: "#a3e635", marginBottom: "6px" }}>
                        DIRECT SALES
                      </h3>
                      <p style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#cbd5e1", lineHeight: "1.5" }}>
                        Weka banda uwanjani, uza bidhaa kwa maelfu ya mashabiki kila wiki.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* THE 5 TIERS */}
          <section
            style={{
              padding: "clamp(28px, 8vw, 48px) clamp(16px, 5vw, 32px)",
            }}
          >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.1rem, 5vw, 1.5rem)",
                  fontWeight: "900",
                  textAlign: "center",
                  color: "#a3e635",
                  marginBottom: "clamp(16px, 4vw, 28px)",
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                VIFURUSHI (Sponsorship Tiers)
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "clamp(12px, 3vw, 20px)",
                }}
              >
                <PackageCard
                  icon={<Trophy size={32} />}
                  title="MWAMBA WA MTAA"
                  label="EXCLUSIVE PARTNERSHIP"
                  tier="Title Sponsor"
                  perks={[
                    "✅ Naming Rights za Mashindano yote",
                    "✅ Logo kubwa mbele ya Jezi za timu ZOTE",
                    "✅ Exclusive VIP Branding kwenye Fainali",
                    "✅ Access ya Database yote ya wachezaji",
                  ]}
                  recommended={false}
                  onGetQuote={scrollToContact}
                />

                <PackageCard
                  icon={<Megaphone size={32} />}
                  title="GOLD PARTNER"
                  label="PREMIUM MILEAGE"
                  tier="Corporate"
                  perks={[
                    "✅ Logo kwenye mkono wa Jezi",
                    "✅ Mabango 10 ya kuzunguka uwanja",
                    "✅ Brand Mention kila goli likifungwa",
                    "✅ 30 Days Social Media Campaign",
                  ]}
                  recommended={true}
                  onGetQuote={scrollToContact}
                />

                <PackageCard
                  icon={<Users size={32} />}
                  title="SILVER (SME)"
                  label="MARKET GROWTH"
                  tier="Growing Brands"
                  perks={[
                    "✅ Banda la kuuzia bidhaa uwanjani",
                    "✅ Matangazo ya MC wakati wa mechi",
                    "✅ Logo kwenye Website na Posters",
                  ]}
                  recommended={false}
                  onGetQuote={scrollToContact}
                />

                <PackageCard
                  icon={<Target size={32} />}
                  title="BRONZE (MTAA)"
                  label="COMMUNITY VISIBILITY"
                  tier="Local Business"
                  perks={[
                    "✅ Bango moja uwanjani",
                    "✅ Shout-out kwenye Social Media",
                  ]}
                  recommended={false}
                  onGetQuote={scrollToContact}
                />

                <PackageCard
                  icon={<Heart size={32} />}
                  title="MDAU WETU"
                  label="INDIVIDUAL IMPACT"
                  tier="Community Hero"
                  perks={[
                    "✅ Jina lako kwenye orodha ya Marafiki",
                    "✅ Cheti cha Shukrani",
                    "✅ Tiketi ya VIP Fainali",
                  ]}
                  recommended={false}
                  onGetQuote={scrollToContact}
                />
              </div>
            </div>
          </section>

          {/* CALL TO ACTION */}
          <section
            ref={contactRef}
            style={{
              padding: "clamp(28px, 8vw, 48px) clamp(16px, 5vw, 32px)",
              textAlign: "center",
              background: "linear-gradient(to top, rgba(163,230,53,0.08), transparent)",
              scrollMarginTop: "60px",
            }}
          >
            <div style={{ maxWidth: 600, margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "clamp(1.2rem, 5vw, 1.6rem)",
                  fontWeight: "900",
                  marginBottom: "clamp(8px, 2vw, 12px)",
                  color: "#a3e635",
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                TAYARI KUKUZA BRAND YAKO?
              </h2>
              <p
                style={{
                  color: "#cbd5e1",
                  marginBottom: "clamp(16px, 4vw, 24px)",
                  fontSize: "clamp(12px, 3vw, 14px)",
                }}
              >
                Fursa kama hii haijirudii. Tupe Pande, tukupe Soko.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "clamp(10px, 3vw, 16px)",
                }}
              >
                <a
                  href="tel:+255653292935"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "#a3e635",
                    color: "#020617",
                    padding: "clamp(10px, 3vw, 14px) clamp(14px, 4vw, 20px)",
                    borderRadius: "10px",
                    fontWeight: "900",
                    textDecoration: "none",
                    fontSize: "clamp(12px, 3vw, 14px)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#8bc925"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#a3e635"}
                >
                  <Phone size={18} /> 0653 292 935
                </a>
                <a
                  href="mailto:pandecup2023@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                    color: "#a3e635",
                    padding: "clamp(10px, 3vw, 14px) clamp(14px, 4vw, 20px)",
                    borderRadius: "10px",
                    fontWeight: "900",
                    textDecoration: "none",
                    fontSize: "clamp(12px, 3vw, 14px)",
                    border: "1px solid rgba(163,230,53,0.3)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(163,230,53,0.1)";
                    e.currentTarget.style.borderColor = "#a3e635";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.borderColor = "rgba(163,230,53,0.3)";
                  }}
                >
                  <Mail size={18} /> EMAIL US
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(163,230,53,0.1)', padding: isMobile ? '40px 20px 24px' : '50px 24px 30px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: isMobile ? '24px' : '32px' }}>
            <div>
              <img src={LOGO_PATH} alt="Logo" style={{ height: '40px', marginBottom: '16px', filter: 'drop-shadow(0 0 8px rgba(163,230,53,0.3))' }}/>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', maxWidth: '300px' }}>
                Zaidi ya soka, hii ni harakati. Ligi Moja, Upendo Mmoja.
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><Instagram size={20} /></a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><Facebook size={20} /></a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><TikTokIcon size={20} /></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{ color: '#cbd5e1', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}><Youtube size={20} /></a>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '16px' }}>Mawasiliano</h4>
              <div style={{ color: '#94a3b8', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span style={{display: 'flex', gap: '8px'}}><Phone size={16} color="#a3e635"/> +255 653 292 935</span>
                <span style={{display: 'flex', gap: '8px'}}><Mail size={16} color="#a3e635"/> pandecup2023@gmail.com</span>
                <span style={{display: 'flex', gap: '8px'}}><MapPin size={16} color="#a3e635"/> The Root, Kiomoni & Goba</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: isMobile ? '30px' : '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '12px' }}>
            © 2026 Pande Cup. All Rights Reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default SponsorsPage;