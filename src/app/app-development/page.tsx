import type { Metadata } from "next";
import AppDevelopment from "@/pages/AppDevelopment";

export const metadata: Metadata = {
  title: "AppDevelopment | Globify Corp",
  description: "",
};

export default function AppDevelopmentPage() {
  return <AppDevelopment />;
}
