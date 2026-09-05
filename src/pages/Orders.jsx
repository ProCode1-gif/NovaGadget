// import React from 'react'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Orders = () => {
  const [order, setOrder] = useState([])
  useEffect(() => {
    const getOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Token not provided')
      }

      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "admin") {
        toast.error("You are not authorized to access this page");
      }
      
        const url = "http://localhost:2574/admin/customersOrder";
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(res.data)
      } catch (error) {
        return error;
      }
    };
    getOrder();
  }, [order]);

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

export default Orders;
