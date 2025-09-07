import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import { Eye, EyeOff, Lock, User } from "lucide-react";


const Login = () => {
  const { setUser, setToken } = useAuthContextProvider();
  const [username, setUsername] = useState("");
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setIsUsernameError(true);
      setUsernameError("Username or Email is required");
      return;
    }

    if (!password.trim()) {
      setIsPasswordError(true);
      setPasswordError("Password is required");
      return;
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
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to your{" "}
          <span className="text-pink-600 font-semibold">Harritech</span> account
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username / Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">
              Username / Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                className={`w-full bg-gray-50 border ${
                  isUsernameError ? "border-red-500" : "border-gray-300"
                } rounded-xl pl-10 pr-3 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600 transition`}
                placeholder="Enter username or email"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setIsUsernameError(false);
                  setUsernameError("");
                }}
              />
            </div>
            {isUsernameError && (
              <p className="text-xs text-red-500 mt-1">{usernameError}</p>
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
                  setPasswordError("");
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
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-xs text-pink-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 transition-all duration-300 text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center my-3">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/auth/sign-up"
              className="text-pink-600 hover:underline font-medium"
            >
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
