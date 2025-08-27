import { useState } from "react";
import { useContext } from "react";

const { createContext } = require("react");

const StateContext = createContext({
  token: null,
  user: {},
  setToken: () => {},
  setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [user, setUser] = useState({});

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  return (
    <StateContext.Provider
      value={{
        token,
        user,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuthContextProvider = () => useContext(StateContext);
