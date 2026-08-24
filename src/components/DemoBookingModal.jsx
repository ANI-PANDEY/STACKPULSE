import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Play, Building, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DemoBookingModal({ onClose, onAddLead }) {
  const [formData, setFormData] = useState({
    name: 'Aniket Pandey',
    phone: '9876543210',
    businessName: 'Apex Distributors',
    businessType: 'Wholesaler / FMCG',
    preferredDate: '2026-08-25',
    preferredTime: '11:00 AM'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });

      if (onAddLead) {
        onAddLead({
          type: 'DEMO_BOOKING',
          name: formData.name,
          phone: formData.phone,
          businessName: formData.businessName,
          businessType: formData.businessType,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime
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
                <Play className="w-5 h-5 fill-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Book a 10-Min Live Demo</h3>
                <p className="text-xs text-slate-400">1-on-1 walkthrough with a StackPulse Product Specialist</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Business Name</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Wholesaler / FMCG">Wholesaler / B2B Dealer</option>
                  <option value="Supermarket / Retail Store">Supermarket / Retail Store</option>
                  <option value="Multi-Counter Distributor">Multi-Counter Distributor</option>
                  <option value="Pharma & Medical Wholesale">Pharma & Medical Wholesale</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">Preferred Time Slot</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="11:00 AM">11:00 AM IST</option>
                    <option value="02:00 PM">02:00 PM IST</option>
                    <option value="05:00 PM">05:00 PM IST</option>
                    <option value="07:00 PM">07:00 PM IST</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isSubmitting ? 'Confirming Demo Slot...' : 'Confirm Live Demo Booking &rarr;'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">Live Demo Confirmed!</h3>
            <p className="text-xs text-slate-300">
              Our B2B specialist will connect with <span className="text-emerald-400 font-bold">{formData.name}</span> on WhatsApp (+91 {formData.phone}) on <span className="text-white font-mono">{formData.preferredDate} at {formData.preferredTime}</span>.
            </p>
            <button onClick={onClose} className="w-full py-3 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">
              Done & Return to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
