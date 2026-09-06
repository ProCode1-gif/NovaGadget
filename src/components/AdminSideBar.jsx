// import React from 'react'
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <aside className="bg-white/20 w-70 min-h-screen shadow">
      <h2 className="text-2xl text-blue-700 font-bold p-6">Admin Panel</h2>
      <hr className="text-gray-400 shadow text-sm my-4" />
      <ul className="py-6 px-10 text-lg">
        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to={""}>Dashboard</Link>
        </li>
        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to={"product"}>Products</Link>
        </li>
        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to={"addProduct"}>Add Product</Link>
        </li>
        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to={"customersOrder"}>Orders</Link>
        </li>
        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to={"customers"}>Customers</Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideBar;
