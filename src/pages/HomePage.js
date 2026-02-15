import SeasonSwitcher from '../components/SeasonSwitcher';
import GorillaBot from '../components/GorillaBot'; 
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet"; 
import { 
  Menu, X, Clock, Instagram, Facebook, Youtube,
  Newspaper, Phone, Mail, Grid, Shield, Maximize2, 
  ChevronDown, ChevronUp, CheckCircle, Share2, ChevronRight, 
  Info, Trophy, MapPin 
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "https://images.ctfassets.net/ax6wvfd84net/1T4feibK8k9Ft9Y6MdQul0/2807bebb7fbdf78ba3ea0d7e7bb5c71e/logo.png";
const USE_IMAGE_LOGO = true;

// --- LINKS ZA SOCIAL MEDIA ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

// --- ORODHA YA MITAA ---
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

// --- DATA ZA KUAZIMIA (FALLBACK) ---
const FALLBACK_DATA = {
  hero: [
    {
      location: 'kiomoni',
      title: "HII GAME NI YETU.",
      subtitle: "Soka la mtaani lenye hadhi ya kitaifa. Tunakuza vipaji, tunajenga undugu, na kutetea heshima ya kwetu.",
      bgImage: "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600",
      videoUrl: null 
    },
    {
      location: 'goba',
      title: "HII GAME NI YETU.",
      subtitle: "Pande Cup Imetua Jijini! Kutoka vumbi la Kiomoni hadi Goba.",
      bgImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600",
      videoUrl: null
    }
  ],
  matches: [],
  standings: [],
  news: [],
  videos: [],
  sponsors: [
    { name: "VODACOM", logo: "/images/vodacom.png", websiteUrl: "https://www.vodacom.co.tz" }, 
    { name: "CRDB BANK", logo: "/images/crdb.png", websiteUrl: "https://www.crdbbank.co.tz" },
    { name: "YAS", logo: "/images/yas.png", websiteUrl: "https://yastz.com" },
    { name: "POLISI TANZANIA", logo: "/images/polisi.png", websiteUrl: "https://www.polisi.go.tz" },
    { name: "AZAM TV", logo: "/images/azam.png", websiteUrl: "https://www.azam.co.tz" }
  ]
};

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal', isMobile }) => {
  const mobileHeight = '40px';
  const desktopHeight = size === 'large' ? '120px' : '50px';
  const height = isMobile ? mobileHeight : desktopHeight;
   
  const [imgError, setImgError] = useState(false);

  if (USE_IMAGE_LOGO && !imgError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={LOGO_PATH} 
            alt="Pande Cup Logo" 
            style={{ 
              height: height, 
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain', 
              filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.3))',
              transition: 'all 0.3s ease'
            }} 
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

export const HomePage = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('2026'); 
   
  const [isMobile, setIsMobile] = useState(false);

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
   
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);
  const [cmsData, setCmsData] = useState(FALLBACK_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // --- HANDLERS ---
  const openModal = () => {
    setIsModalOpen(true);
    setModalStep(1);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'hidden';
    setSubmitError('');
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  const toggleMobileMenu = () => { setIsMobileMenuOpen(!isMobileMenuOpen); };
   
  const handleRegistrationSubmit = async () => {
    setSubmitError('');
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
        setTimeout(() => {
            setIsSubmitting(false);
            setModalStep(2);
        }, 1500);
    } catch (error) {
        console.error("Submission Error:", error);
        setSubmitError(`SYSTEM ERROR: ${error.message}`);
        setIsSubmitting(false);
    }
  };

  const openNews = (newsItem) => { setSelectedNews(newsItem); document.body.style.overflow = 'hidden'; };
  const closeNews = () => { setSelectedNews(null); document.body.style.overflow = 'auto'; };
  const openGroupModal = (groupName, teams) => { setSelectedGroup({ name: groupName, teams: teams }); document.body.style.overflow = 'hidden'; };
  const closeGroupModal = () => { setSelectedGroup(null); document.body.style.overflow = 'auto'; };
   
  const handleNewsShare = async (newsItem) => {
    const shareText = `${newsItem.title} - Pande Cup`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Pande Cup', text: shareText, url: shareUrl });
      } catch (err) { console.error('Web Share error:', err); }
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => alert('Link copied!')).catch(err => console.error('Copy failed:', err));
    }
  };

  // --- FILTER LOGIC ---
  const getFilteredData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.filter(item => {
        const itemLoc = item.location ? String(item.location).trim().toLowerCase() : 'kiomoni';
        const isLocationMatch = itemLoc.includes(activeLocation);
        const itemSeasonRaw = item.season ? String(item.season) : '2026';
        const itemYearMatch = itemSeasonRaw.match(/(\d{4})/);
        const itemYear = itemYearMatch ? itemYearMatch[1] : itemSeasonRaw.trim();
        const activeYearMatch = String(activeSeason).match(/(\d{4})/);
        const activeYear = activeYearMatch ? activeYearMatch[1] : String(activeSeason).trim();
        return isLocationMatch && String(itemYear).trim() === String(activeYear).trim();
    });
  };

  // --- EFFECTS ---
  useEffect(() => { 
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => { setVisibleNewsCount(3); }, [activeLocation, activeSeason]);

  // --- FETCHING DATA FROM CONTENTFUL (UPDATED FOR VIDEO) ---
  useEffect(() => {
    const fetchContentfulData = async () => {
      try {
        const baseUrl = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&locale=en-US`;
        const getAssetUrl = (id, includes ) => {
            if (!id || !includes || !includes.Asset) return null;
            const asset = includes.Asset.find(a => a.sys.id === id);
            return asset && asset.fields.file ? `https:${asset.fields.file.url}` : null;
        };
        const fetchData = async (type ) => {
            const res = await fetch(`${baseUrl}&content_type=${type}&include=1`);
            return res.ok ? await res.json() : { items: [] };
        };

        const [heroData, matchesData, newsData, standingsData, videosData, sponsorsData] = await Promise.all([
            fetchData('heroSection'), fetchData('match'), fetchData('news'), fetchData('standing'), fetchData('video'), fetchData('sponsor')
        ]);

        const fetchedHero = heroData.items ? heroData.items.map(item => ({
            title: item.fields.title || "HII GAME NI YETU.",
            subtitle: item.fields.subtitle || "",
            location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
            bgImage: getAssetUrl(item.fields.backgroundImage?.sys?.id || item.fields.image?.sys?.id, heroData.includes),
            // 🔥 HAPA: TUMEONGEZA LOGIC YA KUVUTA VIDEO URL
            videoUrl: getAssetUrl(item.fields.backgroundVideo?.sys?.id, heroData.includes)
        })) : [];

        const fetchedMatches = matchesData.items ? matchesData.items.map(item => ({
            home: String(item.fields.homeTeam || "Home"),
            away: String(item.fields.awayTeam || "Away"),
            score: String(item.fields.score || "VS"),
            status: String(item.fields.status || "Ratiba"),
            location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
            season: item.fields.season || "2026",
            matchDate: item.fields.matchDate || null,
            stadium: item.fields.stadium || ""
        })) : [];

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
                season: item.fields.season || "2026"
             };
        }) : [];

        const fetchedStandings = standingsData.items ? standingsData.items.map(item => ({
            pos: item.fields.position || 0,
            team: String(item.fields.teamName || "Team"),
            p: item.fields.played || 0,
            gd: String(item.fields.goalDifference || "0"),
            pts: item.fields.points || 0,
            cleanSheets: item.fields.cleanSheets || 0,
            formGuide: item.fields.formGuide || "",
            group: String(item.fields.group || "").toUpperCase(), 
            location: item.fields.location ? String(item.fields.location).toLowerCase() : "kiomoni",
            season: item.fields.season || "2026"
        })) : [];

        const fetchedSponsors = sponsorsData.items ? sponsorsData.items.map(item => ({
            name: item.fields.name || '',
            logo: getAssetUrl(item.fields.logo?.sys?.id, sponsorsData.includes) || '/images/placeholder.png',
            websiteUrl: item.fields.websiteUrl || item.fields.link || '#'
        })) : [];

        setCmsData(prev => ({
            ...prev,
            hero: fetchedHero,
            matches: fetchedMatches,
            news: fetchedNews,
            standings: fetchedStandings, 
            sponsors: fetchedSponsors.length > 0 ? fetchedSponsors : prev.sponsors
        }));
      } catch (error) { console.error("CMS Error:", error); } finally { setIsLoading(false); }
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
    .sort((a, b) => new Date(a.matchDate || '9999-12-31') - new Date(b.matchDate || '9999-12-31'));

  const pastMatches = filteredMatches
    .filter(m => m.score.toUpperCase() !== 'VS' && !m.score.includes(':'))
    .sort((a, b) => new Date(b.matchDate || '1970-01-01') - new Date(a.matchDate || '1970-01-01'));

  const filteredNews = getFilteredData(cmsData.news).sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) return dateB - dateA; 
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
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(team);
      return groups;
  }, {});
  
  const sortedGroupKeys = Object.keys(groupedStandings).sort();
  const isGoba2025 = activeLocation === 'goba' && activeSeason === '2025';

  const displayTitle = currentHero.title;
  const displaySubtitle = currentHero.subtitle;

  const seoTitle = activeLocation === 'goba' ? 'Pande Cup Goba - Soka la Mtaani' : 'Pande Cup Kiomoni - Tanga';
  const seoDescription = "Ratiba, Matokeo na Habari za Pande Cup. Soka la mtaani lenye hadhi ya kimataifa.";

  const styles = {
    container: { backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', fontFamily: '"Inter", sans-serif', scrollBehavior: 'smooth', position: 'relative', overflowX: 'hidden' },
    topBar: { backgroundColor: '#1e293b', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderBottom: '1px solid rgba(255,255,255,0.05)' },
    nav: {
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '10px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      transition: 'box-shadow 0.2s',
      boxShadow: '0 0 0 0 transparent',
      width: '100%',
    },
    navContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', width: '100%' },
    navLink: {
      color: '#94a3b8',
      textDecoration: 'none',
      fontSize: '13px',
      fontWeight: 600,
      textTransform: 'uppercase',
      transition: 'color 0.2s',
      cursor: 'pointer',
      padding: '8px',
      background: 'none',
      border: 'none',
      outline: 'none',
      position: 'relative',
      display: 'inline-block',
    },
    heroWrapper: { position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(163, 230, 53, 0.1)', width: '100%' },
    heroMedia: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, objectFit: 'cover' },
    heroOverlay: { position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9))' },
    heroContent: { 
        position: 'relative', 
        zIndex: 3, 
        textAlign: 'center', 
        padding: '0 24px', 
        maxWidth: '900px', 
        width: '100%',
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    mainTitle: { fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1.1', letterSpacing: '-0.03em', margin: '0 0 16px', textShadow: '0 4px 16px rgba(0,0,0,0.6)', textAlign: 'center' },
    limeText: { color: '#a3e635' },
    buttonPrimary: { backgroundColor: '#a3e635', color: '#020617', padding: '14px 28px', borderRadius: '8px', fontWeight: '800', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontStyle: 'italic', fontSize: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(163, 230, 53, 0.2)' },
    locationButton: { padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease', border: '1px solid' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderLeft: '4px solid #a3e635', paddingLeft: '16px' },
    sectionTitle: { fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', margin: 0 },
    newsCard: { backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', overflow: 'hidden', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', height: '100%' },
    mobileMenu: { position: 'fixed', top: '0', right: '0', width: '85%', maxWidth: '320px', height: '100vh', backgroundColor: '#0f172a', zIndex: 200, padding: '32px 24px', boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', borderLeft: '1px solid rgba(255,255,255,0.1)' },
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
          html { scroll-behavior: smooth; }
          * { box-sizing: border-box; } 
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@400;600;800&display=swap');
          body { font-family: 'Inter', sans-serif; overflow-x: hidden; margin: 0; padding: 0; }
          h1, h2, h3, .logo-text { font-family: 'Oswald', sans-serif; }
          .hover-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px -10px rgba(163, 230, 53, 0.2); border-color: rgba(163, 230, 53, 0.3) !important; }
          .nav-glass { backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); background: rgba(15, 23, 42, 0.85) !important; }
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); borderRadius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(163, 230, 53, 0.3); borderRadius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(163, 230, 53, 0.6); }
          .animate-fade-in { animation: fadeIn 0.5s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
           
          /* SPONSOR MARQUEE ANIMATION */
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .sponsor-marquee {
            display: flex;
            gap: 40px;
            animation: scroll 30s linear infinite;
          }
          .sponsor-marquee:hover {
            animation-play-state: paused;
          }
          .sponsor-marquee-item {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 140px;
            cursor: pointer;
          }
          .sponsor-marquee-item a {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            text-decoration: none;
            filter: grayscale(100%);
            opacity: 0.6;
            transition: all 0.4s ease;
            flex-direction: column;
          }
          .sponsor-marquee-item a:hover {
            filter: grayscale(0%) brightness(1.2);
            opacity: 1;
            transform: scale(1.15);
          }
          .sponsor-marquee-item a:active {
            transform: scale(0.95);
          }
           
          /* MOBILE ADJUSTMENTS */
          @media (max-width: 768px) {
            .desktop-only { display: none !important; }
            .mobile-center { justify-content: center !important; width: 100%; }
            .top-bar-mobile { padding: 8px 12px !important; }
            .hero-mobile-height { min-height: 80vh !important; }
            #news { padding: 40px 16px !important; }
            #ratiba { padding: 40px 16px !important; }
            .hero-content-mobile { width: 100% !important; padding: 0 16px !important; }
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
        <meta property="og:image" content={selectedNews ? selectedNews.image : LOGO_PATH} />
      </Helmet>

      <div style={styles.container}>
      {/* 1. TOP BAR */}
      <div style={styles.topBar} className="top-bar-mobile">
        <SeasonSwitcher activeSeason={activeSeason} setActiveSeason={setActiveSeason} />
        <div className="mobile-center" style={{ display: 'flex', gap: '16px' }}>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav style={styles.nav} className="nav-glass nav-mobile pande-nav-glass">
              <style>{`
                .pande-nav-glass {
                  box-shadow: 0 0 0 0 transparent;
                  transition: box-shadow 0.2s;
                }
                .pande-nav-glass.sticky-shadow {
                  box-shadow: 0 4px 24px 0 rgba(163,230,53,0.10);
                }
                .desktop-only a, .desktop-only button {
                  position: relative;
                  overflow: visible;
                }
                .desktop-only a:hover, .desktop-only button:hover {
                  color: #a3e635 !important;
                }
                .desktop-only a::after, .desktop-only button::after {
                  content: '';
                  display: block;
                  position: absolute;
                  left: 50%;
                  bottom: 2px;
                  width: 0;
                  height: 2px;
                  background: #a3e635;
                  border-radius: 2px;
                  transition: width 0.25s cubic-bezier(.4,0,.2,1), left 0.25s cubic-bezier(.4,0,.2,1);
                }
                .desktop-only a:hover::after, .desktop-only button:hover::after {
                  width: 70%;
                  left: 15%;
                }
              `}</style>
              <script>
                {`
                  window.addEventListener('scroll', function() {
                    const nav = document.querySelector('.pande-nav-glass');
                    if (!nav) return;
                    if (window.scrollY > 8) {
                      nav.classList.add('sticky-shadow');
                    } else {
                      nav.classList.remove('sticky-shadow');
                    }
                  });
                `}
              </script>
        <div style={styles.navContent}>
          <a href="#hero" style={{ textDecoration: 'none', cursor: 'pointer', zIndex: 10 }}>
            <PandeLogo isMobile={isMobile} />
          </a>
           
          <div className="desktop-only" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <a onClick={() => window.location.href='#news'} style={styles.navLink}>Habari</a>
            <a onClick={() => window.location.href='#ratiba'} style={styles.navLink}>Ratiba</a>
            <a href="/pctv" style={styles.navLink}>PC TV</a>
            <a href="/sponsors" style={{...styles.navLink, color: '#cbd5e1'}}>Wadhamini</a>
            <a href="/about" style={{...styles.navLink, color: '#cbd5e1'}}>Kutuhusu</a>
            <button
              onClick={openModal}
              style={{
                ...styles.navLink,
                color: '#94a3b8',
                background: 'transparent',
                border: '1px solid #a3e635',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 600,
                padding: '6px 18px',
                height: 'auto',
                boxShadow: 'none',
                marginLeft: 0,
                marginRight: 0,
                display: 'flex',
                alignItems: 'center',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
            >
              SAJILI TIMU
            </button>
            {process.env.NODE_ENV === 'development' && <a href="/admin" style={{...styles.navLink, color: '#a3e635', fontWeight: '800'}}>ADMIN</a>}
          </div>

          <div style={{ display: 'block', zIndex: 10 }}>
              <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: isMobile ? 'block' : 'none' }}>{isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}</button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div style={styles.mobileMenu}>
        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="#hero" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Nyumbani</a>
            <a href="#news" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Habari & Updates</a>
            <a href="#ratiba" onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Ratiba & Matokeo</a>
            <a href="/sponsors" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Wadhamini</a>
            <a href="/pctv" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>PC TV</a>
            <a href="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Kutuhusu</a>
            {process.env.NODE_ENV === 'development' && <a href="/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>ADMIN</a>}
            <button onClick={openModal} style={{ ...styles.buttonPrimary, marginTop: '20px', width: '100%', justifyContent: 'center', background: '#a3e635', color: 'black', borderRadius: '8px', fontWeight: 'bold', border: 'none', fontSize: '18px', padding: '16px 0' }}>SAJILI TIMU</button>
        </div>
      </div>
      {isMobileMenuOpen && <div onClick={() => setIsMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 55, backdropFilter: 'blur(4px)' }}></div>}

      {/* 3. HERO SECTION - VIDEO IMEONGEZWA HAPA */}
      <div id="hero" style={styles.heroWrapper} className="hero-mobile-height">
        
        {/* LOGIC YA MEDIA: Goba 2025 (Grayscale), Video (Kama ipo), au Picha */}
        {isGoba2025 ? (
             <img 
               src="https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=1600"
               style={{...styles.heroMedia, filter: 'grayscale(100%) brightness(0.4)'}}
               alt="Background" 
             />
        ) : currentHero.videoUrl ? (
             // 🔥 HII NDIO SEHEMU MPYA YA VIDEO 🔥
             <video
               autoPlay
               loop
               muted
               playsInline
               style={styles.heroMedia}
               poster={currentHero.bgImage}
             >
               <source src={currentHero.videoUrl} type="video/mp4" />
               <img src={currentHero.bgImage} style={styles.heroMedia} alt="Background" />
             </video>
        ) : (
             <img 
               src={currentHero.bgImage || "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600"}
               style={styles.heroMedia}
               alt="Background" 
               onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66?auto=format&fit=crop&q=80&w=1600"; }}
             />
        )}

        <div style={styles.heroOverlay}></div>
        
        <section style={styles.heroContent} className="hero-content-mobile">
           <div 
             style={{
               display: 'flex',
               justifyContent: 'center',
               gap: '16px',
               marginBottom: '40px',
               flexWrap: 'wrap',
               padding: '8px 16px',
               borderRadius: '50px',
               background: 'rgba(255,255,255,0.05)',
               backdropFilter: 'blur(10px)',
               WebkitBackdropFilter: 'blur(10px)',
               boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
               border: '1px solid rgba(255,255,255,0.1)',
               alignItems: 'center',
               minWidth: 0,
               transition: 'background 0.3s, box-shadow 0.3s',
             }}
           >
             <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
               <button
                 onClick={() => setActiveLocation('kiomoni')}
                 style={{
                   ...styles.locationButton,
                   borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent',
                   backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'transparent',
                   color: activeLocation === 'kiomoni' ? 'black' : 'rgba(255,255,255,0.85)',
                   boxShadow: activeLocation === 'kiomoni' ? '0 0 15px rgba(163,230,53,0.4)' : 'none',
                 }}
               >TANGA</button>
               <button
                 onClick={() => setActiveLocation('goba')}
                 style={{
                   ...styles.locationButton,
                   borderColor: activeLocation === 'goba' ? '#a3e635' : 'transparent',
                   backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'transparent',
                   color: activeLocation === 'goba' ? 'black' : 'rgba(255,255,255,0.85)',
                   opacity: activeSeason === '2025' ? 0.5 : 1,
                   boxShadow: activeLocation === 'goba' ? '0 0 15px rgba(163,230,53,0.4)' : 'none',
                 }}
               >DAR</button>
             </div>
           </div>
           
           {isGoba2025 ? (
              <div className="animate-fade-in text-center p-8 bg-black/40 rounded-2xl backdrop-blur-sm border border-white/10" style={{textAlign: 'center'}}>
                <Info size={48} className="text-[#a3e635] mx-auto mb-4" style={{display: 'inline-block'}} />
                <h1 style={{...styles.mainTitle, fontSize: '32px', marginBottom: '16px'}}>HAKUNA DATA</h1>
                <p style={{ color: '#cbd5e1', fontSize: '18px', maxWidth: '600px', lineHeight: '1.6', margin: '0 auto' }}>Mashindano ya Pande Cup Goba yalianza rasmi 2026. Hakuna data za 2025.</p>
              </div>
            ) : (
              <>
                <h1 style={styles.mainTitle}>{displayTitle}</h1>
                <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 12px', lineHeight: '1.4', textAlign: 'center' }}>{displaySubtitle}</p>
                <div style={{ width: '100%', overflow: 'hidden', margin: '16px 0 0', height: 32 }}>
                  <div style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    animation: 'slogan-scroll 18s linear infinite',
                    fontSize: '1rem',
                    color: '#a3e635',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textShadow: '0 2px 8px #000',
                  }}>
                    Ligi Moja. Upendo Mmoja. Vumbi Moja. &nbsp;|&nbsp; #1 Grassroots Football League in Tanzania &nbsp;|&nbsp; Ligi Moja. Upendo Mmoja. Vumbi Moja. &nbsp;|&nbsp; #1 Grassroots Football League in Tanzania
                  </div>
                  <style>{`
                    @keyframes slogan-scroll {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                  `}</style>
                </div>
                <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', margin: '18px 0 0' }}>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" style={{ color: '#fff' }}><Instagram size={28} /></a>
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" style={{ color: '#fff' }}><Facebook size={28} /></a>
                  <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" style={{ color: '#fff' }}><Youtube size={28} /></a>
                  <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" title="TikTok" style={{ color: '#fff' }}><TikTokIcon size={28} /></a>
                </div>
              </>
            )}
        </section>
      </div>
      
      {/* SPONSOR LOGOS */}
      <section id="wadhamini" style={{ padding: '60px 24px', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
        <style>{`
          .sponsor-marquee-container {
            display: flex;
            overflow: hidden;
            width: 100%;
          }
        `}</style>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', color: '#a3e635', marginBottom: '32px', textAlign: 'center' }}>WANAOTUPA NGUVU MSIMU HUU</p>
          <div>
            <div className="sponsor-marquee-container">
              <div className="sponsor-marquee">
                {[...cmsData.sponsors, ...cmsData.sponsors].map((sponsor, idx) => (
                  <div key={idx} className="sponsor-marquee-item">
                    <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name} 
                        style={{ height: isMobile ? '40px' : '50px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7, transition: '0.3s' }} 
                        onMouseOver={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = 1; }}
                        onMouseOut={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = 0.7; }}
                      />
                      <span style={{ fontSize: '10px', color: '#a3e635', fontWeight: 'bold', marginTop: '8px' }}>{sponsor.name}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                            <img 
                              src={item.image} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              alt="News" 
                              onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x250?text=NEWS'; }} 
                            />
                            </div>
                            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold', marginBottom: '8px' }}>{formatDate(item.date)}</span>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 12px', lineHeight: '1.4' }}>{item.title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6', margin: '0 0 20px', flex: 1 }}>{item.excerpt}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                                  <button onClick={() => openNews(item)} style={{ color: 'white', fontSize: '13px', fontWeight: 'bold', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>SOMA ZAIDI <ChevronRight size={14} color="#a3e635" /></button>
                                  <button onClick={() => handleNewsShare(item)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#a3e635'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                                    <Share2 size={16} />
                                  </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
                              <React.Fragment>ONYESHA HABARI ZAIDI <ChevronDown size={16} /></React.Fragment>
                            ) : (
                              <React.Fragment>PUNGUZA HABARI <ChevronUp size={16} /></React.Fragment>
                            )}
                          </button>
                    </div>
                )}
            </div>
          ) : ( <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}><p>Hakuna habari zilizopakiwa kwa msimu huu bado.</p></div> )}
        </section>

        {/* 5. MATCH CENTER & GROUPS */}
        <section id="ratiba" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
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
                                        <div style={{ color: 'white', fontWeight: '900', fontSize: '20px' }}>{m.score}</div>
                                        <div style={{ fontSize: '10px', color: '#a3e635', fontWeight: 'bold', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.status}</div>
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

        {/* 6. GORILLA MWAKERE ZONE */}
        <section id="mwakere-zone" style={{ background: '#0f172a', paddingBottom: '60px', position: 'relative', zIndex: 20 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(163,230,53,0.1)', marginBottom: '30px' }}></div>
            <GorillaBot standings={filteredStandings} matches={filteredMatches} />
        </section>
      </>
      )}

      {/* 7. FOOTER */}
      <footer id="about" style={{ backgroundColor: '#020617', borderTop: '1px solid rgba(163, 230, 53, 0.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '20%', width: '300px', height: '1px', background: 'linear-gradient(90deg, transparent, #a3e635, transparent)', opacity: 0.5 }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '50px 24px 30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
             
            {/* COL 1: BRAND */}
            <div>
              <div style={{ marginBottom: '16px' }}><PandeLogo size="large" isMobile={isMobile} /></div>
              <div style={{ maxWidth: '300px' }}>
                  <h4 style={{ color: '#a3e635', fontSize: '16px', fontWeight: '900', fontStyle: 'italic', marginBottom: '8px', textTransform: 'uppercase' }}>
                    NIPE PANDE. NIKUPE BURUDANI.
                  </h4>
                  <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '13px', margin: 0 }}>
                    Zaidi ya soka, hii ni harakati. Tunatoa "Pande" kwa vipaji vya mtaani kuonekana, kung'ara, na kutimiza ndoto zao. Ligi Moja, Upendo Mmoja.
                  </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', alignItems: 'center' }}>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="hover-icon" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.3s' }}><Instagram size={16} /></a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="hover-icon" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.3s' }}><Facebook size={16} /></a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className="hover-icon" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.3s' }}><TikTokIcon size={16} /></a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="hover-icon" style={{ color: 'white', backgroundColor: 'rgba(255,255,255,0.05)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'all 0.3s' }}><Youtube size={16} /></a>
              </div>
            </div>

            {/* COL 2: LINKS */}
            <div>
              <h4 style={{ color: 'white', fontSize: '13px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>Viungo vya Haraka</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="#hero" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#a3e635'} onMouseLeave={e => e.target.style.color='#cbd5e1'}><ChevronRight size={14} color="#a3e635" /> Nyumbani</a>
                <a href="#news" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#a3e635'} onMouseLeave={e => e.target.style.color='#cbd5e1'}><ChevronRight size={14} color="#a3e635" /> Habari & Matukio</a>
                <a href="#ratiba" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#a3e635'} onMouseLeave={e => e.target.style.color='#cbd5e1'}><ChevronRight size={14} color="#a3e635" /> Ratiba & Matokeo</a>
                <a href="/sponsors" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#a3e635'} onMouseLeave={e => e.target.style.color='#cbd5e1'}><ChevronRight size={14} color="#a3e635" /> Wadhamini Wetu</a>
              </div>
            </div>

            {/* COL 3: CONTACTS */}
            <div>
              <h4 style={{ color: 'white', fontSize: '13px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>Mawasiliano</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '2px' }}><MapPin size={18} color="#a3e635" /></div>
                  <div>
                    <span style={{ display: 'block', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>Makao Makuu</span>
                    <span style={{ color: '#94a3b8', fontSize: '12px' }}>The Root, Kiomoni, Tanga<br/>& Goba Center, Dar es Salaam</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '2px' }}><Phone size={18} color="#a3e635" /></div>
                  <div>
                    <span style={{ display: 'block', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>Tupigie</span>
                    <a href="tel:+255653292935" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'none' }}>+255 653 292 935</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '2px' }}><Mail size={18} color="#a3e635" /></div>
                  <div>
                    <span style={{ display: 'block', color: 'white', fontWeight: 'bold', fontSize: '13px' }}>Barua Pepe</span>
                    <a href="mailto:pandecup2023@gmail.com" style={{ color: '#94a3b8', fontSize: '12px', textDecoration: 'none' }}>pandecup2023@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* COPYRIGHT */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '20px', textAlign: 'center', backgroundColor: '#000' }}>
          <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', letterSpacing: '0.5px', margin: 0 }}>
            © 2026 Pande Cup. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* MODAL COMPONENTS */}
      {isModalOpen && (
        <>
          <style>{`
            .pande-modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 100;
              background: rgba(0,0,0,0.7);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
              animation: fadeInModal 0.3s cubic-bezier(.4,0,.2,1);
            }
            .pande-modal-glass {
              background: rgba(30,41,59,0.7);
              border-radius: 24px;
              border: 1.5px solid rgba(163,230,53,0.13);
              box-shadow: 0 8px 32px 0 rgba(163,230,53,0.13), 0 1.5px 0 0 #a3e63533;
              max-width: 420px;
              width: 100%;
              position: relative;
              max-height: 95vh;
              overflow-y: auto;
              display: flex;
              flex-direction: column;
              animation: scaleInModal 0.3s cubic-bezier(.4,0,.2,1);
            }
            @keyframes fadeInModal {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes scaleInModal {
              from { transform: scale(0.95); }
              to { transform: scale(1); }
            }
            .pande-modal-glass input, .pande-modal-glass select {
              background: rgba(30,41,59,0.6);
              border: 1.5px solid #333;
              color: #fff;
              border-radius: 8px;
              padding: 12px;
              font-size: 16px;
              margin-bottom: 0;
              outline: none;
              transition: border-color 0.2s, box-shadow 0.2s;
            }
            .pande-modal-glass input:focus, .pande-modal-glass select:focus {
              border-color: #a3e635;
              box-shadow: 0 0 0 2px #a3e63533;
            }
          `}</style>
          <div className="pande-modal-overlay">
            <div className="pande-modal-glass">
              <button onClick={closeModal} style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', cursor: 'pointer', borderRadius: '50%', padding: '8px' }}><X size={24} /></button>
              {modalStep === 1 && (
                <form onSubmit={e => { e.preventDefault(); handleRegistrationSubmit(); }} style={{ padding: '36px 28px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <h2 style={{ color: '#a3e635', fontWeight: '900', fontSize: '22px', marginBottom: '8px', textAlign: 'center' }}>Sajili Timu</h2>
                  <input type="text" placeholder="Jina la Timu" value={teamData.name} onChange={e => setTeamData({ ...teamData, name: e.target.value })} required />
                  <input type="text" placeholder="Jina la Kocha" value={teamData.coachName} onChange={e => setTeamData({ ...teamData, coachName: e.target.value })} required />
                  <select value={teamData.location} onChange={e => setTeamData({ ...teamData, location: e.target.value })} required>
                    <option value="">Chagua Eneo...</option>
                    {LOCATIONS_LIST.map((group, idx) => (
                      <optgroup key={group.group} label={group.group}>
                        {group.areas.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <input type="text" placeholder="Namba ya Simu ya Kocha (WhatsApp)" value={teamData.phone} onChange={e => setTeamData({ ...teamData, phone: e.target.value })} required />
                  <input type="text" placeholder="Rangi ya Jezi (hiari)" value={teamData.jerseyColor} onChange={e => setTeamData({ ...teamData, jerseyColor: e.target.value })} />
                  {submitError && <div style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '14px', marginTop: '4px', textAlign: 'center' }}>{submitError}</div>}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="pulse-glow-btn"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#a3e635',
                      color: '#181a1b',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      cursor: 'pointer',
                      marginTop: '8px',
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: 'box-shadow 0.2s',
                    }}
                  >
                    {isSubmitting ? 'Inatuma...' : 'TUMA MAOMBI'}
                  </button>
                </form>
              )}
              {modalStep === 2 && (
                <div style={{ padding: '40px 28px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '18px' }}>
                  <CheckCircle size={48} color="#a3e635" />
                  <h2 style={{ color: '#a3e635', fontWeight: '900', fontSize: '22px', margin: 0 }}>Ombi Limeshawasilishwa!</h2>
                  <p style={{ color: '#cbd5e1', fontSize: '16px', margin: 0 }}>Tutawasiliana nawe kupitia WhatsApp kwa maelezo zaidi ya usajili na malipo. Asante kwa kujiunga na Pande Cup!</p>
                  <button onClick={closeModal} style={{ marginTop: '18px', width: '100%', padding: '14px', background: '#23272f', color: '#a3e635', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>Funga</button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

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

      {selectedGroup && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 120, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backdropFilter: 'blur(8px)' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '600px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
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

export default HomePage;