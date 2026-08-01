// import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PaymentMethod = () => {
  const [payment, setPayment] = useState([])
  useEffect(() => {
    const payment = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          toast.error('Token not provided')
        }
        
        const url = 'http://localhost:2574/user/payment'
        const res = axios.get(url)
        setPayment(res.data)
      } catch (error) {
        toast.error('Server error')
        return error
      }
    };
    payment()
  }, [payment])

  return (
    <div>PaymentMethod</div>
  )
}

export default PaymentMethod