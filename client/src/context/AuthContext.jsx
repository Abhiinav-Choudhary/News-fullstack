import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // CHECK LOGIN
  const checkAuth = async () => {

    try {

      const res = await API.get("/auth/me");

      setUser(res.data.user);

    } catch (error) {

      setUser(null);
    }

    setLoading(false);
  };


  useEffect(() => {

    checkAuth();

  }, []);



  // LOGIN
  const login = async (formData) => {

    const res = await API.post(
      "/auth/login",
      formData
    );

    setUser(res.data.user);

    return res.data;
  };



  // REGISTER
  const register = async (formData) => {

    const res = await API.post(
      "/auth/register",
      formData
    );

    setUser(res.data.user);

    return res.data;
  };



  // LOGOUT
  const logout = async () => {

    await API.get("/auth/logout");

    setUser(null);
  };



  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};



export const useAuth = () => {

  return useContext(AuthContext);
};