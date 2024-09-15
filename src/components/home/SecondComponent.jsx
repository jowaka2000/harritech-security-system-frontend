import React from "react";
import image from "../../assets/image1.jpg";

const SecondComponent = () => {
  return (
    <div className="p-3 space-y-8">
      <section className="space-y-2  bg-pink-700 rounded-tr-full rounded-bl-full bg-opacity-[0.3]">
        <p className="text-2xl  text-slate-800">
          <span className="font-black">
            <span>HARRITECH!</span>{" "}
            <span className="italic">
              Your Trusted Security Systems Partner.
            </span>
          </span>
        </p>

        <p className="font-serif text-slate-800">
          Innovative Solutions for Complete Protection: <b>Cameras</b>,{" "}
          <b>Biometric Systems</b>, <b>Alarms</b>, and More.{" "}
          <span className="italic">
            Explore Our Solutions | Get a Free Consultation | Contact Us Today
          </span>
        </p>
      </section>
      <p className="flex justify-center">
        <img src={image} alt="image-one" className=" w-[70%]" />
      </p>
    </div>
  );
};

export default SecondComponent;
