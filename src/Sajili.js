import React, { useState } from 'react';
import { FaWhatsapp, FaCopy, FaCheckCircle, FaFutbol, FaMapMarkerAlt, FaUserTie, FaPhone, FaTshirt } from 'react-icons/fa';

// Orodha Maalum (Smart List)
const LOCATIONS = [
  { 
    group: 'KIOMONI (Nyumbani - The Root)', 
    areas: ['Kiomoni', 'Mpirani', 'Mabayani', 'Ndumi', 'Mapande "A"', 'Kivulini', 'Cross Z', 'Mbogo', 'Kilimanjaro', 'Mowe', 'Masaini', 'Muheza', 'Kikuluni', 'Chote', 'Lwande', 'Magubeni', 'Marembwe', 'Mavumbi', 'Mijohoroni', 'Mjesani', 'Mnyenzani'] 
  },
  { 
    group: 'TANGA MJINI (Kata & Mitaa)', 
    areas: ['Ngamiani', 'Majengo', 'Mabawa', 'Central', 'Makorora', 'Mzingani', 'Tanga Sisi', 'Mnyanjani', 'Usagara', 'Nguvumali', 'Pongwe', 'Magaoni', 'Duga', 'Maweni', 'Chongoleani', 'Raskazone', 'Donge', 'Gofu'] 
  },
  { 
    group: 'DAR ES SALAAM', 
    areas: ['Goba', 'Madale', 'Makongo', 'Mbezi Mwisho', 'Kimara', 'Sinza', 'Ubungo', 'Mabibo', 'Tegeta', 'Bunju', 'Kinondoni', 'Ilala'] 
  },
  { 
    group: 'ENGINE', 
    areas: ['Nje ya Tanga/Dar'] 
  }
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
      // Tuma data kwenye API yetu
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setFormData(data);
        setShowModal(true);
      } else {
        throw new Error(result.message || 'Tatizo la mtandao');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Imeshindikana kusajili. Jaribu tena au wasiliana nasi.');
    }
    
    setIsSubmitting(false);
  };

  const copyNumber = () => {
    navigator.clipboard.writeText('43852599');
    alert('Namba imekopiwa!');
  };

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' },
    card: { width: '100%', maxWidth: '600px', backgroundColor: '#1e293b', padding: '24px', borderRadius: '16px', border: '1px solid #374151', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '14px', color: '#94a3b8', marginBottom: '8px' },
    inputWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
    icon: { position: 'absolute', left: '12px', color: '#64748b', zIndex: 10 },
    input: { width: '100%', backgroundColor: '#0f172a', border: '1px solid #475569', borderRadius: '8px', padding: '12px 12px 12px 40px', color: 'white', fontSize: '16px', outline: 'none' },
    button: { width: '100%', backgroundColor: '#ffff00', color: 'black', fontWeight: 'bold', padding: '16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '16px', marginTop: '10px' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 },
    modalContent: { backgroundColor: 'white', color: '#111827', borderRadius: '16px', maxWidth: '400px', width: '90%', overflow: 'hidden' },
    whatsappBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', backgroundColor: '#25D366', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', marginTop: '20px' }
  };

  return (
    <div style={styles.container}>
      {!showModal ? (
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#ffff00', textTransform: 'uppercase', margin: 0 }}>Sajili Timu Yako</h1>
            <p style={{ color: '#94a3b8', marginTop: '8px' }}>Jaza fomu hii ili kushiriki Pande Cup Msimu Mpya.</p>
          </div>

          {errorMsg && (
            <div style={{ backgroundColor: '#450a0a', border: '1px solid #ef4444', color: '#fca5a5', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Jina la Timu</label>
              <div style={styles.inputWrapper}>
                <FaFutbol style={styles.icon} />
                <input required name="teamName" type="text" placeholder="Mfano: Mpirani FC" style={styles.input} />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Jina la Kocha / Meneja</label>
              <div style={styles.inputWrapper}>
                <FaUserTie style={styles.icon} />
                <input required name="coachName" type="text" placeholder="Jina Kamili" style={styles.input} />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Namba ya Simu (WhatsApp)</label>
              <div style={styles.inputWrapper}>
                <FaPhone style={styles.icon} />
                <input required name="phoneNumber" type="tel" placeholder="07XXXXXXXX" style={styles.input} />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Eneo / Kata</label>
              <div style={styles.inputWrapper}>
                <FaMapMarkerAlt style={styles.icon} />
                <select required name="location" style={{ ...styles.input, appearance: 'none' }}>
                  <option value="">Chagua Eneo...</option>
                  {LOCATIONS.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.areas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

             <div style={styles.inputGroup}>
              <label style={styles.label}>Rangi za Jezi</label>
              <div style={styles.inputWrapper}>
                <FaTshirt style={styles.icon} />
                <input required name="jerseyColor" type="text" placeholder="Njano (Home), Nyeusi (Away)" style={styles.input} />
              </div>
            </div>

            <button disabled={isSubmitting} type="submit" style={styles.button}>
              {isSubmitting ? 'Inasajili...' : 'SAJILI TIMU SASA 🚀'}
            </button>
          </form>
        </div>
      ) : (
        /* --- POPUP MODAL (MIX BY YAS) --- */
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ backgroundColor: '#16a34a', padding: '24px', textAlign: 'center', color: 'white' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <FaCheckCircle size={32} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>HONGERA! 👏</h2>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Taarifa za <strong>{formData?.teamName}</strong> zimepokelewa.</p>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#4b5563', marginBottom: '16px' }}>Ili kukamilisha usajili, tafadhali lipia ada:</p>
                <div style={{ backgroundColor: '#fefce8', border: '2px solid #ffff00', borderRadius: '12px', padding: '16px', position: 'relative' }}>
                  <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold', textTransform: 'uppercase' }}>Lipa Namba (Mitandao Yote)</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '8px 0' }}>
                    <span style={{ fontSize: '24px', fontFamily: 'monospace', fontWeight: 'bold', color: '#111827' }}>43852599</span>
                    <button onClick={copyNumber} style={{ border: 'none', background: 'none', color: '#2563eb', cursor: 'pointer' }}><FaCopy /></button>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937', borderTop: '1px solid #fde047', paddingTop: '8px', marginTop: '8px' }}>
                    Jina: FESTO HENRY MSANGAWALE
                  </div>
                  <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#ffff00', color: 'black', fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '0 0 0 8px' }}>50,000/=</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px', marginTop: '20px', fontSize: '14px', color: '#374151' }}>
                <p style={{ fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>Jinsi ya Kulipa:</p>
                <ol style={{ paddingLeft: '20px', margin: 0 }}>
                  <li>Piga <strong>*150*...#</strong> (Menu ya mtandao)</li>
                  <li>Chagua <strong>Lipa kwa Simu</strong></li>
                  <li>Chagua <strong>Lipa Namba</strong></li>
                  <li>Ingiza: <strong>43852599</strong></li>
                  <li>Kiasi: <strong>50,000</strong></li>
                </ol>
              </div>

              <a 
                href={`https://wa.me/255653292935?text=Habari, nimelipia fomu ya timu ${formData?.teamName}. Kiasi 50,000. Jina la Mlipaji: ${formData?.coachName}. Namba: ${formData?.phoneNumber}`}
                target="_blank" rel="noreferrer"
                style={styles.whatsappBtn}>
                <FaWhatsapp size={24} />
                NIMELIPA! TUMA UTHIBITISHO
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}