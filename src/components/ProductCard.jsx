// import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = (image, description, price, name, features) => {
  const navigate = useNavigate()
  const addToCart = async (product) => {
    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('Token not provided')
      navigate('/signup')
    }

    try {
      const url = 'http://localhost:2574/user/addToCart'
      const res = await axios.post(url, product)
      return res.data
      } catch (error) {
      return error
    }
  }

  return (
    <div className="bg-white/60 rounded-lg shadow-md w-70 m-3">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-md hover:scale-103"
      />
      <div className="p-6">
        <h3 className="text-lg font-semibold mt-2">{name}</h3>
        <p className="text-gray-600 mt-1">{description}</p>
        <button className="bg-indigo-500 text-white w-full rounded py-3 font-bold hover:bg-indigo-600" onClick={() => addToCart()}>
          Add to Cart
        </button>
        <p className="text-green-500 font-bold mt-2">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}
        </p>
        <ul className="list-disc list-inside mt-2">
          {features?.map((feature, index) => (
            <li key={index} className="text-gray-600">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
