import Link from "next/link";
import type { Metadata } from "next";
import { buttonClass } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { FeatureCard, WalletStack } from "@/components/wallet-stack";

export const metadata: Metadata = {
  title: "MyCult for members",
  description:
    "Carry every loyalty card in one app. Join with a scan, earn points, show who you are in-store.",
  alternates: { canonical: "/consumers" },
};

const blocks = [
  {
    index: "01",
    title: "Join in seconds",
    body: "Scan a MyCult QR at the counter or open a join link. You’re in the programme—no extra plastic.",
  },
  {
    index: "02",
    title: "Earn at the till",
    body: "Staff award points when you purchase. Balances show in your wallet when you’re signed in.",
  },
  {
    index: "03",
    title: "Identify with confidence",
    body: "Show your in-app member QR or give your phone number so staff can find you quickly.",
  },
];

export default function ConsumersPage() {
  return (
    <>
      <PageHero
        title="Loyalty that travels with you"
        lead="Stop juggling stamps and forgotten apps. MyCult keeps each business’s programme in one wallet."
      >
        <Link href="/download" className={buttonClass("ember")}>
          Get the app
        </Link>
      </PageHero>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <WalletStack />
          <div className="grid gap-5">
            {blocks.map((block) => (
              <FeatureCard key={block.title} {...block} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
