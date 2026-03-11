const ALLOWED_ORIGINS = [
  'https://globify.ae',
  'https://www.globify.ae',
  'https://globify-corp.lovable.app',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  };
}

// Sanitize user input to prevent XSS/HTML injection in emails
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Allowed form names (allowlist)
const VALID_FORM_NAMES = [
  'Contact Us',
  'AI & Automation Audit',
  'Digital Transformation Audit',
  'ERP Consultation',
  'E-Commerce Consultation',
  'App Development Consultation',
  'Web Development Consultation',
  'Digital Marketing Consultation',
  'Shopify Development',
  'WooCommerce Development',
  'Magento Development',
  'Shopify Plus',
  'Shopify App Development',
  'Shopify Themes',
];

const MAX_FIELDS = 20;
const MAX_FIELD_KEY_LENGTH = 100;
const MAX_FIELD_VALUE_LENGTH = 2000;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting constants
const RATE_LIMIT_PER_MINUTE = 3;
const RATE_LIMIT_PER_HOUR = 10;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_HOUR_MS = 3_600_000; // 1 hour

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

async function checkRateLimit(req: Request, corsHeaders: Record<string, string>): Promise<Response | null> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const minuteKey = `rl:email:${clientIp}:m:${Math.floor(now / RATE_LIMIT_WINDOW_MS)}`;
  const hourKey = `rl:email:${clientIp}:h:${Math.floor(now / RATE_LIMIT_HOUR_MS)}`;

  // Clean up old entries (older than 2 hours)
  await supabase
    .from('rate_limits')
    .delete()
    .lt('window_start', new Date(now - 2 * RATE_LIMIT_HOUR_MS).toISOString());

  // Check minute limit
  const { data: minuteData } = await supabase
    .from('rate_limits')
    .select('count')
    .eq('key', minuteKey)
    .single();

  if (minuteData && minuteData.count >= RATE_LIMIT_PER_MINUTE) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again in a minute.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Check hour limit
  const { data: hourData } = await supabase
    .from('rate_limits')
    .select('count')
    .eq('key', hourKey)
    .single();

  if (hourData && hourData.count >= RATE_LIMIT_PER_HOUR) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Increment counters
  await supabase.from('rate_limits').upsert({
    key: minuteKey,
    count: (minuteData?.count || 0) + 1,
    window_start: new Date(now).toISOString(),
  });
  await supabase.from('rate_limits').upsert({
    key: hourKey,
    count: (hourData?.count || 0) + 1,
    window_start: new Date(now).toISOString(),
  });

  return null; // Not rate limited
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limit check
    const rateLimitResponse = await checkRateLimit(req, corsHeaders);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const formName = typeof body?.formName === 'string' ? body.formName.trim() : '';
    const fields = body?.fields;

    // Validate formName against allowlist
    if (!formName || !VALID_FORM_NAMES.includes(formName)) {
      return new Response(JSON.stringify({ error: 'Invalid form submission.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate fields object
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      return new Response(JSON.stringify({ error: 'Invalid form data.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enforce field count and size limits
    const fieldEntries = Object.entries(fields);
    if (fieldEntries.length > MAX_FIELDS) {
      return new Response(JSON.stringify({ error: 'Too many fields submitted.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    for (const [key, value] of fieldEntries) {
      if (typeof key !== 'string' || key.length > MAX_FIELD_KEY_LENGTH) {
        return new Response(JSON.stringify({ error: 'Invalid field name.' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (value !== null && value !== undefined && String(value).length > MAX_FIELD_VALUE_LENGTH) {
        return new Response(JSON.stringify({ error: 'Field value too long.' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Email service unavailable. Please try again later.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const safeFormName = escapeHtml(formName);
    const subject = `Contact Form - ${safeFormName} - globify.ae`;

    // Build HTML body from fields (sanitized)
    const rows = Object.entries(fields)
      .filter(([, value]) => value && String(value).trim() !== '')
      .map(([key, value]) => `
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#1a1a2e;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #f0f0f0;width:40%;vertical-align:top;">${escapeHtml(key)}</td>
          <td style="padding:12px 16px;color:#333;font-size:14px;border-bottom:1px solid #f0f0f0;">${escapeHtml(String(value))}</td>
        </tr>`)
      .join('');

    const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai', dateStyle: 'medium', timeStyle: 'short' });

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);border-radius:16px 16px 0 0;padding:32px 32px 28px;text-align:center;">
      <Image src="https://globify-corp.lovable.app/favicon.png" alt="Globify" width="48" height="48" style="display:block;margin:0 auto 12px;" />
      <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;text-transform:uppercase;">Design · Build · Scale</p>
    </div>

    <!-- Badge -->
    <div style="background:#e8590c;padding:14px 32px;text-align:center;">
      <span style="color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.5px;">New Lead: ${safeFormName}</span>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:28px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">

      <p style="margin:0 0 20px;font-size:14px;color:#666;line-height:1.5;">
        A new enquiry has been submitted through the <strong style="color:#1a1a2e;">${safeFormName}</strong> form on the website.
      </p>

      <!-- Data Table -->
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #f0f0f0;">
        <thead>
          <tr>
            <th colspan="2" style="background:#fdf2ec;padding:10px 16px;text-align:left;font-size:12px;color:#e8590c;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Submission Details</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <!-- Timestamp -->
      <div style="margin-top:20px;padding:12px 16px;background:#f8f9fa;border-radius:8px;border-left:3px solid #e8590c;">
        <p style="margin:0;font-size:12px;color:#888;">
          <strong style="color:#555;">Received:</strong> ${now} (GST)
        </p>
        <p style="margin:4px 0 0;font-size:12px;color:#888;">
          <strong style="color:#555;">Source:</strong> globify.ae
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#1a1a2e;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.7);">
        This is an automated notification from <strong style="color:#e8590c;">Globify</strong>
      </p>
      <div style="margin:12px 0;border-top:1px solid rgba(255,255,255,0.1);"></div>
      <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.35);">
        India · UAE · Germany &nbsp;|&nbsp; <a href="https://globify.ae" style="color:#e8590c;text-decoration:none;">globify.ae</a>
      </p>
    </div>

  </div>
</body>
</html>
    `;

    // Extract customer name and email for auto-reply (check common field key variations)
    const findField = (keys: string[]) => {
      for (const k of keys) {
        for (const [fk, fv] of Object.entries(fields)) {
          if (fk.toLowerCase().includes(k.toLowerCase()) && fv && String(fv).trim()) return String(fv).trim();
        }
      }
      return '';
    };
    const customerName = findField(['full name', 'name']) || 'there';
    const customerEmail = findField(['email']);
    const safeCustomerName = escapeHtml(customerName);

    // Send lead notification to sales team
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Globify Website <noreply@seo.globify.ae>',
        to: ['sales@globify.in'],
        subject,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', { status: res.status, data });
      return new Response(JSON.stringify({ error: 'Unable to send email. Please try again later or contact support.', errorCode: 'EMAIL_SEND_FAILED' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send auto-reply to the customer
    if (customerEmail && EMAIL_REGEX.test(customerEmail) && customerEmail.length <= 255) {
      const autoReplyHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);border-radius:16px 16px 0 0;padding:32px 32px 28px;text-align:center;">
      <Image src="https://globify-corp.lovable.app/favicon.png" alt="Globify" width="48" height="48" style="display:block;margin:0 auto 12px;" />
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Globify</h1>
      <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;text-transform:uppercase;">Design · Build · Scale</p>
    </div>

    <!-- Body -->
    <div style="background:#ffffff;padding:36px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">

      <p style="margin:0 0 20px;font-size:16px;color:#1a1a2e;line-height:1.6;">
        Hello <strong>${safeCustomerName}</strong>,
      </p>

      <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.7;">
        Thank you for reaching out to <strong style="color:#e8590c;">Globify</strong>.
      </p>

      <p style="margin:0 0 16px;font-size:14px;color:#555;line-height:1.7;">
        We have received your enquiry and our team will review your requirements and get back to you within <strong style="color:#1a1a2e;">24 hours</strong>.
      </p>

      <p style="margin:0 0 24px;font-size:14px;color:#555;line-height:1.7;">
        If your request is urgent, you may also contact us directly at
        <a href="mailto:sales@globify.in" style="color:#e8590c;text-decoration:none;font-weight:600;">sales@globify.in</a>
      </p>

      <div style="border-top:1px solid #f0f0f0;padding-top:20px;margin-top:8px;">
        <p style="margin:0;font-size:14px;color:#555;">Regards,</p>
        <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#1a1a2e;">Globify Team</p>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#1a1a2e;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.5);">
        India · UAE · Germany
      </p>
      <p style="margin:0;font-size:12px;">
        <a href="https://globify.ae" style="color:#e8590c;text-decoration:none;">globify.ae</a>
        &nbsp;·&nbsp;
        <a href="mailto:sales@globify.in" style="color:rgba(255,255,255,0.5);text-decoration:none;">sales@globify.in</a>
      </p>
    </div>

  </div>
</body>
</html>
      `;

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Globify <noreply@seo.globify.ae>',
            to: [customerEmail],
            subject: 'Thank you for contacting Globify',
            html: autoReplyHtml,
          }),
        });
      } catch (replyErr) {
        console.error('Auto-reply error (non-blocking):', replyErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Edge function error:', error);
    const corsHeaders = getCorsHeaders(req);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
