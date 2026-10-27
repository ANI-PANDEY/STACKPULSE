import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FreeTrialModal({ onClose, onAddLead }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onAddLead) {
        await onAddLead({
          type: 'FREE_TRIAL',
          name: storeName,
          email,
          phone,
          businessName: storeName
        });
      }
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#070A12] border border-red-500/40 rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-[0_20px_60px_rgba(239,68,68,0.25)] relative max-h-[92vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-[#0F1422] border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Start 14-Day Free Trial (Plug & Play)</h3>
                <p className="text-xs text-slate-400">Full Pro Access • No Credit Card Required</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Store / Business Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Om Sai Supermarket / Wholesalers"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Business Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. owner@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9820198201"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono mt-1 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="bg-[#05070E] p-3 rounded-xl border border-white/5 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant Account Provisioning
                </div>
                <div>✓ Multi-Tenant Account ID: <span className="font-mono text-emerald-400 font-bold">tenant_{storeName ? storeName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 12) : 'store'}_9821</span></div>
                <div>✓ Barcode POS + WhatsApp API + GSTR Exports Included</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 text-white font-black text-xs rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98"
              >
                {isSubmitting ? 'Provisioning Account...' : 'Activate 14-Day Free Account →'}
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
              <p className="text-xs text-slate-300 max-w-xs mx-auto mt-1">
                Your 14-day full access has been enabled for <span className="text-white font-bold">{storeName}</span>.
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2">
                Our team has received your registration details and will send onboarding support to <span className="text-slate-200 font-semibold">{email}</span> and WhatsApp (+91 {phone}).
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Done & Return
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
