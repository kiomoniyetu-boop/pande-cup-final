import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Users, 
  Heart, 
  Play, 
  Newspaper, 
  Trophy 
} from 'lucide-react';

// Kurasa zilizopo
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import SponsorsPage from './pages/SponsorsPage';
import AboutPage from './pages/AboutPage';
import PcTvPage from './pages/PcTvPage';

// Kurasa mpya (New structure)
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';
import FixturesPage from './pages/FixturesPage';

// Navigation Bar Component
const Navigation = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return null; // Ficha nav ukiwa kwenye admin dashboard
  }

  // Helper function ya ku-check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      background: 'rgba(15, 23, 42, 0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '16px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic' }}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></span>
        </Link>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: isActive('/') ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Home size={16} /> NYUMBANI
          </Link>
          
          <Link to="/news" style={{ color: location.pathname.includes('/news') ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Newspaper size={16} /> HABARI
          </Link>

          <Link to="/fixtures" style={{ color: isActive('/fixtures') ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={16} /> RATIBA
          </Link>

          <Link to="/pctv" style={{ color: isActive('/pctv') ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Play size={16} /> PC TV
          </Link>

          <Link to="/sponsors" style={{ color: isActive('/sponsors') ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={16} /> WADHAMINI
          </Link>

          <Link to="/about" style={{ color: isActive('/about') ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} /> KUTUHUSU
          </Link>

          <Link to="/admin" style={{ 
            color: isActive('/admin') ? '#a3e635' : '#94a3b8', 
            textDecoration: 'none', 
            fontSize: '12px', 
            fontWeight: '700', 
            textTransform: 'uppercase', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            background: isActive('/admin') ? 'rgba(163,230,53,0.1)' : 'rgba(255,255,255,0.03)', 
            padding: '8px 12px', 
            borderRadius: '6px' 
          }}>
            <Settings size={16} /> ADMIN
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />
        
        {/* News Section */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        
        {/* Fixtures & Standings */}
        <Route path="/fixtures" element={<FixturesPage />} />
        
        {/* Multimedia & Static Pages */}
        <Route path="/pctv" element={<PcTvPage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;