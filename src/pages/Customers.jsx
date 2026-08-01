import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Customers = () => {
  const [credentials, setCredentials] = useState([]);
  
  useEffect(() => {
    const getCredentials = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Token not provided");
        }

        const url = "http://localhost:2574/admin/customers";
        const res = await axios.get(url);
        setCredentials(res.data);
      } catch (error) {
        return error;
      }
    };
    getCredentials();
  }, [credentials]);

  return (
    <div className="table-auto border border-slate-500 border-collapse">
      <table className="space-x-6 border">
        <caption className="caption-top text-center font-bold p-3">
          Customer Information
        </caption>
        <thead>
          <tr>
            <th className="border border-slate-500 p-2">S/N</th>
            <th className="border border-slate-500 p-2">Full Name</th>
            <th className="border border-slate-500 p-2">Email</th>
            <th className="border border-slate-500 p-2">Phone Number</th>
            <th className="border border-slate-500 p-2">Orders</th>
            <th className="border border-slate-500 p-2">Expenses</th>
          </tr>
        </thead>
        <tbody>
          {credentials.map((credential, i) => {
            const { fullName, email, phoneNumber, orders, expenses } =
              credential;
            return (
              <tr>
                <td className="border border-slate-500 p-2">{i + 1}</td>
                <td className="border border-slate-500 p-2">{fullName}</td>
                <td className="border border-slate-500 p-2">{email}</td>
                <td className="border border-slate-500 p-2">{phoneNumber}</td>
                <td className="border border-slate-500 p-2">{orders}</td>
                <td className="border border-slate-500 p-2">{expenses}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
