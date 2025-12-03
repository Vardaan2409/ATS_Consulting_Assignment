import fetchNews, { Article } from "@/utils/fetchNews";
import Link from "next/link";

export default async function CategoryPage({ params }: any) {
    const { category } = params;

    const validCategories = [
        "business",
        "entertainment",
        "environment",
        "food",
        "health",
        "politics",
        "science",
        "sports",
        "technology",
        "top",
        "tourism",
        "world"
    ];

    // Use category if valid; otherwise treat as country code
    const query = validCategories.includes(category)
        ? `category=${category}`
        : `country=${category}`;

    const articles: Article[] = await fetchNews(query);

    if (!articles.length) {
        return (
            <h1 className="p-4 text-red-600 text-2xl">
                No articles found.
            </h1>
        );
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article: Article, index: number) => {
                const encoded = encodeURIComponent(article.link);

                return (
                    <div key={index} className="border rounded shadow p-4">
                        <img
                            src={article.image_url || "/unavailable.svg"}
                            alt={article.title}
                            className="w-full h-48 object-cover rounded"
                        />

                        <h2 className="font-bold text-xl mt-2">
                            {article.title}
                        </h2>

                        <p className="line-clamp-3 mt-2">
                            {article.description}
                        </p>

                        <Link
                            href={`/category/${category}/${encoded}`}
                            className="text-blue-600 underline mt-3 inline-block"
                        >
                            Read More →
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
