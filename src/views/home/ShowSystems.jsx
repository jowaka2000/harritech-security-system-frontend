import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Loader2,
  Pencil,
  Image as ImageIcon,
  Shield,
  ArrowRight,
  CheckCircle2,
  Trash2,
  MessageCircle,
  DollarSign,
  ImageOff,
  ShoppingCart,
  X,
  Upload,
  Cpu,
} from "lucide-react";
import axiosClient from "../../axiosClient";
import EditSystemModelComponent from "../../components/show/EditSystemModelComponent";
import TestimonialsComponent from "../../components/show/TestimonialsComponent";
import { useAuthContextProvider } from "../../contexts/AuthContextProvider";
import RequestQuoteComponent from "../../components/show/RequestQuoteComponent";
import { motion } from "framer-motion";
import { useShowSystemHook } from "../../hooks/useShowSystemHook";

const ShowSystems = () => {
  const { public_url } = useParams();
  const { token, isAdmin } = useAuthContextProvider();

  const {
    // System
    setLoading,
    setError,
    setTopImage,
    setUploading,
    setIsModalOpen,
    system,
    setSystem,
    isModalOpen,
    isRequestModalOpen,
    setIsRequestModalOpen,
    loading,
    topImage,
    uploading,

    // Products
    products,
    productsLoading,
    productsError,
    fetchProducts,
    createProduct,
    deleteProduct,
    isProductLoading,

    // Product Form
    isProductModalOpen,
    setIsProductModalOpen,
    productForm,
    setProductForm,
    imagePreview,
    setImagePreview,
    setImageFile,
    resetProductForm,
  } = useShowSystemHook();

  const systemsList = [
    "IP Cameras Installation",
    "DVRs and NVRs",
    "Electric Fence",
    "Automatic Gates",
    "Biometric Access",
    "Intruder Alarms",
    "Fire Alarms",
  ];

  // --- Fetch System Data ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);
    axiosClient
      .get(`/systems/${public_url}`)
      .then((res) => {
        setSystem(res.data);
        setTopImage(res.data.top_image);

        // Once system is loaded, fetch its products
        if (res.data.id) {
          fetchProducts(res.data.id);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load system.");
      })
      .finally(() => setLoading(false));

    // eslint-disable-next-line
  }, [public_url]);

  // --- Handlers ---

  // Generic Upload Helper (System Images)
  const handleUpload = (file, type) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      alert("JPG, PNG, or WEBP only.");
      return;
    }

    const formData = new FormData();
    let formKey = type.replace("-", "_");
    if (type === "front-image") formKey = "front-image";
    if (type === "intermediate-image") formKey = "intermediate-image";

    formData.append(formKey, file);
    setUploading(true);

    axiosClient
      .post(`/systems/${public_url}/upload-${type}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data }) => {
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

  const handleSaveDetails = (updatedData) => {
    axiosClient
      .put(`/systems/update/${public_url}`, updatedData)
      .then(({ data }) => {
        setSystem(data.system);
        setIsModalOpen(false);
      })
      .catch(() => alert("Failed to update details."));
  };

  // --- Product Form Handlers ---
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file); // Store actual file for API
    }
  };

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

  if (!system) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
        <span className="text-xl font-bold mb-2">Oops!</span>
        <span>{"System not found."}</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* --- HERO SECTION --- */}
      <section className="bg-slate-900 text-white pt-12 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
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

            <div className="md:w-1/2 w-full relative group">
              <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img
                  src={topImage || "/placeholder.png"}
                  alt={system.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
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
                          handleUpload(file, "top-image");
                          e.target.value = "";
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
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 text-sm font-medium transition"
                >
                  <Pencil size={16} /> Edit Details
                </button>

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

                <button
                  onClick={() => setIsProductModalOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-md hover:bg-green-100 text-sm font-medium transition"
                >
                  <ShoppingCart size={16} /> Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">
                Overview
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p className="text-lg">{system.fullDescription}</p>
              </div>
            </section>

            {/* Products Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-l-4 border-blue-600 pl-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  Available Products
                </h2>
                {productsLoading && (
                  <Loader2 className="animate-spin text-blue-600 w-6 h-6" />
                )}
              </div>

              {productsError ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                  {productsError}
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                  <ShoppingCart className="w-12 h-12 text-slate-300 mb-3" />
                  <p className="text-slate-500 font-medium">
                    No products listed yet.
                  </p>
                </div>
              ) : (
                // Grid adjusted to 3 columns on large screens, reduced padding
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => {
                    const productImage =
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : null;

                    return (
                      <motion.div
                        key={product.public_id || product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative"
                      >
                        {/* Admin Actions */}
                        {isAdmin && token && (
                          <div className="absolute top-2 right-2 z-10 flex gap-2">
                            <button
                              onClick={() =>
                                console.log(
                                  "Edit logic here",
                                  product.public_id,
                                )
                              }
                              className="p-1.5 bg-white/90 text-blue-600 rounded-full shadow-sm hover:bg-blue-50 hover:scale-110 transition"
                              title="Edit Product"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => deleteProduct(product.public_id)}
                              className="p-1.5 bg-white/90 text-red-600 rounded-full shadow-sm hover:bg-red-50 hover:scale-110 transition"
                              title="Delete Product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}

                        {/* Image */}
                        <div className="relative w-full h-48 bg-slate-100 overflow-hidden rounded-t-2xl">
                          {productImage ? (
                            <img
                              src={productImage}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center w-full h-full text-slate-300">
                              <ImageOff className="w-8 h-8 mb-2" />
                              <span className="text-xs font-medium">
                                No Image
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                        </div>

                        {/* Content - Reduced Padding from p-5 to p-3 */}
                        <div className="p-3 flex flex-col flex-1">
                          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>

                          <p className="text-sm text-slate-500 line-clamp-3 mb-3 flex-1 leading-relaxed">
                            {product.description || "No description available."}
                          </p>

                          {/* Price */}
                          <div className="flex items-center gap-1 mb-3 text-blue-700 font-bold text-lg">
                            <DollarSign className="w-4 h-4" />
                            <span>{product.price}</span>
                          </div>

                          {/* Actions - Stacked on large screens, side-by-side on mobile */}
                          <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 mt-auto">
                            <button
                              onClick={() => setIsRequestModalOpen(true)}
                              className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                            >
                              Request Quote
                            </button>
                            <a
                              href={`https://wa.me/254706074540?text=Hello, I am interested in ${product.name}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-center gap-1 px-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                            >
                              <MessageCircle className="w-4 h-4" />
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Key Benefits */}
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
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="lg:col-span-1 space-y-8">
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

            <TestimonialsComponent
              systemId={public_url}
              systemName={system.name}
            />

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

      {/* --- MODALS --- */}

      {/* Edit System Details Modal (Existing) */}
      <EditSystemModelComponent
        system={system}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDetails}
      />

      {/* Request Quote Modal (Existing) */}
      <RequestQuoteComponent
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        systemName={system.name}
        systemsList={systemsList}
      />

      {/* NEW: Add Product Modal - Fixed Layout with Scroll */}
      {isProductModalOpen && (
     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col"
  >
    {/* Header - Reduced Padding */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-shrink-0">
      <h3 className="text-lg font-bold text-slate-900">Add New Product</h3>
      <button
        onClick={() => {
          setIsProductModalOpen(false);
          resetProductForm();
        }}
        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
      >
        <X size={18} />
      </button>
    </div>

    {/* Form */}
    <form
      onSubmit={createProduct}
      className="flex flex-col flex-1 overflow-hidden"
    >
      {/* Scrollable Area - Reduced Padding and Gaps */}
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        
        {/* Image Upload - Reduced Height */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Product Image
          </label>
          <div className="relative w-full h-32 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group overflow-hidden">
            <input
              type="file"
              accept="image/*"
              onChange={handleProductImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 group-hover:text-blue-500">
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Click to upload</span>
              </div>
            )}
          </div>
        </div>

        {/* Name - Reduced Input Padding */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={productForm.name}
            onChange={handleProductInputChange}
            className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. Hikvision Dome Camera"
          />
        </div>

        {/* Device - Reduced Input Padding & Icon Positioning */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Device Type
          </label>
          <div className="relative">
            <Cpu className="absolute left-3 top-2 text-slate-500 w-4 h-4" />
            <input
              type="text"
              name="device"
              required
              value={productForm.device}
              onChange={handleProductInputChange}
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. Camera, NVR, Sensor"
            />
          </div>
        </div>

        {/* Price - Reduced Input Padding & Icon Positioning */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-500 text-xs">KES</span>
            <input
              type="text"
              name="price"
              required
              value={productForm.price}
              onChange={handleProductInputChange}
              className="w-full pl-10 pr-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="e.g. 4,500"
            />
          </div>
        </div>

        {/* Description - Reduced Rows */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            required
            rows="2"
            value={productForm.description}
            onChange={handleProductInputChange}
            className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
            placeholder="Brief description..."
          ></textarea>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 p-4 border-t border-slate-100 bg-slate-50 flex-shrink-0">
        <button
          type="button"
          onClick={() => {
            setIsProductModalOpen(false);
            resetProductForm();
          }}
          className="px-4 py-1.5 text-sm text-slate-600 hover:bg-slate-200 rounded-lg font-medium transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isProductLoading}
          className="flex items-center gap-2 px-5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isProductLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Product"
          )}
        </button>
      </div>
    </form>
  </motion.div>
</div>
      )}
    </div>
  );
};

export default ShowSystems;
