import { createClient, type EmailOtpType } from "@supabase/supabase-js";

export const emailOtpTypes: EmailOtpType[] = [
  "email",
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
];

export function parseEmailOtpType(value: string | null): EmailOtpType {
  return value && emailOtpTypes.includes(value as EmailOtpType)
    ? (value as EmailOtpType)
    : "email";
}

export async function verifyEmailToken(tokenHash: string, type: EmailOtpType) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("config");
  }

  const supabase = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  });

  if (error) throw error;
}
