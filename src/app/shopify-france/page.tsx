import type { Metadata } from "next";
import ShopifyFrance from "@/pages/ShopifyFrance";

export const metadata: Metadata = {
  title: "ShopifyFrance | Globify Corp",
  description: "",
};

export default function ShopifyFrancePage() {
  return <ShopifyFrance />;
}
