import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Phone from "../assets/images/samsung.jpg";
import Laptop from "../assets/images/laptop.png";
import Gadgets from "../assets/images/gadgets.jpg";
import Accessories from "../assets/images/accessories.png";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="bg-black text-white">
        <div className="bg-linear-to-r from-blue-700 to-violet-700 py-30 md:px-20 px-10 mt-10 justify-around md:flex space-y-10">
          <div className="space-y-6 mt-6">
            <h1 className="md:text-7xl text-5xl text-white font-bold font-sans">
              Discover the Latest Tech
            </h1>
            <p className="md:text-2xl text-white/70">
              Premium laptops, smartphones and accessories at unbeatable prices
            </p>
            <div className="flex space-x-3 font-sans">
              <Link to={"shop"}>
                <button className="bg-white hover:bg-white/90 py-3 px-6 text-blue-700 border border-white rounded-lg cursor-pointer">
                  Shop Now
                </button>
              </Link>
              <Link to={"about"}>
                <button className="bg-transparent hover:bg-white hover:text-blue-700 py-3 px-6 text-white border-2 border-white rounded-lg cursor-pointer">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="border">
            <img
              src={Gadgets}
              alt="gadgets"
              className="w-150 h-100 rounded-lg"
            />
          </div>
        </div>
        <div className="py-20 px-10">
          <h2 className="text-4xl font-bold text-center">Shop by Category</h2>
          <div className="my-20 md:flex justify-center space-x-6 space-y-6">
            <div className="rounded-lg shadow-lg bg-stone-900 hover:scale-102">
              <img
                src={Laptop}
                alt="laptop"
                className="w-full h-100 rounded-lg hover:scale-102"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Laptops</h3>
                <p className="text-gray-300">
                  High-performance laptops for work and gaming
                </p>
                <div className="mt-6">
                  <Link to={"shop"} className="text-blue-700">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-md bg-stone-900 hover:scale-102">
              <img
                src={Phone}
                alt="smartphones"
                className="rounded-lg w-full h-100"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Smartphones</h3>
                <p className="text-gray-300">
                  Latest smartphones with cutting-edge features
                </p>
                <div className="mt-6">
                  <Link to={"shop"} className="text-blue-700">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-md bg-stone-900 hover:scale-102">
              <img
                src={Accessories}
                alt="accessories"
                className="rounded-lg w-full h-100"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Accessories</h3>
                <p className="text-gray-300">
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
        <div className="py-20 px-10 md:px-20">
          <h2 className="text-center text-4xl font-bold">
            Why choose NovaGadget?
          </h2>
          <div className="flex space-y-6 justify-around pt-20">
            <div className="space-y-10">
              <div className="flex flex-col justify-center align-middle">
                <Truck
                size={40}
                strokeWidth={2}
                className="mx-auto text-blue-500"
                />
                <h3 className="text-center text-2xl font-semibold">
                  Free Shipping
                </h3>
                <p className="text-center text-gray-600">On orders over $50</p>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <ShieldCheck
                size={40}
                strokeWidth={2}
                className="mx-auto text-green-500"
                />
                <h3 className="text-center text-2xl font-semibold">
                  Secure Payment
                </h3>
                <p className="text-center text-gray-600">
                  100% secure transactions
                </p>
              </div>
            </div>
            <div className="space-y-10">
              <div className="flex flex-col justify-center align-middle">
                <RotateCcw
                size={40}
                strokeWidth={2}
                className="mx-auto text-orange-500"
                />
                <h3 className="text-center text-2xl font-semibold">
                  Easy Returns
                </h3>
                <p className="text-center text-gray-600">
                  30-days return policy
                </p>
              </div>
              <div className="flex flex-col justify-center align-middle">
                <Headphones
                size={40}
                strokeWidth={2}
                className="mx-auto text-purple-500"
                />
                <h3 className="text-center text-2xl font-semibold">
                  24/7 Support
                </h3>
                <p className="text-center text-gray-600">Always here to help</p>
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
