import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Clock, Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function RoiCalculator({ theme, onOpenTrialModal }) {
  const [dailyOrders, setDailyOrders] = useState(250);
  const [avgOrderValue, setAvgOrderValue] = useState(1200);
  const [counterStaff, setCounterStaff] = useState(3);
  const [storeType, setStoreType] = useState('supermarket'); // 'supermarket' | 'wholesale'

  const isDark = theme === 'dark';

  // Calculations based on daily orders
  const monthlyOrders = dailyOrders * 30;
  // Sub-second checkout saves ~2.5 mins per transaction queue & manual ledger work
  const hoursSavedPerMonth = Math.round((monthlyOrders * 2.2) / 60);
  const monthlyLaborValue = Math.round(hoursSavedPerMonth * 160);
  // Stock leakage prevention (~1.8% of GMV recovered from pilferage/expiry)
  const monthlyShrinkageSaved = Math.round((monthlyOrders * avgOrderValue * 0.012));
  const totalMonthlySavings = monthlyLaborValue + monthlyShrinkageSaved;
  const totalAnnualSavings = totalMonthlySavings * 12;

  const stackpulseAnnualCost = 23988;
  const roiMultiple = Math.max(2, (totalAnnualSavings / stackpulseAnnualCost).toFixed(1));

  return (
    <section id="roi-calculator" className={`py-14 sm:py-24 scroll-mt-28 relative transition-colors duration-300 ${
      isDark ? 'bg-[#090A0F]' : 'bg-slate-50'
    }`}>
      
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full blur-[140px] bg-emerald-500/10 opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-extrabold uppercase tracking-wider">Interactive ROI Calculator</span>
          </div>

          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 sm:mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Calculate Your Monthly <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-pink-500 bg-clip-text text-transparent">
              Hours & Money Saved
            </span>
          </h2>

          <p className={`text-xs sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Drag the daily orders slider below to project how much time and revenue StackPulse automates for your store.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Sliders */}
          <div className={`lg:col-span-6 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border space-y-5 sm:space-y-6 backdrop-blur-xl ${
            isDark ? 'bg-[#0F121A]/85 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <Calculator className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>Store Operational Volume</span>
              </h3>
              
              {/* Type toggle */}
              <div className="flex gap-1 p-1 bg-black/20 rounded-lg border border-white/10 text-xs font-semibold self-start sm:self-auto">
                <button
                  onClick={() => { setStoreType('supermarket'); setAvgOrderValue(650); }}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    storeType === 'supermarket' ? 'bg-emerald-500 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Supermarket
                </button>
                <button
                  onClick={() => { setStoreType('wholesale'); setAvgOrderValue(4200); }}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    storeType === 'wholesale' ? 'bg-pink-500 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  Wholesale Trade
                </button>
              </div>
            </div>

            {/* Slider 1: Daily Orders (Requested Feature) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold gap-2">
                <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Daily Order Volume (Slips)</span>
                <span className="text-emerald-400 font-mono-nums text-sm sm:text-base font-black px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                  {dailyOrders} orders / day
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="1500"
                step="10"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-[#1A202E] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>20 (Small)</span>
                <span>500 orders</span>
                <span>1,500+ (Hypermarket)</span>
              </div>
            </div>

            {/* Slider 2: Average Order Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold gap-2">
                <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Average Order Value (AOV)</span>
                <span className="text-emerald-400 font-mono-nums text-sm sm:text-base font-black px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                  ₹{avgOrderValue.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="25000"
                step="200"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-[#1A202E] rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 3: Billing Counters / Staff */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold gap-2">
                <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Counter Staff & Terminals</span>
                <span className="text-pink-400 font-mono-nums text-sm sm:text-base font-black px-2 py-0.5 rounded-lg bg-pink-500/10 border border-pink-500/30 shrink-0">
                  {counterStaff} billing staff
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={counterStaff}
                onChange={(e) => setCounterStaff(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-[#1A202E] rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Summary Tag */}
            <div className={`p-3 rounded-xl border text-[11px] sm:text-xs flex items-center justify-between ${
              isDark ? 'bg-[#080B14] border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <span className="truncate pr-2">Monthly Volume:</span>
              <span className="font-mono-nums font-bold text-white shrink-0">
                {(dailyOrders * 30).toLocaleString('en-IN')} bills/mo (₹{((dailyOrders * 30 * avgOrderValue) / 100000).toFixed(1)}L GMV)
              </span>
            </div>

          </div>

          {/* Right Column: Projected Results Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-6 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl ${
            isDark 
              ? 'bg-[#0F121A]/90 border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.15)]' 
              : 'bg-gradient-to-tr from-white via-emerald-50/50 to-white border-emerald-500/30 shadow-lg'
          }`}>
            
            {/* Ambient inner aura */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 sm:space-y-6 relative z-10">
              <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <div>
                  <h4 className={`text-[11px] sm:text-xs uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Projected Savings</h4>
                  <span className="text-[11px] sm:text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> StackPulse Cloud Automation
                  </span>
                </div>
                <div className="bg-emerald-500/15 text-emerald-400 font-black text-xs sm:text-sm px-2.5 sm:px-3.5 py-1 rounded-full border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.25)] flex items-center gap-1 shrink-0">
                  <span>⚡</span> {roiMultiple}x Annual ROI
                </div>
              </div>

              {/* Big Savings Number */}
              <div>
                <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Estimated Monthly Financial Savings
                </div>
                <div className="text-3xl sm:text-5xl font-black font-mono-nums tracking-tight mt-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-pink-500">
                  ₹{totalMonthlySavings.toLocaleString('en-IN')} <span className="text-base sm:text-xl text-slate-400 font-normal">/ mo</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-400 mt-1 font-mono">
                  (₹{totalAnnualSavings.toLocaleString('en-IN')} annual net savings)
                </div>
              </div>

              {/* Savings Breakdown */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                
                {/* Metric 1: Monthly Hours Saved */}
                <div className={`p-3.5 sm:p-4 rounded-2xl border ${isDark ? 'bg-[#080B14] border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className={`flex items-center gap-1.5 text-xs mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Monthly Hours Saved</span>
                  </div>
                  <div className={`text-xl sm:text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {hoursSavedPerMonth} Hours
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                    Sub-second barcode speed
                  </div>
                </div>

                {/* Metric 2: Leakage / Shrinkage Saved */}
                <div className={`p-3.5 sm:p-4 rounded-2xl border ${isDark ? 'bg-[#080B14] border-white/5' : 'bg-white border-slate-200'}`}>
                  <div className={`flex items-center gap-1.5 text-xs mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <TrendingUp className="w-4 h-4 text-pink-400" />
                    <span>Leakage Prevented</span>
                  </div>
                  <div className={`text-xl sm:text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    ₹{(monthlyShrinkageSaved / 1000).toFixed(0)}k <span className="text-xs font-normal">/ mo</span>
                  </div>
                  <div className="text-[10px] text-pink-400 font-semibold mt-1">
                    Zero batch expiry losses
                  </div>
                </div>

              </div>

              <div className="text-[11px] sm:text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes WhatsApp paperless billing & auto-reconciled GST</span>
              </div>
            </div>

            {/* CTA */}
            <div className={`mt-8 pt-6 border-t relative z-10 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <button
                onClick={onOpenTrialModal}
                className="w-full py-4 rounded-xl font-black text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Unlock ₹{totalMonthlySavings.toLocaleString('en-IN')}/mo Savings — Start Free Trial</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
