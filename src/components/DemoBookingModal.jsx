import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Play, MapPin, Building2, Layers, MessageSquare, Laptop } from 'lucide-react';
import confetti from 'canvas-confetti';
import { OWNER_WHATSAPP } from '../services/leadNotificationService';

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
    city: '',
    businessType: 'Wholesaler / FMCG',
    counters: '1-2 Billing Counters',
    currentSoftware: 'Manual / Excel',
    preferredDate: getTomorrowDate(),
    preferredTime: '11:00 AM',
    notes: ''
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
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          businessName: formData.businessName.trim(),
          city: formData.city.trim(),
          businessType: formData.businessType,
          counters: formData.counters,
          currentSoftware: formData.currentSoftware,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          notes: formData.notes.trim()
        });
      }
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({ particleCount: 110, spread: 65, origin: { y: 0.6 } });
    }
  };

  const getFounderWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Hello Aniket! I just scheduled a 10-Min Live Demo for ${formData.businessName || 'my business'} (${formData.city || 'India'}) on ${formData.preferredDate} at ${formData.preferredTime}. My name is ${formData.name}.`
    );
    return `https://wa.me/91${OWNER_WHATSAPP}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#070A12] border border-emerald-500/40 rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-[0_20px_60px_rgba(16,185,129,0.25)] relative max-h-[92vh] overflow-y-auto">
        
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
                <p className="text-[11px] sm:text-xs text-slate-400">Personalized 1-on-1 walkthrough tailored to your counter operations</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">Your Full Name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">WhatsApp Number <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9820198201"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono mt-1 focus:outline-none focus:border-emerald-500"
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
                    placeholder="e.g. Sharma Wholesalers"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
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
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-bold text-slate-300">Email Address (Optional for Demo Link)</label>
                <input
                  type="email"
                  placeholder="e.g. rajesh@sharmatraders.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Category & Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">Business Category</label>
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
                    <option value="Textile / Garment Store">Textile / Garment Store</option>
                    <option value="Restaurant / Food Business">Restaurant / Food Business</option>
                    <option value="Other Commercial Enterprise">Other Commercial Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" /> Billing Counters
                  </label>
                  <select
                    value={formData.counters}
                    onChange={(e) => setFormData({ ...formData, counters: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="1 Single Counter">1 Single Counter</option>
                    <option value="2-4 Billing Counters">2-4 Billing Counters</option>
                    <option value="5+ High-Volume Counters">5+ High-Volume Counters</option>
                    <option value="Multi-Branch / Warehouse">Multi-Branch / Warehouse</option>
                  </select>
                </div>
              </div>

              {/* Current Software & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Laptop className="w-3.5 h-3.5 text-slate-400" /> Current Billing System
                  </label>
                  <select
                    value={formData.currentSoftware}
                    onChange={(e) => setFormData({ ...formData, currentSoftware: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Manual / Paper Khata">Manual / Paper Khata</option>
                    <option value="Excel Spreadsheets">Excel Spreadsheets</option>
                    <option value="Tally ERP / Prime">Tally ERP / Prime</option>
                    <option value="Marg ERP">Marg ERP</option>
                    <option value="Busy Accounting">Busy Accounting</option>
                    <option value="Vyapar / Other Software">Vyapar / Other Software</option>
                    <option value="Brand New Business">Brand New Business</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Preferred Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Preferred Time & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Preferred Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="11:00 AM">11:00 AM IST (Morning)</option>
                    <option value="02:00 PM">02:00 PM IST (Afternoon)</option>
                    <option value="04:00 PM">04:00 PM IST (Late Afternoon)</option>
                    <option value="06:30 PM">06:30 PM IST (Evening)</option>
                    <option value="08:00 PM">08:00 PM IST (After Counter Close)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300">Specific Requirements (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Need barcode scale & e-way bill"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#0C101C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Dispatching Details to Product Team...
                  </span>
                ) : (
                  <span>Confirm & Schedule Live Demo →</span>
                )}
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
              Request received for <span className="text-emerald-400 font-bold">{formData.name}</span> ({formData.businessName}, {formData.city}) on <span className="text-white font-bold">{formData.preferredDate}</span> at <span className="text-white font-bold">{formData.preferredTime}</span>.
            </p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All details have been dispatched to our engineering & product team. We will connect on WhatsApp (<span className="text-slate-200 font-mono font-bold">+91 {formData.phone}</span>) with the walkthrough link.
            </p>

            {/* Quick Action: Instant WhatsApp Connect with Founder */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <a
                href={getFounderWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-[#25D366] hover:bg-[#20ba59] text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Instant WhatsApp with Founder</span>
              </a>

              <button
                onClick={onClose}
                className="flex-1 py-3 bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs rounded-xl border border-white/10 cursor-pointer"
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
