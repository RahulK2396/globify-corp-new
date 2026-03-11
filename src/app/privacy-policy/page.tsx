import type { Metadata } from "next";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

export const metadata: Metadata = {
  title: "PrivacyPolicy | Globify Corp",
  description: "",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
