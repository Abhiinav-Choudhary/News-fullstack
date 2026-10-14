
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Newspaper,
  RefreshCw,
  ArrowDown,
  Search,
} from "lucide-react";

import NewsCard from "../components/NewCard";
import Loader from "../components/Loader";
import API from "../api/axios";

const PAGE_SIZE = 10;

function Category() {
  const { category } = useParams();

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  const requestId = useRef(0);

  useEffect(() => {
    const currentRequest = ++requestId.current;
    let active = true;

    async function fetchCategoryNews() {
      setArticles([]);
      setPage(1);
      setHasMore(true);
      setError("");
      setLoading(true);
      setLoadingMore(false);

      try {
        const res = await API.get(
          `/news/category/${encodeURIComponent(category)}?page=1&pageSize=${PAGE_SIZE}`
        );

        if (!active || currentRequest !== requestId.current) return;

        const results = res.data.articles || [];

        setArticles(results);
        setHasMore(results.length === PAGE_SIZE);
      } catch (err) {
        if (!active || currentRequest !== requestId.current) return;

        console.error("Failed to fetch category news:", err);
        setError("We couldn't load these headlines. Please try again.");
      } finally {
        if (active && currentRequest === requestId.current) {
          setLoading(false);
        }
      }
    }

    fetchCategoryNews();

    return () => {
      active = false;
    };
  }, [category,retry]);

  const loadMore = async () => {
    if (loadingMore || loading || !hasMore) return;

    const nextPage = page + 1;
    const currentRequest = requestId.current;

    try {
      setLoadingMore(true);
      setError("");

      const res = await API.get(
        `/news/category/${encodeURIComponent(category)}?page=${nextPage}&pageSize=${PAGE_SIZE}`
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

      console.error("Failed to load more category news:", err);
      setError("Couldn't load more articles. Please try again.");
    } finally {
      if (currentRequest === requestId.current) {
        setLoadingMore(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* CATEGORY HEADER */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                <Newspaper size={14} />
                Explore the latest
              </div>

              <h1 className="text-3xl font-extrabold capitalize tracking-tight sm:text-4xl">
                {category}{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  News
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                Stay informed with the latest headlines, important
                updates, and stories from {category}.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              <Newspaper size={30} strokeWidth={1.6} />
            </div>
          </div>

          {!loading && !error && (
            <div className="relative mt-6 border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {articles.length}
              </span>{" "}
              articles
            </div>
          )}
        </section>

        {/* SECTION HEADING */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Latest stories
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              News selected for you
            </p>
          </div>

          <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold capitalize text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {category}
          </span>
        </div>

        {/* INITIAL LOADING */}
        {loading && <Loader />}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-900">
            <RefreshCw
              className="mx-auto mb-4 text-red-500"
              size={30}
            />
            <p className="font-semibold">{error}</p>
            <button
              onClick={() => {
                setPage(1);
                setArticles([]);
                setHasMore(true);
                setError("");
                setLoading(true);

                // Reload by changing the request state would require
                // an explicit retry trigger; the retry button below
                // is wired through the local reload counter.
                // window.location.reload();
                setRetry((value) => value + 1)
              }}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && articles.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900">
            <Search
              size={38}
              className="mx-auto mb-4 text-slate-400"
            />
            <h3 className="text-xl font-bold">
              No articles found
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              There are no available stories in this category right now.
              Try exploring another category.
            </p>
          </div>
        )}

        {/* NEWS GRID */}
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

        {/* LOAD MORE */}
        {!loading && !error && hasMore && articles.length > 0 && (
          <div className="mt-10 flex flex-col items-center gap-3">
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
              {loadingMore ? "Loading stories..." : "Load more stories"}
            </button>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Discover more headlines
            </p>
          </div>
        )}

        {!loading && !error && !hasMore && articles.length > 0 && (
          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            You've reached the end of the available stories.
          </p>
        )}
      </div>
    </main>
  );
}

export default Category;
