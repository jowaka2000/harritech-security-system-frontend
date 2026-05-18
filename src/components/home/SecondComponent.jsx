import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Camera, Fence, ArrowRight } from "lucide-react";
import gateAndFenceInstallation from "../../assets/home/gate_and_fence_installation.jpg";

const SecondComponent = () => {
  const features = [
    { icon: Shield, text: "Automatic Gates" },
    { icon: Fence, text: "Electric Fencing" },
    { icon: Camera, text: "CCTV Surveillance" },
    { icon: Lock, text: "Biometric Access" },
  ];

  return (
    <section className="bg-slate-900 text-white py-16 lg:py-24 relative overflow-hidden">
       {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text & Features */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-8"
          >
            <div>
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4">
                Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Security</span> Solutions
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                Protect your property with our <b>professional installation</b> and <b>maintenance services</b>. 
                We specialize in modern solutions tailored for <b>homes, businesses, and institutions</b>.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors group"
                >
                  <div className="p-2 bg-blue-600/10 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-medium text-slate-200 group-hover:text-white">{feature.text}</span>
                </div>
              ))}
            </div>

            <a 
               href="/security-systems" 
               className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group"
            >
               Explore All Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: Image - Optimized for "Fit" */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative">
              <div className="w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-700 relative">
                 <img
                  src={gateAndFenceInstallation}
                  alt="Gate and Fence Installation"
                  className="w-full h-full object-cover"
                />
                {/* Overlay to darken image slightly for better contrast against dark bg */}
                <div className="absolute inset-0 bg-slate-900/10"></div>
              </div>
              
              {/* Decorative element behind image */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-blue-500/30"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SecondComponent;