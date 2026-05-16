import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user, logout } = useAuth();
const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");



  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?q=${search}`);

    setSearch("");
  };



  return (

   <nav className="
flex flex-col md:flex-row
md:items-center md:justify-between
p-4 shadow gap-4
bg-white text-black
dark:bg-zinc-900 dark:text-white
">

      {/* LOGO */}

      <Link
        to="/"
        className="text-2xl font-bold"
      >
        NewsApp
      </Link>



      {/* SEARCH BAR */}

      <form
        onSubmit={handleSearch}
        className="flex gap-2"
      >

        <input
          type="text"
          placeholder="Search news..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        className="
border px-4 py-2 rounded-xl outline-none
bg-white text-black
dark:bg-zinc-800 dark:text-white
"
        />

        <button
          className="bg-black text-white px-4 py-2 rounded-xl"
        >
          Search
        </button>

      </form>



      {/* AUTH */}

      <div className="flex gap-4 items-center">

        <button
  onClick={toggleTheme}
  className="border px-4 py-2 rounded-lg"
>

  {
    darkMode
      ? "☀️"
      : "🌙"
  }

</button>

        {
          user ? (

            <>
              <Link to="/profile">
                Profile
              </Link>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
            </>
          )
        }

      </div>

    </nav>
  );
}

export default Navbar;