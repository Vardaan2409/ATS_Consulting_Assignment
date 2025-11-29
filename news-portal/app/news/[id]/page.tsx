import fetchNews, { Article } from "@/utils/fetchNews";
import RedirectClient from "./redirect-client";

export default async function ArticlePage({
    params,
}: {
    params: { id: string };
}) {
    const id = decodeURIComponent(params.id);

    const articles: Article[] = await fetchNews();

    const article = articles.find(a => a.link === id);

    if (!article) {
        return <p className="text-center py-20">Article not found.</p>;
    }

    return <RedirectClient url={article.link} />;
}
