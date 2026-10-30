import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Zap, Building2, MapPin, User, MessageSquare, AlertCircle, Mail, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OWNER_WHATSAPP, TARGET_EMAIL } from '../services/leadNotificationService';

export default function FreeTrialModal({ onClose, onAddLead, onLaunchSandbox }) {
  const [formData, setFormData] = useState({
    name: '',
    storeName: '',
    phone: '',
    email: '',
    city: '',
    businessType: 'Supermarket / Retail Store',
    counters: '1-2 Counters',
    notes: ''
  });
  const [randomSuffix] = useState(() => Math.floor(1000 + Math.random() * 9000).toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState(null);

  const cleanStoreSlug = formData.storeName ? formData.storeName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 12) : 'store';
  const tenantId = `tenant_${cleanStoreSlug}_${randomSuffix}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorFeedback(null);

    const payload = {
      type: 'FREE_TRIAL',
      name: formData.name.trim(),
      businessName: formData.storeName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      businessType: formData.businessType,
      counters: formData.counters,
      notes: formData.notes.trim(),
      accountId: tenantId
    };

    try {
      if (onAddLead) {
        const res = await onAddLead(payload);
        if (res && res.success === false) {
          setErrorFeedback(res);
        } else {
          setIsSuccess(true);
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      console.error('Free trial submission error:', err);
      setErrorFeedback({ error: err.message || 'Submission failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFounderWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Hello Aniket! I have requested a 14-Day Free Trial for my store "${formData.storeName}" (${formData.city || 'India'}). My name is ${formData.name} (Phone: ${formData.phone}). Could you assist with my onboarding?`
    );
    return `https://wa.me/91${OWNER_WHATSAPP}?text=${msg}`;
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`🔥 New 14-Day Free Trial (Plug & Play): ${formData.name} (${formData.storeName || 'Store'})`);
    const body = encodeURIComponent(
      `Request Type: 14-Day Free Trial\nCustomer Name: ${formData.name}\nStore: ${formData.storeName}\nCity: ${formData.city}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAccount ID: ${tenantId}\nNotes: ${formData.notes || 'None'}`
    );
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#070A12] border border-red-500/40 rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-[0_20px_60px_rgba(239,68,68,0.25)] relative max-h-[92vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-[#0F1422] border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center space-x-3 mb-4 pr-8">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)] shrink-0">
                <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">Start 14-Day Free Trial (Plug & Play)</h3>
                <p className="text-[11px] sm:text-xs text-slate-400">Full Pro Access • No Credit Card • Zero Installation Required</p>
              </div>
            </div>

            {/* Error Alert Banner if submission failed */}
            {errorFeedback && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Network Relay Notice: Email server temporarily unreachable</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Your trial account details were saved locally. You can activate directly via WhatsApp or Email below:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={getFounderWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#25D366] text-slate-950 font-black rounded-lg text-[11px] flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Send on WhatsApp</span>
                  </a>
                  <a
                    href={getMailtoUrl()}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-[11px] flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setErrorFeedback(null)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-[11px] flex items-center gap-1"
                  >
                    <RotateCw className="w-3 h-3" />
                    <span>Try Again</span>
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Owner Name & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-red-400" /> Owner / Manager Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amit Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">WhatsApp Mobile Number <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9820198201"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono mt-1 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Store Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Store / Business Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Om Sai Supermarket"
                    value={formData.storeName}
                    onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> City & State <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patna, Bihar"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Business Email */}
              <div>
                <label className="text-xs font-bold text-slate-300">Business Email Address <span className="text-red-400">*</span></label>
                <input
                  type="email"
                  required
                  placeholder="e.g. owner@business.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Business Category & Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">Store Category</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                  >
                    <option value="Supermarket / Retail Store">Supermarket / Retail Mart</option>
                    <option value="Wholesaler / FMCG">Wholesaler / FMCG</option>
                    <option value="Distributor / C&F Agent">Distributor / C&F Agent</option>
                    <option value="Pharmacy / Healthcare Store">Pharmacy / Healthcare Store</option>
                    <option value="Hardware / Electrical Dealer">Hardware / Electrical Dealer</option>
                    <option value="Textile / Clothing Store">Textile / Clothing Store</option>
                    <option value="Restaurant / Cafe / Food">Restaurant / Cafe / Food</option>
                    <option value="Other Business Type">Other Business Type</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Daily Volume / Counters</label>
                  <select
                    value={formData.counters}
                    onChange={(e) => setFormData({ ...formData, counters: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                  >
                    <option value="1 Counter (< 100 bills/day)">1 Counter (&lt; 100 bills/day)</option>
                    <option value="2-3 Counters (100-500 bills/day)">2-3 Counters (100-500 bills/day)</option>
                    <option value="4+ Counters (500+ bills/day)">4+ Counters (500+ bills/day)</option>
                    <option value="Warehouse / B2B Dispatch">Warehouse / B2B Dispatch</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-300">Software Needs or Questions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Need thermal printer setup & WhatsApp bills"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Instant Provisioning Badge */}
              <div className="bg-[#05070E] p-3 rounded-xl border border-white/5 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant Account Provisioning
                </div>
                <div>✓ Multi-Tenant ID: <span className="font-mono text-emerald-400 font-bold">{tenantId}</span></div>
                <div>✓ Barcode POS + WhatsApp Billing + GSTR Tax Exports Included</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Provisioning Account & Sending Alert...
                  </span>
                ) : (
                  <span>Activate 14-Day Free Trial Now →</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Trial Account Activated!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                14-day full access has been enabled for <span className="text-white font-bold">{formData.name}</span> ({formData.storeName}, {formData.city}).
              </p>
              <div className="mt-2 inline-block bg-[#0B0F1A] border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 font-bold">
                Account ID: {tenantId}
              </div>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2">
                All details have been sent to our onboarding team. We will send setup credentials to <span className="text-slate-200 font-semibold">{formData.email}</span> and WhatsApp (+91 {formData.phone}).
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={getFounderWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Quick WhatsApp with Founder</span>
              </a>

              {onLaunchSandbox && (
                <button
                  onClick={() => {
                    onClose();
                    onLaunchSandbox();
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                >
                  Explore Live Sandbox
                </button>
              )}

              <button
                onClick={onClose}
                className="py-3 px-4 bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs rounded-xl border border-white/10 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
