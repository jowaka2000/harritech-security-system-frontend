import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Headset, ArrowRight, X, Phone, CheckCircle2, MapPin } from "lucide-react";

const RequestServiceComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // List of services for the dropdown
  const serviceOptions = [
    "Automatic Gate Installation",
    "Electric Fencing",
    "CCTV Surveillance",
    "Biometric Access Control",
    "Intruder Alarm Systems",
    "Fire Safety Solutions",
    "Other / General Inquiry",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData); // Backend integration later
    
    // Show success state briefly then close
    setIsSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setIsSubmitted(false);
      setFormData({ service: "", phone: "" }); // Reset form
    }, 2000);
  };

  const features = [
    {
      icon: Cpu,
      title: "Advanced Technology",
      desc: "We use modern, reliable, and cutting-edge equipment to secure your premises with precision.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Security",
      desc: "Our systems are proven to protect homes and businesses with guaranteed reliability and durability.",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      desc: "Our professional team is always available for maintenance and support whenever you need it.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
         <div className="absolute -left-20 top-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Our Services?</span>
          </h2>
          <p className="text-lg text-slate-600">
            We combine expertise with the latest technology to deliver security solutions that stand the test of time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
          >
            Request a Service
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- MODAL POPUP --- */}
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

export default RequestServiceComponent;