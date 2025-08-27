import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuthContextProvider } from "../contexts/AuthContextProvider";
import axiosClient from "../axiosClient";

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
      <nav className="py-4 border-b-2 border-gray-300 px-2">
        <Link to="/home" className="font-black text-pink-700 text-xl">
          HARRITECH
        </Link>
      </nav>

      <section className="flex w-full justify-center  pt-10 p-2">
        <Outlet />
      </section>
    </div>
  );
};

export default AuthLayout;
