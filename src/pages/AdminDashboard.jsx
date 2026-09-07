// import React from 'react'
import { Banknote, Package, ShoppingCart, Users } from "lucide-react";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [sales, setSales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const Admin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }
  
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== "admin") {
          toast.error("You are not authorized to access this page");
        }
      } catch (error) {
        toast.error(error.res?.data?.message || "Something went wrong");
      }
    };
    Admin();
  }, [])
  
  useEffect(() => {
    const getDisplayData = async () => {
      try {
        const [category, monthly, revenue, customer, product, orders] = await Promise.all([
          axios.get("https://novagadget-server.onrender.com/admin/categorySales"),
          axios.get("https://novagadget-server.onrender.com/admin/monthlySales"),
          axios.get("https://novagadget-server.onrender.com/admin/customersAddress"),
          axios.get("https://novagadget-server.onrender.com/admin/customers"),
          axios.get("https://novagadget-server.onrender.com/user/shop"),
          axios.get("https://novagadget-server.onrender.com/admin/customersOrder"),
        ])
        setSales(category.data.sales)
        setMonthlySales(monthly.data.monthlySales)
        setTotalRevenue(revenue.data?.address?.length);
        setTotalCustomer(customer.data?.customers?.length);
        setTotalProduct(product.data?.products?.length);
        setTotalOrders(orders.data?.orders?.length);
      } catch (error) {
        toast.error("Failed to get Sales", error)
      }
    };
    getDisplayData();
  })
  

  const line = {
    labels: monthlySales.map((item) => item.totalSales),
    datasets: [
      {
        label: "Revenue",
        data: monthlySales.map((item) => item.monthlySales),
        borderColor: "white",
        backgroundColor: "white",
        borderWidth: 3,
        pointBackgroundColor: "shite",
        pointBorderColor: "white",
        pointRadius: 5,
        tension: 0.4,
      },
    ]
  };

  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'rose','cyan', 'gray', 'stone', 'brown']
  const doghnut = {
    labels: sales.map((item) => item.category),
    datasets: [
      {
        data: sales.map((item) => item.totalSales),
        backgroundColor: sales.map((index) => colors[index % colors.length]),
      },
    ],
  };

  return (
    <>
      <Navbar />
      <section className="bg-black flex mt-15 space-x-6">
        <AdminSideBar />
        <div className="py-6 space-y-6 w-screen">
          <h2 className="text-center text-5xl font-extrabold">
            Dashboard Overview
          </h2>
          <div className="md:flex space-x-6 mt-10">
            <div className="bg-gray-600 w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                <span className="bg-blue-100 text-blue-600 font-bold text-2xl p-2 rounded-lg">
                  <Banknote/>
                </span>
                <span className="text-green-600 font-bold text-sm p-2">
                  +12.5%
                </span>
              </div>
              <p className="text-sm text-black">Total Revenue</p>
              <p className="text-2xl font-bold mt-4">{totalRevenue}</p>
            </div>
            <div className="bg-gray-600 w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                <span className="bg-green-100 text-green-600 font-bold text-2xl p-2 rounded-lg">
                  <ShoppingCart/>
                </span>
                <span className="text-green-600 font-bold text-sm p-2">
                  +8.2%
                </span>
              </div>
              <p className="text-sm text-black">Total Orders</p>
              <p className="text-2xl font-bold mt-4">{totalOrders}</p>
            </div>
            <div className="bg-gray-600 w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                <span className="bg-purple-100 text-purple-600 font-bold text-2xl p-2 rounded-lg">
                  <Users/>
                </span>
                <span className="text-green-600 font-bold text-sm p-2">
                  +15.3%
                </span>
              </div>
              <p className="text-sm text-black">Total Customers</p>
              <p className="text-2xl font-bold mt-4">{totalCustomer}</p>
            </div>
            <div className="bg-gray-600 w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                <span className="bg-orange-100 text-orange-600 font-bold text-2xl p-2 rounded-lg">
                  <Package/>
                </span>
                <span className="text-orange-600 font-bold text-sm p-2">
                  -2.4%
                </span>
              </div>
              <p className="text-sm text-black">Total Products</p>
              <p className="text-2xl font-bold mt-4">{totalProduct}</p>
            </div>
          </div>
          <div className="md:flex space-x-6 space-y-6">
            <div className="bg-gray-600 p-4 w-[48%] h-100 rounded-lg shadow">
              <h4 className="font-bold text-2xl">Revenue Overview</h4>
              <Line data={line} />
            </div>
            <div className="bg-gray-600 p-4 w-[48%] h-100 rounded-lg shadow">
              <h4 className="font-bold text-2xl">Sales by Category</h4>
              <Doughnut data={doghnut} />
            </div>
          </div>
          <div className="w-full bg-gray-600 p-4 rounded-lg shadow">
            <table className="w-full">
              <caption className="caption-top text-left font-bold text-2xl p-3">Recent Orders</caption>
              <thead>
                <tr>
                  <th className="text-gray-300 font-semibold p-2">Order ID</th>
                  <th className="text-gray-300 font-semibold p-2">Customer</th>
                  <th className="text-gray-300 font-semibold p-2">Product</th>
                  <th className="text-gray-300 font-semibold p-2">Amount</th>
                  <th className="text-gray-300 font-semibold p-2">Status</th>
                </tr>
              </thead>
              {Array.from({ length: totalOrders }, (_, i) => (
                <tbody>
                  <tr>
                    <td className="text-gray-300">Order {i + 1}</td>
                    <td className="text-gray-300">User {i + 1}</td>
                    <td className="text-gray-300">Product {i + 1}</td>
                    <td className="text-gray-300">₦ {((i + 1) * 10).toFixed(2)}</td>
                    <td className="text-gray-300">Pending</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Admin;
