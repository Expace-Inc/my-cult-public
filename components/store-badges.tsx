import { buttonClass } from "@/components/button";
import { site } from "@/lib/site";

export function StoreBadges({ invert = false }: { invert?: boolean }) {
  const storesReady = Boolean(site.appStoreUrl || site.playStoreUrl);

  if (!storesReady) {
    return (
      <p className={invert ? "text-white/75" : "text-forest/70"}>
        MyCult is coming to the App Store and Google Play. Prefer TestFlight or a
        preview build? Email{" "}
        <a className="underline underline-offset-4 hover:text-ember" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {site.appStoreUrl ? (
        <a href={site.appStoreUrl} className={buttonClass(invert ? "ghost" : "forest")}>
          Download on the App Store
        </a>
      ) : null}
      {site.playStoreUrl ? (
        <a href={site.playStoreUrl} className={buttonClass(invert ? "ghost" : "outline")}>
          Get it on Google Play
        </a>
      ) : null}
    </div>
  );
}
