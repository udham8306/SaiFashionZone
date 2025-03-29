# 🛍️ Saifashion Zone - E-Commerce Website

Saifashion Zone is a **full-stack e-commerce platform** built using **React, Tailwind CSS, Express.js, and MongoDB**. The platform provides a seamless shopping experience with advanced features such as product listings, secure payments, authentication, and an admin panel for efficient management.

<!-- ## Demo -->
<!-- [saifashionzone.com](https://saifashionzone.com) -->

## ✨ Features

### 🛒 Product Management
- View and search for products with dynamic filtering
- Product categories and featured items
- Add products to cart and wishlist

### 🔐 User Authentication
- JWT-based secure login/signup
- Profile management and order history

### 💳 Payment Processing
- Secure payments via **Stripe & Razorpay**
- View payment history and invoices

### 📦 Order Management
- Add items to the cart and checkout seamlessly
- Track order status and view order history

### 🎛️ Admin Panel
- Manage products, orders, and users
- View sales analytics and reports

## 👨‍💻 Tech Stack

- **Frontend:** [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Authentication:** [JWT (JSON Web Token)](https://jwt.io/)
- **Payments:** [Stripe](https://stripe.com/), [Razorpay](https://razorpay.com/)
- **Image Storage:** [Cloudinary](https://cloudinary.com/)

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```bash
  git clone https://github.com/yourusername/Saifashion-Zone.git
```

### 2️⃣ Navigate to Project Directory
```bash
  cd Saifashion-Zone
```

## 🚀 Backend Setup
### Navigate to the backend folder:
```bash
  cd backend
```
Install dependencies:
```bash
  npm install
```
Create a **.env** file and add the required environment variables:
```bash
MONGODB_URI = 'mongodb+srv://your-db-url'
CLOUDINARY_NAME = ""
CLOUDINARY_API_KEY = ''
CLOUDINARY_SECRET_KEY = ''
JWT_SECRET = ''
RAZORPAY_KEY_ID = ''
RAZORPAY_KEY_SECRET = ''
STRIPE_SECRET_KEY = ''
```
Start the backend server:
```bash
  npm run dev
```

## 🌟 Frontend Setup
### Navigate to the frontend folder:
```bash
  cd frontend
```
Install dependencies:
```bash
  npm install
```
Create a **.env** file for frontend variables:
```bash
VITE_BACKEND_URL = "http://localhost:4000"
VITE_RAZORPAY_KEY_ID = ""
VITE_STRIPE_PUBLISHABLE_KEY = ""
```
Start the frontend server:
```bash
  npm run dev
```

## 🛠️ Admin Panel Setup
### Navigate to the admin folder:
```bash
  cd admin
```
Install dependencies:
```bash
  npm install
```
Create a **.env** file for admin panel:
```bash
VITE_BACKEND_URL = 'http://localhost:4000'
```
Start the admin server:
```bash
  npm run dev
```

## 🏗️ Links for Documentation & Setup

- **[MongoDB](https://www.mongodb.com/)** - NoSQL database setup
- **[Stripe Docs](https://stripe.com/docs)** - Payment gateway setup
- **[Razorpay Docs](https://razorpay.com/docs/)** - Payment processing
- **[Cloudinary Docs](https://cloudinary.com/documentation)** - Image storage & management
- **[Axios](https://axios-http.com/docs/intro)** - HTTP requests

🚀 *Saifashion Zone is a scalable and user-friendly e-commerce platform. Contributions are welcome!*
## ScreenShots
### HomePage
![Image](https://github.com/user-attachments/assets/6ff33a92-8ddd-41fb-b70a-c21997b20d4b)
### Login Page
![Image](https://github.com/user-attachments/assets/f34dec8f-fd47-4e4b-bd6b-5e5988a1a21b)
### Seller Homepage
![Image](https://github.com/user-attachments/assets/683ca073-2a50-4205-b7af-593ebc733999)
### Seller Login

## Appendix

This project was developed independently by [@udham8306](https://www.github.com/udham8306).
