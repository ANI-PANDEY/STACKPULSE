/**
 * StackPulse Multi-Channel Lead Notification Service
 * Dispatches comprehensive lead alerts to aniketraj1707@gmail.com
 * Supports FormSubmit (formsubmit.co), Backend API (/api/send-lead),
 * ShipMyForm instant relay, Web3Forms, Google Apps Script / Webhooks,
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
    `📋 Request Type: ${requestType}`,
    `👤 Customer Name: ${customerName}`,
    `📱 Phone / WhatsApp: ${lead.phone || 'Not provided'}`,
    `📧 Customer Email: ${lead.email || 'Not provided'}`,
    `🏪 Business / Store Name: ${lead.businessName || 'Not provided'}`,
    `📍 City & State: ${lead.city || 'Not provided'}`,
    `🏢 Business Category: ${lead.businessType || 'Wholesale / Retail Store'}`,
    lead.counters ? `🔢 Billing Counters: ${lead.counters}` : null,
    lead.currentSoftware ? `💻 Current System: ${lead.currentSoftware}` : null,
    lead.preferredDate ? `📅 Preferred Demo Date: ${lead.preferredDate}` : null,
    lead.preferredTime ? `⏰ Preferred Demo Time: ${lead.preferredTime}` : null,
    lead.notes || lead.message ? `💬 Requirements: ${lead.notes || lead.message}` : null,
    lead.plan ? `💳 Selected Plan: ${lead.plan}` : null,
    lead.price ? `💰 Total Value: ₹${lead.price}` : null,
    lead.accountId ? `🆔 Account ID: ${lead.accountId}` : null,
    `----------------------------------`,
    cleanPhone ? `👉 Click to WhatsApp: https://wa.me/91${cleanPhone}` : null,
    cleanPhone ? `👉 Click to Call: tel:+91${cleanPhone}` : null,
    lead.email ? `👉 Email Customer: mailto:${lead.email}` : null,
    `🕒 Received At: ${now} (IST)`,
    `🌐 Source Website URL: ${typeof window !== 'undefined' ? window.location.origin : 'https://stackpulse-phi.vercel.app'}`
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
 * Builds a direct customer greeting WhatsApp link with prefilled message
 */
export function buildCustomerWhatsAppLink(lead) {
  const cleanPhone = lead.phone ? String(lead.phone).replace(/\D/g, '') : '';
  if (!cleanPhone) return '#';
  const customerName = lead.name || 'Sir';
  const requestType = getFriendlyLeadType(lead.type);
  const text = encodeURIComponent(
    `Hello ${customerName}! Thank you for your interest in STACKPULSE. We received your ${requestType} request for ${lead.businessName || 'your business'}. When would be a good time to connect?`
  );
  return `https://wa.me/91${cleanPhone}?text=${text}`;
}

/**
 * Builds a pre-composed mailto: link for instant fallback email
 */
export function buildMailtoFallback(lead) {
  const customerName = lead.name || 'Customer';
  const requestType = getFriendlyLeadType(lead.type);
  const subject = encodeURIComponent(`🔥 New ${requestType}: ${customerName} (${lead.businessName || 'Store'})`);
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
  const sourceUrl = typeof window !== 'undefined' ? window.location.origin : 'https://stackpulse-phi.vercel.app';

  // Interactive WhatsApp greeting link for Aniket
  const waGreeting = encodeURIComponent(
    `Hello ${customerName}! Thank you for your interest in STACKPULSE. We received your ${requestType} request for ${lead.businessName || 'your business'}. When would be a good time to connect?`
  );
  const waLink = cleanPhone ? `https://wa.me/91${cleanPhone}?text=${waGreeting}` : 'N/A';
  const telLink = cleanPhone ? `tel:+91${cleanPhone}` : 'N/A';

  // EXACT payload structure as requested
  const payload = {
    _subject: `🔥 New ${requestType}: ${customerName} (${lead.businessName || 'Store'})`,
    _template: 'table',
    _captcha: 'false',
    ...(lead.email ? { _replyto: lead.email, email: lead.email } : {}),

    // Required fields in exact order
    'Request Type': requestType,
    'Customer Name': customerName,
    'Phone / WhatsApp': lead.phone || 'Not provided',
    'Click to WhatsApp': waLink,
    'Click to Call': telLink,
    'Customer Email': lead.email || 'Not provided',
    'Business / Store Name': lead.businessName || 'Not provided',
    'Business Category': lead.businessType || 'Wholesale / Retail Store',
    'City & State': lead.city || 'Not specified',
    ...(lead.counters ? { 'Billing Counters': lead.counters } : {}),
    ...(lead.currentSoftware ? { 'Current System': lead.currentSoftware } : {}),
    ...(lead.preferredDate ? { 'Preferred Demo Date': lead.preferredDate } : {}),
    ...(lead.preferredTime ? { 'Preferred Demo Time': lead.preferredTime } : {}),
    ...(lead.notes || lead.message ? { 'Requirements / Notes': lead.notes || lead.message } : {}),
    ...(lead.plan ? { 'Selected Plan': lead.plan } : {}),
    ...(lead.price ? { 'Total Value': `₹${lead.price}` } : {}),
    ...(lead.accountId ? { 'Account ID': lead.accountId } : {}),
    'Source Website URL': sourceUrl,
    'Received At': `${now} (IST)`
  };

  // ==========================================================
  // CHANNEL 1: Internal API Route (/api/send-lead)
  // ==========================================================
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const apiRes = await fetch('/api/send-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (apiRes.ok) {
      const data = await apiRes.json();
      console.log('[LeadNotification] Dispatched via /api/send-lead:', data);
      return { success: true, channel: data.channel || 'Internal API', data };
    }
  } catch (apiErr) {
    console.warn('[LeadNotification] /api/send-lead failed or skipped:', apiErr.message);
  }

  // ==========================================================
  // CHANNEL 2: Direct FormSubmit AJAX (https://formsubmit.co/ajax/...)
  // ==========================================================
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

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
    }
  } catch (fsErr) {
    console.warn('[LeadNotification] FormSubmit relay notice (521 or network):', fsErr.message);
  }

  // ==========================================================
  // CHANNEL 3: ShipMyForm Instant Relay (https://shipmyform.com/to/...)
  // ==========================================================
  try {
    const smfRes = await fetch(`https://shipmyform.com/to/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (smfRes.ok) {
      const smfData = await smfRes.json();
      if (smfData.ok || smfData.success) {
        console.log('[LeadNotification] Dispatched via ShipMyForm:', smfData);
        return { success: true, channel: 'ShipMyForm', data: smfData };
      }
    }
  } catch (smfErr) {
    console.warn('[LeadNotification] ShipMyForm relay notice:', smfErr.message);
  }

  // ==========================================================
  // CHANNEL 4: Web3Forms (if key configured)
  // ==========================================================
  const web3Key = getStoredWeb3FormsKey();
  if (web3Key) {
    try {
      const w3Payload = {
        access_key: web3Key,
        subject: payload._subject,
        from_name: 'StackPulse Leads Engine',
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
        return { success: true, channel: 'Web3Forms', data: w3Data };
      }
    } catch (w3Err) {
      console.warn('[LeadNotification] Web3Forms notice:', w3Err.message);
    }
  }

  // ==========================================================
  // CHANNEL 5: Custom Webhook (if configured)
  // ==========================================================
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
        return { success: true, channel: 'Webhook' };
      }
    } catch (hookErr) {
      console.warn('[LeadNotification] Webhook notice:', hookErr.message);
    }
  }

  // Fallback metadata so UI can present immediate alternatives
  return {
    success: false,
    error: 'Notification servers temporarily busy or offline',
    fallback: {
      ownerWhatsAppLink: buildOwnerWhatsAppLink(lead),
      customerWhatsAppLink: buildCustomerWhatsAppLink(lead),
      mailtoLink: buildMailtoFallback(lead),
      summaryText: formatLeadSummaryText(lead)
    }
  };
}
