import pool from "../db/connectDB.js";
import bcrypt from "bcryptjs";

import generateToken from "../utils/generateTokens.js";



// REGISTER
export const register = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // check existing user
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // insert user
    const newUser = await pool.query(
      `INSERT INTO users (username,email,password)
       VALUES ($1,$2,$3)
       RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    // generate jwt cookie
    generateToken(res, newUser.rows[0].id);

    res.status(201).json({
      message: "User Registered",
      user: newUser.rows[0]
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};



// LOGIN
export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // find user
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    // generate jwt cookie
    generateToken(res, user.rows[0].id);

    res.status(200).json({
      message: "Login Successful",
      user: {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};



// LOGOUT
export const logout = async (req, res) => {

  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/"
    });

    res.status(200).json({
      message: "Logout Successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const getMe = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            message: "User retrieved successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
}