import { useEffect, useState } from "react";
import NewsCard from "../components/NewCard";
import API from "../api/axios";

function Home() {

  const [articles, setArticles] = useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);



  // FETCH NEWS
  const fetchNews = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/news/top-headlines?page=${page}&pageSize=10`
      );

      const newArticles = res.data.articles;

      // append new articles
      setArticles((prev) => [
        ...prev,
        ...newArticles
      ]);

      // stop pagination if no more articles
      if (newArticles.length < 10) {

        setHasMore(false);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };



  // FETCH WHEN PAGE CHANGES
  useEffect(() => {

    fetchNews();

  }, [page]);



  return (

    <div className="p-5 bg-white text-black dark:bg-black dark:text-white min-h-screen">

      <h1 className="text-3xl font-bold mb-5">
        Top Headlines
      </h1>



      {/* NEWS GRID */}

     <div className="grid md:grid-cols-3 gap-5">

  {articles.map((article, index) => (

    <NewsCard
      key={index}
      article={article}
    />

  ))}

</div>
      {/* LOAD MORE BUTTON */}

      <div className="flex justify-center mt-10">

        {
          hasMore && (

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className="
  bg-black text-white
  dark:bg-white dark:text-black
  px-6 py-3 rounded-xl
">
            

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

export default Home;