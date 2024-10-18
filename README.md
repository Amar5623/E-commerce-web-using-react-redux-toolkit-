
# **E-Commerce Web Application**  

## 📋 **Overview**

This project is a **full-stack eCommerce application** built using **React**, **Redux Toolkit**, **Vite**, and **TailwindCSS** on the frontend, with a **Node.js/Express** backend and **MongoDB** for database management. It supports **role-based access control** for Admin, Sellers, and Shoppers and allows **product management, user authentication, and order tracking**.

---

## 🚀 **Features**

### 1. **User Roles & Authentication**  
   - **Admin**:  
     - Manage users by adding, deleting, or updating user roles.  
     - Manage orders, including updating the order status.  
     - Access a dedicated Admin Dashboard to monitor platform activity.  
     
   - **Seller**:  
     - Post new products with detailed descriptions, prices, and stock levels.  
     - Edit and manage their product listings via a Seller Dashboard.  
     - Monitor product performance and sales.  

   - **Shopper**:  
     - Browse products and view details on individual product pages.  
     - **Place direct orders** using the "Buy Now" feature for a quick checkout.  
     - Track order history and status on the **Order List page**.  

---

### 2. **Product Management**  
   - Sellers can add products with essential details (name, description, price, quantity).  
   - Product updates are streamlined through an intuitive **Seller Dashboard**.  
   - Products are available for browsing on the **Product List page**, with detailed views accessible via the **Product Detail page**.

---

### 3. **Order Management**  
   - Supports **two types of orders**:
     1. **"Buy Now" Orders**:  
        Shoppers can purchase a product directly from its detail page without using a cart.  
     2. **Cart-based Orders**:  
        (Optional) If extended to cart functionality, multiple products can be added and purchased together.  
   
   - Orders are tracked by their **status**: `pending`, `confirmed`, `shipped`, `delivered`, or `cancelled`.  
   - The **Order List page** displays order history and status for each user.  
   - **Admin** can manage orders by updating their status.  
   - **State persistence** for orders is implemented using **Redux-Persist**, ensuring user session continuity.

---

### 4. **Technology Stack**  

- **Frontend**:  
  - **React** for building the user interface.  
  - **Vite** for fast and optimized development.  
  - **TailwindCSS** for responsive design and styling.  

- **Backend**:  
  - **Node.js/Express** for server-side logic.  
  - **MongoDB** as the database to manage users, products, and orders.  

- **State Management**:  
  - **Redux Toolkit** for efficient state handling.  
  - **Redux Persist** to maintain state across page reloads and sessions.  

- **Security**:  
  - JWT for secure user authentication.  
  - CORS middleware to enable secure API communication.

---

## 📂 **Project Structure**

```
ecommerce-bounty
├── ecommerce-backend              # Backend code
│   ├── .env                       # Environment variables
│   ├── config                     # Database and server configuration
│   ├── controllers                # Controllers for request handling
│   ├── middleware                 # Middleware functions (Auth, CORS, etc.)
│   ├── models                     # Database models (User, Product, Order)
│   ├── routes                     # API routes (User, Product, Order)
│   ├── server.js                  # Backend entry point
├── ecommerce-frontend             # Frontend code
│   ├── public                     # Public assets
│   ├── src                        # React source files
│   │   ├── components             # Reusable UI components (Navbar, etc.)
│   │   ├── pages                  # Application pages (Home, Login, ProductList)
│   │   ├── redux                  # Redux slices and store setup
│   ├── tailwind.config.js         # TailwindCSS configuration
│   ├── vite.config.js             # Vite configuration
```

---

## ⚙️ **Getting Started**

### 0️⃣ **Demo-Video**
[![Watch the video](https://img.youtube.com/vi/AyScSwyfEDY/0.jpg)](https://www.youtube.com/watch?v=AyScSwyfEDY)

### 1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/Amar5623/E-commerce-Web-using-react-redux-toolkit/
```
```bash
cd E-commerce-Web-using-react-redux-toolkit
```

### 2️⃣ **Setup Backend**  
1. Navigate to the backend directory:  
   ```bash
   cd ecommerce-backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:  
   ```bash
   npm start
   ```

### 3️⃣ **Setup Frontend**  
1. Navigate to the frontend directory:  
   ```bash
   cd ../ecommerce-frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the frontend server:  
   ```bash
   npm run dev
   ```

---

## 🛠️ **Troubleshooting**  
- **Backend not running?**  
  Make sure you’ve set up your `.env` correctly and your MongoDB URI is valid.

- **Frontend API calls failing?**  
  Ensure that the backend is running on the correct port and the proxy settings are correctly configured.

---

## ❤️ **Acknowledgments**  
- [React](https://reactjs.org/)  
- [Redux Toolkit](https://redux-toolkit.js.org/)  
- [Vite](https://vitejs.dev/)  
- [TailwindCSS](https://tailwindcss.com/)  

---

## 📧 **Contact**  
For any questions or support, reach out at [amar.tiwari.8355@gmail.com](mailto:amar.tiwari.8355@gmail.com).  

---
