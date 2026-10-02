import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const CartProduct = ({ imageUrl, name, brand, cartegory, stock, description, price, features}) => {
  const [count, setCount] = useState(0);

  const placeOrder = async () => {
    const res = await axios.post(
      "https://novagadget-server.onrender.com/user/placeOrder",
    );
    return res.data;
  };

  const ordemutation = useMutation({
    mutationFn: placeOrder,

    onSuccess: (data) => {
      return data;
    },

    onError: (error) => {
      toast.error(error.response?.dataa?.message);
    },
  });

  return (
    <>
        <div className="bg-white/60 rounded-lg shadow-md m-3 hover:scale-103 transition-transform duration-300 space-y-3 cursor-pointer">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover rounded-md"
          />
          <div className="md:p-6 p-2 space-y-3">
            <h3 className="text-lg font-bold text-center">{name}</h3>
            <span className="text-lg font-semibold text-gray-600">
              {brand}
            </span>
            <span className="text-lg font-semibold text-gray-600">
              {cartegory}
            </span>
            <span className="text-lg font-semibold text-gray-600">
              {stock}
            </span>
            <p className="text-gray-600 mt-1 mb-3">{description}</p>
            <p className="text-black font-bold">
              {new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN",
              }).format(price)}
            </p>
            <ul className="list-disc list-inside mt-2">
              {features?.map((feature, index) => (
                <li key={index} className="text-gray-600">
                  {feature}
                </li>
              ))}
            </ul>

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

            <div>
              <button
                className="bg-indigo-500 text-white w-full rounded py-3 font-bold hover:bg-indigo-600"
                onClick={() => ordemutation}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
    </>
  );
};

export default CartProduct;
