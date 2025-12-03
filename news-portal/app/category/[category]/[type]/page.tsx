import fetchNews, { Article } from "@/utils/fetchNews";

export default async function ArticleDetailPage({ params }: any) {
    const { category, type } = params;

    const decodedLink = decodeURIComponent(type);

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

    const query = validCategories.includes(category)
        ? `category=${category}`
        : `country=${category}`;

    const articles: Article[] = await fetchNews(query);

    const article = articles.find(a => a.link === decodedLink);

    if (!article) {
        return (
            <h1 className="text-center py-20 text-red-600 text-2xl">
                Article Not Found
            </h1>
        );
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">{article.title}</h1>

            <img
                src={article.image_url || "/unavailable.svg"}
                alt={article.title}
                className="w-full h-80 object-cover rounded my-4"
            />

            <p className="text-lg">{article.description}</p>

            <a
                href={article.link}
                target="_blank"
                className="inline-block mt-4 text-blue-600 underline"
            >
                Read full article →
            </a>
        </div>
    );
}
