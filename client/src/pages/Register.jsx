
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import AuthLayout from "../components/AuthLayout";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Register() {
  const navigate = useNavigate();
  const { register, setUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;

    try {
      setSubmitting("email");
      setErrorMessage("");

      await register(formData);

      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "We couldn't create your account. Please try again."
      );
    } finally {
      setSubmitting("");
    }
  };

  const handleGoogleAuth = async () => {
    if (submitting) return;

    try {
      setSubmitting("google");
      setErrorMessage("");

      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const res = await API.post("/auth/google", { token });

      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      console.error("Google authentication failed:", error);

      setErrorMessage(
        error.response?.data?.message ||
          "Google authentication failed. Please try again."
      );
    } finally {
      setSubmitting("");
    }
  };

  return (
    <AuthLayout mode="register">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* USERNAME */}
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Username
          </label>

          <div className="relative">
            <UserRound
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="username"
              type="text"
              name="username"
              autoComplete="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
              className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Email address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400"
            />

            <button
              type="button"
              onClick={() => setPasswordVisible((value) => !value)}
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {passwordVisible ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Use at least 8 characters, subject to your backend's password rules.
          </p>
        </div>

        {/* ERROR */}
        {errorMessage && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          >
            {errorMessage}
          </div>
        )}

        {/* REGISTER BUTTON */}
        <button
          type="submit"
          disabled={Boolean(submitting)}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/15 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting === "email" && (
            <LoaderCircle size={18} className="animate-spin" />
          )}

          {submitting === "email" ? "Creating account..." : "Create your account"}
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Or sign up with
          </span>

          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={Boolean(submitting)}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {submitting === "google" ? (
            <LoaderCircle size={19} className="animate-spin" />
          ) : (
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt=""
              className="h-5 w-5"
            />
          )}

          {submitting === "google"
            ? "Connecting to Google..."
            : "Continue with Google"}
        </button>
      </form>

      {/* LOGIN LINK */}
      <p className="mt-7 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
