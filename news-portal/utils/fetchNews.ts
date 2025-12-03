export type Article = {
    title: string;
    description?: string;
    link: string;
    image_url?: string;
    pubDate?: string;
    source_id?: string;
};

const BASE_URL = "https://newsdata.io/api/1/news";

export default async function fetchNews(query: string = ""): Promise<Article[]> {
    const key = process.env.NEWS_API_KEY;

    if (!key) {
        console.warn("NEWS_API_KEY missing in .env.local");
        return [];
    }

    try {
        const url = `${BASE_URL}?apikey=${key}&language=en&${query}`;

        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();

        let results: Article[] = Array.isArray(data.results) ? data.results : [];

        // ❌ Remove invalid or empty articles
        results = results.filter(
            item =>
                item.link &&
                item.title &&
                item.description &&
                typeof item.link === "string"
        );

        // ❗ Remove duplicates using link
        const uniqueResults = Array.from(
            new Map(results.map(item => [item.link, item])).values()
        );

        // ⏳ Sort by latest first (based on pubDate)
        uniqueResults.sort((a, b) => {
            const dateA = new Date(a.pubDate ?? "").getTime();
            const dateB = new Date(b.pubDate ?? "").getTime();
            return dateB - dateA;
        });

        return uniqueResults;

    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

