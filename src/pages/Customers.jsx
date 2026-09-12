import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Customers = () => {
  const [credentials, setCredentials] = useState([]);
  
  useEffect(() => {
  const getCredentials = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return toast.error("Token not provided");
      }

      const res = await axios.get(
        "https://novagadget-server.onrender.com/admin/customers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCredentials(res.data.customers);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  getCredentials();
}, []);

  return (
    <>
    <Navbar />
    <div className="table-auto border border-slate-500 border-collapse flex  justify-center items-center min-h-screen bg-black p-5">
      <table className="space-x-6 border text-white space-y-6">
        <caption className="caption-top text-center md:text-7xl text-3xl font-bold p-3">
          Customer Information
        </caption>
        <thead>
          <tr>
            <th className="border border-slate-500 p-2">S/N</th>
            <th className="border border-slate-500 p-2">Full Name</th>
            <th className="border border-slate-500 p-2">Email</th>
            <th className="border border-slate-500 p-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((credential, i) => {
            const { fullName, email, phoneNumber } =
              credential;
            return (
              <tr>
                <td className="border border-slate-500 p-2">{i + 1}</td>
                <td className="border border-slate-500 p-2">{fullName}</td>
                <td className="border border-slate-500 p-2">{email}</td>
                <td className="border border-slate-500 p-2">{phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <Footer />
    </>
  );
};

export default Customers;
