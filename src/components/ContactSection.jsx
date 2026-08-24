import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection({ theme, onAddLead }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDark = theme === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setLoading(true);

    setTimeout(() => {
      if (onAddLead) {
        onAddLead({
          type: 'CONTACT_INQUIRY',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone || 'N/A',
          businessName: 'Website Visitor Inquiry',
          message: formData.message,
          status: 'NEW_INQUIRY'
        });
      }

      setLoading(false);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 600);
  };

  return (
    <section id="contact" className={`py-24 px-6 lg:px-16 transition-colors duration-300 border-t ${
      isDark ? 'bg-[#030712] border-slate-800/80 text-white' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Get in touch & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Get in touch
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-md">
                Let’s work together on your next project. Tell us what you’re building and we’ll take it from there.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 leading-snug">
                For product questions and partnership inquiries, please email:
              </h3>

              <a 
                href="mailto:support@stackpulse.com"
                className="inline-flex items-center gap-1.5 text-lg sm:text-xl font-medium text-lime-400 hover:text-lime-300 underline underline-offset-4 decoration-lime-400/50 hover:decoration-lime-300 transition-all group"
              >
                <span>support@stackpulse.com</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <p className="text-slate-400 text-xs sm:text-sm pt-1">
                or send a message via this form.
              </p>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-lime-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Phone & WhatsApp</span>
                  <span className="font-semibold text-white">+91 8877002297</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center text-lime-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Location</span>
                  <span className="font-semibold text-white">Patna, Bihar, India</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800/80">
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                We read every message and reply personally — usually within one business day, Monday to Friday.
              </p>
              <p className="text-slate-500 text-[11px] tracking-wide">
                StackPulse is a product of STACKPULSE SaaS Technologies Pvt. Ltd.
              </p>
            </div>
          </div>

          {/* Right Column: Sleek Form */}
          <div className="lg:col-span-7 bg-slate-900/50 p-6 sm:p-10 rounded-3xl border border-slate-800/80 shadow-2xl backdrop-blur-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-lime-400/20 text-lime-400 rounded-full flex items-center justify-center mx-auto border border-lime-400/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to StackPulse. Our team has received your inquiry and will reply to your email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* First Name */}
                  <div className="space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      First name <span className="text-lime-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First name"
                      className="w-full bg-transparent border-b border-slate-700 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime-400 transition-colors"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      Last name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Last name"
                      className="w-full bg-transparent border-b border-slate-700 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Email */}
                  <div className="space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      Email <span className="text-lime-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-transparent border-b border-slate-700 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime-400 transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2 group">
                    <label className="block text-xs font-semibold text-slate-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 8877002297"
                      className="w-full bg-transparent border-b border-slate-700 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2 group">
                  <label className="block text-xs font-semibold text-slate-300">
                    Write a message <span className="text-lime-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your business or inquiry..."
                    className="w-full bg-transparent border-b border-slate-700 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-lime-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3.5 rounded-full text-sm font-bold text-slate-950 bg-lime-400 hover:bg-lime-300 active:scale-95 transition-all shadow-lg shadow-lime-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Submit</span>
                        <Send className="w-4 h-4" />
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
