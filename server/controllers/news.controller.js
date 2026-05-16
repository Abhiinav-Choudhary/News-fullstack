import axios from "axios";

const BASE_URL = "https://newsapi.org/v2";



// ============================
// TOP HEADLINES
// ============================

export const getTopHeadlines = async (req, res) => {

  try {

    const page = parseInt(req.query.page) || 1;

    const pageSize = parseInt(req.query.pageSize) || 10;

    const response = await axios.get(
      `${BASE_URL}/top-headlines`,
      {
        params: {
          country: "us",
          page,
          pageSize,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    // filter invalid articles
    const filteredArticles = response.data.articles.filter(
      article =>
        article.title &&
        article.urlToImage &&
        article.url
    );

    res.status(200).json({
      success: true,
      totalResults: response.data.totalResults,
      currentPage: page,
      pageSize,
      articles: filteredArticles
    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch top headlines"
    });
  }
};




// ============================
// CATEGORY NEWS
// ============================

export const getCategoryNews = async (req, res) => {

  try {

    const { category } = req.params;

    const page = parseInt(req.query.page) || 1;

    const pageSize = parseInt(req.query.pageSize) || 10;

    const response = await axios.get(
      `${BASE_URL}/top-headlines`,
      {
        params: {
          country: "us",
          category,
          page,
          pageSize,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    // filter invalid articles
    const filteredArticles = response.data.articles.filter(
      article =>
        article.title &&
        article.urlToImage &&
        article.url
    );

    res.status(200).json({
      success: true,
      category,
      totalResults: response.data.totalResults,
      currentPage: page,
      pageSize,
      articles: filteredArticles
    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category news"
    });
  }
};




// ============================
// SEARCH NEWS
// ============================

export const searchNews = async (req, res) => {

  try {

    const { q } = req.query;

    const page = parseInt(req.query.page) || 1;

    const pageSize = parseInt(req.query.pageSize) || 10;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    const response = await axios.get(
      `${BASE_URL}/everything`,
      {
        params: {
          q,
          language: "en",
          sortBy: "publishedAt",
          page,
          pageSize,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    // filter invalid articles
    const filteredArticles = response.data.articles.filter(
      article =>
        article.title &&
        article.urlToImage &&
        article.url
    );

    res.status(200).json({
      success: true,
      query: q,
      totalResults: response.data.totalResults,
      currentPage: page,
      pageSize,
      articles: filteredArticles
    });

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Failed to search news"
    });
  }
};