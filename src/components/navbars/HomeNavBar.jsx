import React, { useState } from "react";
import icon from "../../assets/alarm.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSecuritySystemsContextProvider } from "../../contexts/SecuritySystemsContextProvider";

const HomeNavBar = () => {
  const [isSideBar, setIsSideBar] = useState(false);

  const {
    activeUrlName,
    setActiveUrlName,
    isCamerasMenu,
    setIsCamerasMenu,
    isHomeMenu,
    isBiometricSystems,
    isPerimeterSecurity,
    isAlarmSystem,
    isSystemGuidance,
    isAboutUs,
    setIsHomeMenu,
    setIsBiometricSystems,
    setIsPerimeterSecurity,
    setIsAlarmSystem,
    setIsSystemGuidance,
    setIsAboutUs,
  } = useSecuritySystemsContextProvider();

  return (
    <nav
      className={`flex relative justify-between py-8 px-2  ${
        isSideBar
          ? "bg-pink-800 text-white"
          : activeUrlName !== "Home"
          ? "bg-pink-700 text-white"
          : ""
      }`}
    >
      <article>
        <img src={icon} alt="icon" className="w-10 h-18" />
      </article>

      <article className="flex items-center gap-3">
        <div
          className={`font-black font-mono text-xl flex items-center  ${
            isSideBar || activeUrlName !== "Home"
              ? "text-white"
              : "text-pink-800"
          }`}
        >
          0796802258
        </div>
        <div className="flex items-center">
          <button onClick={() => setIsSideBar(!isSideBar)}>
            {isSideBar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </article>

      {isSideBar && (
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ transition: 1 }}
          className="absolute flex w-full top-24 bg-pink-700 text-white  bg-opacity-[0.9] left-0 "
        >
          <div className="w-full">
            <section className="w-full">
              <Link
                to="/"
                onClick={() => {
                  setIsHomeMenu(!isHomeMenu);
                  setIsSideBar(false);
                  setActiveUrlName("Home");
                }}
                className={`flex justify-between w-full px-4 py-3  border-b border-gray-300 ${
                  isHomeMenu ? "text-gray-800 bg-white" : "text-gray-100"
                }`}
              >
                <span className="font-bold font-serif">HOME</span>
              </Link>
            </section>

            <section className="w-full">
              <article
                onClick={() => setIsCamerasMenu(!isCamerasMenu)}
                className={`flex justify-between w-full px-4 py-3  border-b border-gray-300 ${
                  isCamerasMenu ? "text-gray-800 bg-white" : "text-gray-100"
                }`}
              >
                <span className="font-bold font-serif">CAMERAS</span>
                <span>
                  {isCamerasMenu ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </article>

              {/* hidden  */}
              {isCamerasMenu && (
                <article className="px-8 space-y-2">
                  <Link
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Ip Cameras");
                    }}
                    to="/security-systems/Ip Cameras"
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Ip Cameras" ? "text-green-400" : ""
                      }`}
                    >
                      IP Cameras
                    </span>
                  </Link>
                  <Link
                    to="/security-systems/DVRs and NVRs"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("DVRs and NVRs");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "DVRs and NVRs"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      DVRs and NVRs
                    </span>
                  </Link>

                  <Link
                    to="/security-systems/Analogue HD Cameras"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Analogue HD Cameras");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Analogue HD Cameras"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Analogue HD Cameras
                    </span>
                  </Link>
                  <Link
                    to="/security-systems/Vehicle DVRs"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Vehicle DVRs");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Vehicle DVRs" ? "text-green-400" : ""
                      }`}
                    >
                      Vehicle DVRs
                    </span>
                  </Link>
                  <Link
                    to="/security-systems/Vehicle Cameras"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Vehicle Cameras");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Vehicle Cameras"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Vehicle Cameras
                    </span>
                  </Link>
                </article>
              )}
              {/* end */}
            </section>

            <section className="w-full">
              <article
                onClick={() => setIsBiometricSystems(!isBiometricSystems)}
                className={`flex justify-between w-full px-4 py-3  border-b border-gray-300 ${
                  isBiometricSystems
                    ? "text-gray-800 bg-white"
                    : "text-gray-100"
                }`}
              >
                <span className="font-bold font-serif">BIOMETRIC SYSTEMS</span>
                <span>
                  {isBiometricSystems ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </article>

              {/* hidden  */}
              {isBiometricSystems && (
                <article className="px-8 space-y-2">
                  <Link
                    to="/security-systems/Access Control"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Access Control");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Access Control"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Access Control
                    </span>
                  </Link>
                  <Link
                    to="/security-systems/Attendance Systems"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Attendance Systems");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Attendance Systems"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Attendance Systems
                    </span>
                  </Link>

                  <Link
                    to="/security-systems/Software and Solutions"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Software and Solutions");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Software and Solutions"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Software and Solutions
                    </span>
                  </Link>
                </article>
              )}
              {/* end */}
            </section>

            <section className="w-full">
              <article
                onClick={() => setIsPerimeterSecurity(!isPerimeterSecurity)}
                className={`flex justify-between w-full px-4 py-3  border-b border-gray-300 ${
                  isPerimeterSecurity
                    ? "text-gray-800 bg-white"
                    : "text-gray-100"
                }`}
              >
                <span className="font-bold font-serif">PERIMETER SECURITY</span>
                <span>
                  {isPerimeterSecurity ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </article>

              {/* hidden  */}
              {isPerimeterSecurity && (
                <article className="px-8 space-y-2">
                  <Link
                    to="/security-systems/Electric Fence"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Electric Fence");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Electric Fence"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Electric Fence
                    </span>
                  </Link>
                  <Link
                    to="/security-systems/Automatic Gates"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Automatic Gates");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Automatic Gates"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Automatic Gates
                    </span>
                  </Link>
                </article>
              )}
              {/* end */}
            </section>

            <section className="w-full">
              <article
                onClick={() => setIsAlarmSystem(!isAlarmSystem)}
                className={`flex justify-between w-full px-4 py-3  border-b border-gray-300 ${
                  isAlarmSystem ? "text-gray-800 bg-white" : "text-gray-100"
                }`}
              >
                <span className="font-bold font-serif">ALARM SYSTEMS</span>
                <span>
                  {isAlarmSystem ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </article>

              {/* hidden  */}
              {isAlarmSystem && (
                <article className="px-8 space-y-2">
                  <Link
                    to="/security-systems/Intruder Alarm Systems"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Intruder Alarm Systems");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Intruder Alarm Systems"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Intruder Alarm Systems
                    </span>
                  </Link>
                  <Link
                    to="/security-systems/Fire Alarm Systems"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Fire Alarm Systems");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Fire Alarm Systems"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Fire Alarm Systems
                    </span>
                  </Link>

                  <Link
                    to="/security-systems/Fire Doors"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Fire Doors");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Fire Doors" ? "text-green-400" : ""
                      }`}
                    >
                      Fire Doors
                    </span>
                  </Link>
                </article>
              )}
              {/* end */}
            </section>

            <section className="w-full border-b border-gray-300 ">
              <article
                onClick={() => setIsSystemGuidance(!isSystemGuidance)}
                className={`flex justify-between w-full px-4 py-3 ${
                  isSystemGuidance ? "text-gray-800 bg-white" : "text-gray-100"
                }`}
              >
                <span className="font-bold font-serif">SYSTEMS GUIDANCE</span>
                <span>
                  {isSystemGuidance ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="4"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              </article>

              {/* hidden  */}
              {isSystemGuidance && (
                <article className="px-8 space-y-2">
                  <Link
                    to="/security-systems/CCTV Installation Guide"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("CCTV Installation Guide");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "CCTV Installation Guide"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      CCTV Installation Guide
                    </span>
                  </Link>
                  <Link
                    to="/security-systems/Home Security Systems Setup"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Home Security Systems Setup");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Home Security Systems Setup"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Home Security Systems Setup
                    </span>
                  </Link>

                  <Link
                    to="/security-systems/Security Consultancy"
                    onClick={() => {
                      setIsSideBar(false);
                      setActiveUrlName("Security Consultancy");
                    }}
                    className="flex  w-full  py-1 text-gray-100  border-b border-gray-300"
                  >
                    <span
                      className={`font-semibold font-serif ${
                        activeUrlName === "Security Consultancy"
                          ? "text-green-400"
                          : ""
                      }`}
                    >
                      Security Consultancy
                    </span>
                  </Link>
                </article>
              )}
              {/* end */}
            </section>

            <section className="w-full">
              <Link
                to="/about-us"
                onClick={() => setIsAboutUs(!isAboutUs)}
                className={`flex justify-between w-full px-4 py-3  border-b border-gray-300 ${
                  isAboutUs ? "text-gray-800 bg-white" : "text-gray-100"
                }`}
              >
                <span className="font-bold font-serif">ABOUT US</span>
              </Link>
            </section>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default HomeNavBar;
