// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AccountSettting = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
          return;
        }

        const res = await axios.get("https://novagadget-server.onrender.com/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        return error;
      }
    };
    getUser();
  }, []);

  const updateUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "https://novagadget-server.onrender.com/user/profile",
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Profile updated");

    setUser(res.data.user);
  } catch (error) {
    toast.error(error.response?.data?.message);
  }
};

  return (
    <>
  <Navbar />
    <div className="bg-black min-h-screen py-20 px-5">
      <h2 className="text-4xl font-bold text-center text-white">Account Settings</h2>
      <div className="flex flex-col space-y-6 mt-20 bg-white p-5">
        <p>Full Name: <input className="border border-gray-500 p-3 rounded-md" value={user?.fullName} /></p>
        <p>Password: <input className="border border-gray-500 p-3 rounded-md" value={user?.password} /></p>
        <p>Email: <input className="border border-gray-500 p-3 rounded-md" value={user?.email} /></p>
        <p>Phone Number: <input className="border border-gray-500 p-3 rounded-md" value={user?.phoneNumber} /></p>
        <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600" onClick={updateUser}>
          Save Changes
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AccountSettting;
