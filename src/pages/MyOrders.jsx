// import React from 'react'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyOrder = () => {
  const [order, setOrder] = useState([])
  
  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          toast.error('Token not provided')
        }

        const res = await axios.get('http://localhost:2574/user/myOrder', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(res.data)
      } catch (error) {
        toast.error('Server error')
        return error;
      }
    };
    getOrder();
  }, []);

  return (
    <>
      <Navbar />
      <div className="md:flex flex-2">
        {order.map((orders) => (
          <ProductCard key={orders.id} product={orders} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default MyOrder;
