import React, { useState } from 'react';
import { FaWhatsapp, FaCopy, FaCheckCircle, FaFutbol, FaMapMarkerAlt, FaUserTie, FaPhone, FaTshirt } from 'react-icons/fa';

// Orodha Maalum (Smart List)
const LOCATIONS = [
  { group: 'KIOMONI (Nyumbani - The Root)', areas: ['Kiomoni', 'Mpirani', 'Mabayani', 'Ndumi', 'Mapande "A"', 'Kivulini', 'Cross Z', 'Mbogo', 'Kilimanjaro', 'Mowe', 'Masaini', 'Muheza', 'Kikuluni', 'Chote', 'Lwande', 'Magubeni', 'Marembwe', 'Mavumbi', 'Mijohoroni', 'Mjesani', 'Mnyenzani'] },
  { group: 'TANGA MJINI (Kata & Mitaa)', areas: ['Ngamiani', 'Majengo', 'Mabawa', 'Central', 'Makorora', 'Mzingani', 'Tanga Sisi', 'Mnyanjani', 'Usagara', 'Nguvumali', 'Pongwe', 'Magaoni', 'Duga', 'Maweni', 'Chongoleani', 'Raskazone', 'Donge', 'Gofu'] },
  { group: 'DAR ES SALAAM', areas: ['Goba', 'Madale', 'Makongo', 'Mbezi Mwisho', 'Kimara', 'Sinza', 'Ubungo', 'Mabibo', 'Tegeta', 'Bunju', 'Kinondoni', 'Ilala'] },
  { group: 'ENGINE', areas: ['Nje ya Tanga/Dar'] }
];

export default function Sajili() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const form = e.target;
    const data = {
      teamName: form.teamName.value,
      coachName: form.coachName.value,
      phoneNumber: form.phoneNumber.value,
      location: form.location.value,
      jerseyColor: form.jerseyColor.value
    };

    // Validation ya Namba (Lazima ianze na 06 au 07 na iwe na tarakimu 10)
    const phoneRegex = /^(06|07)\d{8}$/;
    if (!phoneRegex.test(data.phoneNumber)) {
      setErrorMsg('Tafadhali weka namba sahihi ya simu (mfano: 0712345678).');
      setIsSubmitting(false);
      return;
    }

    try {
      // LOGIC YA VISOMANE: Badala ya API, tunasave kwenye LocalStorage ili Admin asome
      const newRegistration = {
        id: `reg_${Date.now()}`,
        teamName: data.teamName,
        coach: data.coachName,
        phone: data.phoneNumber,
        jerseyColor: data.jerseyColor,
        status: 'Inasubiri',
        date: new Date().toLocaleDateString('en-GB'),
        location: data.location === 'Goba' || data.location === 'Madale' ? 'goba' : 'kiomoni', // Smart location routing
        season: '2026'
      };

      // Vuta data za zamani kama zipo, kisha ongeza mpya
      const existingRegs = JSON.parse(localStorage.getItem('pande_pending_regs')) || [];
      existingRegs.push(newRegistration);
      localStorage.setItem('pande_pending_regs', JSON.stringify(existingRegs));

      // Iki-save vizuri, onyesha Modal ya Malipo
      setTimeout(() => {
        setFormData(data);
        setShowModal(true);
        setIsSubmitting(false);
      }, 1500); // Tupa delay kidogo ili ionekane inafanya process nzito

    } catch (error) {
      console.error("Save Error:", error);
      setErrorMsg('Imeshindikana kusajili. Jaribu tena au wasiliana nasi.');
      setIsSubmitting(false);
    }
  };

  const copyNumber = () => {
    navigator.clipboard.writeText('43852599');
    alert('Namba imekopiwa kikamilifu!');
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&family=Inter:wght@400;600;800&display=swap');
          .glass-form { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); }
          .pande-input { width: 100%; background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 14px 14px 44px; color: white; font-size: 15px; outline: none; transition: all 0.3s ease; }
          .pande-input:focus { border-color: #a3e635; box-shadow: 0 0 0 2px rgba(163, 230, 53, 0.2); }
          .pande-select { appearance: none; }
          .btn-submit { width: 100%; background: #a3e635; color: #020617; font-weight: 900; padding: 16px; border-radius: 12px; border: none; cursor: pointer; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; box-shadow: 0 8px 20px rgba(163, 230, 53, 0.2); }
          .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 25px rgba(163, 230, 53, 0.4); background: #bef264; }
          .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        `}
      </style>

      <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: 'white', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: '"Inter", sans-serif', backgroundImage: 'radial-gradient(circle at top, rgba(163, 230, 53, 0.05) 0%, transparent 50%)' }}>
        
        {!showModal ? (
          <div className="glass-form" style={{ width: '100%', maxWidth: '550px', padding: '40px 32px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(163,230,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <FaFutbol size={28} color="#a3e635" />
              </div>
              <h1 style={{ fontSize: '28px', fontFamily: '"Oswald", sans-serif', color: 'white', textTransform: 'uppercase', margin: 0, letterSpacing: '1px' }}>Sajili <span style={{ color: '#a3e635' }}>Timu Yako</span></h1>
              <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '14px' }}>Jaza fomu hii ili kushiriki Pande Cup Msimu Mpya.</p>
            </div>

            {errorMsg && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>Jina la Timu</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FaFutbol style={{ position: 'absolute', left: '16px', color: '#64748b', fontSize: '16px' }} />
                  <input required name="teamName" type="text" placeholder="Mfano: Mpirani FC" className="pande-input" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>Jina la Kocha / Meneja</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FaUserTie style={{ position: 'absolute', left: '16px', color: '#64748b', fontSize: '16px' }} />
                  <input required name="coachName" type="text" placeholder="Jina Kamili" className="pande-input" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>Namba ya Simu (WhatsApp)</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FaPhone style={{ position: 'absolute', left: '16px', color: '#64748b', fontSize: '16px' }} />
                  <input required name="phoneNumber" type="tel" placeholder="07XXXXXXXX" className="pande-input" />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>Eneo / Kata</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FaMapMarkerAlt style={{ position: 'absolute', left: '16px', color: '#64748b', fontSize: '16px' }} />
                  <select required name="location" className="pande-input pande-select">
                    <option value="">Chagua Eneo...</option>
                    {LOCATIONS.map((group) => (
                      <optgroup key={group.group} label={group.group} style={{ background: '#0f172a', color: '#a3e635' }}>
                        {group.areas.map((area) => (
                          <option key={area} value={area} style={{ color: 'white' }}>{area}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase' }}>Rangi za Jezi</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <FaTshirt style={{ position: 'absolute', left: '16px', color: '#64748b', fontSize: '16px' }} />
                  <input required name="jerseyColor" type="text" placeholder="Njano (Home), Nyeusi (Away)" className="pande-input" />
                </div>
              </div>

              <button disabled={isSubmitting} type="submit" className="btn-submit" style={{ marginTop: '10px' }}>
                {isSubmitting ? 'Inatuma Maombi...' : 'SAJILI TIMU SASA 🚀'}
              </button>
            </form>
          </div>
        ) : (
          /* --- POPUP MODAL (MIX BY YAS) --- */
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: '#1e293b', borderRadius: '24px', maxWidth: '420px', width: '100%', overflow: 'hidden', border: '1px solid rgba(163,230,53,0.2)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)', animation: 'scaleIn 0.3s ease' }}>
              <style>{`@keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
              
              <div style={{ background: 'linear-gradient(135deg, #a3e635 0%, #65a30d 100%)', padding: '32px 24px', textAlign: 'center', color: '#020617' }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                  <FaCheckCircle size={36} color="#020617" />
                </div>
                <h2 style={{ fontSize: '26px', fontFamily: '"Oswald", sans-serif', margin: 0, letterSpacing: '1px' }}>HONGERA! 👏</h2>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px', fontWeight: '600' }}>Taarifa za <strong style={{ textTransform: 'uppercase' }}>{formData?.teamName}</strong> zimefika Command Centre.</p>
              </div>

              <div style={{ padding: '32px 24px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '14px' }}>Ili kukamilisha usajili, tafadhali lipia ada:</p>
                  <div style={{ backgroundColor: 'rgba(163,230,53,0.05)', border: '2px dashed #a3e635', borderRadius: '16px', padding: '20px', position: 'relative' }}>
                    <p style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>Lipa Namba (Mitandao Yote)</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '8px 0' }}>
                      <span style={{ fontSize: '32px', fontFamily: 'monospace', fontWeight: '900', color: '#a3e635', letterSpacing: '2px' }}>43852599</span>
                      <button onClick={copyNumber} style={{ border: 'none', background: 'rgba(163,230,53,0.1)', color: '#a3e635', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background='rgba(163,230,53,0.2)'} onMouseLeave={e => e.currentTarget.style.background='rgba(163,230,53,0.1)'}>
                        <FaCopy size={18} />
                      </button>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: 'white', borderTop: '1px solid rgba(163,230,53,0.2)', paddingTop: '12px', marginTop: '12px', textTransform: 'uppercase' }}>
                      Jina: FESTO HENRY MSANGAWALE
                    </div>
                    <div style={{ position: 'absolute', top: '-1px', right: '-1px', backgroundColor: '#a3e635', color: '#020617', fontSize: '12px', fontWeight: '900', padding: '6px 12px', borderRadius: '0 16px 0 16px', boxShadow: '-2px 2px 10px rgba(0,0,0,0.2)' }}>50,000/=</div>
                  </div>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '20px', marginTop: '24px', fontSize: '13px', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontWeight: '800', color: 'white', margin: '0 0 12px', textTransform: 'uppercase' }}>Jinsi ya Kulipa:</p>
                  <ol style={{ paddingLeft: '20px', margin: 0, lineHeight: '1.8' }}>
                    <li>Piga <strong>*150*...#</strong> (Menu ya mtandao wako)</li>
                    <li>Chagua <strong>Lipa kwa Simu</strong></li>
                    <li>Chagua <strong>Lipa Namba</strong></li>
                    <li>Ingiza Namba: <strong style={{ color: '#a3e635' }}>43852599</strong></li>
                    <li>Kiasi: <strong style={{ color: '#a3e635' }}>50,000</strong></li>
                  </ol>
                </div>

                <a 
                  href={`https://wa.me/255653292935?text=Habari Pande Cup,%0A%0ANimelipia fomu ya usajili wa timu.%0A%0A⚽ *Timu:* ${formData?.teamName}%0A👤 *Kocha:* ${formData?.coachName}%0A📞 *Simu:* ${formData?.phoneNumber}%0A💰 *Kiasi:* 50,000/=%0A%0ATafadhali thibitisha usajili wetu.`}
                  target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', backgroundColor: '#25D366', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontWeight: '900', marginTop: '24px', fontSize: '15px', textTransform: 'uppercase', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <FaWhatsapp size={22} />
                  TUMA UTHIBITISHO WA MALIPO
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}