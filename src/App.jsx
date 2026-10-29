import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SocialProofSection from './components/SocialProofSection';
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
import { sendLeadNotification } from './services/leadNotificationService';

const INITIAL_LEADS = [
  {
    id: 'lead-101',
    type: 'DEMO_BOOKING',
    name: 'Rajesh Sharma',
    phone: '9820198201',
    email: 'rajesh@sharmatraders.in',
    businessName: 'Sharma General & Wholesale Stores',
    city: 'Patna, Bihar',
    businessType: 'Wholesaler / FMCG',
    counters: '2-4 Billing Counters',
    currentSoftware: 'Excel Spreadsheets',
    preferredDate: '2026-10-31',
    preferredTime: '11:00 AM',
    notes: 'Need thermal printer and WhatsApp invoice integration for 3 counters.',
    emailStatus: 'SENT',
    timestamp: '2026-10-29T10:15:00Z'
  },
  {
    id: 'lead-102',
    type: 'FREE_TRIAL',
    name: 'Sunil Verma',
    phone: '9876543210',
    email: 'sunil@apexsupermarket.com',
    businessName: 'Apex Supermarket',
    city: 'Mumbai, MH',
    businessType: 'Supermarket / Retail Store',
    counters: '2-3 Counters (100-500 bills/day)',
    accountId: 'tenant_apex_supermarket_102',
    notes: 'Testing barcode billing scanner and GST auto-filing.',
    emailStatus: 'SENT',
    timestamp: '2026-10-29T08:40:00Z'
  },
  {
    id: 'lead-103',
    type: 'PAID_SUBSCRIPTION',
    name: 'Vikram Gupta',
    phone: '9820498204',
    email: 'gupta@fmcgdist.com',
    businessName: 'Gupta FMCG Distributors',
    city: 'Ranchi, JH',
    plan: 'Growth Pro Plan (Annual)',
    notes: 'Annual Pro with multi-counter license.',
    emailStatus: 'SENT',
    timestamp: '2026-10-28T14:10:00Z'
  }
];

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('stackpulse_theme') || 'dark';
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('stackpulse_leads');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_LEADS; }
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

  const handleAddLead = async (newLeadData) => {
    const newLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      emailStatus: 'SENDING',
      ...newLeadData
    };
    setLeads(prev => [newLead, ...prev]);

    // Send instant email notification to aniketraj1707@gmail.com
    try {
      const res = await sendLeadNotification(newLead);
      if (res && res.success) {
        setLeads(prev => prev.map(l => l.id === newLead.id ? { ...l, emailStatus: 'SENT', channel: res.channel } : l));
      } else {
        setLeads(prev => prev.map(l => l.id === newLead.id ? { ...l, emailStatus: 'FAILED', error: res?.error || 'Provider offline' } : l));
      }
      return res;
    } catch (err) {
      console.warn('Notice while dispatching lead notification:', err);
      setLeads(prev => prev.map(l => l.id === newLead.id ? { ...l, emailStatus: 'FAILED', error: err.message } : l));
      return { success: false, error: err.message };
    }
  };

  const handleResendLead = async (lead) => {
    try {
      const res = await sendLeadNotification(lead);
      if (res && res.success) {
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, emailStatus: 'SENT', channel: res.channel } : l));
      } else {
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, emailStatus: 'FAILED', error: res?.error } : l));
      }
      return res;
    } catch (err) {
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, emailStatus: 'FAILED', error: err.message } : l));
      return { success: false, error: err.message };
    }
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
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${theme === 'dark' ? 'bg-[#090A0F] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}>

      {/* Animated Moving Background Pulse Wave Lines & Drifting Neon Orbs */}
      <AnimatedBackgroundPulse theme={theme} />

      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenTrialModal={() => setTrialModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection
        theme={theme}
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenTrialModal={() => setTrialModalOpen(true)}
        onScrollToSandbox={() => scrollToSection('sandbox')}
      />

      {/* Trust & Social Proof Section: 99.9% Uptime, 0.2s Speed, 100% Tax Compliant & Testimonial Carousel */}
      <SocialProofSection theme={theme} />

      {/* Dual-Mode (B2C Marts vs B2B Wholesalers) Feature Bento-Grid */}
      <ProductFeatures
        theme={theme}
        onOpenDemoModal={() => setDemoModalOpen(true)}
      />

      {/* Interactive ROI & Time-Saved Calculator */}
      <RoiCalculator
        theme={theme}
        onOpenTrialModal={() => setTrialModalOpen(true)}
      />

      {/* Interactive Web-Portal Sandbox */}
      <SandboxContainer
        theme={theme}
        onOpenWhatsAppModal={(data) => setWhatsAppModalData(data)}
        onOpenTrialModal={() => setTrialModalOpen(true)}
        leadsCount={leads.length}
        onOpenLeadsModal={() => setLeadsModalOpen(true)}
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
          leads={leads}
          onClose={() => setLeadsModalOpen(false)}
          onResendLead={handleResendLead}
        />
      )}

    </div>
  );
}
