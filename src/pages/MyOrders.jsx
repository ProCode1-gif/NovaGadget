import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductSkeleton from "../components/ProductSkeleton";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }

        const res = await axios.get(
          "https://novagadget-server.onrender.com/user/myOrder",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setOrders(res.data);
      } catch (error) {
        toast.error("Server error");
        return error;
      } finally {
        setLoading(false);
      }
    };
    getOrder();
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
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 space-x-6">
            {orders.map((order) => (
              <div className="bg-gray-600 minh-60 md:w-220 rounded-lg shadow-lg p-6">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">Order #{order._id}</h2>
                  <p className="text-black px-2 rounded-full">
                    {order.status}
                  </p>
                </div>
                <p className="text-gray-300 text-xs">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                <div className="flex space-x-6 mt-6">
                  <div>
                    <img src={order.productIds.imageUrl} alt={order.productIds.name} className="h-20" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{order.productIds.name}</h4>
                    <p className="text-gray-300 text-sm">Quantity: {order.quantity}</p>
                    <p className="text-green-500 text-sm font-bold py-3">
                      ₦{order.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="text-center w-[49%] border rounded-lg text-white text-sm bg-violet-700 p-2 cursor-pointer">
                    Track Orders
                  </button>
                  <button className="text-center w-[49%] rounded-lg text-sm border-white border text-white cursor-pointer">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <Footer />
    </>
  );
};

export default MyOrder;
