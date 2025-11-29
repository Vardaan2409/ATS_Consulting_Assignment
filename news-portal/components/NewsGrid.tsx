import NewsCard from "./NewsCard";

export default function NewsGrid({ articles }: any) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article: any) => (
                <NewsCard key={article.link} article={article} />
            ))}
        </div>
    );
}
