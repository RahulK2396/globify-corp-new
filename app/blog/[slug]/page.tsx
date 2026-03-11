
import { blogPosts } from "@/data/blogData";
import BlogPost from "@/_pages_backup/BlogPost";
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
    return <BlogPost slug={params.slug} />;
}