import React, { useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import { Upload, X, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";

// --- Reducer Logic ---
const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_ON_CHANGE":
      let suggestions = [];
      // Populate suggestions based on category
      if (action.payload === "Cameras") {
        suggestions = ["IP Cameras", "DVRs and NVRs", "Analogue HD Cameras", "Vehicle DVRs", "Vehicle Cameras", "PTZ Cameras"];
      } else if (action.payload === "Biometric Systems") {
        suggestions = ["Access Control", "Attendance Systems", "Fingerprint Scanners", "Face Recognition Terminals"];
      } else if (action.payload === "Perimeter Security") {
        suggestions = ["Electric Fence", "Automatic Gates", "Razor Wire", "Motion Sensors"];
      } else if (action.payload === "Alarm Systems") {
        suggestions = ["Intruder Alarm Systems", "Fire Alarm Systems", "Fire Doors", "Smoke Detectors"];
      } else if (action.payload === "Other") {
        suggestions = []; // No suggestions if "Other" is selected
      }

      return {
        ...state,
        category: action.payload,
        deviceSuggestions: suggestions,
        device: "", // Reset device when category changes
      };

    case "DEVICE_ON_CHANGE":
      return { ...state, device: action.payload };

    case "PRICE_ON_CHANGE":
      return { ...state, price: action.payload };

    case "DESCRIPTION_ON_CHANGE":
      return { ...state, description: action.payload };

    case "IMAGE_ON_CHANGE":
      return { ...state, images: action.payload };

    case "RESET_FORM":
      return defaultValues;

    default:
      return state;
  }
};

const defaultValues = {
  category: "",
  deviceSuggestions: [],
  device: "",
  price: "",
  description: "",
  images: [],
};

const CreatePosts = () => {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token, isAdmin } = useAuthContextProvider();

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors = {};
    if (!state.category) newErrors.category = "Category is required.";
    if (!state.device.trim()) newErrors.device = "Device name is required.";
    if (!state.price || Number(state.price) <= 0) newErrors.price = "A valid price is required.";
    if (!state.description.trim()) newErrors.description = "Description is required.";
    if (!state.images || state.images.length === 0) newErrors.images = "At least one image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if errors exist

    setIsSubmitting(true);

    const payload = {
      category: state.category,
      device: state.device,
      price: state.price,
      description: state.description,
    };

    const formData = new FormData();
    state.images.forEach((file) => {
      formData.append("images[]", file);
    });
    formData.append("payload", JSON.stringify(payload));

    axiosClient
      .post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        alert("🎉 Product successfully added!");
        dispatch({ type: "RESET_FORM" });
        if (imageRef.current) imageRef.current.value = null;
        // navigate("/products"); // Or wherever you want to redirect
      })
      .catch((error) => {
        console.error("❌ Error creating product:", error);
        alert("Failed to create product. Try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // --- Helper: Filtered Suggestions ---
  const filteredSuggestions = state.deviceSuggestions.filter((s) =>
    s.toLowerCase().includes(state.device.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Add New Product</h1>
            <p className="text-slate-500">Fill in the details below to list a new security product.</p>
          </div>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition"
          >
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: FORM --- */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.category}
                  onChange={(e) => dispatch({ type: "CATEGORY_ON_CHANGE", payload: e.target.value })}
                  className={`w-full border rounded-xl px-4 py-3 bg-slate-50 focus:outline-none transition-colors ${errors.category ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                  required
                >
                  <option value="" disabled>Select a category...</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Biometric Systems">Biometric Systems</option>
                  <option value="Perimeter Security">Perimeter Security</option>
                  <option value="Alarm Systems">Alarm Systems</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.category}</p>}
              </div>

              {/* Device (Text Input with Suggestions) */}
              <div className="relative z-20">
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Device Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={state.device}
                  onChange={(e) => dispatch({ type: "DEVICE_ON_CHANGE", payload: e.target.value })}
                  placeholder="Type to search or enter device name..."
                  className={`w-full border rounded-xl px-4 py-3 bg-slate-50 focus:outline-none transition-colors ${errors.device ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                  required
                  autoComplete="off"
                />
                {errors.device && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.device}</p>}

                {/* Suggestions Dropdown */}
                {state.device && filteredSuggestions.length > 0 && (
                  <div className="absolute top-[3.4rem] left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl mt-1 max-h-40 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        onClick={() => dispatch({ type: "DEVICE_ON_CHANGE", payload: suggestion })}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-slate-700 hover:text-blue-700 border-b border-slate-50 last:border-0"
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Price (KES) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-medium">KES</span>
                  <input
                    type="number"
                    value={state.price}
                    onChange={(e) => dispatch({ type: "PRICE_ON_CHANGE", payload: e.target.value })}
                    placeholder="0.00"
                    className={`w-full border rounded-xl pl-14 pr-4 py-3 bg-slate-50 focus:outline-none transition-colors ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                    required
                    min="1"
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.price}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={state.description}
                  onChange={(e) => dispatch({ type: "DESCRIPTION_ON_CHANGE", payload: e.target.value })}
                  placeholder="Describe the product features, specifications, and usage..."
                  className={`w-full border rounded-xl px-4 py-3 bg-slate-50 focus:outline-none transition-colors resize-none h-32 ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                  required
                ></textarea>
                {errors.description && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.description}</p>}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Product Images <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50 cursor-pointer relative">
                  <input
                    ref={imageRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={(e) => dispatch({ type: "IMAGE_ON_CHANGE", payload: Array.from(e.target.files) })}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600 font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
                {errors.images && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.images}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <CheckCircle2 size={20} /> Create Product
                  </>
                )}
              </button>
            </form>
          </div>

          {/* --- RIGHT COLUMN: PREVIEW & INFO --- */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                Image Preview
              </h3>
              
              {state.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {state.images.map((file, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                           const newImages = state.images.filter((_, i) => i !== index);
                           dispatch({ type: "IMAGE_ON_CHANGE", payload: newImages });
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                  <ImageIcon size={32} className="mb-2 opacity-50" />
                  <span className="text-sm">No images selected</span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">💡 Tips</h4>
              <ul className="text-sm text-blue-800 space-y-2 list-disc pl-4">
                <li>Choose "Other" if your device category isn't listed.</li>
                <li>High-quality images increase sales visibility.</li>
                <li>Include specific model numbers in the description.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;