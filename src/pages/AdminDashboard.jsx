// import React from 'react'
import { ShoppingCart, Users } from "lucide-react";
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

const Admin = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000, 45000, 56000, 72000, 83000, 55000, 237000],
        borderColor: "#4F46E5",
        tension: 0.4,
      },
    ]
  };
  const sales = {
    labels: ["Laptops", "Accessories", "Smartphones"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: ["#4F46E5", "#8B5CF6", "#EC4899"],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <section className="bg-white/70 flex mt-15 space-x-6">
        <AdminSideBar />
        <div className="py-6 space-y-6 w-screen">
          <h2 className="text-center text-5xl font-extrabold">
            Dashboard Overview
          </h2>
          <div className="md:flex space-x-6 mt-10">
            <div className="bg-white w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                <span className="bg-blue-100 text-blue-600 font-bold text-2xl p-2 rounded-lg">
                  $
                </span>
                <span className="text-green-600 font-bold text-sm p-2">
                  +12.5%
                </span>
              </div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold mt-4">$124,563</p>
            </div>
            <div className="bg-white w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                  <ShoppingCart className="bg-green-100 text-green-600 font-bold text-2xl p-2 rounded-lg" />
                <span className="text-green-600 font-bold text-sm p-2">
                  +8.2%
                </span>
              </div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold mt-4">1,429</p>
            </div>
            <div className="bg-white w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                  <Users className="bg-purple-100 text-purple-600 font-bold text-2xl p-2 rounded-lg" />
                <span className="text-green-600 font-bold text-sm p-2">
                  +15.3%
                </span>
              </div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold mt-4">8,542</p>
            </div>
            <div className="bg-white w-[23%] p-6 rounded-lg shadow">
              <div className="flex justify-between space-y-4">
                <span className="bg-orange-100 text-orange-600 font-bold text-2xl p-2 rounded-lg">
                  $
                </span>
                <span className="text-orange-600 font-bold text-sm p-2">
                  -2.4%
                </span>
              </div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold mt-4">342</p>
            </div>
          </div>
          <div className="md:flex space-x-6 space-y-6">
            <div className="bg-white p-4 w-[48%] h-100 rounded-lg shadow">
              <h4 className="font-bold text-2xl">Revenue Overview</h4>
              <Line data={data} />
            </div>
            <div className="bg-white p-4 w-[48%] h-100 rounded-lg shadow">
              <h4 className="font-bold text-2xl">Sales by Cartegory</h4>
              <Doughnut data={sales} className="flex justify-center items-center align-middle" />
            </div>
          </div>
          <div className="w-full bg-white p-4 rounded-lg shadow">
            <table className="w-full">
            <caption className="caption-top text-left font-bold text-2xl p-3">Recent Orders</caption>
              <thead>
                <tr>
                  <th className="text-gray-600 font-semibold p-2">Order ID</th>
                  <th className="text-gray-600 font-semibold p-2">Customer</th>
                  <th className="text-gray-600 font-semibold p-2">Produt</th>
                  <th className="text-gray-600 font-semibold p-2">Amount</th>
                  <th className="text-gray-600 font-semibold p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Admin;
