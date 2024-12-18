import React from 'react';
import SellerNavbar from '../../components/admin/navbar'; // Make sure to adjust the path if needed
import { Link } from 'react-router-dom';

const SellerHomePage = () => {
    const imageUrl = 'https://img.freepik.com/free-photo/shopping-bag-cart_23-2148879372.jpg?semt=ais_hybrid'; // Image URL

    return (
        <div>
            <SellerNavbar />

            {/* Full screen image */}
            <div className="relative">
                <img
                    src={imageUrl}
                    alt="Shopping"
                    className="w-full h-screen object-cover"
                />
                {/* Text on the left side of the image */}
                <div className="absolute left-10 top-1/3 transform -translate-y-1/2 text-pink-500 font-bold text-6xl">
                    <h1>Sell Quality Products</h1>
                    <h1>and Earn Profit</h1>
                    {/* Description below the heading */}
                    <p className="text-white text-lg mt-4 max-w-md">
                        Join our platform to sell the best quality products. 
                        Reach a wider audience and increase your sales. 
                        Start your journey with us today and watch your business grow.
                    </p>
                </div>
            </div>

            {/* Other content can go here */}
        </div>
    );
};

export default SellerHomePage;
