import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/layout/ScrollToTop';
import WebVitalsMonitor from './components/common/WebVitalsMonitor';

// Layout components
import Layout from './components/layout/Layout';

// Public pages
import Home from './pages/Home';
import Certification from './pages/Certification';
import Publications from './pages/Publications';
import Experience from './pages/ExperiencePage';
import Education from './pages/EducationPage';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <WebVitalsMonitor />
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="certification" element={<Certification />} />
              <Route path="publications" element={<Publications />} />
              <Route path="experience" element={<Experience />} />
              <Route path="education" element={<Education />} />
              <Route path="projects" element={<Projects />} />
              <Route path="blog" element={<Blog />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;