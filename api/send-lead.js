/**
 * Vercel Serverless Function: /api/send-lead
 * Relays lead notifications securely with CORS headers and multi-provider failover.
 */

const TARGET_EMAIL = 'aniketraj1707@gmail.com';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = req.body;
    if (!payload) {
      res.status(400).json({ success: false, error: 'Missing lead payload' });
      return;
    }

    // Attempt Provider 1: FormSubmit AJAX
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (fsRes.ok) {
        const data = await fsRes.json();
        res.status(200).json({ success: true, channel: 'FormSubmit', data });
        return;
      }
    } catch (fsErr) {
      console.warn('[Serverless API] FormSubmit error:', fsErr.message);
    }

    // Attempt Provider 2: ShipMyForm Instant Relay
    try {
      const smfRes = await fetch(`https://shipmyform.com/to/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': payload['Source Website URL'] || 'https://stackpulse-phi.vercel.app',
          'Referer': payload['Source Website URL'] || 'https://stackpulse-phi.vercel.app/'
        },
        body: JSON.stringify(payload)
      });
      if (smfRes.ok) {
        const data = await smfRes.json();
        res.status(200).json({ success: true, channel: 'ShipMyForm', data });
        return;
      }
    } catch (smfErr) {
      console.warn('[Serverless API] ShipMyForm error:', smfErr.message);
    }

    // Attempt Provider 3: Web3Forms (if access key present)
    const web3Key = process.env.VITE_WEB3FORMS_ACCESS_KEY || process.env.WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      try {
        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            ...payload
          })
        });
        if (w3Res.ok) {
          const data = await w3Res.json();
          res.status(200).json({ success: true, channel: 'Web3Forms', data });
          return;
        }
      } catch (w3Err) {
        console.warn('[Serverless API] Web3Forms error:', w3Err.message);
      }
    }

    // If external providers are temporarily unreachable
    res.status(503).json({
      success: false,
      error: 'Upstream mail delivery relays are temporarily offline',
      recipient: TARGET_EMAIL
    });
  } catch (err) {
    console.error('[Serverless API] Fatal handler error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
}
