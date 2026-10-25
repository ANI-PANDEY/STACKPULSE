import React from 'react';
import { Check, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

export default function PricingGrid({ theme, onSelectPlan }) {
  const isDark = theme === 'dark';

  const PLANS = [
    {
      id: 'starter',
      name: 'Starter',
      target: 'Small Retail Shops & Counter Stores',
      price: 3599,
      period: '/ year',
      description: 'Essential barcode billing & GST compliance for single-counter stores.',
      badge: 'STARTER KIT',
      isPopular: false,
      features: [
        '1 Active POS Counter',
        'Up to 2,000 Product SKUs',
        'Fast POS Billing & Thermal Receipt Printing',
        'Basic GST Sales & Purchase Reports',
        'Single Warehouse Management',
        'Email & Phone Support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      target: 'Supermarkets, FMCG Distributors & Wholesalers',
      price: 4999,
      period: '/ year',
      description: 'Complete multi-user suite with WhatsApp automation & dealer khata.',
      badge: '⚡ MOST POPULAR',
      isPopular: true,
      features: [
        'Up to 5 Active POS Counters',
        'Unlimited Product SKUs & Barcode Gun Sync',
        'WhatsApp Business Cloud API Auto-Invoice Delivery',
        'Multi-Warehouse Sync (Up to 3 Hubs)',
        'B2B Wholesaler Credit Ledger (Khata Book)',
        '1-Click WhatsApp Payment Reminders',
        'Automated GSTR-1 & GSTR-3B Exports (JSON/CSV)',
        'Batch & Expiry Date Alert System',
        'Role-Based Access (Admin vs Cashier vs Inventory)'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      target: 'Big B2B Businesses & Multi-Branch Chains',
      price: 6999,
      period: '/ year',
      description: 'Custom infrastructure with dedicated API sync & account manager.',
      badge: 'FULL POWER',
      isPopular: false,
      features: [
        'Unlimited POS Counters & Branches',
        'Unlimited Warehouses & Regional Depots',
        'Dedicated Multi-Tenant MongoDB Cluster',
        'Custom REST API & ERP (Tally/SAP) Integration',
        'Custom Invoice Branding & Subdomain',
        'Dedicated 24/7 Account Manager & On-site Training',
        '99.99% Guaranteed SLA Uptime'
      ]
    }
  ];

  return (
    <section id="pricing" className={`py-14 sm:py-24 scroll-mt-28 relative transition-colors duration-300 ${
      isDark ? 'bg-[#090A0F]' : 'bg-slate-100/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-extrabold">TRANSPARENT SAAS PRICING</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Simple, All-Inclusive Annual Plans. <br className="hidden sm:inline" />
            <span className="text-gradient-cyber">No Hidden Charges. No Monthly Confusion.</span>
          </h2>
          <p className={`text-xs sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Start with our 14-day free trial. Flat yearly pricing with zero surprise renewals.
          </p>
        </div>

        {/* Pricing Cards Grid in Obsidian, Emerald & Rose */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PLANS.map(plan => {
            const isPro = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                  isPro
                    ? isDark 
                      ? 'bg-[#0E1322] border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.25)] hover:border-emerald-400 hover:shadow-[0_0_55px_rgba(16,185,129,0.35)] hover:-translate-y-1 ring-1 ring-emerald-500/30'
                      : 'bg-white border-emerald-500 shadow-xl hover:-translate-y-1 ring-1 ring-emerald-500/20'
                    : isDark 
                      ? 'bg-[#0C0E17] border-white/10 hover:border-emerald-500/60 hover:bg-[#101422] hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10'
                      : 'bg-white border-slate-200 shadow-lg hover:border-emerald-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-lg sm:text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      isPro
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                        : plan.id === 'enterprise'
                          ? 'bg-red-500/15 text-red-400 border-red-500/30'
                          : 'bg-slate-800 text-slate-300 border-white/10'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <div className={`text-xs font-semibold mb-3 ${isPro ? 'text-emerald-400' : plan.id === 'enterprise' ? 'text-red-400' : 'text-slate-400'}`}>
                    {plan.target}
                  </div>
                  <p className={`text-xs mb-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{plan.description}</p>

                  {/* Price */}
                  <div className={`mb-5 pb-5 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl sm:text-4xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400 font-bold mt-1">
                      ⚡ Includes 1 Year Full License & All Updates
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-7">
                    <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>What's Included:</div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className={`flex items-start gap-2.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPro ? 'text-emerald-400' : 'text-emerald-500'}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <button
                  onClick={() => onSelectPlan({ ...plan, finalPrice: plan.price })}
                  className={`w-full py-3 sm:py-3.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer active:scale-95 ${
                    isPro
                      ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 text-white shadow-red-500/35 hover:shadow-red-500/55'
                      : plan.id === 'enterprise'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30'
                        : isDark
                          ? 'bg-[#0E1320] text-white border border-white/10 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:border-emerald-500 group-hover:shadow-emerald-500/20'
                          : 'bg-slate-900 text-white shadow-md group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:shadow-emerald-500/20'
                  }`}
                >
                  <span>Subscribe Now (Razorpay / Cashfree)</span>
                  <ArrowRight className="w-4 h-4 text-emerald-300" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Enterprise Callout Strip */}
        <div className={`mt-10 sm:mt-14 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-5 sm:gap-6 ${
          isDark ? 'bg-[#0C0E17] border-emerald-500/20 shadow-xl' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Need Custom Wholesaler Setup or Data Migration?</h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Our engineers will migrate your existing Excel, Vyapar, Marg, or Tally customer & stock data free of charge.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan({ name: 'Custom Enterprise Migration', price: 6999, id: 'enterprise' })}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs shadow-md shadow-red-500/30 shrink-0 transition-all cursor-pointer"
          >
            Talk to Migration Engineer &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
