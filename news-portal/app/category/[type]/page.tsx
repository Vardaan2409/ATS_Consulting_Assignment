import fetchNews from "@/utils/fetchNews";
import NewsGrid from "@/components/NewsGrid";
import ErrorMessage from "@/components/ErrorMessage";

export default async function CategoryPage({ params }: { params: { type: string } }) {
    const { type } = params;

    let query = "";

    if (type === "india") {
        query = "country=in";
    } else if (type === "world") {
        query = "category=world";
    } else if (type === "sports") {
        query = "category=sports";
    } else {
        query = "";
    }

    const articles = await fetchNews(query);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 capitalize">{type} News</h1>

            {articles.length === 0 ? (
                <ErrorMessage message="No articles found or API is not returning results." />
            ) : (
                <NewsGrid articles={articles} />
            )}

        </div>
    );
}
