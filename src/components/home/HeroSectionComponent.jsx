import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  X,
  Phone,
  MapPin,
  Shield,
} from "lucide-react";
import automaticGate from "../../assets/security-systems/automatic gate.png";
import { Link } from "react-router-dom";

const HeroSectionComponent = () => {
  // --- Modal State ---
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
    setFormData((prev) => ({
      ...prev,
      service: "Automatic Gate Installation",
    }));
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
    <section className="relative bg-white py-20 lg:py-32 overflow-hidden">
      {/* DECORATION: Subtle Background Image (Watermark style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Faint gate image in background */}
        <img
          src={automaticGate}
          alt="Automatic Gate Background"
          className="w-full h-full object-cover opacity-[0.05] grayscale"
        />
        {/* White Gradient Overlay to ensure text pops */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-slate-50/80"></div>
      </div>

      {/* DECORATION: Soft Pastel Blobs (Light Theme) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left space-y-8"
          >
            {/* Badge - Light Theme */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3 h-3" />
              Top Rated Security
            </div>

            {/* Heading - Dark Text with Gradient Accent */}
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Modern <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                Automatic Gates
              </span>
            </h1>

            <div className="space-y-6 text-slate-600 text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              <p>
                Enhance your property with sleek and reliable{" "}
                <span className="font-semibold text-slate-900">
                  automatic gate systems
                </span>
                . We provide professional installation that blends security with
                modern aesthetics.
              </p>

              <ul className="space-y-3 text-left mt-4 max-w-md mx-auto lg:mx-0">
                {[
                  "Remote Access Control",
                  "Quiet Motors",
                  "Safety Sensors",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 group">
                    <div className="bg-indigo-100 p-1 rounded-full group-hover:bg-indigo-200 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    </div>
                    <span className="text-base text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons - Indigo Primary */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center gap-4 justify-center lg:justify-start">
              {/* Button 1: Request Quote (Indigo) */}
              <button
                onClick={handleOpenModal}
                className="group relative inline-flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: WhatsApp (White with border) */}
              <a
                href="https://wa.me/254706074540?text=Hello%20HARRISTECH%2C%20I%27m%20interested%20in%20Automatic%20Gate%20Installation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 hover:border-green-500 hover:text-green-600 hover:bg-green-50 px-6 py-4 rounded-xl font-bold text-lg shadow-sm transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>

              {/* NEW: Button 3: Explore More */}
              <Link
                to="/security-systems/automatic-gates"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors mt-2 sm:mt-0 underline underline-offset-4 decoration-2 decoration-transparent hover:decoration-indigo-200 group"
              >
                Explore Installation Details
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right: Image with Clean Card Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full relative"
          >
            <Link
              to="/security-systems/automatic-gates"
              className="relative group"
            >
              {/* Main Image Container - Clean Shadow */}
              <div className="relative w-full h-[400px] lg:h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-slate-100">
                <img
                  src={automaticGate}
                  alt="Automatic Gate Installation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle gradient for bottom text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Badge - White Card Style */}
              <div className="absolute -bottom-8 -left-4 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                    Certified
                  </p>
                  <p className="font-bold text-slate-900 text-lg leading-tight">
                    Expert Installers
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-indigo-100 rounded-tr-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-blue-100 rounded-br-3xl"></div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* --- MODAL POPUP (Clean White Theme) --- */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />

            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 pointer-events-auto overflow-hidden"
              >
                {/* Header */}
                <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-2 rounded-lg shadow-md shadow-indigo-200">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">
                        Request Service
                      </h3>
                      <p className="text-xs text-slate-500">
                        We'll call you back shortly
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-slate-400 hover:text-slate-700 transition-colors p-1 hover:bg-slate-200 rounded-md"
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
                            className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3.5 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all cursor-pointer hover:bg-slate-100"
                          >
                            <option value="" disabled>
                              Choose a service...
                            </option>
                            {serviceOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
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
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl py-3.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all hover:bg-slate-100"
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 pl-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-indigo-500" />{" "}
                          Your data is secure.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                      >
                        Submit Request
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    /* Success State */
                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        Request Received!
                      </h3>
                      <p className="text-slate-600 px-4">
                        We will contact you at{" "}
                        <span className="font-bold text-indigo-700">
                          {formData.phone}
                        </span>{" "}
                        shortly.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Note */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 text-indigo-500" />
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
