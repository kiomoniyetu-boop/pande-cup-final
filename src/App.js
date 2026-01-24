import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Check, MapPin, Clock, Instagram, Facebook, Youtube,
  ListOrdered, Video, Play, Phone, History, Newspaper, Info
} from 'lucide-react';

// --- USANIDI WA CMS ---
const SPACE_ID = 'ax6wvfd84net'; 
const ACCESS_TOKEN = 'uPIoItEzujeqD7V1AZpAeYoDTRs_MTgV78nV6Kcu7w8';
const LOGO_PATH = "/logo.png";
const USE_IMAGE_LOGO = true;

// --- SOCIAL MEDIA LINKS ---
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/pande_cup/", 
  facebook: "https://www.facebook.com/p/Pande-Cup-61550512517305/",
  youtube: "https://www.youtube.com/@PandeCup",
  tiktok: "https://www.tiktok.com/@pande.cup"
};

// --- STATIC TEXT ---
const ABOUT_TEXT = {
  title: "Kuhusu Pande Cup",
  description: "Pande Cup si ligi ya soka ya kawaida; ni jukwaa la kijamii na kiuchumi linalotumia nguvu ya mchezo wa mpira wa miguu kuunganisha jamii na kuleta mabadiliko chanya. Ilizaliwa katika kijiji cha Pande, Kata ya Kiomoni mkoani Tanga, na sasa imepanua mbawa zake mpaka Goba, Dar es Salaam.\n\nMaono yetu ni kuwa zaidi ya mashindano ya uwanjani. Tunalenga kujenga Umoja wa Jamii, Fursa za Kiuchumi, na Maendeleo ya Kijamii kupitia elimu na afya.",
  slogans: "Pande Cup Umoja Katika Kila Shuti • Pamoja Sisi Ni Pande • Pamoja Sisi Ni Kiomoni • Mimi Na Mto Zigi Dam dam"
};

// --- FALLBACK DATA ---
const FALLBACK_DATA = {
  hero: [
    { location: 'kiomoni', title: "HII GAME NI YETU.", subtitle: "Soka la mtaani lenye hadhi ya kitaifa.", bgImage: "https://images.unsplash.com/photo-1518605336396-6a727c5c0d66" },
    { location: 'goba', title: "HII GAME NI YETU.", subtitle: "Pande Cup Imetua Jijini!", bgImage: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c" }
  ],
  matches: [
    { home: "MTI PESA FC", away: "MABAYANI FC", score: "2-1", status: "FT", location: "kiomoni", season: "June 2025" },
    { home: "MPIRANI FC", away: "MNYENZANI", score: "5-2", status: "FT", location: "kiomoni", season: "June 2025" }
  ],
  news: [
    { date: "2025-06-29", title: "Shangwe la Ufunguzi: Zaidi ya Soka", excerpt: "Vumbi la Kiomoni lilitimka si kwa soka tu! Kufukuza kuku, kuvuta kamba...", image: "https://images.unsplash.com/photo-1522778119026-d647f0565c6d", location: "kiomoni", season: "June 2025" },
    { date: "2025-08-30", title: "Historia Imeandikwa: Mpirani Bingwa!", excerpt: "Mpirani (Uruguay) wanyakua taji la kwanza mbele ya umati wa kihistoria.", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018", location: "kiomoni", season: "June 2025" }
  ],
  videos: [
    { title: "Highlights: Fainali 2025", videoUrl: "#", duration: "10:00", thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018", location: "kiomoni", season: "June 2025" }
  ],
  standings: [
    { pos: 1, team: "Mti Pesa FC", p: 3, gd: "+4", pts: 9, location: "kiomoni", season: "June 2025" },
    { pos: 2, team: "Mpirani FC", p: 3, gd: "+3", pts: 7, location: "kiomoni", season: "June 2025" }
  ],
  sponsors: [
    { name: "VODACOM", logo: "/images/vodacom.png" }, { name: "CRDB BANK", logo: "/images/crdb.png" },
    { name: "YAS", logo: "/images/yas.png" }, { name: "POLISI TANZANIA", logo: "/images/polisi.png" },
    { name: "AZAM TV", logo: "/images/azam.png" }
  ]
};

const FEES = { amount: "Tsh 100,000/=", number: "556677", name: "PANDE SPORTS ENT" };

// --- COMPONENTS ---
const PandeLogo = ({ size = 'normal' }) => {
  const height = size === 'large' ? '120px' : '56px';
  const [imgError, setImgError] = useState(false);
  if (USE_IMAGE_LOGO && !imgError) {
    return <div style={{ display: 'flex', alignItems: 'center' }}><img src={LOGO_PATH} alt="Pande Cup Logo" style={{ height: height, objectFit: 'contain' }} onError={() => setImgError(true)} /></div>;
  }
  return <div style={{ fontSize: size === 'large' ? '32px' : '24px', fontWeight: '900', fontStyle: 'italic', textTransform: 'uppercase', color: 'white' }}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></div>;
};

const TikTokIcon = ({ size = 24 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"