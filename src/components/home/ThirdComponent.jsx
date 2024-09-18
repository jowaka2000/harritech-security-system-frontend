import React from "react";
import { Link } from "react-router-dom";
import { Cameras } from "../../data/SecuritySystems";

const ThirdComponent = () => {
  return (
    <div className="text-slate-800 p-1 ">
      <section className="space-y-2 bg-pink-700 rounded-tl-full rounded-br-full bg-opacity-[0.3]">
        <h1 className="font-black text-2xl">
          Comprehensive Security Solutions
        </h1>
        <p className="font-serif">
          At <b>Harritech</b>, we offer a wide range of security systems
          tailored to meet your specific needs. Whether it's for your home,
          business, or industrial site, our products ensure complete protection
          and peace of mind.
        </p>
      </section>

      <section className=" space-y-8 ">
        <div className="flex justify-center font-bold text-xl">
          Our Services{" "}
        </div>

        <div className="space-y-20">
          {/* cameras */}
          <article className="space-y-2">
            <div className="flex  font-black  text-xl">CAMERAS</div>
            <section className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 bg-pink-800 bg-opacity-[0.1] rounded-tl-full rounded-br-full">
              {Cameras.map((camera) => {
                const { id, name, desName, shortDes, image, price } = camera;
                return (
                  <Link
                    to={`security-systems/${name}`}
                    key={id}
                    className="relative my-shadow rounded-lg border border-slate-300 p-1 space-y-1 text-slate-800"
                  >
                    <div className="absolute top-1 text-xs font-bold bg-pink-700  text-white rounded-lg px-3  py-[3px]">
                      {desName}
                    </div>
                    <div className="flex justify-center  w-full h-[8em]">
                      <img
                        src={image}
                        alt={name.replace(" ", "")}
                        className="w-full"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute text-pink-800 -top-6 flex items-center gap-1">
                        <span className="text-xs font-bold">Ksh</span>
                        <span className="font-black text-lg">{price}</span>
                      </span>
                      <span className="text-xs font-bold">
                        {shortDes.length > 44
                          ? `${shortDes.slice(0, 45)}...`
                          : shortDes}
                      </span>
                    </div>
                    <div className="flex  text-green-700 justify-center w-full">
                      Learn more...
                    </div>
                  </Link>
                );
              })}
            </section>
          </article>
          <article className="space-y-2  bg-pink-700 rounded-tl-full rounded-br-full bg-opacity-[0.2]">
            <h1 className="font-black text-2xl">Why Harritech</h1>
            <p className="font-serif">
              We are committed to delivering the best security systems that
              protect what matters most. Cutting-edge technology for superior
              protection, professional setup to maximize efficiency, and
              top-tier security without breaking the bank confirms our trastoworthy
            </p>
          </article>
          <article className="space-y-2">
            <div className="flex  font-black  text-xl">BIOMETRIC SYSTEMS</div>
            <section className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 bg-pink-800 bg-opacity-[0.1] rounded-tl-full rounded-br-full">
              {Cameras.map((camera) => {
                const { id, name, desName, shortDes, image, price } = camera;
                return (
                  <Link
                    to={`security-systems/${name}`}
                    key={id}
                    className="relative my-shadow rounded-lg border border-slate-300 p-1 space-y-1 text-slate-800"
                  >
                    <div className="absolute top-1 text-xs font-bold bg-pink-700  text-white rounded-lg px-3  py-[3px]">
                      {desName}
                    </div>
                    <div className="flex justify-center  w-full h-[8em]">
                      <img
                        src={image}
                        alt={name.replace(" ", "")}
                        className="w-full"
                      />
                    </div>

                    <div className="relative">
                      <span className="absolute text-pink-800 -top-6 flex items-center gap-1">
                        <span className="text-xs font-bold">Ksh</span>
                        <span className="font-black text-lg">{price}</span>
                      </span>
                      <span className="text-xs font-bold">
                        {shortDes.length > 44
                          ? `${shortDes.slice(0, 45)}...`
                          : shortDes}
                      </span>
                    </div>
                    <div className="flex  text-green-700 justify-center w-full">
                      Learn more...
                    </div>
                  </Link>
                );
              })}
            </section>
          </article>
          <article className="my-shadow rounded-lg border border-slate-300 p-4 space-y-4 text-slate-800">
            <h1 className="flex justify-center font-bold text-xl">
              Biometric Systems
            </h1>
            <p className="p-4 flex justify-center text-center w-full">
              Secure access control with cutting-edge biometric technology.
            </p>
            <Link className="italic hover:underline">
              Discover Biometric Solutions
            </Link>
          </article>
          <article className="my-shadow rounded-lg border border-slate-300 p-4 space-y-4 text-slate-800">
            <h1 className="flex justify-center font-bold text-xl">
              Perimeter Security
            </h1>
            <p className="p-4 flex justify-center text-center w-full">
              Electric fences and automatic gates to protect your boundaries.
            </p>
            <Link className="italic hover:underline">
              Explore Perimeter Security
            </Link>
          </article>{" "}
          <article className="my-shadow rounded-lg border border-slate-300 p-4 space-y-4 text-slate-800">
            <h1 className="flex justify-center font-bold text-xl">
              Alarm Systems
            </h1>
            <p className="p-4 flex justify-center text-center w-full">
              Fire and intruder alarms to safeguard your property."
            </p>
            <Link className="italic hover:underline">
              Protect Your Home & Business
            </Link>
          </article>{" "}
          <article className="my-shadow rounded-lg border border-slate-300 p-4 space-y-4 text-slate-800">
            <h1 className="flex justify-center font-bold text-xl">
              System Guidance
            </h1>
            <p className="p-4 flex justify-center text-center w-full">
              Expert consultancy and installation guides for seamless
              integration.
            </p>
            <Link className="italic hover:underline">
              Get Professional Guidance
            </Link>
          </article>
        </div>

        <div>image</div>
      </section>
    </div>
  );
};

export default ThirdComponent;
