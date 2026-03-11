import type { Metadata } from "next";
import MigrationServices from "@/_pages_backup/MigrationServices";

export const metadata: Metadata = {
  title: "MigrationServices | Globify Corp",
  description: "",
};

export default function MigrationServicesPage() {
  return <MigrationServices />;
}
