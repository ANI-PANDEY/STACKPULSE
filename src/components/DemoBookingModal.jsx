import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DemoBookingModal({ onClose, onAddLead }) {
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: 'Wholesaler / FMCG',
    preferredDate: getTomorrowDate(),
    preferredTime: '11:00 AM'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onAddLead) {
        await onAddLead({
          type: 'DEMO_BOOKING',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          businessType: formData.businessType,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime
        });
      }
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#070A12] border border-emerald-500/40 rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-[0_20px_60px_rgba(16,185,129,0.25)] relative max-h-[92vh] overflow-y-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-[#0F1422] border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center space-x-3 mb-4 pr-8">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)] shrink-0">
                <Play className="w-5 h-5 fill-current text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">Book a 10-Min Live Demo</h3>
                <p className="text-[11px] sm:text-xs text-slate-400">1-on-1 walkthrough with a StackPulse Product Specialist</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajesh Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9820198201"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Business / Store Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharma FMCG Wholesalers"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="e.g. rajesh@sharmatraders.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Wholesaler / FMCG">Wholesaler / FMCG</option>
                  <option value="Supermarket / Retail Store">Supermarket / Retail Store</option>
                  <option value="Distributor / C&F Agent">Distributor / C&F Agent</option>
                  <option value="Hardware / Electrical Dealer">Hardware / Electrical Dealer</option>
                  <option value="Pharmacy / Healthcare Store">Pharmacy / Healthcare Store</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-400" /> Preferred Time
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="11:00 AM">11:00 AM IST</option>
                    <option value="02:00 PM">02:00 PM IST</option>
                    <option value="04:00 PM">04:00 PM IST</option>
                    <option value="06:30 PM">06:30 PM IST</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98"
              >
                {isSubmitting ? 'Sending Request...' : 'Confirm Demo Booking →'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-black text-white">Demo Scheduled Successfully!</h3>
            <p className="text-xs text-slate-300">
              Request received for <span className="text-emerald-400 font-bold">{formData.name}</span> on {formData.preferredDate} at {formData.preferredTime}.
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Our product team has been instantly notified via email. We will connect with you on WhatsApp (<span className="text-slate-200 font-mono font-bold">+91 {formData.phone}</span>) with the walkthrough invite.
            </p>
            
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-lg cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
