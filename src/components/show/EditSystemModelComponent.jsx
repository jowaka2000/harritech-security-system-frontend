import React, { useState } from "react";
import {  X } from "lucide-react"; // icons

import { Dialog } from "@headlessui/react"; // lightweight accessible modal

const EditSystemModelComponent = ({ system, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: system?.name || "",
    shortDescription: system?.shortDescription || "",
    fullDescription: system?.fullDescription || "",
    keyPoints: system.howItWorks?.keyPoints || [],
    systemFunctions: system?.systemFunctions || [],
    useCases: system?.useCases || [],
    howItWorks: system?.howItWorks.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (field, index) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated.splice(index, 1);
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      {/* Modal panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg overflow-y-auto max-h-[90vh]">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold text-gray-800">
              Edit System Details
            </Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                System Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                rows="2"
                value={formData.shortDescription || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Description
              </label>
              <textarea
                name="fullDescription"
                rows="4"
                value={formData.fullDescription || ""}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* How It Works (description) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                How It Works (Description)
              </label>
              <textarea
                name="howItWorks"
                rows="3"
                value={formData.howItWorks || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    howItWorks: e.target.value,
                  }))
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            {/* Key Points */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Key Points(How it works)
              </label>
              <div className="space-y-2 mt-2">
                {formData.keyPoints?.map((point, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) =>
                        handleArrayChange("keyPoints", index, e.target.value)
                      }
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("keyPoints", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem("keyPoints")}
                className="mt-2 text-sm text-pink-600 hover:underline"
              >
                + Add Key Point
              </button>
            </div>

            {/* System Functions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                System Functions
              </label>
              <div className="space-y-2 mt-2">
                {formData.systemFunctions?.map((func, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={func}
                      onChange={(e) =>
                        handleArrayChange(
                          "systemFunctions",
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("systemFunctions", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem("systemFunctions")}
                className="mt-2 text-sm text-pink-600 hover:underline"
              >
                + Add Function
              </button>
            </div>

            {/* Use Cases */}
            <div>
              <label className="block  font-semibold text-gray-700">
                Use Cases
              </label>
              <div className="space-y-2 mt-2">
                {formData.useCases?.map((use, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={use}
                      onChange={(e) =>
                        handleArrayChange("useCases", index, e.target.value)
                      }
                      className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("useCases", index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem("useCases")}
                className="mt-2 text-sm text-pink-600 hover:underline"
              >
                + Add Use Case
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
            >
              Save Changes
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditSystemModelComponent;
