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
  Sparkles, 
  Lock
} from 'lucide-react';

export default function SandboxContainer({ theme, onOpenWhatsAppModal, onOpenTrialModal, leadsCount, onOpenLeadsModal }) {
  const [activeTab, setActiveTab] = useState('cashier');
  const isDark = theme === 'dark';

  return (
    <section id="sandbox" className={`py-24 pt-32 scroll-mt-28 relative border-y transition-colors duration-300 ${
      isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-100/60 border-slate-200'
    }`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold mb-3 shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>INTERACTIVE LIVE DEMO PORTAL</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Test Drive StackPulse Right Now. <br />
            <span className="text-gradient-emerald">No Signup Required!</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Experience role-based access in real-time. Switch between Cashier POS billing, Executive Admin analytics, Multi-Warehouse Stock control, and Dealer Khata.
          </p>
        </div>

        {/* Role Tab Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 pt-2">
          <button
            onClick={() => setActiveTab('cashier')}
            className={`px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'cashier'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 border-emerald-400 shadow-emerald-500/25 scale-105 font-extrabold'
                : isDark 
                  ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <Receipt className="w-4.5 h-4.5" />
            <span>Try Cashier View (PulseBill POS)</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-400 shadow-indigo-500/25 scale-105 font-extrabold'
                : isDark 
                  ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <TrendingUp className="w-4.5 h-4.5" />
            <span>Try Admin Analytics & GSTR Export</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 border-cyan-400 shadow-cyan-500/25 scale-105 font-extrabold'
                : isDark 
                  ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <Boxes className="w-4.5 h-4.5" />
            <span>Try Stock Manager (PulseStock)</span>
          </button>

          <button
            onClick={() => setActiveTab('khata')}
            className={`px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border shadow-lg cursor-pointer ${
              activeTab === 'khata'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-amber-500/25 scale-105 font-extrabold'
                : isDark 
                  ? 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-600 hover:text-white'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:text-slate-900 shadow-sm'
            }`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            <span>Try Dealer Khata & Reminders</span>
          </button>
        </div>

        {/* Sandbox Content Screen */}
        <div className={`relative rounded-3xl p-3 sm:p-5 shadow-2xl border ${
          isDark ? 'glass-panel-ultra border-white/10 glow-emerald-lg' : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          {/* Top Bar inside Portal */}
          <div className={`flex items-center justify-between px-5 py-3.5 rounded-t-2xl border-b text-xs ${
            isDark ? 'bg-[#080C14] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className={`font-mono hidden sm:inline ml-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                tenant_id: <span className="text-emerald-500 font-bold">org_sharma_wholesalers_mumbai</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className={`hidden md:inline-flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <Lock className="w-3.5 h-3.5 text-emerald-500" /> Multi-Tenant MongoDB Security
              </span>
              <button 
                onClick={onOpenTrialModal}
                className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-xl border border-emerald-500/30 hover:bg-emerald-500 hover:text-slate-950 font-extrabold transition-all cursor-pointer"
              >
                Create My Account &rarr;
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
