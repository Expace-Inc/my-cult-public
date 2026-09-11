import Link from "next/link";
import { buttonClass } from "@/components/button";
import { FeatureCard, WalletStack } from "@/components/wallet-stack";
import { Section, SectionHeading } from "@/components/section";
import { StoreBadges } from "@/components/store-badges";
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
        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="font-display text-5xl leading-none text-ember sm:text-6xl">MyCult</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight sm:text-6xl sm:leading-[1.05]">
              Your loyalty, unified.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
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

      <Section className="bg-forest text-white">
        <div className="max-w-2xl">
          <p className="font-display text-4xl text-ember">Get MyCult</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Available on iOS and Android.</h2>
          <div className="mt-8">
            <Link href="/download" className={buttonClass("ember")}>
              Get the app
            </Link>
          </div>
          <div className="mt-6 text-sm">
            <StoreBadges invert />
          </div>
        </div>
      </Section>
    </>
  );
}
