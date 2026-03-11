import type { Metadata } from "next";
import IndustrySupplyChain from "@/pages/IndustrySupplyChain";

export const metadata: Metadata = {
  title: "IndustrySupplyChain | Globify Corp",
  description: "",
};

export default function IndustrySupplyChainPage() {
  return <IndustrySupplyChain />;
}
