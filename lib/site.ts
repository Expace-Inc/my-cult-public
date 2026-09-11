export const site = {
  name: "MyCult",
  origin: "https://www.my-cult.com",
  email: "support@my-cult.com",
  scheme: process.env.NEXT_PUBLIC_APP_SCHEME ?? "mycult",
  bundleId: "com.mycult.app",
  appStoreUrl: process.env.NEXT_PUBLIC_APP_STORE_URL ?? "",
  playStoreUrl: process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "",
} as const;

export const nav = [
  { href: "/consumers", label: "Members" },
  { href: "/businesses", label: "Businesses" },
  { href: "/download", label: "Download" },
  { href: "/support", label: "Support" },
] as const;

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.origin}${normalized}`;
}
