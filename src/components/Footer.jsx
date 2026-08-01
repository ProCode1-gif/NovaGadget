// import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-15 md:px-20 px-10 bottom-0">
      <div className="md:flex flex justify-between space-x-10 mr-20">
        <div className="space-y-6">
          <h2 className="text-2xl text-white font-bold">NovaGadget</h2>
          <p className="text-lg text-gray-400">
            Your trusted source for premium tech products.
          </p>
        </div>
        <div>
          <h3 className="text-lg text-white font-bold">Shop</h3>
          <ul className="mt-6 space-y-2">
            <li>
              <Link to={'laptops'} className="text-lg text-gray-400">Laptop</Link>
            </li>
            <li>
              <Link to={'smartphones'} className="text-lg text-gray-400">Smartphones</Link>
            </li>
            <li>
              <Link to={'accessories'} className="text-lg text-gray-400">Accessories</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-white font-bold">Support</h3>
          <ul className="mt-6 space-y-2">
            <li>
              <Link className="text-lg text-gray-400">Contact Us</Link>
            </li>
            <li>
              <Link className="text-lg text-gray-400">Shippng Info</Link>
            </li>
            <li>
              <Link className="text-lg text-gray-400">Returns</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-white font-bold">Follow Us</h3>
          <div className="flex space-x-3">
            <Link>
              <img src="./assets/facebook.png" alt="Facebook" width={50} height={20} />
            </Link>
            <Link>
              <img src="./assets/tweeter.png" alt="X" width={50} height={20} />
            </Link>
            <Link>
              <img src="./instagram.png" alt="Instagram" width={50} height={20} />
            </Link>
          </div>
        </div>
      </div>
      <hr className="text-white/15 shadow my-6" />
      <p className="text-center text-gray-400 text-lg">
        © 2024 NovaGadget. All right reserved
      </p>
    </footer>
  );
};

export default Footer;
