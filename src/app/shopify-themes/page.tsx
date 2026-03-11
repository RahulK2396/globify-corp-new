import type { Metadata } from "next";
import ShopifyThemes from "@/pages/ShopifyThemes";

export const metadata: Metadata = {
  title: "ShopifyThemes | Globify Corp",
  description: "",
};

export default function ShopifyThemesPage() {
  return <ShopifyThemes />;
}
