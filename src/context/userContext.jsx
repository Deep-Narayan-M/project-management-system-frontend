import React, { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New state to track loading

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("User not authenticated", error);
      clearUser();
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    fetchUser();
  }, [fetchUser]);

  const updateUser = (userData) => {
    // Only update token if it's provided (login/register)
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setUser(userData);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, loading, updateUser, clearUser, refetchUser: fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
