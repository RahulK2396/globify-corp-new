import type { Metadata } from "next";
import Projects from "@/pages/Projects";

export const metadata: Metadata = {
  title: "Projects | Globify Corp",
  description: "",
};

export default function ProjectsPage() {
  return <Projects />;
}
