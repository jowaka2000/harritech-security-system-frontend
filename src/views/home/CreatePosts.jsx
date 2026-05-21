import React, { useReducer, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import {
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// --- Reducer Logic ---
const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_ON_CHANGE":
      // Populate suggestions based on category (Optional: kept if you still want categories)
      let suggestions = [];
      if (action.payload === "Cameras") {
        suggestions = [
          "IP Cameras",
          "DVRs and NVRs",
          "Analogue HD Cameras",
          "Vehicle DVRs",
        ];
      } else if (action.payload === "Biometric Systems") {
        suggestions = [
          "Access Control",
          "Attendance Systems",
          "Fingerprint Scanners",
        ];
      } else if (action.payload === "Perimeter Security") {
        suggestions = [
          "Electric Fence",
          "Automatic Gates",
          "Razor Wire",
          "Motion Sensors",
        ];
      } else if (action.payload === "Alarm Systems") {
        suggestions = [
          "Intruder Alarm Systems",
          "Fire Alarm Systems",
          "Smoke Detectors",
        ];
      } else if (action.payload === "Other") {
        suggestions = [];
      }

      return {
        ...state,
        category: action.payload,
        deviceSuggestions: suggestions, // Keeping state name for consistency, or rename to categorySuggestions
        title: "", // Reset title when category changes? Optional.
      };

    case "TITLE_ON_CHANGE":
      return { ...state, title: action.payload };

    case "DESCRIPTION_ON_CHANGE":
      return { ...state, description: action.payload };

    case "IMAGE_ON_CHANGE":
      // Handle Single Image for Banner
      return { ...state, image: action.payload };

    case "RESET_FORM":
      return defaultValues;

    default:
      return state;
  }
};

const defaultValues = {
  category: "",
  deviceSuggestions: [], // Keeping field to avoid breaking reducer if referenced elsewhere, though not used in UI
  title: "",
  description: "",
  image: null, // Single file object
};

const CreatePosts = () => {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  const imageRef = useRef(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { token, isAdmin } = useAuthContextProvider();

  if (!token && !isAdmin) {
    return <Navigate to="/" />;
  }

  // --- Validation Logic ---
  const validateForm = () => {
    const newErrors = {};
    if (!state.category) newErrors.category = "Category is required.";
    if (!state.title.trim()) newErrors.title = "Post title is required.";
    if (!state.description.trim())
      newErrors.description = "Description is required.";
    if (!state.image) newErrors.image = "A banner image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if errors exist

    setIsSubmitting(true);

    const formData = new FormData();

    // 1. Append text fields directly (No JSON wrapping)
    formData.append("title", state.title);
    formData.append("category", state.category);
    formData.append("description", state.description);

    // 2. Append the image file
    if (state.image) {
      formData.append("image", state.image);
    }

    axiosClient
      .post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        alert("🎉 Post created successfully!");
        dispatch({ type: "RESET_FORM" });
        if (imageRef.current) imageRef.current.value = null;
        // navigate("/posts");
      })
      .catch((error) => {
        console.error("❌ Error creating post:", error);
        // Handle validation errors from backend if needed
        if (error.response && error.response.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          alert("Failed to create post. Try again.");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">
              Create New Post
            </h1>
            <p className="text-slate-500">
              Share updates, news, or banner information.
            </p>
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
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.category}
                  onChange={(e) =>
                    dispatch({
                      type: "CATEGORY_ON_CHANGE",
                      payload: e.target.value,
                    })
                  }
                  className={`w-full border rounded-xl px-4 py-3 bg-slate-50 focus:outline-none transition-colors ${errors.category ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}`}
                  required
                >
                  <option value="" disabled>
                    Select a category...
                  </option>
                  <option value="Automatic Gate">Automatic Gate</option>
                  <option value="Perimeter Fence">Perimeter Fence</option>
                  <option value="CCTV Cameras">CCTV Cameras</option>
                  <option value="Biometric Systems">Biometric Systems</option>
                  <option value="Alarm Systems">Alarm Systems</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.category}
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Post Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={state.title}
                  onChange={(e) =>
                    dispatch({
                      type: "TITLE_ON_CHANGE",
                      payload: e.target.value,
                    })
                  }
                  placeholder="Enter a catchy title for the post..."
                  className={`w-full border rounded-xl px-4 py-3 bg-slate-50 focus:outline-none transition-colors ${errors.title ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}`}
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={state.description}
                  onChange={(e) =>
                    dispatch({
                      type: "DESCRIPTION_ON_CHANGE",
                      payload: e.target.value,
                    })
                  }
                  placeholder="Write the main content of your post here..."
                  className={`w-full border rounded-xl px-4 py-3 bg-slate-50 focus:outline-none transition-colors resize-none h-40 ${errors.description ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"}`}
                  required
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.description}
                  </p>
                )}
              </div>

              {/* Image Upload (Single Banner) */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Banner Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-slate-50 cursor-pointer relative group">
                  <input
                    ref={imageRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    // Removed 'multiple' attribute
                    onChange={(e) => {
                      // Handle single file
                      const file = e.target.files[0];
                      if (file)
                        dispatch({ type: "IMAGE_ON_CHANGE", payload: file });
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="group-hover:scale-105 transition-transform">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-base text-slate-600 font-medium">
                      Click to upload banner image
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      Recommended: Wide aspect ratio (1920px width)
                    </p>
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.image}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Publishing Post...</>
                ) : (
                  <>
                    <CheckCircle2 size={20} /> Create Post
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
                Banner Preview
              </h3>

              {/* Single Image Preview */}
              {state.image ? (
                <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                  <img
                    src={URL.createObjectURL(state.image)}
                    alt="Banner Preview"
                    className="w-full h-auto object-cover max-h-64"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({ type: "IMAGE_ON_CHANGE", payload: null });
                      if (imageRef.current) imageRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 bg-red-500/90 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-sm"
                    title="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="w-full h-48 bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                  <ImageIcon size={40} className="mb-2 opacity-50" />
                  <span className="text-sm font-medium">
                    No banner selected
                  </span>
                </div>
              )}
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2">💡 Posting Tips</h4>
              <ul className="text-sm text-blue-800 space-y-2 list-disc pl-4">
                <li>
                  Use high-quality horizontal images for best banner results.
                </li>
                <li>
                  The title should be catchy and relevant to the category.
                </li>
                <li>
                  Posts will be visible to visitors based on the selected
                  category.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
