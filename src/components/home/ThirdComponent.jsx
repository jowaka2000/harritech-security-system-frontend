import React from "react";
import { Link } from "react-router-dom";

const ThirdComponent = () => {
  return (
    <div className="text-slate-800 p-3 ">
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

      <section className="p-4 space-y-8 ">
        <div className="flex justify-center font-bold text-xl">Our Services </div>
        <div className="space-y-8">
          <article className="my-shadow rounded-lg border border-slate-300 p-4 space-y-4 text-slate-800">
            <h1 className="flex justify-center font-bold text-xl">Cameras</h1>
            <p className="p-4 flex justify-center text-center w-full">
              Advanced surveillance systems including IP, analogue, and vehicle
              cameras.
            </p>
            <Link className="italic hover:underline">Learn More...</Link>
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
