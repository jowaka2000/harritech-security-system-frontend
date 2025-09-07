import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuthContextProvider } from "../contexts/AuthContextProvider";
import axiosClient from "../axiosClient";
import { ArrowLeft } from "lucide-react";


const AuthLayout = () => {
  const { token,setUser } = useAuthContextProvider();

  useEffect(()=>{
    axiosClient.get('/user')
    .then(({data})=>{
      setUser(data.user);
    })
    .catch((err)=>{
      console.log(err)
    })

    // eslint-disable-next-line
  },[])


  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div>
  <nav className="w-full bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-2xl font-extrabold text-pink-600 tracking-wide transition duration-200 group-hover:text-pink-700">
            HARRITECH
          </span>
        </Link>

        {/* Back to Home */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          <span className="font-medium hidden sm:block">Back to Home</span>
        </Link>
      </div>
    </nav>

      <section className="">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
