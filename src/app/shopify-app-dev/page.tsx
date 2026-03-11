import type { Metadata } from "next";
import ShopifyAppDev from "@/pages/ShopifyAppDev";

export const metadata: Metadata = {
  title: "ShopifyAppDev | Globify Corp",
  description: "",
};

export default function ShopifyAppDevPage() {
  return <ShopifyAppDev />;
}
