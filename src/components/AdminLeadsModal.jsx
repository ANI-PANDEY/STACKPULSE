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
  Search,
  Settings,
  MapPin,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Copy,
  Check,
  Send,
  ExternalLink,
  Layers,
  Laptop
} from 'lucide-react';
import { 
  TARGET_EMAIL, 
  getStoredWeb3FormsKey, 
  setStoredWeb3FormsKey, 
  getStoredWebhookUrl, 
  setStoredWebhookUrl,
  sendLeadNotification,
  formatLeadSummaryText
} from '../services/leadNotificationService';

export default function AdminLeadsModal({ leads = [], onClose, onResendLead }) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [resendingId, setResendingId] = useState(null);
  const [resendStatus, setResendStatus] = useState({});

  // Notification Settings Drawer State
  const [showSettings, setShowSettings] = useState(false);
  const [web3Key, setWeb3Key] = useState(getStoredWeb3FormsKey());
  const [webhookUrl, setWebhookUrl] = useState(getStoredWebhookUrl());
  const [saveToast, setSaveToast] = useState(false);
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const filteredLeads = leads.filter(lead => {
    const matchesType = filterType === 'ALL' || lead.type === filterType;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      lead.name?.toLowerCase().includes(term) ||
      lead.phone?.includes(term) ||
      lead.businessName?.toLowerCase().includes(term) ||
      lead.city?.toLowerCase().includes(term);
    return matchesType && matchesSearch;
  });

  const handleExportCSV = () => {
    let csvContent = "ID,Type,Name,Phone,Email,BusinessName,City,BusinessType,Counters,CurrentSoftware,Details,Notes,Timestamp\n";
    leads.forEach(l => {
      const details = l.type === 'DEMO_BOOKING' 
        ? `Demo on ${l.preferredDate || 'N/A'} at ${l.preferredTime || 'N/A'}` 
        : l.type === 'PAID_SUBSCRIPTION' 
          ? `Plan: ${l.plan || 'SaaS'}` 
          : '14-Day Free Trial';

      csvContent += `"${l.id}","${l.type}","${l.name || ''}","${l.phone || ''}","${l.email || ''}","${l.businessName || ''}","${l.city || ''}","${l.businessType || ''}","${l.counters || ''}","${l.currentSoftware || ''}","${details}","${(l.notes || l.message || '').replace(/"/g, '""')}","${l.timestamp}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `STACKPULSE_Leads_CRM_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openWhatsAppChat = (lead) => {
    const cleanPhone = lead.phone ? lead.phone.replace(/\D/g, '') : '';
    const customerName = lead.name || 'Sir';
    const message = encodeURIComponent(
      `Hello ${customerName}! Thank you for your interest in STACKPULSE B2B SaaS (${lead.businessName || 'Business'}). How can we assist you with your demo / trial setup?`
    );
    window.open(`https://wa.me/91${cleanPhone}?text=${message}`, '_blank');
  };

  const copyLeadSummary = (lead) => {
    const text = formatLeadSummaryText(lead);
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResend = async (lead) => {
    setResendingId(lead.id);
    try {
      const res = onResendLead ? await onResendLead(lead) : await sendLeadNotification(lead);
      if (res && res.success) {
        setResendStatus(prev => ({ ...prev, [lead.id]: { ok: true, msg: 'Email Dispatched!' } }));
      } else {
        setResendStatus(prev => ({ ...prev, [lead.id]: { ok: false, msg: 'Provider offline. Check Settings.' } }));
      }
    } catch (err) {
      setResendStatus(prev => ({ ...prev, [lead.id]: { ok: false, msg: err.message } }));
    } finally {
      setResendingId(null);
      setTimeout(() => {
        setResendStatus(prev => {
          const next = { ...prev };
          delete next[lead.id];
          return next;
        });
      }, 4000);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setStoredWeb3FormsKey(web3Key);
    setStoredWebhookUrl(webhookUrl);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSendTestEmail = async () => {
    setTestSending(true);
    setTestResult(null);

    // Save active inputs first
    setStoredWeb3FormsKey(web3Key);
    setStoredWebhookUrl(webhookUrl);

    try {
      const testLead = {
        id: `test-${Date.now().toString().slice(-4)}`,
        type: 'DEMO_BOOKING',
        name: 'Test Customer (Verification Lead)',
        phone: '9876543210',
        email: 'test@example.com',
        businessName: 'StackPulse Test Mart',
        city: 'Patna, Bihar',
        businessType: 'Supermarket / Retail Store',
        counters: '2 Counters',
        currentSoftware: 'Manual / Excel',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTime: '11:00 AM',
        notes: 'Testing live email notification dispatch from StackPulse CRM desk.',
        timestamp: new Date().toISOString()
      };

      const res = await sendLeadNotification(testLead);
      if (res && res.success) {
        setTestResult({
          ok: true,
          msg: `Success! Test alert dispatched via ${res.channel || 'Provider'}. Please check ${TARGET_EMAIL}.`
        });
      } else {
        setTestResult({
          ok: false,
          msg: `Could not reach email provider. Please enter a free Web3Forms Access Key below to enable instant delivery.`
        });
      }
    } catch (err) {
      setTestResult({ ok: false, msg: `Error: ${err.message}` });
    } finally {
      setTestSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#07070D] border border-white/10 rounded-2xl sm:rounded-3xl max-w-5xl w-full p-4 sm:p-7 shadow-[0_0_60px_rgba(255,0,127,0.25)] relative max-h-[92vh] flex flex-col justify-between text-white overflow-hidden">
        
        {/* Ambient glow */}
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
                  <span>Captured Leads & Demo Desk</span>
                  <span className="text-[10px] sm:text-xs bg-[#FFE600]/15 text-[#FFE600] font-mono font-black px-2 py-0.5 rounded-full border border-[#FFE600]/30 shadow-[0_0_10px_rgba(255,230,0,0.2)]">
                    ⚡ LIVE ({leads.length})
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Real-time database of visitors who booked a Demo, Trial, or Plan. Instant email configured to <span className="text-white font-bold">{TARGET_EMAIL}</span>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                  showSettings
                    ? 'bg-[#FF007F] text-white border-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.4)]'
                    : 'bg-[#0B0B14] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                }`}
                title="Email Delivery Settings"
              >
                <Settings className={`w-4 h-4 ${showSettings ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Email Settings</span>
              </button>

              <button 
                onClick={onClose}
                className="p-2 rounded-xl border border-white/10 bg-[#0B0B14] text-slate-400 hover:text-white hover:border-[#FF007F]/40 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Collapsible Notification Settings Drawer */}
          {showSettings && (
            <div className="my-3 p-4 bg-[#0A0D18] border border-emerald-500/30 rounded-2xl space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <Mail className="w-4 h-4" />
                  <span>Email Notification Delivery Gateway</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Target: {TARGET_EMAIL}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                StackPulse sends complete customer leads to <span className="text-emerald-400 font-semibold">{TARGET_EMAIL}</span>. For 100% guaranteed delivery, enter a free <span className="text-white font-bold">Web3Forms Access Key</span> (free 250 leads/mo, 10s setup, zero ads):
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Web3Forms Access Key (Recommended for 100% Delivery)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 524e93fb-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                      value={web3Key}
                      onChange={(e) => setWeb3Key(e.target.value)}
                      className="w-full bg-[#05070E] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Custom Webhook / Google Script URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://script.google.com/macros/s/.../exec"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full bg-[#05070E] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-5 flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl transition-all shadow-md cursor-pointer shrink-0"
                  >
                    Save Key
                  </button>

                  <button
                    type="button"
                    disabled={testSending}
                    onClick={handleSendTestEmail}
                    className="px-4 py-2 bg-[#FF007F] hover:bg-[#FF1493] text-white text-xs font-black rounded-xl transition-all shadow-[0_0_12px_rgba(255,0,127,0.3)] flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    {testSending ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Test Email</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Status Toast / Help Guide */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px]">
                <a
                  href="https://web3forms.com/#start"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold underline"
                >
                  <span>👉 Get Free Web3Forms Key (Type aniketraj1707@gmail.com on web3forms.com)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {saveToast && (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Settings saved successfully!
                  </span>
                )}
              </div>

              {testResult && (
                <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${
                  testResult.ok 
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' 
                    : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                }`}>
                  {testResult.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
                  <span>{testResult.msg}</span>
                </div>
              )}
            </div>
          )}

          {/* Filter & Action Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-3">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              {[
                { id: 'ALL', label: `All Inquiries (${leads.length})` },
                { id: 'DEMO_BOOKING', label: 'Live Demos' },
                { id: 'FREE_TRIAL', label: '14-Day Trials' },
                { id: 'CONTACT_INQUIRY', label: 'Direct Messages' },
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
                  placeholder="Search name, phone, city..."
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
        <div className="overflow-y-auto my-2 space-y-3 pr-1 max-h-[460px] relative z-10">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 text-xs text-slate-500 font-mono">
              No inquiries found under this filter.
            </div>
          ) : (
            filteredLeads.map(lead => {
              const resStatus = resendStatus[lead.id];
              const isResending = resendingId === lead.id;

              return (
                <div 
                  key={lead.id}
                  className="p-4 rounded-2xl border border-white/10 bg-[#050508] hover:border-[#FF007F]/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-sm"
                >
                  
                  {/* Lead Details Left */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-sm text-white">
                        {lead.name || 'Valued Customer'}
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

                      {lead.type === 'CONTACT_INQUIRY' && (
                        <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                          ✉️ DIRECT INQUIRY
                        </span>
                      )}

                      {lead.type === 'PAID_SUBSCRIPTION' && (
                        <span className="bg-gradient-to-r from-[#FF007F] to-[#FFE600] text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded shadow-[0_0_10px_rgba(255,0,127,0.3)]">
                          ★ PAID PLAN ({lead.plan})
                        </span>
                      )}

                      {/* Email Status Indicator */}
                      {lead.emailStatus === 'SENT' && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Email Dispatched
                        </span>
                      )}
                    </div>

                    {/* Metadata Strip: Store, City, Phone, Email */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                      {lead.businessName && (
                        <div className="flex items-center gap-1 font-semibold text-white">
                          <Building2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                          <span>{lead.businessName}</span>
                        </div>
                      )}

                      {lead.city && (
                        <div className="flex items-center gap-1 text-red-300">
                          <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>{lead.city}</span>
                        </div>
                      )}

                      {lead.phone && (
                        <a 
                          href={`tel:+91${lead.phone.replace(/\D/g, '')}`}
                          className="flex items-center gap-1 font-mono text-[#FFE600] hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 shrink-0" />
                          <span>+91 {lead.phone}</span>
                        </a>
                      )}

                      {lead.email && (
                        <a 
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 font-mono text-slate-300 hover:text-white hover:underline"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#FF007F] shrink-0" />
                          <span>{lead.email}</span>
                        </a>
                      )}
                    </div>

                    {/* Operational Details: Counters, Category, Current System */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-slate-400">
                      {lead.businessType && (
                        <span className="bg-[#0E1222] px-2 py-0.5 rounded border border-white/5 text-slate-300">
                          {lead.businessType}
                        </span>
                      )}

                      {lead.counters && (
                        <span className="bg-[#0E1222] px-2 py-0.5 rounded border border-white/5 text-emerald-300 flex items-center gap-1">
                          <Layers className="w-3 h-3" /> {lead.counters}
                        </span>
                      )}

                      {lead.currentSoftware && (
                        <span className="bg-[#0E1222] px-2 py-0.5 rounded border border-white/5 text-slate-300 flex items-center gap-1">
                          <Laptop className="w-3 h-3 text-slate-500" /> {lead.currentSoftware}
                        </span>
                      )}

                      {lead.accountId && (
                        <span className="bg-[#0E1222] px-2 py-0.5 rounded border border-white/5 text-emerald-400 font-mono">
                          ID: {lead.accountId}
                        </span>
                      )}
                    </div>

                    {/* Slot / Date */}
                    {lead.type === 'DEMO_BOOKING' && (
                      <div className="text-[11px] text-[#FFE600] font-semibold flex items-center gap-1.5 mt-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Demo Slot: {lead.preferredDate} at {lead.preferredTime} IST</span>
                      </div>
                    )}

                    {/* Notes / Message */}
                    {(lead.notes || lead.message) && (
                      <div className="text-[11px] text-slate-300 bg-[#0C101C] p-2 rounded-xl border border-white/5 mt-1 leading-relaxed">
                        <span className="text-slate-500 font-bold">Requirement Note: </span>
                        {lead.notes || lead.message}
                      </div>
                    )}
                  </div>

                  {/* Lead Action Buttons Right */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0 self-end lg:self-center">
                    {/* Resend Email Button */}
                    <button
                      onClick={() => handleResend(lead)}
                      disabled={isResending}
                      title="Dispatch / Resend email notification"
                      className="p-2 bg-[#0B0B14] hover:bg-[#141424] text-slate-300 hover:text-white border border-white/10 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin text-[#FF007F]' : ''}`} />
                      <span className="text-[11px]">Resend Email</span>
                    </button>

                    {/* Copy Summary */}
                    <button
                      onClick={() => copyLeadSummary(lead)}
                      title="Copy full lead text to clipboard"
                      className="p-2 bg-[#0B0B14] hover:bg-[#141424] text-slate-300 hover:text-white border border-white/10 rounded-xl text-xs flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {copiedId === lead.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {/* WhatsApp Chat Button */}
                    <button
                      onClick={() => openWhatsAppChat(lead)}
                      className="px-3.5 py-2 bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:from-[#20BA59] hover:to-[#1AA34E] text-slate-950 font-black text-xs rounded-xl shadow-[0_0_15px_rgba(37,211,102,0.3)] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                      <span>Chat on WhatsApp</span>
                    </button>
                  </div>

                  {/* Resend Feedback Toast */}
                  {resStatus && (
                    <div className={`w-full text-right text-[11px] font-bold ${resStatus.ok ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {resStatus.msg}
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs relative z-10">
          <span className="text-slate-400 text-[11px] font-mono text-center sm:text-left">
            ⚡ All leads stored safely in browser database & dispatchable via email & WhatsApp.
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
