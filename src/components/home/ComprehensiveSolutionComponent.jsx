import React from "react";

const ComprehensiveSolutionComponent = () => {
  return (
    <section className="w-full md:w-9/12 bg-gradient-to-r from-pink-50 via-white to-pink-100 shadow-lg rounded-2xl p-8 space-y-6 border border-pink-200">
      {/* Heading */}
      <div className="flex items-center space-x-3">
        <span className="p-3 bg-pink-600 text-white rounded-full shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0-1.105.895-2 2-2h6a2 2 0 012 2v7a2 2 0 01-2 2h-6a2 2 0 01-2-2v-7zM4 6h16M4 10h4M4 14h4M4 18h4"
            />
          </svg>
        </span>
        <h1 className="font-extrabold text-3xl md:text-4xl text-slate-800">
          Comprehensive Security Solutions
        </h1>
      </div>

      {/* Description */}
      <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
        At <span className="font-semibold text-pink-700">Harristech</span>, we
        provide tailored <b>security system installations</b> designed to
        safeguard your <b>home</b>, <b>business</b>, and <b>industrial sites</b>
        . Our solutions deliver not just protection but also peace of mind —
        combining cutting-edge technology with professional expertise.
      </p>

      {/* Highlighted List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700">
        <li className="flex items-center space-x-2">
          ✅ CCTV & Surveillance Cameras
        </li>
        <li className="flex items-center space-x-2">
          ✅ Biometric & Access Control
        </li>
        <li className="flex items-center space-x-2">
          ✅ Intruder Alarm Systems
        </li>
        <li className="flex items-center space-x-2">
          ✅ Fire & Safety Solutions
        </li>
      </ul>
    </section>
  );
};

export default ComprehensiveSolutionComponent;
