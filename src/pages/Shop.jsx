import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductSkeleton from "../components/ProductSkeleton";
import AddToCart from "../components/AddToCart";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [product, setProduct] = useState(null);
  
  const getProducts = async () => {
    const res = await axios.get(
      "https://novagadget-server.onrender.com/user/shop",
    );
    return res.data;
  };
  
  const [data, isLoading, error] = useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
    staleTime: 3000,
  });
  
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:2574");
    if (!product) return;

    socket.onopen = () => {
      console.log("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log("Received from WebSocket:", data);


        if (data.type === "PRODUCT_ADDED") {
          setProduct((prevProducts) => {
            const alreadyExists = prevProducts.some(
              (product) => product._id === data.product._id,
            );

            if (alreadyExists) {
              return prevProducts;
            }

            return [data.product, ...prevProducts];
          });
        }
      } catch (error) {
        console.error("Error processing WebSocket message:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close();
      }
    };
  });

  if (error) return toast.error(error.response?.data?.message);

  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen px-5 py-20">
        {isLoading ? (
          <div className="products-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.map((product) => (
                <ProductCard
                  key={product._id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  brand={product.brand}
                  description={product.description}
                  price={product.price}
                  onClick={() => {
                    setSelectedProduct(product);
                  }}
                  className="cursor-pointer"
                />
              ))}
            </div>

            {selectedProduct && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 flex-col md:flex-row gap-5 min-h overflow-y-auto"
                onClick={() => setSelectedProduct(null)}
              >
                <AddToCart
                  key={selectedProduct._id}
                  imageUrl={selectedProduct.imageUrl}
                  name={selectedProduct.name}
                  brand={selectedProduct.brand}
                  cartegory={selectedProduct.cartegory}
                  stock={selectedProduct.stock}
                  description={selectedProduct.description}
                  price={selectedProduct.price}
                  features={selectedProduct.features}
                />
                <button onClick={() => setSelectedProduct(null)}>Close</button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Products;
