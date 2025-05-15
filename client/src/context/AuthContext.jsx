import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const activeUser = localStorage.getItem("user");
  const [user, setUser] = useState(activeUser ? JSON.parse(activeUser) : null);

  const loginUser = async (user) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.error };
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true, message: data.message, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch(`/auth/logout`);
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.error };
      }
      localStorage.removeItem("user");
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const refreshUser = async (id) => {
    try {
      const response = await fetch(`/read/fetch_one_user/${id}`);
      const data = await response.json();
      if (!response.ok) {
        return { success: false, error: data.error };
      }
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loginUser, logoutUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
