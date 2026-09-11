import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = ["/", "/consumers", "/businesses", "/download", "/support", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.origin}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
