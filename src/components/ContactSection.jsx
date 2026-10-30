import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Phone, MapPin, Send, Zap, AlertCircle, MessageSquare, Mail, RotateCw } from 'lucide-react';
import { OWNER_WHATSAPP, TARGET_EMAIL } from '../services/leadNotificationService';

export default function ContactSection({ theme, onAddLead }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFeedback, setErrorFeedback] = useState(null);

  const isDark = theme === 'dark';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setLoading(true);
    setErrorFeedback(null);

    const payload = {
      type: 'CONTACT_INQUIRY',
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || 'N/A',
      businessName: formData.businessName.trim() || 'Website Visitor Store',
      city: formData.city.trim() || 'Not specified',
      message: formData.message.trim(),
      status: 'NEW_INQUIRY'
    };

    try {
      if (onAddLead) {
        const res = await onAddLead(payload);
        if (res && res.success === false) {
          setErrorFeedback(res);
        } else {
          setSubmitted(true);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            businessName: '',
            city: '',
            message: ''
          });
        }
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Contact inquiry error:', err);
      setErrorFeedback({ error: err.message || 'Submission failed' });
    } finally {
      setLoading(false);
    }
  };

  const getFounderWhatsAppUrl = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Website Visitor';
    const msg = encodeURIComponent(
      `Hello Aniket! I sent an inquiry on StackPulse for ${formData.businessName || 'my business'} (${formData.city || 'India'}). My name is ${fullName} (Phone: ${formData.phone || 'N/A'}). Message: ${formData.message}`
    );
    return `https://wa.me/91${OWNER_WHATSAPP}?text=${msg}`;
  };

  const getMailtoUrl = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim() || 'Visitor';
    const subject = encodeURIComponent(`🔥 New Contact Form Inquiry: ${fullName} (${formData.businessName || 'Store'})`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nStore: ${formData.businessName}\nCity: ${formData.city}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={`py-14 sm:py-24 px-4 sm:px-6 lg:px-16 transition-colors duration-300 border-t ${
      isDark ? 'bg-[#090A0F] border-white/10 text-white' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Get in touch & Info in Obsidian, Emerald & Rose */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-extrabold">DIRECT SUPPORT & SALES</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-emerald-400">touch</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-base leading-relaxed max-w-md">
                Let’s modernize your retail & wholesale counters. Tell us about your store operations and we’ll get back to you immediately.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-base sm:text-xl font-bold text-slate-100 leading-snug">
                For product questions and enterprise onboarding:
              </h3>

              <a 
                href="mailto:support@stackpulse.com"
                className="inline-flex items-center gap-1.5 text-base sm:text-xl font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-400 transition-all group break-all sm:break-normal"
              >
                <span>support@stackpulse.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-red-500 shrink-0" />
              </a>

              <p className="text-slate-400 text-xs sm:text-sm pt-0.5">
                or send a direct message via this form.
              </p>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0B0F1A] border border-white/10 flex items-center justify-center text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)] shrink-0">
                  <Phone className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Phone & WhatsApp</span>
                  <span className="font-bold text-white font-mono">+91 8877002297</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0B0F1A] border border-white/10 flex items-center justify-center text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)] shrink-0">
                  <MapPin className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Location</span>
                  <span className="font-bold text-white">Patna, Bihar, India</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 sm:pt-6 border-t border-white/10">
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                We read every message and reply personally — usually within 15 minutes during business hours.
              </p>
              <p className="text-slate-500 text-[11px] tracking-wide font-mono">
                STACKPULSE SaaS Technologies Pvt. Ltd.
              </p>
            </div>
          </div>

          {/* Right Column: Sleek Form in Obsidian Glass with Emerald / Red accents */}
          <div className="lg:col-span-7 bg-[#0C0E17] p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
            {submitted ? (
              <div className="py-12 sm:py-16 text-center space-y-4 animate-fadeIn">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-7 sm:w-8 h-7 sm:h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Message Sent Successfully!</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to StackPulse. Our onboarding team has received your inquiry and will reach out to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {errorFeedback && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-rose-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Notification Relay Notice: Direct email server temporarily unreachable</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Your message has been saved in our desk. You can reach out directly via WhatsApp or Email below:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={getFounderWhatsAppUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 bg-[#25D366] text-slate-950 font-black rounded-lg text-xs flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Send via WhatsApp</span>
                      </a>
                      <a
                        href={getMailtoUrl()}
                        className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send via Email</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setErrorFeedback(null)}
                        className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Try Again</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                  {/* First Name */}
                  <div className="space-y-1.5 sm:space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="e.g. Rajesh"
                      className="w-full bg-transparent border-b border-white/15 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-1.5 sm:space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="e.g. Sharma"
                      className="w-full bg-transparent border-b border-white/15 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                  {/* Email */}
                  <div className="space-y-1.5 sm:space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@store.com"
                      className="w-full bg-transparent border-b border-white/15 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5 sm:space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent border-b border-white/15 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                  {/* Business Name */}
                  <div className="space-y-1.5 sm:space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      Store / Business Name
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Sharma FMCG Wholesalers"
                      className="w-full bg-transparent border-b border-white/15 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1.5 sm:space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      City & State
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Patna, Bihar"
                      className="w-full bg-transparent border-b border-white/15 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5 sm:space-y-2 group">
                  <label className="block text-xs font-semibold text-slate-300">
                    Write a message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your business, counters, or software requirements..."
                    className="w-full bg-transparent border-b border-white/15 py-2 sm:py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto px-10 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-black text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 active:scale-95 transition-all shadow-xl shadow-red-500/30 hover:shadow-red-500/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Inquiry...</span>
                      </span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4 text-emerald-300" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
