import type { Metadata } from "next";
import ShopifyPlus from "@/pages/ShopifyPlus";

export const metadata: Metadata = {
  title: "ShopifyPlus | Globify Corp",
  description: "",
};

export default function ShopifyPlusPage() {
  return <ShopifyPlus />;
}
