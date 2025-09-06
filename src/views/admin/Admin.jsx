import React, { useState } from "react";
import axiosClient from "../../axiosClient";
import ServiceDescription from "../../data/ServicesDescriptionData";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSyncData = () => {
    setLoading(true);
    setMessage("");

    // 1. Check if data already exists
    axiosClient
      .get("/systems/check")
      .then((res) => {
        if (res.data.hasData) {
          setMessage(
            "⚠️ Data already exists in the systems table. Nothing added."
          );
          setLoading(false);
        } else {
          // 2. Upload each service description
          const entries = Object.entries(ServiceDescription);
          let completed = 0;

          entries.forEach(([key, item]) => {
            const payload = {
              name: item.name,
              type:item.type,
              shortDescription: item.shortDescription,
              front_image: null,
              top_image: null,
              intermediate_image: null,
              fullDescription: item.fullDescription,
              systemFunctions: item.systemFunctions,
              howItWorks: item.howItWorks,
              useCases: item.useCases,
            };

            axiosClient
              .post("/systems/create", payload)
              .then(() => {
                completed++;
                if (completed === entries.length) {
                  setMessage(
                    "✅ All services have been successfully uploaded."
                  );
                  setLoading(false);
                }
              })
              .catch((err) => {
                console.error("Error uploading:", err);
                setMessage("❌ Something went wrong while syncing data.");
                setLoading(false);
              });
          });
        }
      })
      .catch((err) => {
        console.error("Check failed:", err);
        setMessage("❌ Could not check the systems table.");
        setLoading(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Panel</h1>

      <button
        onClick={handleSyncData}
        disabled={loading}
        className={`px-6 py-3 rounded-lg font-semibold shadow-md transition 
          ${
            loading ? "bg-gray-400" : "bg-pink-700 hover:bg-pink-800 text-white"
          }
        `}
      >
        {loading ? "Processing..." : "Sync Service Data"}
      </button>

      {message && (
        <p className="mt-4 text-lg font-medium text-slate-700">{message}</p>
      )}
    </div>
  );
};

export default Admin;
