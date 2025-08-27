import React, { useState } from "react";
import { FaCogs, FaShieldAlt, FaTools } from "react-icons/fa";

const RequestServiceComponent = () => {
  const [showModal, setShowModal] = useState(false); // ✅ define here

  return (
    <div className="w-full bg-gray-50 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Why Choose <span className="text-pink-700">Our Services?</span>
        </h2>

        {/* Info Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <FaCogs className="text-4xl text-pink-700 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-slate-800">
              Advanced Technology
            </h3>
            <p className="text-slate-600 text-sm">
              We use modern, reliable, and cutting-edge equipment to secure your
              premises.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <FaShieldAlt className="text-4xl text-pink-700 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-slate-800">
              Trusted Security
            </h3>
            <p className="text-slate-600 text-sm">
              Our systems are proven to protect homes and businesses with
              guaranteed reliability.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
            <FaTools className="text-4xl text-pink-700 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-slate-800">24/7 Support</h3>
            <p className="text-slate-600 text-sm">
              Our professional team is always available for maintenance and
              support when you need it.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <button
          onClick={() => setShowModal(true)}
          className="mt-8 bg-pink-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-800 transition"
        >
          Request a Service
        </button>
      </div>
    </div>
  );
};

export default RequestServiceComponent;
