import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Play,
  Lock,
  Sparkles
} from 'lucide-react';
import HeroDeviceShowcase from './HeroDeviceShowcase';

export default function HeroSection({ theme, onOpenDemoModal, onOpenTrialModal, onScrollToSandbox }) {
  const isDark = theme === 'dark';

  return (
    <section className={`relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#090A0F]' : 'bg-slate-50'
    }`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Dynamic Floating Trust Badge with Emerald Glow & Ping */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-5 sm:mb-6"
        >
          <div className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold shadow-lg transition-all border backdrop-blur-xl max-w-full overflow-hidden ${
            isDark
              ? 'bg-[#0F121A]/90 border-emerald-500/30 text-slate-200 hover:border-pink-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)]'
              : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-500/50 shadow-slate-200'
          }`}>
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-black text-emerald-500 flex items-center gap-1 uppercase tracking-wider shrink-0">
              <span>⚡</span> GST 2.0 READY
            </span>
            <span className={`shrink-0 ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>|</span>
            <span className={`font-semibold truncate ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Built for Indian Retailers <span className="hidden sm:inline">& Wholesalers</span>
            </span>
            <span className={`hidden sm:inline ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>|</span>
            <span className="text-pink-400 font-bold hidden sm:inline flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3" /> Live Sync
            </span>
            <ArrowRight className="w-3 h-3 text-emerald-400 ml-0.5 shrink-0" />
          </div>
        </motion.div>

        {/* High-Impact Headline & Pain Point Sub-Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.12] mb-4 sm:mb-6 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            The All-in-One Operating System for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-pink-500 bg-clip-text text-transparent">
              Retail Marts & Wholesale Trade.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto px-2 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Replace slow desktop software, automate khata, sub-second barcode checkout, and instant WhatsApp billing.
          </motion.p>

          {/* Primary CTA with Glowing Pulse + Secondary CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full max-w-md sm:max-w-none mx-auto"
          >
            {/* Primary CTA with Ambient Glowing Pulse */}
            <div className="relative group w-full sm:w-auto">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-pink-500 to-emerald-500 opacity-70 blur-lg group-hover:opacity-100 transition-opacity animate-pulse duration-1000" />
              <button
                onClick={onOpenTrialModal}
                className="relative w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-black text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-500/30 text-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group active:translate-y-0 cursor-pointer"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Secondary CTA: Interactive Live Demo (No Sign-up) */}
            <button
              onClick={onScrollToSandbox}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm backdrop-blur-xl transition-all shadow-md flex items-center justify-center gap-2.5 group border cursor-pointer ${
                isDark
                  ? 'text-white bg-[#0F121A]/90 hover:bg-[#161B26] border-white/10 hover:border-emerald-500/50 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
                  : 'text-slate-800 bg-white hover:bg-slate-50 border-slate-300 hover:border-emerald-500/50'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/40 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                <Play className="w-3 h-3 fill-current ml-0.5 text-emerald-400 group-hover:text-white" />
              </div>
              <span>Interactive Live Demo (No Sign-up)</span>
            </button>
          </motion.div>

          {/* Key Trust Badges in Emerald Green & Soft Pink */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold">
            {[
              { icon: CheckCircle2, text: "No Credit Card Required", iconColor: "text-emerald-400" },
              { icon: ShieldCheck, text: "100% GSTR-1 & GSTR-3B Ready", iconColor: "text-emerald-400" },
              { icon: MessageSquare, text: "Instant WhatsApp Billing", iconColor: "text-emerald-400" },
              { icon: Lock, text: "Multi-Tenant Data Encryption", iconColor: "text-pink-400" }
            ].map((pill, idx) => (
              <div key={idx} className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-[#0F121A]/80 border-white/10 text-slate-300 hover:border-emerald-500/40 shadow-sm' 
                  : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}>
                <pill.icon className={`w-3.5 h-3.5 ${pill.iconColor} shrink-0`} />
                <span>{pill.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Interactive Showcase with Phone, Thermal Bill & Desktop matching user reference mockup */}
        <HeroDeviceShowcase
          theme={theme}
          onOpenDemoModal={onOpenDemoModal}
          onOpenTrialModal={onOpenTrialModal}
          onScrollToSandbox={onScrollToSandbox}
        />

      </div>
    </section>
  );
}
