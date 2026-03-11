import type { Metadata } from "next";
import PaidAdvertising from "@/pages/PaidAdvertising";

export const metadata: Metadata = {
  title: "PaidAdvertising | Globify Corp",
  description: "",
};

export default function PaidAdvertisingPage() {
  return <PaidAdvertising />;
}
