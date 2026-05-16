import pool from "../db/connectDB.js";



// GET PROFILE
export const getProfile = async (req, res) => {

  try {

    const userId = req.user.id;

    const user = await pool.query(
      `
      SELECT id, username, email, created_at
      FROM users
      WHERE id=$1
      `,
      [userId]
    );

    res.status(200).json(user.rows[0]);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};




// ADD BOOKMARK
export const addBookmark = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      title,
      description,
      image_url,
      article_url
    } = req.body;

    const bookmark = await pool.query(
      `
      INSERT INTO bookmarks
      (user_id, title, description, image_url, article_url)

      VALUES ($1,$2,$3,$4,$5)

      RETURNING *
      `,
      [
        userId,
        title,
        description,
        image_url,
        article_url
      ]
    );

    res.status(201).json({
      message: "Bookmark Added",
      bookmark: bookmark.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};




// GET BOOKMARKS
export const getBookmarks = async (req, res) => {

  try {

    const userId = req.user.id;

    const bookmarks = await pool.query(
      `
      SELECT *
      FROM bookmarks
      WHERE user_id=$1
      ORDER BY created_at DESC
      `,
      [userId]
    );

    res.status(200).json(bookmarks.rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};




// DELETE BOOKMARK
export const deleteBookmark = async (req, res) => {

  try {

    const userId = req.user.id;

    const bookmarkId = req.params.id;

    await pool.query(
      `
      DELETE FROM bookmarks
      WHERE id=$1 AND user_id=$2
      `,
      [bookmarkId, userId]
    );

    res.status(200).json({
      message: "Bookmark Deleted"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};