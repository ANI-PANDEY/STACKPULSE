import React, { useState } from 'react';
import { 
  X, 
  Users, 
  MessageSquare, 
  Download, 
  Calendar, 
  Phone, 
  Mail, 
  Building2, 
  Search
} from 'lucide-react';

export default function AdminLeadsModal({ leads, onClose }) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="fixed inset-0 z-50 bg-[#000000]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#07070D] border border-white/10 rounded-2xl sm:rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-[0_0_60px_rgba(255,0,127,0.25)] relative max-h-[92vh] flex flex-col justify-between text-white overflow-hidden">
        
        {/* Subtle ambient glow */}
        <div className="absolute top-0 right-1/4 w-72 h-16 bg-[#FF007F]/15 blur-3xl pointer-events-none" />

        {/* Modal Top Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF007F]/15 text-[#FF007F] flex items-center justify-center border border-[#FF007F]/30 shadow-[0_0_15px_rgba(255,0,127,0.25)] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-xl font-black flex flex-wrap items-center gap-2">
                  <span>Captured Leads CRM</span>
                  <span className="text-[10px] sm:text-xs bg-[#FFE600]/15 text-[#FFE600] font-mono font-black px-2 py-0.5 rounded-full border border-[#FFE600]/30 shadow-[0_0_10px_rgba(255,230,0,0.2)]">
                    ⚡ LIVE ({leads.length})
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Real-time database of visitors who requested a Demo, Trial, or Plan.
                </p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-2 rounded-xl border border-white/10 bg-[#0B0B14] text-slate-400 hover:text-white hover:border-[#FF007F]/40 transition-colors"
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all border whitespace-nowrap cursor-pointer ${
                    filterType === f.id
                      ? 'bg-gradient-to-r from-[#FF007F] to-[#FF2E93] text-white border-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.35)]'
                      : 'bg-[#0B0B14] border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Actions: Search & Export CSV */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                <input 
                  type="text"
                  placeholder="Search lead..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-white/10 bg-[#0B0B14] text-white placeholder-slate-500 focus:outline-none focus:border-[#FF007F]"
                />
              </div>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 bg-[#FFE600] hover:bg-[#FFF01F] text-slate-950 text-xs font-black rounded-xl shadow-[0_0_15px_rgba(255,230,0,0.3)] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Export CSV</span>
              </button>
            </div>

          </div>
        </div>

        {/* Lead Items Scrollable Container */}
        <div className="overflow-y-auto my-2 space-y-3 pr-1 max-h-[450px] relative z-10">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-500 font-mono">
              No inquiries found under this filter.
            </div>
          ) : (
            filteredLeads.map(lead => (
              <div 
                key={lead.id}
                className="p-4 rounded-2xl border border-white/10 bg-[#050508] hover:border-[#FF007F]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm"
              >
                
                {/* Lead Details Left */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-white">
                      {lead.name || lead.businessName || 'Anonymous Visitor'}
                    </span>
                    
                    {lead.type === 'DEMO_BOOKING' && (
                      <span className="bg-[#FF007F]/15 text-[#FF2E93] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#FF007F]/30">
                        10-MIN DEMO
                      </span>
                    )}

                    {lead.type === 'FREE_TRIAL' && (
                      <span className="bg-[#FFE600]/15 text-[#FFE600] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#FFE600]/30">
                        ⚡ 14-DAY TRIAL
                      </span>
                    )}

                    {lead.type === 'PAID_SUBSCRIPTION' && (
                      <span className="bg-gradient-to-r from-[#FF007F] to-[#FFE600] text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded shadow-[0_0_10px_rgba(255,0,127,0.3)]">
                        ★ PAID PLAN ({lead.plan})
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    {lead.phone && (
                      <div className="flex items-center gap-1 font-mono text-[#FFE600]">
                        <Phone className="w-3.5 h-3.5" />
                        <span>+91 {lead.phone}</span>
                      </div>
                    )}

                    {lead.email && (
                      <div className="flex items-center gap-1 font-mono text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-[#FF007F]" />
                        <span>{lead.email}</span>
                      </div>
                    )}

                    {lead.businessName && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-pink-400" />
                        <span>{lead.businessName}</span>
                      </div>
                    )}
                  </div>

                  {lead.type === 'DEMO_BOOKING' && (
                    <div className="text-[11px] text-[#FFE600] font-semibold flex items-center gap-1.5 mt-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Slot Requested: {lead.preferredDate} at {lead.preferredTime} ({lead.businessType})</span>
                    </div>
                  )}
                </div>

                {/* Lead Action Buttons Right */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openWhatsAppChat(lead)}
                    className="px-3.5 py-2 bg-gradient-to-r from-[#FF007F] via-[#FF1493] to-[#FF2E93] hover:from-[#FF1493] hover:to-[#FF3399] text-white font-black text-xs rounded-xl shadow-[0_0_15px_rgba(255,0,127,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
          <span className="text-slate-500 font-mono">
            ⚡ Inquiries automatically save to browser database in real-time.
          </span>

          <button
            onClick={onClose}
            className="px-4 py-2 font-black rounded-xl bg-[#0B0B14] hover:bg-[#141424] text-slate-300 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            Close Desk
          </button>
        </div>

      </div>
    </div>
  );
}
