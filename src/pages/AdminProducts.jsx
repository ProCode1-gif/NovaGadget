import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductSkeleton from "../components/ProductSkeleton";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";

const AdminProducts = () => {
  const getAdminProducts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Token not provided");
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== "admin") {
      return toast.error("You are not authorized to access this page");
    }

    const res = await axios.get(
      "https://novagadget-server.onrender.com/admin/adminProducts",
    );
    return res.data;
  };

  const [data, isLoading, error] = useQuery({
    queryKey: ["product"],
    queryFn: getAdminProducts,
  });

  if (error) return toast.error(error.response?.data?.message);

  return (
    <>
      <Navbar />
      <main className="bg-blackmin-h-screen px-5 py-20">
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
            {data.map((product) => (
              <div className="bg-gray-600 minh-60 md:w-220 rounded-lg shadow-lg p-6">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold">Product #{product._id}</h2>
                  <p className="text-black px-2 rounded-full">
                    {product.status}
                  </p>
                </div>
                <p className="text-gray-300 text-xs">
                  Placed on {new Date(product.createdAt).toLocaleDateString()}
                </p>
                <div className="flex space-x-6 mt-6">
                  <div>
                    <img
                      src={product.productIds.imageUrl}
                      alt={product.name}
                      className="h-20"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-green-500 text-sm font-bold py-3">
                      ₦{product.price.toFixed(2)}
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
    </>
  );
};

export default AdminProducts;
