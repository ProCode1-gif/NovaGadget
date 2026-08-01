// import React from 'react'
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = "http://localhost:2574/user/shop";
        const res = await axios.get(url);
        setProducts(res.data)
      } catch (error) {
        return error;
      }
    };
    getProducts();
  }, [products]);

  return (
    <>
      <Navbar />
      <div className="md:flex flex-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Products;
