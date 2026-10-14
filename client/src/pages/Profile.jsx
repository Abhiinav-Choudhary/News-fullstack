
import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Bookmark,
  ExternalLink,
  Trash2,
  Newspaper,
  RefreshCw,
  BookmarkCheck,
} from "lucide-react";

import API from "../api/axios";
import Loader from "../components/Loader";

function Profile() {
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingIds, setDeletingIds] = useState([]);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProfile() {
      try {
        setLoading(true);
        setError("");

        const [userRes, bookmarkRes] = await Promise.all([
          API.get("/user/profile"),
          API.get("/user/bookmarks"),
        ]);

        if (!active) return;

        setUser(userRes.data);
        setBookmarks(
          Array.isArray(bookmarkRes.data) ? bookmarkRes.data : []
        );
      } catch (err) {
        if (!active) return;

        console.error("Failed to fetch profile:", err);
        setError(
          err.response?.data?.message ||
            "We couldn't load your profile. Please try again."
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  const handleDelete = async (article) => {
    const id = article.id ?? article._id;

    if (!id || deletingIds.includes(id)) return;

    try {
      setDeletingIds((previous) => [...previous, id]);
      setDeleteError("");

      await API.delete(`/user/bookmark/${id}`);

      setBookmarks((previous) =>
        previous.filter(
          (bookmark) => (bookmark.id ?? bookmark._id) !== id
        )
      );
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      setDeleteError(
        err.response?.data?.message ||
          "Couldn't remove this bookmark. Please try again."
      );
    } finally {
      setDeletingIds((previous) => previous.filter((item) => item !== id));
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900 dark:bg-slate-900">
          <UserRound
            size={36}
            className="mx-auto mb-4 text-red-500"
          />
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Profile unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  const username = user?.username || "Reader";
  const email = user?.email || "No email available";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* PROFILE HEADER */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
              <UserRound size={38} strokeWidth={1.6} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                <UserRound size={13} />
                Your account
              </div>

              <h1 className="break-words text-3xl font-extrabold tracking-tight sm:text-4xl">
                Welcome, {username}
              </h1>

              <p className="mt-2 flex items-center gap-2 break-all text-sm text-slate-600 dark:text-slate-400">
                <Mail size={16} className="shrink-0" />
                {email}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/70">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <BookmarkCheck size={23} />
              </div>

              <div>
                <p className="text-2xl font-extrabold">
                  {bookmarks.length}
                </p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Saved articles
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SAVED ARTICLES HEADING */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Bookmark size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Your reading list
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Stories you've saved for later
            </p>
          </div>
        </div>

        {deleteError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          >
            {deleteError}
          </div>
        )}

        {/* EMPTY STATE */}
        {bookmarks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Bookmark size={30} />
            </div>

            <h3 className="text-xl font-bold">Your reading list is empty</h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              When you find an interesting story, save it to your reading
              list and come back to it whenever you like.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((article, index) => {
              const id = article.id ?? article._id;
              const deleting = deletingIds.includes(id);

              return (
                <article
                  key={id ?? `${article.title}-${index}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-900"
                >
                  {/* SAVED IMAGE */}
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title || "Saved news article"}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                      className="aspect-[16/10] w-full bg-slate-100 object-cover dark:bg-slate-800"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center bg-slate-100 text-slate-400 dark:bg-slate-800">
                      <Newspaper size={36} />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                      <BookmarkCheck size={13} />
                      Saved story
                    </div>

                    <h3 className="mb-3 line-clamp-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
                      {article.title || "Untitled article"}
                    </h3>

                    <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {article.description || "No description available."}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                      {article.article_url && (
                        <a
                          href={article.article_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Read article
                          <ExternalLink size={15} />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(article)}
                        disabled={deleting || !id}
                        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        {deleting ? (
                          <RefreshCw size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                        {deleting ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default Profile;
