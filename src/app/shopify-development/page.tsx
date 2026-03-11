import type { Metadata } from "next";
import ShopifyDevelopment from "@/pages/ShopifyDevelopment";

export const metadata: Metadata = {
  title: "ShopifyDevelopment | Globify Corp",
  description: "",
};

export default function ShopifyDevelopmentPage() {
  return <ShopifyDevelopment />;
}
