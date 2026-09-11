import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — MyCult",
  description: "How MyCult collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-forest/55">
        Legal
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-sm text-forest/55">Last updated 6 September 2026</p>
      <div className="mt-10 space-y-8 text-base leading-relaxed text-forest/80">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Who we are</h2>
          <p>
            MyCult operates the MyCult mobile app and this website at {site.origin}. This
            policy explains how we collect, use, and protect information when you use MyCult.
            For questions, email{" "}
            <a className="text-ember" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Data we collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Account details such as email, phone number, and name</li>
            <li>Loyalty balances and programme memberships</li>
            <li>Device basics needed to run the app and keep it secure</li>
            <li>Support messages you send us</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">How we use data</h2>
          <p>
            We use this information to provide the app, award and display points, keep
            accounts secure, and respond to support requests. We do not sell your personal
            information.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Vendors and staff access</h2>
          <p>
            Businesses on MyCult can see members in their own programme as needed to operate
            loyalty—for example, to look you up at the till and award points. They do not
            receive access to other businesses’ programmes.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Processors</h2>
          <p>
            We use trusted processors to host the service and send transactional email or SMS.
            This includes infrastructure and authentication providers such as Supabase. These
            parties process data on our instructions.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Retention and deletion</h2>
          <p>
            We keep account and loyalty data while your account is active and as needed to
            operate programmes and meet legal duties. To request deletion, email {site.email}{" "}
            from your registered address with the subject “Delete my account”.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Sri Lanka and cross-border processing</h2>
          <p>
            MyCult is built for use in Sri Lanka. Some processors may store or process data
            outside Sri Lanka. Where that happens, we take steps appropriate to the service
            and applicable law.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Contact</h2>
          <p>
            Privacy questions:{" "}
            <a className="text-ember" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
