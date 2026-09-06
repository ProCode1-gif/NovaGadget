import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import ProductSkeleton from "../components/ProductSkeleton";
import Footer from "../components/Footer";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const {loading, setLoading} = useState(false)

  useEffect(() => {
    const getAdminProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return toast.error("Token not provided");
        }

        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== "admin") {
          return toast.error("You are not authorized to access this page");
        }

        const res = await axios.get(
          "http://localhost:2574/admin/adminProducts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProducts(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false)
      }
    };
    getAdminProducts();
  });

  return (
    <>
    <Navbar/>
    <main className="bg-blackmin-h-screen px-5 py-20">
        {loading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 space-x-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                imageUrl={product.imageUrl}
                name={product.name}
                brand={product.brand}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default AdminProducts;
