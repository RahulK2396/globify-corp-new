import type { Metadata } from "next";
import Projects from "@/_pages_backup/Projects";

export const metadata: Metadata = {
  title: "Projects | Globify Corp",
  description: "",
};

export default function ProjectsPage() {
  return <Projects />;
}
