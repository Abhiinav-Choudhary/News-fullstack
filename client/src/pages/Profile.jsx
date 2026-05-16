import { useEffect, useState } from "react";

import API from "../api/axios";

function Profile() {

  const [user, setUser] = useState(null);

  const [bookmarks, setBookmarks] = useState([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchProfile = async () => {

      try {

        // USER DATA
        const userRes = await API.get(
          "/user/profile"
        );

        // BOOKMARKS
        const bookmarkRes = await API.get(
          "/user/bookmarks"
        );

        setUser(userRes.data);

        setBookmarks(bookmarkRes.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchProfile();

  }, []);

const handleDelete = async (id) => {

  try {

    await API.delete(
      `/user/bookmark/${id}`
    );

    setBookmarks((prev) =>
      prev.filter(
        (bookmark) => bookmark.id !== id
      )
    );

  } catch (error) {

    console.log(error);
  }
};

  if (loading) {

    return (

      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }



  return (

    <div className="
  min-h-screen
  bg-gray-100 text-black
  dark:bg-black dark:text-white
  transition-all duration-300
">

    <div className="max-w-6xl mx-auto p-5">

      {/* USER INFO */}

    <div className="
  bg-white dark:bg-zinc-900
  shadow rounded-2xl p-6 mb-8
">

        <h1 className="text-3xl font-bold mb-3">
          Profile
        </h1>

        <p className="text-lg">
          <span className="font-semibold">
            Username:
          </span>{" "}
          {user?.username}
        </p>

        <p className="text-lg mt-2">
          <span className="font-semibold">
            Email:
          </span>{" "}
          {user?.email}
        </p>

      </div>



      {/* BOOKMARKS */}

 <div>

        <h2 className="text-2xl font-bold mb-5">
          Saved Articles
        </h2>

        
        {
          bookmarks.length === 0 ? (

            <p>No bookmarks yet.</p>

          ) : (

            <div className="grid md:grid-cols-3 gap-5">

              {bookmarks.map((article) => (

                <div
                  key={article.id}
                 className="
  bg-white dark:bg-zinc-900
  rounded-2xl shadow overflow-hidden
"
                >

                  <img
                    src={article.image_url}
                    alt=""
                    className="w-full h-52 object-cover"
                  />

                  <div className="p-4">

                    <h3 className="font-bold text-lg">
                      {article.title}
                    </h3>

                    <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                      {article.description}
                    </p>

                    <a
                      href={article.article_url}
                      target="_blank"
                      className="text-blue-500 mt-3 inline-block"
                    >
                      Read More
                    </a>
                  <button
            onClick={() => handleDelete(article.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg ml-5 mt-4"
             >
              Remove
              </button>
                  </div>

                </div>
              ))}

            </div>
          )
        }

      </div>

    </div>
    </div>
  );
}

export default Profile;