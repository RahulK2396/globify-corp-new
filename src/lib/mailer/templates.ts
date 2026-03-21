import { escapeHtml } from "./utils";

export function buildLeadHtml(
  formName: string,
  fields: Record<string, unknown>,
): string {
  const safeFormName = escapeHtml(formName);

  const rows = Object.entries(fields)
    .filter(([, value]) => value && String(value).trim() !== "")
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding:12px 16px;font-weight:600;color:#1a1a2e;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #f0f0f0;width:40%;vertical-align:top;">${escapeHtml(key)}</td>
        <td style="padding:12px 16px;color:#333;font-size:14px;border-bottom:1px solid #f0f0f0;">${escapeHtml(String(value))}</td>
      </tr>`,
    )
    .join("");

  const now = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Dubai",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px 16px 0 0;padding:32px 32px 28px;text-align:center;">
      <img src="https://globify-corp.lovable.app/favicon.png" alt="Globify" width="48" height="48" style="display:block;margin:0 auto 12px;" />
      <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;text-transform:uppercase;">Design · Build · Scale</p>
    </div>
    <div style="background:#e8590c;padding:14px 32px;text-align:center;">
      <span style="color:#ffffff;font-size:14px;font-weight:700;letter-spacing:0.5px;">New Lead: ${safeFormName}</span>
    </div>
    <div style="background:#ffffff;padding:28px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
      <p style="margin:0 0 20px;font-size:14px;color:#666;line-height:1.5;">
        A new enquiry has been submitted through the <strong style="color:#1a1a2e;">${safeFormName}</strong> form on the website.
      </p>
      <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;border:1px solid #f0f0f0;">
        <thead>
          <tr>
            <th colspan="2" style="background:#fdf2ec;padding:10px 16px;text-align:left;font-size:12px;color:#e8590c;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Submission Details</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="margin-top:20px;padding:12px 16px;background:#f8f9fa;border-radius:8px;border-left:3px solid #e8590c;">
        <p style="margin:0;font-size:12px;color:#888;"><strong style="color:#555;">Received:</strong> ${now} (GST)</p>
        <p style="margin:4px 0 0;font-size:12px;color:#888;"><strong style="color:#555;">Source:</strong> globify.ae</p>
      </div>
    </div>
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
</html>`;
}

export function buildAutoReplyHtml(customerName: string): string {
  const safeCustomerName = escapeHtml(customerName);

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">
    <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px 16px 0 0;padding:32px 32px 28px;text-align:center;">
      <img src="https://globify-corp.lovable.app/favicon.png" alt="Globify" width="48" height="48" style="display:block;margin:0 auto 12px;" />
      <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Globify</h1>
      <p style="margin:4px 0 0;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:1.5px;text-transform:uppercase;">Design · Build · Scale</p>
    </div>
    <div style="background:#ffffff;padding:36px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
      <p style="margin:0 0 20px;font-size:16px;color:#1a1a2e;line-height:1.6;">Hello <strong>${safeCustomerName}</strong>,</p>
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
    <div style="background:#1a1a2e;border-radius:0 0 16px 16px;padding:24px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.5);">India · UAE · Germany</p>
      <p style="margin:0;font-size:12px;">
        <a href="https://globify.ae" style="color:#e8590c;text-decoration:none;">globify.ae</a>
        &nbsp;·&nbsp;
        <a href="mailto:sales@globify.in" style="color:rgba(255,255,255,0.5);text-decoration:none;">sales@globify.in</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}
