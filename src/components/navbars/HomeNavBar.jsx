import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import { useSecuritySystemsContextProvider } from "../../contexts/SecuritySystemsContextProvider";
import axiosClient from "../../axiosClient";
import icon from "../../assets/alarm.jpg";

// Import Lucide Icons
import { 
  Menu, 
  X, 
  Phone, 
  User, 
  ShieldCheck, 
  ChevronDown,
  LogOut,
  FilePlus 
} from "lucide-react";

const HomeNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = decodeURIComponent(location.pathname);

  // Context States
  const { token, setToken, setUser, user, isAdmin } = useAuthContextProvider();
  const { productsAndSolutions } = useSecuritySystemsContextProvider();

  // Local States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openMobileProductId, setOpenMobileProductId] = useState(null);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const onClickLogoutButton = () => {
    axiosClient
      .get("/harritech/logout")
      .then(({ data }) => {
        setToken(null);
        setUser({});
        navigate("/"); // Correct way to navigate after action
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <nav className="relative flex items-center justify-between px-4 md:px-8 w-full max-w-7xl mx-auto h-20">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <img src={icon} alt="Harristech Logo" className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-700">
              Harris
            </span>
            <span className="font-bold text-lg text-slate-700 -mt-1 italic">
              tech
            </span>
          </div>
        </Link>

        {/* Center: Desktop Menu */}
        <article className="hidden lg:flex items-center gap-1">
          {/* Main Solutions Dropdowns (First 3) */}
          {(productsAndSolutions ?? []).slice(0, 3).map((product) => {
            const label = product?.name 
              ? product.name.charAt(0).toUpperCase() + product.name.slice(1) 
              : "";

            return (
              <div key={product.id ?? label} className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                  {label}
                  <ChevronDown size={14} className="opacity-50 group-hover:translate-y-0.5 transition-transform" />
                </button>

                {/* Dropdown Content */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px] overflow-hidden">
                    {(product.elements ?? []).map((el) => {
                      const path = el?.url?.startsWith("/") 
                        ? el.url 
                        : `/security-systems/${el?.url ?? ""}`;
                      const isActive = currentPath === path;

                      return (
                        <Link
                          key={el.id ?? el.name}
                          to={path}
                          className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                          }`}
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

          {/* "More" Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              More Solutions
              <ChevronDown size={14} className="opacity-50 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-2 min-w-[240px]">
                <div className="space-y-1">
                  {(productsAndSolutions ?? []).slice(3).map((p) => {
                    const pname = p?.name 
                      ? p.name.charAt(0).toUpperCase() + p.name.slice(1) 
                      : "";
                    
                    return (
                      <div key={p.id ?? pname} className="relative group/sub">
                        <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {pname}
                        </div>
                        {(p.elements ?? []).map((el) => {
                          const path = el?.url?.startsWith("/") 
                            ? el.url 
                            : `/security-systems/${el?.url ?? ""}`;
                          const isActive = currentPath === path;

                          return (
                            <Link
                              key={el.id ?? el.name}
                              to={path}
                              className={`block px-4 py-2 text-sm font-medium transition-colors ${
                                isActive ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {el.name}
                            </Link>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
                
                <div className="border-t border-gray-100 mt-2 pt-1">
                   <Link to="/info/about-us" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg">About Us</Link>
                   <Link to="/info/contact-us" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-lg">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Right: Actions */}
        <article className="flex items-center gap-4">
          {/* Phone CTA (Desktop) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
             <Phone className="text-blue-600 w-4 h-4" />
             <a href="tel:+254796802258" className="text-sm font-bold text-slate-700 tracking-wide hover:text-blue-600 transition-colors">
               0706 074 540
             </a>
          </div>

          {/* Auth Buttons */}
          {!token ? (
            <Link
              to="/auth/login"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 text-white flex items-center justify-center font-bold ring-2 ring-white shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 bg-slate-50">
                      <p className="text-xs text-slate-500 font-medium uppercase">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user?.name || "User"}</p>
                    </div>
                    
                    {isAdmin && (
                      <Link
                        to="/security-systems/create-posts"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <FilePlus size={16} /> Create Post
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        onClickLogoutButton();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </article>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-slate-900 text-white border-t border-slate-800"
          >
            <div className="px-4 py-6 space-y-2">
              {/* Mobile Products */}
              {productsAndSolutions.map((product) => (
                <div key={product.id} className="border-b border-slate-800 pb-2">
                  <button
                    onClick={() => setOpenMobileProductId(
                      openMobileProductId === product.id ? null : product.id
                    )}
                    className="w-full flex justify-between items-center py-3 text-left font-bold text-lg text-slate-100"
                  >
                    <span>{product.name.toUpperCase()}</span>
                    <motion.div
                      animate={{ rotate: openMobileProductId === product.id ? 180 : 0 }}
                    >
                      <ChevronDown size={20} className="text-blue-400" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openMobileProductId === product.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 space-y-1"
                      >
                        {(product.elements ?? []).map((el) => {
                          const path = el?.url?.startsWith("/") 
                            ? el.url 
                            : `/security-systems/${el?.url ?? ""}`;
                            
                          return (
                            <Link
                              key={el.id ?? el.name}
                              to={path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`block py-2 text-sm font-medium ${
                                currentPath === path ? "text-blue-400" : "text-slate-400"
                              } hover:text-white`}
                            >
                              {el.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile Links */}
              <div className="pt-4 space-y-1">
                <Link 
                  to="/info/about-us" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 font-bold text-lg border-b border-slate-800 hover:text-blue-400"
                >
                  About Us
                </Link>
                <Link 
                  to="/info/contact-us" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 font-bold text-lg border-b border-slate-800 hover:text-blue-400"
                >
                  Contact Us
                </Link>
              </div>

              {/* Mobile Auth */}
              <div className="pt-4 mt-4 border-t border-slate-800">
                {!token ? (
                   <Link
                    to="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 rounded-lg font-bold hover:bg-blue-500 transition-colors"
                  >
                    Login to Portal
                  </Link>
                ) : (
                  <div className="space-y-3">
                    {isAdmin && (
                       <Link
                        to="/security-systems/create-posts"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-lg text-slate-200"
                      >
                        <FilePlus size={18} /> Create Post
                      </Link>
                    )}
                    <button
                      onClick={onClickLogoutButton}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-medium hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HomeNavBar;