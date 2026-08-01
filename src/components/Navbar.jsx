// import React from 'react'
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = useParams();
  const links = ["Accessories", "Smartphones", "Laptops"];
  return (
    <nav className="top-0 w-full z-50 bg-white flex fixed justify-between align-middle py-3  px-20 shadow-lg">
      <div className="flex justify-between space-x-3">
        <h1 className="text-2xl text-blue-700 font-bold">NovaGadget</h1>
      </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 hover:text-blue-700 focus:outline-none cursor-pointer">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      {open && (
        <ul className="absolute top-16 left-0 w-full bg-white shadow-md py-4 px-6 space-y-4 md:hidden">
          {links.map((name) => {
            const slug = name.toLocaleLowerCase().replace(/\s+/g, "-");
            const active = pathname === `/${slug}`;
            return (
              <li key={name}>
                <Link to={`/${slug}`} className={` ${active ? "text-blue-700" : " hover:bg-blue-100 p-2 rounded-lg text-gray-700"}`}>
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <ul className="hidden md:flex space-x-6">
        {links.map((name) => {
          const slug = name.toLocaleLowerCase().replace(/\s+/g, "-");
          const active = pathname === `/${slug}`;
          return (
            <li key={name}>
              <Link to={`/    ${slug}`} className={` ${active ? "text-blue-700" : "text-gray-700"} hover:text-blue-700`}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between space-x-3">
        <Link to={'user/cart'}>
          <img src="./assets/cart.png" alt="cart" width={50} height={20} />
        </Link>
        <Link to={'user/account'}>Profile</Link>
        <Link to={"signin"}>
          <button className="bg-blue-700 px-3 py-1 rounded-lg cursor-pointer text-white hover:bg-blue-600 hover:text-white/90">
            Sign In
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
