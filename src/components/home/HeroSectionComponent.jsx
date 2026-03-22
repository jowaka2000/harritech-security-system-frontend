import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, CheckCircle2, X, Phone, MapPin } from "lucide-react";
import automaticGate from "../../assets/security-systems/automatic gate.png";

const HeroSectionComponent = () => {
  // --- NEW: Modal State ---
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Services List
  const serviceOptions = [
    "Automatic Gate Installation",
    "Electric Fencing",
    "CCTV Surveillance",
    "Biometric Access Control",
    "Intruder Alarm Systems",
    "Fire Safety Solutions",
    "Other / General Inquiry",
  ];

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    // Smart Pre-fill: Since this is the Automatic Gate section, pre-select it.
    setFormData((prev) => ({ ...prev, service: "Automatic Gate Installation" }));
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData); 
    
    setIsSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setIsSubmitted(false);
      setFormData({ service: "", phone: "" });
    }, 2000);
  };

  return (
    <section className="bg-slate-50 py-16 lg:py-24 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left space-y-6"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
              Featured Service
            </span>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Automatic Gate</span> <br />
              Installation
            </h1>
            
            <div className="space-y-4 text-slate-600 text-lg max-w-2xl mx-auto lg:mx-0">
               <p>
                Secure your property with our <span className="font-semibold text-slate-900">automatic gate systems</span>. 
                We provide professional installation, maintenance, and after-sales support to ensure safety and convenience.
              </p>
              
              <ul className="space-y-2 text-left mt-4 max-w-md mx-auto lg:mx-0">
                {["Remote Access Control", "Heavy Duty Motors", "Safety Sensors"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
 
            {/* --- UPDATED: CTA Buttons --- */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              
              {/* Button 1: Request Quote (Primary) */}
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Button 2: WhatsApp (Secondary) */}
              <a
                href="https://wa.me/254796802258?text=Hello%20HARRISTECH%2C%20I%27m%20interested%20in%20Automatic%20Gate%20Installation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 hover:border-green-500 hover:text-green-600 px-6 py-4 rounded-xl font-bold text-lg shadow-sm transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="relative group">
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src={automaticGate}
                  alt="Automatic Gate Installation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Certified</p>
                  <p className="font-bold text-slate-800">Installers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- MODAL POPUP (Copied and Integrated) --- */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
              >
                {/* Header */}
                <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Request Service</h3>
                      <p className="text-xs text-slate-300">We'll call you back shortly</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-white transition-colors p-1"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* Service Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Select Service
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            required
                            className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 rounded-xl py-3 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          >
                            <option value="" disabled>Choose a service...</option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <ArrowRight className="w-4 h-4 text-slate-400" />
                          </div>
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="w-4 h-4 text-slate-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="07XX XXX XXX"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]*"
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1 pl-1">We respect your privacy.</p>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                      >
                        Submit Request
                        <ArrowRight className="w-4 h-4" />
                      </button>

                    </form>
                  ) : (
                    /* Success State */
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Request Received!</h3>
                      <p className="text-slate-600">We will contact you at <b>{formData.phone}</b> shortly.</p>
                    </div>
                  )}
                </div>
                
                {/* Footer Note */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                   <MapPin className="w-3 h-3" />
                   <span>Serving Nairobi and surrounding areas</span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSectionComponent;