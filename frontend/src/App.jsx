import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/user/productdetails";
import About from "./pages/user/about";
import Contact from "./pages/user/contact";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
import HomePage from "./pages/user/homepage";
import ShoppingCartPage from "./pages/user/cart";
import Shop from "./pages/user/shop";
import OccasionsPage from "./pages/user/occasionspage";
import Checkout from "./pages/user/checkout";
import Product from "./pages/seller/product";
import Complaints from "./pages/seller/complaints";
import Orders from "./pages/seller/order";
import Customers from "./pages/seller/customer";
import CalendarPage from "./pages/seller/calendar";
import NotFoundPage from "./pages/user/notfound";
import { AuthProvider } from "./context/AuthContext";
import Admin from "./pages/user/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAccount from "./pages/user/myAccount";
import MyOrders from "./pages/user/myOrders";
import SellerSignUp from "./pages/seller/signUp";
import SellerSignIn from "./pages/seller/login";
import SellerProfile from "./pages/seller/SellerProfile";
import SellerHomePage from "./pages/seller/HomePage";
import { SellerAuthProvider } from "./context/SellerAuthContext";
import AppLayout from "./components/admin/AppLayout";
import Dashboard from "./pages/seller/dashboard";
import Layout from "./components/user/Layout";

function App() {
  return (
    <SellerAuthProvider>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            {/* Main routes with Layout as the parent */}
            <Route path="/" element={<Layout />}>
              {/* Set HomePage as the default route */}
              <Route index element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="Homepage" element={<HomePage />} />
              <Route path="shop" element={<Shop />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="myaccount" element={<MyAccount />} />
              <Route path="myorders" element={<MyOrders />} />
              <Route path="occasionspage" element={<OccasionsPage />} />
              <Route path="cart" element={<ShoppingCartPage />} />
              <Route path="product/:productId" element={<ProductDetail />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>

            {/* Seller Routes */}
            <Route path="seller/signup" element={<SellerSignUp />} />
            <Route path="seller/signin" element={<SellerSignIn />} />
            <Route path="seller/profile" element={<SellerProfile />} />
            <Route path="seller/homepage" element={<SellerHomePage />} />

            {/* Seller Routes with AppLayout as parent */}
            <Route path="seller" element={<AppLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Product />} />
              <Route path="complaints" element={<Complaints />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="calendar" element={<CalendarPage />} />
            </Route>

            {/* Fallback route for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SellerAuthProvider>
  );
}

export default App;
