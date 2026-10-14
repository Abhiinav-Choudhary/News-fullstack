
import { LoaderCircle, Newspaper } from "lucide-react";

function Loader({ count = 6 }) {
  return (
    <section
      aria-label="Loading news articles"
      aria-busy="true"
      className="w-full"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          <Newspaper size={21} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Loading stories
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gathering the latest headlines...
          </p>
        </div>

        <LoaderCircle
          size={20}
          className="ml-auto animate-spin text-blue-600 dark:text-blue-400"
        />
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            {/* IMAGE PLACEHOLDER */}
            <div className="aspect-[16/10] animate-pulse bg-slate-200 dark:bg-slate-800" />

            <div className="space-y-4 p-5">
              {/* SOURCE */}
              <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />

              {/* HEADLINE */}
              <div className="space-y-2">
                <div className="h-5 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800/80" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-100 dark:bg-slate-800/80" />
                <div className="h-3 w-3/5 animate-pulse rounded bg-slate-100 dark:bg-slate-800/80" />
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Loader;
