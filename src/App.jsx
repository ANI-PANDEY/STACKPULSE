import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SandboxContainer from './components/InteractiveSandbox/SandboxContainer';
import RoiCalculator from './components/RoiCalculator';
import ProductFeatures from './components/ProductFeatures';
import ComparisonTable from './components/ComparisonTable';
import PricingGrid from './components/PricingGrid';
import PaymentModal from './components/PaymentModal';
import DemoBookingModal from './components/DemoBookingModal';
import FreeTrialModal from './components/FreeTrialModal';
import WhatsAppPreviewModal from './components/WhatsAppPreviewModal';
import AdminLeadsModal from './components/AdminLeadsModal';
import AnimatedBackgroundPulse from './components/AnimatedBackgroundPulse';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const INITIAL_LEADS = [
  {
    id: 'lead-101',
    type: 'DEMO_BOOKING',
    name: 'Rajesh Sharma',
    phone: '9820198201',
    email: 'rajesh@sharmatraders.in',
    businessName: 'Sharma General & Wholesale Stores',
    businessType: 'Wholesaler / FMCG',
    preferredDate: '2026-08-25',
    preferredTime: '11:00 AM IST',
    status: 'NEW_BOOKING',
    timestamp: '2026-08-23T07:15:00Z'
  },
  {
    id: 'lead-102',
    type: 'FREE_TRIAL',
    name: 'Apex Supermarket BKC',
    phone: '9876543210',
    email: 'aniket@stackpulse.io',
    businessName: 'Apex Supermarket BKC',
    businessType: 'Supermarket / Retail Store',
    status: 'TRIAL_ACTIVE',
    timestamp: '2026-08-23T06:40:00Z'
  },
  {
    id: 'lead-103',
    type: 'PAID_SUBSCRIPTION',
    name: 'Gupta FMCG Distributors',
    phone: '9820498204',
    email: 'gupta@fmcgdist.com',
    businessName: 'Gupta FMCG Distributors',
    plan: 'Growth (₹1,599/mo)',
    status: 'PAYMENT_ACTIVE',
    timestamp: '2026-08-23T05:10:00Z'
  }
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stackpulse_theme') || 'dark';
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('stackpulse_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return INITIAL_LEADS; }
    }
    return INITIAL_LEADS;
  });

  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [leadsModalOpen, setLeadsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [whatsAppModalData, setWhatsAppModalData] = useState(null);

  useEffect(() => {
    localStorage.setItem('stackpulse_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.className = 'dark-theme';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.className = 'light-theme';
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('stackpulse_leads', JSON.stringify(leads));
  }, [leads]);

  const handleAddLead = (newLeadData) => {
    const newLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      ...newLeadData
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${theme === 'dark' ? 'bg-[#030712] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>

      {/* Animated Moving Background Pulse Wave Lines & Drifting Neon Orbs */}
      <AnimatedBackgroundPulse theme={theme} />

      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenTrialModal={() => setTrialModalOpen(true)}
        onOpenLeadsModal={() => setLeadsModalOpen(true)}
        leadsCount={leads.length}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection
        theme={theme}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenTrialModal={() => setTrialModalOpen(true)}
        onScrollToSandbox={() => scrollToSection('sandbox')}
      />

      {/* Interactive Web-Portal Sandbox */}
      <SandboxContainer
        theme={theme}
        onOpenWhatsAppModal={(data) => setWhatsAppModalData(data)}
        onOpenTrialModal={() => setTrialModalOpen(true)}
        leadsCount={leads.length}
        onOpenLeadsModal={() => setLeadsModalOpen(true)}
      />

      {/* Interactive ROI Calculator */}
      <RoiCalculator
        theme={theme}
        onOpenTrialModal={() => setTrialModalOpen(true)}
      />

      {/* Hero Product Portfolio Deep Dives */}
      <ProductFeatures
        theme={theme}
        onOpenDemoModal={() => setDemoModalOpen(true)}
      />

      {/* Why Switch / Feature Comparison Table */}
      <ComparisonTable theme={theme} />

      {/* SaaS Pricing Grid */}
      <PricingGrid
        theme={theme}
        onSelectPlan={(plan) => setSelectedPlan(plan)}
      />

      {/* Dedicated Get In Touch / Contact Section */}
      <ContactSection
        theme={theme}
        onAddLead={handleAddLead}
      />

      {/* Footer */}
      <Footer
        theme={theme}
        onScrollToSection={scrollToSection}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenTrialModal={() => setTrialModalOpen(true)}
      />

      {/* Interactive Modals */}
      {demoModalOpen && (
        <DemoBookingModal
          onClose={() => setDemoModalOpen(false)}
          onAddLead={handleAddLead}
        />
      )}

      {trialModalOpen && (
        <FreeTrialModal
          onClose={() => setTrialModalOpen(false)}
          onLaunchSandbox={() => scrollToSection('sandbox')}
          onAddLead={handleAddLead}
        />
      )}

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onAddLead={handleAddLead}
        />
      )}

      {whatsAppModalData && (
        <WhatsAppPreviewModal
          invoiceData={whatsAppModalData}
          onClose={() => setWhatsAppModalData(null)}
        />
      )}

      {leadsModalOpen && (
        <AdminLeadsModal
          theme={theme}
          leads={leads}
          onClose={() => setLeadsModalOpen(false)}
        />
      )}

    </div>
  );
}
