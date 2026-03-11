import type { Metadata } from "next";
import TermsOfService from "@/_pages_backup/TermsOfService";

export const metadata: Metadata = {
  title: "TermsOfService | Globify Corp",
  description: "",
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
