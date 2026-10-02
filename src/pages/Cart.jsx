import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import ProductSkeleton from "../components/ProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import CartProduct from "../components/CartProduct";

const Cart = () => {
  const getCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) toast.error("Token not provided");

    const res = await axios.get(
      "https://novagadget-server.onrender.com/user/myCart",
    );
    return res.data;
  };

  const [data, isLoading, error] = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
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
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 space-x-6">
            {data.map((cart) => (
              <CartProduct
              key={cart._id}
              imageUrl={cart.imageUrl}
              name={cart.name}
              brand={cart.brand}
              cartegory={cart.cartegory}
              stock={cart.stock}
              description={cart.description}
              price={cart.price}
              features={cart.features}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Cart;
