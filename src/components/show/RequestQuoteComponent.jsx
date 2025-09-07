import { useState } from "react";
import { X, CheckCircle2, Phone, Shield } from "lucide-react";
import axiosClient from "../../axiosClient";

const RequestQuoteComponent = ({
  isOpen,
  onClose,
  systemName,
  systemsList,
}) => {
  const [selectedSystem, setSelectedSystem] = useState(systemName || "");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone) {
      return alert("Please enter your phone number.");
    }

    axiosClient
      .post("/quotes/store", {
        system_name: selectedSystem,
        phone: phone,
      })
      .then((response) => {
        console.log("✅ Quote request submitted:", response.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error("❌ Error submitting quote:", error);
        alert("Failed to submit request. Please try again.");
      });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-80 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mt-10 relative">
        {/* Cancel / Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-2">
              <Shield className="text-pink-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">
                Request a Quote
              </h2>
            </div>
            <p className="text-gray-500 text-sm">
              Select a system and enter your phone number. Our team will reach
              out to you soon.
            </p>

            {/* System Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select System
              </label>
              <select
                value={selectedSystem}
                onChange={(e) => setSelectedSystem(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Choose a system...
                </option>
                {systemsList.map((sys, idx) => (
                  <option key={idx} value={sys}>
                    {sys}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex items-center border border-slate-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-pink-500">
                <Phone className="text-gray-400 mr-2" size={18} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full focus:outline-none"
                  placeholder="e.g. +254 712 345678"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
            >
              Submit Request
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center p-14 text-center space-y-6">
            {/* Success Icon */}
            <CheckCircle2 size={80} className="text-green-500 drop-shadow-md" />

            {/* Title */}
            <h2 className="text-2xl font-extrabold text-gray-900">
              Your Request Has Been Received 🎉
            </h2>

            {/* Message */}
            <p className="text-gray-700 leading-relaxed max-w-md">
              Thank you for reaching out to us. One of our team members will
              contact you as soon as possible
              <span className="font-semibold text-gray-900"></span>. We
              appreciate your interest and look forward to assisting you!
            </p>

            {/* Button */}
            <button
              onClick={onClose}
              className="mt-6 bg-pink-600 hover:bg-pink-700 transition-colors text-white px-8 py-3 rounded-xl shadow-lg font-medium"
            >
              Got It, Thanks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestQuoteComponent;
