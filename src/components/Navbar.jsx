import React, { useState, useEffect } from 'react';
import { Activity, Zap, ChevronRight, Menu, X, ArrowUpRight, Sun, Moon, Box, PhoneCall } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, onOpenDemoModal, onOpenTrialModal, onScrollToSection }) {
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
          ? 'bg-[#090A0F]/95 border-white/10 shadow-[0_10px_35px_-10px_rgba(16,185,129,0.25)] py-2.5'
          : 'bg-white/95 border-slate-200 shadow-md py-2.5'
        : isDark
          ? 'bg-[#090A0F]/80 border-white/5 py-3'
          : 'bg-white/80 border-slate-200/80 py-3'
    }`}>
      
      {/* Full-width responsive container */}
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          
          {/* Cyber Sleek Brand Logo Container in Obsidian, Emerald & Pink */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0 group hover:opacity-95 transition-all" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-pink-500 p-[1.5px] shadow-md shadow-emerald-500/40 logo-box-animated shrink-0">
              <div className={`w-full h-full rounded-[9px] flex items-center justify-center ${isDark ? 'bg-[#090A0F]' : 'bg-slate-900'}`}>
                <Activity className="w-4.5 h-4.5 text-emerald-400" />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className={`text-lg font-black tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  STACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-pink-500">PULSE</span>
                </span>
                <span className="text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30 tracking-tight flex items-center gap-0.5 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                  <span className="text-[10px]">⚡</span> B2B SAAS
                </span>
              </div>
              <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Smart Billing & Real-Time Stock
              </span>
            </div>
          </div>

          {/* Center Desktop Navigation Links */}
          <nav className={`hidden xl:flex items-center gap-1 text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <button 
              onClick={() => onScrollToSection('products')} 
              className="nav-box-item hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Box className="w-3.5 h-3.5 text-emerald-400" />
              <span>Products</span>
            </button>
            
            <button 
              onClick={() => onScrollToSection('sandbox')} 
              className="nav-box-item hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Live Demo Sandbox</span>
            </button>
            
            <button 
              onClick={() => onScrollToSection('roi-calculator')} 
              className="nav-box-item hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <span>ROI Calculator</span>
            </button>
            
            <button 
              onClick={() => onScrollToSection('comparison')} 
              className="nav-box-item hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <span>Why Us</span>
            </button>
            
            <button 
              onClick={() => onScrollToSection('pricing')} 
              className="nav-box-item hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <span>Pricing</span>
            </button>

            <button 
              onClick={() => onScrollToSection('contact')} 
              className="nav-box-item hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <span>Contact Us</span>
            </button>
          </nav>

          {/* Right Action Controls: Desktop Only (>= xl) */}
          <div className="hidden xl:flex items-center space-x-2.5 shrink-0">
            
            {/* Contact Us Button */}
            <button
              onClick={() => onScrollToSection('contact')}
              title="Contact Sales & Support"
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'text-slate-300 hover:text-white border-white/10 bg-[#0B0B12]/80 hover:border-emerald-500/40' 
                  : 'text-slate-700 hover:text-slate-900 border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
              <span>Contact Us</span>
            </button>

            {/* Dark/Light Mode Switcher Button */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95 ${
                isDark 
                  ? 'bg-[#0B0B12]/90 border-white/10 text-emerald-400 hover:bg-slate-900 hover:border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]' 
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 hover:border-emerald-500/50'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-emerald-400" /> : <Moon className="w-4 h-4 text-slate-800" />}
            </button>

            {/* Book Demo Button */}
            <button
              onClick={onOpenDemoModal}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95 ${
                isDark 
                  ? 'text-slate-200 hover:text-white border-emerald-500/30 hover:border-emerald-500 bg-[#0A0D14]/90 shadow-[0_0_12px_rgba(16,185,129,0.15)]' 
                  : 'text-slate-800 hover:text-slate-950 border-slate-300 hover:border-emerald-500/50 bg-white'
              }`}
            >
              <span>Book 10-Min Demo</span>
            </button>
            
            {/* Primary Crimson Red High-Impact CTA */}
            <button
              onClick={onOpenTrialModal}
              className="text-xs font-black text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 px-4 py-2 rounded-xl shadow-lg shadow-red-500/35 hover:shadow-red-500/55 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-300" />
            </button>
          </div>

          {/* Mobile & Tablet Action Controls (< xl) */}
          <div className="xl:hidden flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onScrollToSection('contact')}
              className={`hidden sm:flex px-2.5 py-1.5 rounded-xl border text-xs font-bold items-center gap-1.5 ${
                isDark ? 'bg-[#0B0B12]/80 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact</span>
            </button>
            <button
              onClick={onToggleTheme}
              aria-label="Toggle dark/light theme"
              className={`p-2 rounded-xl border cursor-pointer active:scale-95 transition-all ${
                isDark ? 'bg-[#0B0B12] border-white/10 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'bg-slate-100 border-slate-300 text-slate-800'
              }`}
            >
              {isDark ? <Sun className="w-4.5 h-4.5 text-emerald-400" /> : <Moon className="w-4.5 h-4.5 text-slate-800" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className={`p-2 rounded-xl border cursor-pointer active:scale-95 transition-all ${
                isDark ? 'text-slate-200 bg-[#0B0B12] border-white/10' : 'text-slate-800 bg-white border-slate-300'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className={`xl:hidden mt-4 pt-4 pb-6 border-t space-y-4 px-4 rounded-2xl shadow-2xl ${
            isDark ? 'border-white/10 bg-[#07070C]' : 'border-slate-200 bg-white'
          }`}>
            <button 
              onClick={() => { onScrollToSection('contact'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-emerald-400 font-bold flex items-center justify-between"
            >
              <span>📞 Contact Us</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
            <button 
              onClick={() => { onScrollToSection('sandbox'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-emerald-400 font-bold flex items-center justify-between"
            >
              <span>⚡ Try Live Software Sandbox</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
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
                  isDark ? 'text-white bg-[#0E0E18] border-white/10' : 'text-slate-800 bg-slate-100 border-slate-300'
                }`}
              >
                Book 10-Min Live Demo
              </button>
              <button
                onClick={() => { onOpenTrialModal(); setMobileMenuOpen(false); }}
                className="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl shadow-lg shadow-red-500/30"
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
