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

        return Array.isArray(data.results) ? data.results : [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

