import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ProductSkeleton from "../components/ProductSkeleton";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }

        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== "admin") {
          toast.error("You are not authorized to access this page");
        }

        const url =
          "https://novagadget-server.onrender.com/admin/customersOrder";
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data.orders);
      } catch (error) {
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
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 flex-col md:flex-row gap-5 min-h overflow-y-auto"             >
                <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-5">
                    <div
                      className="flex flex-1 items-center justify-center"
                    >
                      <img
                        src={order.productIds.imageUrl}
                        alt={order.productIds.name}
                        className="mx-auto h-64 w-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="mt-4 text-2xl font-bold">
                        {order.productIds.name}
                      </h2>

                      <h2 className="mt-4 text-2xl font-bold">
                        {order.productIds.brand}
                      </h2>

                      <h2 className="mt-4 text-2xl font-bold">
                        {order.productIds.category}
                      </h2>

                      <p className="mt-3 text-gray-600">
                        {order.productIds.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="text-lg font-bold">Features:</h3>
                        <ul className="mt-2 list-disc list-inside pl-5 text-gray-600">
                          {order.productIds.features?.map((feature, index) => (
                            <li key={feature._id || index}>
                              <strong>{feature.key}</strong>: {feature.value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-xl font-bold">
                      ₦{order.price.toLocaleString()}
                    </p>
                  </div>
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

export default Orders;
