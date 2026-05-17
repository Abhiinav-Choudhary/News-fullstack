import admin from "../config/firebase.js";

import pool from "../db/connectDB.js";

import generateToken from "../utils/generateTokens.js";

export const googleAuth = async (req, res) => {

  try {

    const { token } = req.body;

    if (!token) {

      return res.status(400).json({
        success: false,
        message: "Token missing"
      });
    }

    // VERIFY FIREBASE TOKEN
    const decoded = await admin
      .auth()
      .verifyIdToken(token);

    const {
      email,
      name,
      picture
    } = decoded;

    // CHECK USER EXISTS
    const existingUser = await pool.query(
      `
      SELECT * FROM users
      WHERE email = $1
      `,
      [email]
    );

    let user;

    // CREATE USER IF NOT EXISTS
    if (existingUser.rows.length === 0) {

      const newUser = await pool.query(
        `
        INSERT INTO users
        (
          username,
          email,
          profile_pic
        )

        VALUES ($1, $2, $3)

        RETURNING *
        `,
        [
          name,
          email,
          picture
        ]
      );

      user = newUser.rows[0];

    } else {

      user = existingUser.rows[0];
    }

    // GENERATE JWT COOKIE
    generateToken(res, user.id);

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Google authentication failed"
    });
  }
};