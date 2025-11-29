"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";

export default function Hero({ article }: any) {
    return (
        <section className="bg-white rounded shadow overflow-hidden">
            <Link href={`/news/${encodeURIComponent(article.link)}`}>
                <div className="relative w-full h-72 sm:h-96">
                    <SafeImage
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-4">
                    <h1 className="text-2xl sm:text-3xl font-bold">{article.title}</h1>
                    <p className="text-gray-600 mt-2 hidden sm:block">{article.description}</p>
                </div>
            </Link>
        </section>
    );
}
