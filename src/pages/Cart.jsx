// import React from 'react'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductSkeleton from "../components/ProductSkeleton";

const Cart = () => {
  const [carts, setCarts] = useState([])
  const [loading, setLoading] = useState(false)

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
      } finally {
        setLoading(false)
      }
    };
    getCart();
  });

  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen px-5 py-20">
        {loading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : carts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 space-x-6">
            {carts.map((cart) => (
              <ProductCard
                key={cart._id}
                imageUrl={cart.imageUrl}
                name={cart.name}
                brand={cart.brand}
                description={cart.description}
                price={cart.price}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
