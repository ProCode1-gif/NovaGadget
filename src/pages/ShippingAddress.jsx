import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import ProductSkeleton from "../components/ProductSkeleton";

const ShippingAddress = () => {
    const getAddress = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }

        const res = await axios.get("https://novagadget-server.onrender.com/user/address");
        return res.data;
    };

    const [data, isLoading, error] = useQuery({ queryKey: ["address"], queryFn: getAddress })

    const addAddress = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }

        const res = await axios.post("https://novagadget-server.onrender.com/user/addAddress");
        return res.data;
    };

    const addressMutation = useMutation({
      mutationFn: addAddress,

      onSuccess: (data) => {
        return data;
      },

      onError: (error) => {
        toast.error(error.response?.data?.message)
      }
    })

    if (error) toast.error(error.response?.data?.message)

      return (
    <>
    <Navbar />
    <div className="bg-black min-h-screen py-20 px-5">
      <h2 className="text-4xl font-bold text-center text-white">Shipping Address</h2>
      <div className="flex flex-col space-y-4 mt-20">
        {isLoading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-center">No shipping address found.</p>
        ) : (
          <div className="bg-white w-xl p-5 space-y-6">
            {data.map((address) => {
              <div>
                <p>Type: <input type="text" defaultValue={address.phoneNumber} className="border border-gray-500 p-3 rounded-md" /> </p>
                <p>Cardholder Name: <input type="text" defaultValue={address.country} className="border border-gray-500 p-3 rounded-md" /> </p>
                <p>Card Number: <input type="text" defaultValue={address.state} className="border border-gray-500 p-3 rounded-md" /> </p>
                <p>Expiry Month: <input type="text" defaultValue={address.city} className="border border-gray-500 p-3 rounded-md" /> </p>
                <p>Expiry Year: <input type="text" defaultValue={address.street} className="border border-gray-500 p-3 rounded-md" /> </p>
                <p>Bank Name: <input type="text" defaultValue={address.postalCode} className="border border-gray-500 p-3 rounded-md" /> </p>
                <p>Account Number: <input type="text" defaultValue={address.landmark} className="border border-gray-500 p-3 rounded-md" /> </p>
                <p>CVV: <input type="text" defaultValue={address.addressType} /> </p>
              </div>
            })}
            <div className="flex space-x-4 mt-6">
            {/* <button
            type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              // onClick={addressUpdate}
            >
              Save Changes
            </button> */}
            <button
            type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              onClick={addressMutation}
            >
              Add New Address
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

export default ShippingAddress;
