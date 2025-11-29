## Layout Decisions

Hero Section	--               Highlights one main top story with a large image (common in major news websites).

3-column grid	       --        News sites typically use 2–4 columns; 3 is optimal for readability on desktop.

Single column on mobile	  --     To maintain readability and avoid clutter.

SafeImage component	       --    Ensures layout doesn’t break when an image is missing.

Redirect detail page	   --    Because NewsData API does not provide the full article text, only the link.


## Data-Fetching Strategy

Method Used:
Server-Side Rendering (SSR) using async fetch inside server components (Next.js 13+ App Router).

Why SSR?
Reason	                              Explanation
Fresh news	            News changes every minute — SSR always fetches the latest.
SEO	                    SSR ensures Google crawlers get real HTML immediately.
No API key leakage	    API calls happen on the server, not the browser.
Prevent stale data	    News must always be current; no caching is desirable.


## Code Explanation (All Components)
a. components/Hero.tsx

Shows the top news article.

Uses large image + title + summary.

Clicking the Hero opens /news/[id].

b. components/NewsCard.tsx

Displays the rest of the articles in a grid.

Responsive design.

Redirects to /news/[id].

c. components/NewsGrid.tsx

Renders the 3-column layout on desktop, 1-column on mobile.

d. components/SafeImage.tsx

Custom wrapper around Next.js <Image>.

Automatically replaces broken/unavailable images with a placeholder.

e. app/news/[id]/page.tsx

Receives encoded URL slug.

Finds the article by article.link.

Redirects user to original publisher website.

f. app/news/[id]/redirect-client.tsx

Uses useEffect to trigger window.location.href = url client-side.

g. app/category/[type]/page.tsx

Accepts category (india / world / sports).

Uses query filters and shows filtered results.

h. utils/fetchNews.ts

Centralized API fetching.

Returns a list of Article objects.

Handles errors gracefully.


## Challenges & How I Overcame Them
Challenge 1: Many news images failed to load

Some image URLs from the NewsData API returned 403 errors or expired links, causing broken images on the UI.

Solution:

I created a custom SafeImage component that automatically replaces any failed image with a local placeholder.
This ensures the UI stays clean even when the API sends invalid image URLs.

Challenge 2: NewsData API does NOT return full article content

The API only provides the title, small description, and link, not the complete article body.

Solution:

Instead of attempting to reconstruct full articles, I redirected the user to the original publisher website, ensuring they always see the complete and accurate article.

Challenge 3: Handling missing images / empty data

Sometimes the API returned incomplete objects with missing fields such as image_url, description, or even empty result lists.

Solution:

I implemented multiple fallback strategies:

A "No News Available" message when the API returns an empty list

Placeholder images when image_url is missing

Optional chaining and safe rendering for missing text fields


AI Assistance

AI was helpful in:

Designing the redirect approach for opening the full article

Creating a robust SafeImage component

Providing better structuring ideas for components

Suggesting SSR patterns for fresh news data

Helping debug layout and UI issues quickly


## Improvements I Would Add With More Time
Feature	                                                  Benefit
Full Article Parser (scraping)	        Show full article inside my site (not allowed with most APIs).
Dark Mode	                            Better UX.
Search Bar	                            Search for topics like “India”, “Sports”, etc.
Pagination	                            Load more news smoothly.
Skeleton Loading	                    Better loading experience.
Better Category System	                More tabs: business, tech, entertainment, etc.
Save-for-Later / Bookmark Feature	    User experience improvement.
