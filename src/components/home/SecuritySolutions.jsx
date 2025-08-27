import React from "react";

const SecuritySolutions = () => {
  return (
    <section className="py-12 bg-slate-50">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Our Security Solutions
        </h2>
        <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
          Explore our range of reliable, modern, and professional security
          systems designed to safeguard your home, business, and community.
        </p>
      </div>

      {/* Grid of Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Biometric Systems */}
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-slate-800 mb-3 text-center">
            Biometric Systems
          </h3>
          <p className="text-slate-600 text-center mb-4">
            Secure access control with cutting-edge biometric technology.
          </p>
          <div className="flex justify-center">
            <a href="/" className="text-pink-600 font-medium hover:underline">
              Discover Biometric Solutions
            </a>
          </div>
        </article>

        {/* Perimeter Security */}
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-slate-800 mb-3 text-center">
            Perimeter Security
          </h3>
          <p className="text-slate-600 text-center mb-4">
            Electric fences and automatic gates to protect your boundaries.
          </p>
          <div className="flex justify-center">
            <a href="/" className="text-pink-600 font-medium hover:underline">
              Explore Perimeter Security
            </a>
          </div>
        </article>

        {/* Alarm Systems */}
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-slate-800 mb-3 text-center">
            Alarm Systems
          </h3>
          <p className="text-slate-600 text-center mb-4">
            Fire and intruder alarms to safeguard your property.
          </p>
          <div className="flex justify-center">
            <a href="/" className="text-pink-600 font-medium hover:underline">
              Protect Your Home & Business
            </a>
          </div>
        </article>

        {/* System Guidance */}
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-slate-800 mb-3 text-center">
            System Guidance
          </h3>
          <p className="text-slate-600 text-center mb-4">
            Expert consultancy and installation guides for seamless integration.
          </p>
          <div className="flex justify-center">
            <a href="/" className="text-pink-600 font-medium hover:underline">
              Get Professional Guidance
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SecuritySolutions;
