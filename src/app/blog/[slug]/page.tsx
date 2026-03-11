import type { Metadata  } from "next";
import BlogPage from "@/_pages_backup/Blog";
import { blogPosts } from "@/data/blogData";
export async function generateStaticParams() {
    return blogPosts.map((blog) => ({
        slug: blog.slug,
        }));
}
export default function Page({
    params,
}: {
    params: { slug: string };
}) {
    return <BlogPage slug={params.slug} />;
}