import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export const AddPost = ({ systemId, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    description: "",
    image: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setFormData({ ...formData, image: file });
    } else {
      alert("Please upload a valid image (JPG, PNG, WEBP).");
    }
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.image) {
      alert("Both description and image are required.");
      return;
    }

    setUploading(true);

    // later we'll implement backend API call here
    const postPayload = new FormData();
    postPayload.append("description", formData.description);
    postPayload.append("image", formData.image);
    postPayload.append("system_id", systemId);

    onSave(postPayload); // pass to parent
    setUploading(false);
    setFormData({ description: "", image: null });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold text-gray-800">
              Add Post
            </Dialog.Title>
            <button onClick={onClose}>
              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm"
              />
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
              disabled={uploading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              {uploading ? "Saving..." : "Save Post"}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
