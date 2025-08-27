import React from "react";
import image from "../../assets/image1.jpg";


const SecondComponent = () => {
  return (
   <div className="py-10 space-y-10 block md:flex w-full mx-auto items-center">
  {/* Left Text Section */}
  <section className="space-y-6 bg-pink-700 rounded-tr-full rounded-bl-full bg-opacity-[0.08] p-8 shadow-sm">
    <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-sans">
      HARRITECH{" "}
      <span className="italic font-light text-pink-700">
        Security Systems
      </span>
    </h2>

    <p className="font-serif text-slate-700 text-lg md:text-xl leading-relaxed tracking-wide">
      We specialize in the <b>installation and maintenance</b> of modern
      security systems including <b>CCTV Cameras</b>,{" "}
      <b>Biometric Access</b>, <b>Alarm Systems</b>, and more.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-700 font-medium">
      <div className="flex items-center space-x-3">
        <span className="text-pink-700 text-2xl">📷</span>
        <span>CCTV Installation</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-pink-700 text-2xl">🔒</span>
        <span>Biometric Systems</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-pink-700 text-2xl">🚨</span>
        <span>Alarm Setup</span>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-pink-700 text-2xl">🛡️</span>
        <span>Complete Security Solutions</span>
      </div>
    </div>
  </section>

  {/* Right Image Section */}
  <div className="flex justify-center md:ml-8">
    <img
      src={image}
      alt="security systems"
      className="w-[70%] rounded-2xl shadow-xl border border-slate-200"
    />
  </div>
</div>

  );
};

export default SecondComponent;
