import React, { useState, useRef } from "react";
import { Trophy, Megaphone, Users, Target, Heart, Phone, Mail } from "lucide-react";

/**
 * Design Philosophy: Youthful, Energetic, Fully Responsive (Mobile + Desktop)
 * Colors: Deep Navy (#020617), Lime Green (#a3e635), White text
 * Background: Dusty football pitch with transparent overlay
 * Structure: Complete pitch + ROI + 5 sponsorship tiers
 */

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

      {/* ENGAGEMENT LABEL */}
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

      {/* PERKS */}
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

      {/* OMBA MUONGOZO BUTTON */}
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

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
      {/* Dark overlay for readability */}
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

      {/* Content wrapper */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ==================== SECTION 1: HERO & THE HOOK ==================== */}
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

        {/* ==================== SECTION 2: THE ROI ==================== */}
        <section
          style={{
            padding: "clamp(28px, 8vw, 48px) clamp(16px, 5vw, 32px)",
            backgroundColor: "rgba(5, 10, 24, 0.6)",
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
              {/* ROI Card 1 */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  padding: "clamp(14px, 4vw, 20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <Trophy
                    size={24}
                    style={{ color: "#a3e635", marginTop: "2px", flexShrink: 0 }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(12px, 3vw, 14px)",
                        fontWeight: "900",
                        color: "#a3e635",
                        marginBottom: "6px",
                      }}
                    >
                      BRAND DOMINANCE
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(11px, 2.5vw, 13px)",
                        color: "#cbd5e1",
                        lineHeight: "1.5",
                      }}
                    >
                      Logo yako inakaa kwenye vifua vya wachezaji na mabango ya uwanjani. Hupotei.
                    </p>
                  </div>
                </div>
              </div>

              {/* ROI Card 2 */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  padding: "clamp(14px, 4vw, 20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <Megaphone
                    size={24}
                    style={{ color: "#a3e635", marginTop: "2px", flexShrink: 0 }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(12px, 3vw, 14px)",
                        fontWeight: "900",
                        color: "#a3e635",
                        marginBottom: "6px",
                      }}
                    >
                      DIGITAL FUJO
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(11px, 2.5vw, 13px)",
                        color: "#cbd5e1",
                        lineHeight: "1.5",
                      }}
                    >
                      Content zetu zinaenda viral. Tunakupa mileage ya bure Social Media.
                    </p>
                  </div>
                </div>
              </div>

              {/* ROI Card 3 */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  padding: "clamp(14px, 4vw, 20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <Users
                    size={24}
                    style={{ color: "#a3e635", marginTop: "2px", flexShrink: 0 }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(12px, 3vw, 14px)",
                        fontWeight: "900",
                        color: "#a3e635",
                        marginBottom: "6px",
                      }}
                    >
                      DIRECT SALES
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(11px, 2.5vw, 13px)",
                        color: "#cbd5e1",
                        lineHeight: "1.5",
                      }}
                    >
                      Weka banda uwanjani, uza bidhaa kwa maelfu ya mashabiki kila wiki.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SECTION 3: THE 5 TIERS ==================== */}
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
              {/* TIER 1: MWAMBA WA MTAA */}
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

              {/* TIER 2: GOLD PARTNER */}
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

              {/* TIER 3: SILVER (SME) */}
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

              {/* TIER 4: BRONZE (MTAA) */}
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

              {/* TIER 5: MDAU WETU */}
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

        {/* ==================== SECTION 4: CALL TO ACTION ==================== */}
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
                href="tel:0746510805"
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
                }}
              >
                <Phone size={18} /> 0746510805
              </a>
              <a
                href="mailto:info@pandecup.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.08)",
                  color: "#a3e635",
                  padding: "clamp(10px, 3vw, 14px) clamp(14px, 4vw, 20px)",
                  borderRadius: "10px",
                  fontWeight: "900",
                  textDecoration: "none",
                  fontSize: "clamp(12px, 3vw, 14px)",
                  border: "1px solid rgba(163,230,53,0.3)",
                }}
              >
                <Mail size={18} /> EMAIL US
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SponsorsPage;
