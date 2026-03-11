import type { Metadata } from "next";
import HireDevelopers from "@/pages/HireDevelopers";

export const metadata: Metadata = {
  title: "HireDevelopers | Globify Corp",
  description: "",
};

export default function HireDevelopersPage() {
  return <HireDevelopers />;
}
