import { useEffect, useState } from "react";
import NewCard from "../components/NewCard";
import { useSearchParams } from "react-router-dom";

import API from "../api/axios";

function Search() {

  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const [articles, setArticles] = useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);



  // FETCH SEARCH RESULTS
  const fetchSearchResults = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/news/search?q=${query}&page=${page}&pageSize=10`
      );

      const newArticles = res.data.articles;

      setArticles((prev) => [
        ...prev,
        ...newArticles
      ]);

      if (newArticles.length < 10) {

        setHasMore(false);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };



  // RESET WHEN QUERY CHANGES
  useEffect(() => {

    setArticles([]);

    setPage(1);

    setHasMore(true);

  }, [query]);



  // FETCH DATA
  useEffect(() => {

    fetchSearchResults();

  }, [page, query]);



  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">

        Search Results for:
        <span className="text-blue-500">
          {" "}{query}
        </span>

      </h1>



     <div className="grid md:grid-cols-3 gap-5">

  {articles.map((article, index) => (

    <NewCard
      key={index}
      article={article}
    />

  ))}

</div>

      {/* LOAD MORE */}

      <div className="flex justify-center mt-10">

        {
          hasMore && (

            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >

              {
                loading
                  ? "Loading..."
                  : "Load More"
              }

            </button>
          )
        }

      </div>

    </div>
  );
}

export default Search;