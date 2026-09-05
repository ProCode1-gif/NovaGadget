// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

const ShippingAddress = () => {
  const [address, setAddress] = useState([])
  useEffect(() => {
    const address = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          toast.error('Token not provided')
        }
        
        const res = await axios.get("http://localhost:2574/user/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setAddress(res.data)
      } catch (error) {
        toast.error('Server error')
        return error
      }
    };
    address()
  }, [])

  const updateAddress = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await axios.put(
        "http://localhost:2574/user/profile",
        address,
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      toast.success("Profile updated");
  
      setAddress(res.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-white/60 min-h-screen py-20 px-40">
      <h2 className="text-4xl font-bold text-center">Shipping Address</h2>
      <div className="flex flex-col space-y-4 mt-20">
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.phoneNumber}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.country}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.state}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.city}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.street}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.portalCode}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.landmark}
        />
        <input
          className="border border-gray-500 p-3 rounded-md"
          value={address?.addressType}
        />
        <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600" onClick={updateAddress}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ShippingAddress
