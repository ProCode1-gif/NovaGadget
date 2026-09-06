import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductSkeleton from "../components/ProductSkeleton";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:2574/user/shop");

        console.log("Products from API:", res.data);

        setProducts(res.data.products);
        console.log(typeof res.data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  });

  // useEffect(() => {
  //   const socket = new WebSocket("ws://localhost:2574");

  //   socket.onopen = () => {
  //     console.log("Connected to WebSocket");
  //   };

  //   socket.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);

  //       console.log("Received from WebSocket:", data);

  //       if (data.type === "PRODUCT_ADDED") {
  //         setProducts((prevProducts) => {
  //           const alreadyExists = prevProducts.some(
  //             (product) =>
  //               product._id === data.product._id
  //           );

  //           if (alreadyExists) {
  //             return prevProducts;
  //           }

  //           return [data.product, ...prevProducts];
  //         });
  //       }

  //       // if (data.type === "PRODUCT_DELETED") {
  //       //   setProducts((prevProducts) =>
  //       //     prevProducts.filter(
  //       //       (product) => product._id !== data.productId
  //       //     )
  //       //   );
  //       // }

  //       // if (data.type === "PRODUCT_UPDATED") {
  //       //   setProducts((prevProducts) =>
  //       //     prevProducts.map((product) =>
  //       //       product._id === data.product._id
  //       //         ? data.product
  //       //         : product
  //       //     )
  //       //   );
  //       // }
  //     } catch (error) {
  //       console.error(
  //         "Error processing WebSocket message:",
  //         error
  //       );
  //     }
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket disconnected");
  //   };

  //   return () => {
  //     if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
  //     socket.close();
  //   }
  //   };
  // });

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

export default Products;
