import React from 'react';
import { Activity, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ theme, onScrollToSection, onOpenDemoModal }) {
  const isDark = theme === 'dark';

  return (
    <footer id="footer" className={`border-t pt-12 sm:pt-16 pb-8 sm:pb-12 text-xs transition-colors duration-300 ${
      isDark ? 'bg-[#06070B] border-white/10 text-slate-400' : 'bg-slate-900 border-slate-800 text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Tagline in Obsidian, Emerald & Rose */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-red-500 p-[2px] shadow-lg shadow-emerald-500/30">
                <div className="w-full h-full bg-[#050508] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-wider flex items-center gap-1">
                STACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-emerald-400">PULSE</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Powering Modern B2B Operations — Smart POS Billing, Real-Time Multi-Warehouse Inventory & Business Automation for Indian Wholesalers, Distributors & Retailers.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-black shadow-[0_0_8px_rgba(16,185,129,0.15)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% GST Return Compliant
              </span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product Offerings</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  PulseBill (POS & GST Billing)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  PulseStock (Inventory & PO)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('products')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  B2B Distribution Khata
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('sandbox')} className="hover:text-emerald-300 transition-colors text-emerald-400 font-bold cursor-pointer flex items-center gap-1 text-left">
                  <span>⚡ Interactive Sandbox Demo</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & SaaS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Solutions & Pricing</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onScrollToSection('roi-calculator')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  ROI Savings Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('comparison')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Why Us vs Legacy Software
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('pricing')} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Starter & Growth Plans
                </button>
              </li>
              <li>
                <button onClick={onOpenDemoModal} className="hover:text-emerald-400 transition-colors cursor-pointer text-left">
                  Book 1-on-1 Live Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Contact Sales & Support</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono text-slate-200">+91 8877002297</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="break-all">support@stackpulse.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Patna, Bihar</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} STACKPULSE SaaS Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">GSTR Filing Guide</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
