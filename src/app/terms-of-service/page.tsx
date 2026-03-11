import type { Metadata } from "next";
import TermsOfService from "@/pages/TermsOfService";

export const metadata: Metadata = {
  title: "TermsOfService | Globify Corp",
  description: "",
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
