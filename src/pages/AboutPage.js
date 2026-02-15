import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';

const AboutPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // --- BADILISHA HAPA ---
  // Hii ni link ya picha ya vumbi/silhouette (African vibe).
  // Ikiwa unayo picha yako kali ya Pande Cup kutoka kwenye PC,
  // 1. Weka picha hiyo kwenye folder la 'public/images'
  // 2. Badilisha hapo chini iwe: const BG_IMAGE = "/images/pande-vibe.jpg";
  const BG_IMAGE = "https://images.unsplash.com/photo-1525916801717-9405b5383d9d?q=80&w=1600&auto=format&fit=crop";

  return (
    <div style={{ background: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        body { margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        
        .glass-button {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.5px solid rgba(163, 230, 53, 0.3);
          box-shadow: 0 8px 32px 0 rgba(163, 230, 53, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.1);
        }
        
        .glass-button:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(163, 230, 53, 0.6);
          box-shadow: 0 12px 40px 0 rgba(163, 230, 53, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        {/* Darker Overlay for Text Readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.8) 50%, rgba(2,6,23,0.9) 100%)',
          zIndex: 1,
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          textAlign: 'center',
          animation: 'fadeInUp 1s ease-out',
        }}>
          <div style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            fontStyle: 'italic',
            lineHeight: '1.1',
            letterSpacing: '-1px',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            NIPE <span style={{ color: '#a3e635' }}>PANDE</span>
          </div>

          <div style={{
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: '#cbd5e1',
            lineHeight: '1.7',
            fontWeight: '400',
            maxWidth: '700px',
            margin: '0 auto 40px',
          }}>
            Give me a chance. A chance to prove myself on a real pitch. A chance to be noticed by real eyes. A chance to turn talent into a future.
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a href="tel:+255653292935" className="glass-button" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 28px',
              color: '#a3e635',
              borderRadius: '10px',
              fontWeight: '900',
              textDecoration: 'none',
              fontSize: '12px',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '1px',
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
              <Phone size={15} />
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>

      {/* THE STORY */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(163,230,53,0.1)',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.92) 100%)',
          zIndex: 0,
        }}></div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ animation: 'slideInLeft 0.8s ease-out' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: '900',
              fontStyle: 'italic',
              lineHeight: '1.2',
              marginBottom: '24px',
              letterSpacing: '-0.5px',
            }}>
              Pande Cup Didn't Arrive Fully Formed
            </h2>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#cbd5e1',
              lineHeight: '1.8',
              marginBottom: '18px',
              fontWeight: '400',
            }}>
              It was born from a simple, stubborn refusal: talent in Tanzania's streets should not be allowed to fade away just because no one is looking.
            </p>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#cbd5e1',
              lineHeight: '1.8',
              fontWeight: '400',
            }}>
              In late 2023, the idea was sparked in Kiomoni ward, Tanga — boys playing with plastic-bag balls on dusty patches, full of skill but with no real stage. Throughout 2024 the vision was tested and refined. A small documentary was shot to show what football could mean beyond the game — for discipline, for community, for hope.
            </p>
          </div>

          <div style={{
            background: 'rgba(163,230,53,0.08)',
            borderRadius: '14px',
            padding: 'clamp(32px, 5vw, 48px)',
            border: '1px solid rgba(163,230,53,0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'slideInRight 0.8s ease-out',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <div style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: '900',
              color: '#a3e635',
              marginBottom: '12px',
            }}>
              2023
            </div>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 14px)',
              color: '#cbd5e1',
              lineHeight: '1.7',
              margin: 0,
              fontWeight: '500',
            }}>
              The movement began in Kiomoni ward, Tanga. A refusal to let talent fade.
            </p>
          </div>
        </div>
      </section>

      {/* THE BREAKTHROUGH */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(163,230,53,0.1)',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.92) 100%)',
          zIndex: 0,
        }}></div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            background: 'rgba(163,230,53,0.08)',
            borderRadius: '14px',
            padding: 'clamp(32px, 5vw, 48px)',
            border: '1px solid rgba(163,230,53,0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'slideInLeft 0.8s ease-out',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            order: 2,
          }}>
            <div style={{
              fontSize: 'clamp(36px, 5vw, 48px)',
              fontWeight: '900',
              color: '#a3e635',
              marginBottom: '12px',
            }}>
              JUNE 2025
            </div>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 14px)',
              color: '#cbd5e1',
              lineHeight: '1.7',
              margin: 0,
              fontWeight: '500',
            }}>
              The opening ceremony changed everything. Thousands turned out. Pande Cup became ours.
            </p>
          </div>

          <div style={{ order: 1, animation: 'slideInRight 0.8s ease-out' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: '900',
              fontStyle: 'italic',
              lineHeight: '1.2',
              marginBottom: '24px',
              letterSpacing: '-0.5px',
            }}>
              Then Came The Breakthrough
            </h2>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#cbd5e1',
              lineHeight: '1.8',
              marginBottom: '18px',
              fontWeight: '400',
            }}>
              It wasn't easy. Doors closed. Partnerships didn't materialise. But the belief only grew stronger.
            </p>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#cbd5e1',
              lineHeight: '1.8',
              marginBottom: '18px',
              fontWeight: '400',
            }}>
              Then came June 2025. After months of preparation, a real committee of local youth took ownership. On June 29 we held an opening ceremony that no ward-level league had ever seen before. Thousands turned out.
            </p>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#cbd5e1',
              lineHeight: '1.8',
              fontWeight: '400',
            }}>
              Matches started the next day. The final came August 30. The streets answered — mothers sold food, boda riders carried fans, kids cheered from every corner. The league wasn't just played; it was felt.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(163,230,53,0.1)',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.92) 100%)',
          zIndex: 0,
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 1,
          animation: 'fadeInUp 0.8s ease-out',
        }}>
          <h2 style={{
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: '900',
            fontStyle: 'italic',
            lineHeight: '1.2',
            marginBottom: '40px',
            letterSpacing: '-0.5px',
            textAlign: 'center',
          }}>
            What We Do
          </h2>

          <p style={{
            fontSize: 'clamp(13px, 2vw, 15px)',
            color: '#cbd5e1',
            lineHeight: '1.9',
            fontWeight: '400',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            We organise real grassroots leagues in underserved wards — from Tanga to Goba in Dar es Salaam. We give young players structure: jerseys, coaches, referees, fixtures, scouts, and genuine pathways to trials and contracts. We create safe spaces where discipline is built, purpose is found, and talent is finally seen.
          </p>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(163,230,53,0.1)',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.92) 100%)',
          zIndex: 0,
        }}></div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(163,230,53,0.1) 0%, rgba(163,230,53,0.05) 100%)',
          borderRadius: '14px',
          padding: 'clamp(40px, 8vw, 60px)',
          border: '1px solid rgba(163,230,53,0.2)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          animation: 'scaleIn 0.8s ease-out',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}>
          <h3 style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            fontWeight: '900',
            fontStyle: 'italic',
            marginBottom: '24px',
            color: '#a3e635',
            letterSpacing: '1px',
          }}>
            OUR PHILOSOPHY — NIPE PANDE
          </h3>

          <p style={{
            fontSize: 'clamp(13px, 2vw, 15px)',
            color: '#cbd5e1',
            lineHeight: '1.8',
            fontWeight: '400',
            maxWidth: '800px',
            margin: '0 auto 20px',
          }}>
            In street language, "Nipe Pande" means "give me a side," "give me a pass," "connect me." To us it means something deeper: <strong>Give me a real chance.</strong>
          </p>

          <p style={{
            fontSize: 'clamp(13px, 2vw, 15px)',
            color: '#cbd5e1',
            lineHeight: '1.8',
            fontWeight: '400',
            maxWidth: '800px',
            margin: 0,
          }}>
            A chance to prove myself on a real pitch. A chance to be noticed by real eyes. A chance to turn talent into a future — for myself, my family, my community.
          </p>
        </div>
      </section>

      {/* THE RIPPLE EFFECT */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(163,230,53,0.1)',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.92) 100%)',
          zIndex: 0,
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: '900',
            fontStyle: 'italic',
            lineHeight: '1.2',
            marginBottom: '50px',
            letterSpacing: '-0.5px',
            textAlign: 'center',
          }}>
            When A Boy Gets His Pande
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              { title: 'Less Idle Time', desc: 'Means less trouble. Structure replaces chaos.' },
              { title: 'More Pride', desc: 'Means stronger families. Purpose replaces uncertainty.' },
              { title: 'Match-Day Money', desc: 'Flows to mama ntilie, boda riders, barbers — the mtaa economy breathes.' },
              { title: 'The Streets Get Quieter', desc: 'Dreams get louder. Change becomes visible.' },
            ].map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: 'clamp(24px, 4vw, 32px)',
                  background: hoveredCard === idx ? 'rgba(163,230,53,0.12)' : 'rgba(163,230,53,0.05)',
                  borderRadius: '12px',
                  border: hoveredCard === idx ? '1px solid rgba(163,230,53,0.4)' : '1px solid rgba(163,230,53,0.15)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: hoveredCard === idx ? '0 8px 32px rgba(163,230,53,0.15)' : '0 4px 16px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredCard === idx ? 'translateY(-6px)' : 'translateY(0)',
                  animation: `slideInUp 0.6s ease-out ${idx * 0.1}s both`,
                  cursor: 'pointer',
                }}
              >
                <h4 style={{
                  fontSize: 'clamp(13px, 2vw, 14px)',
                  fontWeight: '900',
                  color: '#a3e635',
                  marginBottom: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: 'clamp(12px, 1.8vw, 13px)',
                  color: '#cbd5e1',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TODAY & TOMORROW */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(163,230,53,0.1)',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.92) 100%)',
          zIndex: 0,
        }}></div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{ animation: 'slideInLeft 0.8s ease-out' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: '900',
              fontStyle: 'italic',
              lineHeight: '1.2',
              marginBottom: '24px',
              letterSpacing: '-0.5px',
            }}>
              Today & Tomorrow
            </h2>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#cbd5e1',
              lineHeight: '1.8',
              marginBottom: '18px',
              fontWeight: '400',
            }}>
              Today Pande Cup is no longer just Tanga's story. We are in Dar es Salaam. We are growing. We are proving that when you give youth from the mtaa one fair shot, everything can change.
            </p>
            <p style={{
              fontSize: 'clamp(13px, 2vw, 15px)',
              color: '#cbd5e1',
              lineHeight: '1.8',
              fontWeight: '400',
            }}>
              This is not the end. This is the beginning. The movement is just getting started.
            </p>
          </div>

          <div style={{
            background: 'rgba(163,230,53,0.08)',
            borderRadius: '14px',
            padding: 'clamp(32px, 5vw, 48px)',
            border: '1px solid rgba(163,230,53,0.15)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'slideInRight 0.8s ease-out',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <div style={{
              fontSize: 'clamp(11px, 1.5vw, 12px)',
              color: '#a3e635',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '16px',
            }}>
              OUR MANTRA
            </div>
            <p style={{
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '900',
              color: 'white',
              lineHeight: '1.7',
              margin: 0,
              fontStyle: 'italic',
            }}>
              Ligi Moja. Upendo Mmoja. Vumbi Mmoja. Hii Game Ni Yetu.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) 20px',
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundImage: `url(${BG_IMAGE})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.92) 100%)',
          zIndex: 0,
        }}></div>

        <div style={{ position: 'relative', zIndex: 1, animation: 'fadeInUp 0.8s ease-out' }}>
          <h2 style={{
            fontSize: 'clamp(22px, 4vw, 32px)',
            fontWeight: '900',
            fontStyle: 'italic',
            lineHeight: '1.2',
            marginBottom: '20px',
            letterSpacing: '-0.5px',
          }}>
            Ready To Give Pande?
          </h2>

          <p style={{
            fontSize: 'clamp(13px, 2vw, 15px)',
            color: '#cbd5e1',
            lineHeight: '1.8',
            maxWidth: '700px',
            margin: '0 auto 40px',
            fontWeight: '400',
          }}>
            Join us in transforming grassroots football and building real futures. Let's create impact together.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <a href="tel:+255653292935" className="glass-button" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 28px',
              color: '#a3e635',
              borderRadius: '10px',
              fontWeight: '900',
              textDecoration: 'none',
              fontSize: '12px',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '1px',
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
              <Phone size={15} />
              +255 653 292 935
            </a>

            <a href="mailto:pandecup2023@gmail.com" className="glass-button" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '13px 28px',
              color: '#a3e635',
              borderRadius: '10px',
              fontWeight: '900',
              textDecoration: 'none',
              fontSize: '12px',
              textTransform: 'uppercase',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '1px',
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
              <Mail size={15} />
              EMAIL US
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: 'clamp(40px, 6vw, 60px) 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(163,230,53,0.1)',
        background: 'rgba(163,230,53,0.02)',
      }}>
        <p style={{
          fontSize: '12px',
          color: '#64748b',
          fontWeight: '600',
          letterSpacing: '1px',
          margin: 0,
          textTransform: 'uppercase',
        }}>
          © 2026 Pande Cup. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;