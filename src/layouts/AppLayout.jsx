import React from "react";
import { Outlet } from "react-router-dom";
import HomeNavBar from "../components/navbars/HomeNavBar";
import Footer from "../views/home/Footer";

const AppLayout = () => {
  return (
    <div className="">
      <HomeNavBar />

      <section className="max-w-5xl mx-auto mb-28">
        <Outlet />
      </section>

      <Footer />
    </div>
  );
};

export default AppLayout;
