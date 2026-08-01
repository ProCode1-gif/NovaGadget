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
        
        const url = 'http://localhost:2574/user/address'
        const res = axios.get(url)
        setAddress(res.data)
      } catch (error) {
        toast.error('Server error')
        return error
      }
    };
    address()
  }, [address])
  
  return (
    <div>ShippingAddress</div>
  )
}

export default ShippingAddress
