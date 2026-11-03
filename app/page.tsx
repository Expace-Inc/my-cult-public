import Link from "next/link";
import { HexField } from "@/components/brand-mark";
import { buttonClass } from "@/components/button";
import { FeatureCard, WalletStack } from "@/components/wallet-stack";
import { Section, SectionHeading } from "@/components/section";
import { StoreBadges } from "@/components/store-badges";
import { DisplayWordmark } from "@/components/wordmark";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyCult — Your loyalty, unified",
  description:
    "One wallet for the places you love. Join programmes with a QR, earn at the till, keep rewards in MyCult.",
};

const steps = [
  {
    index: "01",
    title: "Join",
    body: "Scan the business QR or open their link.",
  },
  {
    index: "02",
    title: "Earn",
    body: "Pay as usual; staff award points in MyCult.",
  },
  {
    index: "03",
    title: "Return",
    body: "Keep balances in your wallet; show your member QR or phone when needed.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest text-white">
        <div className="hero-grid grain absolute inset-0" />
        <HexField className="pointer-events-none absolute inset-0 -scale-x-100 opacity-40 [mask-image:linear-gradient(90deg,black,transparent_55%)] lg:opacity-100" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <DisplayWordmark />
            <h1 className="pop-shadow font-display mt-6 max-w-xl text-4xl leading-[0.95] text-ember sm:text-6xl">
              Your loyalty, unified.
            </h1>
            <p className="mt-6 max-w-lg text-xl font-medium leading-relaxed text-white/80">
              One app for the cafés and shops you already love—join with a QR, earn at the till,
              keep it all in your wallet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/download" className={buttonClass("ember")}>
                Get the app
              </Link>
              <Link href="/businesses" className={buttonClass("ghost")}>
                For businesses
              </Link>
            </div>
          </div>
          <div className="float-idle">
            <WalletStack />
          </div>
        </div>
      </section>

      <Section className="bg-canvas">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            title="For members"
            body="Carry every card in one wallet. Scan to join a programme, earn when you pay, and show who you are when staff ask."
          />
          <FeatureCard
            index="Wallet"
            title="One place for every programme"
            body="Join in seconds, earn at the till, and keep each balance with you—no extra plastic."
          />
        </div>
      </Section>

      <Section className="bg-paper">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FeatureCard
            index="Counter"
            title="Award without slowing the queue"
            body="Staff look up a member, enter the bill, and confirm—points land where they belong."
          />
          <SectionHeading
            title="For businesses"
            body="Reward regulars without printing another plastic card. Staff look up a member, enter the bill, and confirm—points land where they belong."
          />
        </div>
      </Section>

      <Section>
        <SectionHeading title="How it works" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <FeatureCard key={step.title} index={step.index} title={step.title} body={step.body} />
          ))}
        </div>
      </Section>

      <Section className="relative overflow-hidden bg-ember text-white">
        <HexField className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply [mask-image:linear-gradient(270deg,black,transparent_60%)]" />
        <div className="relative max-w-2xl">
          <h2 className="pop-shadow font-display text-5xl leading-[0.92] sm:text-7xl">Get MyCult.</h2>
          <p className="mt-4 text-2xl font-bold">Available on iOS and Android.</p>
          <div className="mt-8">
            <Link href="/download" className={buttonClass("forest")}>
              Get the app
            </Link>
          </div>
          <div className="mt-6 text-base font-medium">
            <StoreBadges invert />
          </div>
        </div>
      </Section>
    </>
  );
}
