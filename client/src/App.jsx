import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import CategoryNavbar from "./components/CategoryNavbar";
import Category from "./pages/Category";
import Search from "./pages/Search";

function AppContent() {

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

    

  return (
    <>
    <div
  className={
    hideNavbar
      ? ""
      : `
        min-h-screen
        bg-gray-100 text-black
        dark:bg-black dark:text-white
        transition-all duration-300
      `
  }
>
      {!hideNavbar && (
        <>
          <Navbar />
          <CategoryNavbar />
        </>
      )}

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/:category"
          element={<Category />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

      </Routes>
      </div>
    </>

  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;