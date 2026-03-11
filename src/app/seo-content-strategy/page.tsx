import type { Metadata } from "next";
import SEOContentStrategy from "@/pages/SEOContentStrategy";

export const metadata: Metadata = {
  title: "SEOContentStrategy | Globify Corp",
  description: "",
};

export default function SEOContentStrategyPage() {
  return <SEOContentStrategy />;
}
