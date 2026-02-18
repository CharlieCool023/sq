import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { BannerProvider } from '@/contexts/BannerContext';

// Public Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import ServiceDetail from '@/pages/ServiceDetail';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Careers from '@/pages/Careers';
import JobApplication from '@/pages/JobApplication';
import Contact from '@/pages/Contact';
import SuccessStories from '@/pages/SuccessStories';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import NotFound from '@/pages/NotFound';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  
  return null;
};

// Admin Pages
import AdminLayout from '@/layouts/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminBlog from '@/pages/admin/Blog';
import AdminBlogEdit from '@/pages/admin/BlogEdit';
import AdminCareers from '@/pages/admin/Careers';
import AdminCareerEdit from '@/pages/admin/CareerEdit';
import AdminBanners from '@/pages/admin/Banners';
import AdminBannerEdit from '@/pages/admin/BannerEdit';
import AdminSubmissions from '@/pages/admin/Submissions';
import AdminApplications from '@/pages/admin/Applications';
import AdminBookings from '@/pages/admin/Bookings';
import AdminAdmins from '@/pages/admin/Admins';
import AdminSettings from '@/pages/admin/Settings';
import AdminLogin from '@/pages/admin/Login';

// Components
import ProtectedRoute from '@/components/ProtectedRoute';
import BookingModal from '@/components/BookingModal';
import BannerPopup from '@/components/BannerPopup';

function App() {
  return (
    <AuthProvider>
      <BannerProvider>
        <Router>
          {/* Scroll to top on route change */}
          <ScrollToTop />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/apply/:id" element={<JobApplication />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/blog/new" element={<AdminBlogEdit />} />
                <Route path="/admin/blog/edit/:id" element={<AdminBlogEdit />} />
                <Route path="/admin/careers" element={<AdminCareers />} />
                <Route path="/admin/careers/new" element={<AdminCareerEdit />} />
                <Route path="/admin/careers/edit/:id" element={<AdminCareerEdit />} />
                <Route path="/admin/banners" element={<AdminBanners />} />
                <Route path="/admin/banners/new" element={<AdminBannerEdit />} />
                <Route path="/admin/banners/edit/:id" element={<AdminBannerEdit />} />
                <Route path="/admin/submissions" element={<AdminSubmissions />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route path="/admin/admins" element={<AdminAdmins />} />
                <Route path="/admin/applications" element={<AdminApplications />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>
            </Route>

            {/* 404 - Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global Components */}
          <BookingModal />
          <BannerPopup />
          <Toaster position="top-right" richColors />
        </Router>
      </BannerProvider>
    </AuthProvider>
  );
}

export default App;
