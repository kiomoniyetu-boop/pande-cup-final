import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';
import FixturesPage from './pages/FixturesPage';
import AdminDashboard from './pages/AdminDashboard';
import SponsorsPage from './pages/SponsorsPage';
import AboutPage from './pages/AboutPage';
import PcTvPage from './pages/PcTvPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* 🔥 ADD THESE MISSING ROUTES 🔥 */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/fixtures" element={<FixturesPage />} />
        
        {/* Existing routes */}
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pctv" element={<PcTvPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;