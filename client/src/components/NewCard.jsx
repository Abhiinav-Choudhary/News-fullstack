import { useState } from "react";

import API from "../api/axios";

function NewsCard({ article }) {

  const [saved, setSaved] = useState(false);

  const [loading, setLoading] = useState(false);

  const [summaryLoading, setSummaryLoading] = useState(false);

  const [summary, setSummary] = useState("");



  // SAVE BOOKMARK
  const handleBookmark = async () => {

    try {

      setLoading(true);

      await API.post(
        "/user/bookmark",
        {
          title: article.title,
          description: article.description,
          image_url: article.urlToImage,
          article_url: article.url
        }
      );

      setSaved(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to save article"
      );

    } finally {

      setLoading(false);
    }
  };



  // AI SUMMARY
  const handleSummary = async () => {

    try {

      setSummaryLoading(true);

      const res = await API.post(
        "/ai/summarize",
        {
          title: article.title,
          description: article.description
        }
      );

      setSummary(res.data.summary);

    } catch (error) {

      console.log(error);

      alert("Failed to generate summary");

    } finally {

      setSummaryLoading(false);
    }
  };



  return (

    <div
      className="
        bg-white dark:bg-zinc-900
        rounded-2xl shadow overflow-hidden

        transition-all duration-300

        flex flex-col h-full
      "
    >

      {/* IMAGE */}

      <img
        src={article.urlToImage}
        alt=""
        className="w-full h-52 object-cover"
      />



      {/* CONTENT */}

      <div className="p-4 flex flex-col flex-grow">

        <h2 className="font-bold text-lg">
          {article.title}
        </h2>



        {/* DESCRIPTION */}

        <p
          className="
            text-sm mt-2
            text-gray-600 dark:text-gray-300

            flex-grow
          "
        >
          {article.description}
        </p>



        {/* BUTTONS */}

        <div className="flex flex-wrap gap-2 mt-4 pt-4">

          {/* READ MORE */}

          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Read More
          </a>



          {/* SAVE BUTTON */}

          <button
            onClick={handleBookmark}
            disabled={loading || saved}
            className="
              bg-black text-white
              dark:bg-white dark:text-black

              px-4 py-2 rounded-lg
            "
          >

            {
              loading
                ? "Saving..."
                : saved
                  ? "Saved"
                  : "Save"
            }

          </button>



          {/* AI SUMMARY BUTTON */}

          <button
            onClick={handleSummary}
            disabled={summaryLoading}
            className="
              bg-purple-600 text-white

              px-4 py-2 rounded-lg
            "
          >

            {
              summaryLoading
                ? "Summarizing..."
                : "AI Summary"
            }

          </button>

        </div>



        {/* AI SUMMARY BOX */}

        {
          summary && (

            <div
              className="
                mt-5 p-4 rounded-xl

                bg-gray-100 dark:bg-zinc-800
              "
            >

              <h3 className="font-bold mb-2">
                AI Summary
              </h3>

              <p className="text-sm whitespace-pre-line">
                {summary}
              </p>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default NewsCard;