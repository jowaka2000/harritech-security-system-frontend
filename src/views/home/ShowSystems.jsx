import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Loader2,
  Pencil,
  Image as ImageIcon,
  FilePlus,
  Shield,
  ArrowRight,
  CheckCircle2,
  Bell,
} from "lucide-react";
import axiosClient from "../../axiosClient";
import EditSystemModelComponent from "../../components/show/EditSystemModelComponent";
import { AddPost } from "../../components/show/AddPost";
import SystemPostsComponent from "../../components/show/SystemPostsComponent";
import TestimonialsComponent from "../../components/show/TestimonialsComponent";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import RequestQuoteComponent from "../../components/show/RequestQuoteComponent";

const ShowSystems = () => {
  const { public_id } = useParams();
  const { token, isAdmin } = useAuthContextProvider();

  // State
  const [system, setSystem] = useState({ top_image: null, name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topImage, setTopImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(null);

  // Mock systems list for the quote dropdown
  const systemsList = [
    "IP Cameras Installation",
    "DVRs and NVRs",
    "Electric Fence",
    "Automatic Gates",
    "Biometric Access",
    "Intruder Alarms",
    "Fire Alarms",
  ];

  // --- Fetch Data ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);
    axiosClient
      .get(`/systems/${public_id}`)
      .then((res) => {
        setSystem(res.data);
        setTopImage(res.data.top_image);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load system.");
      })
      .finally(() => setLoading(false));
  }, [public_id]);

  useEffect(() => {
    setPostsLoading(true);
    axiosClient
      .get(`/posts/index/${public_id}`)
      .then(({ data }) => setPosts(data))
      .catch(() => setPostsError("Failed to load posts"))
      .finally(() => setPostsLoading(false));
  }, [public_id]);

  // --- Handlers ---
  // Generic Upload Helper
  const handleUpload = (file, type) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("JPG, PNG, or WEBP only.");
      return;
    }

    const formData = new FormData();

    // Convert to snake_case by default (top-image -> top_image)
    let formKey = type.replace("-", "_");

    // SPECIAL FIX: The backend validation for Front Image expects 'front-image' (hyphen)
    // whereas Top Image expects 'top_image' (underscore).
    if (type === "front-image") {
      formKey = "front-image";
    }

    // ADDED: Intermediate Image also likely expects a hyphen in validation
    if (type === "intermediate-image") {
      formKey = "intermediate-image";
    }

    formData.append(formKey, file);
    setUploading(true);

    axiosClient
      .post(`/systems/${public_id}/upload-${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        // We use 'formKey' to retrieve the response.
        // If the backend returns the URL using the same key we sent, this works.
        const imageUrl = data[formKey];

        if (type === "top-image") setTopImage(imageUrl);
        else if (type === "front-image")
          setSystem((prev) => ({ ...prev, front_image: imageUrl }));
        else if (type === "intermediate-image")
          setSystem((prev) => ({ ...prev, intermediate_image: imageUrl }));
      })
      .catch((err) => {
        console.error("Upload failed", err);
        alert("Upload failed.");
      })
      .finally(() => setUploading(false));
  };

  const handleSavePost = (formData) => {
    formData.append("system_id", system.public_id);
    axiosClient
      .post(`/posts/create/${system.public_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
        setPosts((prev) => [data, ...prev]);
        setIsPostModalOpen(false);
      })
      .catch(console.error);
  };

  const handleSaveDetails = (updatedData) => {
    axiosClient
      .put(`/systems/update/${system.public_id}`, updatedData)
      .then(({ data }) => {
        setSystem(data.system);
        setIsModalOpen(false);
      })
      .catch(() => alert("Failed to update details."));
  };

  // --- Loading / Error States ---
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
        <span className="text-slate-600 font-medium">
          Loading system details...
        </span>
      </div>
    );
  }


  if (error || !system) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
        <span className="text-xl font-bold mb-2">Oops!</span>
        <span>{error || "System not found."}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* --- HERO SECTION (Replaced Pink with Slate/Blue) --- */}
      <section className="bg-slate-900 text-white pt-12 pb-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Text Content */}
            <div className="md:w-1/2 space-y-6">
              <Link
                to="/security-systems"
                className="inline-flex items-center text-slate-400 hover:text-white transition-colors text-sm mb-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180 mr-1" /> Back to
                Solutions
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                {system.name}
              </h1>
              <p className="text-lg text-slate-300 max-w-xl">
                {system.shortDescription ||
                  "Secure your property with our advanced solutions."}
              </p>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-blue-500/30"
                >
                  Request Quote
                </button>
                <a
                  href={`https://wa.me/254706074540?text=Info about ${system.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition border border-slate-700"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="md:w-1/2 w-full relative group">
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img
                  src={topImage || "/placeholder.png"}
                  alt={system.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Admin Overlay for Top Image */}
                {isAdmin && token && (
                  <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 hover:bg-white/20">
                      <ImageIcon className="w-8 h-8 text-white" />
                    </div>

                    {/* This is the hidden input. Clicking the label (or icon) triggers this. */}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          handleUpload(file, "top-image");
                          e.target.value = ""; // Reset input value here
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADMIN TOOLBAR --- */}
      {isAdmin && token && (
        <div className="sticky top-20 z-40 border-y border-slate-200 bg-white/95 backdrop-blur shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                <Shield className="w-4 h-4" />
                <span>Admin Tools:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Edit Details */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 text-sm font-medium transition"
                >
                  <Pencil size={16} /> Edit Details
                </button>

                {/* Upload Front Image */}
                <label className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 text-sm font-medium transition cursor-pointer">
                  <ImageIcon size={16} />{" "}
                  {uploading ? "Uploading..." : "Upload Front Image"}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleUpload(file, "front-image");
                        e.target.value = "";
                      }
                    }}
                  />
                </label>

                {/* --- NEW: Upload Content Image --- */}
                <label className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 text-sm font-medium transition cursor-pointer">
                  <ImageIcon size={16} />{" "}
                  {uploading ? "Uploading..." : "Upload Content Image"}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleUpload(file, "intermediate-image");
                        e.target.value = "";
                      }
                    }}
                  />
                </label>

                {/* Add Post */}
                <button
                  onClick={() => setIsPostModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 text-sm font-medium transition"
                >
                  <FilePlus size={16} /> Add Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT (Sidebar Layout) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN: Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description & Overview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">
                Overview
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p className="text-lg">{system.fullDescription}</p>

                {/* Intermediate Image (if exists) */}
                {system.intermediate_image && (
                  <div className="my-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group min-h-[300px]">
                    <img
                      src={system.intermediate_image}
                      alt="System Detail"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Admin Overlay */}
                    {isAdmin && token && (
                      <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 hover:bg-white/20">
                          <ImageIcon className="w-8 h-8 text-white" />
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              handleUpload(file, "intermediate-image");
                              e.target.value = "";
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Benefits / Functions */}
            {system.systemFunctions && system.systemFunctions.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">
                  Key Benefits
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {system.systemFunctions.map((func, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-lg shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{func}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* How It Works */}
            {system.howItWorks && (
              <section className="space-y-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    How It Works
                  </h2>
                </div>
                <p className="text-slate-600 italic mb-4">
                  "{system.howItWorks.description}"
                </p>
                {system.howItWorks.keyPoints && (
                  <ol className="space-y-3">
                    {system.howItWorks.keyPoints.map((point, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-bold">
                          {i + 1}
                        </span>
                        <span className="text-slate-700 pt-0.5">{point}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (1/3 width) */}
          <div className="lg:col-span-1 space-y-8">
            {/* Front Image Card (Admin Editable) */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="relative h-48 bg-slate-100">
                {system.front_image ? (
                  <img
                    src={system.front_image}
                    alt="Front"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
                {/* Quick Edit Hint */}
                {isAdmin && token && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    Use Admin Toolbar to edit
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900">System View</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Main visual representation.
                </p>
              </div>
            </div>

            {/* Use Cases */}
            {system.useCases && system.useCases.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" /> Ideal For
                </h3>
                <ul className="space-y-3">
                  {system.useCases.map((useCase, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-600 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Posts (Activity Feed) */}
            <SystemPostsComponent
              name={system.name}
              posts={posts}
              loading={postsLoading}
              error={postsError}
            />

            {/* Testimonials */}
            <TestimonialsComponent
              systemId={public_id}
              systemName={system.name}
            />

            {/* About Harristech Sidebar Widget */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">About Harristech</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We specialize in security and automation across East Africa.
                Robust enterprise solutions that are simple enough for
                homeowners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditSystemModelComponent
        system={system}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDetails}
      />
      <AddPost
        systemId={system.public_id}
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSave={handleSavePost}
      />
      <RequestQuoteComponent
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        systemName={system.name}
        systemsList={systemsList}
      />
    </div>
  );
};

export default ShowSystems;
