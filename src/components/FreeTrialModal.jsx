import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FreeTrialModal({ onClose, onLaunchSandbox, onAddLead }) {
  const [email, setEmail] = useState('aniket@stackpulse.io');
  const [phone, setPhone] = useState('9876543210');
  const [storeName, setStoreName] = useState('Sharma General Stores');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });

      if (onAddLead) {
        onAddLead({
          type: 'FREE_TRIAL',
          name: storeName,
          email,
          phone,
          businessName: storeName
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D131F] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Start 14-Day Free Trial</h3>
                <p className="text-xs text-slate-400">Full Pro Access • No Credit Card Required</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Store / Business Name</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Business Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">WhatsApp Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant Account Provisioning
                </div>
                <div>✓ Multi-Tenant Account ID: <span className="font-mono text-slate-300">tenant_sharma_9821</span></div>
                <div>✓ Barcode POS + WhatsApp API + GSTR Exports Included</div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isSubmitting ? 'Provisioning Account...' : 'Activate 14-Day Free Account &rarr;'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">Free Trial Account Ready!</h3>
            <p className="text-xs text-slate-300">
              Account created for <span className="text-emerald-400 font-bold">{storeName}</span>. Your 14-day full access token has been assigned.
            </p>
            
            <button
              onClick={() => {
                onClose();
                if (onLaunchSandbox) onLaunchSandbox();
              }}
              className="w-full py-3.5 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Jump to Interactive Live Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
