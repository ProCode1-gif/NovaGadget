// import React from 'react'
// import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductSkeleton from "../components/ProductSkeleton";

const Cart = () => {
  const [carts, setCarts] = useState([])
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(1)

  useEffect(() => {
    const getCart = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          toast.error('Token not provided')
        }
        const url = "https://novagadget-server.onrender.com/user/myCart";
        const res = await axios.get(url);
        setCarts(res.data)
      } catch (error) {
        return error;
      } finally {
        setLoading(false)
      }
    };
    getCart();
  });

  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen px-5 py-20">
        {loading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : carts.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 space-x-6">
            {carts.map((cart) => (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 flex-col md:flex-row gap-5 min-h overflow-y-auto"             >
                <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div
                      className="flex flex-1 items-center justify-center"
                    >
                      <img
                        src={cart.productIds.imageUrl}
                        alt={cart.productIds.name}
                        className="mx-auto h-64 w-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="mt-4 text-2xl font-bold">
                        {cart.productIds.name}
                      </h2>

                      <h2 className="mt-4 text-2xl font-bold">
                        {cart.productIds.brand}
                      </h2>

                      <h2 className="mt-4 text-2xl font-bold">
                        {cart.productIds.category}
                      </h2>

                      <p className="mt-3 text-gray-600">
                        {cart.productIds.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="text-lg font-bold">Features:</h3>
                        <ul className="mt-2 list-disc list-inside pl-5 text-gray-600">
                          {cart.productIds.features?.map((feature, index) => (
                            <li key={feature._id || index}>
                              <strong>{feature.key}</strong>: {feature.value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-xl font-bold">
                      ₦{cart.productIds.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-5">
                    <button
                    type="button"
                      onClick={() => {
                        setCount((prev) => Math.max(1, prev - 1));
                      }}
                      className="rounded-lg bg-gray-200 px-5 py-2 text-xl cursor-pointer"
                    >
                      -
                    </button>

                    <span className="text-xl font-semibold">{count}</span>

                    <button
                      type="button"
                      onClick={() => {
                        setCount((prev) => prev + 1);
                      }}
                      className="rounded-lg bg-gray-200 px-5 py-2 text-xl cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-5 text-xl font-bold">
                    Total: ₦{(cart.productIds.price * count).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
