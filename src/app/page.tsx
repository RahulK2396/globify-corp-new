import type { Metadata } from "next";
import Index from "@/_pages_backup/Index";

export const metadata: Metadata = {
  title: "Globify Corp",
  description: "",
};

export default function HomePage() {
  return <Index />;
}
