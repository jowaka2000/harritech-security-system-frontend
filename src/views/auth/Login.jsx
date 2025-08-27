import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const { setUser, setToken } = useAuthContextProvider();
  const onClickSubmitButton = (e) => {
    e.preventDefault();

    if (username === "") {
      setIsUsernameError(true);
      setUsernameError("Please Enter Username.");
    } else if (username.length < 4) {
      setIsUsernameError(true);
      setUsernameError("Username is too short.");
    } else {
      if (username.length > 35) {
        setIsUsernameError(true);
        setUsernameError("The username is very long.");
      }
    }

    if (password === "") {
      setIsPasswordError(true);
      setPasswordError("Please Enter password.");
    } else if (password.length < 5) {
      setIsPasswordError(true);
      setPasswordError("The password is too short.");
    } else {
      if (password.length > 30) {
        setIsPasswordError(true);
        setPasswordError("The password is very long.");
      }
    }

    if (
      username.length > 3 &&
      password.length > 4 &&
      password.length <= 30 &&
      username.length <= 35
    ) {
      const payload = {
        email: username,
        password: password,
      };

      axiosClient
        .post("/harritech/login", payload)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="w-full md:w-4/12 border auth-shadow p-2 rounded py-10">
      <h1 className="flex justify-center text-xl font-bold text-gray-800">
        SIGN IN
      </h1>

      <form className="space-y-4">
        <article>
          <label className=" font-bold text-sm">Username</label>
          <input
            type="text"
            className="w-full outline-none border rounded p-3 text-sm my-shadow"
            placeholder="Enter username / Email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameError(false);
              setUsernameError("");
            }}
          />
          {isUsernameError && (
            <small className="text-xs text-red-700 italic">
              {usernameError}
            </small>
          )}
        </article>

        <article>
          <label className="font-bold text-sm">Password</label>
          <input
            type="password"
            className="w-full outline-none border rounded p-3 text-sm my-shadow"
            placeholder="**********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordError(false);
              setPasswordError("");
            }}
          />

          {isPasswordError && (
            <small className="text-xs text-red-700 italic">
              {passwordError}
            </small>
          )}
        </article>

        <article className="pt-7">
          <button
            onClick={onClickSubmitButton}
            className="w-full py-2 bg-pink-700 text-white text-lg font-bold rounded-lg"
          >
            SIGN IN
          </button>
        </article>

        <article className="text-sm py-2">
          <div className="flex w-full justify-center italic">
            Don't Have an account?
          </div>
          <Link
            to="/auth/sign-up"
            className="flex w-full justify-center text-green-700 underline"
          >
            Register Here.
          </Link>
        </article>
      </form>
    </div>
  );
};

export default Login;
