// import React from 'react'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductSkeleton from "../components/ProductSkeleton";

const MyOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          toast.error('Token not provided')
        }

        const res = await axios.get('https://novagadget-server.onrender.com/user/myOrder', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data)
      } catch (error) {
        toast.error('Server error')
        return error;
      } finally {
        setLoading(false)
      }
    };
    getOrder();
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
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 space-x-6">
            {orders.map((order) => (
              <ProductCard
                key={order._id}
                imageUrl={order.imageUrl}
                name={order.name}
                brand={order.brand}
                description={order.description}
                price={order.price}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <Footer />
    </>
  );
};

export default MyOrder;
