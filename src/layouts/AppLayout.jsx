import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import HomeNavBar from "../components/navbars/HomeNavBar";
import Footer from "../views/home/Footer";
import { useSecuritySystemsContextProvider } from "../contexts/SecuritySystemsContextProvider";
import { useAuthContextProvider } from "../contexts/AuthContextProvider";

const AppLayout = () => {
  const { fetchNamesUrl } = useSecuritySystemsContextProvider();
  const { getMe, token } = useAuthContextProvider();
  useEffect(() => {
    fetchNamesUrl();
    if (token) {
      getMe();
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <HomeNavBar />

      <main className="flex-1 pt-16 max-w-5xl mx-auto mb-28 mt-7">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
