
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Bookmark,
  Newspaper,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function AuthLayout({ mode, children }) {
  const isLogin = mode === "login";

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT: BRANDING PANEL */}
        <aside className="relative hidden overflow-hidden bg-[#0b1220] text-white lg:flex lg:min-h-screen lg:flex-col lg:justify-between lg:p-10 xl:p-14">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          {/* Brand */}
          <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Newspaper size={24} />
            </div>

            <div>
              <span className="block text-xl font-extrabold tracking-tight">
                News<span className="text-blue-400">App</span>
              </span>
              <span className="text-xs text-slate-400">
                Your world. In context.
              </span>
            </div>
          </Link>

          {/* Main message */}
          <div className="relative z-10 my-12 max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-blue-300">
              <Sparkles size={15} />
              YOUR DAILY BRIEFING
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight xl:text-6xl">
              Stay curious.
              <br />
              Stay{" "}
              <span className="text-blue-400">informed.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-400 xl:text-lg">
              Discover the stories shaping your world. Explore the latest
              headlines, save the news that matters, and get AI-powered
              summaries in one place.
            </p>

            {/* Editorial feature card */}
            <div className="mt-10 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
                    The daily edition
                  </span>
                </div>

                <Newspaper size={18} className="text-slate-400" />
              </div>

              <div className="grid grid-cols-[1fr_100px] items-center gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold text-blue-400">
                    BEYOND THE HEADLINES
                  </p>

                  <h2 className="text-xl font-bold leading-snug">
                    Every story has another side.
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Find perspectives, understand the context, and keep
                    learning.
                  </p>
                </div>

                <div className="flex aspect-square items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/30 to-indigo-500/10">
                  <TrendingUp size={48} strokeWidth={1.2} className="text-blue-300" />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Bookmark size={14} className="text-blue-400" />
                  Save stories
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Sparkles size={14} className="text-violet-400" />
                  AI summaries
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-xs text-slate-500">
            <span>Independent thinking starts here.</span>
            <span>NewsApp © {new Date().getFullYear()}</span>
          </div>
        </aside>

        {/* RIGHT: AUTHENTICATION PANEL */}
        <section className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 lg:bg-white lg:dark:bg-slate-950">
          {/* Mobile branding */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Newspaper size={22} />
              </span>

              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                News<span className="text-blue-600">App</span>
              </span>
            </Link>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Stay informed
            </span>
          </header>

          <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
            <div className="w-full max-w-md">
              {/* Mobile intro */}
              <div className="mb-8 lg:hidden">
                <p className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  YOUR DAILY BRIEFING
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Stay curious. Stay informed.
                </h1>
              </div>

              <div className="mb-8">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {isLogin ? (
                    <ArrowUpRight size={25} />
                  ) : (
                    <Newspaper size={25} />
                  )}
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  {isLogin ? "Welcome back" : "Join NewsApp"}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
                  {isLogin
                    ? "Sign in to continue reading and catch up on the stories that matter."
                    : "Create your account and build your own personalized reading list."}
                </p>
              </div>

              {children}

              <p className="mt-8 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                By continuing, you agree to use NewsApp responsibly and
                respect the sources behind every story.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AuthLayout;
