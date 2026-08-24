import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, QrCode, Building } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ plan, onClose, onAddLead }) {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [phone, setPhone] = useState('9876543210');
  const [gstin, setGstin] = useState('27AABCU9603R1ZM');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!plan) return null;

  const priceAmount = plan.finalPrice || plan.price || 3599;

  const handleSimulatePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (onAddLead) {
        onAddLead({
          type: 'PAID_SUBSCRIPTION',
          name: `Subscriber (+91 ${phone})`,
          phone,
          plan: `${plan.name} (Annual Subscription)`,
          price: Math.round(priceAmount * 1.18),
          businessName: gstin ? `GST: ${gstin}` : 'Subscribed Store'
        });
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0D131F] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Gateway Brand Header */}
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">
                RZP
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Razorpay Subscriptions / Cashfree Gateway
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">SECURE SSL</span>
                </h3>
                <p className="text-[11px] text-slate-400">STACKPULSE B2B SaaS Annual Subscription</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 mb-6 text-xs">
              <div className="flex justify-between font-bold text-white">
                <span>Selected Plan:</span>
                <span className="text-emerald-400">{plan.name} Plan (Annual)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Annual Base Price:</span>
                <span className="font-mono text-slate-200">₹{priceAmount.toLocaleString('en-IN')} / year</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (18% Included):</span>
                <span className="font-mono text-slate-200">₹{Math.round(priceAmount * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-extrabold text-sm text-white">
                <span>Total Charge Today:</span>
                <span className="text-emerald-400 font-mono">₹{Math.round(priceAmount * 1.18).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 mb-2 block">Choose Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / PhonePe', icon: QrCode },
                    { id: 'CARD', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'NETBANKING', label: 'NetBanking', icon: Building }
                  ].map(method => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                        paymentMethod === method.id 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' 
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <method.icon className="w-4 h-4" />
                      <span>{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">WhatsApp Phone Number for Receipt</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">GSTIN for Tax Invoice Input (Optional)</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 font-mono uppercase focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Simulating Razorpay Payment Processing...
                  </span>
                ) : (
                  <span>Authorize Payment ₹{Math.round(priceAmount * 1.18).toLocaleString('en-IN')} &rarr;</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white">Subscription Activated!</h3>
            <p className="text-xs text-slate-300">
              Welcome to StackPulse <span className="text-emerald-400 font-bold">{plan.name}</span>! Your multi-tenant account token has been provisioned.
            </p>

            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono text-left space-y-1 text-slate-300">
              <div>Transaction ID: <span className="text-emerald-400">pay_rzp_98410294821</span></div>
              <div>Invoice Sent To: <span className="text-white">+91 {phone}</span></div>
              <div>GST Tax Credit: <span className="text-cyan-400">{gstin}</span></div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-emerald-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg cursor-pointer"
            >
              Launch My StackPulse Dashboard Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
