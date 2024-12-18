import React, { useState, useEffect } from 'react';
import SellerNavbar from '../../components/admin/navbar';
import { useSellerAuth } from '../../context/SellerAuthContext';

const SellerProfile = () => {
  const { sellerData } = useSellerAuth();

  const [isEditing, setIsEditing] = useState({});
  const [formValues, setFormValues] = useState({
    name: 'N/A',
    email: 'N/A',
    shopName: 'N/A',
    phoneNumber: 'N/A',
    address: 'N/A',
    profilePic: 'https://cdn-icons-png.flaticon.com/512/4515/4515443.png',
  });

  const [profilePicFile, setProfilePicFile] = useState(null);

  // Update formValues when sellerData changes
  useEffect(() => {
    if (sellerData) {
      setFormValues({
        name: sellerData.name || 'N/A',
        email: sellerData.email || 'N/A',
        shopName: sellerData.shopName || 'N/A',
        phoneNumber: sellerData.phoneNumber || 'N/A',
        address: sellerData.address || 'N/A',
        profilePic: sellerData.profilePic || 'https://cdn-icons-png.flaticon.com/512/4515/4515443.png',
      });
    }
  }, [sellerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const saveChanges = (field) => {
    console.log(`Saving ${field}:`, formValues[field]);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setFormValues((prev) => ({
        ...prev,
        profilePic: URL.createObjectURL(file),
      }));
    }
  };

  const handleProfilePicSave = () => {
    // Logic to upload the profile picture file (profilePicFile) to the server
    if (profilePicFile) {
      console.log('Uploading profile picture:', profilePicFile);
      // Implement your API call here to upload the profilePicFile
    }
    setIsEditing((prev) => ({ ...prev, profilePic: false }));
  };

  return (
    <>
      <SellerNavbar />
      <div className="container mx-auto p-6 max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{sellerData.name}</h2>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <label htmlFor="profilePicInput">
              <img
                src={formValues.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-pink-500 cursor-pointer"
                title="Click to change profile picture"
              />
            </label>
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
            />
          </div>

          {isEditing.profilePic && (
            <div className="mt-4 text-center">
              <button
                className="text-green-500 hover:text-green-700 mr-4"
                onClick={handleProfilePicSave}
              >
                Save
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => setIsEditing((prev) => ({ ...prev, profilePic: false }))}
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mt-6 space-y-4">
            {['name', 'email', 'shopName', 'phoneNumber', 'address'].map((field) => (
              <div key={field} className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 capitalize">{field}</h3>
                  {isEditing[field] ? (
                    <input
                      type="text"
                      name={field}
                      value={formValues[field]}
                      onChange={handleInputChange}
                      className="p-2 border rounded focus:ring-2 focus:ring-pink-500 w-full"
                    />
                  ) : (
                    <p className="text-gray-800">{formValues[field]}</p>
                  )}
                </div>
                <div>
                  {isEditing[field] ? (
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => saveChanges(field)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-pink-500 hover:text-pink-700"
                      onClick={() => toggleEdit(field)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerProfile;
