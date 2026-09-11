import type { Metadata } from "next";
import { OpenAppButton } from "@/components/open-app-button";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { StoreBadges } from "@/components/store-badges";
import { TiltCard } from "@/components/tilt-card";
import { WalletStack } from "@/components/wallet-stack";

export const metadata: Metadata = {
  title: "Download MyCult",
  description: "Get the MyCult app for iOS and Android.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        title="Download MyCult"
        lead="Get the app to join programmes, earn points, and keep your wallet with you."
      >
        <StoreBadges />
        <p className="mt-6 text-sm text-forest/65">Already installed?</p>
        <div className="mt-3">
          <OpenAppButton variant="outline" />
        </div>
      </PageHero>
      <Section>
        <TiltCard className="mx-auto max-w-md" innerClassName="bg-transparent">
          <WalletStack />
        </TiltCard>
      </Section>
    </>
  );
}
