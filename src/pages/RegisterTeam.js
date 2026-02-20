import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { 
  X, ChevronRight, ChevronLeft, Users, Camera, 
  CheckCircle, Trash2, AlertCircle, Copy, Home, Loader, Crop, FileText
} from 'lucide-react';

// 🔥 CONFIGURATION - KUTOKA KWENYE .ENV
const SPACE_ID = process.env.REACT_APP_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.REACT_APP_ACCESS_TOKEN; 
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";

const LOCATIONS = [
  { group: 'KIOMONI', areas: ['Kiomoni', 'Mpirani', 'Mabayani', 'Ndumi','Kivuleni', 'Cross Z', 'Mbogo', 'Kilimanjaro', 'Mowe', 'Masaini', 'Muheza', 'Kikuluni', 'Chote', 'Lwande', 'Magubeni', 'Marembwe', 'Mavumbi', 'Mijohoroni', 'Mjesani', 'Mnyenzani', 'Amboni', 'Mabokweni'] },
  { group: 'TANGA MJINI', areas: ['Ngamiani', 'Majengo', 'Mabawa', 'Central', 'Makorora', 'Mzingani', 'Tanga Sisi', 'Mnyanjani', 'Usagara', 'Nguvumali', 'Pongwe', 'Magaoni', 'Duga', 'Maweni', 'Chongoleani', 'Raskazone', 'Donge', 'Gofu'] },
  { group: 'DAR ES SALAAM', areas: ['Goba', 'Madale', 'Makongo', 'Mbezi Mwisho', 'Mbezi Beach', 'Kimara', 'Sinza', 'Ubungo', 'Mabibo', 'Tegeta', 'Tegeta A','Kwa Madawa', 'Msumi', 'Maramba Mawili', 'Mageti', 'Goba Mpakani','Ubungo B', 'Buguruni', 'Tabata', 'Bunju', 'Kinondoni', 'Ilala', 'Chamazi', 'Kigamboni', 'Mbagala', 'Boko', 'Salasala', 'Ununio', 'Kawe'] },
  { group: 'OUTSIDE', areas: ['Nje ya Tanga/Dar'] }
];

const DAR_AREAS = ['Goba', 'Madale', 'Makongo', 'Mbezi Mwisho', 'Mbezi Beach', 'Kimara', 'Sinza', 'Ubungo', 'Mabibo', 'Tegeta', 'Tgetea A', 'Kwa Madawa', 'Msumi', 'Maramba Mawili', 'Mageti', 'Goba Mpakani', 'Ubungo B', 'Buguruni', 'Tabata', 'Bunju', 'Kinondoni', 'Ilala', 'Chamazi', 'Kigamboni', 'Mbagala', 'Boko', 'Kawe', 'Kwa Robert', 'Mkuranga', 'Kibaha', 'Pwani Mjini', 'Gongo La Mboto', 'Chanika'];

const MIXX_LIPA_NAMBA = '15744793';
const RECEIVER_NAME = 'FUTURE VISION';
const REGISTRATION_FEE = 70000;

export default function RegisterTeam() {
  const [step, setStep] = useState(0); 
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [team, setTeam] = useState({
    name: '', coach: '', phone: '', email: '', location: '', jersey: '', season: '2026',
    coachPhotoPreview: null, coachPhotoUrl: '', uploadingCoach: false
  });

  const [players, setPlayers] = useState([
    { id: 1, name: '', aka: '', pos: '', no: '', photo: null, preview: null, photoUrl: '', uploading: false }
  ]);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [activePlayerId, setActivePlayerId] = useState(null);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isRestored, setIsRestored] = useState(false);

  const fileRefs = useRef({});

  // 🔥 SENSEI FIX: LOAD DATA KUTOKA LOCAL STORAGE (KUTUNZA PROGRESS)
  useEffect(() => {
    const savedData = localStorage.getItem('pandeCupDraft');
    if (savedData) {
      try {
        const { savedTeam, savedPlayers, savedStep, savedRules } = JSON.parse(savedData);
        if (savedTeam) setTeam(prev => ({...prev, ...savedTeam, uploadingCoach: false, coachPhotoPreview: savedTeam.coachPhotoUrl || null}));
        if (savedPlayers && savedPlayers.length > 0) {
           const restoredPlayers = savedPlayers.map(p => ({...p, uploading: false, preview: p.photoUrl || null}));
           setPlayers(restoredPlayers);
        }
        if (savedStep !== undefined && savedStep < 5) setStep(savedStep);
        if (savedRules) setAgreedToRules(savedRules);
        setIsRestored(true);
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
  }, []);

  // 🔥 SENSEI FIX: SAVE DATA KWENYE LOCAL STORAGE KILA KINAPOBADILIKA
  useEffect(() => {
     if (success) return; // Usi-save kama imeshamaliza
     const dataToSave = {
       savedTeam: { ...team, coachPhotoPreview: null }, // Tunakwepa kusave blob files
       savedPlayers: players.map(p => ({ ...p, photo: null, preview: null })), // Tunatunza URL tu na maandishi
       savedStep: step,
       savedRules: agreedToRules
     };
     localStorage.setItem('pandeCupDraft', JSON.stringify(dataToSave));
  }, [team, players, step, agreedToRules, success]);

  const next = () => {
    if (validate()) {
      setStep(s => Math.min(s + 1, 5));
      setError('');
      window.scrollTo(0, 0);
    }
  };

  const prev = () => {
    setStep(s => Math.max(s - 1, 0));
    setError('');
  };

  const validate = () => {
    setError('');
    if (step === 0) {
      if (!agreedToRules) return setError('Lazima usome na kukubaliana na mkataba na sheria zote za Pande Cup ili kuendelea'), false;
    }
    if (step === 1) {
      if (!team.name.trim()) return setError('Jaza jina la timu'), false;
      if (!team.coach.trim()) return setError('Jaza jina la kocha/manager'), false;
      if (!team.coachPhotoUrl) return setError('Picha ya Kocha/Manager inahitajika kwenye mfumo'), false;
      if (!/^(06|07)\d{8}$/.test(team.phone)) return setError('Namba ya simu si sahihi (07XXXXXXXX)'), false;
      if (!team.location) return setError('Chagua eneo'), false;
    }
    if (step === 2) {
      const valid = players.filter(p => p.name.trim());
      if (valid.length < 11) return setError('Unahitaji wachezaji 11+ ili kuendelea'), false;
      const pendingUploads = players.some(p => p.uploading) || team.uploadingCoach;
      if (pendingUploads) return setError('Subiri picha zimalize kupanda hewani...'), false;
      
      // 🔥 SENSEI FIX: PICHA NI LAZIMA KAMA ULIVYOAGIZA! (STRICT RULES)
      const missingPhotos = valid.some(p => !p.photoUrl);
      if (missingPhotos) return setError('Kuna wachezaji hawana picha. Sura ndio ID, picha ni lazima.'), false;
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

  const onSelectFile = (id, e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) return;
      
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setUpImg(reader.result);
        setActivePlayerId(id);
        setCropModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const generateCroppedImageAndUpload = async () => {
    if (!completedCrop || !imgRef.current) return;
    setCropModalOpen(false);
    
    if (activePlayerId === 'coach') {
      setTeam(prev => ({ ...prev, uploadingCoach: true }));
    } else {
      setPlayers(prev => prev.map(p => p.id === activePlayerId ? { ...p, uploading: true } : p));
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0, 0, completedCrop.width, completedCrop.height
    );

    canvas.toBlob(async (blob) => {
      if (!blob) {
        alert("Kuna shida kwenye kukata picha.");
        if (activePlayerId === 'coach') setTeam(prev => ({ ...prev, uploadingCoach: false }));
        else setPlayers(prev => prev.map(p => p.id === activePlayerId ? { ...p, uploading: false } : p));
        return;
      }

      const previewUrl = URL.createObjectURL(blob);
      if (activePlayerId === 'coach') {
        setTeam(prev => ({ ...prev, coachPhotoPreview: previewUrl }));
      } else {
        setPlayers(prev => prev.map(p => p.id === activePlayerId ? { ...p, preview: previewUrl } : p));
      }

      const formData = new FormData();
      formData.append("file", blob, "cropped.jpg");
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);
      
      // 🔥 UCHAWI WA AI BACKGROUND REMOVAL (Free Plan) UMEWASHWA HAPA!
  
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST", body: formData
        });
        const data = await res.json();
        
        if (data.secure_url) {
          
          // 🔥 UCHAWI WA CLOUDINARY BURE HAPA (Auto-Focus Sura, Mwanga, na Rangi)
          const enhancedUrl = data.secure_url.replace(
            "/upload/", 
            "/upload/c_fill,g_face,w_400,h_400,e_improve,e_auto_color/"
          );

          if (activePlayerId === 'coach') {
            setTeam(prev => ({ ...prev, coachPhotoUrl: enhancedUrl, uploadingCoach: false }));
          } else {
            setPlayers(prev => prev.map(p => p.id === activePlayerId ? { ...p, photoUrl: enhancedUrl, uploading: false } : p));
          }
        } else throw new Error("No URL returned");
      } catch (err) {
        alert("Picha haikupanda. Tafadhali jaribu tena.");
        if (activePlayerId === 'coach') setTeam(prev => ({ ...prev, uploadingCoach: false, coachPhotoPreview: null }));
        else setPlayers(prev => prev.map(p => p.id === activePlayerId ? { ...p, uploading: false, preview: null } : p));
      }
    }, 'image/jpeg', 0.9);
  };

  const submit = async () => {
    setLoading(true);
    setError('');

    if (!SPACE_ID || !MANAGEMENT_TOKEN) {
        setError("Configuration Error: Hakikisha Keys za Contentful ziko sawa kwenye .env");
        setLoading(false);
        return;
    }

    try {
      const loc = DAR_AREAS.includes(team.location) ? 'goba' : 'kiomoni';
      
      const playersPayload = players
        .filter(p => p.name.trim() && p.photoUrl) // Lazima wawe na picha sasa
        .map(p => ({
          name: p.name,
          aka: p.aka || "",
          position: p.pos || "Unknown",
          number: parseInt(p.no) || 0,
          photo: p.photoUrl || ""  
        }));

      // 🔥 SENSEI FIX: TUMEMTOA KOCHA KWENYE 'playersPayload' ILI ASIENDE KUVURUGA IDADI YA WACHEZAJI WAKO 11-25.

      const contentfulData = {
        fields: {
          teamName: { 'en-US': team.name },
          coachName: { 'en-US': team.coach },
          coachPhotoUrl: { 'en-US': team.coachPhotoUrl }, // 🔥 ANAJITEGEMEA HAPA
          phoneNumber: { 'en-US': team.phone },
          location: { 'en-US': loc },
          rawLocation: { 'en-US': team.location },
          season: { 'en-US': team.season },
          status: { 'en-US': 'Pending' },
          totalPlayers: { 'en-US': playersPayload.length },
          players: { 'en-US': JSON.stringify(playersPayload) }, // Wachezaji pekee
          paymentStatus: { 'en-US': false }, 
          registrationDate: { 'en-US': new Date().toISOString() },
          adminNotes: { 'en-US': 'New Registration via Web' }
        }
      };

      if (team.jersey && team.jersey.trim() !== '') {
          contentfulData.fields.jerseyColor = { 'en-US': team.jersey };
      }

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
        const errData = await response.json();
        console.error("MAJIBU YA CONTENTFUL:", errData);
        let exactError = "Hitilafu haijulikani";
        if (errData.details && errData.details.errors) {
           exactError = errData.details.errors.map(e => `${e.name} kwenye field '${e.path ? e.path.join('.') : 'haijulikani'}'`).join(' | ');
        } else if (errData.message) {
           exactError = errData.message;
        }
        throw new Error(`Contentful imekataa: ${exactError}`);
      }

      const entry = await response.json();
      
      await fetch(
        `https://api.contentful.com/spaces/${SPACE_ID}/environments/master/entries/${entry.sys.id}/published`,
        { method: 'PUT', headers: { 'Authorization': `Bearer ${MANAGEMENT_TOKEN}`, 'X-Contentful-Version': entry.sys.version } }
      );

      // Futa draft ukifanikiwa kusubmit
      localStorage.removeItem('pandeCupDraft');

      setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);

    } catch (err) {
      console.error("Submission Error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const copy = () => { navigator.clipboard.writeText(MIXX_LIPA_NAMBA); alert('Namba imekopiwa: ' + MIXX_LIPA_NAMBA); };

  const progress = step === 0 ? 0 : (step / 5) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&family=Oswald:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #020617; color: white; }
        .oswald { font-family: 'Oswald', sans-serif; }
        .input { width: 100%; background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; color: white; font-size: 14px; outline: none; transition: 0.2s; }
        .input:focus { border-color: #a3e635; box-shadow: 0 0 0 2px rgba(163,230,53,0.2); }
        .btn { background: #a3e635; color: black; font-weight: 800; padding: 14px 24px; border-radius: 8px; border: none; cursor: pointer; font-size: 14px; text-transform: uppercase; transition: 0.2s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; letter-spacing: 0.5px; }
        .btn:hover:not(:disabled) { background: #bef264; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(163, 230, 53, 0.3); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-sec { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: white; }
        .btn-sec:hover { background: rgba(255,255,255,0.1); }
        .card { background: rgba(30,41,59,0.6); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 16px; position: relative; }
        .photo { width: 70px; height: 70px; border-radius: 12px; border: 2px dashed rgba(163,230,53,0.4); display: flex; align-items: center; justify-content: center; cursor: pointer; background: rgba(15,23,42,0.8); overflow: hidden; position: relative; transition: 0.3s; flex-shrink: 0; }
        .photo:hover { border-color: #a3e635; background: rgba(163,230,53,0.1); }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        .glass-panel { background: rgba(15,23,42,0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); border-radius: 10px; }
        
        /* Mobile Adjustments */
        @media (max-width: 768px) { 
          .grid { grid-template-columns: 1fr !important; } 
          .btn { width: 100%; }
          .player-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .player-photo-container { flex-direction: row !important; justify-content: flex-start !important; align-items: center !important; margin-bottom: 12px; gap: 16px !important; }
          .form-container { padding: 20px 16px !important; }
          .rules-container { padding: 20px 16px !important; }
        }
      `}</style>

      {/* 🔥 CROP MODAL OVERLAY */}
      {cropModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.95)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#0f172a', padding: '24px', borderRadius: '24px', maxWidth: '500px', width: '100%', border: '1px solid #a3e635', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <h3 className="oswald" style={{ color: 'white', marginBottom: '8px', textAlign: 'center', fontSize: '20px', letterSpacing: '1px' }}>KATA PICHA ✂️</h3>
            <p style={{ color: '#94a3b8', fontSize: '12px', textAlign: 'center', marginBottom: '20px' }}>Weka sura katikati ya mraba.</p>
            
            <div style={{ background: '#020617', borderRadius: '12px', overflow: 'hidden', display: 'flex', justifyContent: 'center', maxHeight: '50vh' }}>
              <ReactCrop 
                crop={crop} 
                onChange={(c) => setCrop(c)} 
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                circularCrop={false}
              >
                <img src={upImg} onLoad={e => onLoad(e.currentTarget)} alt="Crop me" style={{ maxHeight: '50vh', width: 'auto' }} />
              </ReactCrop>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <button className="btn btn-sec" style={{ flex: 1 }} onClick={() => setCropModalOpen(false)}>GHAIRI</button>
              <button className="btn" style={{ flex: 1 }} onClick={generateCroppedImageAndUpload}><Crop size={16}/> HIFADHI</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, rgba(163,230,53,0.05), #020617 50%)', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* TOP NAV */}
        <div style={{ width: '100%', maxWidth: '800px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', transition: '0.2s' }}>
            <Home size={16} /> Rudi Nyumbani
          </Link>
          {isRestored && !success && (
            <span style={{ fontSize: '11px', color: '#a3e635', background: 'rgba(163,230,53,0.1)', padding: '4px 10px', borderRadius: '50px', border: '1px solid rgba(163,230,53,0.2)' }}>
              Draft Saved 🔄
            </span>
          )}
        </div>

        {/* MAIN CARD */}
        <div className="form-container" style={{ width: '100%', maxWidth: '800px', background: 'rgba(30,41,59,0.7)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '32px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src={LOGO_PATH} alt="Pande Cup" style={{ height: '60px', marginBottom: '16px', filter: 'drop-shadow(0 0 15px rgba(163,230,53,0.3))' }} />
            
            <p className="oswald" style={{ color: '#a3e635', fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              Ligi Moja, Upendo Mmoja, Vumbi Moja
            </p>
            
            <h1 className="oswald" style={{ fontSize: '26px', color: 'white', marginBottom: '4px', letterSpacing: '1px' }}>USAJILI WA TIMU</h1>
            <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px' }}>Msimu wa {team.season}</p>
          </div>

          {step > 0 && (
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
          )}

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', padding: '12px 16px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '600' }}>
              <AlertCircle size={20} style={{ flexShrink: 0 }} /> <span>{error}</span>
            </div>
          )}

          {/* 🔥 STEP 0: SHERIA */}
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="glass-panel rules-container" style={{ padding: '32px 24px', borderLeft: '4px solid #ef4444' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                  <FileText size={32} color="#ef4444" />
                  <div>
                    <h3 className="oswald" style={{ color: '#ef4444', fontSize: '22px', margin: 0, letterSpacing: '1px' }}>SOMA KWA MAKINI NA UZINGATIVU KABLA YA KUSAJILI TIMU YAKO</h3>
                  </div>
                </div>
                
                <div className="custom-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: '55vh', overflowY: 'auto', paddingRight: '16px' }}>
                  
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', margin: 0 }}>
                    Karibu kwenye <strong>Pande Cup {team.season}</strong>. Sisi ni mapinduzi ya soka la mchangani (Digital Grassroots Football). Ili kuhakikisha ligi inakuwa ya haki, yenye mvuto, na inakamilika ndani ya MWEZI MMOJA kama ilivyopangwa, sheria hizi hazipindishwi. Kwa kubonyeza "Ninakubali" chini ya ukurasa huu, wewe na timu yako mnajiingiza kwenye mkataba na Kamati ya Pande Cup.
                  </p>

                  <div>
                    <h4 style={{ color: '#a3e635', fontSize: '16px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.5px' }}>1. USAJILI NI "KIDIJITALI" 100% (Sheria ya Picha na Data)</h4>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '8px' }}>
                      Usajili wote unafanyika kupitia www.pandecup.co.tz. Hakuna usajili wa makaratasi, na hakuna usajili uwanjani.
                    </p>
                    <ul style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Mwongozo wa Picha (MUHIMU SANA):</strong> Mfumo wetu unatengeneza "Kadi za Wachezaji" (Player Cards). Ili mchezaji akubaliwe: Picha lazima iwe ya kifuani kwenda juu (Portrait/Passport size), sura ionekane wazi kabisa bila miwani ya giza.</li>
                      <li><strong>Jezi:</strong> Inashauriwa sana mchezaji/kocha apige picha akiwa amevaa jezi ya timu, na rangi iendane na jezi mtakayotumia uwanjani ili kuleta muonekano wa kiprofessional kwenye tovuti.</li>
                      <li><strong>Picha ya Kocha/Meneja:</strong> Ni lazima kiongozi wa benchi la ufundi aweke picha yake kwenye mfumo (Hatua ya Kwanza).</li>
                      <li><strong>Ujanja-Ujanja Marufuku:</strong> Sura yako ndio ID yako. Haruhusiwi mchezaji kuingia uwanjani kama hayuko kwenye mfumo. Ukileta mchezaji "mamluki", timu inafutwa mashindanoni hapo hapo.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ color: '#a3e635', fontSize: '16px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.5px' }}>2. NIDHAMU YA MUDA (Dakika 15 Tu!)</h4>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '8px' }}>Muda ni Pesa. Hatuna muda wa kupoteza, ligi hii imeundwa kumalizika ndani ya mwezi mmoja.</p>
                    <ul style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Muda Kamili:</strong> Mechi itaanza saa kamili kama inavyoonekana kwenye ratiba ya tovuti.</li>
                      <li><strong>Dakika za Nyama (Walkover):</strong> Ukichelewa kwa dakika 15 baada ya filimbi ya kuanza, timu yako imekula Walkover. Pointi 3 na magoli 2 yanaenda kwa mpinzani wako.</li>
                      <li><strong>Hakuna Kiporo:</strong> Mechi haiahirishwi kienyeji. Ukishindwa kutokea uwanjani, umeyataka na timu yako itapoteza ada ya usajili.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ color: '#a3e635', fontSize: '16px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.5px' }}>3. FORMAT YA MECHI (Dakika 90 za Kazi)</h4>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '8px' }}>Tunataka soka la kasi na la kuvutia kwa ajili ya mashabiki na Live Stream.</p>
                    <ul style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Muda wa Mchezo:</strong> Dakika 45 kwa kila kipindi. Mapumziko ni dakika 10.</li>
                      <li><strong>Substitutions:</strong> Unaruhusiwa kubadili wachezaji 5 ili kuongeza nguvu na kulinda afya za wachezaji.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ color: '#a3e635', fontSize: '16px', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '900', letterSpacing: '0.5px' }}>4. NIDHAMU, USALAMA, NA ULINZI SHIRIKISHI</h4>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '8px' }}>Pande Cup ni upendo na burudani. Hatuvumilii uhuni wa aina yoyote.</p>
                    <ul style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.7', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Kadi ni Gharama:</strong> Kadi 2 za njano (kwa mechi tofauti za hatua ya makundi) zinakufanya ukose mechi 1. Kadi nyekundu ya moja kwa moja inakufanya ukose mechi 2 au kufungiwa mashindano mazima kulingana na uzito wa kosa.</li>
                      <li><strong>Zero Tolerance kwa Fujo:</strong> Ukileta fujo, kumpiga mwamuzi, au kuanzisha mapigano, wewe na timu yako mnayaaga mashindano papo hapo.</li>
                      <li><strong>Ulinzi Shirikishi Upo Kazini:</strong> Kamati inashirikiana bega kwa bega na Ulinzi Shirikishi wa Mtaa. Mtu yeyote atakayefanya vurugu atachukuliwa hatua kali za kisheria na kukabidhiwa Polisi mara moja.</li>
                    </ul>
                  </div>

                </div>

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'flex-start', gap: '14px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px' }}>
                  <input 
                    type="checkbox" id="rulesCheck" checked={agreedToRules} onChange={(e) => setAgreedToRules(e.target.checked)}
                    style={{ minWidth: '24px', height: '24px', cursor: 'pointer', accentColor: '#a3e635', marginTop: '2px' }}
                  />
                  <label htmlFor="rulesCheck" style={{ cursor: 'pointer', fontSize: '14px', fontWeight: '800', color: agreedToRules ? '#a3e635' : 'white', lineHeight: '1.5' }}>
                    Ninakubali. Mimi kama kiongozi, nathibitisha nimesoma na kukubaliana na Mkataba na Kanuni zote za Pande Cup bila shuruti.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 🔥 STEP 1: TAARIFA ZA TIMU NA PICHA YA KOCHA */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>JINA LA TIMU *</label><input className="input" type="text" placeholder="Mfano: Mpirani FC" value={team.name} onChange={e => setTeam({...team, name: e.target.value})} /></div>
              
              {/* SEHEMU YA KOCHA NA PICHA YAKE */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#a3e635', marginBottom: '12px', fontWeight: '900', textTransform: 'uppercase' }}>Benchi la Ufundi (Kocha / Manager) *</label>
                <div className="player-grid" style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '16px', alignItems: 'center' }}>
                  <div className="player-photo-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <input type="file" accept="image/*" ref={el => fileRefs.current['coach'] = el} style={{ display: 'none' }} onChange={(e) => onSelectFile('coach', e)} />
                    <div className="photo" onClick={() => fileRefs.current['coach']?.click()}>
                       {team.uploadingCoach ? <Loader className="spin" size={24} color="#a3e635" /> : team.coachPhotoPreview ? <img src={team.coachPhotoPreview} alt="Coach" /> : <Camera size={24} color="#64748b" />}
                    </div>
                    {!team.coachPhotoPreview && !team.uploadingCoach && <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 'bold' }}>Picha Ni Lazima</span>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input className="input" type="text" placeholder="Jina Kamili la Kocha *" value={team.coach} onChange={e => setTeam({...team, coach: e.target.value})} style={{ padding: '10px 12px', fontSize: '13px' }}/>
                    <input className="input" type="tel" placeholder="Namba ya Simu (07XXXXXXXX) *" value={team.phone} onChange={e => setTeam({...team, phone: e.target.value})} style={{ padding: '10px 12px', fontSize: '13px' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="grid">
                <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>EMAIL</label><input className="input" type="email" placeholder="email@example.com" value={team.email} onChange={e => setTeam({...team, email: e.target.value})} /></div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>ENEO *</label>
                  <select className="input" value={team.location} onChange={e => setTeam({...team, location: e.target.value})} style={{ cursor: 'pointer' }}><option value="">Chagua...</option>{LOCATIONS.map(g => (<optgroup key={g.group} label={g.group} style={{ background: '#0f172a', color: '#a3e635' }}>{g.areas.map(a => <option key={a} value={a} style={{ color: 'white' }}>{a}</option>)}</optgroup>))}</select>
                </div>
              </div>
              <div><label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '6px', fontWeight: '600' }}>RANGI ZA JEZI</label><input className="input" type="text" placeholder="Njano (Home), Nyeusi (Away)" value={team.jersey} onChange={e => setTeam({...team, jersey: e.target.value})} /></div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: 'rgba(163,230,53,0.05)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(163,230,53,0.2)' }}>
                <div><h3 style={{ fontSize: '15px', fontWeight: '900', color: '#a3e635' }}>Orodha ya Wachezaji</h3><p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>{players.filter(p => p.name.trim()).length}/25 (Min: 11)</p></div>
                <button className="btn" onClick={addPlayer} disabled={players.length >= 25} style={{ padding: '8px 12px', fontSize: '12px' }}><Users size={16} /> <span style={{display: 'none', '@media (min-width: 400px)': {display: 'inline'}}}>ONGEZA</span></button>
              </div>
              
              <div style={{ maxHeight: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '4px' }} className="custom-scroll">
                {players.map((p, i) => (
                  <div key={p.id} className="card" style={{ paddingTop: '28px' }}>
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#a3e635', color: 'black', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '12px', zIndex: 2 }}>{i + 1}</div>
                    {players.length > 1 && (<button onClick={() => delPlayer(p.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '6px', borderRadius: '6px', cursor: 'pointer', zIndex: 2 }}><Trash2 size={14} /></button>)}
                    
                    <div className="player-grid" style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: '16px', marginTop: '16px' }}>
                      
                      <div className="player-photo-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <input type="file" accept="image/*" ref={el => fileRefs.current[p.id] = el} style={{ display: 'none' }} onChange={(e) => onSelectFile(p.id, e)} />
                        <div className="photo" onClick={() => fileRefs.current[p.id]?.click()}>
                           {p.uploading ? <Loader className="spin" size={24} color="#a3e635" /> : p.preview ? <img src={p.preview} alt="Player" /> : <Camera size={24} color="#64748b" />}
                        </div>
                        {!p.preview && !p.uploading && <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 'bold' }}>Weka Picha *</span>}
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input className="input" type="text" placeholder="Jina Kamili (Kama Kwenye ID) *" value={p.name} onChange={e => updatePlayer(p.id, 'name', e.target.value)} style={{ padding: '10px 12px', fontSize: '13px' }} />
                        <input className="input" type="text" placeholder="Jina Maarufu (AKA)" value={p.aka} onChange={e => updatePlayer(p.id, 'aka', e.target.value)} style={{ padding: '10px 12px', fontSize: '13px' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '10px' }}>
                          <select className="input" value={p.pos} onChange={e => updatePlayer(p.id, 'pos', e.target.value)} style={{ padding: '10px 12px', fontSize: '13px', cursor: 'pointer' }}><option value="">Nafasi...</option><option value="GK">Goalkeeper (GK)</option><option value="DEF">Defender (DEF)</option><option value="MID">Midfielder (MID)</option><option value="FWD">Forward (FWD)</option></select>
                          <input className="input" type="number" placeholder="No." value={p.no} onChange={e => updatePlayer(p.id, 'no', e.target.value)} style={{ padding: '10px 12px', fontSize: '13px', textAlign: 'center' }} min="1" max="99" />
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
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ color: '#a3e635', fontSize: '16px', marginBottom: '20px', fontWeight: '900' }}>TAARIFA ZA TIMU</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}><span style={{ color: '#94a3b8' }}>Timu:</span><span style={{ fontWeight: 'bold' }}>{team.name}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}><span style={{ color: '#94a3b8' }}>Kocha:</span><span style={{ fontWeight: 'bold' }}>{team.coach}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}><span style={{ color: '#94a3b8' }}>Simu:</span><span style={{ fontWeight: 'bold' }}>{team.phone}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}><span style={{ color: '#94a3b8' }}>Eneo:</span><span style={{ fontWeight: 'bold' }}>{team.location}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#94a3b8' }}>Wachezaji:</span><span style={{ color: '#a3e635', fontWeight: 'bold' }}>{players.filter(p => p.name.trim()).length} / 25</span></div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
             <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
                <h3 style={{ color: '#a3e635', fontSize: '20px', marginBottom: '16px', fontWeight: '900' }}>ADA YA USAJILI</h3>
                <div style={{ fontSize: '42px', fontWeight: '900', color: 'white', marginBottom: '6px' }}>TSH {REGISTRATION_FEE.toLocaleString()}/=</div>
                <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>Ada ya usajili kwa timu moja (Mixx By Yas)</p>
                
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '24px', textAlign: 'left', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ background: 'rgba(163,230,53,0.05)', border: '1px solid rgba(163,230,53,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                       <div>
                         <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Lipa Namba</p>
                         <div style={{ fontSize: '32px', fontWeight: '900', color: '#a3e635', letterSpacing: '2px' }}>{MIXX_LIPA_NAMBA}</div>
                       </div>
                       <button onClick={copy} style={{ background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.3)', color: '#a3e635', padding: '12px', borderRadius: '10px', cursor: 'pointer', transition: '0.3s' }}>
                         <Copy size={20} color="currentColor" />
                       </button>
                     </div>
                     <div style={{ borderTop: '1px solid rgba(163,230,53,0.2)', marginTop: '16px', paddingTop: '16px' }}>
                       <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Jina la Mpokeaji:</p>
                       <p style={{ fontSize: '16px', color: 'white', fontWeight: 'bold' }}>{RECEIVER_NAME}</p>
                     </div>
                   </div>
                   
                   <div style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.8' }}>
                     <p style={{ fontWeight: '800', color: 'white', marginBottom: '12px', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>Hatua za Kulipa (Vodacom):</p>
                     <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <li>Piga <strong>*150*01#</strong></li>
                       <li>Chagua: <strong>5. Lipa Kwa Simu</strong></li>
                       <li>Chagua: <strong>1. Kwenda Mixx By Yas</strong></li>
                       <li>Ingiza Lipa Namba: <strong style={{ color: '#a3e635' }}>{MIXX_LIPA_NAMBA}</strong></li>
                       <li>Ingiza Kiasi: <strong style={{ color: '#a3e635' }}>{REGISTRATION_FEE.toLocaleString()}</strong></li>
                       <li>Thibitisha: <strong>{RECEIVER_NAME}</strong></li>
                     </ol>
                   </div>
                </div>
             </div>
          )}

          {step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '30px 0' }}>
              <div style={{ background: 'rgba(163,230,53,0.1)', padding: '24px', borderRadius: '50%', border: '2px solid #a3e635' }}>
                <CheckCircle size={64} color="#a3e635" />
              </div>
              <h3 className="oswald" style={{ fontSize: '28px', color: 'white', letterSpacing: '1px', textAlign: 'center' }}>TAYARI KUSUBMIT?</h3>
              <p style={{ color: '#94a3b8', textAlign: 'center', maxWidth: '450px', lineHeight: '1.6', fontSize: '14px' }}>Kwa kubonyeza "SUBMIT REGISTRATION", unathibitisha kuwa umelipa ada na taarifa zote ulizojaza ni sahihi kulingana na sheria za Pande Cup.</p>
            </div>
          )}

          {/* NAV BUTTONS */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {step > 0 && <button className="btn btn-sec" onClick={prev} style={{ flex: 1 }}><ChevronLeft size={16} /> NYUMA</button>}
            {step < 5 ? (<button className="btn" onClick={next} style={{ flex: step === 0 ? 'none' : 1, width: step === 0 ? '100%' : 'auto' }}>{step === 0 ? 'NIMEELEWA, ENDELEA KUSAJILI' : 'ENDELEA'} <ChevronRight size={16} /></button>) : (<button className="btn" onClick={submit} disabled={loading} style={{ flex: 1 }}>{loading ? 'INATUMA...' : 'SUBMIT REGISTRATION'} {!loading && <CheckCircle size={16} />}</button>)}
          </div>
        </div>

        {/* SUCCESS MODAL */}
        {success && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(163,230,53,0.3)', maxWidth: '450px', width: '100%', padding: '40px 32px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ width: '80px', height: '80px', background: 'rgba(163,230,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '3px solid #a3e635' }}>
                <CheckCircle size={40} color="#a3e635" />
              </div>
              <h2 className="oswald" style={{ fontSize: '28px', color: 'white', marginBottom: '12px', letterSpacing: '1px' }}>HONGERA! 🎉</h2>
              <p style={{ color: '#cbd5e1', fontSize: '16px', lineHeight: '1.6', marginBottom: '12px' }}>Usajili wa <strong style={{ color: '#a3e635', textTransform: 'uppercase' }}>{team.name}</strong> umepokelewa kikamilifu.</p>
              <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>Uongozi wa Pande Cup utaupitia na kuwasiliana na wewe hivi punde kuthibitisha ushiriki wenu.</p>
              <Link to="/" style={{ textDecoration: 'none' }}><button className="btn" style={{ width: '100%' }}><Home size={16} /> RUDI NYUMBANI</button></Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}