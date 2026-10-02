import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";

const PaymentMethod = () => {
  const paymentMethod = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not provided");
      return;
    }

    const res = await axios.get(
      "https://novagadget-server.onrender.com/user/paymentMethod",
    );
    // axios.patch(
    //   "https://novagadget-server.onrender.com/user/addPaymentMethod",
    // ),
    // axios.post(
    //   "https://novagadget-server.onrender.com/user/addPaymentMethod",
    // ),
    return res.data;
  };

  const [data, isLoading, error] = useQuery({ queryKey: ["method"], queryFn: paymentMethod })

  const addPaymentMethod = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not provided");
      return;
    }

    const res = await axios.post("https://novagadget-server.onrender.com/user/addPaymentMethod",);
    return res.data;
  };

  const paymentMethodMutaation = useMutation({
    mutationFn: addPaymentMethod,

    onSuccess: (data) => {
      return data;
    },

    onError: (error) => {
      toast.error(error.response?.data?.message)
    }
  })

  if (error) return toast.error(error.response?.dta?.message)

  return (
    <>
      <Navbar />
      <div className="bg-black min-h-screen py-20 px-5 ">
        <h2 className="text-4xl font-bold text-center text-white">
          Payment Methods
        </h2>
        <div className="flex flex-col space-y-4 mt-20">
          {isLoading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : data.length === 0 ? (
            <p className="text-center">No payment methods found.</p>
          ) : (
            <div className="bg-white p-5 rounded-md space-y-6">
              <p>
                Type:{" "}
                <input
                  type="text"
                  defaultValue={data.type}
                  className="border border-gray-500 p-3 rounded-md"
                />{" "}
              </p>
              <p>
                Cardholder Name:{" "}
                <input
                  type="text"
                  defaultValue={data.cardholderName}
                  className="border border-gray-500 p-3 rounded-md"
                />{" "}
              </p>
              <p>
                Card Number:{" "}
                <input
                  type="text"
                  defaultValue={data.cardNumber}
                  className="border border-gray-500 p-3 rounded-md"
                />{" "}
              </p>
              <p>
                Expiry Month:{" "}
                <input
                  type="text"
                  defaultValue={data.expiryMonth}
                  className="border border-gray-500 p-3 rounded-md"
                />{" "}
              </p>
              <p>
                Expiry Year:{" "}
                <input
                  type="text"
                  defaultValue={data.expiryYear}
                  className="border border-gray-500 p-3 rounded-md"
                />{" "}
              </p>
              <p>
                Bank Name:{" "}
                <input
                  type="text"
                  defaultValue={data.bankName}
                  className="border border-gray-500 p-3 rounded-md"
                />{" "}
              </p>
              <p>
                Account Number:{" "}
                <input
                  type="text"
                  defaultValue={data.accountNumber}
                  className="border border-gray-500 p-3 rounded-md"
                />{" "}
              </p>
              <p>
                CVV: <input type="text" defaultValue={data.cvv} />{" "}
              </p>
              <div className="flex space-x-4 mt-6">
                {/* <button
                  className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                  onClick={dataUpdate}
                >
                  Save Changes
                </button> */}
                <button
                  className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                  onClick={paymentMethodMutaation}
                >
                  Add Payment Method
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentMethod;
