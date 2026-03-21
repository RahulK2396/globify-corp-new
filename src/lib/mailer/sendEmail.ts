export async function sendEmail({
  to,
  subject,
  html,
  from = "Globify Website <noreply@seo.globify.ae>",
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(`Resend error ${res.status}: ${JSON.stringify(data)}`);
  }
}
