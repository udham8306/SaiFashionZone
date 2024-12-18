import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../../helpers/uploadImage";

const ProductUpload = ({ onClose, onSubmit }) => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    sellingPrice: "",
    imgFiles: [],
    imagePreviews: [],
    category: "",
    productId: "",
    inStockValue: 0,
    soldStockValue: 0,
    description: "",
    specifications: [],
    sizes: [],
  });
  const [currentSize, setCurrentSize] = useState("");

  const addSize = () => {
    if (currentSize.trim()) {
      setProductData({
        ...productData,
        sizes: [...productData.sizes, currentSize.trim()],
      });
      setCurrentSize(""); // Clear the input field
    } else {
      alert("Size cannot be empty.");
    }
  };

  const removeSize = (index) => {
    const updatedSizes = [...productData.sizes];
    updatedSizes.splice(index, 1);
    setProductData({ ...productData, sizes: updatedSizes });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const newFiles = [...productData.imgFiles, ...files]; // Append new files to existing files
    const newPreviews = [
      ...productData.imagePreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]; // Generate and append new previews

    setProductData({
      ...productData,
      imgFiles: newFiles,
      imagePreviews: newPreviews,
    });
  };

  const removeImage = (index) => {
    const updatedFiles = [...productData.imgFiles];
    const updatedPreviews = [...productData.imagePreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setProductData({
      ...productData,
      imgFiles: updatedFiles,
      imagePreviews: updatedPreviews,
    });
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload-input").click();
  };

  const [currentSpecification, setCurrentSpecification] = useState({
    name: "",
    properties: [{ key: "", value: "" }],
  });

  const generateProductId = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    setProductData({ ...productData, productId: randomId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSpecificationNameChange = (e) => {
    setCurrentSpecification({ ...currentSpecification, name: e.target.value });
  };

  const handlePropertyChange = (index, field, value) => {
    const updatedProperties = [...currentSpecification.properties];
    updatedProperties[index][field] = value;
    setCurrentSpecification({
      ...currentSpecification,
      properties: updatedProperties,
    });
  };

  const addPropertyField = () => {
    setCurrentSpecification({
      ...currentSpecification,
      properties: [...currentSpecification.properties, { key: "", value: "" }],
    });
  };

  const removePropertyField = (index) => {
    const updatedProperties = [...currentSpecification.properties];
    updatedProperties.splice(index, 1);
    setCurrentSpecification({
      ...currentSpecification,
      properties: updatedProperties,
    });
  };

  const addSpecification = () => {
    if (
      currentSpecification.name &&
      currentSpecification.properties.length > 0
    ) {
      setProductData({
        ...productData,
        specifications: [...productData.specifications, currentSpecification],
      });
      setCurrentSpecification({
        name: "",
        properties: [{ key: "", value: "" }],
      });
    } else {
      alert(
        "Please fill in the specification name and at least one key-value pair."
      );
    }
  };

  const removeSpecification = (index) => {
    const updatedSpecifications = [...productData.specifications];
    updatedSpecifications.splice(index, 1);
    setProductData({ ...productData, specifications: updatedSpecifications });
  };

  const handleSubmit = async () => {
    console.log(productData);
    try {
      // Upload images to Cloudinary one by one using uploadImage function
      const uploadPromises = productData.imgFiles.map((file) =>
        uploadImage(file)
      ); // Use uploadImage utility directly

      const responses = await Promise.all(uploadPromises);

      // Extract the secure URLs from the Cloudinary response
      const imageUrls = responses.map((response) => response.secure_url); // Corrected to access `secure_url` directly

      // Add the image URLs to the product data
      const updatedProductData = {
        ...productData,
        imgFiles: imageUrls, // Replace local files with uploaded URLs
      };

      console.log("Product data with Cloudinary URLs:", updatedProductData);

      // Call onSubmit with the updated product data
      onSubmit(updatedProductData);

      // Reset the form
      setProductData({
        name: "",
        price: "",
        sellingPrice: "",
        imgFiles: [],
        category: "",
        productId: "",
        inStockValue: 0,
        soldStockValue: 0,
        description: "",
        specifications: [],
        sizes: [],
      });

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[700px] relative max-h-[90vh] overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <div className="overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              value={productData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="sellingPrice"
              placeholder="Enter selling price"
              value={productData.sellingPrice}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <select
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Saree">Saree</option>
              <option value="Boys wear">Boys wear</option>
              <option value="Girls wear">Girls wear</option>
              <option value="Ganzy clothes">Ganzy clothes</option>
              <option value="Sleep wear">Sleep wear</option>
              <option value="Summer wear">Summer wear</option>
            </select>

            <div>
              <label className="block mb-1 text-sm font-medium">
                In-stock Value:
              </label>
              <input
                type="number"
                name="inStockValue"
                placeholder="Enter in-stock value"
                value={productData.inStockValue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Sold Stock Value:
              </label>
              <input
                type="number"
                name="soldStockValue"
                placeholder="Enter sold stock value"
                value={productData.soldStockValue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Upload Product Images:
              </label>
              <div
                className="cursor-pointer flex items-center space-x-4"
                onClick={handleUploadClick}
              >
                <span className="text-5xl ml-20 mt-3 text-gray-700">
                  <MdCloudUpload />
                </span>
                <span className="text-lg font-medium mt-3 text-gray-500">
                  Click to Upload
                </span>
              </div>
              {/* File input (hidden) */}
              <input
                type="file"
                id="file-upload-input"
                name="imgFiles"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="p-2 border rounded hidden"
              />
              {/* Display uploaded images in a horizontal row */}

              <div className="mt-4 flex overflow-x-auto space-x-2">
                {productData.imagePreviews &&
                  productData.imagePreviews.map((imgSrc, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imgSrc}
                        alt={`preview-${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        X
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex col-span-2">
              <input
                type="text"
                name="productId"
                placeholder="Generated product ID"
                value={productData.productId}
                readOnly
                className="w-2/3 p-2 border rounded-l"
              />
              <button
                onClick={generateProductId}
                className="w-1/3 bg-pink-500 text-white p-2 rounded-r"
              >
                Generate
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Add Sizes</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter size"
                  value={currentSize}
                  onChange={(e) => setCurrentSize(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={addSize}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add
                </button>
              </div>
              <ul className="mt-3">
                {productData.sizes.map((size, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{size}</span>
                    <button
                      onClick={() => removeSize(index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2">
              <textarea
                name="description"
                placeholder="Enter product description"
                value={productData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
          </div>

          {/* Specification Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Add Specifications</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Specification Name"
                value={currentSpecification.name}
                onChange={handleSpecificationNameChange}
                className="w-full mb-2 p-2 border rounded"
              />
              {currentSpecification.properties.map((property, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Key"
                    value={property.key}
                    onChange={(e) =>
                      handlePropertyChange(index, "key", e.target.value)
                    }
                    className="flex-1 p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={property.value}
                    onChange={(e) =>
                      handlePropertyChange(index, "value", e.target.value)
                    }
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={() => removePropertyField(index)}
                    className="px-2 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addPropertyField}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add Key-Value Pair
              </button>
            </div>
            <button
              onClick={addSpecification}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Add Specification
            </button>
            <ul className="mt-3">
              {productData.specifications.map((spec, index) => (
                <li key={index} className="mb-2">
                  <h4 className="font-semibold">{spec.name}</h4>
                  <ul>
                    {spec.properties.map((prop, i) => (
                      <li key={i} className="text-sm">
                        {prop.key}: {prop.value}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => removeSpecification(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove Specification
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;
