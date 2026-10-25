import React, { useState } from 'react';
import { 
  TrendingUp, 
  FileSpreadsheet, 
  FileJson, 
  BarChart2, 
  Calendar, 
  CheckCircle2,
  ShieldCheck,
  Users
} from 'lucide-react';

export default function AdminAnalyticsView({ theme, leadsCount, onOpenLeadsModal }) {
  const [selectedMonth] = useState('August 2026');
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const isDark = theme === 'dark';

  const handleExportReport = (type) => {
    const filename = `STACKPULSE_${type}_${selectedMonth.replace(' ', '_')}.${type === 'GSTR-1' ? 'json' : 'csv'}`;
    
    const dataStr = type === 'GSTR-1' 
      ? JSON.stringify({
          gstin: '27AABCU9603R1ZM',
          fp: '082026',
          gross_turnover: 5420000,
          b2b: [
            { chksum: "a1b2c3", inum: "INV-2026-081", idt: "12-08-2026", val: 124500, pos: "27", rchrg: "N", inv_type: "R" },
            { chksum: "x9y8z7", inum: "INV-2026-094", idt: "18-08-2026", val: 89000, pos: "27", rchrg: "N", inv_type: "R" }
          ],
          hsn: { data: [{ hsn_sc: "0902", desc: "Tea", qty: 450, val: 153000, txval: 130000, igst: 0, cgst: 11700, sgst: 11700 }] }
        }, null, 2)
      : `GSTIN,FilingPeriod,TaxableValue,CGST,SGST,IGST,TotalTax\n27AABCU9603R1ZM,082026,4580000,412200,412200,0,824400`;

    const blob = new Blob([dataStr], { type: type === 'GSTR-1' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`Successfully downloaded ${filename}`);
    setTimeout(() => setDownloadSuccess(''), 4000);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-2xl border space-y-6 transition-colors ${
      isDark ? 'bg-[#07070D] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      
      {/* Top Header */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b gap-4 ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <TrendingUp className="w-5 h-5 text-[#FF007F]" />
              Executive Admin Analytics & Lead CRM
            </h3>
            <span className="bg-[#FF007F]/10 text-[#FF007F] text-xs px-2.5 py-0.5 rounded-full font-black border border-[#FF007F]/30 shadow-[0_0_8px_rgba(255,0,127,0.2)]">
              MULTI-TENANT REAL-TIME
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Automated GST Return Exports (GSTR-1 & GSTR-3B) • Captured Visitor Leads CRM</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Admin Captured Leads CRM Trigger Button */}
          <button
            onClick={onOpenLeadsModal}
            className="px-4 py-2 rounded-xl font-black text-xs bg-gradient-to-r from-[#FF007F] to-[#FF1493] text-white shadow-lg shadow-[#FF007F]/30 hover:shadow-[#FF007F]/50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Users className="w-4 h-4 text-[#FFE600]" />
            <span>View Captured Leads CRM ({leadsCount || 3})</span>
          </button>

          <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs ${
            isDark ? 'bg-[#0B0B14] border-white/10 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
          }`}>
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">{selectedMonth}</span>
          </div>
        </div>
      </div>

      {downloadSuccess && (
        <div className="bg-[#FFE600]/15 border border-[#FFE600]/40 text-[#FFE600] text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#FFE600]/20">
          <CheckCircle2 className="w-4 h-4 text-[#FFE600]" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-xl border transition-all ${isDark ? 'bg-[#0B0B14] border-white/5 hover:border-[#FF007F]/40' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-xs font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Monthly Gross Revenue</div>
          <div className={`text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>₹54,20,000</div>
          <div className="text-xs text-[#FFE600] font-bold mt-1">⚡ +18.4% vs last month</div>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${isDark ? 'bg-[#0B0B14] border-white/5 hover:border-[#FF007F]/40' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-xs font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Captured Leads & Demos</div>
          <div className="text-2xl font-black text-[#FF007F] font-mono-nums">{leadsCount || 3} Leads</div>
          <div className="text-xs text-[#FF007F] font-bold mt-1 cursor-pointer hover:underline flex items-center gap-1" onClick={onOpenLeadsModal}>
            <span>Click to chat on WhatsApp</span>
            <span className="text-[#FFE600]">&rarr;</span>
          </div>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${isDark ? 'bg-[#0B0B14] border-white/5 hover:border-[#FF007F]/40' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-xs font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total B2B & B2C Invoices</div>
          <div className={`text-2xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>1,482</div>
          <div className="text-xs text-[#FFE600] font-bold mt-1">⚡ 0 GST Errors Detected</div>
        </div>

        <div className={`p-4 rounded-xl border transition-all ${isDark ? 'bg-[#0B0B14] border-white/5 hover:border-[#FFE600]/40' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-xs font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Active Wholesaler Khata</div>
          <div className="text-2xl font-black text-[#FFE600] font-mono-nums">₹12,40,000</div>
          <div className="text-xs text-amber-400 font-medium mt-1">Pending Dealer Receivables</div>
        </div>
      </div>

      {/* Hourly Sales Visual Chart Simulation */}
      <div className={`p-5 rounded-xl border ${isDark ? 'bg-[#0B0B14] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <BarChart2 className="w-4 h-4 text-[#FF007F]" />
            Today's Hourly Store Sales Trend (INR)
          </h4>
          <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Peak hour: 4:00 PM (<span className="text-[#FFE600] font-bold font-mono">₹38,200</span>)
          </span>
        </div>

        <div className={`h-32 flex items-end gap-2 sm:gap-4 pt-4 px-2 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          {[
            { hour: '9 AM', val: 20 },
            { hour: '11 AM', val: 45 },
            { hour: '1 PM', val: 65 },
            { hour: '3 PM', val: 85 },
            { hour: '4 PM', val: 100 },
            { hour: '6 PM', val: 75 },
            { hour: '8 PM', val: 50 },
            { hour: '9 PM', val: 30 }
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="text-[10px] text-[#FFE600] opacity-0 group-hover:opacity-100 font-mono transition-opacity">
                {bar.val * 382}
              </div>
              <div 
                className="w-full bg-gradient-to-t from-[#FF007F] via-[#FF1493] to-[#FFE600] rounded-t group-hover:from-[#FF1493] group-hover:to-[#FFF01F] transition-all shadow-md shadow-[#FF007F]/20"
                style={{ height: `${bar.val}%` }}
              />
              <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{bar.hour}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GST Return-Ready Reports Export Section */}
      <div className={`p-5 rounded-xl border ${
        isDark ? 'bg-[#0B0B14] border-[#FF007F]/30 shadow-[0_0_20px_rgba(255,0,127,0.15)]' : 'bg-gradient-to-r from-slate-100 via-pink-50 to-slate-100 border-pink-200'
      }`}>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className={`text-sm font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <ShieldCheck className="w-5 h-5 text-[#FFE600]" />
              1-Click GST Return Auto-Export Hub (Government Standard Format)
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Generate 100% compliant GSTR-1 JSON and GSTR-3B CSV ready for CA / Tax Portal Upload.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExportReport('GSTR-1')}
              className="px-4 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-[#FF007F] to-[#FF1493] hover:from-[#FF1493] hover:to-[#FF007F] text-white shadow-lg shadow-[#FF007F]/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FileJson className="w-4 h-4 text-[#FFE600]" />
              <span>Export GSTR-1 (JSON)</span>
            </button>

            <button
              onClick={() => handleExportReport('GSTR-3B')}
              className="px-4 py-2.5 rounded-xl font-black text-xs bg-gradient-to-r from-[#FFE600] to-[#FFB703] hover:from-[#FFF01F] hover:to-[#FFE600] text-slate-950 shadow-lg shadow-[#FFE600]/30 transition-all flex items-center gap-2 border border-[#FFE600]/50 cursor-pointer active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-950" />
              <span>Export GSTR-3B (CSV)</span>
            </button>
          </div>
        </div>

        {/* GST Filing Summary Preview Table */}
        <div className={`overflow-x-auto rounded-lg border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <table className="w-full text-left text-xs">
            <thead className={`uppercase text-[10px] ${isDark ? 'bg-[#05050A] text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
              <tr>
                <th className="p-3">GST Table Type</th>
                <th className="p-3">Invoice Count</th>
                <th className="p-3">Taxable Value (₹)</th>
                <th className="p-3">CGST (₹)</th>
                <th className="p-3">SGST (₹)</th>
                <th className="p-3">IGST (₹)</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/5 bg-[#080810]/70 text-slate-300' : 'divide-slate-200 bg-white text-slate-700'}`}>
              <tr>
                <td className={`p-3 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>4A, 4B - B2B Registered Sales</td>
                <td className="p-3 font-mono">342</td>
                <td className="p-3 font-mono">32,40,000</td>
                <td className="p-3 font-mono text-[#FFE600]">2,91,600</td>
                <td className="p-3 font-mono text-[#FFE600]">2,91,600</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3"><span className="text-[10px] bg-[#FFE600]/15 text-[#FFE600] px-2 py-0.5 rounded border border-[#FFE600]/30 font-black">RECONCILED</span></td>
              </tr>
              <tr>
                <td className={`p-3 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>5A, 5B - B2C Large Interstate Sales</td>
                <td className="p-3 font-mono">118</td>
                <td className="p-3 font-mono">13,40,000</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3 font-mono text-[#FF007F]">2,41,200</td>
                <td className="p-3"><span className="text-[10px] bg-[#FFE600]/15 text-[#FFE600] px-2 py-0.5 rounded border border-[#FFE600]/30 font-black">RECONCILED</span></td>
              </tr>
              <tr>
                <td className={`p-3 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>12 - HSN/SAC Summary</td>
                <td className="p-3 font-mono">1,482</td>
                <td className="p-3 font-mono">45,80,000</td>
                <td className="p-3 font-mono text-[#FFE600]">4,12,200</td>
                <td className="p-3 font-mono text-[#FFE600]">4,12,200</td>
                <td className="p-3 font-mono text-[#FF007F]">2,41,200</td>
                <td className="p-3"><span className="text-[10px] bg-[#FF007F]/20 text-[#FF007F] px-2 py-0.5 rounded border border-[#FF007F]/30 font-black">READY TO FILE</span></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
