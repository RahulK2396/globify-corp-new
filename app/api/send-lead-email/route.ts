import { NextRequest, NextResponse } from "next/server";
import {
  VALID_FORM_NAMES,
  MAX_FIELDS,
  MAX_FIELD_KEY_LENGTH,
  MAX_FIELD_VALUE_LENGTH,
  EMAIL_REGEX,
} from "@/lib/mailer/constants";
import { findField } from "@/lib/mailer/utils";
import { checkRateLimit } from "@/lib/mailer/rateLimit";
import { buildLeadHtml, buildAutoReplyHtml } from "@/lib/mailer/templates";
import { sendEmail } from "@/lib/mailer/sendEmail";

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rateLimit = checkRateLimit(ip);
  if (rateLimit.limited) {
    return NextResponse.json({ error: rateLimit.message }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { formName, fields } = body as Record<string, unknown>;

  // Validate formName
  if (
    typeof formName !== "string" ||
    !VALID_FORM_NAMES.includes(formName.trim())
  ) {
    return NextResponse.json(
      { error: "Invalid form submission." },
      { status: 400 },
    );
  }

  // Validate fields
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const typedFields = fields as Record<string, unknown>;
  const fieldEntries = Object.entries(typedFields);

  if (fieldEntries.length > MAX_FIELDS) {
    return NextResponse.json(
      { error: "Too many fields submitted." },
      { status: 400 },
    );
  }

  for (const [key, value] of fieldEntries) {
    if (typeof key !== "string" || key.length > MAX_FIELD_KEY_LENGTH) {
      return NextResponse.json(
        { error: "Invalid field name." },
        { status: 400 },
      );
    }
    if (
      value !== null &&
      value !== undefined &&
      String(value).length > MAX_FIELD_VALUE_LENGTH
    ) {
      return NextResponse.json(
        { error: "Field value too long." },
        { status: 400 },
      );
    }
  }

  const cleanFormName = formName.trim();

  // Build and send lead notification
  try {
    await sendEmail({
      from: "Globify Website <info@globify.in>",
      to: "info@globify.in",
      subject: `Contact Form - ${cleanFormName} - globify.ae`,
      html: buildLeadHtml(cleanFormName, typedFields),
    });
  } catch (err) {
    console.error("Lead email error:", err);
    return NextResponse.json(
      {
        error: "Unable to send email. Please try again later.",
        errorCode: "EMAIL_SEND_FAILED",
      },
      { status: 500 },
    );
  }

  // Auto-reply to customer (non-blocking)
  const customerName = findField(typedFields, ["full name", "name"]) || "there";
  const customerEmail = findField(typedFields, ["email"]);

  if (
    customerEmail &&
    EMAIL_REGEX.test(customerEmail) &&
    customerEmail.length <= 255
  ) {
    sendEmail({
      from: "Globify <info@globify.in>",
      to: customerEmail,
      subject: "Thank you for contacting Globify",
      html: buildAutoReplyHtml(customerName),
    }).catch((err) => console.error("Auto-reply error (non-blocking):", err));
  }

  return NextResponse.json({ success: true });
}
