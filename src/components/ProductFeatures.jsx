import React, { useState } from 'react';
import { 
  Receipt, 
  Boxes, 
  BookOpen, 
  Barcode, 
  MessageSquare, 
  FileSpreadsheet, 
  ShieldAlert, 
  Building2, 
  FileText, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ProductFeatures({ theme, onOpenDemoModal }) {
  const [activeProductTab, setActiveProductTab] = useState('pulsebill');
  const isDark = theme === 'dark';

  return (
    <section id="products" className={`py-24 scroll-mt-28 relative transition-colors duration-300 ${
      isDark ? 'bg-[#080C14]' : 'bg-slate-100/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRODUCT PORTFOLIO</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Engineered For B2B Wholesalers, <br />
            <span className="text-gradient-brand">Distributors & Supermarkets</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Three powerful products integrated seamlessly in one multi-tenant cloud subscription.
          </p>
        </div>

        {/* Product Selection Tabs */}
        <div className="flex justify-center mb-12">
          <div className={`p-1.5 rounded-2xl border flex flex-wrap gap-2 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-300 shadow-md'
          }`}>
            
            <button
              onClick={() => setActiveProductTab('pulsebill')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeProductTab === 'pulsebill'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>PulseBill (POS & GST)</span>
            </button>

            <button
              onClick={() => setActiveProductTab('pulsestock')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeProductTab === 'pulsestock'
                  ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Boxes className="w-4 h-4" />
              <span>PulseStock (Inventory)</span>
            </button>

            <button
              onClick={() => setActiveProductTab('b2bsuite')}
              className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                activeProductTab === 'b2bsuite'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>B2B Distribution Suite</span>
            </button>

          </div>
        </div>

        {/* Product Details Display Container */}
        {activeProductTab === 'pulsebill' && (
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                <Receipt className="w-4 h-4" /> PulseBill Feature Set
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ultra-Fast POS Billing & 100% GST Return Compliance
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Empower your billing counters with sub-second barcode scanning, automatic CGST, SGST & IGST split calculation, thermal paper printing, and direct WhatsApp PDF invoice sending.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Barcode className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Barcode Scanner Ready</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Plug & play with Honeywell, TVS, Zebra barcode guns or use mobile camera scanning.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <FileSpreadsheet className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>GSTR-1 & GSTR-3B Auto Export</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Generate government tax return JSON & CSV formats ready for 1-click filing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>WhatsApp & SMS Invoice Auto-Send</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Deliver eco-friendly WhatsApp invoices with embedded UPI payment links directly to customers.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenDemoModal}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Book PulseBill Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`lg:col-span-6 p-6 rounded-2xl border text-xs font-mono space-y-3 ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}>
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>SYSTEM STATUS: ONLINE</span>
                <span className="text-emerald-400">POS-TERMINAL-01</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                ✓ BARCODE SCANNED: 8901058852101 (Tata Tea 500g)
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-slate-200">
                CGST (9%): ₹15.30 | SGST (9%): ₹15.30 | Total: ₹170.00
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-cyan-300">
                ✓ WHATSAPP INVOICE DELIVERED TO +91 98765 43210
              </div>
            </div>
          </div>
        )}

        {activeProductTab === 'pulsestock' && (
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-500 text-xs font-bold">
                <Boxes className="w-4 h-4" /> PulseStock Feature Set
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Real-Time Stock Control & Multi-Warehouse Sync
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Prevent stockouts, track batch numbers & expiry dates, and reconcile vendor Purchase Orders (PO) automatically.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Low-Stock & Batch/Expiry Warnings</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Receive instant push & WhatsApp notifications before stock reaches critical threshold or expires.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Multi-Warehouse Sync</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Track inventory movement across central hub, branch warehouses, and retail counters in real-time.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-500/30">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>PO to Stock Auto Reconciliation</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Reconcile vendor invoices with received goods to prevent short-shipments and leakage.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenDemoModal}
                className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-400/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Book PulseStock Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`lg:col-span-6 p-6 rounded-2xl border text-xs font-mono space-y-3 ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}>
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>STOCK MONITOR: ACTIVE</span>
                <span className="text-cyan-400">3 WAREHOUSES CONNECTED</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-amber-300 font-bold">
                ⚠️ LOW STOCK: Atta 5kg (12 units left in Mumbai Hub)
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                ✓ PO #PO-8821 RECONCILED: +100 units added to stock
              </div>
            </div>
          </div>
        )}

        {activeProductTab === 'b2bsuite' && (
          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
          }`}>
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 text-xs font-bold">
                <BookOpen className="w-4 h-4" /> B2B Suite Feature Set
              </div>
              <h3 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Dealer Credit Khata & Role-Based Access Control
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Streamline dealer khata, send automated WhatsApp payment reminders with payment links, and assign precise staff roles.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Credit Ledger (Khata Book) & Reminders</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Manage dealer credit limits, payment terms, and send 1-click WhatsApp payment reminders with UPI links.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-500 flex items-center justify-center shrink-0 border border-indigo-500/30">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Role-Based Access Control</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Assign specialized permissions for Admin, Cashier, Inventory Manager, and Accountant.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenDemoModal}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 flex items-center gap-2 cursor-pointer"
              >
                <span>Book B2B Suite Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`lg:col-span-6 p-6 rounded-2xl border text-xs font-mono space-y-3 ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-200'
            }`}>
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>CREDIT LEDGER: ACTIVE</span>
                <span className="text-indigo-400">48 DEALER ACCOUNTS</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                ✓ REMINDER SENT: Gupta Wholesale Traders (Outstanding: ₹3.2L)
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-indigo-300 font-bold">
                ✓ ROLE ACTIVE: Cashier View (Restricted from P&L Reports)
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
