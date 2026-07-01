// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { SplashScreen } from './components/common/SplashScreen';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/Home';
import { AboutPage } from './pages/About';
import { ServicesPage } from './pages/Services';
import { ServiceDetailPage } from './pages/ServiceDetail';
import { ProjectsPage } from './pages/Projects';
import { BeforeAfterPage } from './pages/BeforeAfter';
import { RequestQuotePage } from './pages/RequestQuote';
import { TrackProjectPage } from './pages/TrackProjectV2';
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
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/before-after" element={<BeforeAfterPage />} />
                <Route path="/request-quote" element={<RequestQuotePage />} />
                <Route path="/track-project" element={<TrackProjectPage />} />
                <Route path="/design-assistant" element={<DesignAssistantPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faqs" element={<FAQsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/customer-portal" element={<CustomerDashboardPage />} />
                <Route path="/admin-portal" element={<AdminDashboardPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/gallery" element={<Navigate to="/projects" replace />} />
                <Route path="/home-decoration" element={<Navigate to="/services/home-decoration" replace />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
            <ScrollToTop />
          </div>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
