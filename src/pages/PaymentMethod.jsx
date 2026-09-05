// import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PaymentMethod = () => {
  const [payment, setPayment] = useState([]);
  useEffect(() => {
    const getPaymentMethod = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
          return;
        }

        const res = await axios.get("http://localhost:2574/user/payment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPayment(res.data);
      } catch (error) {
        toast.error("Server error");
        return error;
      }
    };
    getPaymentMethod();
  }, []);

  const updateUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "http://localhost:2574/user/profile",
      payment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Profile updated");

    setPayment(res.data.user);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

  return (
    <div className="bg-white/60 min-h-screen py-20 px-40">
      <h2 className="text-4xl font-bold text-center">Payment Methods</h2>
      <div className="flex flex-col space-y-4 mt-20">
        
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.type}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.cardholderName}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.cardNumber}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.cardNumber}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.expiryMonth}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.expiryYear}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.bankName}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.accountNumber}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={payment?.cvv}
        />
        <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600" onClick={updateUser}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
