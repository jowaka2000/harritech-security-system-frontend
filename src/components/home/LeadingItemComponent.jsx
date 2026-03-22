import React from "react";
import { motion } from "framer-motion";
import { Phone, ShieldCheck, ArrowRight } from "lucide-react";
import leadingImage from '../../assets/home/leading-image.png';

const LeadingItemComponent = () => {
  const websiteName = process.env.REACT_APP_WEBSITE_NAME || "Harristech";

  return (
    <section className="relative w-full bg-slate-900 text-white overflow-hidden min-h-[500px] md:min-h-[550px]">
      {/* 
         ADJUSTED: 
         1. Reduced min-h from 700px to 550px (Desktop) and 650px to 500px (Mobile).
         2. This makes the section more compact while still looking like a hero banner.
      */}

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url(${leadingImage})`,
          imageRendering: "auto",
        }}
      ></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80"></div>

      {/* Grid/Texture Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#475569 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* 
           ADJUSTED:
           1. Reduced padding from py-24 to py-16 (Desktop) and py-16 to py-12 (Mobile).
           2. 'items-center' ensures the text and the card are vertically centered within the container.
        */}
        
        {/* Left Side: Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left space-y-4 md:w-1/2"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 drop-shadow-sm">
              {websiteName}
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold italic text-slate-300 -mt-2">
            Security Systems
          </h2>

          <p className="text-slate-400 max-w-lg mx-auto md:mx-0 text-base md:text-lg leading-relaxed">
            Protecting what matters most with cutting-edge surveillance, access control, and alarm systems.
          </p>
        </motion.div>

        {/* Right Side: CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="md:w-1/2 flex justify-center md:justify-end w-full"
        >
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden group">

            {/* Glow effect inside card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-green-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  24/7 Support
                </span>
              </div>

              <p className="text-slate-300 text-sm mb-4">
                Need immediate assistance or a quote?
              </p>

              <a 
                href="tel:+254706074540" 
                className="flex items-center justify-between bg-white text-slate-900 hover:bg-blue-50 transition-colors px-6 py-4 rounded-xl font-bold text-lg shadow-lg group-hover:translate-x-1 duration-300"
              >
                <div className="flex items-center gap-3">
                  <Phone className="text-blue-600 w-5 h-5" />
                  <span>0706 074 540</span>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
              </a>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Licensed
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Insured
                </span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default LeadingItemComponent;