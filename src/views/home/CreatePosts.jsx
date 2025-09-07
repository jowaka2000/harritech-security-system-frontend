import React, { useReducer, useRef } from "react";
import axiosClient from "../../axiosClient";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import { Navigate } from "react-router-dom";

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "CATEGORY_ON_CHANGE":
      let device = [];
      if (action.payload === "Cameras") {
        device = [
          "IP Cameras",
          "DVRs and NVRs",
          "Analogue HD Cameras",
          "Vehicle DVRs",
          "Vehicle Cameras",
        ];
      } else if (action.payload === "Biometric Systems") {
        device = [
          "Access Control",
          "Attendance Systems",
          "Software & Solutions",
        ];
      } else if (action.payload === "Perimeter Security") {
        device = ["Electric Fence", "Automatic Gates"];
      } else if (action.payload === "Alarm Systems") {
        device = ["Intruder Alarm Systems", "Fire Alarm Systems", "Fire Doors"];
      }
      return {
        ...state,
        devices: device,
        category: action.payload,
        device: "",
      };

    case "DEVICE_ON_CHANGE":
      return { ...state, device: action.payload };

    case "PRICE_ON_CHANGE":
      return { ...state, price: action.payload };

    case "DESCRIPTION_ON_CHANGE":
      return { ...state, description: action.payload };

    case "IMAGE_ON_CHANGE":
      return { ...state, images: action.payload }; // single file

    case "RESET_FORM":
      return defaultValues;

    default:
      return state;
  }
};

// Default Values
const defaultValues = {
  category: "",
  devices: [],
  device: "",
  price: "",
  description: "",
  image: [],
};

const CreatePosts = () => {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  const imageRef = useRef(null);

  const { token } = useAuthContextProvider();

  if (!token) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !state.category ||
      !state.device ||
      !state.price ||
      !state.description
    ) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    // ✅ Require at least one image
    if (!state.images || state.images.length === 0) {
      alert("⚠️ Please upload at least one image.");
      return;
    }

    const payload = {
      category: state.category,
      device: state.device,
      price: state.price,
      description: state.description,
    };

    const formData = new FormData();
    state.images.forEach((file) => {
      formData.append("images[]", file); // multiple files
    });
    formData.append("payload", JSON.stringify(payload));

    axiosClient
      .post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("✅ Product created:", response.data);
        alert("🎉 Product successfully added!");
        dispatch({ type: "RESET_FORM" });
        if (imageRef.current) imageRef.current.value = null;
      })
      .catch((error) => {
        console.error("❌ Error creating product:", error);
        alert("Failed to create product. Try again.");
      });
  };

  return (
    <div className="p-3 md:p-6 max-w-3xl mx-auto">
      <section className="bg-white shadow-xl rounded-2xl p-3 md:p-6 border border-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">➕ Add New</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition">
            View Products
          </button>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a category...
              </option>
              <option value="Cameras">Cameras</option>
              <option value="Biometric Systems">Biometric Systems</option>
              <option value="Perimeter Security">Perimeter Security</option>
              <option value="Alarm Systems">Alarm Systems</option>
            </select>
          </div>

          {/* Device */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Device <span className="text-red-500">*</span>
            </label>
            <select
              value={state.device}
              onChange={(e) =>
                dispatch({ type: "DEVICE_ON_CHANGE", payload: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
              disabled={!state.category}
            >
              <option value="" disabled>
                {state.category
                  ? "Select a device..."
                  : "Select category first"}
              </option>
              {state.devices.map((device, index) => (
                <option key={index} value={device}>
                  {device}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (KSH) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={state.price}
              onChange={(e) =>
                dispatch({ type: "PRICE_ON_CHANGE", payload: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="Enter amount in KSH"
              required
              min="0"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="Write a short description..."
              rows="4"
              required
            ></textarea>
          </div>

          {/* Multiple Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              ref={imageRef}
              type="file"
              name="images[]"
              accept="image/png,image/jpeg"
              multiple
              onChange={(e) =>
                dispatch({
                  type: "IMAGE_ON_CHANGE",
                  payload: Array.from(e.target.files),
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />

            {/* Preview */}
            {state.images?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {state.images.map((file, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden shadow"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg py-3 rounded-lg shadow-lg transition"
          >
            Submit Product
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreatePosts;
