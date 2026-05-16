import { useEffect, useState } from "react";
import NewsCard from "../components/NewCard";
import { useParams } from "react-router-dom";

import API from "../api/axios";

function Category() {

  const { category } = useParams();

  const [articles, setArticles] = useState([]);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);



  // FETCH CATEGORY NEWS
  const fetchCategoryNews = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        `/news/category/${category}?page=${page}&pageSize=10`
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



  // RESET WHEN CATEGORY CHANGES
  useEffect(() => {

    setArticles([]);

    setPage(1);

    setHasMore(true);

  }, [category]);



  // FETCH DATA
  useEffect(() => {

    fetchCategoryNews();

  }, [page, category]);



  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5 capitalize">
        {category} News
      </h1>


    <div className="grid md:grid-cols-3 gap-5">

  {articles.map((article, index) => (

    <NewsCard
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

export default Category;