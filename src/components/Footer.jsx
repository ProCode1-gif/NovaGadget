// import React from 'react'
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-15 md:px-20 px-10 bottom-0">
      <div className="md:flex flex-2 justify-between space-x-10 mr-20 space-y-6">
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
              <p className="text-lg text-gray-400">Laptop</p>
            </li>
            <li>
              <p className="text-lg text-gray-400">Smartphones</p>
            </li>
            <li>
              <p className="text-lg text-gray-400">Accessories</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg text-white font-bold">Follow Us</h3>
          <div className="flex space-x-3">
            <Link>
              <FaFacebook className="text-blue-500"/>
            </Link>
            <Link>
              <FaTwitter className="text-blue-500" />
            </Link>
            <Link>
              <FaInstagram className="bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent" />
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
