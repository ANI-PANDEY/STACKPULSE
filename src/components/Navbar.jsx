import React, { useState, useEffect } from 'react';
import { Activity, Zap, ChevronRight, Menu, X, ArrowUpRight, Sun, Moon, Box, PhoneCall } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, onOpenDemoModal, onOpenTrialModal, onOpenLeadsModal, leadsCount, onScrollToSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-xl ${
      scrolled
        ? isDark
          ? 'bg-[#030712]/95 border-emerald-500/20 shadow-2xl py-2.5'
          : 'bg-white/95 border-slate-200 shadow-md py-2.5'
        : isDark
          ? 'bg-[#030712]/80 border-slate-800/80 py-3'
          : 'bg-white/80 border-slate-200/80 py-3'
    }`}>
      
      {/* Full-width responsive container - Logo far left, CTAs far right, zero cut-off */}
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          
          {/* Decent, Sleek Left-Aligned Brand Logo Container */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0 group hover:opacity-90 transition-opacity" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-[1.5px] shadow-sm shadow-emerald-500/30 shrink-0">
              <div className={`w-full h-full rounded-[9px] flex items-center justify-center ${isDark ? 'bg-[#0A0E17]' : 'bg-slate-900'}`}>
                <Activity className="w-4.5 h-4.5 text-emerald-400" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className={`text-lg font-black tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  STACK<span className="text-emerald-500">PULSE</span>
                </span>
                <span className="text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/25 tracking-tight">
                  B2B SaaS
                </span>
              </div>
              <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Smart Billing & Inventory
              </span>
            </div>
          </div>

          {/* Center Desktop Navigation Links */}
          <nav className={`hidden xl:flex items-center gap-1 text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <button 
              onClick={() => onScrollToSection('products')} 
              className="nav-box-item hover:text-emerald-500 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Box className="w-3.5 h-3.5 text-emerald-500" />
              <span>Products</span>
            </button>
            
            {/* Live Demo Sandbox - Clean Nav Item without Green Dot */}
            <button 
              onClick={() => onScrollToSection('sandbox')} 
              className="nav-box-item hover:text-emerald-500 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Live Demo Sandbox</span>
            </button>
            
            <button 
              onClick={() => onScrollToSection('roi-calculator')} 
              className="nav-box-item hover:text-emerald-500 transition-colors cursor-pointer"
            >
              <span>ROI Calculator</span>
            </button>
            
            <button 
              onClick={() => onScrollToSection('comparison')} 
              className="nav-box-item hover:text-emerald-500 transition-colors cursor-pointer"
            >
              <span>Why Us</span>
            </button>
            
            <button 
              onClick={() => onScrollToSection('pricing')} 
              className="nav-box-item hover:text-emerald-500 transition-colors cursor-pointer"
            >
              <span>Pricing</span>
            </button>

            <button 
              onClick={() => onScrollToSection('contact')} 
              className="nav-box-item hover:text-emerald-500 transition-colors cursor-pointer"
            >
              <span>Contact Us</span>
            </button>
          </nav>

          {/* Right Action Controls: Theme Switcher & CTAs */}
          <div className="hidden sm:flex items-center space-x-2 shrink-0">
            
            {/* Contact Us Button - Subtle & non-highlighted */}
            <button
              onClick={() => onScrollToSection('contact')}
              title="Contact Sales & Support"
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'text-slate-300 hover:text-white border-slate-800 bg-slate-900/60 hover:border-slate-700' 
                  : 'text-slate-700 hover:text-slate-900 border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
              <span>Contact Us</span>
            </button>

            {/* Dark/Light Mode Switcher Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95 ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-700 text-amber-400 hover:bg-slate-800 hover:border-amber-400/50' 
                  : 'bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200 hover:border-indigo-400/50'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenDemoModal}
              className={`text-xs font-bold px-3 py-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'text-slate-200 hover:text-white border-slate-700 hover:border-emerald-500/50 bg-slate-900/70' 
                  : 'text-slate-800 hover:text-slate-950 border-slate-300 hover:border-emerald-500/50 bg-white'
              }`}
            >
              Book 10-Min Demo
            </button>
            
            <button
              onClick={onOpenTrialModal}
              className="text-xs font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-400 px-4 py-2 rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              Start 14-Day Free Trial
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="xl:hidden flex items-center space-x-2">
            <button
              onClick={() => onScrollToSection('contact')}
              className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 ${
                isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
              <span>Contact Us</span>
            </button>
            <button
              onClick={onToggleTheme}
              className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-amber-400' : 'bg-slate-100 border-slate-300 text-indigo-600'}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border ${isDark ? 'text-slate-300 bg-slate-900 border-slate-800' : 'text-slate-700 bg-white border-slate-300'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className={`xl:hidden mt-4 pt-4 pb-6 border-t space-y-4 px-4 rounded-2xl shadow-2xl ${
            isDark ? 'border-slate-800 bg-[#0B0F17]' : 'border-slate-200 bg-white'
          }`}>
            <button 
              onClick={() => { onScrollToSection('contact'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-emerald-500 font-bold flex items-center justify-between"
            >
              <span>📞 Contact Us</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { onScrollToSection('sandbox'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-emerald-500 font-bold flex items-center justify-between"
            >
              <span>🚀 Try Live Software Sandbox</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { onScrollToSection('products'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              Products (PulseBill & PulseStock)
            </button>
            <button 
              onClick={() => { onScrollToSection('roi-calculator'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              ROI Savings Calculator
            </button>
            <button 
              onClick={() => { onScrollToSection('pricing'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
            >
              SaaS Pricing Plans
            </button>
            <div className="pt-2 grid grid-cols-1 gap-2">
              <button
                onClick={() => { onOpenDemoModal(); setMobileMenuOpen(false); }}
                className={`w-full py-3 text-center text-sm font-semibold rounded-xl border ${
                  isDark ? 'text-white bg-slate-800 border-slate-700' : 'text-slate-800 bg-slate-100 border-slate-300'
                }`}
              >
                Book 10-Min Live Demo
              </button>
              <button
                onClick={() => { onOpenTrialModal(); setMobileMenuOpen(false); }}
                className="w-full py-3 text-center text-sm font-bold text-slate-950 bg-emerald-400 rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Start 14-Day Free Trial
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
