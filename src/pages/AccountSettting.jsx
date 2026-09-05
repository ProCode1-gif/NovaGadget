// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

        const res = await axios.get("http://localhost:2574/user/profile", {
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
      "http://localhost:2574/user/profile",
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
    <div className="bg-white/60 min-h-screen py-20 px-40">
      <h2 className="text-4xl font-bold text-center">Account Settings</h2>
      <div className="flex flex-col space-y-4 mt-20">
        <input className="border border-gray-500 p-3 rounded-md" value={user?.fullName} />
        <input className="border border-gray-500 p-3 rounded-md" value={user?.password} />
        <input className="border border-gray-500 p-3 rounded-md" value={user?.email} />
        <input className="border border-gray-500 p-3 rounded-md" value={user?.phoneNumber} />
        <input className="border border-gray-500 p-3 rounded-md" value={user?.role} />
        <button className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600" onClick={updateUser}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AccountSettting;
