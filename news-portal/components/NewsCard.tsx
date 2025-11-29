"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";

export default function NewsCard({ article }: any) {
    return (
        <div className="bg-white rounded shadow overflow-hidden">
            <Link href={`/news/${encodeURIComponent(article.link)}`}>
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
                    <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                    <p className="text-xs text-gray-500 mt-3">
                        {article.pubDate
                            ? new Date(article.pubDate).toLocaleDateString()
                            : ""}
                    </p>
                </div>
            </Link>
        </div>
    );
}
