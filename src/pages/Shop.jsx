import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductSkeleton from "../components/ProductSkeleton";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          "https://novagadget-server.onrender.com/user/shop",
        );

        setProducts(res.data.products);
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
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  brand={product.brand}
                  description={product.description}
                  price={product.price}
                  onClick={() => {
                    setSelectedProduct(product);
                    setCount(1);
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
                <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col md:flex-row gap-5">
                    <div
                      className="flex flex-1 items-center justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        className="mx-auto h-64 w-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="mt-4 text-2xl font-bold">
                        {selectedProduct.name}
                      </h2>

                      <h2 className="mt-4 text-2xl font-bold">
                        {selectedProduct.brand}
                      </h2>

                      <h2 className="mt-4 text-2xl font-bold">
                        {selectedProduct.category}
                      </h2>

                      <p className="text-gray-500">{selectedProduct.brand}</p>

                      <p className="mt-3 text-gray-600">
                        {selectedProduct.description}
                      </p>

                      <div className="mt-5">
                        <h3 className="text-lg font-bold">Features:</h3>
                        <ul className="mt-2 list-disc list-inside pl-5 text-gray-600">
                          {selectedProduct.features?.map((feature, index) => (
                            <li key={feature._id || index}>
                              <strong>{feature.key}</strong>: {feature.value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-xl font-bold">
                      ₦{selectedProduct.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-5">
                    <button
                    type="button"
                      onClick={() => {
                        setCount((prev) => Math.max(1, prev - 1));
                      }}
                      className="rounded-lg bg-gray-200 px-5 py-2 text-xl cursor-pointer"
                    >
                      -
                    </button>

                    <span className="text-xl font-semibold">{count}</span>

                    <button
                      type="button"
                      onClick={() => {
                        setCount((prev) => prev + 1);
                      }}
                      className="rounded-lg bg-gray-200 px-5 py-2 text-xl cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-5 text-xl font-bold">
                    Total: ₦{(selectedProduct.price * count).toLocaleString()}
                  </p>

                  <button className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-white cursor-pointer hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="mt-3 w-full rounded-lg bg-gray-200 py-3 text-gray-700 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
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
