// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SitemapDrawer } from './components/layout/SitemapDrawer';
import { SplashScreen } from './components/common/SplashScreen';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { ServicesPage } from './pages/Services';
import { ServiceDetailPage } from './pages/ServiceDetail';
import { ProjectsPage } from './pages/Projects';
import { BeforeAfterPage } from './pages/BeforeAfter';
import { RequestQuotePage } from './pages/RequestQuote';
import { TrackProjectPage } from './pages/TrackProject';
import { ContactPage } from './pages/Contact';
import { FAQsPage } from './pages/FAQs';
import { BlogPage } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPost';
import { CustomerDashboardPage } from './pages/CustomerDashboard';
import { AdminDashboardPage } from './pages/AdminDashboard';
import { DesignAssistantPage } from './pages/DesignAssistant';
import { PrivacyPolicyPage } from './pages/PrivacyPolicy';
import { TermsPage } from './pages/Terms';
import { NotFoundPage } from './pages/NotFound';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <SplashScreen />
          <div className="min-h-screen bg-[#050505] text-[#D6D6D6] flex flex-col justify-between selection:bg-luxury-gold selection:text-black">
            
            {/* Main Sticky Header */}
            <Header />

            {/* Core Routes view port */}
            <main className="flex-1">
              <Routes>
                {/* Home Route */}
                <Route path="/" element={<HomePage />} />
                
                {/* Profile & Info Routes */}
                <Route path="/about" element={<AboutPage />} />
                
                {/* Services Multi-pages */}
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                
                {/* Project Portfolio & Case Studies */}
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/before-after" element={<BeforeAfterPage />} />
                
                {/* Interactions, CRM Estimators, & Live Tracking */}
                <Route path="/request-quote" element={<RequestQuotePage />} />
                <Route path="/track-project" element={<TrackProjectPage />} />
                <Route path="/design-assistant" element={<DesignAssistantPage />} />
                
                {/* Contact, support, and FAQS Accordion */}
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                
                {/* Knowledge Base Blog */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                
                {/* Portals & ERP Dashboards */}
                <Route path="/customer-portal" element={<CustomerDashboardPage />} />
                <Route path="/admin-portal" element={<AdminDashboardPage />} />
                
                {/* Legal documents compliance */}
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                
                {/* Legacy Redirects */}
                <Route path="/gallery" element={<Navigate to="/projects" replace />} />
                <Route path="/home-decoration" element={<Navigate to="/services/home-decoration" replace />} />
                
                {/* Fallbacks */}
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>

            {/* Large-scale Bilingual Footer */}
            <Footer />

            {/* Floating animated WhatsApp button */}
            <WhatsAppButton />

            {/* Scroll-triggered sitemap navigator */}
            <SitemapDrawer />

            {/* Scroll to Top button */}
            <ScrollToTop />

          </div>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
