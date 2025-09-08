import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp,
  FaCheckCircle,
} from "react-icons/fa";
import axiosClient from "../../axiosClient";
const Contact = () => {
  // Configure your contact details here
  const PHONE = "+254706 074 540"; // displayed
  const PHONE_TEL = "+254706074540"; // tel: link (no spaces)
  const EMAIL = "info@harristech.co.ke";
  const WHATSAPP_NUMBER = "254706074540"; // wa.me requires country code without +
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Hello Harristech, I’m interested in your services."
  );

  // Form state
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top when page loads
  }, []);

  const toggleOpen = () => {
    setIsOpen((v) => !v);
    // Reset success state if reopened
    if (submitted) setSubmitted(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !message.trim()) {
      setError("Please provide your name and a short message.");
      return;
    }

    // Optional basic email validation
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    const payload = {
      name,
      email,
      message,
      // you can include phone or other metadata here
    };

    // Adjust endpoint to your backend route
    axiosClient
      .post("/contact", payload)
      .then((res) => {
        setSubmitted(true);
        // Optionally clear form
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        console.error("Contact submit error:", err);
        setError("Failed to send message — please try again later.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-3 md:px-12 lg:px-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10 px-1">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Contact <span className="text-green-600">Harristech</span>
        </h1>
        <p className="mt-3 text-gray-600 text-base md:text-lg">
          We’re here to help — reach out via WhatsApp, phone, email or send us a
          message below.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Contact info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Get in touch</h2>
            <p className="mt-2 text-gray-600">
              Prefer quick replies? Use WhatsApp or call us directly.
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4">
            <div className="p-1 md:p-3 bg-green-50 rounded-lg">
              <FaPhone className="text-green-600 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-gray-900 font-medium hover:underline"
              >
                {PHONE}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="p-1 md:p-3 bg-indigo-50 rounded-lg">
              <FaEnvelope className="text-indigo-600 w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <a
                href={`mailto:${EMAIL}`}
                className="text-gray-900 font-medium hover:underline"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-md font-semibold transition"
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <div className="text-sm text-gray-500 mt-2">
              Usually replies within a few minutes.
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Follow us
            </h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
                aria-label="Twitter/X"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Collapsible message form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Toggle header */}
          <button
            onClick={toggleOpen}
            aria-expanded={isOpen}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-md">
                <FaEnvelope className="text-green-600 w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-800">
                  Send Us a Message
                </div>
                <div className="text-xs text-gray-500">
                  We’ll respond by email or WhatsApp.
                </div>
              </div>
            </div>
            <div className="text-green-600">
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </button>

          {/* Collapsible panel */}
          <div
            className={`mt-4 transition-all duration-300 ${
              isOpen
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                    rows={5}
                    placeholder="Tell us what you need..."
                    required
                  />
                </div>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </button>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `Hi Harristech, my name is ${name || "—"}. ${
                        message || ""
                      }`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:shadow-sm transition"
                  >
                    <FaWhatsapp className="text-green-600" />
                    Quick WhatsApp
                  </a>
                </div>
              </form>
            ) : (
              <div className="py-8 flex flex-col items-center text-center">
                <FaCheckCircle className="text-green-600 w-16 h-16 mb-4" />
                <h3 className="text-xl font-bold text-gray-900">
                  Message sent
                </h3>
                <p className="text-gray-600 mt-2 max-w-md">
                  Thanks! We received your message and will contact you at{" "}
                  <span className="font-medium text-gray-900">
                    {email || "the email you provided"}
                  </span>{" "}
                  or via WhatsApp shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsOpen(false);
                    setError("");
                  }}
                  className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
