import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, ChevronRight, ChevronLeft, Users, Camera, 
  CheckCircle, Trash2, AlertCircle, Copy, Home, Loader
} from 'lucide-react';

// --- CONFIGURATION (FROM .ENV) ---
const SPACE_ID = process.env.REACT_APP_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.REACT_APP_ACCESS_TOKEN; 
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";

const LOCATIONS = [
  { group: 'KIOMONI', areas: ['Kiomoni', 'Mpirani', 'Mabayani', 'Ndumi', 'Mapande "A"', 'Kivuleni', 'Cross Z', 'Mbogo', 'Kilimanjaro', 'Mowe', 'Masaini', 'Muheza', 'Kikuluni', 'Chote', 'Lwande', 'Magubeni', 'Marembwe', 'Mavumbi', 'Mijohoroni', 'Mjesani', 'Mnyenzani', 'Amboni', 'Mabokweni'] },
  { group: 'TANGA MJINI', areas: ['Ngamiani', 'Majengo', 'Mabawa', 'Central', 'Makorora', 'Mzingani', 'Tanga Sisi', 'Mnyanjani', 'Usagara', 'Nguvumali', 'Pongwe', 'Magaoni', 'Duga', 'Maweni', 'Chongoleani', 'Raskazone', 'Donge', 'Gofu'] },
  { group: 'DAR ES SALAAM', areas: ['Goba', 'Madale', 'Makongo', 'Mbezi Mwisho', 'Mbezi Beach', 'Kimara', 'Sinza', 'Ubungo', 'Mabibo', 'Tegeta', 'Bunju', 'Kinondoni', 'Ilala', 'Chamazi', 'Kijamboni', 'Mbagala', 'Boko', 'Kawe'] },
  { group: 'OUTSIDE', areas: ['Nje ya Tanga/Dar'] }
];

const DAR_AREAS = ['Goba', 'Madale', 'Makongo', 'Mbezi Mwisho', 'Mbezi Beach', 'Kimara', 'Sinza', 'Ubungo', 'Mabibo', 'Tegeta', 'Bunju', 'Kinondoni', 'Ilala', 'Chamazi', 'Kijamboni', 'Mbagala', 'Boko', 'Kawe', 'Msumi', 'Kwa Robert', 'Mkuranga', 'Kibaha', 'Pwani Mjini', 'Gongo La Mboto', 'Chanika'];

const MIXX_LIPA_NAMBA = '43852599';
const REGISTRATION_FEE = 70000;

export default function RegisterTeam() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [team, setTeam] = useState({
    name: '', coach: '', phone: '', email: '', location: '', jersey: '', season: '2026'
  });

  // Added 'photoUrl' and 'uploading' state
  const [players, setPlayers] = useState([
    { id: 1, name: '', aka: '', pos: '', no: '', photo: null, preview: null, photoUrl: '', uploading: false }
  ]);

  const fileRefs = useRef({});

  const next = () => {
    if (validate()) {
      setStep(s => Math.min(s + 1, 5));
      setError('');
      window.scrollTo(0, 0);
    }
  };

  const prev = () => {
    setStep(s => Math.max(s - 1, 1));
    setError('');
  };

  const validate = () => {
    setError('');
    if (step === 1) {
      if (!team.name.trim()) return setError('Jaza jina la timu'), false;
      if (!team.coach.trim()) return setError('Jaza jina la kocha'), false;
      if (!/^(06|07)\d{8}$/.test(team.phone)) return setError('Namba ya simu si sahihi (07XXXXXXXX)'), false;
      if (!team.location) return setError('Chagua eneo'), false;
    }
    if (step === 2) {
      const valid = players.filter(p => p.name.trim());
      if (valid.length < 11) return setError('Unahitaji wachezaji 11+ ili kuendelea'), false;
      
      // Check if any upload is still pending
      const pendingUploads = players.some(p => p.uploading);
      if (pendingUploads) return setError('Subiri picha zimalize kupanda hewani...'), false;
    }
    return true;
  };

  const addPlayer = () => {
    if (players.length < 25) setPlayers([...players, { id: Date.now(), name: '', aka: '', pos: '', no: '', photo: null, preview: null, photoUrl: '', uploading: false }]);
  };

  const delPlayer = (id) => {
    if (players.length > 1) setPlayers(players.filter(p => p.id !== id));
  };

  const updatePlayer = (id, field, val) => {
    setPlayers(players.map(p => p.id === id ? { ...p, [field]: val } : p));
  };

  // --- ENGINE MPYA YA PICHA (CLOUDINARY) ---
  const uploadPhoto = async (id, file) => {
    if (!file || !file.type.startsWith('image/')) return;

    // 1. Show Preview Immediately (UI Preservation) & Set Uploading TRUE
    const reader = new FileReader();
    reader.onloadend = () => {
        setPlayers(prev => prev.map(p => p.id === id ? { ...p, preview: reader.result, uploading: true } : p));
    };
    reader.readAsDataURL(file);

    // 2. Upload to Cloudinary in Background
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("cloud_name", CLOUD_NAME);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
        });
        
        const data = await res.json();
        
        if (data.secure_url) {
            // Success: Save the URL
            setPlayers(prev => prev.map(p => p.id === id ? { ...p, photoUrl: data.secure_url, uploading: false } : p));
            console.log("Picha imepanda:", data.secure_url);
        } else {
            throw new Error("No URL returned");
        }

    } catch (err) {
        console.error("Upload Error:", err);
        // Error: Stop spinner, maybe clear preview or keep it but warn user
        alert("Picha haikupanda. Tafadhali jaribu tena au angalia internet.");
        setPlayers(prev => prev.map(p => p.id === id ? { ...p, uploading: false } : p));
    }
  };

  const submit = async () => {
    setLoading(true);
    setError('');

    try {
      const loc = DAR_AREAS.includes(team.location) ? 'goba' : 'kiomoni';
      
      const playersPayload = players
        .filter(p => p.name.trim())
        .map(p => ({
          name: p.name,
          aka: p.aka,
          position: p.pos,
          number: p.no,
          photo: p.photoUrl || "" // 🔥 Tuma URL ya Cloudinary!
        }));

      const contentfulData = {
        fields: {
          teamName: { 'en-US': team.name },
          coachName: { 'en-US': team.coach },
          phoneNumber: { 'en-US': team.phone },
          location: { 'en-US': loc },
          rawLocation: { 'en-US': team.location },
          jerseyColor: { 'en-US': team.jersey || '' },
          status: { 'en-US': 'Inasubiri' },
          season: { 'en-US': team.season },
          paymentStatus: { 'en-US': false },
          registrationDate: { 'en-US': new Date().toISOString() },
          totalPlayers: { 'en-US': playersPayload.length },
          players: { 'en-US': JSON.stringify(playersPayload) },
          adminNotes: { 'en-US': 'New Registration via Web' }
        }
      };

      console.log("🚀 Sending Payload:", contentfulData);

      // Step 1: Create Entry
      const response = await fetch(
        `https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
            'Content-Type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Content-Type': 'registration'
          },
          body: JSON.stringify(contentfulData)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Contentful Error:', errorData);

        if (errorData.sys && errorData.sys.id === 'ValidationFailed') {
             const fieldError = errorData.details.errors[0];
             throw new Error(`Kosa la Contentful: Field "${fieldError.name}" (ID: ${fieldError.path}) haipo au ina makosa.`);
        }
        else if (errorData.message) {
             throw new Error(errorData.message);
        }
        throw new Error('Hitilafu ya kimtandao wakati wa kutuma data.');
      }

      const entry = await response.json();
      
      // Step 2: Publish Entry
      await fetch(
        `https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}/published`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${MANAGEMENT_TOKEN}`,
            'X-Contentful-Version': entry.sys.version
          }
        }
      );

      // Success!
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1000);

    } catch (err) {
      console.error(err);
      setError(`Imeshindikana: ${err.message}`);
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(MIXX_LIPA_NAMBA);
    alert('Namba imekopiwa: ' + MIXX_LIPA_NAMBA);
  };

  const progress = (step / 5) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #020617; color: white; }
        .input { width: 100%; background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; color: white; font-size: 14px; outline: none; transition: 0.2s; }
        .input:focus { border-color: #a3e635; box-shadow: 0 0 0 2px rgba(163,230,53,0.2); }
        .btn { background: #a3e635; color: black; font-weight: 700; padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; text-transform: uppercase; transition: 0.2s; display: inline-flex; align-items: center; gap: 8px; }
        .btn:hover:not(:disabled) { background: #bef264; transform: translateY(-2px); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-sec:hover { background: rgba(255,255,255,0.1); }
        .card { background: rgba(30,41,59,0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; position: relative; }
        .photo { width: 60px; height: 60px; border-radius: 8px; border: 2px dashed rgba(163,230,53,0.3); display: flex; align-items: center; justify-content: center; cursor: pointer; background: rgba(15,23,42,0.8); overflow: hidden; position: relative; }
        .photo:hover { border-color: #a3e635; background: rgba(163,230,53,0.05); }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        /* Animation ya Spinner */
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr !important; } .btn { width: 100%; justify-content: center; } }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, rgba(163,230,53,0.05), #020617 50%)', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TOP NAV */}
        <div style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', fontSize: '14px', fontWeight: '600', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#a3e635'} onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}>
            <Home size={18} /> Rudi Nyumbani
          </Link>
        </div>

        {/* MAIN CARD */}
        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(30,41,59,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
          
          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src={LOGO_PATH} alt="Pande Cup" style={{ height: '50px', marginBottom: '16px', filter: 'drop-shadow(0 0 10px rgba(163,230,53,0.3))' }} />
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', marginBottom: '4px', letterSpacing: '1px' }}>
              USAJILI WA TIMU
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Pande Cup {team.season} - Digital Registration Form</p>
          </div>

          {/* PROGRESS */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #a3e635, #65a30d)', width: `${progress}%`, transition: '0.3s', borderRadius: '50px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: '#64748b', fontWeight: 'bold' }}>
              <span style={{ color: step >= 1 ? '#a3e635' : '#64748b' }}>TEAM</span>
              <span style={{ color: step >= 2 ? '#a3e635' : '#64748b' }}>PLAYERS</span>
              <span style={{ color: step >= 3 ? '#a3e635' : '#64748b' }}>REVIEW</span>
              <span style={{ color: step >= 4 ? '#a3e635' : '#64748b' }}>PAYMENT</span>
              <span style={{ color: step >= 5 ? '#a3e635' : '#64748b' }}>SUBMIT</span>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', padding: '12px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {/* STEPS */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>JINA LA TIMU *</label><input className="input" type="text" placeholder="Mfano: Mpirani FC" value={team.name} onChange={e => setTeam({...team, name: e.target.value})} /></div>
              <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>KOCHA / MANAGER *</label><input className="input" type="text" placeholder="Jina Kamili" value={team.coach} onChange={e => setTeam({...team, coach: e.target.value})} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="grid">
                <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>SIMU *</label><input className="input" type="tel" placeholder="07XXXXXXXX" value={team.phone} onChange={e => setTeam({...team, phone: e.target.value})} /></div>
                <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>EMAIL</label><input className="input" type="email" placeholder="email@example.com" value={team.email} onChange={e => setTeam({...team, email: e.target.value})} /></div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>ENEO *</label>
                <select className="input" value={team.location} onChange={e => setTeam({...team, location: e.target.value})} style={{ cursor: 'pointer' }}><option value="">Chagua...</option>{LOCATIONS.map(g => (<optgroup key={g.group} label={g.group} style={{ background: '#0f172a', color: '#a3e635' }}>{g.areas.map(a => <option key={a} value={a} style={{ color: 'white' }}>{a}</option>)}</optgroup>))}</select>
              </div>
              <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>RANGI ZA JEZI</label><input className="input" type="text" placeholder="Njano (Home), Nyeusi (Away)" value={team.jersey} onChange={e => setTeam({...team, jersey: e.target.value})} /></div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div><h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Orodha ya Wachezaji</h3><p style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>{players.filter(p => p.name.trim()).length}/25 (Min: 11)</p></div>
                <button className="btn" onClick={addPlayer} disabled={players.length >= 25} style={{ padding: '8px 16px', fontSize: '12px' }}><Users size={14} /> ONGEZA</button>
              </div>
              <div style={{ maxHeight: '450px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}>
                {players.map((p, i) => (
                  <div key={p.id} className="card">
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#a3e635', color: 'black', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '12px' }}>{i + 1}</div>
                    {players.length > 1 && (<button onClick={() => delPlayer(p.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} /></button>)}
                    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: '12px', marginTop: '32px' }}>
                      
                      {/* --- HAPA NDIPO UCHAWI WA UI ULIPO (PHOTO PREVIEW + LOADER) --- */}
                      <div>
                        <input type="file" accept="image/*" ref={el => fileRefs.current[p.id] = el} style={{ display: 'none' }} onChange={e => uploadPhoto(p.id, e.target.files[0])} />
                        <div className="photo" onClick={() => fileRefs.current[p.id]?.click()}>
                           {p.uploading ? (
                             <Loader className="spin" size={24} color="#a3e635" /> 
                           ) : p.preview ? (
                             <img src={p.preview} alt="Player" /> 
                           ) : (
                             <Camera size={20} color="#64748b" />
                           )}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input className="input" type="text" placeholder="Jina Kamili *" value={p.name} onChange={e => updatePlayer(p.id, 'name', e.target.value)} style={{ padding: '8px 10px', fontSize: '13px' }} />
                        <input className="input" type="text" placeholder="AKA" value={p.aka} onChange={e => updatePlayer(p.id, 'aka', e.target.value)} style={{ padding: '8px 10px', fontSize: '13px' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '8px' }}>
                          <select className="input" value={p.pos} onChange={e => updatePlayer(p.id, 'pos', e.target.value)} style={{ padding: '8px 10px', fontSize: '13px', cursor: 'pointer' }}><option value="">Nafasi...</option><option value="GK">GK</option><option value="DEF">DEF</option><option value="MID">MID</option><option value="FWD">FWD</option></select>
                          <input className="input" type="number" placeholder="#" value={p.no} onChange={e => updatePlayer(p.id, 'no', e.target.value)} style={{ padding: '8px 10px', fontSize: '13px' }} min="1" max="99" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'rgba(163,230,53,0.05)', border: '1px solid rgba(163,230,53,0.2)', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ color: '#a3e635', fontSize: '16px', marginBottom: '16px', fontWeight: '900' }}>TAARIFA ZA TIMU</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Timu:</span><span style={{ fontWeight: 'bold' }}>{team.name}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Kocha:</span><span style={{ fontWeight: 'bold' }}>{team.coach}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Simu:</span><span style={{ fontWeight: 'bold' }}>{team.phone}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Eneo:</span><span style={{ fontWeight: 'bold' }}>{team.location}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Wachezaji:</span><span style={{ color: '#a3e635', fontWeight: 'bold' }}>{players.filter(p => p.name.trim()).length}</span></div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
             <div style={{ background: 'rgba(163,230,53,0.05)', border: '2px dashed #a3e635', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
                <h3 style={{ color: '#a3e635', fontSize: '18px', marginBottom: '16px', fontWeight: '900' }}>ADA YA USAJILI</h3>
                <div style={{ fontSize: '40px', fontWeight: '900', color: 'white', marginBottom: '6px' }}>TSH {REGISTRATION_FEE.toLocaleString()}/=</div>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '24px' }}>Ada ya usajili kwa timu moja</p>
                <button onClick={copy} style={{ background: '#0f172a', border: '1px solid #a3e635', color: '#a3e635', padding: '12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                   <Copy size={16}/> {MIXX_LIPA_NAMBA}
                </button>
             </div>
          )}

          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '30px 0' }}>
              <CheckCircle size={56} color="#a3e635" />
              <h3 style={{ fontSize: '22px', fontWeight: '900' }}>Tayari Kusubmit?</h3>
              <p style={{ color: '#94a3b8', textAlign: 'center', maxWidth: '450px', lineHeight: '1.6', fontSize: '14px' }}>Kwa kubonyeza "SUBMIT", unakubali kuwa umelipa ada na taarifa ni sahihi.</p>
            </div>
          )}

          {/* NAV */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {step > 1 && <button className="btn btn-sec" onClick={prev} style={{ flex: 1 }}><ChevronLeft size={16} /> NYUMA</button>}
            {step < 5 ? (<button className="btn" onClick={next} style={{ flex: 1 }}>ENDELEA <ChevronRight size={16} /></button>) : (<button className="btn" onClick={submit} disabled={loading} style={{ flex: 1 }}>{loading ? 'INATUMA...' : 'SUBMIT REGISTRATION'} {!loading && <CheckCircle size={16} />}</button>)}
          </div>
        </div>

        {/* SUCCESS MODAL */}
        {success && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: 'rgba(30,41,59,0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '400px', width: '100%', padding: '32px', borderRadius: '20px', textAlign: 'center' }}>
              <CheckCircle size={36} color="#a3e635" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#a3e635', marginBottom: '12px' }}>HONGERA! 🎉</h2>
              <p style={{ color: '#cbd5e1', fontSize: '14px', marginBottom: '28px' }}>Usajili wa <strong style={{ color: 'white' }}>{team.name}</strong> umefanikiwa!</p>
              <Link to="/"><button className="btn" style={{ width: '100%' }}><Home size={16} /> RUDI NYUMBANI</button></Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}