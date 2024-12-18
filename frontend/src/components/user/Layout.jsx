import React from "react";
import { Outlet } from "react-router-dom"; // For nested routes
import ProfessionalNavbar from "./navbar/navbar"; // Import Navbar
import Footer from "./footer/footer";
import PromoBanner from "./navbar/PromoBanner";
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}

      <header className="fixed top-0 left-0 w-full z-50">
        <PromoBanner></PromoBanner>
        <ProfessionalNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20 bg-gray-50">
        {/* Outlet renders the child routes */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
