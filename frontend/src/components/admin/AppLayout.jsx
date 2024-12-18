import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Outlet, useLocation } from "react-router-dom";
import SellerNavbar from "./navbar"; // Assuming you have a navbar for your seller layout

const AppLayout = () => {
    const location = useLocation();
    const [isDefaultTextVisible, setIsDefaultTextVisible] = useState(false);

    // Check if there's a category selected by observing the location pathname
    useEffect(() => {
        // Assuming routes have specific paths, if no category is selected, show default text
        if (location.pathname === "/seller" || location.pathname === "/seller/") {
            setIsDefaultTextVisible(true); // Show default message when no category is selected
        } else {
            setIsDefaultTextVisible(false); // Hide when a category is selected
        }
    }, [location]);

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <div className="fixed top-0 left-0 w-full z-50">
                <SellerNavbar />
            </div>

            {/* Sidebar + Main Content */}
            <div className="flex flex-row mt-16">
                {/* Sidebar */}
                <div className="h-screen">
                    <Sidebar />
                </div>

                {/* Main Content Area */}
                <div className="flex-grow bg-pink-100 overflow-hidden flex items-center justify-center">
                    <div className="w-full text-center">
                        {/* Default text if no category is selected */}
                        {isDefaultTextVisible ? (
                            <div className="p-8">
                                <h2 className="text-6xl font-extrabold text-pink-500">
                                    Welcome to the Dashboard
                                </h2>
                                <p className="mt-4 text-xl text-gray-600">
                                    Manage your products, orders, and more from here.
                                </p>
                            </div>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AppLayout;