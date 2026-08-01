// import React from 'react'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([])
  useEffect(() => {
    const getCart = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          toast.error('Token not provided')
        }
        const url = "http://localhost:2574/user/myCart";
        const res = await axios.get(url);
        setCart(res.data)
      } catch (error) {
        return error;
      }
    };
    getCart();
  }, [cart]);

  return (
    <>
      <Navbar />
      <div className="md:flex flex-2">
        {cart.map((carts) => (
          <ProductCard key={carts.id} product={carts} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
