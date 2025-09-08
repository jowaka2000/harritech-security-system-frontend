import React from "react";
import automaticGate from "../../assets/security-systems/automatic gate.png";

const HeroSectionComponent = () => {
  return (
    <div className="relative bg-gradient-to-r from-pink-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-10 py-16 md:py-20 space-y-16">
        {/* Headline + Image side by side */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Heading */}
          <div className="lg:w-6/12">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Premium <span className="text-pink-700">Automatic Gate</span>{" "}
              Installation
            </h1>
          </div>

          {/* Right Image */}
          <div className="w-full md:lg:w-7/12 flex justify-center relative ">
            <img
              src={automaticGate} // 👉 Replace with your gate image
              alt="Automatic Gate Installation"
              className="rounded-2xl shadow-2xl border border-slate-200 object-cover w-full max-h-[450px]"
            />
            {/* Decorative Overlay */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
          </div>
        </div>

        {/* Features + CTA in one row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16">
          {/* Description */}
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl font-inter text-center lg:text-left">
            Secure your property with our{" "}
            <span className="font-semibold text-green-600">
              automatic gate systems
            </span>
            . We provide professional{" "}
            <span className="font-semibold text-green-600">
              installation, maintenance, and after-sales support
            </span>{" "}
            to ensure safety, convenience, and peace of mind for your home or
            business.
          </p>

          {/* CTA */}
          <div className="w-full flex justify-center lg:justify-end">
            <a
              href="https://wa.me/254796802258?text=Hello%20HARRISTECH%2C%20I%27m%20interested%20in%20Automatic%20Gate%20Installation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 hover:shadow-lg text-white px-6 py-2.5 rounded-full shadow-md text-sm md:text-base font-medium transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.149-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.224-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.007-1.413.248-.694.248-1.288.173-1.412-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.003a9.87 9.87 0 01-5.033-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.896a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884M20.52 3.45A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.717 1.463h.005c6.554 0 11.89-5.335 11.893-11.893 0-3.177-1.237-6.166-3.487-8.416" />
              </svg>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionComponent;
