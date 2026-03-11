import type { Metadata } from "next";
import Products from "@/pages/Products";

export const metadata: Metadata = {
  title: "Products | Globify Corp",
  description: "",
};

export default function ProductsPage() {
  return <Products />;
}
