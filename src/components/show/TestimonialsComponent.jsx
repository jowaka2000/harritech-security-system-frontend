// src/components/show/Testimonials.jsx
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import axiosClient from "../../axiosClient";

// Suggested quotes (lazy typing help 😅)
const QUOTE_SUGGESTIONS = [
  "This system really changed how I work! It has streamlined all my daily tasks and improved my efficiency tremendously.",
  "Super reliable and easy to use. Even someone with minimal technical knowledge can get started quickly.",
  "I recommend it to all my colleagues. It has become an essential tool for our team collaboration.",
  "A perfect solution for modern challenges. It adapts well to evolving business needs and scales seamlessly.",
  "The support team was amazing! They guided me through setup and were always ready to answer my questions.",
  "Setup was fast and painless. Everything worked out of the box, saving me a lot of time and frustration.",
  "I feel much more secure using this system. The advanced features provide peace of mind and reliability.",
  "The design is sleek and professional. It’s visually appealing and very intuitive to navigate.",
  "It exceeded my expectations. Every feature works as promised, and it adds real value to my workflow.",
  "A must-have for any serious organization. It enhances productivity and ensures all critical tasks are handled efficiently.",
];

const TestimonialsComponent = ({ systemId, systemName }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    quote:
      QUOTE_SUGGESTIONS[Math.floor(Math.random() * QUOTE_SUGGESTIONS.length)],
  });
  const [error, setError] = useState("");

  // Fetch testimonials for the given system
  useEffect(() => {
    if (!systemId) return;

    axiosClient
      .get(`/testimonials/show/${systemId}`)
      .then(({ data }) => {
        setCount(data.count);
        setTestimonials(data.testimonials);
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, [systemId]);

  // Handle form submission
  const handleSaveTestimony = () => {
    setError("");

    // Simple validation
    if (!formData.name.trim() || !formData.quote.trim()) {
      setError("Both name and quote are required.");
      return;
    }

    axiosClient
      .post(`/testimonials/create/${systemId}`, {
        name: formData.name,
        quote: formData.quote,
      })
      .then(({ data }) => {
        setTestimonials((prev) => {
          const updated = [data, ...prev]; // add new testimonial on top
          return updated.slice(0, 3); // keep only the latest 3
        });
        setCount(count + 1); // Add new testimony to UI
        setIsModalOpen(false); // Close modal
        setFormData({
          name: "",
          quote:
            QUOTE_SUGGESTIONS[
              Math.floor(Math.random() * QUOTE_SUGGESTIONS.length)
            ],
        });
      })
      .catch((err) => {
        console.error("Error saving testimony:", err);
        setError("Failed to save testimony. Try again.");
      });
  };

  return (
    <article className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-gray-800">
          Testimonials ({count})
        </h3>
        <button
          className="flex items-center gap-1 bg-pink-600 text-white text-xs md:text-sm px-3 py-1 rounded-lg shadow hover:bg-pink-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Share Testimony
        </button>
      </div>

      {testimonials.length === 0 && (
        <p className="text-gray-500 text-sm italic">
          No testimonials yet. Be the first to share your experience!
        </p>
      )}

      <div className="space-y-6">
        {testimonials.map((t, index) => (
          <div key={index}>
            <blockquote className="border-l-4 border-pink-600 pl-4 italic text-sm md:text-base text-gray-700">
              "{t.quote}"
            </blockquote>
            <p className="mt-3 text-xs md:text-sm font-medium text-gray-600">
              — {t.name}
            </p>
            <p className="text-xs text-gray-500">{systemName}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Share Your Testimony</h2>

            {error && (
              <p className="text-sm text-red-600 mb-3 font-medium">{error}</p>
            )}

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-md px-3 py-2 mb-3"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <textarea
              className="w-full border rounded-md px-3 py-2 mb-3"
              rows="3"
              value={formData.quote}
              onChange={(e) =>
                setFormData({ ...formData, quote: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTestimony}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default TestimonialsComponent;
