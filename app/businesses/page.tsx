import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { TiltCard } from "@/components/tilt-card";
import { FeatureCard } from "@/components/wallet-stack";

export const metadata: Metadata = {
  title: "MyCult for businesses",
  description:
    "Reward regulars without another plastic card. Simple cashier awards and programmes built for Sri Lanka.",
  alternates: { canonical: "/businesses" },
};

const blocks = [
  {
    index: "01",
    title: "Cashier-ready",
    body: "Look up a member by QR or phone, enter the bill amount, confirm the award. Built for speed and fewer mistakes.",
  },
  {
    index: "02",
    title: "Your programme, their wallet",
    body: "Members keep your card in MyCult. You keep control of earn rules and staff access.",
  },
  {
    index: "03",
    title: "Built for Sri Lanka rollout",
    body: "Phone-friendly identity, practical in-store flows, room to grow into broader coalition rewards later.",
  },
];

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        title="Reward regulars. Keep it simple at the counter."
        lead="MyCult helps cafés and retailers run a clear loyalty programme—without slowing the queue."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {blocks.map((block) => (
            <FeatureCard key={block.title} {...block} />
          ))}
        </div>
      </Section>
      <Section className="bg-paper">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ember">
              Talk to us
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Tell us about your business
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-forest/75">
              Share a few details and we’ll get back to you. Prefer email? Write to support@my-cult.com.
            </p>
            <TiltCard className="mt-8 hidden lg:block" innerClassName="bg-forest text-white">
              <div className="p-6">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                  Cashier
                </p>
                <p className="mt-3 text-2xl font-semibold">Look up. Enter. Confirm.</p>
                <div className="mt-6 space-y-3 text-sm text-white/75">
                  <div className="flex justify-between rounded-xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                    <span>Member</span>
                    <span className="tabular text-white">077 123 4567</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-white/8 px-4 py-3 ring-1 ring-white/10">
                    <span>Bill</span>
                    <span className="tabular text-white">LKR 1,850</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-ember px-4 py-3 text-white">
                    <span>Award</span>
                    <span className="tabular">+18 pts</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
          <LeadForm />
        </div>
      </Section>
    </>
  );
}
