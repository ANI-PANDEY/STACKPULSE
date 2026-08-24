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
      badge: 'MOST POPULAR',
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
    <section id="pricing" className={`py-24 scroll-mt-28 relative transition-colors duration-300 ${
      isDark ? 'bg-[#06090E]' : 'bg-slate-100/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold mb-3 shadow-sm">
            <CreditCard className="w-4 h-4" />
            <span>TRANSPARENT SAAS PRICING</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Simple, All-Inclusive Annual Plans. <br />
            <span className="text-gradient-emerald">No Hidden Charges. No Monthly Confusion.</span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Start with our 14-day free trial. Flat yearly pricing with zero surprise renewals.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map(plan => {
            return (
              <div
                key={plan.id}
                className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer border ${
                  isDark 
                    ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/80 hover:bg-slate-900 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20'
                    : 'bg-white border-slate-200 shadow-lg hover:border-emerald-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                      {plan.badge}
                    </span>
                  </div>

                  <div className="text-xs text-emerald-500 font-medium mb-4">{plan.target}</div>
                  <p className={`text-xs mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{plan.description}</p>

                  {/* Price */}
                  <div className={`mb-6 pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div className="flex items-baseline gap-1.5">
                      <span className={`text-3xl sm:text-4xl font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{plan.period}</span>
                    </div>
                    <div className="text-[11px] text-emerald-500 font-medium mt-1">
                      Includes 1 Year Full License & All Updates
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>What's Included:</div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className={`flex items-start gap-2.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <button
                  onClick={() => onSelectPlan({ ...plan, finalPrice: plan.price })}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 text-white border border-slate-700 group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:text-slate-950 group-hover:border-emerald-400 group-hover:shadow-emerald-500/20'
                      : 'bg-slate-900 text-white shadow-md group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-teal-400 group-hover:text-slate-950 group-hover:shadow-emerald-500/20'
                  }`}
                >
                  <span>Subscribe Now (Razorpay / Cashfree)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Payment Gateways Banner */}
        <div className={`mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure 256-Bit SSL Encrypted Subscription Checkout</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Supported: Razorpay Subscriptions • Cashfree Recurring • UPI • NetBanking • Credit Cards</span>
          </div>
        </div>

      </div>
    </section>
  );
}
