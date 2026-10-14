
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search as SearchIcon,
  Newspaper,
  RefreshCw,
  ArrowDown,
  Sparkles,
} from "lucide-react";

import NewsCard from "../components/NewCard";
import Loader from "../components/Loader";
import API from "../api/axios";

const PAGE_SIZE = 10;

function Search() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    let active = true;

    async function fetchSearchResults() {
      setArticles([]);
      setPage(1);
      setHasMore(false);
      setError("");

      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const res = await API.get(
          `/news/search?q=${encodeURIComponent(query)}&page=1&pageSize=${PAGE_SIZE}`
        );

        if (!active || currentRequest !== requestId.current) return;

        const results = res.data.articles || [];

        setArticles(results);
        setHasMore(results.length === PAGE_SIZE);
      } catch (err) {
        if (!active || currentRequest !== requestId.current) return;

        console.error("Search failed:", err);
        setError("We couldn't load your search results. Please try again.");
      } finally {
        if (active && currentRequest === requestId.current) {
          setLoading(false);
        }
      }
    }

    fetchSearchResults();

    return () => {
      active = false;
    };
  }, [query, retry]);

  const loadMore = async () => {
    if (loading || loadingMore || !hasMore || !query) return;

    const nextPage = page + 1;
    const currentRequest = requestId.current;

    try {
      setLoadingMore(true);
      setError("");

      const res = await API.get(
        `/news/search?q=${encodeURIComponent(query)}&page=${nextPage}&pageSize=${PAGE_SIZE}`
      );

      if (currentRequest !== requestId.current) return;

      const results = res.data.articles || [];

      setArticles((previous) => {
        const existingUrls = new Set(previous.map((item) => item.url));
        const uniqueResults = results.filter(
          (item) => !existingUrls.has(item.url)
        );

        return [...previous, ...uniqueResults];
      });

      setPage(nextPage);
      setHasMore(results.length === PAGE_SIZE);
    } catch (err) {
      if (currentRequest !== requestId.current) return;

      console.error("Loading more results failed:", err);
      setError("Couldn't load more results. Please try again.");
    } finally {
      if (currentRequest === requestId.current) {
        setLoadingMore(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* SEARCH HEADER */}
        <section className="relative mb-9 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
              <Sparkles size={14} />
              Discover the news
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Search{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Results
              </span>
            </h1>

            {query ? (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex max-w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                  <SearchIcon size={16} className="shrink-0 text-blue-500" />
                  <span className="break-all">{query}</span>
                </span>

                {!loading && !error && (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {articles.length} loaded{" "}
                    {articles.length === 1 ? "article" : "articles"}
                  </span>
                )}
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter a topic in the search bar above to discover relevant stories.
              </p>
            )}
          </div>
        </section>

        {!loading && !error && query && articles.length > 0 && (
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              <Newspaper size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Related stories</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Articles matching your search
              </p>
            </div>
          </div>
        )}

        {loading && query && <Loader />}

        {!query && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <SearchIcon
              size={38}
              className="mx-auto mb-4 text-slate-400"
            />
            <h2 className="text-xl font-bold">Ready to explore?</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Search for a topic, event, person, or news story.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-900">
            <RefreshCw
              size={30}
              className="mx-auto mb-4 text-red-500"
            />
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => setRetry((value) => value + 1)}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && query && articles.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <SearchIcon
              size={38}
              className="mx-auto mb-4 text-slate-400"
            />
            <h2 className="text-xl font-bold">No stories found</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              We couldn't find articles for "{query}". Try a different
              keyword or a broader search.
            </p>
          </div>
        )}

        {articles.length > 0 && (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <NewsCard
                key={article.url || `${article.title}-${index}`}
                article={article}
              />
            ))}
          </div>
        )}

        {!loading && !error && hasMore && articles.length > 0 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingMore ? (
                <RefreshCw size={17} className="animate-spin" />
              ) : (
                <ArrowDown size={17} />
              )}
              {loadingMore ? "Loading..." : "Load more results"}
            </button>
          </div>
        )}

        {!loading && !error && !hasMore && articles.length > 0 && (
          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            You've reached the end of these search results.
          </p>
        )}
      </div>
    </main>
  );
}

export default Search;
