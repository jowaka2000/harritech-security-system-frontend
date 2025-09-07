import { useState } from "react";
import { useContext } from "react";
import axiosClient from "../axiosClient";

const { createContext } = require("react");

const StateContext = createContext({
  token: '',
  user: {},
  isAdmin: Boolean,
  getMe:()=>{},
  setIsAdmin: () => {},
  setToken: () => {},
  setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const getMe = () => {
    axiosClient
      .get("/user")
      .then((res) => {
        // Assuming backend returns { user: {...}, isAdmin: true/false }
        setUser(res.data.user);
        setIsAdmin(res.data.isAdmin);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  };
  return (
    <StateContext.Provider
      value={{
        token,
        user,
        isAdmin,
        getMe,
        setIsAdmin,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuthContextProvider = () => useContext(StateContext);
