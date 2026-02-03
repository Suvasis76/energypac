import { createContext, useContext, useState } from "react";
import axiosSecure from "../api/axiosSecure";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ✅ derive initial auth state synchronously
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem("access_token"));
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  // auth check is complete immediately
  const [authChecked] = useState(true);

  /* =========================
     LOGIN
     ========================= */
  const login = async (employee_code, password) => {
    try {
      const res = await axiosSecure.post("/api/auth/login", {
        employee_code,
        password,
      });

      const userData = res.data.user;

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("user", JSON.stringify(userData));

      document.cookie = `refresh_token=${res.data.refresh}; path=/; max-age=86400; SameSite=Lax`;

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error(
        error.response?.data?.detail || "Invalid credentials"
      );
    }
  };

  /* =========================
     LOGOUT
     ========================= */
  const logout = () => {
    localStorage.clear();
    document.cookie = "refresh_token=; path=/; max-age=0";
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authChecked,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ⚠️ Fast Refresh warning may still appear (safe but optional fix below)
export const useAuth = () => useContext(AuthContext);
