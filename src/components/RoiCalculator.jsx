import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RoiCalculator({ theme, onOpenTrialModal }) {
  const [monthlyInvoices, setMonthlyInvoices] = useState(1500);
  const [avgInvoiceValue, setAvgInvoiceValue] = useState(3500);
  const [manualErrorRate, setManualErrorRate] = useState(5);
  const [staffCount, setStaffCount] = useState(4);

  const isDark = theme === 'dark';

  const hoursSavedPerMonth = Math.round((monthlyInvoices * 2.25) / 60);
  const yearlyLeakageSaved = Math.round(((monthlyInvoices * avgInvoiceValue * (manualErrorRate / 100)) * 12) * 0.4);
  const yearlyLaborSavings = Math.round(hoursSavedPerMonth * 150 * 12);
  const totalYearlySavings = yearlyLeakageSaved + yearlyLaborSavings;
  const stackpulseCostYearly = 23988;
  const roiMultiple = Math.max(1, (totalYearlySavings / stackpulseCostYearly).toFixed(1));

  return (
    <section id="roi-calculator" className={`py-24 scroll-mt-28 relative transition-colors duration-300 ${
      isDark ? 'bg-[#030712]' : 'bg-slate-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold mb-3 shadow-sm">
            <Calculator className="w-4 h-4" />
            <span>INTERACTIVE ROI & COST SAVINGS CALCULATOR</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Calculate How Much Time & Money <br />
            <span className="text-gradient-emerald">StackPulse Will Save Your Business</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Compare your current manual khata or desktop software against cloud SaaS automation. See instant ROI projection below!
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sliders */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <h3 className={`text-lg font-bold flex items-center gap-2 border-b pb-3 ${
              isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
            }`}>
              <Zap className="w-5 h-5 text-emerald-500" />
              Your Current Business Metrics
            </h3>

            {/* Slider 1: Monthly Invoices */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Monthly Invoice Volume</span>
                <span className="text-emerald-500 font-mono-nums text-sm">{monthlyInvoices.toLocaleString('en-IN')} invoices/mo</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={monthlyInvoices}
                onChange={(e) => setMonthlyInvoices(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Slider 2: Average Invoice Value */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Average Invoice Value (INR)</span>
                <span className="text-cyan-500 font-mono-nums text-sm">₹{avgInvoiceValue.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={avgInvoiceValue}
                onChange={(e) => setAvgInvoiceValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Slider 3: Error Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Current Error & Stock Leakage Rate</span>
                <span className="text-amber-500 font-mono-nums text-sm">{manualErrorRate}% error rate</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={manualErrorRate}
                onChange={(e) => setManualErrorRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Slider 4: Counter Staff Count */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Billing Counter & Warehouse Staff</span>
                <span className="text-indigo-500 font-mono-nums text-sm">{staffCount} staff members</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={staffCount}
                onChange={(e) => setStaffCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

          </div>

          {/* Right Column: Projected Results Card */}
          <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between shadow-2xl relative overflow-hidden ${
            isDark 
              ? 'bg-gradient-to-tr from-slate-900 via-[#0D1526] to-slate-900 border-emerald-500/30 glow-emerald-lg' 
              : 'bg-gradient-to-tr from-white via-emerald-50/50 to-white border-emerald-500/40 shadow-emerald-500/10'
          }`}>
            
            <div className="space-y-6">
              <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div>
                  <h4 className={`text-xs uppercase font-bold tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Projected Annual Savings</h4>
                  <span className="text-xs text-emerald-500 font-medium">StackPulse Cloud SaaS ROI</span>
                </div>
                <div className="bg-emerald-500/20 text-emerald-500 font-black text-sm px-3 py-1 rounded-full border border-emerald-500/30">
                  {roiMultiple}x ROI
                </div>
              </div>

              {/* Big Savings Number */}
              <div>
                <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Estimated Net Financial Gain Per Year</div>
                <div className={`text-4xl sm:text-5xl font-black font-mono-nums tracking-tight mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ₹{totalYearlySavings.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-emerald-500 font-semibold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Includes inventory leakage prevention & hours saved!</span>
                </div>
              </div>

              {/* Savings Breakdown */}
              <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className={`flex items-center gap-1.5 text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Time Saved / Month</span>
                  </div>
                  <div className={`text-xl font-bold font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{hoursSavedPerMonth} Hours</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Faster counter checkout</div>
                </div>

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className={`flex items-center gap-1.5 text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    <TrendingUp className="w-4 h-4 text-cyan-500" />
                    <span>Stock Leakage Saved</span>
                  </div>
                  <div className={`text-xl font-bold font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>₹{(yearlyLeakageSaved / 1000).toFixed(0)}k /yr</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Zero batch expiry waste</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className={`mt-8 pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <button
                onClick={onOpenTrialModal}
                className="w-full py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/25 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Unlock ₹{totalYearlySavings.toLocaleString('en-IN')} Savings — Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
