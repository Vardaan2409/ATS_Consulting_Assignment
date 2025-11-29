import fetchNews from "@/utils/fetchNews";
import SafeImage from "@/components/SafeImage";

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
    const id = decodeURIComponent(params.id);

    const articles = await fetchNews();

    const article = articles.find((a) => a.link === id);

    if (!article) {
        return <p className="text-center py-20">Article not found.</p>;
    }

    return (
        <article className="bg-white rounded shadow p-6 space-y-4">
            <h1 className="text-2xl font-bold">{article.title}</h1>

            <p className="text-sm text-gray-500">
                {article.source_id} •{" "}
                {article.pubDate ? new Date(article.pubDate).toLocaleString() : ""}
            </p>

            <div className="relative w-full h-80">
                <SafeImage
                    src={article.image_url}
                    alt={article.title}
                    fill
                    className="object-cover rounded"
                />
            </div>

            <p className="text-lg leading-7 whitespace-pre-line">
                {article.description || "No content available."}
            </p>

            <a
                href={article.link}
                target="_blank"
                className="text-blue-600 underline"
            >
                Read Full Article →
            </a>
        </article>
    );
}
