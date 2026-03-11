import type { Metadata } from "next";
import AboutUs from "@/_pages_backup/AboutUs";

export const metadata: Metadata = {
  title: "About Us | Globify Corp",
  description: "",
};

export default function AboutUsPage() {
  return <AboutUs />;
}
