
import { useEffect, useState } from "react";
import {
  ExternalLink,
  Bookmark,
  Sparkles,
  Clock3,
  Check,
  Newspaper,
  X,
  Copy,
  LoaderCircle,
} from "lucide-react";

import API from "../api/axios";

function NewsCard({ article }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [imageError, setImageError] = useState(false);
  const [bookmarkError, setBookmarkError] = useState("");

  const title = article?.title || "Untitled article";
  const description =
    article?.description || "Read the full story for more details.";
  const image = article?.urlToImage;
  const source = article?.source?.name || "News";

  const formattedDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  // Close the modal with Escape.
  useEffect(() => {
    if (!summaryOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSummaryOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [summaryOpen]);

  // Save bookmark.
  const handleBookmark = async () => {
    if (saved || loading) return;

    try {
      setLoading(true);
      setBookmarkError("");

      await API.post("/user/bookmark", {
        title: article.title,
        description: article.description,
        image_url: article.urlToImage,
        article_url: article.url,
      });

      setSaved(true);
    } catch (error) {
      console.error("Bookmark failed:", error);

      setBookmarkError(
        error.response?.data?.message ||
          "Could not save this article."
      );
    } finally {
      setLoading(false);
    }
  };

  // Generate the summary and display it in a modal.
  const handleSummary = async () => {
    setSummaryOpen(true);

    // Reuse the existing summary if already generated.
    if (summary) return;

    try {
      setSummaryLoading(true);
      setSummaryError("");

      const res = await API.post("/ai/summarize", {
        title: article.title,
        description: article.description,
      });

      setSummary(
        res.data.summary || "No summary was returned."
      );
    } catch (error) {
      console.error("Summary failed:", error);
      setSummaryError(
        "Couldn't generate the summary. Please try again."
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  // Copy the generated summary.
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);

      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  // Format bullet points returned by the AI.
  const summaryLines = summary
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const formattedLines =
    summaryLines.length === 1
      ? summaryLines[0]
          .split(/\s+-\s+(?=[A-Z•])/)
          .map((line) => line.trim())
          .filter(Boolean)
      : summaryLines;

  return (
    <>
      {/* NEWS CARD */}
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900">
        {/* IMAGE */}
        <a
          href={article?.url || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${title}`}
          className="relative block aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800"
        >
          {image && !imageError ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
              <Newspaper size={36} strokeWidth={1.5} />
              <span className="text-xs font-medium">
                Image unavailable
              </span>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-white/95 px-3 py-1 text-xs font-bold text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100">
            {source}
          </span>
        </a>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-5">
          {formattedDate && (
            <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Clock3 size={13} />
              {formattedDate}
            </div>
          )}

          <h2 className="mb-3 text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
            {title}
          </h2>

          <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {description}
          </p>

          {/* ACTIONS */}
          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <a
              href={article?.url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Read article
              <ExternalLink size={15} />
            </a>

            <button
              type="button"
              onClick={handleBookmark}
              disabled={loading || saved}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {saved ? <Check size={16} /> : <Bookmark size={16} />}
              {loading ? "Saving..." : saved ? "Saved" : "Save"}
            </button>

            <button
              type="button"
              onClick={handleSummary}
              disabled={summaryLoading}
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 disabled:cursor-wait disabled:opacity-70 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300 dark:hover:bg-violet-900/50"
            >
              <Sparkles size={16} />
              AI Summary
            </button>
          </div>

          {bookmarkError && (
            <p
              role="alert"
              className="mt-3 text-sm text-red-600 dark:text-red-400"
            >
              {bookmarkError}
            </p>
          )}
        </div>
      </article>

      {/* AI SUMMARY MODAL */}
      {summaryOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSummaryOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="summary-title"
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center gap-3 border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                <Sparkles size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h2
                  id="summary-title"
                  className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl"
                >
                  AI Article Summary
                </h2>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Key takeaways from this story
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSummaryOpen(false)}
                aria-label="Close summary"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <X size={21} />
              </button>
            </div>

            {/* ARTICLE TITLE */}
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/40 sm:px-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Article
              </p>

              <h3 className="line-clamp-3 text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">
                {title}
              </h3>
            </div>

            {/* MODAL BODY */}
            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
              {summaryLoading ? (
                <div className="flex min-h-48 flex-col items-center justify-center gap-4 text-center">
                  <LoaderCircle
                    size={36}
                    className="animate-spin text-violet-600"
                  />

                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white">
                      Analyzing the article...
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Preparing the key takeaways for you.
                    </p>
                  </div>
                </div>
              ) : summaryError ? (
                <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
                  <p
                    role="alert"
                    className="text-sm text-red-600 dark:text-red-400"
                  >
                    {summaryError}
                  </p>

                  <button
                    type="button"
                    onClick={handleSummary}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-5 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      <Check size={16} />
                    </span>

                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Key takeaways
                    </h3>
                  </div>

                  <ul className="space-y-4">
                    {formattedLines.map((line, index) => {
                      const cleanLine = line
                        .replace(/^\s*[-•*]\s*/, "")
                        .trim();

                      return (
                        <li
                          key={`${index}-${cleanLine}`}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />

                          <p className="text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
                            {cleanLine}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* MODAL FOOTER */}
            {!summaryLoading && !summaryError && (
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  AI-generated content. Verify important details with the original source.
                </p>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied" : "Copy"}
                  </button>

                  {article?.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Read original
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </>
  );
}

export default NewsCard;
