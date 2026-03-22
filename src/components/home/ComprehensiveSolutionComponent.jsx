import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, CheckCircle2, ArrowRight } from "lucide-react";

const ComprehensiveSolutionComponent = () => {
  const solutions = [
    "CCTV & Surveillance Cameras",
    "Biometric & Access Control",
    "Intruder Alarm Systems",
    "Fire & Safety Solutions",
  ];

  return (
    <section className="w-full bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
                <LayoutGrid className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight">
                Comprehensive <br/> Security Solutions
              </h1>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed">
              At <span className="font-semibold text-blue-400">Harristech</span>, we provide tailored <b>security system installations</b> designed to safeguard your <b>home</b>, <b>business</b>, and <b>industrial sites</b>.
            </p>
            <p className="text-slate-400">
              Our solutions deliver not just protection but also peace of mind — combining cutting-edge technology with professional expertise.
            </p>

            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group mt-4"
            >
              Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>

          {/* Right: Grid of Services */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {solutions.map((solution, index) => (
                <div 
                  key={index} 
                  className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex items-center gap-4 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 group cursor-default"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-medium text-slate-200 group-hover:text-white">
                    {solution}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Decorative visual element */}
            <div className="mt-6 p-6 bg-gradient-to-br from-blue-900/40 to-slate-900/40 rounded-2xl border border-blue-500/20 text-center">
               <p className="text-sm text-blue-300 font-medium mb-1">100% Satisfaction Guarantee</p>
               <p className="text-xs text-slate-400">We stand behind every installation with comprehensive warranty and support.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ComprehensiveSolutionComponent;