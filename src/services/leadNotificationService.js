/**
 * StackPulse Multi-Channel Lead Notification Service
 * Dispatches comprehensive lead alerts to aniketraj1707@gmail.com
 * Supports Web3Forms, FormSubmit fallback, Google Apps Script / Webhooks,
 * Direct WhatsApp notification generator, and pre-formatted mailto alerts.
 */

export const TARGET_EMAIL = 'aniketraj1707@gmail.com';
export const OWNER_WHATSAPP = '8877002297'; // Aniket's direct WhatsApp number

/**
 * Get active Web3Forms Access Key from localStorage or environment
 */
export function getStoredWeb3FormsKey() {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('stackpulse_web3forms_key');
    if (local && local.trim()) return local.trim();
  }
  return import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY || '';
}

/**
 * Save Web3Forms Access Key to localStorage
 */
export function setStoredWeb3FormsKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('stackpulse_web3forms_key', key.trim());
    } else {
      localStorage.removeItem('stackpulse_web3forms_key');
    }
  }
}

/**
 * Get active Webhook URL (e.g. Google Apps Script Web App)
 */
export function getStoredWebhookUrl() {
  if (typeof window !== 'undefined') {
    const local = localStorage.getItem('stackpulse_lead_webhook');
    if (local && local.trim()) return local.trim();
  }
  return import.meta.env?.VITE_LEAD_WEBHOOK_URL || '';
}

/**
 * Save Webhook URL to localStorage
 */
export function setStoredWebhookUrl(url) {
  if (typeof window !== 'undefined') {
    if (url && url.trim()) {
      localStorage.setItem('stackpulse_lead_webhook', url.trim());
    } else {
      localStorage.removeItem('stackpulse_lead_webhook');
    }
  }
}

export function getFriendlyLeadType(type) {
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

/**
 * Formats a clean, readable text summary of the lead for emails and messages
 */
export function formatLeadSummaryText(lead) {
  const customerName = lead.name || 'Valued Customer';
  const requestType = getFriendlyLeadType(lead.type);
  const cleanPhone = lead.phone ? String(lead.phone).replace(/\D/g, '') : '';
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return [
    `🔥 NEW STACKPULSE LEAD RECEIVED`,
    `==================================`,
    `📋 REQUEST TYPE: ${requestType}`,
    `👤 CONTACT PERSON: ${customerName}`,
    `📱 MOBILE / WHATSAPP: ${lead.phone || 'Not provided'}`,
    `📧 EMAIL ADDRESS: ${lead.email || 'Not provided'}`,
    `🏪 BUSINESS / STORE: ${lead.businessName || 'Not provided'}`,
    `📍 CITY & LOCATION: ${lead.city || 'Not provided'}`,
    `🏢 BUSINESS CATEGORY: ${lead.businessType || 'Retail / Wholesale'}`,
    lead.counters ? `🔢 BILLING COUNTERS: ${lead.counters}` : null,
    lead.currentSoftware ? `💻 CURRENT SOFTWARE: ${lead.currentSoftware}` : null,
    lead.preferredDate ? `📅 PREFERRED DATE: ${lead.preferredDate}` : null,
    lead.preferredTime ? `⏰ PREFERRED TIME: ${lead.preferredTime}` : null,
    lead.notes || lead.message ? `💬 NOTES / REQUIREMENTS: ${lead.notes || lead.message}` : null,
    lead.plan ? `💳 SELECTED PLAN: ${lead.plan}` : null,
    lead.price ? `💰 TOTAL VALUE: ₹${lead.price}` : null,
    lead.accountId ? `🆔 MULTI-TENANT ID: ${lead.accountId}` : null,
    `----------------------------------`,
    cleanPhone ? `👉 CHAT WITH CUSTOMER: https://wa.me/91${cleanPhone}` : null,
    cleanPhone ? `👉 CALL CUSTOMER: tel:+91${cleanPhone}` : null,
    lead.email ? `👉 EMAIL CUSTOMER: mailto:${lead.email}` : null,
    `🕒 RECEIVED AT: ${now} (IST)`,
    `🌐 SOURCE: ${typeof window !== 'undefined' ? window.location.origin : 'https://stackpulse-phi.vercel.app'}`
  ].filter(Boolean).join('\n');
}

/**
 * Builds a direct WhatsApp notification link to Aniket's personal phone
 */
export function buildOwnerWhatsAppLink(lead) {
  const summary = formatLeadSummaryText(lead);
  return `https://wa.me/91${OWNER_WHATSAPP}?text=${encodeURIComponent(summary)}`;
}

/**
 * Builds a direct customer greeting WhatsApp link
 */
export function buildCustomerWhatsAppLink(lead) {
  const cleanPhone = lead.phone ? String(lead.phone).replace(/\D/g, '') : '';
  if (!cleanPhone) return '#';
  const customerName = lead.name || 'Sir';
  const requestType = getFriendlyLeadType(lead.type);
  const text = encodeURIComponent(
    `Hello ${customerName}! Thank you for your interest in STACKPULSE. We received your request for ${requestType} for "${lead.businessName || 'your store'}". When would be a convenient time to connect?`
  );
  return `https://wa.me/91${cleanPhone}?text=${text}`;
}

/**
 * Builds a pre-composed mailto: link for instant fallback email
 */
export function buildMailtoFallback(lead) {
  const customerName = lead.name || 'Customer';
  const requestType = getFriendlyLeadType(lead.type);
  const subject = encodeURIComponent(`🔥 [STACKPULSE] ${requestType}: ${customerName} - ${lead.businessName || 'Store'}`);
  const body = encodeURIComponent(formatLeadSummaryText(lead));
  return `mailto:${TARGET_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Main Dispatcher: Sends lead notification across multiple resilient channels
 */
export async function sendLeadNotification(lead) {
  const customerName = lead.name || 'Valued Customer';
  const requestType = getFriendlyLeadType(lead.type);
  const cleanPhone = lead.phone ? String(lead.phone).replace(/\D/g, '') : '';
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Generate actionable one-click links
  const waCustomerLink = cleanPhone ? `https://wa.me/91${cleanPhone}` : 'N/A';
  const telLink = cleanPhone ? `tel:+91${cleanPhone}` : 'N/A';

  // Structured payload for email providers
  const payload = {
    _subject: `🔥 [STACKPULSE] ${requestType}: ${customerName} (${lead.businessName || 'Store'}) - ${lead.city || 'India'}`,
    _template: 'table',
    _captcha: 'false',
    ...(lead.email ? { _replyto: lead.email, email: lead.email } : {}),

    // Essential fields for Aniket to deliver the service/demo smoothly
    '📋 Request Type': requestType,
    '👤 Contact Person': customerName,
    '📱 Mobile / WhatsApp': lead.phone || 'Not provided',
    '💬 1-Click WhatsApp Customer': waCustomerLink,
    '📞 1-Click Call Customer': telLink,
    '📧 Email Address': lead.email || 'Not provided',
    '🏪 Store / Business Name': lead.businessName || 'Not provided',
    '📍 City & State': lead.city || 'Not specified',
    '🏢 Business Category': lead.businessType || 'Retail / Wholesale Mart',
    '🔢 Billing Counters / Volume': lead.counters || '1-2 Counters',
    '💻 Current Billing Method': lead.currentSoftware || 'Manual / Excel',
    ...(lead.preferredDate ? { '📅 Preferred Demo Date': lead.preferredDate } : {}),
    ...(lead.preferredTime ? { '⏰ Preferred Demo Time': lead.preferredTime } : {}),
    ...(lead.notes || lead.message ? { '💬 Requirements / Notes': lead.notes || lead.message } : {}),
    ...(lead.plan ? { '💳 Selected Plan': lead.plan } : {}),
    ...(lead.price ? { '💰 Value': `₹${lead.price}` } : {}),
    ...(lead.accountId ? { '🆔 Multi-Tenant ID': lead.accountId } : {}),
    '🕒 Received At': `${now} (IST)`,
    '🌐 Source Website': typeof window !== 'undefined' ? window.location.origin : 'https://stackpulse-phi.vercel.app'
  };

  const results = [];

  // ==========================================
  // CHANNEL 1: Web3Forms (if access key configured)
  // ==========================================
  const web3Key = getStoredWeb3FormsKey();
  if (web3Key) {
    try {
      const w3Payload = {
        access_key: web3Key,
        subject: payload._subject,
        from_name: 'StackPulse Leads Engine',
        to_email: TARGET_EMAIL,
        name: customerName,
        email: lead.email || 'leads@stackpulse.com',
        phone: lead.phone || '',
        message: formatLeadSummaryText(lead),
        ...payload
      };

      const w3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(w3Payload)
      });

      if (w3Res.ok) {
        const w3Data = await w3Res.json();
        console.log('[LeadNotification] Dispatched via Web3Forms:', w3Data);
        results.push({ channel: 'Web3Forms', success: true, data: w3Data });
        return { success: true, channel: 'Web3Forms', data: w3Data };
      } else {
        const errText = await w3Res.text();
        console.warn('[LeadNotification] Web3Forms non-200:', errText);
        results.push({ channel: 'Web3Forms', success: false, error: errText });
      }
    } catch (err) {
      console.warn('[LeadNotification] Web3Forms failed:', err);
      results.push({ channel: 'Web3Forms', success: false, error: err.message });
    }
  }

  // ==========================================
  // CHANNEL 2: Custom Webhook / Google Apps Script
  // ==========================================
  const webhookUrl = getStoredWebhookUrl();
  if (webhookUrl) {
    try {
      const hookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetEmail: TARGET_EMAIL,
          lead,
          summary: formatLeadSummaryText(lead),
          timestamp: now
        })
      });
      if (hookRes.ok) {
        console.log('[LeadNotification] Dispatched via Custom Webhook');
        results.push({ channel: 'Webhook', success: true });
        return { success: true, channel: 'Webhook' };
      }
    } catch (err) {
      console.warn('[LeadNotification] Webhook failed:', err);
      results.push({ channel: 'Webhook', success: false, error: err.message });
    }
  }

  // ==========================================
  // CHANNEL 3: FormSubmit (Fallback)
  // ==========================================
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (fsRes.ok) {
      const fsData = await fsRes.json();
      console.log('[LeadNotification] Dispatched via FormSubmit:', fsData);
      return { success: true, channel: 'FormSubmit', data: fsData };
    } else {
      const text = await fsRes.text();
      console.warn('[LeadNotification] FormSubmit returned error status:', fsRes.status, text);
      results.push({ channel: 'FormSubmit', success: false, status: fsRes.status, error: text });
    }
  } catch (err) {
    console.warn('[LeadNotification] FormSubmit network or 521 error:', err);
    results.push({ channel: 'FormSubmit', success: false, error: err.message });
  }

  // If online providers failed, return rich fallback helpers so UI and Admin can assist
  return {
    success: false,
    results,
    fallback: {
      ownerWhatsAppLink: buildOwnerWhatsAppLink(lead),
      mailtoLink: buildMailtoFallback(lead),
      summaryText: formatLeadSummaryText(lead)
    }
  };
}
