import React from "react";
import { Link } from "react-router-dom";
import { Cameras } from "../../data/SecuritySystemsData";

const ThirdComponent = () => {
  return (
    <div className="block md:flex w-full ">
      <div className="text-slate-800 p-1 space-y-40">
        <section className=" space-y-8 ">
          <div className="flex justify-center font-bold text-3xl md:text-4xl">
            Our Services{" "}
          </div>

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
              <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Cameras.map((camera) => {
                  const { id, name, desName, shortDes, image, price } = camera;
                  return (
                    <Link
                      to={`security-systems/${name}`}
                      key={id}
                      className="relative group bg-white rounded-2xl shadow-md border border-slate-200 p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
                    >
                      {/* Badge */}
                      <span className="absolute top-3 left-3 text-xs font-semibold bg-pink-600 text-white rounded-full px-3 py-1 shadow-sm">
                        {desName}
                      </span>

                      {/* Product Image */}
                      <div className="flex justify-center w-full h-32 md:h-40 overflow-hidden">
                        <img
                          src={image}
                          alt={name.replace(" ", "")}
                          className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        <h3 className="text-sm md:text-base font-bold text-slate-800 line-clamp-2">
                          {shortDes}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-1 text-pink-700 font-extrabold text-lg">
                          <span className="text-xs font-bold">Ksh</span>
                          {price}
                        </div>
                      </div>

                      {/* Learn More */}
                      <div className="mt-3 flex justify-center">
                        <span className="text-sm font-semibold text-green-700 group-hover:text-green-800 transition-colors">
                          Learn more →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </section>
            </article>

            <article className="w-full md:w-8/12 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Why Harritech
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  We are committed to delivering the best security systems that
                  protect what matters most. With cutting-edge technology for
                  superior protection, professional setup to maximize
                  efficiency, and top-tier security solutions at competitive
                  prices — Harritech is your trusted partner in safety.
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
<section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {Cameras.map((item) => {
    const {
      id,
      name,
      desName,
      shortDes = "",
      image,
      price,
    } = item;
    const formattedPrice =
      typeof price === "number"
        ? new Intl.NumberFormat("en-KE").format(price)
        : price;
    const short =
      shortDes.length > 60
        ? `${shortDes.slice(0, 60)}...`
        : shortDes;

    return (
      <Link
        to={`/security-systems/${encodeURIComponent(name)}`}
        key={id}
        aria-label={`View ${name}`}
        className="relative group bg-white rounded-2xl shadow-md border border-slate-200 p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300"
      >
        {/* Badge */}
        <span className="absolute top-3 left-3 text-xs font-semibold bg-pink-600 text-white rounded-full px-3 py-1 shadow-sm">
          {desName}
        </span>

        {/* Image */}
        <div className="flex justify-center w-full h-32 md:h-40 overflow-hidden">
          <img
            src={image}
            alt={`${name} `}
            className="w-auto h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="space-y-2 mt-3">
          <h3 className="text-sm md:text-base font-bold text-slate-800">
            {short}
          </h3>

          <div className="flex items-center gap-1 text-pink-700 font-extrabold text-lg">
            <span className="text-xs font-bold">Ksh</span>
            <span>{formattedPrice}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-3 flex justify-center">
          <span className="text-sm font-semibold text-green-700 group-hover:text-green-800 transition-colors">
            Learn more →
          </span>
        </div>
      </Link>
    );
  })}

  {/* Default Last Card */}
  <div className="relative group bg-gradient-to-br from-pink-100 via-white to-pink-50 rounded-2xl shadow-md border border-dashed border-pink-400 p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
    {/* Badge */}
    <span className="absolute top-3 left-3 text-xs font-semibold bg-green-600 text-white rounded-full px-3 py-1 shadow-sm">
      Special
    </span>

    {/* Placeholder Icon */}
    <div className="flex justify-center w-full h-32 md:h-40 items-center text-pink-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>

    {/* Info */}
    <div className="space-y-2 mt-3 text-center">
      <h3 className="text-sm md:text-base font-bold text-slate-800">
        Need a custom security solution?
      </h3>
      <p className="text-xs md:text-sm text-slate-600">
        Request a personalized installation plan that fits your needs.
      </p>
    </div>

    {/* CTA */}
    <div className="mt-3 flex justify-center">
      <Link
        to="/request-service"
        className="px-4 py-2 rounded-full bg-pink-600 text-white font-semibold text-sm hover:bg-pink-700 transition"
      >
        Request Service
      </Link>
    </div>
  </div>
</section>

            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThirdComponent;
