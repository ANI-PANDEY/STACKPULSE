import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Search,
  Store,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Wifi,
  Battery,
  Bell
} from 'lucide-react';

const MOCK_LIVE_TRANSACTIONS = [
  { id: 1, title: 'Kirana Supermart', amount: '+₹1,926.00', tag: 'GSTR-1 Synced', time: 'Just now', color: 'emerald' },
  { id: 2, title: 'Patel Wholesale Hub', amount: '+₹8,450.00', tag: 'Credit Khata Paid', time: '12s ago', color: 'emerald' },
  { id: 3, title: 'B2C Barcode Counter', amount: '+₹380.00', tag: 'WhatsApp Bill Sent', time: '28s ago', color: 'pink' },
  { id: 4, title: 'Gupta Traders Depot', amount: '+₹14,200.00', tag: 'e-Way Bill Ready', time: '45s ago', color: 'emerald' }
];

export default function HeroDeviceShowcase({ theme, onOpenDemoModal, onScrollToSandbox }) {
  const isDark = theme === 'dark';
  const [activeDataPoint, setActiveDataPoint] = useState(4); // Default Friday
  const [txIndex, setTxIndex] = useState(0);
  const [mobileDeviceTab, setMobileDeviceTab] = useState('all'); // 'all' | 'pos' | 'bill' | 'phone'

  useEffect(() => {
    const timer = setInterval(() => {
      setTxIndex((prev) => (prev + 1) % MOCK_LIVE_TRANSACTIONS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentTx = MOCK_LIVE_TRANSACTIONS[txIndex];

  // Realistic chart points matching the reference image's wavy graph
  const chartPoints = [
    { day: 'Mon', x: 25, y: 72, amount: '₹1,240' },
    { day: 'Tue', x: 75, y: 55, amount: '₹1,580' },
    { day: 'Wed', x: 130, y: 64, amount: '₹1,410' },
    { day: 'Thu', x: 185, y: 38, amount: '₹1,750' },
    { day: 'Fri', x: 240, y: 20, amount: '₹1,926' },
    { day: 'Sat', x: 295, y: 14, amount: '₹2,380' }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 sm:mt-10 select-none px-2 sm:px-4">

      {/* --- Ambient Aura & Decorative Floating Elements (Emerald Green #10B981 & Vibrant Magenta/Pink #EC4899) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
        {/* Soft Radial Ambient Aura: Emerald Green on Left, Vibrant Magenta on Right */}
        <div className={`w-[360px] sm:w-[620px] md:w-[780px] h-[360px] sm:h-[500px] rounded-full blur-3xl transition-opacity duration-700 ${
          isDark
            ? 'bg-gradient-to-tr from-emerald-950/40 via-[#090A0F] to-pink-950/30 opacity-90'
            : 'bg-gradient-to-tr from-emerald-100/70 via-slate-100/40 to-pink-100/60 opacity-90'
        }`} />

        {/* 5x5 Dot Matrix (Top Left, Charcoal/Black) */}
        <div className={`absolute top-0 left-2 sm:left-10 grid grid-cols-5 gap-2 hidden sm:grid ${
          isDark ? 'opacity-25' : 'opacity-35'
        }`}>
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-slate-600' : 'bg-slate-400'}`} />
          ))}
        </div>

        {/* Floating Geometric Pink Triangle (Left) */}
        <div className="absolute top-1/4 left-1 sm:left-6 w-0 h-0 border-l-[9px] sm:border-l-[12px] border-l-transparent border-r-[9px] sm:border-r-[12px] border-r-transparent border-b-[16px] sm:border-b-[22px] border-b-pink-500 rotate-[-15deg] opacity-85 drop-shadow-[0_0_12px_rgba(236,72,153,0.6)] animate-pulse" />

        {/* Floating Geometric Emerald Green Triangle (Right) */}
        <div className="absolute top-1/2 right-2 sm:right-6 w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-transparent border-r-[8px] sm:border-r-[10px] border-r-transparent border-b-[14px] sm:border-b-[18px] border-b-emerald-500 rotate-[45deg] opacity-85 drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]" />

        {/* Sparkle Star (Top Right, Green & Pink Accent) */}
        <div className="absolute top-4 right-8 sm:right-16 text-emerald-400 opacity-90 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] animate-spin" style={{ animationDuration: '18s' }}>
          <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
        </div>
      </div>

      {/* Mobile View Selector Pill Bar (< md only) */}
      <div className="flex md:hidden items-center justify-center mb-6 px-2">
        <div className={`p-1 rounded-2xl border flex items-center gap-1 text-[11px] font-bold shadow-lg ${
          isDark ? 'bg-[#0B0D14]/90 border-white/10' : 'bg-white border-slate-300'
        }`}>
          {[
            { id: 'all', label: 'All Preview' },
            { id: 'pos', label: '💻 POS Counter' },
            { id: 'bill', label: '🧾 Thermal Bill' },
            { id: 'phone', label: '📱 Mobile POS' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setMobileDeviceTab(tab.id)}
              className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                mobileDeviceTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-black'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Main 3D Composition: Black Phone + Thermal Bill + Green Desktop --- */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0 pt-2 pb-8">

        {/* ============================================================== */}
        {/* 1. SMARTPHONE MOCKUP (Black Chassis with Red Header & Green Badge) */}
        {/* ============================================================== */}
        <div className={`relative z-20 group md:-mr-10 lg:-mr-14 shrink-0 transform transition-all duration-500 hover:scale-[1.03] hover:z-30 ${
          (mobileDeviceTab === 'all' || mobileDeviceTab === 'phone') ? 'block' : 'hidden md:block'
        }`}>
          
          {/* Phone Outer Chassis in Deep Matte Black with Emerald/Red Edge Glint */}
          <div className={`w-[230px] sm:w-[250px] max-w-[90vw] rounded-[40px] p-2.5 sm:p-3 shadow-2xl transition-all ${
            isDark
              ? 'bg-gradient-to-b from-[#181820] via-[#0E0E14] to-[#020204] border border-red-500/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-emerald-500/20'
              : 'bg-gradient-to-b from-slate-800 via-slate-900 to-black border border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/30'
          }`}>
            
            {/* Phone Screen Container */}
            <div className={`relative rounded-[32px] overflow-hidden flex flex-col h-[410px] sm:h-[440px] border shadow-inner ${
              isDark ? 'bg-[#0A0D14] border-white/5' : 'bg-white border-slate-200'
            }`}>
              
              {/* Dynamic Island / Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-20 h-4 bg-black rounded-full flex items-center justify-end pr-2 space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full bg-red-950 border border-red-700" />
              </div>

              {/* Status Bar */}
              <div className={`pt-2.5 px-4 pb-1 flex items-center justify-between text-[10px] font-semibold z-10 ${
                isDark ? 'text-slate-300' : 'text-slate-800'
              }`}>
                <span>9:41</span>
                <div className="flex items-center space-x-1.5">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3 h-3" />
                </div>
              </div>

              {/* StackPulse App Mobile Header (Ruby Red Gradient) */}
              <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-3.5 pt-3 pb-3 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-md bg-white text-red-600 flex items-center justify-center shadow-sm">
                      <Store className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-black text-xs tracking-wider uppercase flex items-center gap-1">
                      STACKPULSE <span className="text-emerald-300 text-[10px]">●</span>
                    </span>
                  </div>
                  <div className="relative">
                    <Bell className="w-4 h-4 opacity-90" />
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-ping" />
                  </div>
                </div>

                {/* Mobile Search Bar inside app */}
                <div className="mt-2.5 relative">
                  <input
                    type="text"
                    readOnly
                    value="Search items, bills..."
                    className="w-full bg-black/25 text-white placeholder-rose-100 text-[11px] rounded-lg px-2.5 py-1.5 outline-none pl-7 border border-white/20"
                  />
                  <Search className="w-3.5 h-3.5 text-rose-200 absolute left-2 top-2" />
                </div>
              </div>

              {/* Kirana Action Tabs: Red (Purchase) & Green (Debit/Sales) */}
              <div className={`p-2.5 border-b ${isDark ? 'bg-[#0D111A] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-1.5 px-2 rounded-lg bg-red-500/15 border border-red-500/40 text-red-500 text-[10px] font-bold text-center">
                    PURCHASE (उधार)
                  </button>
                  <button className="py-1.5 px-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold text-center">
                    DEBIT (जमा POS)
                  </button>
                </div>
              </div>

              {/* Transaction List (Recent Invoices) */}
              <div className={`flex-1 px-3 py-2 space-y-2 overflow-hidden ${isDark ? 'bg-[#0A0D14]' : 'bg-white'}`}>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Recent Invoices</div>

                {/* Bill Row 1 - Green Paid */}
                <div className={`p-2 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-[#121624] border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold text-[10px]">
                      #42
                    </div>
                    <div>
                      <div className={`text-[11px] font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Kirana Superstore
                      </div>
                      <div className="text-[9px] text-slate-400">Today • 11:42 AM</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 font-mono-nums">₹1,926.00</div>
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-1 rounded font-bold border border-emerald-500/30">PAID</span>
                  </div>
                </div>

                {/* Bill Row 2 - Cash POS */}
                <div className={`p-2 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-[#121624] border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #41
                    </div>
                    <div>
                      <div className={`text-[11px] font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Dairy Milk Silk
                      </div>
                      <div className="text-[9px] text-slate-400">Cash POS • Counter</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[11px] font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      ₹298.00
                    </div>
                    <span className={`text-[8px] px-1 rounded font-semibold ${
                      isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-700'
                    }`}>CASH</span>
                  </div>
                </div>

                {/* Bill Row 3 - Red Due/GST */}
                <div className={`p-2 rounded-xl border flex items-center justify-between ${
                  isDark ? 'bg-[#121624] border-white/5' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-red-500/15 text-red-500 flex items-center justify-center font-bold text-[10px]">
                      #40
                    </div>
                    <div>
                      <div className={`text-[11px] font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        Wholesale FMCG
                      </div>
                      <div className="text-[9px] text-slate-400">GSTR-1 Ready</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-[11px] font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      ₹14,250
                    </div>
                    <span className="text-[8px] bg-red-500/15 text-red-500 px-1 rounded font-bold border border-red-500/30">GST DUE</span>
                  </div>
                </div>
              </div>

              {/* Bottom Mobile Tab Bar */}
              <div className={`px-4 py-2 border-t flex items-center justify-between text-[10px] ${
                isDark ? 'border-white/5 text-slate-400' : 'border-slate-100 text-slate-400'
              }`}>
                <span className="text-emerald-500 font-bold">● Home</span>
                <span>POS</span>
                <span className="text-red-500 font-semibold">Khata</span>
                <span>Ledger</span>
              </div>

            </div>
          </div>

          {/* Floating Store Icon Circle Badge (Luminous Emerald Green) */}
          <div className={`absolute -bottom-2 -left-3 sm:-left-5 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.55)] border-4 transform hover:scale-110 transition-transform ${
            isDark ? 'border-[#0A0D14]' : 'border-white'
          }`}>
            <Store className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. THERMAL PRINTED BILL / RECEIPT (White/Black Paper)          */}
        {/* ============================================================== */}
        <div className={`relative z-30 group my-[-10px] md:my-0 shrink-0 transform transition-all duration-500 hover:scale-[1.04] hover:-translate-y-2 ${
          (mobileDeviceTab === 'all' || mobileDeviceTab === 'bill') ? 'block' : 'hidden md:block'
        }`}>
          
          {/* Background Curled Thermal Paper Tape Ribbon (curling from behind) */}
          <div className="absolute -top-14 -left-8 w-40 h-24 pointer-events-none -z-10">
            <svg viewBox="0 0 160 100" className="w-full h-full drop-shadow-md">
              <path
                d="M 20 80 C 10 40, 40 10, 80 15 C 120 20, 150 50, 140 85 C 130 65, 105 45, 75 45 C 45 45, 25 65, 20 80 Z"
                fill="url(#curledPaperGrad)"
                stroke="#E2E8F0"
                strokeWidth="0.8"
              />
              <defs>
                <linearGradient id="curledPaperGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F1F5F9" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-4 left-10 font-mono text-[8px] text-slate-500 font-bold tracking-widest uppercase rotate-[-12deg] opacity-70">
              StackPulse
            </div>
          </div>

          {/* Main Thermal Paper Receipt Card */}
          <div className="w-[245px] sm:w-[270px] bg-white text-slate-900 rounded-t-2xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] ring-1 ring-slate-900/10 transition-all p-4 pb-2 flex flex-col font-mono relative">
            
            {/* Header: StackPulse Logo with Green Pulse Dot */}
            <div className="text-center pb-2 border-b border-dashed border-slate-300">
              <div className="font-black text-lg tracking-tight text-slate-900 flex items-center justify-center gap-1.5">
                <span>StackPulse</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse" />
              </div>
              <div className="text-[9px] text-slate-500 tracking-wider mt-0.5">TAX INVOICE • B2B POS</div>
              <div className="text-[8px] text-slate-400 mt-0.5">Bill #SP-9842 • 25-Oct-2026</div>
            </div>

            {/* Line Items Table */}
            <div className="py-2.5 text-[10px] space-y-1.5 border-b border-dashed border-slate-300">
              <div className="flex justify-between text-[8px] font-bold text-slate-400 tracking-wider">
                <span>ITEM OVERVIEW</span>
                <span>AMT (₹)</span>
              </div>

              <div className="flex justify-between items-center text-[10.5px]">
                <span className="truncate pr-2 font-medium text-slate-800">Dairy Milk Silk 60g</span>
                <span className="font-bold text-slate-900">185.00</span>
              </div>

              <div className="flex justify-between items-center text-[10.5px]">
                <span className="truncate pr-2 font-medium text-slate-800">Fortune Mustard Oil</span>
                <span className="font-bold text-slate-900">0.30</span>
              </div>

              <div className="flex justify-between items-center text-[10.5px]">
                <span className="truncate pr-2 font-medium text-slate-800">Tata Salt Vacuum 1kg</span>
                <span className="font-bold text-slate-900">15.00</span>
              </div>

              <div className="flex justify-between items-center text-[10.5px]">
                <span className="truncate pr-2 font-medium text-slate-800">Good Day Butter 120g</span>
                <span className="font-bold text-slate-900">34.00</span>
              </div>

              <div className="flex justify-between items-center text-[9px] text-slate-500 pt-1">
                <span>Total Taxes (GST 18%)</span>
                <span>₹14.20</span>
              </div>
            </div>

            {/* Total Section with Emerald Green Grand Total */}
            <div className="py-2 flex justify-between items-center border-b border-dashed border-slate-300">
              <span className="font-bold text-xs text-slate-700">GRAND TOTAL</span>
              <span className="font-black text-sm text-emerald-600 font-mono-nums flex items-center gap-1">
                <span>₹1,926.00</span>
              </span>
            </div>

            {/* Scannable Realistic Barcode (SVG in Deep Black) */}
            <div className="pt-2.5 pb-1 flex flex-col items-center">
              <svg viewBox="0 0 160 38" className="w-full h-8 px-1" preserveAspectRatio="none">
                <rect x="0" y="0" width="3" height="38" fill="#111827" />
                <rect x="5" y="0" width="1.5" height="38" fill="#111827" />
                <rect x="8" y="0" width="4" height="38" fill="#111827" />
                <rect x="14" y="0" width="2" height="38" fill="#111827" />
                <rect x="18" y="0" width="1" height="38" fill="#111827" />
                <rect x="21" y="0" width="3.5" height="38" fill="#111827" />
                <rect x="27" y="0" width="2" height="38" fill="#111827" />
                <rect x="31" y="0" width="5" height="38" fill="#111827" />
                <rect x="38" y="0" width="2" height="38" fill="#111827" />
                <rect x="42" y="0" width="1.5" height="38" fill="#111827" />
                <rect x="46" y="0" width="4" height="38" fill="#111827" />
                <rect x="52" y="0" width="2" height="38" fill="#111827" />
                <rect x="56" y="0" width="3.5" height="38" fill="#111827" />
                <rect x="62" y="0" width="1.5" height="38" fill="#111827" />
                <rect x="66" y="0" width="4.5" height="38" fill="#111827" />
                <rect x="73" y="0" width="2" height="38" fill="#111827" />
                <rect x="77" y="0" width="2.5" height="38" fill="#111827" />
                <rect x="82" y="0" width="4" height="38" fill="#111827" />
                <rect x="88" y="0" width="1.5" height="38" fill="#111827" />
                <rect x="92" y="0" width="3.5" height="38" fill="#111827" />
                <rect x="98" y="0" width="2" height="38" fill="#111827" />
                <rect x="102" y="0" width="5" height="38" fill="#111827" />
                <rect x="109" y="0" width="2" height="38" fill="#111827" />
                <rect x="113" y="0" width="1.5" height="38" fill="#111827" />
                <rect x="117" y="0" width="3.5" height="38" fill="#111827" />
                <rect x="123" y="0" width="4" height="38" fill="#111827" />
                <rect x="129" y="0" width="1.5" height="38" fill="#111827" />
                <rect x="133" y="0" width="3" height="38" fill="#111827" />
                <rect x="138" y="0" width="2" height="38" fill="#111827" />
                <rect x="142" y="0" width="4" height="38" fill="#111827" />
                <rect x="148" y="0" width="2" height="38" fill="#111827" />
                <rect x="152" y="0" width="3" height="38" fill="#111827" />
                <rect x="157" y="0" width="3" height="38" fill="#111827" />
              </svg>
              <div className="text-[8.5px] text-slate-700 font-semibold tracking-[3px] mt-0.5">8901030825001</div>
            </div>

            {/* Serrated Zigzag Tear-Off Bottom Edge */}
            <div className="absolute -bottom-2.5 left-0 right-0 h-3 overflow-hidden">
              <svg className="w-full h-3 text-white fill-current" viewBox="0 0 200 10" preserveAspectRatio="none">
                <polygon points="0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 105,10 110,0 115,10 120,0 125,10 130,0 135,10 140,0 145,10 150,0 155,10 160,0 165,10 170,0 175,10 180,0 185,10 190,0 195,10 200,0 200,0 0,0" />
              </svg>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. DESKTOP / TABLET POS SCREEN (Emerald Green + Black Chassis) */}
        {/* ============================================================== */}
        <div className={`relative z-10 w-full sm:w-[400px] md:w-[460px] lg:w-[520px] md:-ml-10 lg:-ml-14 shrink-0 group transform transition-all duration-500 hover:scale-[1.02] ${
          (mobileDeviceTab === 'all' || mobileDeviceTab === 'pos') ? 'block' : 'hidden md:block'
        }`}>
          
          {/* Floating Pill Search Bar (Top of Desktop, with Red Search Accent) */}
          <div className={`hidden sm:flex absolute -top-4 sm:-top-5 right-4 sm:right-12 z-30 rounded-2xl px-3.5 sm:px-4 py-2 shadow-xl border items-center space-x-2.5 backdrop-blur-md ${
            isDark
              ? 'bg-[#0D111A]/95 border-emerald-500/30 shadow-[0_10px_25px_rgba(0,0,0,0.5)] text-white'
              : 'bg-white/95 border-slate-200 text-slate-800'
          }`}>
            <div className="w-6 h-6 rounded-full bg-red-500/15 text-red-500 flex items-center justify-center">
              <Search className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className={`text-[10px] font-bold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                Quick Search
              </div>
              <div className="text-[8.5px] text-slate-400">Search for product, barcode or party...</div>
            </div>
          </div>

          {/* Desktop POS Window Container in Sleek Black / White */}
          <div className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border pt-0 ${
            isDark
              ? 'bg-[#0A0D14] border-emerald-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)]'
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Emerald Green POS Header Bar (matching original reference image) */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between text-white shadow-md">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/70 shadow-[0_0_6px_#fff]" />
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/40" />
                <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80" />
                <span className="font-bold text-[11px] sm:text-xs ml-1 sm:ml-2 tracking-wide font-sans flex items-center gap-1.5">
                  <span className="truncate">StackPulse POS Counter</span>
                  <span className="hidden xs:inline-block text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded font-black border border-white/30">
                    LIVE POS
                  </span>
                </span>
              </div>
              <button 
                onClick={onScrollToSandbox}
                className="text-[10px] bg-black/25 hover:bg-black/40 text-white px-2 sm:px-2.5 py-1 rounded-lg font-bold transition-colors flex items-center gap-1 cursor-pointer border border-white/20 shrink-0"
              >
                <span>Interactive Test</span>
                <ArrowRight className="w-2.5 h-2.5 text-emerald-200" />
              </button>
            </div>

            {/* Desktop Dashboard Body */}
            <div className="p-3.5 sm:p-5 md:p-6 md:pl-24">
              
              {/* Top Sales Metric Bar */}
              <div className={`flex items-center justify-between pb-3 mb-3 border-b ${
                isDark ? 'border-white/5' : 'border-slate-100'
              }`}>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Today's Counter Revenue</div>
                  <div className={`text-xl sm:text-2xl font-black font-mono-nums flex items-center gap-1.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <span>₹1,926.00</span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                      ⚡ +28.4%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Avg Ticket Size</div>
                  <div className={`text-base sm:text-lg font-bold font-mono-nums ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    ₹298.00
                  </div>
                </div>
              </div>

              {/* Real-time Sales Trendline Chart with Emerald Green Line & Red Peak */}
              <div className="relative pt-1">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-2">
                  <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    Hourly Sales Velocity
                  </span>
                  <span className="font-mono-nums text-[9px] bg-red-500/10 text-red-500 border border-red-500/30 px-2 py-0.5 rounded font-bold shadow-[0_0_6px_rgba(239,68,68,0.2)]">
                    Peak: ₹2,380
                  </span>
                </div>

                {/* SVG Curve with Nodes */}
                <div className="relative h-28 sm:h-32 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 310 90" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="emeraldGreenChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                        <stop offset="60%" stopColor="#059669" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    <line x1="0" y1="15" x2="310" y2="15" stroke="currentColor" className={isDark ? 'text-white/5' : 'text-slate-200'} strokeDasharray="3 3" />
                    <line x1="0" y1="45" x2="310" y2="45" stroke="currentColor" className={isDark ? 'text-white/5' : 'text-slate-200'} strokeDasharray="3 3" />
                    <line x1="0" y1="75" x2="310" y2="75" stroke="currentColor" className={isDark ? 'text-white/5' : 'text-slate-200'} strokeDasharray="3 3" />

                    {/* Area under curve */}
                    <path
                      d="M 25 72 Q 50 63, 75 55 T 130 64 T 185 38 T 240 20 T 295 14 L 295 85 L 25 85 Z"
                      fill="url(#emeraldGreenChartGradient)"
                    />

                    {/* Emerald Green trendline */}
                    <path
                      d="M 25 72 Q 50 63, 75 55 T 130 64 T 185 38 T 240 20 T 295 14"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {chartPoints.map((pt, idx) => {
                      const isSelected = activeDataPoint === idx;
                      return (
                        <g key={idx} className="cursor-pointer" onClick={() => setActiveDataPoint(idx)}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? '6' : '4'}
                            fill={isSelected ? '#EF4444' : '#10B981'}
                            className="transition-all hover:scale-125"
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isSelected ? '11' : '7'}
                            fill={isSelected ? '#EF4444' : '#10B981'}
                            fillOpacity={isSelected ? '0.4' : '0.15'}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Active Tooltip */}
                  <div 
                    className={`absolute z-20 -top-1 text-[9px] font-mono-nums px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)] pointer-events-none transform -translate-x-1/2 transition-all ${
                      isDark ? 'bg-[#0A0D14] text-white border border-emerald-500/40' : 'bg-slate-900 text-white'
                    }`}
                    style={{ left: `${(chartPoints[activeDataPoint].x / 310) * 100}%` }}
                  >
                    <span className="text-emerald-400 font-bold">{chartPoints[activeDataPoint].day}:</span> {chartPoints[activeDataPoint].amount}
                  </div>
                </div>

                {/* X-Axis labels */}
                <div className="flex justify-between px-2 pt-1 text-[9px] text-slate-400 font-medium">
                  {chartPoints.map((pt, i) => (
                    <span 
                      key={i} 
                      className={`cursor-pointer transition-colors ${activeDataPoint === i ? 'text-emerald-500 font-black' : isDark ? 'hover:text-slate-200' : 'hover:text-slate-700'}`}
                      onClick={() => setActiveDataPoint(i)}
                    >
                      {pt.day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mock Live Transaction Feed Ticker */}
              <div className={`mt-3 py-1.5 px-3 rounded-xl border flex items-center justify-between text-[10px] overflow-hidden ${
                isDark ? 'bg-[#06080F]/90 border-emerald-500/20 shadow-inner' : 'bg-slate-100/90 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Live Feed:</span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTx.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-2 truncate"
                    >
                      <span className={`font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{currentTx.title}</span>
                      <span className="font-black text-emerald-500 dark:text-emerald-400 font-mono-nums">{currentTx.amount}</span>
                      <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold border ${
                        currentTx.color === 'pink' 
                          ? 'bg-pink-500/15 text-pink-400 border-pink-500/30' 
                          : 'bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border-emerald-500/30'
                      }`}>
                        {currentTx.tag}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="text-[9px] text-slate-400 shrink-0 ml-2 font-mono-nums">{currentTx.time}</span>
              </div>

              {/* Animated Glowing Cursor with Floating Physics */}
              <motion.div
                animate={{
                  x: [40, 160, 220, 90, 40],
                  y: [20, 65, 35, 80, 20],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-14 left-10 z-30 pointer-events-none drop-shadow-[0_0_15px_rgba(16,185,129,0.9)] hidden sm:block"
              >
                <div className="relative flex items-center">
                  <svg className="w-5 h-5 text-emerald-400 fill-emerald-400 drop-shadow-[0_0_8px_#10B981]" viewBox="0 0 24 24">
                    <path d="M3 3l7 18 3-7 7-3L3 3z" />
                  </svg>
                  <div className="ml-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-black text-[9px] shadow-[0_0_15px_rgba(16,185,129,0.7)] border border-emerald-300/40 whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>Auto Barcode Scan (0.2s)</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Floating Toast Pill on Bottom Right of Desktop (Vibrant Emerald Green CTA) */}
            <div className={`p-3 border-t flex items-center justify-between pl-6 sm:pl-16 md:pl-24 ${
              isDark ? 'bg-[#0E121E] border-white/5' : 'bg-slate-50 border-slate-100'
            }`}>
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className={`text-[11px] font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Live POS System Active
                </span>
              </div>
              <button
                onClick={onOpenDemoModal}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-md shadow-emerald-600/35 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Get Demo Now</span>
                <ArrowRight className="w-3 h-3 text-white" />
              </button>
            </div>

          </div>
        </div>

        {/* ============================================================== */}
        {/* 4. CENTER TRANSLUCENT PLAY BUTTON OVERLAY (Deep Black Frosted Glass) */}
        {/* ============================================================== */}
        <div 
          onClick={onOpenDemoModal}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 group cursor-pointer"
          title="Watch 2-Min Live Interactive Video Demo"
        >
          {/* Breathing Pulse Waves in Crimson Red */}
          <div className="absolute inset-0 rounded-full bg-red-500/25 animate-ping duration-1000 pointer-events-none" />
          <div className="absolute -inset-2 rounded-full bg-emerald-500/20 blur-sm pointer-events-none" />

          {/* Frosted Circular Play Button */}
          <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full backdrop-blur-md border-2 border-red-500/60 group-hover:border-emerald-400 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] ${
            isDark ? 'bg-black/85' : 'bg-slate-900/75'
          }`}>
            <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1 transition-transform group-hover:scale-110 group-hover:text-emerald-300 group-hover:fill-emerald-300" />
          </div>

          {/* Floating Tooltip Pill */}
          <div className={`absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap shadow-lg pointer-events-none border border-red-500/40 ${
            isDark ? 'bg-[#0A0D14]' : 'bg-slate-900'
          }`}>
            Watch Live Demo <span className="text-emerald-400">⚡</span>
          </div>
        </div>

      </div>

    </div>
  );
}
