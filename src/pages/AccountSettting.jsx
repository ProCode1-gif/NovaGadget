// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AccountSettting = () => {
  const { user, setUser } = useState();

  useEffect(() => {
    const setAcc = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }

        const url = "http://localhost:2574/user/:username";
        const res = await axios.get(url);
        setUser(res.data);
      } catch (error) {
        return error;
      }
    };
    setAcc();
  }, [user]);

  return (
    <div></div>
  )
};

export default AccountSettting;
