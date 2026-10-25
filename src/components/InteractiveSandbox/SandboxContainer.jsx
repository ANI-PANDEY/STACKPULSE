import React, { useState } from 'react';
import CashierPOSView from './CashierPOSView';
import AdminAnalyticsView from './AdminAnalyticsView';
import InventoryManagerView from './InventoryManagerView';
import CreditLedgerView from './CreditLedgerView';
import { 
  Receipt, 
  TrendingUp, 
  Boxes, 
  BookOpen, 
  Lock,
  Zap
} from 'lucide-react';

export default function SandboxContainer({ theme, onOpenWhatsAppModal, onOpenTrialModal, leadsCount, onOpenLeadsModal }) {
  const [activeTab, setActiveTab] = useState('cashier');
  const isDark = theme === 'dark';

  return (
    <section id="sandbox" className={`py-24 pt-32 scroll-mt-28 relative border-y transition-colors duration-300 ${
      isDark ? 'bg-[#050508]/95 border-white/10' : 'bg-slate-100/60 border-slate-200'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-extrabold">INTERACTIVE LIVE DEMO PORTAL</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Test Drive StackPulse Right Now. <br />
            <span className="text-gradient-cyber">No Signup Required!</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Experience role-based access in real-time. Switch between Cashier POS billing, Executive Admin analytics, Multi-Warehouse Stock control, and Dealer Khata.
          </p>
        </div>

        {/* Role Tab Navigation Buttons in Black, Green & Red */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 pt-2">
          <button
            onClick={() => setActiveTab('cashier')}
            className={`w-full lg:w-auto justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'cashier'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500 shadow-emerald-600/35 sm:scale-105 font-black'
                : isDark 
                  ? 'bg-[#0B0D14] text-slate-300 border-white/10 hover:border-emerald-500/50 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <Receipt className={`w-4 sm:w-4.5 h-4 sm:h-4.5 shrink-0 ${activeTab === 'cashier' ? 'text-emerald-200' : 'text-emerald-500'}`} />
            <span>Try Cashier View (PulseBill POS)</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`w-full lg:w-auto justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white border-red-500 shadow-red-600/35 sm:scale-105 font-black'
                : isDark 
                  ? 'bg-[#0B0D14] text-slate-300 border-white/10 hover:border-red-500/50 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <TrendingUp className={`w-4 sm:w-4.5 h-4 sm:h-4.5 shrink-0 ${activeTab === 'admin' ? 'text-red-200' : 'text-red-500'}`} />
            <span>Try Admin Analytics & GSTR Export</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`w-full lg:w-auto justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-slate-900 text-emerald-400 border-emerald-500 shadow-emerald-500/20 sm:scale-105 font-black ring-1 ring-emerald-500/40'
                : isDark 
                  ? 'bg-[#0B0D14] text-slate-300 border-white/10 hover:border-emerald-500/50 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <Boxes className={`w-4 sm:w-4.5 h-4 sm:h-4.5 shrink-0 ${activeTab === 'inventory' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>Try Stock Manager (PulseStock)</span>
          </button>

          <button
            onClick={() => setActiveTab('khata')}
            className={`w-full lg:w-auto justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'khata'
                ? 'bg-slate-900 text-red-400 border-red-500 shadow-red-500/20 sm:scale-105 font-black ring-1 ring-red-500/40'
                : isDark 
                  ? 'bg-[#0B0D14] text-slate-300 border-white/10 hover:border-red-500/50 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <BookOpen className={`w-4 sm:w-4.5 h-4 sm:h-4.5 shrink-0 ${activeTab === 'khata' ? 'text-red-400' : 'text-slate-400'}`} />
            <span>Try Dealer Khata & Reminders</span>
          </button>
        </div>

        {/* Sandbox Content Screen in Jet Black */}
        <div className={`relative rounded-3xl p-3 sm:p-5 shadow-2xl border ${
          isDark 
            ? 'glass-panel-ultra border-emerald-500/25 glow-emerald-lg shadow-[0_25px_60px_rgba(0,0,0,0.95)]' 
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          {/* Top Bar inside Portal */}
          <div className={`flex items-center justify-between px-5 py-3.5 rounded-t-2xl border-b text-xs ${
            isDark ? 'bg-[#06080F] border-white/5' : 'bg-slate-100 border-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
              <span className="w-3 h-3 rounded-full bg-slate-600" />
              <span className={`font-mono hidden sm:inline ml-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                tenant_id: <span className="text-emerald-400 font-bold">org_sharma_wholesalers_mumbai</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className={`hidden md:inline-flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <Lock className="w-3.5 h-3.5 text-red-400" /> Multi-Tenant MongoDB Security
              </span>
              <button 
                onClick={onOpenTrialModal}
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-4 py-1.5 rounded-xl border border-red-500/50 font-black shadow-md shadow-red-500/30 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
              >
                <span>Create My Account</span>
                <span className="text-emerald-300 font-extrabold">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Render Active View */}
          <div className="mt-3">
            {activeTab === 'cashier' && <CashierPOSView theme={theme} onOpenWhatsAppModal={onOpenWhatsAppModal} />}
            {activeTab === 'admin' && (
              <AdminAnalyticsView 
                theme={theme} 
                leadsCount={leadsCount} 
                onOpenLeadsModal={onOpenLeadsModal} 
              />
            )}
            {activeTab === 'inventory' && <InventoryManagerView theme={theme} />}
            {activeTab === 'khata' && <CreditLedgerView theme={theme} onOpenWhatsAppModal={onOpenWhatsAppModal} />}
          </div>

        </div>

      </div>
    </section>
  );
}
