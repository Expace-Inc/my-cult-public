import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use — MyCult",
  description: "Terms for using the MyCult app and website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:py-20">
      <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-forest/55">
        Legal
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Terms of Use</h1>
      <p className="mt-4 text-sm text-forest/55">Last updated 6 September 2026</p>
      <div className="mt-10 space-y-8 text-base leading-relaxed text-forest/80">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Acceptance</h2>
          <p>
            By using the MyCult app or website you agree to these terms. If you do not agree,
            do not use MyCult.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Account responsibility</h2>
          <p>
            You are responsible for the details you provide, for keeping your sign-in
            credentials safe, and for activity on your account. Tell us promptly at{" "}
            {site.email} if you believe your account has been used without your permission.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Loyalty points</h2>
          <p>
            Each business controls the rules of its own loyalty programme, including earn
            rates and rewards. MyCult is the platform that hosts wallets, identity, and
            cashier tools. Points are not cash, are not issued by a bank, and have value only
            under the programme that awarded them.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Acceptable use</h2>
          <p>
            Do not misuse MyCult—including attempting to award or redeem points you are not
            entitled to, interfering with the service, or using it for anything unlawful.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">App stores</h2>
          <p>
            Downloads through the App Store or Google Play are also subject to those stores’
            terms. Store operators are not responsible for MyCult content or support unless
            their own terms say otherwise.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Limitation of liability</h2>
          <p>
            MyCult is provided as available. To the fullest extent permitted by law, we are
            not liable for lost points, interrupted service, or indirect losses arising from
            use of the platform. This section will be refined with counsel before relying on
            it in a dispute.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Changes</h2>
          <p>
            We may update these terms. The date at the top of this page will change when we
            do. Continued use after an update means you accept the revised terms.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-forest">Contact</h2>
          <p>
            <a className="text-ember" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
