import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Quote,
  Building,
  Store
} from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Sharma',
    role: 'Owner & Managing Director',
    store: 'Sharma Supermart & FMCG',
    location: 'Bandra West, Mumbai',
    type: 'B2C Supermarket',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'StackPulse completely transformed our counter checkout. Our billing queues move 3x faster on busy weekends, and automated WhatsApp receipt delivery saved us ₹14,000 every month on thermal roll paper alone.'
  },
  {
    id: 2,
    name: 'Vikram Patel',
    role: 'Head of Operations',
    store: 'Patel Wholesale Provisions',
    location: 'Kalupur Market, Ahmedabad',
    type: 'B2B Wholesale Depot',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    quote: 'Managing 3 regional warehouses and 48 dealer khata accounts was a daily headache on legacy desktop software. StackPulse gives us real-time stock sync and automated payment reminders with UPI QR codes.'
  },
  {
    id: 3,
    name: 'Ananya Deshmukh',
    role: 'Co-Founder & Finance Lead',
    store: 'Apex Hypermarket BKC',
    location: 'Pune & Mumbai',
    type: 'Multi-Branch Mart',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'The automated GST compliance engine is brilliant. What used to take our accountants 3 full days of monthly invoice reconciliation now happens with a single GSTR-1 JSON export. 100% compliant.'
  },
  {
    id: 4,
    name: 'Harpreet Singh',
    role: 'Proprietor',
    store: 'Golden Grain FMCG Distributors',
    location: 'Chandni Chowk, Delhi',
    type: 'B2B Grain & FMCG Trade',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    quote: 'Sub-second barcode scan speeds never lag, even with over 4,000 SKUs in the catalog. Our counter staff learned the interface in less than 15 minutes. It is the best investment we made for our business.'
  }
];

export default function SocialProofSection({ theme }) {
  const isDark = theme === 'dark';
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className={`py-20 relative transition-colors duration-300 overflow-hidden ${
      isDark ? 'bg-[#090A0F]' : 'bg-slate-50'
    }`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 1. Metric Counters Section (Stripe / Linear / Vercel style) */}
        <div className={`p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border mb-14 sm:mb-20 backdrop-blur-xl ${
          isDark 
            ? 'bg-[#0F121A]/80 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' 
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            
            {/* Metric 1: 99.9% Uptime */}
            <div className={`p-3.5 sm:p-5 rounded-2xl border text-center transition-all ${
              isDark ? 'bg-[#090C14]/60 border-white/5 hover:border-emerald-500/30' : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-400 mb-1 sm:mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">CLOUD RELIABILITY</span>
              </div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                99.9%
              </div>
              <div className={`text-xs sm:text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Uptime SLA
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 hidden xs:block">Zero counter billing blackout</div>
            </div>

            {/* Metric 2: 0.2s Billing Speed */}
            <div className={`p-3.5 sm:p-5 rounded-2xl border text-center transition-all ${
              isDark ? 'bg-[#090C14]/60 border-white/5 hover:border-pink-500/30' : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-pink-400 mb-1 sm:mb-2">
                <Zap className="w-3.5 h-3.5 text-pink-400" />
                <span className="truncate">SUB-SECOND ENGINE</span>
              </div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                0.2s
              </div>
              <div className={`text-xs sm:text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Billing Speed
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 hidden xs:block">Barcode scan to print receipt</div>
            </div>

            {/* Metric 3: 100% Tax Compliant */}
            <div className={`p-3.5 sm:p-5 rounded-2xl border text-center transition-all ${
              isDark ? 'bg-[#090C14]/60 border-white/5 hover:border-emerald-500/30' : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-400 mb-1 sm:mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="truncate">GST COMPLIANCE</span>
              </div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                100%
              </div>
              <div className={`text-xs sm:text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tax Compliant
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 hidden xs:block">GSTR-1 & GSTR-3B auto payload</div>
            </div>

            {/* Metric 4: Monthly Volume */}
            <div className={`p-3.5 sm:p-5 rounded-2xl border text-center transition-all ${
              isDark ? 'bg-[#090C14]/60 border-white/5 hover:border-pink-500/30' : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold text-pink-400 mb-1 sm:mb-2">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                <span className="truncate">COMMERCE VELOCITY</span>
              </div>
              <div className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono-nums tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-emerald-400">
                ₹4.2 Cr+
              </div>
              <div className={`text-xs sm:text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Monthly GMV
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 hidden xs:block">Across retail & wholesale stores</div>
            </div>

          </div>
        </div>

        {/* 2. Client Testimonial Carousel Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
            <Quote className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-pink-400 font-extrabold uppercase tracking-wider">Verified Merchant Reviews</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Loved by Leading Marts & Wholesalers
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            See why modern Indian retailers switch to StackPulse for daily POS billing and warehouse management.
          </p>
        </div>

        {/* Testimonial Carousel Card */}
        <div className="max-w-4xl mx-auto relative">
          
          <div className={`p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
            isDark 
              ? 'bg-[#0F121A]/90 border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)]' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Ambient Background Aura */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                {/* 5-Star Rating & Store Type Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-4 sm:w-5 h-4 sm:h-5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1.5 sm:ml-2 text-[11px] sm:text-xs font-bold text-amber-400 font-mono">5.0 / 5.0 VERIFIED</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border flex items-center gap-1.5 ${
                      current.type.includes('B2B')
                        ? 'bg-pink-500/15 border-pink-500/30 text-pink-400'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                    }`}>
                      {current.type.includes('B2B') ? <Building className="w-3.5 h-3.5" /> : <Store className="w-3.5 h-3.5" />}
                      <span>{current.type}</span>
                    </span>
                  </div>
                </div>

                {/* Big Quote */}
                <blockquote className={`text-base sm:text-xl lg:text-2xl font-medium leading-relaxed mb-6 sm:mb-8 italic ${
                  isDark ? 'text-slate-100' : 'text-slate-800'
                }`}>
                  "{current.quote}"
                </blockquote>

                {/* Author Info & Responsive Carousel Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-5 sm:pt-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img 
                      src={current.avatar} 
                      alt={current.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-400 shadow-md shrink-0"
                    />
                    <div>
                      <div className={`font-black text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {current.name}
                      </div>
                      <div className="text-[11px] sm:text-xs text-emerald-400 font-semibold">
                        {current.role} • {current.store}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-400">
                        {current.location}
                      </div>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center justify-end gap-2 shrink-0 self-end sm:self-auto">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        isDark 
                          ? 'border-white/10 hover:border-emerald-400 bg-white/5 text-white hover:bg-emerald-500/20' 
                          : 'border-slate-200 hover:border-emerald-500 bg-white text-slate-800 shadow-sm'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        isDark 
                          ? 'border-white/10 hover:border-emerald-400 bg-white/5 text-white hover:bg-emerald-500/20' 
                          : 'border-slate-200 hover:border-emerald-500 bg-white text-slate-800 shadow-sm'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === i 
                      ? 'w-8 bg-gradient-to-r from-emerald-400 to-pink-500' 
                      : 'w-2 bg-slate-600/40 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
