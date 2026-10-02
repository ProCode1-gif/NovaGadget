import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";

const Customers = () => {
  const getCustomers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return toast.error("Token not provided");
      }

      const res = await axios.get(
        "https://novagadget-server.onrender.com/admin/customers",
      );
      return res.data;
  };

  const [data, isLoading, error] = useQuery({ queryKey: ["customer"], queryFn: getCustomers })

  if (isLoading) return 

  if (error) return toast.error(error.response?.data?.messaage)

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
          {data.map((customer, i) => {
            const { fullName, email, phoneNumber } =
              customer;
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
