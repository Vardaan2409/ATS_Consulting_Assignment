## Layout Decisions

Hero Section	--               Highlights one main top story with a large image (common in major news websites).

3-column grid	       --        News sites typically use 2–4 columns; 3 is optimal for readability on desktop.

Single column on mobile	  --     To maintain readability and avoid clutter.

SafeImage component	       --    Ensures layout doesn’t break when an image is missing.

Redirect detail page	   --    Because NewsData API does not provide the full article text, only the link.


## Data-Fetching Strategy

### Method Used:
Server-Side Rendering (SSR) using async fetch inside server components (Next.js 13+ App Router).

### Why SSR?
                              
Fresh news	   --         News changes every minute — SSR always fetches the latest.

SEO	         --           SSR ensures Google crawlers get real HTML immediately.

No API key leakage	 --   API calls happen on the server, not the browser.

Prevent stale data	  --  News must always be current; no caching is desirable.

### Tradeoffs
#### Advantage

1. Real-time fresh news
          
2. No need for revalidation	     

#### Disadvantage

1. SSR increases response time slightly

2. More server load compared to static pages

## Code Explanation (All Components)
#### a. components/Hero.tsx

1. Shows the top news article.

2. Uses large image + title + summary.

3. Clicking the Hero opens /news/[id].

#### b. components/NewsCard.tsx

1. Displays the rest of the articles in a grid.

2. Responsive design.

3.Redirects to /news/[id].

#### c. components/NewsGrid.tsx

1. Renders the 3-column layout on desktop, 1-column on mobile.

#### d. components/SafeImage.tsx

1. Custom wrapper around Next.js <Image>.

2. Automatically replaces broken/unavailable images with a placeholder.

#### e. app/news/[id]/page.tsx

1. Receives encoded URL slug.

2. Finds the article by article.link.

3. Redirects user to original publisher website.

#### f. app/news/[id]/redirect-client.tsx

1. Uses useEffect to trigger window.location.href = url client-side.

#### g. app/category/[type]/page.tsx

1. Accepts category (india / world / sports).

2. Uses query filters and shows filtered results.

#### h. utils/fetchNews.ts

1. Centralized API fetching.

2. Returns a list of Article objects.

3. Handles errors gracefully.

## Data Model Structure

#### Article Type:

export type Article = {

  title: string;
  
  description?: string;
  
  link: string;      
  
  image_url?: string;
  
  pubDate?: string;
  
  source_id?: string;
  
};


#### Why these fields?

1.  API provides these exact properties.

2. Minimal yet sufficient to show a card + redirect.


## Challenges & How I Overcame Them
#### Challenge 1: Many news images failed to load

Some image URLs from the NewsData API returned 403 errors or expired links, causing broken images on the UI.

#### Solution:

I created a custom SafeImage component that automatically replaces any failed image with a local placeholder.
This ensures the UI stays clean even when the API sends invalid image URLs.

#### Challenge 2: NewsData API does NOT return full article content

The API only provides the title, small description, and link, not the complete article body.

#### Solution:

Instead of attempting to reconstruct full articles, I redirected the user to the original publisher website, ensuring they always see the complete and accurate article.

#### Challenge 3: Handling missing images / empty data

Sometimes the API returned incomplete objects with missing fields such as image_url, description, or even empty result lists.

#### Solution:

I implemented multiple fallback strategies:

A "No News Available" message when the API returns an empty list

Placeholder images when image_url is missing


## AI Assistance

### AI was helpful in:

1. Designing the redirect approach for opening the full article

2. Creating a robust SafeImage component

3. Providing better structuring ideas for components

4. Suggesting SSR patterns for fresh news data

5. Helping debug layout and UI issues quickly


## Improvements I Would Add With More Time

Full Article Parser (scraping)	--        Show full article inside my site (not allowed with most APIs).

Dark Mode	                  --          Better UX.

Search Bar	              --              Search for topics like “India”, “Sports”, etc.

Pagination	              --              Load more news smoothly.

Skeleton Loading	        --            Better loading experience.

Better Category System	   --             More tabs: business, tech, entertainment, etc.

Save-for-Later / Bookmark Feature	--    User experience improvement.



## AI Use & Reflection

### Parts of the Assignment Completed Using AI

AI was used as a support tool to speed up development and to get reference code examples. Specifically, AI helped with:

1. Generating initial component templates such as Hero, NewsCard, and NewsGrid.

2. Providing Tailwind CSS styling ideas for layout, spacing, and responsive design.

3. Helping design the SafeImage component, which replaces broken images.

4. Drafting fetch logic for retrieving news from the NewsData API.

5. Suggesting the SSR (server-side rendering) approach to keep news fresh.

6. Explaining how dynamic routes work in the Next.js App Router.

### AI Suggestions That Were Wrong or Suboptimal

##### Wrong Data Fields:
AI sometimes assumed fields like url instead of the actual API field link, leading to undefined errors.

##### Image Handling Issues:
Early AI code did not correctly handle broken image URLs, which resulted in missing or broken images on the UI.

##### Static Generation Suggestion:
AI suggested using static generation (SSG), which is not suitable for continuously updating news content.

### How I Verified and Corrected AI-Generated Code

To ensure the final code was correct:

1) I cross-checked AI suggestions with the actual NewsData API documentation.

2) I used console logs to inspect dynamic route values, article links, API responses, and errors.

3) I manually tested routing to confirm each article opened the correct external link.

4) I removed the problematic Base64 approach and replaced it with a clean URL-based routing system.

5) I restructured components (especially Hero and NewsCard) to ensure they followed the correct logic.

### Custom Modifications Beyond What AI Provided

1. Created a clean redirect system that sends the user directly to the original news website, since the API does not return full article content.

2. Built fallback handling for missing images, broken API data, and empty results.

3. Designed the final UI layout to look similar to a real news portal, including Hero + Grid structure.

4. Implemented category filtering logic for /category/[type].

5. Ensured SSR so news is always fresh and not cached.

6. Refined card design, spacing, and responsiveness for a clean interface.
