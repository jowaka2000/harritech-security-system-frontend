import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

const Register = () => {
  const { setToken, setUser } = useAuthContextProvider();

  const [name, setName] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setIsNameError(true);
      setNameErrorMessage("Full name is required");
      return;
    }
    if (!email.trim()) {
      setIsEmailError(true);
      setEmailErrorMessage("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setIsEmailError(true);
      setEmailErrorMessage("Enter a valid email address");
      return;
    }
    if (!password.trim()) {
      setIsPasswordError(true);
      setPasswordErrorMessage("Password is required");
      return;
    }
    if (password.length < 6) {
      setIsPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters");
      return;
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign up to secure your future with{" "}
          <span className="text-pink-600 font-semibold">Harritech</span>
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className={`w-full bg-gray-50 border ${
                  isNameError ? "border-red-500" : "border-gray-300"
                } rounded-xl pl-10 pr-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition`}
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsNameError(false);
                  setNameErrorMessage("");
                }}
              />
            </div>
            {isNameError && (
              <p className="text-xs text-red-500 mt-1">{nameErrorMessage}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                className={`w-full bg-gray-50 border ${
                  isEmailError ? "border-red-500" : "border-gray-300"
                } rounded-xl pl-10 pr-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsEmailError(false);
                  setEmailErrorMessage("");
                }}
              />
            </div>
            {isEmailError && (
              <p className="text-xs text-red-500 mt-1">{emailErrorMessage}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full bg-gray-50 border ${
                  isPasswordError ? "border-red-500" : "border-gray-300"
                } rounded-xl pl-10 pr-10 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition`}
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsPasswordError(false);
                  setPasswordErrorMessage("");
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isPasswordError && (
              <p className="text-xs text-red-500 mt-1">
                {passwordErrorMessage}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-3">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-pink-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
