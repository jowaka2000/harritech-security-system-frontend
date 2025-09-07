import React from "react";
import gateAndFenceInstallation from "../../assets/home/gate_and_fence_installation.jpg";

const SecondComponent = () => {
  return (
 <div className="py-14 space-y-10 md:space-y-0 block md:flex w-full mx-auto items-center">
  {/* Left Text Section */}
  <div className="md:w-7/12">
    <section className="space-y-6 bg-green-50 rounded-tr-3xl rounded-bl-3xl p-10 shadow-sm">
      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 font-sans tracking-tight">
        HARRITECH{" "}
        <span className="italic font-light text-green-700">
          Security Systems
        </span>
      </h2>

      <p className="font-sans text-slate-700 text-base md:text-lg leading-relaxed max-w-2xl">
        Protect your property with our <b>professional installation</b> and{" "}
        <b>maintenance services</b>. We specialize in modern solutions tailored
        for <b>homes, businesses, and institutions</b>.
      </p>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-slate-800 font-medium">
        <div className="flex items-center space-x-3">
          <span className="text-green-700 text-2xl">🛡️</span>
          <span>Automatic Gates</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-green-700 text-2xl">🚧</span>
          <span>Electric Fence</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-green-700 text-2xl">📷</span>
          <span>CCTV Surveillance</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-green-700 text-2xl">🔒</span>
          <span>Biometric Access</span>
        </div>
        
      </div>
    </section>
  </div>

  {/* Right Image Section */}
  <div className="md:w-5/12 flex justify-center md:ml-0 mt-6 md:mt-0">
    <img
      src={gateAndFenceInstallation}
      alt="Gate and Fence Installation"
      className="w-full h-auto max-h-[400px] object- rounded-2xl shadow-xl border border-slate-200"
    />
  </div>
</div>

  );
};

export default SecondComponent;
