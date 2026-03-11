import type { Metadata } from "next";
import Sitemap from "@/_pages_backup/Sitemap";

export const metadata: Metadata = {
  title: "Sitemap | Globify Corp",
  description: "",
};

export default function SitemapPage() {
  return <Sitemap />;
}
