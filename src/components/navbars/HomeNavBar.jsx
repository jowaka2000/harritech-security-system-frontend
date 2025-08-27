import React, { useState } from "react";
import icon from "../../assets/alarm.jpg";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import axiosClient from "../../axiosClient";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

const HomeNavBar = () => {
  const [isSideBar, setIsSideBar] = useState(false);

  const { token, setToken, setUser } = useAuthContextProvider();

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

  const slugify = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const productsAndSolutions = [
    {
      id: 1,
      name: "Cameras",
      elements: [
        {
          id: 1,
          url: slugify("/security-systems/Ip Cameras"),
          name: "IP Cameras",
        },
        {
          id: 2,
          url: slugify("/security-systems/DVRs and NVRs"),
          name: "DVRs and NVRs",
        },
        {
          id: 3,
          url: slugify("/security-systems/Analogue HD Cameras"),
          name: "Analogue HD Cameras",
        },
        {
          id: 4,
          url: slugify("/security-systems/Vehicle DVRs"),
          name: "Vehicle DVRs",
        },
        {
          id: 5,
          url: slugify("/security-systems/Vehicle Cameras"),
          name: "Vehicle Cameras",
        },
      ],
    },
    {
      id: 2,
      name: "Biometric Systems",
      elements: [
        {
          id: 1,
          url: slugify("/security-systems/Access Control"),
          name: "Access Control",
        },
        {
          id: 2,
          url: slugify("/security-systems/Attendance Systems"),
          name: "Attendance Systems",
        },
        {
          id: 3,
          url: slugify("/security-systems/Software and Solutions"),
          name: "Software and Solutions",
        },
      ],
    },
    {
      id: 3,
      name: "Perimeter Security",
      elements: [
        {
          id: 1,
          url: slugify("/security-systems/Electric Fence"),
          name: "Electric Fence",
        },
        {
          id: 2,
          url: slugify("/security-systems/Automatic Gates"),
          name: "Automatic Gates",
        },
      ],
    },

    {
      id: 4,
      name: "Alarm System",
      elements: [
        {
          id: 1,
          url: slugify("/security-systems/Intruder Alarm Systems"),
          name: "Intruder Alarm Systems",
        },
        {
          id: 2,
          url: slugify("/security-systems/Fire Alarm Systems"),
          name: "Fire Alarm Systems",
        },
        {
          id: 3,
          url: slugify("/security-systems/Fire Doors"),
          name: "Fire Doors",
        },
      ],
    },
    {
      id: 5,
      name: "system Guidance",
      elements: [
        {
          id: 1,
          url: slugify("/security-systems/CCTV Installation Guide"),
          name: "CCTV Installation Guide",
        },
        {
          id: 2,
          url: slugify("/security-systems/Home Security Systems Setup"),
          name: "Home Security Systems Setup",
        },
        {
          id: 3,
          url: slugify("/security-systems/Security Consultancy"),
          name: "Security Consultancy",
        },
      ],
    },
  ];

  return (
    <section
      className={`flex w-full md:justify-center  ${
        isSideBar ? "mb-0 shadow-none" : "mb-1 shadow-md"
      }`}
    >
      <nav
        className={`flex relative items-center justify-between py-6 px-4 md:px-0 w-full max-w-5xl mx-auto  ${
          isSideBar ? "bg-pink-700 text-white" : ""
        }`}
      >
        {/* Left: Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-2">
          {/* Logo Circle */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-green-500 to-blue-600 flex items-center justify-center shadow-md">
            <img src={icon} alt="Harritech Logo" className="w-6 h-6" />
          </div>

          {/* Brand Name */}
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
          {productsAndSolutions.slice(0, 2).map((product) => (
            <div key={product.id} className="relative group">
              <button
                type="button"
                className="cursor-pointer font-medium text-gray-700 hover:text-pink-600 focus:outline-none"
              >
                {product.name}
              </button>

              {/* Dropdown: positioned directly below the trigger (no gap) */}
              <div className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md z-50 min-w-[220px]">
                <div className="py-2">
                  {product.elements.map((el) => (
                    <Link
                      key={el.id}
                      to={el.url}
                      onClick={() => setActiveUrlName(el.name)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        currentPath === el.url
                          ? "text-pink-600 font-semibold"
                          : "text-gray-700"
                      } hover:bg-gray-100 hover:text-pink-600`}
                    >
                      {el.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* New list item: Services */}
          <div className="relative group">
            <button className="cursor-pointer font-medium text-gray-700 hover:text-pink-600 focus:outline-none">
              Services
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md z-50 min-w-[220px]">
              <div className="py-2">
                <Link
                  to="/services/installation"
                  onClick={() => setActiveUrlName("Installation")}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    currentPath === "/services/installation"
                      ? "text-pink-600 font-semibold"
                      : "text-gray-700"
                  } hover:bg-gray-100 hover:text-pink-600`}
                >
                  Installation
                </Link>
                <Link
                  to="/services/maintenance"
                  onClick={() => setActiveUrlName("Maintenance")}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    currentPath === "/services/maintenance"
                      ? "text-pink-600 font-semibold"
                      : "text-gray-700"
                  } hover:bg-gray-100 hover:text-pink-600`}
                >
                  Maintenance
                </Link>
                <Link
                  to="/services/consultancy"
                  onClick={() => setActiveUrlName("Consultancy")}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    currentPath === "/services/consultancy"
                      ? "text-pink-600 font-semibold"
                      : "text-gray-700"
                  } hover:bg-gray-100 hover:text-pink-600`}
                >
                  Consultancy
                </Link>
              </div>
            </div>
          </div>

          {/* More dropdown (holds remaining categories + About/Contact) */}
          <div className="relative group">
            <button className="cursor-pointer font-medium text-gray-700 hover:text-pink-600 focus:outline-none">
              More
            </button>

            <div className="absolute left-0 top-full hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md z-50 min-w-[200px]">
              <div className="py-2">
                {/* remaining categories (slice from index 2) */}
                {productsAndSolutions.slice(2).map((p) => (
                  <div
                    key={p.id}
                    className="border-b last:border-b-0 border-gray-100"
                  >
                    <div className="px-4 py-2 text-sm font-semibold text-gray-800">
                      {p.name}
                    </div>
                    {p.elements.map((el) => (
                      <Link
                        key={el.id}
                        to={el.url}
                        onClick={() => setActiveUrlName(el.name)}
                        className={`block px-6 py-2 text-sm transition-colors ${
                          currentPath === el.url
                            ? "text-pink-600 font-semibold"
                            : "text-gray-700"
                        } hover:bg-gray-100 hover:text-pink-600`}
                      >
                        {el.name}
                      </Link>
                    ))}
                  </div>
                ))}

                {/* utility links */}
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

        {/* Right: Phone + Profile Menu */}
        <article className="hidden lg:flex items-center gap-4">
          {/* Phone Number */}
          <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-pink-50 shadow-sm w-fit">
            <FaPhoneAlt className="text-pink-700 text-sm" />
            <a
              href="tel:+254796802258"
              className="font-semibold text-pink-700  tracking-wide"
            >
              0796 802 258
            </a>
          </div>

          {/* If not logged in, show Login button */}
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

          {/* If logged in, show Profile dropdown */}
          {token && (
            <div className="relative group">
              {/* Avatar Circle */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white font-bold cursor-pointer group-hover:ring-2 group-hover:ring-green-400 transition">
                U
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-lg mt-1 min-w-[180px] z-40">
                <Link
                  to="/security-systems/create-posts"
                  onClick={() => setActiveUrlName("Create Posts")}
                  className={`block px-4 py-2 hover:bg-green-50 ${
                    location.pathname === "/security-systems/create-posts"
                      ? "text-green-500 font-semibold"
                      : ""
                  }`}
                >
                  Create Post
                </Link>
                <button
                  onClick={onClickLogoutButton}
                  className="w-full text-left block px-4 py-2 hover:bg-red-50 text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </article>

        {/* Mobile menu button */}
        <article className="lg:hidden flex items-center  ">
          <div className="flex items-center space-x-2 px-2 py-1 rounded-md bg-pink-50 shadow-sm w-fit">
            <FaPhoneAlt className="text-pink-700 text-sm" />
            <a
              href="tel:+254796802258"
              className="font-semibold text-pink-700 text-sm tracking-wide"
            >
              0796 802 258
            </a>
          </div>

          <button
            onClick={() => setIsSideBar(!isSideBar)}
            className={`p-2 rounded-md  transition`}
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
            whileInView={{ y: 0 }}
            transition={{ transition: 1 }}
            className="absolute flex lg:hidden flex-col w-full top-20 bg-pink-700 text-white bg-opacity-[0.95] left-0 z-50"
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

              {/* Reuse dropdown for mobile */}
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
                    product.elements.map((element) => (
                      <Link
                        key={element.id}
                        to={element.url}
                        onClick={() => setIsSideBar(false)}
                        className={`block px-8 py-2 text-sm ${
                          location.pathname === element.url
                            ? "text-green-400"
                            : "text-white"
                        }`}
                      >
                        {element.name}
                      </Link>
                    ))}
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
