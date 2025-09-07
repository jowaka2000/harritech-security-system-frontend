import React, { useState } from "react";
import icon from "../../assets/alarm.jpg";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import axiosClient from "../../axiosClient";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { useSecuritySystemsContextProvider } from "../../contexts/SecuritySystemsContextProvider";
const HomeNavBar = () => {
  const [isSideBar, setIsSideBar] = useState(false);

  const { token, setToken, setUser, user } = useAuthContextProvider();

  const [activeUrlName, setActiveUrlName] = useState("Home");

  const onClickLogoutButton = () => {
    axiosClient
      .get("/harritech/logout")
      .then(({ data }) => {
        setToken(null);
        setUser({});
        return <Navigate to="/" />;
      })
      .catch((err) => {
        console.log(err);
      });
    setIsSideBar(false);
    setActiveUrlName("Logout");
  };

  const [openProductId, setOpenProductId] = useState(null); // which product submenu is open
  const location = useLocation(); // gives current URL
  const currentPath = decodeURIComponent(location.pathname);
  const [isOpen, setIsOpen] = useState(false);
  const { productsAndSolutions } = useSecuritySystemsContextProvider();

  return (
    <section
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow ${
        isSideBar ? "mb-0 shadow-none" : "shadow-md"
      }`}
    >
      <nav
        className={`flex relative items-center justify-between py-6 px-4 md:px-0 w-full max-w-5xl mx-auto ${
          isSideBar ? "bg-pink-700 text-white" : ""
        }`}
      >
        {/* Left: Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-green-500 to-blue-600 flex items-center justify-center shadow-md">
            <img src={icon} alt="Harritech Logo" className="w-6 h-6" />
          </div>
          <span
            className={`font-extrabold tracking-wide text-xl md:text-2xl space-x-[2px] font-sans ${
              isSideBar || activeUrlName !== "Home"
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-600">
              Harri
            </span>
            <span
              className={
                isSideBar ? "text-white italic" : "text-pink-600 italic"
              }
            >
              tech
            </span>
          </span>
        </Link>

        {/* Center: Large screen menu (condensed + more) */}
        <article className="hidden lg:flex gap-8 items-center">
          {/* show first two categories as main items to keep center compact */}
          {(productsAndSolutions ?? []).slice(0, 3).map((product) => {
            const label =
              typeof product?.name === "string" && product.name.length
                ? product.name.charAt(0).toUpperCase() + product.name.slice(1)
                : "";

            return (
              <div key={product.id ?? label} className="relative group">
                <button
                  type="button"
                  aria-haspopup="true"
                  className="cursor-pointer font-medium text-gray-700 hover:text-pink-600 focus:outline-none"
                >
                  {label}
                </button>

                <div className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md z-50 min-w-[220px]">
                  <div className="py-2">
                    {(product.elements ?? []).map((el) => {
                      // build path: if backend returned a full path (starts with '/'), use it; otherwise prefix
                      const path = el?.url?.startsWith("/")
                        ? el.url
                        : `/security-systems/${el?.url ?? ""}`;

                      return (
                        <Link
                          key={el.id ?? el.name}
                          to={path}
                          onClick={() => setActiveUrlName(el.name)}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            currentPath === path
                              ? "text-pink-600 font-semibold"
                              : "text-gray-700"
                          } hover:bg-gray-100 hover:text-pink-600`}
                        >
                          {el.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* More Dropdown */}
          <div className="relative group">
            <button className="cursor-pointer font-medium text-gray-700 hover:text-pink-600 focus:outline-none">
              More
            </button>

            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md z-50 min-w-[200px]">
              <div className="py-2">
                {(productsAndSolutions ?? []).slice(3).map((p) => {
                  const pname =
                    typeof p?.name === "string" && p.name.length
                      ? p.name.charAt(0).toUpperCase() + p.name.slice(1)
                      : "";

                  return (
                    <div
                      key={p.id ?? pname}
                      className="border-b last:border-b-0 border-gray-100"
                    >
                      <div className="px-4 py-2 text-sm font-semibold text-gray-800">
                        {pname}
                      </div>

                      {(p.elements ?? []).map((el) => {
                        const path = el?.url?.startsWith("/")
                          ? el.url
                          : `/security-systems/${el?.url ?? ""}`;

                        return (
                          <Link
                            key={el.id ?? el.name}
                            to={path}
                            onClick={() => setActiveUrlName(el.name)}
                            className={`block px-6 py-2 text-sm transition-colors ${
                              currentPath === path
                                ? "text-pink-600 font-semibold"
                                : "text-gray-700"
                            } hover:bg-gray-100 hover:text-pink-600`}
                          >
                            {el.name}
                          </Link>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Utility links */}
                <Link
                  to="/info/about-us"
                  onClick={() => setActiveUrlName("About Us")}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    currentPath === "/info/about-us"
                      ? "text-pink-600 font-semibold"
                      : "text-gray-700"
                  } hover:bg-gray-100 hover:text-pink-600`}
                >
                  About Us
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setActiveUrlName("Contact")}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    currentPath === "/contact"
                      ? "text-pink-600 font-semibold"
                      : "text-gray-700"
                  } hover:bg-gray-100 hover:text-pink-600`}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Right: Phone + Login/Profile */}
        <article className="hidden lg:flex items-center gap-4">
          <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-pink-50 shadow-sm w-fit">
            <FaPhoneAlt className="text-pink-700 text-sm" />
            <a
              href="tel:+254796802258"
              className="font-semibold text-pink-700 tracking-wide"
            >
              0706 074 540
            </a>
          </div>

          {!token && (
            <Link
              to="/auth/login"
              onClick={() => setActiveUrlName("Login")}
              className={`px-4 py-2 rounded-lg font-medium border border-green-500 text-green-600 hover:bg-green-50 transition ${
                location.pathname === "/auth/login" ? "bg-green-100" : ""
              }`}
            >
              Login
            </Link>
          )}

          {token && (
            <div className="relative">
              {/* Avatar Circle */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 hover:ring-green-400 transition-all select-none"
              >
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg z-40 overflow-hidden"
                  >
                    <Link
                      to="/security-systems/create-posts"
                      onClick={() => {
                        setActiveUrlName("Create Posts");
                        setIsOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm hover:bg-green-50 ${
                        location.pathname === "/security-systems/create-posts"
                          ? "text-green-500 font-semibold"
                          : "text-gray-800"
                      }`}
                    >
                      Create Post
                    </Link>
                    <button
                      onClick={() => {
                        onClickLogoutButton();
                        setIsOpen(false);
                      }}
                      className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </article>

        {/* Mobile */}
        <article className="lg:hidden flex items-center">
          <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-pink-50 shadow-sm w-fit">
            <FaPhoneAlt className="text-pink-700 text-sm" />
            <a
              href="tel:+254796802258"
              className="font-semibold text-pink-700 text-sm tracking-wide"
            >
              0706 074 540
            </a>
          </div>
          <button
            onClick={() => setIsSideBar(!isSideBar)}
            className="p-1 py-2 rounded-md"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSideBar ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaTimes className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaBars className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </article>

        {/* Mobile Sidebar */}
        {isSideBar && (
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute flex lg:hidden flex-col w-full top-20 bg-pink-700 text-white bg-opacity-95 left-0 z-50"
          >
            <div className="w-full">
              <section className="w-full">
                <Link
                  to="/"
                  onClick={() => {
                    setIsSideBar(false);
                    setActiveUrlName("Home");
                  }}
                  className={`block px-4 py-3 border-b border-gray-300 font-bold ${
                    location.pathname === "/" ? "text-green-400" : "text-white"
                  }`}
                >
                  Home
                </Link>
              </section>

              {productsAndSolutions.map((product) => (
                <section
                  key={product.id}
                  className="w-full border-b border-gray-300"
                >
                  <article
                    onClick={() =>
                      setOpenProductId(
                        openProductId === product.id ? null : product.id
                      )
                    }
                    className="flex justify-between px-4 py-3 cursor-pointer"
                  >
                    <span className="font-bold">{product.name}</span>
                    <span>{openProductId === product.id ? "▲" : "▼"}</span>
                  </article>

                  {openProductId === product.id &&
                    (product.elements ?? []).map((el) => {
                      const path = el?.url?.startsWith("/")
                        ? el.url
                        : `/security-systems/${el?.url ?? ""}`;

                      return (
                        <Link
                          key={el.id ?? el.name}
                          to={path}
                          onClick={() => setIsSideBar(false)}
                          className={`block px-8 py-2 text-sm ${
                            location.pathname === path
                              ? "text-green-400"
                              : "text-white"
                          }`}
                        >
                          {el?.name ?? ""}
                        </Link>
                      );
                    })}
                </section>
              ))}

              <section className="w-full p-3 border-b">
                <Link
                  to="/info/about-us"
                  onClick={() => {
                    setIsSideBar(false);
                    setActiveUrlName("About Us");
                  }}
                  className={`font-bold ${
                    location.pathname === "/info/about-us"
                      ? "text-green-400"
                      : "text-white"
                  }`}
                >
                  About Us
                </Link>
              </section>

              {!token && (
                <section className="w-full p-3">
                  <Link
                    to="/auth/login"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Login");
                    }}
                    className={`font-bold ${
                      location.pathname === "/auth/login"
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    Login
                  </Link>
                </section>
              )}
              {token && (
                <>
                  <section className="w-full p-3">
                    <button
                      onClick={onClickLogoutButton}
                      type="button"
                      className="font-bold"
                    >
                      Logout
                    </button>
                  </section>
                  <section className="w-full p-3">
                    <Link
                      to="/security-systems/create-posts"
                      onClick={() => {
                        setIsSideBar(false);
                        setActiveUrlName("Create Posts");
                      }}
                      className={`font-bold ${
                        location.pathname === "/security-systems/create-posts"
                          ? "text-green-400"
                          : "text-white"
                      }`}
                    >
                      Create Post
                    </Link>
                  </section>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </section>
  );
};

export default HomeNavBar;
