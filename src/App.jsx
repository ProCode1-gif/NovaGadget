// import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProductCard from "./components/ProductCard";
import Shop from "./pages/Shop";
import Account from "./pages/Account";
import AddProduct from "./pages/AddProduct";
import Admin from "./pages/AdminDashboard";
import Customers from "./pages/Customers";
import MyOrders from "./pages/MyOrders";
import PaymentMethod from "./pages/PaymentMethod";
import ShippingAddress from "./pages/ShippingAddress";
import Cart from "./pages/Cart";
import Victor from "./pages/Victor";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/user/account" element={<Account />} />
        <Route path="/user/cart" element={<Cart />} />
        <Route path="/user/myOrders" element={<MyOrders />} />
        <Route path="/user/shippingAddress" element={<ShippingAddress />} />
        <Route path="/user/paymentMethod" element={<PaymentMethod />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/productcard" element={<ProductCard />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/customersOrder" element={<Orders />} />
        <Route path="/victor" element={<Victor />} />
      </Routes>
    </>
  );
};

export default App;
