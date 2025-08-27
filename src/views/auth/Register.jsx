import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";

const Register = () => {
  const { setToken, setUser } = useAuthContextProvider();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passowrdErrorMessage, setPasswordErrorMessage] = useState("");



  
  const onClickSubmitButton = (e) => {
    e.preventDefault();


    if (name === "") {
      setIsNameError(true);
      setNameErrorMessage("Please enter your name.");
    } else if (name.length < 4) {
      setIsNameError(true);
      setNameErrorMessage("The name is too short!");
    } else {
      if (name.length > 35) {
        setIsNameError(true);
        setNameErrorMessage("The name is too long!");
      }
    }

    if (email === "") {
      setIsEmailError(true);
      setEmailErrorMessage("Please enter your email address.");
    } else if (email.length < 4) {
      setIsEmailError(true);
      setEmailErrorMessage("The email address is too short!");
    } else {
      if (email.length > 35) {
        setIsEmailError(true);
        setEmailErrorMessage("The email address is too long!");
      }
    }

    if (password === "") {
      setIsPasswordError(true);
      setPasswordErrorMessage("Please enter password.");
    } else if (password.length < 6) {
      setIsPasswordError(true);
      setPasswordErrorMessage(
        "The password is too short! Enter atleast 6 characters."
      );
    } else {
      if (password.length > 35) {
        setIsPasswordError(true);
        setPasswordErrorMessage("The password is too long!");
      }
    }

    if (
      name.length > 4 &&
      email.length > 4 &&
      password.length >= 6 &&
      name.length <= 35 &&
      email.length <= 35 &&
      password.length < 30
    ) {
      const payload = {
        name,
        email,
        password,
      };

      axiosClient
        .post("/harritech/register", payload)
        .then(({ data }) => {
          setToken(data.token);
          setUser(data.user);
          console.log(data);
        })
        .catch((err) => {
          const { response } = err;

          if (response && response.status === 422) {
            console.log("validation error");

            if (response.data.errors["name"]) {
              setIsNameError(true);
              setNameErrorMessage(response.data.errors["name"]);
            }

            if (response.data.errors["email"]) {
              setIsEmailError(true);
              setEmailErrorMessage(response.data.errors["email"]);
            }

            if (response.data.errors["password"]) {
              setIsPasswordError(true);
              setPasswordErrorMessage(response.data.errors["password"]);
            }
          } else {
            console.log("do other search");
          }
          console.log(err);
        });
    }
  };
  return (
    <div className="w-full md:w-4/12 border auth-shadow p-2 rounded py-10">
      <h1 className="flex justify-center text-xl font-bold text-gray-800">
        SIGN UP
      </h1>

      <form className="space-y-4">
        <article>
          <label className=" font-bold text-sm ">Name</label>
          <input
            type="text"
            className="w-full outline-none border rounded p-3 text-sm my-shadow"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsNameError(false);
              setNameErrorMessage("");
            }}
          />
          {isNameError && (
            <small className="text-xs text-red-700 italic">
              {nameErrorMessage}
            </small>
          )}
        </article>

        <article>
          <label className=" font-bold text-sm">Email Address</label>
          <input
            type="text"
            className="w-full outline-none border rounded p-3 text-sm my-shadow"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailError(false);
              setEmailErrorMessage("");
            }}
          />
          {isEmailError && (
            <small className="text-xs text-red-700 italic">
              {emailErrorMessage}
            </small>
          )}
        </article>

        <article>
          <label className="font-bold text-sm">Set Password</label>
          <input
            type="password"
            className="w-full outline-none border rounded p-3 text-sm my-shadow"
            placeholder="**********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordError(false);
              setPasswordErrorMessage("");
            }}
          />

          {isPasswordError && (
            <small className="text-xs text-red-700 italic">
              {passowrdErrorMessage}
            </small>
          )}
        </article>

        <article className="pt-7">
          <button
            onClick={onClickSubmitButton}
            className="w-full py-2 bg-pink-700 text-white text-lg font-bold rounded-lg"
          >
            SIGN UP
          </button>
        </article>

        <article className="text-sm py-2">
          <div className="flex w-full justify-center italic">
            Already have an account?
          </div>
          <Link
            to="/auth/login"
            className="flex w-full justify-center text-green-700 underline"
          >
            Login here..
          </Link>
        </article>
      </form>
    </div>
  );
};

export default Register;
