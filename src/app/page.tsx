import type { Metadata } from "next";
import Index from "@/pages/Index";

export const metadata: Metadata = {
  title: "Globify Corp",
  description: "",
};

export default function HomePage() {
  return <Index />;
}
