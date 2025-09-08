import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import SystemList from "./SystemList";

const ThirdComponent = () => {
  const [cameras, setCameras] = useState([]);
  const [biometric, setBiometric] = useState([]);
  const [perimeterSystems, setPerimeterSystems] = useState([]);

  useEffect(() => {
    // Fetch cameras
    axiosClient
      .get(`/systems/fetch/cameras`)
      .then((res) => {
        setCameras(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cameras:", err);
      });

    // Fetch biometric
    axiosClient
      .get("/systems/fetch/biometric")
      .then((res) => {
        setBiometric(res.data);
      })
      .catch((err) => {
        console.error("Error fetching biometric:", err);
      });

    // Fetch biometric
    axiosClient
      .get("/systems/fetch/perimeter")
      .then((res) => {
        setPerimeterSystems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching biometric:", err);
      });
  }, []);

  return (
    <div className="block md:flex w-full ">
      <div className="text-slate-800 p-1 space-y-40 pt-16">
        <section className=" space-y-8 ">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Services
            </h2>
            <div className="mt-2 w-20 h-[3px] bg-gradient-to-r from-green-600 to-green-400 rounded-full"></div>
            <p className="mt-2 text-gray-600 max-w-xl text-sm md:text-base">
              Explore our professional solutions designed to secure your
              property and give you peace of mind.
            </p>
          </div>

          {/* Perimeter Systems Section */}
          <article className="space-y-6 pb-20">
            {/* Section Title */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                🛡️ Perimeter Systems
              </h2>
              <div className="h-[3px] flex-1 bg-gradient-to-r from-pink-600/70 to-pink-400/50 rounded-full"></div>
            </div>

            {/* System Cards */}
            {perimeterSystems.length > 0 ? (
              <SystemList systems={perimeterSystems} />
            ) : (
              <p className="text-gray-500 font-medium">
                No perimeter systems available at the moment.
              </p>
            )}
          </article>

          <div className="space-y-20">
            {/* Cameras Section */}
            <article className="space-y-6">
              {/* Section Title */}
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                  📸 Cameras
                </h2>
                <div className="h-[3px] flex-1 bg-gradient-to-r from-pink-600/70 to-pink-400/50 rounded-full"></div>
              </div>

              {/* Camera Cards */}
              {cameras.length > 0 && <SystemList systems={cameras} />}
            </article>

            <article className="w-full md:w-8/12 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Why  {process.env.REACT_APP_WEBSITE_NAME}
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  We are committed to delivering the best security systems that
                  protect what matters most. With cutting-edge technology for
                  superior protection, professional setup to maximize
                  efficiency, and top-tier security solutions at competitive
                  prices — Harristech is your trusted partner in safety.
                </p>
              </div>
            </article>

            {/* Biometric Systems Section (styled like Cameras) */}
            <article className="space-y-6">
              {/* Section Title */}
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                  🔐 Biometric Systems
                </h2>
                <div className="h-[3px] flex-1 bg-gradient-to-r from-pink-600/70 to-pink-400/50 rounded-full" />
              </div>

              {/* Biometric Cards */}
              {biometric.length > 0 && <SystemList systems={biometric} />}
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThirdComponent;
