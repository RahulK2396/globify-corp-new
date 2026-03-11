import type { Metadata } from "next";
import Sitemap from "@/pages/Sitemap";

export const metadata: Metadata = {
  title: "Sitemap | Globify Corp",
  description: "",
};

export default function SitemapPage() {
  return <Sitemap />;
}
