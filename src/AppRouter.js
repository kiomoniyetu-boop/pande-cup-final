import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Settings, Users, Heart, Play } from 'lucide-react';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import SponsorsPage from './pages/SponsorsPage';
import AboutPage from './pages/AboutPage';
import PcTvPage from './pages/PcTvPage';

// Navigation Bar Component
const Navigation = () => {
  const location = useLocation();
  
  const isHome = location.pathname === '/';
  const isAdmin = location.pathname === '/admin';

  if (isAdmin) {
    return null; // Hide nav on admin page
  }

  return (
    <nav style={{
      background: 'rgba(15, 23, 42, 0.95)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '16px 24px',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic' }}>PANDE<span style={{ color: '#a3e635' }}>CUP</span></span>
        </Link>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: isHome ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Home size={16} /> NYUMBANI
          </Link>
          <Link to="/sponsors" style={{ color: location.pathname === '/sponsors' ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Heart size={16} /> WADHAMINI
          </Link>
          <Link to="/pctv" style={{ color: location.pathname === '/pctv' ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Play size={16} /> PC TV
          </Link>
          <Link to="/about" style={{ color: location.pathname === '/about' ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={16} /> KUTUHUSU
          </Link>
          <Link to="/admin" style={{ color: location.pathname === '/admin' ? '#a3e635' : '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', background: location.pathname === '/admin' ? 'rgba(163,230,53,0.1)' : 'transparent', padding: '8px 12px', borderRadius: '6px' }}>
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
        <Route path="/" element={<HomePage />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pctv" element={<PcTvPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
