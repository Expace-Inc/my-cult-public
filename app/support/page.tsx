import Link from "next/link";
import type { Metadata } from "next";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { buttonClass } from "@/components/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "MyCult Support",
  description: "Help with sign-in, email confirmation, password reset, and your account.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        title="Support"
        lead="We’re here to help with the MyCult app and your account."
      >
        <p className="text-base text-forest/80">
          Email{" "}
          <a className="font-semibold text-ember" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          — we aim to reply within 2 business days.
        </p>
        <a href={`mailto:${site.email}`} className={`${buttonClass("ember")} mt-6`}>
          Email support
        </a>
      </PageHero>
      <Section>
        <FaqList
          items={[
            {
              question: "I signed up but can’t sign in",
              answer:
                "Check your email for a confirmation link from MyCult. Open it, then sign in with your email and password in the app.",
            },
            {
              question: "I didn’t get the confirmation email",
              answer:
                "Check spam/junk. Still missing? Email support with the address you used to register.",
            },
            {
              question: "How do I reset my password?",
              answer: (
                <>
                  Use <strong>Forgot password</strong> in the app or{" "}
                  <Link href="/auth/forgot-password" className="font-medium text-ember">
                    reset on the web
                  </Link>
                  . We’ll email a secure link. The link expires—request a new one if needed.
                </>
              ),
            },
            {
              question: "How do I delete my account?",
              answer: `Email ${site.email} from your registered address with subject “Delete my account”. We’ll confirm and process your request.`,
            },
            {
              question: "I’m a business—how do I join?",
              answer: (
                <>
                  See{" "}
                  <Link href="/businesses" className="font-medium text-ember">
                    For businesses
                  </Link>{" "}
                  or email support with your business name and city.
                </>
              ),
            },
          ]}
        />
      </Section>
    </>
  );
}
