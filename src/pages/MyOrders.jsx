import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import ProductSkeleton from "../components/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import OrderProduct from "../components/OrderProduct";

const MyOrder = () => {
  const getOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not provided");
    }

    const res = await axios.get(
      "https://novagadget-server.onrender.com/user/myOrder",
    );
    return res.data;
  };

  const [data, isLoading, error] = useQuery({
    queryKey: ["order"],
    queryFn: getOrder,
  });

  if (error) return toast.error(error.response?.data?.message);

  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen px-5 py-20">
        {isLoading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 space-x-6">
            {data.map((order) => (
              <OrderProduct
                key={order._id}
                status={order.status}
                createdAt={order.createdAt}
                imageUrl={order.imageUrl}
                name={order.name}
                quantity={order.quantity}
                price={order.price}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MyOrder;
