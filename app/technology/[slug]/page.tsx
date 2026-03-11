import type { Metadata } from "next";
import TechnologyPage from "@/_pages_backup/TechnologyPage";
import technologies from "@/data/technologyData";

export async function generateStaticParams() {
    return technologies.map((tech) => ({
        slug: tech.slug,
    }));
}

export default function Page({
    params,
}: {
    params: { slug: string };
}) {
    return <TechnologyPage slug={params.slug} />;
}
