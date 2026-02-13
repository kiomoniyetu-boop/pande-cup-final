import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet"; 
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Video, Play, ChevronRight, Phone, Info, History, Newspaper, Trophy, FileText, User, Mail, Calendar, Grid, Shield, Maximize2, ChevronDown, ChevronUp, CheckCircle, Copy, Shirt, Tag, Share2, Target, Bot
} from 'lucide-react';
// Logic ya kupanga rangi kulingana na picha zako
const getTierStyle = (tier) => {
  switch(tier) {
    case 'Gold Package': 
    case 'Wewe ni Mdau Wetu': 
      return { border: '2px solid #a3e635', boxShadow: '0 0 20px rgba(163,230,53,0.3)' };
    case 'Silver':
    case 'Mchongo wa Kati':
      return { border: '1px solid #94a3b8', boxShadow: 'none' };
    default:
      return { border: '1px solid rgba(255,255,255,0.1)', boxShadow: 'none' };
  }
};
// ...existing code...
      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(163,230,53,0); }
          40% { box-shadow: 0 0 12px 4px rgba(163,230,53,0.18); }
          60% { box-shadow: 0 0 12px 4px rgba(163,230,53,0.18); }
          100% { box-shadow: 0 0 0 0 rgba(163,230,53,0); }
        }
        .pande-modal-glass .pulse-glow-btn {
          animation: pulse-glow 3s infinite;
        }
      `}</style>
// Responsive helpers for mobile
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;
const mobileCardStyle = {
  padding: '12px',
  borderRadius: '12px',
};
const mobileHeaderStyle = {
  fontSize: '1.25rem', // text-xl
  textAlign: 'center',
  fontWeight: '900',
  margin: '0 0 12px',
  lineHeight: 1.1,
};
const desktopHeaderStyle = {
  fontSize: '3rem', // text-5xl
  fontWeight: '900',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  lineHeight: 1.1,
};

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';

// SENSEI NOTE: Hii link ni ya Contentful moja kwa moja. Ni salama na ina load haraka.
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

// ABOUT_TEXT moved to AboutPage (single source of truth for About content)

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
    { name: "VODACOM", logo: "/images/vodacom.png", websiteUrl: "https://www.vodacom.co.tz" }, 
    { name: "CRDB BANK", logo: "/images/crdb.png", websiteUrl: "https://www.crdbbank.co.tz" },
    { name: "YAS", logo: "/images/yas.png", websiteUrl: "https://yastz.com" },
    { name: "POLISI TANZANIA", logo: "/images/polisi.png", websiteUrl: "https://www.polisi.go.tz" },
    { name: "AZAM TV", logo: "/images/azam.png", websiteUrl: "https://www.azam.co.tz" }
  ]
};

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal' }) => {
  // SENSEI FIX: Adjusted height for better mobile visibility
  const height = size === 'large' ? '120px' : '50px'; 
  const [imgError, setImgError] = useState(false);

  if (USE_IMAGE_LOGO && !imgError) {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={LOGO_PATH} 
            alt="Pande Cup Logo" 
            style={{ height: height, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(163, 230, 53, 0.3))' }} 
            onError={() => setImgError(true)} 
          />
      </div>
    );
  }
  // Fallback kama picha ikigoma (Safety Net)
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

export const HomePage = () => {
  const [activeLocation, setActiveLocation] = useState('kiomoni');
  const [activeSeason, setActiveSeason] = useState('2026'); 
  
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
  
  // HANDLE NEWS SHARE
  const handleNewsShare = async (newsItem) => {
    const shareText = `${newsItem.title} - Pande Cup`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pande Cup',
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Web Share error:', err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => console.error('Copy failed:', err));
    }
  };

  // --- FILTER LOGIC ---
  const getFilteredData = (dataArray) => {
    if (!dataArray) return [];
    return dataArray.filter(item => {
        const itemLoc = item.location ? String(item.location).trim().toLowerCase() : 'kiomoni';
        const isLocationMatch = itemLoc.includes(activeLocation);
        const itemSeasonRaw = item.season ? String(item.season) : '2026';
        // Extract 4-digit year if present (handles formats like "June 2025")
        const itemYearMatch = itemSeasonRaw.match(/(\d{4})/);
        const itemYear = itemYearMatch ? itemYearMatch[1] : itemSeasonRaw.trim();
        const activeYearMatch = String(activeSeason).match(/(\d{4})/);
        const activeYear = activeYearMatch ? activeYearMatch[1] : String(activeSeason).trim();
        return isLocationMatch && String(itemYear).trim() === String(activeYear).trim();
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

        // Process Hero
        const fetchedHero = heroData.items ? heroData.items.map(item => ({
            title: item.fields.title || "HII GAME NI YETU.",
            subtitle: item.fields.subtitle || "",
            location: item.fields.location ? String(item.fields.location).toLowerCase() : 'kiomoni',
            bgImage: getAssetUrl(item.fields.backgroundImage?.sys?.id || item.fields.image?.sys?.id, heroData.includes)
        })) : [];

        // Process Matches
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
                season: item.fields.season || "2026"
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
            season: item.fields.season || "2026"
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
                season: item.fields.season || "2026"
             };
        }) : [];

        // Process Sponsors
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
            videos: fetchedVideos,
            sponsors: fetchedSponsors.length > 0 ? fetchedSponsors : prev.sponsors
        }));
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
  const isGoba2025 = activeLocation === 'goba' && activeSeason === '2025';

  let displayTitle = currentHero.title;
  let displaySubtitle = currentHero.subtitle;

  if (activeSeason === '2025' && !isGoba2025) {
     displayTitle = (
       <span style={{ color: '#fff', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '0.9', letterSpacing: '-0.03em', textAlign: 'center', display: 'block', marginBottom: '12px' }}>
         PANDE CUP
       </span>
     );
     displaySubtitle = (
       <span style={{ color: '#fff', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '1.2', letterSpacing: '1px', textAlign: 'center', display: 'block' }}>
         Ligi Moja. Upendo Mmoja. Vumbi Moja.
       </span>
     );
  }

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
    },
    navContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px' },
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
    heroWrapper: { position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(163, 230, 53, 0.1)' },
    heroMedia: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, objectFit: 'cover' },
    heroOverlay: { position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.4), rgba(15, 23, 42, 0.9))' },
    heroContent: { position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 24px', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    mainTitle: { fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', lineHeight: '1.1', letterSpacing: '-0.03em', margin: '0 0 16px', textShadow: '0 4px 16px rgba(0,0,0,0.6)' },
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
          html { scroll-behavior: smooth; }
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
            .hero-mobile-height { min-height: 70vh !important; }
            #news { padding: 40px 20px !important; }
            #ratiba { padding: 40px 20px !important; }
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
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
            <History size={14} /><span style={{ fontWeight: 'bold' }}>SEASON:</span>
            {isLoading ? 
                <span style={{ fontSize: '10px', color: '#94a3b8', marginLeft: 8 }}>Loading...</span> : 
                <span style={{ fontSize: '10px', color: '#22c55e', marginLeft: 8, fontWeight: 'bold' }}>{activeSeason}</span>
            }
        </div>
        <div className="mobile-center" style={{ display: 'flex', gap: '16px' }}>
            <button style={{ background: 'none', border: 'none', color: activeSeason === '2025' ? '#a3e635' : '#64748b', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => { setActiveSeason('2025'); setActiveLocation('kiomoni'); }}>2025</button>
            <button style={{ background: 'none', border: 'none', color: activeSeason === '2026' ? '#a3e635' : '#64748b', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveSeason('2026')}>2026</button>
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
          <a href="#hero" style={{ textDecoration: 'none', cursor: 'pointer' }}><PandeLogo /></a>
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
            <a href="/sponsors" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Wadhamini</a>
            <a href="/pctv" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>PC TV</a>
            <a href="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>Kutuhusu</a>
            {process.env.NODE_ENV === 'development' && <a href="/admin" onClick={() => setIsMobileMenuOpen(false)} style={{ color: '#a3e635', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>ADMIN</a>}
            <button onClick={openModal} style={{ ...styles.buttonPrimary, marginTop: '20px', width: '100%', justifyContent: 'center', background: '#a3e635', color: 'black', borderRadius: '8px', fontWeight: 'bold', border: 'none', fontSize: '18px', padding: '16px 0' }}>SAJILI TIMU</button>
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
           <div 
             style={{
               display: 'flex',
               justifyContent: 'center',
               gap: '16px',
               marginBottom: '40px',
               flexWrap: 'wrap',
               padding: '12px 24px',
               borderRadius: '24px',
               background: 'rgba(0,0,0,0.4)',
               backdropFilter: 'blur(10px)',
               WebkitBackdropFilter: 'blur(10px)',
               boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)',
               border: '1.5px solid rgba(255,255,255,0.10)',
               alignItems: 'center',
               minWidth: 0,
               transition: 'background 0.3s, box-shadow 0.3s',
             }}
           >
             <button
               onClick={() => setActiveLocation('kiomoni')}
               style={{
                 ...styles.locationButton,
                 borderColor: activeLocation === 'kiomoni' ? '#a3e635' : 'rgba(255,255,255,0.2)',
                 backgroundColor: activeLocation === 'kiomoni' ? '#a3e635' : 'rgba(255,255,255,0.08)',
                 color: activeLocation === 'kiomoni' ? 'black' : 'rgba(255,255,255,0.85)',
                 opacity: 1,
                 fontWeight: 700,
                 fontSize: '15px',
                 minWidth: 70,
                 minHeight: 36,
                 borderRadius: 12,
                 boxShadow: activeLocation === 'kiomoni' ? '0 0 8px 1px rgba(163,230,53,0.13)' : 'none',
                 transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
                 outline: 'none',
                 cursor: 'pointer',
                 touchAction: 'manipulation',
                 transform: 'scale(1)',
                 letterSpacing: '1px',
               }}
               onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
               onMouseUp={e => e.currentTarget.style.transform = 'scale(1.03)'}
               onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
               onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
               onTouchEnd={e => e.currentTarget.style.transform = 'scale(1.03)'}
               onTouchCancel={e => e.currentTarget.style.transform = 'scale(1)'}
             >
               TANGA
             </button>
             <button
               onClick={() => setActiveLocation('goba')}
               style={{
                 ...styles.locationButton,
                 borderColor: activeLocation === 'goba' ? '#a3e635' : 'rgba(255,255,255,0.2)',
                 backgroundColor: activeLocation === 'goba' ? '#a3e635' : 'rgba(255,255,255,0.08)',
                 color: activeLocation === 'goba' ? 'black' : 'rgba(255,255,255,0.85)',
                 opacity: activeSeason === '2025' ? 0.5 : 1,
                 fontWeight: 700,
                 fontSize: '15px',
                 minWidth: 70,
                 minHeight: 36,
                 borderRadius: 12,
                 boxShadow: activeLocation === 'goba' ? '0 0 8px 1px rgba(163,230,53,0.13)' : 'none',
                 transition: 'all 0.2s cubic-bezier(.4,0,.2,1)',
                 outline: 'none',
                 cursor: 'pointer',
                 touchAction: 'manipulation',
                 transform: 'scale(1)',
                 letterSpacing: '1px',
               }}
               onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
               onMouseUp={e => e.currentTarget.style.transform = 'scale(1.03)'}
               onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
               onTouchStart={e => e.currentTarget.style.transform = 'scale(0.97)'}
               onTouchEnd={e => e.currentTarget.style.transform = 'scale(1.03)'}
               onTouchCancel={e => e.currentTarget.style.transform = 'scale(1)'}
             >
               DAR
             </button>
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
                <p style={{ color: '#cbd5e1', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 12px', lineHeight: '1.4' }}>{displaySubtitle}</p>
                {/* Animated Slogan Marquee */}
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
                    Ligi Moja. Upendo Mmoja. Vumbi Moja. &nbsp;|&nbsp; grassroots football league in Tanzania &nbsp;|&nbsp; Ligi Moja. Upendo Mmoja. Vumbi Moja. &nbsp;|&nbsp; grassroots football league in Tanzania
                  </div>
                  <style>{`
                    @keyframes slogan-scroll {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                  `}</style>
                </div>
                {/* Social Media Icons */}
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

      {/* SPONSOR LOGOS INFINITE MARQUEE */}
      <section id="wadhamini" style={{ padding: '60px 24px', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <style>{`
                  @media (max-width: 768px) {
                    .desktop-only { display: none !important; }
                    .mobile-center { display: grid !important; }
                  }
                  @media (min-width: 769px) {
                    .desktop-only { display: flex !important; }
                    .mobile-center { display: none !important; }
                  }
                `}</style>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', color: '#a3e635', marginBottom: '32px', textAlign: 'center' }}>WANAOTUPA NGUVU MSIMU HUU</p>
          {/* Responsive sponsor display: grid for mobile, marquee for desktop */}
          <div>
            <div className="desktop-only" style={{ display: 'flex', overflow: 'hidden' }}>
              <div className="sponsor-marquee">
                {[...cmsData.sponsors, ...cmsData.sponsors].map((sponsor, idx) => (
                  <div key={idx} className="sponsor-marquee-item">
                    <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name} 
                        style={{ height: '50px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7, transition: '0.3s' }} 
                        onMouseOver={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = 1; }}
                        onMouseOut={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = 0.7; }}
                      />
                      <span style={{ fontSize: '10px', color: '#a3e635', fontWeight: 'bold', marginTop: '8px' }}>{sponsor.name}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="mobile-center" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: 12 }}>
              {cmsData.sponsors.map((sponsor, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 8px rgba(163,230,53,0.08)' }}>
                  <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name} 
                      style={{ height: '40px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.7, transition: '0.3s' }} 
                      onMouseOver={e => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = 1; }}
                      onMouseOut={e => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = 0.7; }}
                    />
                    <span style={{ fontSize: '11px', color: '#a3e635', fontWeight: 'bold', marginTop: '8px', textAlign: 'center' }}>{sponsor.name}</span>
                  </a>
                </div>
              ))}
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

        {/* 6. TOURNAMENT INSIGHTS - BOT POWERED STATS CENTER */}
        <section style={{ padding: isMobile ? '36px 8px' : '80px 24px', maxWidth: '1200px', margin: '0 auto', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={isMobile ? { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '18px' } : { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <Bot style={{ color: '#a3e635', background: 'rgba(163,230,53,0.12)', borderRadius: '50%', padding: isMobile ? 6 : 10, boxShadow: isMobile ? '0 2px 8px 0 rgba(163,230,53,0.08)' : '0 4px 16px 0 rgba(163,230,53,0.10)' }} size={isMobile ? 28 : 40} />
            <div>
              <h2 style={isMobile ? mobileHeaderStyle : desktopHeaderStyle}>
                Uchambuzi wa <span style={{ color: '#a3e635' }}>Pande Cup Bot</span>
                <span style={{ fontSize: isMobile ? '0.7rem' : '1rem', fontWeight: '900', color: '#a3e635', backgroundColor: 'rgba(163, 230, 53, 0.15)', padding: '4px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: isMobile ? 0 : '8px', display: isMobile ? 'block' : 'inline' }}>UCHAMBUZI WA BOT</span>
              </h2>
            </div>
          </div>

          {filteredStandings.length > 0 && filteredMatches.length > 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '14px' : '28px',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: 1100,
              margin: '0 auto',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
            }}>
              
              {/* CARD 1: GOLDEN BOOT - TOP TEAMS BY GOALS */}
              <div style={{
                ...(isMobile ? mobileCardStyle : {}),
                background: 'linear-gradient(135deg, rgba(163, 230, 53, 0.08), rgba(163, 230, 53, 0.02))',
                border: '1px solid rgba(163, 230, 53, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                fontSize: isMobile ? '0.95rem' : '1rem',
                width: '100%',
                maxWidth: 340,
                minWidth: 0,
                margin: '0 auto',
                boxSizing: 'border-box',
                flex: '1 1 320px',
              }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', backgroundColor: '#a3e635', borderRadius: '50%', opacity: 0.05 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <Trophy size={24} style={{ color: '#fbbf24' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: '#fbbf24' }}>GOLDEN BOOT</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {sortedTeams.slice(0, 3).map((team, idx) => {
                      const goalDiffValue = parseInt(team.gd) || 0;
                      const maxGD = Math.max(...sortedTeams.map(t => Math.abs(parseInt(t.gd) || 0)));
                      const progressPercent = maxGD > 0 ? Math.abs(goalDiffValue) / maxGD * 100 : 0;
                      return (
                        <div key={idx}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontWeight: '900', fontSize: '14px' }}>#{idx + 1} {team.team}</span>
                            <span style={{ color: '#a3e635', fontWeight: 'bold', fontSize: '13px' }}>+{Math.abs(goalDiffValue)}</span>
                          </div>
                          <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${progressPercent}%`, backgroundColor: '#a3e635', borderRadius: '3px', transition: 'width 0.3s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CARD 2: MATCH PERFORMANCE METRICS */}
              <div style={{
                ...(isMobile ? mobileCardStyle : {}),
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.02))',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                fontSize: isMobile ? '0.95rem' : '1rem',
                width: '100%',
                maxWidth: 340,
                minWidth: 0,
                margin: '0 auto',
                boxSizing: 'border-box',
                flex: '1 1 320px',
              }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', backgroundColor: '#3b82f6', borderRadius: '50%', opacity: 0.05 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <Target size={24} style={{ color: '#3b82f6' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: '#3b82f6' }}>MAVUNO YA MSIMU</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 6px', textTransform: 'uppercase', fontWeight: 'bold' }}>Total Matches</p>
                      <p style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: '#a3e635' }}>{filteredMatches.length}</p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 6px', textTransform: 'uppercase', fontWeight: 'bold' }}>Avg Goals</p>
                      <p style={{ fontSize: '24px', fontWeight: '900', margin: 0, color: '#a3e635' }}>{(filteredMatches.reduce((sum, m) => {
                        const scores = m.score.split('-').map(s => parseInt(s.trim()) || 0);
                        return sum + scores.reduce((a, b) => a + b, 0);
                      }, 0) / filteredMatches.length).toFixed(1)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 3: LEADERBOARD HIGHLIGHT */}
              <div style={{
                ...(isMobile ? mobileCardStyle : {}),
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.02))',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                position: 'relative',
                overflow: 'hidden',
                fontSize: isMobile ? '0.95rem' : '1rem',
                width: '100%',
                maxWidth: 340,
                minWidth: 0,
                margin: '0 auto',
                boxSizing: 'border-box',
                flex: '1 1 320px',
              }}>
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', backgroundColor: '#22c55e', borderRadius: '50%', opacity: 0.05 }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <Shield size={24} style={{ color: '#22c55e' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: '#22c55e' }}>MKALIA KITI</h3>
                  </div>
                  {sortedTeams.length > 0 && (
                    <div>
                      <div style={{ backgroundColor: 'rgba(163, 230, 53, 0.15)', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '2px solid #a3e635' }}>
                        <p style={{ fontSize: '12px', color: '#a3e635', margin: '0 0 4px', fontWeight: 'bold', textTransform: 'uppercase' }}>Top Team</p>
                        <p style={{ fontSize: '22px', fontWeight: '900', margin: 0, color: 'white' }}>{sortedTeams[0].team}</p>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                          <div>
                            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 'bold' }}>PTS</p>
                            <p style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: '#a3e635' }}>{sortedTeams[0].pts}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 'bold' }}>GD</p>
                            <p style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: sortedTeams[0].gd.startsWith('+') ? '#a3e635' : '#f87171' }}>{sortedTeams[0].gd}</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0, fontWeight: 'bold' }}>P</p>
                            <p style={{ fontSize: '18px', fontWeight: '900', margin: 0, color: 'white' }}>{sortedTeams[0].p}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 24px', color: '#64748b' }}>
              <p style={{ fontSize: '16px', fontStyle: 'italic' }}>Takwimu hazitakamatika kwa msimu huu bado. Jaribu season nyingine.</p>
            </div>
          )}
        </section>

</>
      )}

      {/* 7. FOOTER */}
      <footer id="about" style={{ padding: '80px 24px 40px', backgroundColor: '#000' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px' }}>
          <div>
            <div style={{ marginBottom: '24px' }}><PandeLogo size="large" /></div>
            <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#94a3b8', lineHeight: '1.6', fontSize: '14px', margin: '0 0 16px' }}>Burudani ya soka la mtaani, sasa iko kiganjani mwako. Shuhudia vipaji, msisimko, na historia ya Pande Cup popote ulipo.</p>
                <div style={{ color: '#a3e635', fontWeight: '900', fontSize: '16px', fontStyle: 'italic', marginTop: '12px' }}>HII GAME NI YETU</div>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', alignItems: 'center' }}>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Instagram size={20} /></a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Facebook size={20} /></a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><TikTokIcon size={20} /></a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" style={{ color: 'white', opacity: 0.7, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Youtube size={20} /></a>
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>VIUNGO VYA HARAKA</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#news" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Habari</a>
              <a href="#ratiba" style={{ color: '#64748b', textDecoration: 'none', fontSize: '14px' }}>Ratiba</a>
              {/* Admin links/forms removed: Sajili Mchezaji, Matukio, Mechi */}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', marginBottom: '24px' }}>TUWASILIANE</h4>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +255 653 292 935</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> pandecup2023@gmail.com</p>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Goba Center & Kiomoni Tanga</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px', marginTop: '60px' }}>
          <p style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>© 2026 Pande Cup Events</p>
          <a href="https://app.contentful.com/spaces/ax6wvfd84net" target="_blank" rel="noreferrer" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.02)', textDecoration: 'none', cursor: 'pointer' }}>CMS</a>
        </div>
      </footer>

        {/* Registration/Team Setup forms and modal moved to /admin only. Not accessible on public homepage. */}

      {/* MODAL - TEAM REGISTRATION (PUBLIC) */}
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

      {/* DEVELOPMENT-ONLY ADMIN CONSOLE removed. Accessible only via /admin route. */}
    </>
  );
};

export default HomePage;
