import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

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

        const res = await axios.get("http://localhost:2574/admin/adminProducts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProducts(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };

    getAdminProducts();
  }, []);

  return (
    <div>
      <div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found</p>
        ) : (
          <ProductCard products={products} />
        )}
      </div>
    </div>
  )
}

export default AdminProducts