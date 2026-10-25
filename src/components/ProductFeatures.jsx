import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Barcode, 
  Boxes, 
  FileSpreadsheet, 
  BookOpen, 
  ArrowRight,
  Zap,
  ShoppingBag,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  Clock,
  ShieldCheck
} from 'lucide-react';

export default function ProductFeatures({ theme, onOpenDemoModal }) {
  const [activeMode, setActiveMode] = useState('b2c'); // 'b2c' | 'b2b'
  const isDark = theme === 'dark';

  // Interactive scanner simulation inside Card 1
  const [scannedItems, setScannedItems] = useState([
    { name: 'Fortune Sunflower Oil 1L', barcode: '8901030825001', price: 145, time: '11:42:01 AM', hsn: '1512' },
    { name: 'Tata Salt Vacuum Evaporated 1kg', barcode: '8901058852101', price: 28, time: '11:42:02 AM', hsn: '2501' },
    { name: 'Dairy Milk Silk Hazelnut 60g', barcode: '8901233024881', price: 185, time: '11:42:03 AM', hsn: '1806' }
  ]);
  const [lastScannedTime, setLastScannedTime] = useState('0.18s');
  const [isScanning, setIsScanning] = useState(false);

  // Interactive Khata Reminder trigger
  const [reminderSent, setReminderSent] = useState(false);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const mockPool = [
        { name: 'Amul Butter Pasteurised 500g', barcode: '8901262010053', price: 275, hsn: '0405' },
        { name: 'Aashirvaad Shudh Chakki Atta 5kg', barcode: '8901030381026', price: 240, hsn: '1101' },
        { name: 'Surf Excel Quick Wash 1kg', barcode: '8901030712004', price: 199, hsn: '3402' },
        { name: 'Good Day Cashew Cookies 200g', barcode: '8901063121025', price: 45, hsn: '1905' }
      ];
      const randomItem = mockPool[Math.floor(Math.random() * mockPool.length)];
      const now = new Date().toLocaleTimeString();
      setScannedItems(prev => [{ ...randomItem, time: now }, ...prev.slice(0, 3)]);
      setLastScannedTime((0.15 + Math.random() * 0.08).toFixed(2) + 's');
      setIsScanning(false);
    }, 280);
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  return (
    <section id="products" className={`py-24 scroll-mt-28 relative transition-colors duration-300 ${
      isDark ? 'bg-[#090A0F]' : 'bg-slate-100/70'
    }`}>
      
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className={`w-[600px] h-[600px] rounded-full blur-[140px] opacity-40 ${
          activeMode === 'b2c' ? 'bg-emerald-600/20' : 'bg-pink-600/20'
        }`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-extrabold uppercase tracking-wider">Enterprise Architecture</span>
          </div>

          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Engineered for High-Velocity <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-pink-500 bg-clip-text text-transparent">
              Modern Commerce
            </span>
          </h2>

          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Seamlessly switch between B2C Supermarket counter POS and B2B Wholesale distribution with zero latency.
          </p>
        </div>

        {/* Dual-Mode Tab Switcher */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className={`p-1.5 rounded-2xl border w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-2 backdrop-blur-xl ${
            isDark ? 'bg-[#0F121A]/90 border-white/10 shadow-2xl' : 'bg-white border-slate-300 shadow-md'
          }`}>
            
            <button
              onClick={() => setActiveMode('b2c')}
              className={`w-full justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'b2c'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/35 font-black ring-1 ring-emerald-400/40'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className={`w-4 h-4 shrink-0 ${activeMode === 'b2c' ? 'text-white' : 'text-emerald-400'}`} />
              <span className="truncate">For Retail Marts (B2C)</span>
              {activeMode === 'b2c' && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-mono shrink-0">ACTIVE</span>
              )}
            </button>

            <button
              onClick={() => setActiveMode('b2b')}
              className={`w-full justify-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'b2b'
                  ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 text-white shadow-lg shadow-pink-600/35 font-black ring-1 ring-pink-400/40'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className={`w-4 h-4 shrink-0 ${activeMode === 'b2b' ? 'text-white' : 'text-pink-400'}`} />
              <span className="truncate">Wholesale & Trade (B2B)</span>
              {activeMode === 'b2b' && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-mono shrink-0">ACTIVE</span>
              )}
            </button>

          </div>
        </div>

        {/* Dynamic Mode Subtitle Pill */}
        <div className="flex justify-center mb-8 px-2">
          <div className={`text-[11px] sm:text-xs px-3.5 sm:px-4 py-2 rounded-xl sm:rounded-full border flex items-center justify-center gap-2 text-center max-w-2xl ${
            isDark ? 'bg-[#0E131F] border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 shrink-0 ${activeMode === 'b2c' ? 'text-emerald-400' : 'text-pink-400'}`} />
            <span>
              {activeMode === 'b2c' 
                ? 'Optimized for high footfall barcode counters, express lanes & direct WhatsApp receipt delivery'
                : 'Optimized for bulk truck dispatches, multi-warehouse depots, dealer credit limits & GSTR-1 filings'}
            </span>
          </div>
        </div>

        {/* 4 Bento-Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ============================================================== */}
          {/* BENTO CARD 1 (Large 2 Columns): Sub-Second Barcode Billing   */}
          {/* ============================================================== */}
          <div className={`md:col-span-2 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
            isDark 
              ? 'bg-[#0F121A]/85 border-white/10 hover:border-emerald-500/40 shadow-2xl hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            {/* Top Badge & Metric */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <Barcode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Sub-Second Barcode Billing
                  </h3>
                  <div className="text-xs text-slate-400">
                    {activeMode === 'b2c' ? 'Express Checkout Mode' : 'Bulk Batch Barcode Dispatch'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <div className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] sm:text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Latency: {lastScannedTime}</span>
                </div>
                <button
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="px-3 sm:px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Scanning...' : 'Test Scan Item'}</span>
                </button>
              </div>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Connect wireless Honeywell, TVS, or Zebra barcode guns instantly. Process 60+ items per minute with zero lag, instant subtotal computation, and auto-generated thermal receipts.
            </p>

            {/* Live Interactive Scanner Simulation Feed */}
            <div className={`p-3.5 sm:p-4 rounded-2xl border font-mono text-xs space-y-2.5 ${
              isDark ? 'bg-[#07090F] border-white/5' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-2 text-[10px] sm:text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>LIVE SCANNER BUFFER (COUNTER #01)</span>
                </span>
                <span className="text-emerald-400 font-bold">READY TO PRINT</span>
              </div>

              <div className="space-y-2">
                {scannedItems.map((item, idx) => (
                  <motion.div
                    key={`${item.barcode}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-2.5 rounded-xl border flex items-center justify-between ${
                      idx === 0 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-bold'
                        : isDark ? 'bg-[#0D1018] border-white/5 text-slate-300' : 'bg-white border-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-[10px] text-slate-500 shrink-0">[{item.time.slice(0, 8)}]</span>
                      <span className="truncate">{item.name}</span>
                      <span className="hidden xs:inline-block text-[9px] px-1.5 py-0.2 rounded bg-black/30 border border-white/10 text-slate-400 shrink-0">
                        HSN {item.hsn}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono-nums font-black text-emerald-400">₹{item.price}.00</span>
                      {idx === 0 && (
                        <span className="ml-1.5 sm:ml-2 text-[9px] bg-emerald-500/20 text-emerald-400 px-1 rounded font-mono">
                          NEW
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* BENTO CARD 2: Multi-Warehouse Inventory Sync                  */}
          {/* ============================================================== */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
            isDark 
              ? 'bg-[#0F121A]/85 border-white/10 hover:border-pink-500/40 shadow-2xl hover:shadow-[0_20px_50px_rgba(236,72,153,0.12)]' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div>
              <div className="w-9 h-9 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center border border-pink-500/30 mb-4">
                <Boxes className="w-5 h-5" />
              </div>

              <h3 className={`text-lg font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Multi-Warehouse Sync
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeMode === 'b2c' 
                  ? 'Keep front shelves and backstore stock aligned with real-time barcode reconciliation.'
                  : 'Track pallet movement from Central Depot to regional depots and franchise counters.'}
              </p>

              {/* Warehouse Sync Diagram */}
              <div className={`p-3.5 rounded-2xl border space-y-2.5 font-mono text-[11px] ${
                isDark ? 'bg-[#07090F] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Main Depot (Mumbai)</span>
                  <span className="text-emerald-400 font-bold">14,200 Units</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                  <span className="text-slate-400">Branch Mart #1 (BKC)</span>
                  <span className="text-emerald-400 font-bold">1,840 Units</span>
                </div>
                <div className="flex items-center justify-between text-pink-400 font-bold">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-pink-400" /> Low Stock Mart #2
                  </span>
                  <span>14 Units Left</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Auto Re-Order Triggers
              </span>
              <span className="text-[10px] text-slate-500 font-mono">0ms drift</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BENTO CARD 3: Automated GST Invoicing (GSTR-1 & 3B Ready)     */}
          {/* ============================================================== */}
          <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden group flex flex-col justify-between ${
            isDark 
              ? 'bg-[#0F121A]/85 border-white/10 hover:border-emerald-500/40 shadow-2xl hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)]' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 mb-4">
                <FileSpreadsheet className="w-5 h-5" />
              </div>

              <h3 className={`text-lg font-black mb-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Automated GST Invoicing
              </h3>

              <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                100% tax compliant with automated CGST, SGST & IGST rate calculations and instant 1-click government return JSON/CSV exports.
              </p>

              {/* GST Tax Preview Mock */}
              <div className={`p-3.5 rounded-2xl border space-y-2 font-mono text-[11px] ${
                isDark ? 'bg-[#07090F] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between text-slate-400">
                  <span>Taxable Value:</span>
                  <span className="text-white font-bold">₹1,632.20</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>CGST (9%) + SGST (9%):</span>
                  <span className="text-emerald-400 font-bold">₹293.80</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-1.5 font-bold text-white">
                  <span>Total Invoice (B2B Tax):</span>
                  <span className="text-emerald-400 font-mono-nums">₹1,926.00</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> GSTR-1 / 3B Ready
              </span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                1-CLICK EXPORT
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BENTO CARD 4 (Large 2 Columns): Customer Khata & Loyalty     */}
          {/* ============================================================== */}
          {/* ============================================================== */}
          {/* BENTO CARD 4 (Large 2 Columns): Customer Khata & Loyalty     */}
          {/* ============================================================== */}
          <div className={`md:col-span-2 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden group ${
            isDark 
              ? 'bg-[#0F121A]/85 border-white/10 hover:border-pink-500/40 shadow-2xl hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)]' 
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center border border-pink-500/30 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Customer Khata & Smart Loyalty
                  </h3>
                  <div className="text-xs text-slate-400">
                    {activeMode === 'b2c' ? 'Points Engine & WhatsApp Receipts' : 'Wholesale Credit Ledger & Payment Reminders'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSendReminder}
                className="w-full sm:w-auto justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" />
                <span>{reminderSent ? 'WhatsApp Link Sent! ✓' : 'Send WhatsApp Reminder'}</span>
              </button>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed mb-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Maintain a real-time digital khata book for your regular customers and wholesale dealers. Track outstanding credit, set custom credit limits, and send automated WhatsApp payment reminders with UPI QR codes.
            </p>

            {/* Interactive Ledger Preview Table with Mobile Overflow Protection */}
            <div className="overflow-x-auto -mx-1 px-1">
              <div className={`min-w-[400px] p-3.5 sm:p-4 rounded-2xl border font-mono text-xs ${
                isDark ? 'bg-[#07090F] border-white/5' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-slate-400 border-b border-white/5 pb-2">
                  <span>PARTY NAME</span>
                  <span>TYPE</span>
                  <span>OUTSTANDING</span>
                  <span className="text-right">ACTION</span>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="grid grid-cols-4 gap-2 items-center text-[11px] py-1">
                    <span className={`font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Sharma General Store</span>
                    <span className="text-emerald-400 text-[10px]">B2B Wholesaler</span>
                    <span className="text-pink-400 font-bold font-mono-nums">₹42,500 DUE</span>
                    <div className="text-right">
                      <span className="text-[10px] bg-pink-500/15 text-pink-400 px-2 py-0.5 rounded font-bold border border-pink-500/30">
                        Auto-Remind
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 items-center text-[11px] py-1 border-t border-white/5">
                    <span className={`font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Dr. Rajesh Patel</span>
                    <span className="text-teal-400 text-[10px]">Retail Khata</span>
                    <span className="text-slate-400 font-mono-nums">₹1,240 DUE</span>
                    <div className="text-right">
                      <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-500/30">
                        PAID VIA UPI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenDemoModal}
            className="px-8 py-4 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Full {activeMode === 'b2c' ? 'Supermarket' : 'Wholesale'} Feature Suite</span>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </button>
        </div>

      </div>
    </section>
  );
}
