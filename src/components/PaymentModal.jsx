import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, QrCode, Building } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#07070E] border border-emerald-500/40 rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 shadow-[0_20px_60px_rgba(16,185,129,0.25)] relative overflow-y-auto max-h-[92vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-[#0F0F1B] border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Gateway Brand Header */}
            <div className="flex items-center space-x-2 border-b border-white/10 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF007F] to-[#FF1493] text-white font-black flex items-center justify-center text-xs shadow-md shadow-[#FF007F]/30">
                RZP
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Razorpay Subscriptions / Cashfree Gateway
                  <span className="text-[10px] bg-[#FFE600]/15 text-[#FFE600] px-2 py-0.5 rounded font-mono font-black border border-[#FFE600]/30">SECURE SSL</span>
                </h3>
                <p className="text-[11px] text-slate-400">STACKPULSE B2B SaaS Annual Subscription</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-[#0C0C16] p-4 rounded-xl border border-white/10 space-y-2 mb-6 text-xs">
              <div className="flex justify-between font-bold text-white">
                <span>Selected Plan:</span>
                <span className="text-[#FFE600] font-black">{plan.name} Plan (Annual)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Annual Base Price:</span>
                <span className="font-mono text-slate-200">₹{priceAmount.toLocaleString('en-IN')} / year</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (18% Included):</span>
                <span className="font-mono text-slate-200">₹{Math.round(priceAmount * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between font-black text-sm text-white">
                <span>Total Charge Today:</span>
                <span className="text-[#FF007F] font-mono text-base font-black">₹{Math.round(priceAmount * 1.18).toLocaleString('en-IN')}</span>
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
                      className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        paymentMethod === method.id 
                          ? 'bg-[#FF007F]/20 text-[#FF007F] border-[#FF007F] shadow-[0_0_12px_rgba(255,0,127,0.3)]' 
                          : 'bg-[#0A0A12] text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      <method.icon className={`w-4 h-4 ${paymentMethod === method.id ? 'text-[#FFE600]' : 'text-slate-400'}`} />
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
                  className="w-full bg-[#0C0C16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 font-mono focus:outline-none focus:border-[#FF007F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">GSTIN for Tax Invoice Input (Optional)</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full bg-[#0C0C16] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white mt-1 font-mono uppercase focus:outline-none focus:border-[#FF007F]"
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-gradient-to-r from-[#FF007F] via-[#FF1493] to-[#FF2E93] hover:from-[#FF1493] hover:to-[#FF007F] text-white font-black text-xs rounded-xl shadow-lg shadow-[#FF007F]/30 flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-98"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
            <div className="w-16 h-16 bg-[#FF007F]/20 text-[#FF007F] rounded-full flex items-center justify-center mx-auto border border-[#FF007F]/40 shadow-[0_0_20px_rgba(255,0,127,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-[#FFE600]" />
            </div>
            <h3 className="text-xl font-black text-white">Subscription Activated!</h3>
            <p className="text-xs text-slate-300">
              Welcome to StackPulse <span className="text-[#FFE600] font-bold">{plan.name}</span>! Your multi-tenant account token has been provisioned.
            </p>

            <div className="bg-[#0C0C16] p-4 rounded-xl border border-white/10 text-xs font-mono text-left space-y-1 text-slate-300">
              <div>Transaction ID: <span className="text-[#FF007F] font-bold">pay_rzp_98410294821</span></div>
              <div>Invoice Sent To: <span className="text-white">+91 {phone}</span></div>
              <div>GST Tax Credit: <span className="text-[#FFE600] font-bold">{gstin}</span></div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-[#FF007F] to-[#FF1493] text-white font-black text-xs rounded-xl shadow-lg cursor-pointer"
            >
              Launch My StackPulse Dashboard Now
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
