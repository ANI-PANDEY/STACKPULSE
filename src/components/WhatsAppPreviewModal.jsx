import React, { useState } from 'react';
import { X, CheckCheck, Send, MessageSquare, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WhatsAppPreviewModal({ invoiceData, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  if (!invoiceData) return null;

  const isReminder = invoiceData.isKhataReminder;

  const messageText = isReminder
    ? `⚠️ *B2B PAYMENT REMINDER - ${invoiceData.customerName.toUpperCase()}*\n\nHello ${invoiceData.customerName},\nThis is a friendly reminder regarding your pending credit ledger balance:\n\n• *Outstanding Due:* ₹${invoiceData.grandTotal.toLocaleString('en-IN')}\n• *Overdue Period:* ${invoiceData.daysOverdue} Days\n\n⚡ *Pay Instant via UPI / Razorpay:* https://khata.stackpulse.app/pay?ref=${invoiceData.customerPhone}\n\nThank you,\n*Sharma Wholesale Hub (Powered by StackPulse)*`
    : `🧾 *GST TAX INVOICE - SHARMA GENERAL STORES*\n*Invoice #:* ${invoiceData.invNumber}\n*Date:* ${invoiceData.date}\n\nHello *${invoiceData.customerName}*,\nThank you for your purchase! Here is your official GST tax bill summary:\n\n${invoiceData.items ? invoiceData.items.map(item => `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`).join('\n') : ''}\n-----------------------------\n*Grand Total (Incl. GST):* ₹${invoiceData.grandTotal}\n*Payment Mode:* ${invoiceData.paymentMode}\n\n📥 *Download Official Tax PDF Invoice:*\nhttps://stackpulse.app/invoice/pdf/${invoiceData.invNumber}\n\nThank you for doing business with us!\n*Powered by STACKPULSE SaaS*`;

  const handleSendWhatsApp = () => {
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsDelivered(true);
      confetti({ particleCount: 80, spread: 50, origin: { y: 0.6 } });
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000000]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#050810] border border-emerald-500/40 rounded-2xl sm:rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.25)] relative overflow-y-auto max-h-[92vh]">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-emerald-500/20 blur-2xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <MessageSquare className="w-5 h-5 fill-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                WhatsApp Business Cloud API Simulator
                <span className="text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-bold flex items-center gap-1">
                  ⚡ VERIFIED API
                </span>
              </h3>
              <p className="text-[11px] text-emerald-400 font-mono">Target Phone: +91 {invoiceData.customerPhone}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-[#0B0F1A] border border-white/10 hover:border-emerald-500/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Phone Screen Box */}
        <div className="bg-[#030408] border border-white/10 rounded-2xl p-4 space-y-3 relative my-2">
          
          <div className="text-center">
            <span className="text-[10px] bg-[#0E1524] text-slate-400 px-3 py-1 rounded-full font-mono border border-white/5">TODAY</span>
          </div>

          {/* WhatsApp Chat Bubble */}
          <div className="bg-[#075E54] text-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[92%] shadow-md space-y-2 text-xs relative font-sans leading-relaxed border border-[#128C7E]/40">
            <div className="whitespace-pre-line">{messageText}</div>
            
            <div className="flex items-center justify-end space-x-1 text-[10px] text-emerald-200 font-mono pt-1">
              <span>10:42 AM</span>
              {isDelivered ? (
                <CheckCheck className="w-4 h-4 text-emerald-300" />
              ) : (
                <CheckCheck className="w-4 h-4 text-emerald-300/70" />
              )}
            </div>
          </div>

        </div>

        {/* Delivery Status Toast */}
        {isDelivered && (
          <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-between mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>WhatsApp Invoice Delivered to +91 {invoiceData.customerPhone}!</span>
            </span>
            <CheckCheck className="w-4 h-4 text-emerald-400" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2 relative z-10">
          <button
            onClick={handleSendWhatsApp}
            disabled={isSending || isDelivered}
            className={`w-full py-3.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
              isDelivered
                ? 'bg-[#0E1524] text-slate-400 border border-white/10 cursor-default'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer'
            }`}
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Connecting Meta WhatsApp Cloud API...
              </span>
            ) : isDelivered ? (
              <span className="text-emerald-300 flex items-center gap-1.5 font-bold">
                ✓ WhatsApp Delivery Confirmed
              </span>
            ) : (
              <>
                <Send className="w-4 h-4 text-emerald-200" />
                <span>Trigger WhatsApp Cloud API Auto-Send</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="py-2.5 bg-[#0B0F1A] hover:bg-[#121B2E] text-slate-300 font-bold text-xs rounded-xl border border-white/10 hover:border-emerald-500/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
              <span className={copied ? 'text-emerald-400' : ''}>{copied ? 'Copied Text' : 'Copy Message'}</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 bg-[#0B0F1A] hover:bg-[#121B2E] text-slate-300 font-bold text-xs rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
