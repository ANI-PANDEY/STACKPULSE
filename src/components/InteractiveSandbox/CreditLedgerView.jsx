import React, { useState } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Search
} from 'lucide-react';

const DEALERS = [
  { id: 'd1', name: 'Gupta Wholesale Traders', city: 'Mumbai', phone: '9820198201', creditLimit: 500000, currentBalance: 320000, daysOverdue: 12, status: 'OVERDUE' },
  { id: 'd2', name: 'Mahavir Supermarket', city: 'Pune', phone: '9820298202', creditLimit: 300000, currentBalance: 85000, daysOverdue: 0, status: 'GOOD' },
  { id: 'd3', name: 'Apex Retail Distributors', city: 'Thane', phone: '9820398203', creditLimit: 750000, currentBalance: 510000, daysOverdue: 22, status: 'OVERDUE' },
  { id: 'd4', name: 'Shree Ram Provision Stores', city: 'Navi Mumbai', phone: '9820498204', creditLimit: 200000, currentBalance: 40000, daysOverdue: 0, status: 'GOOD' }
];

export default function CreditLedgerView({ theme, onOpenWhatsAppModal }) {
  const [dealersList] = useState(DEALERS);
  const [searchTerm, setSearchTerm] = useState('');
  const isDark = theme === 'dark';

  const handleSendReminder = (dealer) => {
    const reminderData = {
      invNumber: 'KHATA-REMINDER',
      customerName: dealer.name,
      customerPhone: dealer.phone,
      grandTotal: dealer.currentBalance,
      daysOverdue: dealer.daysOverdue,
      isKhataReminder: true
    };
    
    onOpenWhatsAppModal(reminderData);
  };

  const filteredDealers = dealersList.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-4 sm:p-6 rounded-2xl border space-y-6 transition-colors ${
      isDark ? 'bg-[#07070D] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      
      {/* Header Bar */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b gap-4 ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <BookOpen className="w-5 h-5 text-[#FF007F]" />
              B2B Wholesaler Credit Ledger (Khata Book)
            </h3>
            <span className="bg-[#FFE600]/10 text-[#FFE600] text-xs px-2.5 py-0.5 rounded-full font-black border border-[#FFE600]/30 shadow-[0_0_8px_rgba(255,230,0,0.2)]">
              ⚡ WHATSAPP REMINDERS ACTIVE
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Manage Dealer Credit Limits • Automated Payment Due Notifications • Direct Payment Links
          </p>
        </div>

        <div className="w-full md:w-64">
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search dealer or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full border rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-[#FF007F] ${
                isDark ? 'bg-[#0B0B14] border-white/10 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Credit Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0B0B14] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Dealer Outstanding Balance</div>
          <div className="text-2xl font-black text-[#FFE600] font-mono-nums mt-1">₹9,55,000</div>
          <div className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Across 4 Active B2B Accounts</div>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0B0B14] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Overdue Reminders Triggered Today</div>
          <div className="text-2xl font-black text-[#FF007F] font-mono-nums mt-1">100% Sent</div>
          <div className="text-[11px] text-[#FFE600] mt-1 font-semibold">⚡ Via WhatsApp Cloud API</div>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0B0B14] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Avg. Collection Cycle</div>
          <div className={`text-2xl font-black font-mono-nums mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>9 Days</div>
          <div className="text-[11px] text-[#FFE600] mt-1 font-semibold">⚡ 60% faster than manual pen-paper</div>
        </div>
      </div>

      {/* Dealer Accounts Table */}
      <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-white/10 bg-[#080812]' : 'border-slate-200 bg-white'}`}>
        <table className="min-w-[640px] sm:min-w-full w-full text-left text-xs">
          <thead className={`uppercase text-[10px] ${isDark ? 'bg-[#040408] text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
            <tr>
              <th className="p-3">Dealer / Business Name</th>
              <th className="p-3">City</th>
              <th className="p-3">Credit Limit (₹)</th>
              <th className="p-3">Current Balance (₹)</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-white/5 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
            {filteredDealers.map(dealer => (
              <tr key={dealer.id} className={isDark ? 'hover:bg-[#0D0D1A]' : 'hover:bg-slate-50'}>
                <td className="p-3">
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{dealer.name}</div>
                  <div className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Ph: +91 {dealer.phone}</div>
                </td>
                <td className="p-3">{dealer.city}</td>
                <td className="p-3 font-mono">₹{dealer.creditLimit.toLocaleString('en-IN')}</td>
                <td className={`p-3 font-black font-mono-nums text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  ₹{dealer.currentBalance.toLocaleString('en-IN')}
                </td>
                <td className="p-3">
                  {dealer.status === 'OVERDUE' ? (
                    <span className="inline-flex items-center gap-1 bg-[#FF007F]/20 text-[#FF007F] px-2.5 py-1 rounded-full text-[10px] font-black border border-[#FF007F]/40 shadow-[0_0_8px_rgba(255,0,127,0.3)]">
                      <AlertCircle className="w-3 h-3 text-[#FFE600]" /> OVERDUE ({dealer.daysOverdue} days)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-[#FFE600]/15 text-[#FFE600] px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#FFE600]/30">
                      <CheckCircle2 className="w-3 h-3" /> UP TO DATE
                    </span>
                  )}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleSendReminder(dealer)}
                    className="px-3 py-1.5 rounded-lg font-black text-xs bg-gradient-to-r from-[#FF007F] to-[#FF1493] hover:from-[#FF1493] hover:to-[#FF007F] text-white shadow-md shadow-[#FF007F]/30 transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#FFE600] fill-current" />
                    <span>Send WhatsApp Reminder</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
