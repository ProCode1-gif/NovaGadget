// import React from 'react'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const [carts, setCarts] = useState([])
  useEffect(() => {
    const getCart = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          toast.error('Token not provided')
        }
        const url = "http://localhost:2574/user/myCart";
        const res = await axios.get(url);
        setCarts(res.data)
      } catch (error) {
        return error;
      }
    };
    getCart();
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:flex flex-2">
        {carts.map((cart) => (
          <ProductCard key={cart.id}
          imageUrl={cart.imageUrl} 
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
