// import React from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <section>
        <div className="bg-linear-to-r from-blue-700 to-violet-700 py-30 px-20 mt-10 justify-between md:flex space-x-20">
          <div className="space-y-6 mt-6">
            <h1 className="text-7xl text-white font-bold font-sans">
              Discover the Latest Tech
            </h1>
            <p className="text-2xl text-white/70">
              Premium laptops, smartphones and accessories at unbeatable prices
            </p>
            <div className="flex space-x-3 font-sans">
              <Link to={"shop"}>
                <button className="bg-white hover:bg-white/90 py-3 px-6 text-blue-700 border border-white rounded-lg cursor-pointer">
                  Shop Now
                </button>
              </Link>
              <Link>
                <button className="bg-transparent hover:bg-white hover:text-blue-700 py-3 px-6 text-white border-2 border-white rounded-lg cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="border">
            <img src="" alt="product" className="w-150 h-100 rounded-lg" />
          </div>
        </div>
        <div className="bg-[#F9FAFB] py-20 px-10">
          <h2 className="text-4xl font-bold text-center">Shop by Category</h2>
          <div className="my-20 flex space-x-6 space-y-6">
            <div className="bg-white rounded-lg shadow-md">
              <img
                src=""
                alt="laptop"
                className="rounded-lg hover:scale-102 border w-full h-60"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Laptops</h3>
                <p className="text-gray-600">
                  High-performance laptops for work and gaming
                </p>
                <div className="mt-6">
                  <Link to={"shop"} className="text-blue-700">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md">
              <img
                src=""
                alt="smartphones"
                className="rounded-lg hover:scale-102 border w-full h-60"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Smartphones</h3>
                <p className="text-gray-600">
                  Latest smartphones with cutting-edge features
                </p>
                <div className="mt-6">
                  <Link to={"shop"} className="text-blue-700">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md">
              <img
                src=""
                alt="accessories"
                className="rounded-lg hover:scale-102 border w-full h-60"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Accessories</h3>
                <p className="text-gray-600">
                  Premium accessories to enhance your tech
                </p>
                <div className="mt-6">
                  <Link to={"shop"} className="text-blue-700">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F3F4F6] py-20 px-10 md:px-20">
          <h2 className="text-center text-4xl font-bold">
            Why choose NovaGadget?
          </h2>
          <div className="flex space-y-6 justify-between pt-20">
            <div className="">
              <div>
                <img src="" alt="shipping" className="w-55 h-42 rounded-full" />
                <div>
                  <h3 className="text-center text-2xl font-semibold">
                    Free Shiping
                  </h3>
                  <p className="text-center text-gray-600">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div>
                <img src="" alt="shipping" className="w-55 h-42 rounded-full" />
                <div>
                  <h3 className="text-center text-2xl font-semibold">
                    Secure Payment
                  </h3>
                  <p className="text-center text-gray-600">
                    100% secure transactions
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <div>
                <img src="" alt="shipping" className="w-55 h-42 rounded-full" />
                {/* <div> */}
                <h3 className="text-center text-2xl font-semibold">
                  Easy Returns
                </h3>
                <p className="text-center text-gray-600">
                  30-days return policy
                </p>
                {/* </div> */}
              </div>
              <div>
                <img src="" alt="shipping" className="w-55 h-42 rounded-full" />
                {/* <div> */}
                <h3 className="text-center text-2xl font-semibold">
                  24/7 Support
                </h3>
                <p className="text-center text-gray-600">Always here to help</p>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
