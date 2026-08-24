import React, { useState } from 'react';
import { X, CheckCheck, Send, MessageSquare, Download, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B141A] border border-emerald-900/60 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <MessageSquare className="w-5 h-5 fill-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                WhatsApp Business Cloud API Simulator
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">VERIFIED API</span>
              </h3>
              <p className="text-[11px] text-emerald-400">Target Phone: +91 {invoiceData.customerPhone}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Phone Screen Box */}
        <div className="bg-[#0B141A] border border-emerald-900/40 rounded-2xl p-4 space-y-3 relative my-2">
          
          <div className="text-center">
            <span className="text-[10px] bg-[#1F2C34] text-slate-400 px-3 py-1 rounded-full font-mono">TODAY</span>
          </div>

          {/* WhatsApp Chat Bubble */}
          <div className="bg-[#005C4B] text-slate-100 p-4 rounded-2xl rounded-tl-none max-w-[92%] shadow-md space-y-2 text-xs relative font-sans leading-relaxed">
            <div className="whitespace-pre-line">{messageText}</div>
            
            <div className="flex items-center justify-end space-x-1 text-[10px] text-emerald-200 font-mono pt-1">
              <span>10:42 AM</span>
              {isDelivered ? (
                <CheckCheck className="w-4 h-4 text-cyan-300" />
              ) : (
                <CheckCheck className="w-4 h-4 text-emerald-400/60" />
              )}
            </div>
          </div>

        </div>

        {/* Delivery Status Toast */}
        {isDelivered && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-between mb-4">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              WhatsApp Invoice Delivered to +91 {invoiceData.customerPhone}!
            </span>
            <CheckCheck className="w-4 h-4 text-cyan-300" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <button
            onClick={handleSendWhatsApp}
            disabled={isSending || isDelivered}
            className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
              isDelivered
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isSending ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Connecting Meta WhatsApp Cloud API...
              </span>
            ) : isDelivered ? (
              <span>✓ WhatsApp Delivery Confirmed</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Trigger WhatsApp Cloud API Auto-Send</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopy}
              className="py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Text' : 'Copy Message'}</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
