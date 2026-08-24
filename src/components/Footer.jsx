import React from 'react';
import { Activity, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ theme, onScrollToSection, onOpenDemoModal, onOpenTrialModal }) {
  const isDark = theme === 'dark';

  return (
    <footer id="contact" className={`border-t pt-16 pb-12 text-xs transition-colors duration-300 ${
      isDark ? 'bg-[#04060A] border-slate-800/80 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-indigo-500 to-cyan-400 p-[2px] shadow-lg shadow-emerald-500/20">
                <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-wider flex items-center gap-1">
                STACK<span className="text-gradient-emerald">PULSE</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Powering Modern B2B Operations — Smart POS Billing, Real-Time Multi-Warehouse Inventory & Business Automation for Indian Wholesalers, Distributors & Retailers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% GST Return Compliant
              </span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product Offerings</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-emerald-400 transition-colors">
                  PulseBill (POS & GST Billing)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-emerald-400 transition-colors">
                  PulseStock (Inventory & PO)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-emerald-400 transition-colors">
                  B2B Distribution Khata
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('sandbox')} className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold">
                  Interactive Sandbox Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & SaaS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Solutions & Pricing</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('roi-calculator')} className="hover:text-emerald-400 transition-colors">
                  ROI Savings Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('comparison')} className="hover:text-emerald-400 transition-colors">
                  Why Us vs Legacy Software
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('pricing')} className="hover:text-emerald-400 transition-colors">
                  Starter & Growth Plans
                </button>
              </li>
              <li>
                <button onClick={onOpenDemoModal} className="hover:text-emerald-400 transition-colors">
                  Book 1-on-1 Live Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact Sales & Support</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 8877002297</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@stackpulse.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Patna, Bihar</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} STACKPULSE SaaS Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">GSTR Filing Guide</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
