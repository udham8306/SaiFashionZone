import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerNavbar from '../../components/admin/navbar';
import sellerSummaryApi from '../../common/seller';
import { toast } from 'react-toastify';

const SellerSignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        shopName: '',
        phoneNumber: '',
        address: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset any previous errors
        console.log(formData);
    
        try {
            const response = await fetch(sellerSummaryApi.signUp.url, {
                method: sellerSummaryApi.signUp.method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials : "include",
                body: JSON.stringify(formData),  // Send formData directly
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to sign up");
            }
    
            const result = await response.json();
            console.log("Signup successful:", result);
    
            if (result.success) {
                toast.success(result.message);
                window.location.reload();
                navigate('/seller/signin'); // Redirect to another page on success, if needed
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        }
    };
    
    return (
        <>
         <SellerNavbar/>
        <div className="flex items-center justify-center h-screen bg-pink-100">
            <div className="bg-pink-50 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-pink-700">Seller Sign Up</h2>

                {error && <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="text"
                        name="shopName"
                        placeholder="Shop Name"
                        value={formData.shopName}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 bg-pink-500 text-white rounded disabled:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
        </>
    );
};

export default SellerSignUp;
