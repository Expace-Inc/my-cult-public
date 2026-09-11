"use client";

import { useState, type FormEvent } from "react";
import { submitLead } from "@/lib/actions/lead";
import { buttonClass } from "./button";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "business", label: "Business name", type: "text", required: true },
  { name: "city", label: "City", type: "text", required: false },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
] as const;

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const result = await submitLead(new FormData(form));

    if (!result.ok) {
      setStatus("error");
      setMessage(result.message);
      return;
    }

    if (result.mailto) {
      window.location.href = result.mailto;
    }

    setStatus("success");
    setMessage("Thanks—we’ll get back to you shortly.");
    form.reset();
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl bg-paper px-5 py-8 text-center text-base text-forest ring-1 ring-mist">
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      {fields.map((field) => (
        <label key={field.name} className="grid gap-1.5 text-[13px] font-medium">
          {field.label}
          <input
            name={field.name}
            type={field.type}
            required={field.required}
            className="rounded-xl bg-paper px-3 py-3 text-base font-normal ring-1 ring-mist outline-none focus:ring-2 focus:ring-ember"
          />
        </label>
      ))}
      <label className="grid gap-1.5 text-[13px] font-medium">
        Message
        <textarea
          name="message"
          rows={4}
          className="resize-y rounded-xl bg-paper px-3 py-3 text-base font-normal ring-1 ring-mist outline-none focus:ring-2 focus:ring-ember"
        />
      </label>
      {status === "error" ? (
        <p className="text-sm text-ember" role="alert">
          {message}
        </p>
      ) : null}
      <button type="submit" className={buttonClass("ember")} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
