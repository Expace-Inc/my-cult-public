import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth/", "/join", "/identify"],
    },
    sitemap: `${site.origin}/sitemap.xml`,
    host: site.origin,
  };
}
