
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Newspaper,
  Search,
  Sun,
  Moon,
  UserRound,
  LogOut,
  Menu,
  X,
  Bookmark,
  ArrowRight,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setSearch("");
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95 dark:text-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex min-h-[76px] items-center justify-between gap-4">
          {/* BRAND */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 transition duration-300 group-hover:scale-105">
              <Newspaper size={24} strokeWidth={1.8} />
            </span>

            <span>
              <span className="block text-xl font-extrabold tracking-tight">
                News<span className="text-blue-600 dark:text-blue-400">App</span>
              </span>
              <span className="hidden text-[10px] font-medium tracking-[0.16em] text-slate-500 dark:text-slate-400 sm:block">
                YOUR DAILY BRIEFING
              </span>
            </span>
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="mx-auto hidden w-full max-w-lg md:flex"
          >
            <div className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-blue-400 dark:focus-within:bg-slate-900">
              <Search
                size={19}
                className="shrink-0 text-slate-400 transition group-focus-within:text-blue-600"
              />

              <input
                type="search"
                aria-label="Search news"
                placeholder="Search headlines, topics, stories..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
              />

              <button
                type="submit"
                disabled={!search.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Search
                <ArrowRight size={14} />
              </button>
            </div>
          </form>

          {/* DESKTOP ACTIONS */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Light mode" : "Dark mode"}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-900 dark:hover:bg-slate-800 dark:hover:text-blue-300"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <UserRound size={17} />
                  Profile
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  Login
                </NavLink>

                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700"
                >
                  Get started
                  <ArrowRight size={15} />
                </Link>
              </>
            )}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 py-4 dark:border-slate-800 md:hidden">
            <form
              onSubmit={handleSearch}
              role="search"
              className="mb-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900"
            >
              <Search size={18} className="ml-2 shrink-0 text-slate-400" />

              <input
                type="search"
                aria-label="Search news"
                placeholder="Search news..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                disabled={!search.trim()}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                Search
              </button>
            </form>

            <div className="grid gap-2">
              <NavLink
                to="/"
                end
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Newspaper size={18} />
                Latest news
              </NavLink>

              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                      }`
                    }
                  >
                    <Bookmark size={18} />
                    Profile & saved articles
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold dark:border-slate-700"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Get started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
