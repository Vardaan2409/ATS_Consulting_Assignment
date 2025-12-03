"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import type { Article } from "@/utils/fetchNews";

export default function NewsCard({
    article,
    category,
}: {
    article: Article;
    category: string;
}) {
    const encoded = encodeURIComponent(article.link);

    return (
        <div className="bg-white rounded shadow overflow-hidden">
            <Link href={`/category/${category}/${encoded}`}>
                <div className="relative w-full h-48">
                    <SafeImage
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-4">
                    <h3 className="font-semibold line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                        {article.description}
                    </p>
                </div>
            </Link>
        </div>
    );
}
