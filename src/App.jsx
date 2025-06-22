import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/layout/ScrollToTop';

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

// Admin pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Content from './pages/admin/Content';

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
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

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/content" element={
                <ProtectedRoute>
                  <Content />
                </ProtectedRoute>
              } />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;