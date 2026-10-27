/**
 * StackPulse Lead Notification Service
 * Sends instant email alerts to aniketraj1707@gmail.com whenever a customer
 * requests a Demo, Free Trial (Plug & Play), Contact Inquiry, or Subscription.
 */

const TARGET_EMAIL = 'aniketraj1707@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${TARGET_EMAIL}`;

export async function sendLeadNotification(lead) {
  try {
    const cleanPhone = lead.phone ? String(lead.phone).replace(/\D/g, '') : '';
    const customerName = lead.name || 'Valued Customer';
    const requestType = getFriendlyLeadType(lead.type);
    
    // Auto-generate WhatsApp interactive greeting link for Aniket
    const waGreeting = encodeURIComponent(
      `Hello ${customerName}! Thank you for your interest in STACKPULSE. We received your ${requestType} request for ${lead.businessName || 'your business'}. When would be a good time to connect?`
    );
    const waLink = cleanPhone ? `https://wa.me/91${cleanPhone}?text=${waGreeting}` : 'N/A';
    const telLink = cleanPhone ? `tel:+91${cleanPhone}` : 'N/A';

    // Format clean, human-readable payload for email table
    const payload = {
      _subject: `🔥 New ${requestType}: ${customerName} (${lead.businessName || 'Store'})`,
      _template: 'table',
      _captcha: 'false',
      ...(lead.email ? { _replyto: lead.email } : {}),

      '📋 Request Type': requestType,
      '👤 Customer Name': customerName,
      '📱 Phone / WhatsApp': lead.phone || 'Not provided',
      '💬 Click to WhatsApp': waLink,
      '📞 Click to Call': telLink,
      '📧 Customer Email': lead.email || 'Not provided',
      '🏪 Business / Store Name': lead.businessName || 'Not provided',
      '🏢 Business Category': lead.businessType || 'Wholesale / Retail Store',
      ...(lead.preferredDate ? { '📅 Preferred Demo Date': lead.preferredDate } : {}),
      ...(lead.preferredTime ? { '⏰ Preferred Demo Time': lead.preferredTime } : {}),
      ...(lead.message ? { '💬 Inquiry Message': lead.message } : {}),
      ...(lead.plan ? { '💳 Selected Plan': lead.plan } : {}),
      ...(lead.price ? { '💰 Total Value': `₹${lead.price}` } : {}),
      '🌐 Source Website': typeof window !== 'undefined' ? window.location.origin : 'https://stackpulse-phi.vercel.app',
      '🕒 Received At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    const response = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    console.log('[LeadNotification] FormSubmit notification dispatched:', data);
    return { success: true, data };
  } catch (error) {
    console.warn('[LeadNotification] Notice while dispatching email alert:', error);
    // Return gracefully so UI flow never breaks
    return { success: false, error: error.message };
  }
}

function getFriendlyLeadType(type) {
  switch (type) {
    case 'DEMO_BOOKING':
      return '10-Min Live Demo Booking';
    case 'FREE_TRIAL':
      return '14-Day Free Trial (Plug & Play)';
    case 'CONTACT_INQUIRY':
      return 'Contact Form Inquiry';
    case 'PAID_SUBSCRIPTION':
      return 'Paid Subscription Booking';
    default:
      return 'Customer Inquiry';
  }
}
