import React, { useState } from 'react';
import { 
  X, 
  Users, 
  MessageSquare, 
  Download, 
  CheckCircle2, 
  Calendar, 
  Phone, 
  Mail, 
  Building2, 
  Sparkles,
  CreditCard,
  Search,
  Filter
} from 'lucide-react';

export default function AdminLeadsModal({ theme, leads, onClose, onClearLeads }) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const isDark = theme === 'dark';

  const filteredLeads = leads.filter(lead => {
    const matchesType = filterType === 'ALL' || lead.type === filterType;
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.businessName?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleExportCSV = () => {
    let csvContent = "ID,Type,Name,Phone,Email,BusinessName,BusinessType,Details,Timestamp\n";
    leads.forEach(l => {
      const details = l.type === 'DEMO_BOOKING' 
        ? `Demo on ${l.preferredDate} at ${l.preferredTime}` 
        : l.type === 'PAID_SUBSCRIPTION' 
          ? `Plan: ${l.plan}` 
          : '14-Day Trial';

      csvContent += `"${l.id}","${l.type}","${l.name || ''}","${l.phone || ''}","${l.email || ''}","${l.businessName || ''}","${l.businessType || ''}","${details}","${l.timestamp}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `STACKPULSE_Inquiries_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openWhatsAppChat = (lead) => {
    const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, '') : '9876543210';
    const message = encodeURIComponent(
      `Hello ${lead.name || 'Sir'}! Thank you for showing interest in STACKPULSE B2B SaaS (${lead.businessName || 'Business'}). How can we assist you with your demo / trial setup?`
    );
    window.open(`https://wa.me/91${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`border rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col justify-between ${
        isDark ? 'bg-[#0B0F17] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Modal Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black flex items-center gap-2">
                  <span>Captured Customer Inquiries & Leads Desk</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-500 font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    LIVE BACKEND RECORD ({leads.length})
                  </span>
                </h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Real-time database of visitors who requested a Live Demo, 14-Day Free Trial, or Paid Subscription.
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter & Action Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-4">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              {[
                { id: 'ALL', label: `All Inquiries (${leads.length})` },
                { id: 'DEMO_BOOKING', label: 'Live Demos' },
                { id: 'FREE_TRIAL', label: '14-Day Trials' },
                { id: 'PAID_SUBSCRIPTION', label: 'Subscriptions' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                    filterType === f.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Actions: Search & Export CSV */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="relative flex-1 sm:w-48">
                <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                <input 
                  type="text"
                  placeholder="Search lead..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

          </div>
        </div>

        {/* Lead Items Scrollable Container */}
        <div className="overflow-y-auto my-2 space-y-3 pr-1 max-h-[450px]">
          {filteredLeads.length === 0 ? (
            <div className={`text-center py-12 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              No inquiries found under this filter.
            </div>
          ) : (
            filteredLeads.map(lead => (
              <div 
                key={lead.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm ${
                  isDark ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                
                {/* Lead Details Left */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-black text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lead.name || lead.businessName || 'Anonymous Visitor'}
                    </span>
                    
                    {lead.type === 'DEMO_BOOKING' && (
                      <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-extrabold px-2 py-0.5 rounded border border-indigo-500/30">
                        10-MIN DEMO
                      </span>
                    )}

                    {lead.type === 'FREE_TRIAL' && (
                      <span className="bg-emerald-500/20 text-emerald-500 text-[10px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
                        14-DAY TRIAL
                      </span>
                    )}

                    {lead.type === 'PAID_SUBSCRIPTION' && (
                      <span className="bg-amber-500/20 text-amber-500 text-[10px] font-extrabold px-2 py-0.5 rounded border border-amber-500/30">
                        PAID PLAN ({lead.plan})
                      </span>
                    )}
                  </div>

                  <div className={`flex flex-wrap items-center gap-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {lead.phone && (
                      <div className="flex items-center gap-1 font-mono">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <span>+91 {lead.phone}</span>
                      </div>
                    )}

                    {lead.email && (
                      <div className="flex items-center gap-1 font-mono">
                        <Mail className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{lead.email}</span>
                      </div>
                    )}

                    {lead.businessName && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{lead.businessName}</span>
                      </div>
                    )}
                  </div>

                  {lead.type === 'DEMO_BOOKING' && (
                    <div className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1.5 mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Slot Requested: {lead.preferredDate} at {lead.preferredTime} ({lead.businessType})</span>
                    </div>
                  )}
                </div>

                {/* Lead Action Buttons Right */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openWhatsAppChat(lead)}
                    className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>
            ⚡ Inquiries automatically save to browser database in real-time.
          </span>

          <button
            onClick={onClose}
            className={`px-4 py-2 font-bold rounded-xl ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            Close Desk
          </button>
        </div>

      </div>
    </div>
  );
}
