import React from "react";

const LeadingItemComponent = () => {
  return (
    <div className="block md:flex w-full">
      <section className="relative flex w-full bg-gradient-to-r from-pink-700 to-pink-900 h-60 md:h-[400px] text-white items-center rounded-br-[10rem] md:rounded-br-none justify-center overflow-hidden">
        {/* Background pattern / image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://img.icons8.com/ios-filled/500/security-checked.png"
            alt="security background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg">
            HARRITECH
          </h1>
          <h2 className="text-lg md:text-2xl font-semibold italic mt-2">
            Security Systems
          </h2>
          <p className="text-sm md:text-lg font-light mt-4">
            Protecting what matters most
          </p>
          {/* Phone number */}
          <p className="mt-3 text-sm md:text-base font-medium flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V9a2 2 0 01-2 2H8a9 9 0 009 9v-2a2 2 0 012-2h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V6a1 1 0 011-1z"
              />
            </svg>
            <span>+254 712 345 678</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LeadingItemComponent;
