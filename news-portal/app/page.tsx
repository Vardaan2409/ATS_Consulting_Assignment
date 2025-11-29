import Hero from "@/components/Hero";
import NewsGrid from "@/components/NewsGrid";
import fetchNews from "@/utils/fetchNews";

export default async function Home() {
  const articles = await fetchNews();

  if (!articles || articles.length === 0) {
    return <p className="text-center mt-10">No news available right now.</p>;
  }

  const top = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      <Hero article={top} />
      <h2 className="text-xl font-bold mt-8 mb-4">Latest News</h2>
      <NewsGrid articles={rest} />
    </>
  );
}