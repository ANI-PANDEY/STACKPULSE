import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  BarChart3,
  Receipt,
  Boxes,
  Play,
  Lock,
  Zap,
  Building2
} from 'lucide-react';

export default function HeroSection({ theme, onOpenDemoModal, onOpenTrialModal, onScrollToSandbox }) {
  const isDark = theme === 'dark';

  return (
    <section className={`relative pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#030712]' : 'bg-slate-50'
      }`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Real Product Release Badge (Replaced generic AI sparkles pill) */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all border ${isDark
              ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-emerald-500/50'
              : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-500/50 shadow-slate-100'
            }`}>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-emerald-500">GST 2.0 READY</span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>|</span>
            <span>Trusted by 2,500+ Wholesalers & Retailers in India</span>
            <ArrowRight className="w-3 h-3 text-emerald-500 ml-0.5" />
          </div>
        </div>

        {/* Hero Title & Authentic SaaS Copy */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.12] mb-6 ${isDark ? 'text-white' : 'text-slate-900'
            }`}>
            The All-in-One B2B Billing & <br className="hidden sm:inline" />
            <span className="text-gradient-emerald">Real-Time Inventory</span> Platform.
          </h1>

          <p className={`text-base sm:text-lg font-normal leading-relaxed mb-10 max-w-3xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
            Replace outdated desktop software and manual khata registers. Run sub-second barcode POS counters, auto-send PDF invoices on WhatsApp, file GSTR-1 & GSTR-3B returns, and manage multi-warehouse stock seamlessly.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={onOpenTrialModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 hover:from-emerald-300 hover:to-teal-200 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 text-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 group active:translate-y-0 cursor-pointer"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDemoModal}
              className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm backdrop-blur-xl transition-all shadow-md flex items-center justify-center gap-2.5 group border cursor-pointer ${isDark
                  ? 'text-white bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 hover:border-emerald-500/50'
                  : 'text-slate-800 bg-white hover:bg-slate-50 border-slate-300 hover:border-emerald-500/50'
                }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/40 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </div>
              <span>Book a 10-Min Live Demo</span>
            </button>
          </div>

          {/* Key Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-semibold">
            {[
              { icon: CheckCircle2, text: "No Credit Card Required" },
              { icon: ShieldCheck, text: "100% GSTR-1 & GSTR-3B Ready" },
              { icon: MessageSquare, text: "Official WhatsApp Cloud API" },
              { icon: Lock, text: "Multi-Tenant Data Encryption" }
            ].map((pill, idx) => (
              <div key={idx} className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}>
                <pill.icon className="w-3.5 h-3.5 text-emerald-500" />
                <span>{pill.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Interactive App Window */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className={`relative rounded-2xl p-2.5 sm:p-4 shadow-2xl border ${isDark ? 'glass-panel-ultra border-white/10 glow-border-emerald shadow-emerald-950/40' : 'bg-white border-slate-200 shadow-xl'
            }`}>

            {/* Window Top Navigation Header */}
            <div className={`flex items-center justify-between px-4 py-2.5 rounded-t-xl border-b text-xs ${isDark ? 'bg-[#080C14] border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className={`font-mono ml-2 text-[11px] hidden sm:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  app.stackpulse.io/store/mumbai-wholesalers
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEM ACTIVE
                </span>
                <button
                  onClick={onScrollToSandbox}
                  className="text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-1 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Launch Interactive Demo &rarr;
                </button>
              </div>
            </div>

            {/* Live Stats Preview Grid */}
            <div className={`p-4 sm:p-6 rounded-b-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 ${isDark ? 'bg-[#0B0F17]' : 'bg-slate-50'
              }`}>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                <div className={`flex items-center justify-between text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>Today's Counter Sales</span>
                  <Receipt className="w-4 h-4 text-emerald-500" />
                </div>
                <div className={`text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>₹1,84,950</div>
                <div className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                  <span>↑ +24.8% vs yesterday</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                <div className={`flex items-center justify-between text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>Live Warehouse Stock</span>
                  <Boxes className="w-4 h-4 text-cyan-500" />
                </div>
                <div className={`text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>12,480 <span className="text-xs font-normal text-slate-400">units</span></div>
                <div className="text-[11px] text-amber-500 font-semibold mt-1 flex items-center gap-1">
                  <span>⚠️ 3 Low-stock items</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                <div className={`flex items-center justify-between text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>GST Output Tax</span>
                  <BarChart3 className="w-4 h-4 text-indigo-500" />
                </div>
                <div className={`text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>₹33,291</div>
                <div className="text-[11px] text-indigo-500 font-semibold mt-1 flex items-center gap-1">
                  <span>GSTR-1 & 3B Reconciled</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                <div className={`flex items-center justify-between text-xs font-medium mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>WhatsApp Invoices</span>
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                </div>
                <div className={`text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>100% <span className="text-xs font-normal text-slate-400">Delivered</span></div>
                <div className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                  <span>Instant receipt delivery</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Real Business Impact Stats Strip */}
        <div className={`mt-14 pt-10 border-t max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center ${isDark ? 'border-slate-800/60' : 'border-slate-200'
          }`}>
          <div>
            <div className={`text-3xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>2,500+</div>
            <div className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Stores & Wholesalers</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-500 font-mono-nums">40%</div>
            <div className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Faster Checkout Speed</div>
          </div>
          <div>
            <div className={`text-3xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>₹1.2 Cr+</div>
            <div className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Stock Leakage Prevented</div>
          </div>
          <div>
            <div className="text-3xl font-black text-cyan-500 font-mono-nums">99.9%</div>
            <div className={`text-xs font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>GST Return Filing Accuracy</div>
          </div>
        </div>

      </div>
    </section>
  );
}
