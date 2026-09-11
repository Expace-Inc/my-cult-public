"use server";

import { site } from "@/lib/site";

export type LeadResult =
  | { ok: true; mailto?: string }
  | { ok: false; message: string };

const errorCopy = `Something went wrong. Email us at ${site.email}.`;

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitLead(formData: FormData): Promise<LeadResult> {
  const name = readField(formData, "name");
  const business = readField(formData, "business");
  const city = readField(formData, "city");
  const email = readField(formData, "email");
  const phone = readField(formData, "phone");
  const message = readField(formData, "message");

  if (!name || !business || !email) {
    return { ok: false, message: errorCopy };
  }

  const payload = {
    name,
    business,
    city,
    email,
    phone,
    message,
    source: "www.my-cult.com/businesses",
  };

  const formspreeId = process.env.FORMSPREE_FORM_ID;
  const webhook = process.env.LEAD_WEBHOOK_URL;

  try {
    if (formspreeId) {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) return { ok: false, message: errorCopy };
      return { ok: true };
    }

    if (webhook) {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) return { ok: false, message: errorCopy };
      return { ok: true };
    }
  } catch {
    return { ok: false, message: errorCopy };
  }

  const body = [
    `Name: ${name}`,
    `Business: ${business}`,
    `City: ${city}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    "",
    message,
  ].join("\n");

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `MyCult business enquiry — ${business}`,
  )}&body=${encodeURIComponent(body)}`;

  return { ok: true, mailto };
}
