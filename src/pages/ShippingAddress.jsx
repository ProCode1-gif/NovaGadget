// import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShippingAddress = () => {
  const [address, setAddress] = useState({});
  const [addressUpdate, setAddressUpdate] = useState({});
  const [addAddress, setAddAddress] = useState({});

  useEffect(() => {
    const address = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }

        const [getAddress, updateAddress, addAddress] = await Promise.all([
          axios.get("https://novagadget-server.onrender.com/user/address"),
          axios.put("https://novagadget-server.onrender.com/user/address"),
          axios.post("https://novagadget-server.onrender.com/user/addAddress"),
        ]);
        setAddress(getAddress.data.address);
        setAddressUpdate(updateAddress.data.addressUpdate);
        setAddAddress(addAddress.data.addAddress);
      } catch (error) {
        toast.error("Server error");
        return error;
      }
    };
    address();
  });

  return (
    <div className="bg-black min-h-screen py-20 px-40 text-white">
      <h2 className="text-4xl font-bold text-center">Shipping Address</h2>
      <div className="flex flex-col space-y-4 mt-20">
        {address.length === 0 ? (
          <p className="text-center">No shipping address found.</p>
        ) : (
          <div>
            <p>Phone Number: <input type="text" defaultValue={address?.phoneNumber} /> </p>
            <p>country: <input type="text" defaultValue={address?.country} /> </p>
            <p>state: <input type="text" defaultValue={address?.state} /> </p>
            <p>city: <input type="text" defaultValue={address?.city} /> </p>
            <p>street: <input type="text" defaultValue={address?.street} /> </p>
            <p>portalCode: <input type="text" defaultValue={address?.portalCode} /> </p>
            <p>landmark: <input type="text" defaultValue={address?.landmark} /> </p>
            <p>addressType: <input type="text" defaultValue={address?.addressType} /> </p>
            <div className="flex space-x-4 mt-6">
            <button
            type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              onClick={addressUpdate}
            >
              Save Changes
            </button>
            <button
            type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              onClick={addAddress}
            >
              Add New Address
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
