import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, 'dist');

// If dist directory does not exist (e.g. if Render build command was only "npm install"), build it
if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
  console.log('[Server] dist directory not found. Running "npm run build"...');
  try {
    execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
    console.log('[Server] Build completed successfully.');
  } catch (err) {
    console.error('[Server] Build failed:', err);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // Render health check endpoints
  if (req.url === '/health' || req.url === '/healthz' || req.url === '/_health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    return;
  }

  // Handle /api/send-lead endpoint
  if (req.url.startsWith('/api/send-lead')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const payload = JSON.parse(body || '{}');
          const TARGET_EMAIL = 'aniketraj1707@gmail.com';

          // Attempt FormSubmit
          try {
            const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify(payload)
            });
            if (fsRes.ok) {
              const data = await fsRes.json();
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, channel: 'FormSubmit', data }));
              return;
            }
          } catch (e) {
            console.warn('[Server] FormSubmit error:', e.message);
          }

          // Attempt ShipMyForm fallback
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
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, channel: 'ShipMyForm', data }));
              return;
            }
          } catch (e) {
            console.warn('[Server] ShipMyForm error:', e.message);
          }

          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Upstream mail relays temporarily offline' }));
        } catch (parseErr) {
          console.warn('[Server] Payload parse error:', parseErr.message);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON payload' }));
        }
      });
      return;
    }
  }

  // Parse requested URL path (strip query params / hashes)
  const cleanUrl = req.url ? req.url.split('?')[0].split('#')[0] : '/';
  let safePath = path.normalize(decodeURIComponent(cleanUrl)).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(distDir, safePath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(distDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Check if requested path is a directory or directly exists
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } catch {
    // Stat error, fallback below
  }

  // If file doesn't exist, fallback to dist/index.html (SPA routing support)
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  // If still not found, return 404
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found - Please build the project');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Cache headers
  const headers = { 'Content-Type': contentType };
  if (filePath.includes(`${path.sep}assets${path.sep}`)) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable';
  } else {
    headers['Cache-Control'] = 'no-cache';
  }

  res.writeHead(200, headers);
  fs.createReadStream(filePath).pipe(res);
});

const PORT = parseInt(process.env.PORT || '10000', 10);
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`🚀 STACKPULSE server running at http://${HOST}:${PORT}`);
  console.log(`📁 Serving static files from: ${distDir}`);
});
