import type { Metadata } from "next";
import Resources from "@/pages/Resources";

export const metadata: Metadata = {
  title: "Resources | Globify Corp",
  description: "",
};

export default function ResourcesPage() {
  return <Resources />;
}
