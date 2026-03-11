import type { Metadata } from "next";
import Ecommerce from "@/pages/Ecommerce";

export const metadata: Metadata = {
  title: "Ecommerce | Globify Corp",
  description: "",
};

export default function EcommercePage() {
  return <Ecommerce />;
}
