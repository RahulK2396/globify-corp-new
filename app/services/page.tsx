import type { Metadata } from "next";
import Services from "@/_pages_backup/Services";

export const metadata: Metadata = {
  title: "Services | Globify Corp",
  description: "",
};

export default function ServicesPage() {
  return <Services />;
}
