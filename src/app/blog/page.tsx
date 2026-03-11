import type { Metadata } from "next";
import Blog from "@/pages/Blog";

export const metadata: Metadata = {
  title: "Blog | Globify Corp",
  description: "",
};

export default function BlogPage() {
  return <Blog />;
}
