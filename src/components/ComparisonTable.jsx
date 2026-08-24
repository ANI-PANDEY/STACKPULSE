import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

const COMPARISON_ROWS = [
  { feature: 'Sub-Second Barcode POS Billing', stackpulse: true, legacy: 'Slow / Manual', paper: false },
  { feature: 'Instant WhatsApp Invoice Delivery', stackpulse: true, legacy: false, paper: false },
  { feature: 'Automated GSTR-1 & GSTR-3B Exports', stackpulse: true, legacy: 'Partial / Hard', paper: false },
  { feature: 'Multi-Warehouse Real-Time Stock Sync', stackpulse: true, legacy: false, paper: false },
  { feature: 'Batch & Expiry Date Alert Tracking', stackpulse: true, legacy: 'Manual Input', paper: false },
  { feature: 'Dealer Khata & 1-Click WhatsApp Reminders', stackpulse: true, legacy: false, paper: 'Manual Pen' },
  { feature: 'Multi-Tenant Cloud Auto-Backup (Zero Data Loss)', stackpulse: true, legacy: 'Local Harddrive Risk', paper: false },
  { feature: 'Role-Based Staff Access (Admin vs Cashier)', stackpulse: true, legacy: 'Basic', paper: false },
  { feature: 'Mobile App & Tablet Access Anywhere', stackpulse: true, legacy: false, paper: false }
];

export default function ComparisonTable({ theme }) {
  const isDark = theme === 'dark';

  return (
    <section id="comparison" className={`py-24 scroll-mt-28 relative border-t transition-colors duration-300 ${
      isDark ? 'bg-[#030712] border-slate-800/80' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold mb-3 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>THE SMART CHOICE FOR INDIAN B2B</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Why 2,500+ Indian Businesses Switched <br />
            <span className="text-gradient-emerald">From Offline Desktop Software To StackPulse</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Compare StackPulse Cloud SaaS against legacy desktop tools and manual paper registers.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className={`overflow-x-auto rounded-3xl border shadow-2xl ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className={`uppercase text-[10px] sm:text-xs ${
              isDark ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-600'
            }`}>
              <tr>
                <th className="p-4 sm:p-6 w-2/5">Capabilities & Features</th>
                <th className="p-4 sm:p-6 w-1/5 text-center bg-emerald-500/10 border-x border-emerald-500/30 text-emerald-500 font-extrabold text-sm sm:text-base">
                  ⚡ STACKPULSE (Cloud SaaS)
                </th>
                <th className="p-4 sm:p-6 w-1/5 text-center text-slate-400">Legacy Desktop Software</th>
                <th className="p-4 sm:p-6 w-1/5 text-center text-slate-400">Manual Paper Khata</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                  <td className={`p-4 sm:p-5 font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {row.feature}
                  </td>
                  
                  {/* StackPulse Column */}
                  <td className="p-4 sm:p-5 text-center bg-emerald-500/5 border-x border-emerald-500/20 font-bold text-emerald-500">
                    <div className="flex items-center justify-center gap-1">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/40">
                        <Check className="w-4 h-4" />
                      </span>
                    </div>
                  </td>

                  {/* Legacy Software Column */}
                  <td className="p-4 sm:p-5 text-center font-medium text-slate-400">
                    {typeof row.legacy === 'boolean' ? (
                      row.legacy ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-rose-500/80 mx-auto" />
                    ) : (
                      <span className="text-xs text-amber-500 font-mono font-bold">{row.legacy}</span>
                    )}
                  </td>

                  {/* Paper Khata Column */}
                  <td className="p-4 sm:p-5 text-center text-slate-400">
                    {typeof row.paper === 'boolean' ? (
                      row.paper ? <Check className="w-4 h-4 text-slate-400 mx-auto" /> : <X className="w-4 h-4 text-rose-500/80 mx-auto" />
                    ) : (
                      <span className="text-xs text-rose-500 font-mono font-bold">{row.paper}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
