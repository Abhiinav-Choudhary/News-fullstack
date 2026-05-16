import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

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



  // HANDLE SUBMIT
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



        {/* BUTTON */}

        <button
          className="
            w-full

            bg-black text-white
            dark:bg-white dark:text-black

            p-3 rounded-lg

            transition-all duration-300
          "
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;