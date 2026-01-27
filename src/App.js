import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet"; 
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Video, Play, ChevronRight, Phone, Info, History, Newspaper, Trophy, FileText, User, Mail, Calendar, Grid, Shield, Maximize2, ChevronDown, ChevronUp, CheckCircle, Copy, Shirt, Tag 
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
// SENSEI FIX: Nimetumia link ya mtandaoni moja kwa moja ili isizingue
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";
const USE_IMAGE_LOGO = true;

// --- LINKS ZA SOCIAL MEDIA ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

// --- ORODHA YA MITAA (SMART LIST - UPDATED) ---
const LOCATIONS_LIST = [
  { 
    group: 'KIOMONI (Nyumbani - The Root)', 
    areas: ['Kiomoni', 'Mpirani', 'Mabayani', 'Ndumi', 'Magubeni', 'Kivuleni', 'Cross Z', 'Mbogo', 'Kilimanjaro', 'Mowe', 'Masaini', 'Muheza', 'Kikuluni', 'Chote', 'Lwande', 'Marembwe', 'Mavumbi', 'Mijohoroni', 'Mjesani', 'Mnyenzani'] 
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

// --- ABOUT TEXT ---
const ABOUT_TEXT = {
  description: `Pande Cup si ligi ya soka ya kawaida; ni jukwaa la kijamii na kiuchumi linalotumia nguvu ya soka kuunganisha jamii. Ilizaliwa Pande, Tanga na sasa imefika Goba, Dar es Salaam.

Maono yetu ni kuwa kitovu cha:
• Umoja wa Jamii: Kuwajengea vijana hisia ya "Sense of Belonging".
• Fursa za Kiuchumi: Kufungua milango ya biashara.
• Maendeleo ya Kijamii: Elimu na afya kupitia michezo.

Kutoka dimba la Uruguayi Tanga hadi Goba, tunaandika historia.`,
  slogan: `"Umoja Katika Kila Shuti" • "Pamoja Sisi Ni Pande" • "Mimi Na Mto Zigi Dam Dam"`
};

// --- DATA ZA KUAZIMIA (FALLBACK) ---
const FALLBACK_DATA = {
  hero: [
    {
      location: 'kiomoni',
      title: "HII GAME NI YETU.",
      subtitle: "Soka la mtaani lenye hadhi ya kitaifa. Tunakuza vipaji, tunajenga undugu, na kutetea heshima ya kwetu.",
      bgImage: "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600" 
    },
    {
      location: 'goba',
      title: "HII GAME NI YETU.",
      subtitle: "Pande Cup Imetua Jijini! Kutoka vumbi la Kiomoni hadi Goba.",
      bgImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600"
    }
  ],
  matches: [],
  standings: [],
  news: [],
  videos: [],
  sponsors: [
    { name: "VODACOM", logo: "/images/vodacom.png" }, 
    { name: "CRDB BANK", logo: "/images/crdb.png" },
    { name: "YAS", logo: "/images/yas.png" },
    { name: "POLISI TANZANIA", logo: "/images/polisi.png" },
    { name: "AZAM TV", logo: "/images/azam.png" }
  ]
};

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal' }) => {
  const height = size === 'large' ? '120px' : '56px';
  const [imgError, setImgError] = useState(false);

  if (USE_IMAGE_LOGO && !imgError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={LOGO_PATH} 
            alt="Pande Cup Logo" 
            style={{ height: height, objectFit: 'contain' }} 
            onError={() => setImgError(true)} 
          />
      </div>
    );
  }
  return (
    <div style={{ fontSize: size === 'large' ? '32px' : '24px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', letterSpacing: '-1px', color: 'white' }}>
      PANDE<span style={{ color: '#a3e635' }}>CUP</span>
    </div>
  );
};

const TikTokIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const formatDate = (dateString) => {
  if (!dateString) return "Tarehe";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; 
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Helper for Match Time/Date (24H FORMAT)
const formatMatchTime = (dateString) => {
    if (!dateString) return { date: '', time: '' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { date: '', time: '' };
    return {
        date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        time: date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
    };
};

const renderWithLinks = (text) => {
  if (!text) return "";
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) => {
    if (part.match(/https?:\/\/[^\s]+/)) {
      return <a key={index} href={part} target="_blank" rel="noopener noreferrer" style={{color: '#a3e635', textDecoration: 'underline', wordBreak: 'break-word'}}>{part}</a>;
    }
    return part;
  });
};

const App = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('June 2026'); 
  
  // Registration State
  const [modalStep, setModalStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [submitError, setSubmitError] = useState(''); 
  const [teamData, setTeamData] = useState({ 
    name: '', 
    location: '', 
    coachName: '', 
    nidaNumber: '',
    phone: '', 
    jerseyColor: ''
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  
  // News Pagination State
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  const [cmsData, setCmsData] = useState(FALLBACK_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // --- HANDLERS ---
  const openModal = () => { setIsModalOpen(true); setModalStep(1); setIsMobileMenuOpen(false); document.body.style.overflow = 'hidden'; setSubmitError(''); };
  const closeModal = () => { setIsModalOpen(false); document.body.style.overflow = 'auto'; };
  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
  
  // HANDLE REGISTRATION SUBMIT (DEBUGGING VERSION)
  const handleRegistrationSubmit = async () => {
    setSubmitError('');
    
    // Validation
    if (!teamData.name || !teamData.coachName || !teamData.phone || !teamData.location) {
        setSubmitError('Tafadhali jaza taarifa zote muhimu.');
        return;
    }

    const phoneRegex = /^(06|07)\d{8}$/;
    if (!phoneRegex.test(teamData.phone)) {
        setSubmitError('Weka namba sahihi ya simu (mfano: 0712345678).');
        return;
    }

    setIsSubmitting(true);

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                teamName: teamData.name,
                coachName: teamData.coachName,
                phoneNumber: teamData.phone,
                location: teamData.location,
                jerseyColor: teamData.jerseyColor || 'Haikuwekwa'
            })
        });

        // HAPA: Tunakamata error halisi ya Server
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server Error (${response.status}): ${errorText.substring(0, 100)}...`); 
        }

        const result = await response.json();

        if (result.success) {
            setModalStep(2); // Go to Payment Popup
        } else {
            throw new Error(result.message || 'Tatizo la mtandao.');
        }
    } catch (error) {
        console.error("Submission Error:", error);
        // Hii itakuonesha kosa halisi kwenye simu
        setSubmitError(`SYSTEM ERROR: ${error.message}`);
    } finally {
        setIsSubmitting(false);
    }
  };

  const copyNumber = () => {
    navigator.clipboard.writeText('43852599');
    alert('Namba imekopiwa!');
  };

  const openNews = (newsItem) => { setSelectedNews(newsItem); document.body.style.overflow = 'hidden'; };
  const closeNews = () => { setSelectedNews(null); document.body.style.overflow = 'auto'; };
  const openGroupModal = (groupName, teams) => { setSelectedGroup({ name: groupName, teams: teams }); document.body.style.overflow = 'hidden'; };
  const closeGroupModal = () => { setSelectedGroup(null); document.body.style.overflow = 'auto'; };

  // --- FILTER LOGIC ---
  const getFilteredData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.filter(item => {
        const itemLoc = item.location ? String(item.location).trim().toLowerCase() : 'kiomoni';
        const isLocationMatch = itemLoc.includes(activeLocation);
        const itemSeasonRaw = item.season ? String(item.season) : 'June 2026';
        const itemSeasonClean = itemSeasonRaw.trim().toLowerCase();
        const activeSeasonClean = activeSeason.trim().toLowerCase();
        return isLocationMatch && itemSeasonClean === activeSeasonClean;
    });
  };

  // --- EFFECTS ---
  useEffect(() => {
    setVisibleNewsCount(3);
  }, [activeLocation, activeSeason]);

  useEffect(() => {
    const fetchContentfulData = async () => {
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;

        // 1. HERO
        const heroRes = await fetch(`${baseUrl}&content_type=heroSection&include=1`);
        let fetchedHero = FALLBACK_DATA.hero;
        if (heroRes.ok) {
            const heroJson = await heroRes.json();
            const getAssetUrl = (id, includes) => {
                if (!id || !includes || !includes.Asset) return null;
                const asset = includes.Asset.find(a => a.sys.id === id);
                return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
            };
            if (heroJson.items && heroJson.items.length > 0) {
                fetchedHero = heroJson.items.map(item => ({
                    title: item.fields.title || "HII GAME NI YETU.",
                    subtitle: item.fields.subtitle || "",
                    location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
                    bgImage: getAssetUrl(item.fields.backgroundImage?.sys?.id || item.fields.image?.sys?.id, heroJson.includes)
                }));
            }
        }

        // 2. DATA ZOTE
        const fetchData = async (type) => {
            const res = await fetch(`${baseUrl}&content_type=${type}&include=1`);
            if (!res.ok) return [];
            return await res.json();
        };

        const [matchesData, newsData, standingsData, videosData] = await Promise.all([
            fetchData('match'), fetchData('news'), fetchData('standing'), fetchData('video')
        ]);

        // Process Matches
        const fetchedMatches = matchesData.items ? matchesData.items.map(item => ({
            home: String(item.fields.homeTeam || "Home"),
            away: String(item.fields.awayTeam || "Away"),
            score: String(item.fields.score || "VS"),
            status: String(item.fields.status || "Ratiba"),
            location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
            season: item.fields.season || "June 2026",
            matchDate: item.fields.matchDate || null,
            stadium: item.fields.stadium || ""
        })) : [];

        // Process News
        const fetchedNews = newsData.items ? newsData.items.map(item => {
             const getNewsImage = (id) => {
                if (!id || !newsData.includes || !newsData.includes.Asset) return null;
                const asset = newsData.includes.Asset.find(a => a.sys.id === id);
                return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
             };
             return {
                date: String(item.fields.date || ""), 
                title: String(item.fields.title || "Habari Mpya"),
                excerpt: String(item.fields.excerpt || "Soma zaidi..."),
                body: item.fields.body || "",
                image: getNewsImage(item.fields.image?.sys?.id) || "/images/IMG_5866.jpeg",
                location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
                season: item.fields.season || "June 2026"
             };
        }) : [];

        // Process Standings
        const fetchedStandings = standingsData.items ? standingsData.items.map(item => ({
            pos: item.fields.position || 0,
            team: String(item.fields.teamName || "Team"),
            p: item.fields.played || 0,
            gd: String(item.fields.goalDifference || "0"),
            pts: item.fields.points || 0,
            group: String(item.fields.group || "").toUpperCase(), 
            location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
            season: item.fields.season || "June 2026"
        })) : [];

        // Process Videos
        const fetchedVideos = videosData.items ? videosData.items.map(item => {
             const getThumb = (id) => {
                if (!id || !videosData.includes || !videosData.includes.Asset) return null;
                const asset = videosData.includes.Asset.find(a => a.sys.id === id);
                return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
             };
             return {
                title: String(item.fields.title || "Video"),
                videoUrl: String(item.fields.videoUrl || "#"),
                duration: String(item.fields.duration || ""),
                thumbnail: getThumb(item.fields.thumbnail?.sys?.id) || "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=500",
                location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
                season: item.fields.season || "June 2026"
             };
        }) : [];

        setCmsData({
            hero: fetchedHero,
            matches: fetchedMatches,
            news: fetchedNews,
            standings: fetchedStandings, 
            videos: fetchedVideos,
            sponsors: FALLBACK_DATA.sponsors
        });

      } catch (error) {
        console.error("CMS Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContentfulData();
  }, []);

  const getCurrentHero = () => {
    const heroList = cmsData.hero && cmsData.hero.length > 0 ? cmsData.hero : FALLBACK_DATA.hero;
    const heroItem = heroList.find(h => h.location.includes(activeLocation));
    return heroItem || FALLBACK_DATA.hero[0];
  };

  const currentHero = getCurrentHero();
  const filteredMatches = getFilteredData(cmsData.matches);

  const upcomingMatches = filteredMatches
    .filter(m => m.score.toUpperCase() === 'VS' || m.score.includes(':'))
    .sort((a, b) => {
        const dateA = new Date(a.matchDate || '9999-12-31');
        const dateB = new Date(b.matchDate || '9999-12-31');
        return dateA - dateB;
    });

  const pastMatches = filteredMatches
    .filter(m => m.score.toUpperCase() !== 'VS' && !m.score.includes(':'))
    .sort((a, b) => {
        const dateA = new Date(a.matchDate || '1970-01-01');
        const dateB = new Date(b.matchDate || '1970-01-01');
        return dateB - dateA;
    });

  const filteredNews = getFilteredData(cmsData.news).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const isAValid = !isNaN(dateA.getTime());
      const isBValid = !isNaN(dateB.getTime());
      if (isAValid && isBValid) return dateB - dateA; 
      if (!isAValid && isBValid) return 1; 
      if (isAValid && !isBValid) return -1; 
      return 0; 
  });

  const filteredStandings = getFilteredData(cmsData.standings);
  const sortedTeams = [...filteredStandings].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts; 
      const gdA = parseInt(a.gd) || 0;
      const gdB = parseInt(b.gd) || 0;
      return gdB - gdA; 
  });

  const groupedStandings = sortedTeams.reduce((groups, team) => {
      const groupName = team.group ? `GROUP ${team.group}` : 'LIGI KUU'; 
      if (!groups[groupName]) {
          groups[groupName] = [];
      }
      groups[groupName].push(team);
      return groups;
  }, {});
  
  const sortedGroupKeys = Object.keys(groupedStandings).sort();
  const filteredVideos = getFilteredData(cmsData.videos);
  const isGoba2025 = activeLocation === 'goba' && activeSeason === 'June 2025';

  let displayTitle = currentHero.title;
  let displaySubtitle = currentHero.subtitle;

  if (activeSeason === 'June 2025' && !isGoba2025) {
     displayTitle = "HII GAME NI YETU."; 
     displaySubtitle = (
       <span>
           Ilianzia Kiomoni Pande, Tanga kwenye vumbi la asili ambapo ndoto ilizaliwa. Sasa tumebeba moto huo na kuuwasha Goba, Dar es Salaam.<br/><br/>
           <span style={{ color: '#a3e635', fontWeight: 'bold', fontStyle: 'italic' }}>Ligi Moja. Upendo Mmoja. Vumbi Moja.</span>
       </span>
     );
  }

  const seoTitle = activeLocation === 'goba' ? 'Pande Cup Goba - Soka la Mtaani' : 'Pande Cup Kiomoni - Tanga';
  const seoDescription = "Ratiba, Matokeo na Habari za Pande Cup. Soka la mtaani lenye hadhi ya kimataifa.";

  const styles = {
    container: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif', scrollBehavior: 'smooth', position: 'relative', overflowX: 'hidden' },
    topBar: { backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    nav: { borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 0', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(10px)' },
    navContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' },
    navLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', transition: 'color 0.2s', cursor: 'pointer', padding: '8px' },
    heroWrapper: { position: 'relative', overflow: 'hidden', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(163, 230, 53, 0.1)' },
    heroMedia: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, objectFit: 'cover' },
    heroOverlay: { position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9))' },
    heroContent: { position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    mainTitle: { fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '0.9', letterSpacing: '-0.03em', margin: '0 0 24px', textShadow: '0 10px 30px rgba(0,0,0,0.8)' },
    limeText: { color: '#a3e635' },
    buttonPrimary: { backgroundColor: '#a3e635', color: '#020617', padding: '14px 28px', borderRadius: '8px', fontWeight: '800', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontStyle: 'italic', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(163, 230, 53, 0.2)' },
    locationButton: { padding: '10px 24px', borderRadius: '50px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', border: '1px solid' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' },
    sectionTitle: { fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', margin: 0 },
    newsCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', height: '100%' },
    mobileMenu: { position: 'fixed', top: '0', right: '0', width: '85%', maxWidth: '320px', height: '100vh', backgroundColor: '#0f172a', zIndex: 60, padding: '32px 24px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', borderLeft: '1px solid rgba(255,255,255,0.1)' },
    matchCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th: { textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#64748b', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '1px' },
    td: { padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    groupCard: { backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
          body { font-family: 'Inter', sans-serif; }
          h1, h2, h3, .logo-text { font-family: 'Oswald', sans-serif; }
          .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px -10px rgba(163, 230, 53, 0.2); border-color: rgba(163, 230, 53, 0.3) !important; }
          .nav-glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(15, 23, 42, 0.85) !important; }
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); borderRadius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); borderRadius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(163, 230, 53, 0.6); }
          .animate-fade-in { animation: fadeIn 0.5s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          
          /* MOBILE ADJUSTMENTS */
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .mobile-center { justify-content: center !important; width: 100%; }
            .top-bar-mobile { padding: 8px 12px !important; }
            .hero-mobile-height { min-height: 70vh !important; }
          }
        `}
      </style>

      {/* --- SEO HELMET --- */}
      <Helmet>
        <title>{selectedNews ? selectedNews.title : seoTitle}</title>
        <meta name="description" content={selectedNews ? selectedNews.excerpt : seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pandecup.co.tz/" />
        <meta property="og:title" content={selectedNews ? selectedNews.title : "Pande Cup - Hii Game Ni Yetu"} />
        <meta property="og:description" content={selectedNews ? selectedNews.excerpt : seoDescription} />
        <meta property="og:image" content={selectedNews ? selectedNews.image : "https://pandecup.co.tz/logo.png"} />
      </Helmet>

      <div style={styles.container}>
      {/* 1. TOP BAR */}
      <div style={styles.topBar} className="top-bar-mobile">
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
            <History size={14} /><span style={{ fontWeight: 'bold' }}>SEASON:</span>
            {isLoading ? 
                <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: 8 }}>Loading...</span> : 
                <span style={{ fontSize: '10px', color: '#22c55e', marginLeft: 8, fontWeight: 'bold' }}>{activeSeason}</span>
            }
        </div>
        <div className="mobile-center" style={{ display: 'flex', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', color: activeSeason === 'June 2025' ? '#a3e635' : '#64748b', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setActiveSeason('June 2025'); setActiveLocation('kiomoni'); }}>JUNE 2025 (HISTORIA)</button>
            <button style={{ background: 'none', border: 'none', color: activeSeason === 'June 2026' ? '#a3e635' : '#64748b', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveSeason('June 2026')}>JUNE 2026 (LIVE)</button>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav style={styles.nav} className="nav-glass nav-mobile">
        <div style={styles.navContent}>
          <a href="#hero" style={{ textDecoration: 'none', cursor: 'pointer' }}><PandeLogo /></a>
          <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a onClick={() => window.location.href='#news'} style={styles.navLink}>Habari</a>
            <a onClick={() => window.location.href='#ratiba'} style={styles.navLink}>Ratiba</a>
            <a onClick={() => window.location.href='#tv'} style={styles.navLink}>PC TV</a>
            <button onClick={openModal} style={{ ...styles.buttonPrimary, padding: '10px 24px', fontSize: '12px' }}>SAJILI TIMU</button>
          </div>
          <div style={{ display: 'block' }}>
              <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: window.innerWidth <= 768 ? 'block' : 'none' }}>{isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div style={styles.mobileMenu}>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Nyumbani</a>
            <a href="#news" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Habari & Updates</a>
            <a href="#ratiba" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Ratiba & Matokeo</a>
            <button onClick={openModal} style={{ ...styles.buttonPrimary, marginTop: '20px', width: '100%', justifyContent: 'center' }}>SAJILI TIMU</button>
        </div>
      </div>
      {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 55, backdropFilter: 'blur(4px)' }}></div>}

      {/* 3. HERO SECTION */}
      <div id="hero" style={styles.heroWrapper} className="hero-mobile-height">
        <img 
            src={isGoba2025 ? "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600" : (currentHero.bgImage || "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600")}
            style={{...styles.heroMedia, filter: isGoba2025 ? 'grayscale(100%) brightness(0.4)' : 'none'}}
            alt="Background" 
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600"; }}
        />
        <div style={styles.heroOverlay}></div>
        <section style={styles.heroContent}>
           <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveLocation('kiomoni')} style={{ ...styles.locationButton, borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'rgba(255,255,255,0.2)', backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent', color: activeLocation === 'kiomoni' ? 'black' : 'white' }}>KIOMONI</button>
                <button onClick={() => setActiveLocation('goba')} style={{ ...styles.locationButton, borderColor: activeLocation === 'goba' ? '#a3e635' : 'rgba(255,255,255,0.2)', backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'transparent', color: activeLocation === 'goba' ? 'black' : 'white', opacity: activeSeason === 'June 2025' ? 0.5 : 1 }}>GOBA</button>
           </div>
           
           {isGoba2025 ? (
              <div className="animate-fade-in text-center p-8 bg-black/40 rounded-2xl backdrop-blur-sm border border-white/10">
                <Info size={48} className="text-[#a3e635] mx-auto mb-4" />
                <h1 style={{...styles.mainTitle, fontSize: '32px', marginBottom: '16px'}}>HAKUNA DATA</h1>
                <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '600px', lineHeight: '1.6' }}>Mashindano ya Pande Cup Goba yalianza rasmi 2026. Hakuna data za 2025.</p>
              </div>
            ) : (
              <>
                <h1 style={styles.mainTitle}>{displayTitle}</h1>
                <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '600px', margin: '0 auto 16px', lineHeight: '1.6' }}>
                   {displaySubtitle}
                </p>
              </>
            )}
        </section>
      </div>

      {!isGoba2025 && (
      <>
        {/* 4. NEWS */}
        <section id="news" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={styles.sectionHeader}><Newspaper style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Habari <span style={styles.limeText}>{activeSeason}</span></h2></div>
          {filteredNews.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {filteredNews.slice(0, visibleNewsCount).map((item, idx) => (
                        <div key={idx} className="hover-card" style={styles.newsCard}>
                            <div style={{ height: '200px', overflow: 'hidden' }}>
                            <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="News" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=500"; }} />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold', marginBottom: '8px' }}>{formatDate(item.date)}</span>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 12px', lineHeight: '1.4' }}>{item.title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px', flex: 1 }}>{item.excerpt}</p>
                                <button onClick={() => openNews(item)} style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>SOMA ZAIDI <ChevronRight size={14} color="#a3e635" /></button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* LOAD MORE BUTTON */}
                {filteredNews.length > 3 && (
                    <div style={{ textAlign: 'center' }}>
                        <button 
                            onClick={() => setVisibleNewsCount(prev => prev === 3 ? filteredNews.length : 3)} 
                            style={{ 
                                padding: '12px 32px', 
                                backgroundColor: 'white', 
                                color: 'black', 
                                borderRadius: '50px', 
                                border: 'none', 
                                fontWeight: 'bold', 
                                cursor: 'pointer',
                                fontSize: '13px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
                            }}
                        >
                            {visibleNewsCount === 3 ? (
                                <>ONYESHA HABARI ZAIDI <ChevronDown size={16} /></>
                            ) : (
                                <>PUNGUZA HABARI <ChevronUp size={16} /></>
                            )}
                        </button>
                    </div>
                )}
            </div>
          ) : ( <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}><p>Hakuna habari zilizopakiwa kwa msimu huu bado.</p></div> )}
        </section>

        {/* 5. MATCH CENTER & GROUPS */}
        <section id="ratiba" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
            {/* COLUMN 1: RATIBA & MATOKEO */}
            <div>
              {upcomingMatches.length > 0 && (
                  <div style={{ marginBottom: '48px' }}>
                      <div style={styles.sectionHeader}><Clock style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Ratiba <span style={styles.limeText}>Ijayo</span></h2></div>
                      <div className="custom-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                          {upcomingMatches.map((m, idx) => {
                              const { date, time } = formatMatchTime(m.matchDate);
                              return (
                              <div key={idx} className="hover-card" style={styles.matchCard}>
                                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#64748b', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', width: '100%' }}>
                                      {date && <span>{date}</span>}
                                      {time && <span style={{ color: '#a3e635' }}>• {time}</span>}
                                      {m.stadium && <span>• {m.stadium}</span>}
                                  </div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                      <div style={{ fontWeight: '900', fontSize: '15px', width: '35%' }}>{m.home}</div>
                                      <div style={{ textAlign: 'center' }}>
                                          <div style={{ color: '#a3e635', fontWeight: '900', fontSize: '20px' }}>{m.score}</div>
                                          <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', marginTop: '4px' }}>{m.status}</div>
                                      </div>
                                      <div style={{ fontWeight: '900', fontSize: '15px', textAlign: 'right', width: '35%' }}>{m.away}</div>
                                  </div>
                              </div>
                          )})}
                      </div>
                  </div>
              )}
              {pastMatches.length > 0 && (
                  <div>
                      <div style={styles.sectionHeader}><Trophy style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Matokeo <span style={styles.limeText}>Yaliyopita</span></h2></div>
                      <div className="custom-scroll" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto', paddingRight: '10px' }}>
                          {pastMatches.map((m, idx) => {
                              const { date } = formatMatchTime(m.matchDate);
                              return (
                              <div key={idx} className="hover-card" style={styles.matchCard}>
                                  <div style={{ display: 'flex', justifyContent: 'center', fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>{date} • {m.stadium}</div>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                      <div style={{ fontWeight: '900', fontSize: '15px', width: '35%' }}>{m.home}</div>
                                      <div style={{ textAlign: 'center' }}>
                                          <div style={{ color: 'white', fontWeight: '900', fontSize: '20px' }}>{m.score}</div>
                                          <div style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.status}</div>
                                      </div>
                                      <div style={{ fontWeight: '900', fontSize: '15px', textAlign: 'right', width: '35%' }}>{m.away}</div>
                                  </div>
                              </div>
                          )})}
                      </div>
                  </div>
              )}
              {upcomingMatches.length === 0 && pastMatches.length === 0 && (
                  <p style={{ color: '#64748b', fontStyle: 'italic' }}>Hakuna mechi zilizorekodiwa kwa msimu huu.</p>
              )}
            </div>

            {/* COLUMN 2: MAKUNDI */}
            <div>
              <div style={styles.sectionHeader}><Grid style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Msimamo wa <span style={styles.limeText}>Makundi</span></h2></div>
              {filteredStandings.length > 0 ? (
                <div className="custom-scroll" style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {sortedGroupKeys.map((groupName, gIdx) => (
                    <div key={gIdx} className="hover-card" style={styles.groupCard}>
                      <div style={{ backgroundColor: 'rgba(163, 230, 53, 0.1)', padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Shield size={18} color="#a3e635" />
                            <span style={{ color: 'white', fontWeight: '900', textTransform: 'uppercase', fontSize: '16px', letterSpacing: '1px' }}>
                              {groupName}
                            </span>
                        </div>
                        <button onClick={() => openGroupModal(groupName, groupedStandings[groupName])} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a3e635', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Open</span>
                            <Maximize2 size={16} />
                        </button>
                      </div>
                      
                      <table style={styles.table}>
                        <thead>
                          <tr style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <th style={{...styles.th, width: '40px', paddingLeft: '16px'}}>#</th>
                            <th style={styles.th}>Timu</th>
                            <th style={{...styles.th, textAlign: 'center'}}>P</th>
                            <th style={{...styles.th, textAlign: 'center'}}>GD</th>
                            <th style={{...styles.th, textAlign: 'center', paddingRight: '16px'}}>PTS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedStandings[groupName].slice(0, 5).map((team, idx) => (
                            <tr key={idx} style={{ 
                                borderBottom: idx !== Math.min(groupedStandings[groupName].length, 5) - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                backgroundColor: idx < 2 ? 'rgba(34, 197, 94, 0.05)' : 'transparent' 
                            }}>
                              <td style={{ ...styles.td, paddingLeft: '16px', fontWeight: 'bold', color: idx === 0 ? '#a3e635' : (idx === 1 ? '#4ade80' : 'white') }}>{idx + 1}</td>
                              <td style={{ ...styles.td, fontWeight: 'bold', fontSize: '14px' }}>{team.team}</td>
                              <td style={{ ...styles.td, textAlign: 'center', color: '#94a3b8' }}>{team.p}</td>
                              <td style={{ ...styles.td, textAlign: 'center', color: team.gd.startsWith('+') ? '#a3e635' : (team.gd.startsWith('-') ? '#f87171' : 'white') }}>{team.gd}</td>
                              <td style={{ ...styles.td, textAlign: 'center', fontWeight: '900', color: 'white', fontSize: '15px', paddingRight: '16px' }}>{team.pts}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ) : (<p style={{ color: '#64748b', fontStyle: 'italic' }}>Msimamo haujatoka bado kwa msimu huu.</p>)}
            </div>
          </div>
        </section>

        {/* 6. TV */}
        <section id="tv" style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={styles.sectionHeader}><Video style={styles.limeText} size={24} /><h2 style={styles.sectionTitle}>Pande Cup <span style={styles.limeText}>TV</span></h2></div>
            {filteredVideos.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                  {filteredVideos.map((video, idx) => (
                      <a key={idx} href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="hover-card" style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'block', textDecoration: 'none' }}>
                          <img src={video.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={video.title} />
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}><div style={{ width: '50px', height: '50px', backgroundColor: '#a3e635', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(163,230,53,0.4)' }}><Play size={20} color="black" fill="black" style={{ marginLeft: '4px' }} /></div></div>
                          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}>
                              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{video.title}</p>
                              <p style={{ color: '#cbd5e1', fontSize: '11px', margin: '4px 0 0' }}>{video.duration}</p>
                          </div>
                      </a>
                  ))}
              </div>
            ) : ( <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}><p>Hakuna video.</p></div> )}
        </section>
      </>
      )}

      {/* 7. WADHAMINI */}
      <section id="partners" style={{ padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#020617' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}><p style={{ color: '#64748b', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}>Wanaofanikisha Msimu huu</p></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.7, maxWidth: '1000px', margin: '0 auto' }}>
            {cmsData.sponsors.map((brand, i) => (<div key={i} style={{ fontSize: '24px', fontWeight: '900', color: '#fff', fontStyle: 'italic' }}>{brand.logo ? <img src={brand.logo} alt={brand.name} style={{height: '50px', objectFit: 'contain'}} /> : brand.name}</div>))}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="about" style={{ padding: '80px 24px 40px', backgroundColor: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
          <div>
            <div style={{ marginBottom: '24px' }}><PandeLogo size="large" /></div>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '14px', margin: '0 0 16px', whiteSpace: 'pre-line' }}>{ABOUT_TEXT.description}</p>
                <div style={{ borderLeft: '3px solid #a3e635', paddingLeft: '12px', fontStyle: 'italic', color: '#a3e635', fontSize: '13px' }}>"{ABOUT_TEXT.slogan}"</div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><Instagram size={20} /></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><Facebook size={20} /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><TikTokIcon size={20} /></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s' }}><Youtube size={20} /></a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>VIUNGO VYA HARAKA</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}><a href="#news" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Habari</a><a href="#ratiba" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Ratiba</a><a href="#" onClick={openModal} style={{ color: '#a3e635', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Sajili Timu</a></div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>TUWASILIANE</h4>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +255 653 292 935</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> pandecup2023@gmail.com</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Goba Center & Kiomoni Tanga</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', marginTop: '60px' }}><p style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>© 2026 Pande Cup Events</p></div>
      </footer>

      {/* --- MODAL YA USAJILI (REAL API + PAYMENT POPUP) --- */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(5px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '450px', borderRadius: '24px', padding: '32px', position: 'relative' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={24} /></button>
            
            {/* STEP 1: JAZA FOMU */}
            {modalStep === 1 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '8px' }}>Fomu ya <span style={styles.limeText}>Maombi</span></h2>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>Jaza taarifa sahihi ili kusajili timu yako.</p>
                
                {submitError && (
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', padding: '12px', borderRadius: '8px', fontSize: '12px', marginBottom: '16px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        {submitError}
                    </div>
                )}

                {/* JINA LA TIMU */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input type="text" placeholder="Jina la Timu" value={teamData.name} onChange={(e) => setTeamData({...teamData, name: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <Trophy size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* JINA LA KOCHA */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input type="text" placeholder="Jina la Kocha/Nahodha" value={teamData.coachName} onChange={(e) => setTeamData({...teamData, coachName: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <User size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* NAMBA YA SIMU */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <input type="tel" placeholder="Namba ya Simu (WhatsApp)" value={teamData.phone} onChange={(e) => setTeamData({...teamData, phone: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <Phone size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* LOCATIONS (DROPDOWN) */}
                <div style={{ position: 'relative', marginBottom: '12px' }}>
                    <select value={teamData.location} onChange={(e) => setTeamData({...teamData, location: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white', appearance: 'none' }}>
                        <option value="">Chagua Eneo / Kata</option>
                        {LOCATIONS_LIST.map((group, idx) => (
                            <optgroup key={idx} label={group.group}>
                                {group.areas.map((area, aIdx) => (
                                    <option key={aIdx} value={area}>{area}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <MapPin size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                {/* RANGI ZA JEZI */}
                <div style={{ position: 'relative', marginBottom: '24px' }}>
                    <input type="text" placeholder="Rangi za Jezi (Mfano: Njano/Nyeusi)" value={teamData.jerseyColor} onChange={(e) => setTeamData({...teamData, jerseyColor: e.target.value})} style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#020617', color: 'white' }} />
                    <Shirt size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                </div>

                <button 
                    disabled={isSubmitting}
                    onClick={handleRegistrationSubmit} 
                    style={{ ...styles.buttonPrimary, width: '100%', justifyContent: 'center', opacity: isSubmitting ? 0.7 : 1 }}
                >
                    {isSubmitting ? 'Inatuma...' : 'WASILISHA MAOMBI'}
                </button>
              </div>
            )}

            {/* STEP 2: PAYMENT POPUP (DISCOUNT APPLIED) */}
            {modalStep === 2 && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#16a34a', padding: '16px', borderRadius: '16px', marginBottom: '24px', color: 'white' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px auto' }}>
                             <CheckCircle size={28} />
                        </div>
                        <h2 style={{ fontSize: '18px', fontWeight: '900', margin: 0 }}>HONGERA!</h2>
                        <p style={{ margin: '4px 0 0', fontSize: '12px' }}>Taarifa za <strong>{teamData.name}</strong> zimepokelewa.</p>
                    </div>

                    {/* DISCOUNT BANNER */}
                    <div style={{ backgroundColor: 'rgba(163, 230, 53, 0.1)', border: '1px solid #a3e635', borderRadius: '12px', padding: '12px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'line-through' }}>Ada ya Kawaida:</span>
                            <span style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'line-through' }}>100,000/=</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>Offer ya Mtandaoni:</span>
                            <span style={{ color: '#a3e635', fontWeight: '900', fontSize: '18px' }}>70,000/=</span>
                        </div>
                    </div>

                    <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>Kukamilisha usajili, tafadhali lipia:</p>
                    
                    <div style={{ backgroundColor: 'rgba(255, 255, 0, 0.05)', border: '1px solid #a3e635', borderRadius: '16px', padding: '16px', position: 'relative', marginBottom: '24px' }}>
                        <p style={{ fontSize: '10px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Lipa Namba (Mitandao Yote)</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '8px 0' }}>
                             <span style={{ fontSize: '24px', fontFamily: 'monospace', fontWeight: 'bold', color: 'white' }}>43852599</span>
                             <button onClick={copyNumber} style={{ border: 'none', background: 'none', color: '#a3e635', cursor: 'pointer' }}><Copy size={18} /></button>
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', marginTop: '8px' }}>
                             Jina: FESTO HENRY MSANGAWALE
                        </div>
                        <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#a3e635', color: 'black', fontSize: '11px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '0 15px 0 8px' }}>
                            70,000/=
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', marginBottom: '20px', textAlign: 'left', fontSize: '12px', color: '#cbd5e1' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#fff' }}>Jinsi ya Kulipa:</p>
                        <ol style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.6' }}>
                             <li>Piga <strong>*150*...#</strong> (Menu ya mtandao wako)</li>
                             <li>Chagua <strong>Lipa kwa Simu</strong> &gt; <strong>Lipa Namba</strong></li>
                             <li>Ingiza: <strong>43852599</strong></li>
                             <li>Kiasi: <strong>70,000</strong></li>
                        </ol>
                    </div>

                    <a 
                         href={`https://wa.me/255653292935?text=Habari, nimelipia fomu ya timu ${teamData.name}. Kiasi 70,000 (Offer ya Website). Jina la Mlipaji: ${teamData.coachName}. Namba: ${teamData.phone}`}
                         target="_blank" rel="noreferrer"
                         style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', backgroundColor: '#25D366', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                    >
                         <div style={{display:'flex', alignItems:'center'}}><Phone size={18} style={{marginRight:6}} /> TUMA UTHIBITISHO</div>
                    </a>
                 </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL - NEWS READ MORE */}
      {selectedNews && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 110, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(5px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '600px', borderRadius: '24px', padding: '0', position: 'relative', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <button onClick={closeNews} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', padding: '8px' }}><X size={24} /></button>
            <div style={{ height: '250px', width: '100%', flexShrink: 0 }}>
                <img src={selectedNews.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={selectedNews.title} />
            </div>
            <div style={{ padding: '32px' }}>
                <span style={{ fontSize: '12px', color: '#a3e635', fontWeight: 'bold', textTransform: 'uppercase' }}>{formatDate(selectedNews.date)} • {selectedNews.season}</span>
                <h2 style={{ fontSize: '24px', fontWeight: '900', marginTop: '12px', marginBottom: '24px', lineHeight: '1.3' }}>{selectedNews.title}</h2>
                <div style={{ color: '#cbd5e1', lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
                    {renderWithLinks(selectedNews.body || selectedNews.excerpt)}
                </div>
                <button onClick={closeNews} style={{ marginTop: '32px', width: '100%', padding: '16px', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>FUNGA</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL - GROUP STANDINGS */}
      {selectedGroup && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 120, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(8px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '600px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(163, 230, 53, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Shield size={28} color="#a3e635" />
                    <div>
                        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', color: 'white' }}>{selectedGroup.name}</h2>
                        <p style={{ margin: 0, fontSize: '12px', color: '#a3e635', fontWeight: 'bold', letterSpacing: '1px' }}>MSIMAMO WA KUNDI</p>
                    </div>
                </div>
                <button onClick={closeGroupModal} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={24} />
                </button>
            </div>
            
            <div className="custom-scroll" style={{ padding: '0', overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#0f172a', zIndex: 10 }}>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{...styles.th, width: '50px', padding: '16px'}}>#</th>
                            <th style={{...styles.th, padding: '16px'}}>Timu</th>
                            <th style={{...styles.th, textAlign: 'center', padding: '16px'}}>P</th>
                            <th style={{...styles.th, textAlign: 'center', padding: '16px'}}>GD</th>
                            <th style={{...styles.th, textAlign: 'center', padding: '16px'}}>PTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedGroup.teams.map((team, idx) => (
                        <tr key={idx} style={{ 
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            backgroundColor: idx < 2 ? 'rgba(34, 197, 94, 0.05)' : 'transparent' 
                        }}>
                            <td style={{ ...styles.td, padding: '16px', fontWeight: 'bold', color: idx === 0 ? '#a3e635' : (idx === 1 ? '#4ade80' : 'white'), fontSize: '16px' }}>{idx + 1}</td>
                            <td style={{ ...styles.td, padding: '16px', fontWeight: 'bold', fontSize: '16px' }}>{team.team}</td>
                            <td style={{ ...styles.td, padding: '16px', textAlign: 'center', color: '#94a3b8' }}>{team.p}</td>
                            <td style={{ ...styles.td, padding: '16px', textAlign: 'center', color: team.gd.startsWith('+') ? '#a3e635' : (team.gd.startsWith('-') ? '#f87171' : 'white'), fontWeight: 'bold' }}>{team.gd}</td>
                            <td style={{ ...styles.td, padding: '16px', textAlign: 'center', fontWeight: '900', color: 'white', fontSize: '18px' }}>{team.pts}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>
                <p style={{ margin: 0 }}>*Nafasi mbili za juu zinafuzu hatua inayofuata.</p>
            </div>
          </div>
        </div>
      )}

      </div>
    </>
  );
};

export default App;