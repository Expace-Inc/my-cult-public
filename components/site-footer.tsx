import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/lib/site";

const links = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest text-mist">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Wordmark invert className="text-3xl" />
          <p className="text-base font-medium text-white/60">© {new Date().getFullYear()} MyCult</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <nav className="flex gap-6 text-base font-extrabold uppercase tracking-wide">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ember">
                {link.label}
              </Link>
            ))}
          </nav>
          <a href={`mailto:${site.email}`} className="text-base font-medium text-white/60 hover:text-ember">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
