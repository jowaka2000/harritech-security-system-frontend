import { useEffect, useState } from "react";
import { Plus, MessageSquare, Star } from "lucide-react";
import axiosClient from "../../axiosClient";

const QUOTE_SUGGESTIONS = [
  "This system really changed how I work! It has streamlined all my daily tasks.",
  "Super reliable and easy to use. Even someone with minimal technical knowledge can get started quickly.",
  "I recommend it to all my colleagues. It has become an essential tool for our team.",
  "A perfect solution for modern challenges. It adapts well to evolving business needs.",
];

const TestimonialsComponent = ({ systemId, systemName }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    quote: QUOTE_SUGGESTIONS[Math.floor(Math.random() * QUOTE_SUGGESTIONS.length)],
  });

  useEffect(() => {
    if (!systemId) return;
    axiosClient.get(`/testimonials/show/${systemId}`)
      .then(({ data }) => {
        setCount(data.count);
        setTestimonials(data.testimonials);
      })
      .catch((err) => console.error(err));
  }, [systemId]);

  const handleSaveTestimony = () => {
    if (!formData.name.trim() || !formData.quote.trim()) return alert("Name and Quote required.");

    axiosClient.post(`/testimonials/create/${systemId}`, formData)
      .then(({ data }) => {
        setTestimonials(prev => [data, ...prev].slice(0, 3));
        setCount(c => c + 1);
        setIsModalOpen(false);
        setFormData({ name: "", quote: QUOTE_SUGGESTIONS[Math.floor(Math.random() * QUOTE_SUGGESTIONS.length)] });
      })
      .catch(() => alert("Failed to save testimony."));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-green-600" /> Testimonials ({count})
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
          title="Add Testimonial"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {testimonials.length === 0 && (
        <p className="text-slate-400 text-xs italic text-center py-4">No reviews yet.</p>
      )}

      <div className="space-y-4">
        {testimonials.map((t, index) => (
          <div key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-xs text-slate-700 italic mb-2">"{t.quote}"</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">— {t.name}</p>
          </div>
        ))}
      </div>

      {/* Simple Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="font-bold text-lg mb-4">Share Your Experience</h3>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded-lg mb-3 text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <textarea
              className="w-full border p-2 rounded-lg mb-4 text-sm"
              rows="3"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={handleSaveTestimony} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsComponent;