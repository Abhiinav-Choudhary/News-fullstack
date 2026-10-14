
import { NavLink } from "react-router-dom";
import { ChevronRight, Newspaper } from "lucide-react";

import categories from "../constants/categories";

function CategoryNavbar() {
  return (
    <nav
      aria-label="News categories"
      className="relative z-40  border-b border-slate-200 bg-white/95 text-slate-700 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-300"
    >
      <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* SECTION LABEL */}
        <div className="hidden shrink-0 items-center gap-2 border-r border-slate-200 py-3 pr-5 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:text-slate-400 lg:flex">
          <Newspaper size={15} className="text-blue-600 dark:text-blue-400" />
          Explore
        </div>

        {/* SCROLLABLE CATEGORIES */}
        <div
          className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* ALL NEWS */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold capitalize transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              }`
            }
          >
            All News
          </NavLink>

          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/category/${encodeURIComponent(category)}`}
              className={({ isActive }) =>
                `inline-flex shrink-0 items-center rounded-full px-4 py-2 text-sm font-semibold capitalize transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                }`
              }
            >
              {category}
            </NavLink>
          ))}
        </div>

        {/* SCROLL HINT */}
        <div className="hidden shrink-0 items-center pl-2 text-slate-400 sm:flex">
          <ChevronRight size={17} />
        </div>
      </div>
    </nav>
  );
}

export default CategoryNavbar;
