import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Package, ShoppingBag, MessageSquare, Users, Calendar, Menu, LayoutDashboard } from 'lucide-react';
import ProductUpload from './ProductUpload';
import sellerSummaryApi from '../../common/seller';

import { useSellerAuth } from '../../context/SellerAuthContext';
import { toast } from 'react-toastify';
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const location = useLocation();
    const {sellerData} = useSellerAuth();
   
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard />, path: '/seller/dashboard' },
        { name: 'Products', icon: <Package />, path: '/seller/products' },
        { name: 'Orders', icon: <ShoppingBag />, path: '/seller/orders' },
        { name: 'Complaints', icon: <MessageSquare />, path: '/seller/complaints' },
        { name: 'Customers', icon: <Users />, path: '/seller/customers' },
        { name: 'Calendar', icon: <Calendar />, path: '/seller/calendar' },
    ];

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsOpen(!isOpen);
        }
    };

    const handleProductUpload = async (productData) => {
        try {
            // Send the product data to the server
            const response = await fetch(sellerSummaryApi.uploadProduct.url, {
                method: sellerSummaryApi.uploadProduct.method,
                credentials : "include",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
    
            // Check if the response is successful
            if (response.ok) {
                const responseData = await response.json(); // Assuming the response is JSON
                console.log('Product added successfully:', responseData);
                toast.success(responseData.message)
                // Optionally display a success message to the user
            } else {
                // If the response isn't ok, throw an error with the status text
                const errorData = await response.json();
                console.error('Error adding product:', errorData.message || 'Unknown error');
                // Optionally display an error message to the user
            }
        } catch (error) {
            // Catch any errors during the fetch or in the process
            console.error('Error adding product:', error);
            // Optionally display a generic error message to the user
        }
    };
    
    return (
        <>
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 p-2 rounded-lg hover:bg-pink-200 lg:hidden z-50"
            >
                <Menu size={24} />
            </button>

            {showDialog && (
                <ProductUpload
                    onClose={() => setShowDialog(false)}
                    onSubmit={handleProductUpload}
                />
            )}

            <div className={`fixed left-0 top-16 h-[92%] bg-pink-50 shadow-lg transition-all duration-300 flex flex-col
                ${isOpen ? 'w-64' : 'w-20'}`}
            >
                <div className="flex items-center p-4">
                    {isOpen && (
                        <div className="text-2xl font-bold text-gray-800">
                            {sellerData?.name}
                        </div>
                    )}
                </div>

                {/* Scrollable Menu Items */}
                <div className="flex-grow overflow-y-auto">
                    <ul className="space-y-2 p-4 w-full">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-2 rounded-lg transition-colors
                                        ${location.pathname === item.path
                                            ? 'bg-pink-200 text-pink-800'
                                            : 'text-gray-700 hover:bg-pink-100'}
                                        ${isOpen ? 'justify-start space-x-4' : 'justify-center'}`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {isOpen && <span>{item.name}</span>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-auto p-4">
                    <div className={`${isOpen ? 'block' : 'hidden'}`}>
                        <button
                            onClick={() => setShowDialog(true)}
                            className="w-full bg-pink-300 text-white py-2 rounded hover:bg-pink-400 mb-2"
                        >
                            + Add Product
                        </button>
                        <Link
                            to="/"
                            className="w-full flex items-center justify-center bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        >
                            Go to Website
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
