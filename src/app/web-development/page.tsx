import type { Metadata } from "next";
import WebDevelopment from "@/pages/WebDevelopment";

export const metadata: Metadata = {
  title: "WebDevelopment | Globify Corp",
  description: "",
};

export default function WebDevelopmentPage() {
  return <WebDevelopment />;
}
