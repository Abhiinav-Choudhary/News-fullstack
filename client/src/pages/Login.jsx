import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import API from "../api/axios";

import {
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  provider
} from "../firebase";

function Login() {

  const navigate = useNavigate();

  const { login, setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // NORMAL LOGIN
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await login(formData);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {

    try {

      // FIREBASE POPUP
      const result =
        await signInWithPopup(
          auth,
          provider
        );

      // FIREBASE TOKEN
      const token =
        await result.user.getIdToken();

      // SEND TOKEN TO BACKEND
      const res = await API.post(
        "/auth/google",
        { token }
      );

      // SET USER
      setUser(res.data.user);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Google Login Failed");
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex items-center justify-center

        bg-gray-100
        dark:bg-black

        transition-all duration-300
      "
    >

      <form
        onSubmit={handleSubmit}
        className="
          bg-white dark:bg-zinc-900

          p-8 rounded-2xl shadow-lg

          w-[400px]

          transition-all duration-300
        "
      >

        <h1
          className="
            text-3xl font-bold mb-6 text-center

            text-black
            dark:text-white
          "
        >
          Login
        </h1>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="
            w-full border p-3 rounded-lg mb-4 outline-none

            bg-white text-black
            dark:bg-zinc-800 dark:text-white

            placeholder:text-gray-500
            dark:placeholder:text-gray-400
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="
            w-full border p-3 rounded-lg mb-5 outline-none

            bg-white text-black
            dark:bg-zinc-800 dark:text-white

            placeholder:text-gray-500
            dark:placeholder:text-gray-400
          "
        />

        {/* LOGIN BUTTON */}
        <button
          className="
            w-full

            bg-black text-white
            dark:bg-white dark:text-black

            p-3 rounded-lg mb-4

            transition-all duration-300
          "
        >
          Login
        </button>

        {/* DIVIDER */}
        <div className="flex items-center mb-4">

          <div className="flex-1 h-[1px] bg-gray-300"></div>

          <span className="mx-3 text-gray-500">
            OR
          </span>

          <div className="flex-1 h-[1px] bg-gray-300"></div>

        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="
            w-full

            border border-gray-300

            bg-white text-black

            p-3 rounded-lg

            flex items-center justify-center gap-3

            hover:bg-gray-100

            transition-all duration-300
          "
        >

          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />

          Continue with Google

        </button>

      </form>

    </div>
  );
}

export default Login;