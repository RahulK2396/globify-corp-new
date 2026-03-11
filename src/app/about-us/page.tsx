import type { Metadata } from "next";
import AboutUs from "@/pages/AboutUs";

export const metadata: Metadata = {
  title: "AboutUs | Globify Corp",
  description: "",
};

export default function AboutUsPage() {
  return <AboutUs />;
}
