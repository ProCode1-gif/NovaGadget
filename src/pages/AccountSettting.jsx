import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useMutation, useQuery } from "@tanstack/react-query";

const AccountSettting = () => {
  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not provided");
      return;
    }

    const res = await axios.get(
      "https://novagadget-server.onrender.com/user/profile",
    );
    return res.data;
  };

  const [data, isLoading, error] = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const updateUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not provided");
      return;
    }

    const res = await axios.patch(
      "https://novagadget-server.onrender.com/user/profile",
    );
    return res.data;
  };

  const updteUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      return data;
    },

    onError: (data) => {
      return data;
    },
  });

  if (isLoading) return <p>Loading ...</p>

  if (error) return toast.error(error.response?.data?.message)

      return (
        <>
          <Navbar />
          <div className="bg-black min-h-screen py-20 px-5">
            <h2 className="text-4xl font-bold text-center text-white">
              Account Settings
            </h2>
            {data.map((user) => {
              <div className="flex flex-col space-y-6 mt-20 bg-white p-5">
                <p>
                  Full Name:{" "}
                  <input
                    className="border border-gray-500 p-3 rounded-md"
                    value={user?.fullName}
                  />
                </p>
                <p>
                  Password:{" "}
                  <input
                    className="border border-gray-500 p-3 rounded-md"
                    value={user?.password}
                  />
                </p>
                <p>
                  Email:{" "}
                  <input
                    className="border border-gray-500 p-3 rounded-md"
                    value={user?.email}
                  />
                </p>
                <p>
                  Phone Number:{" "}
                  <input
                    className="border border-gray-500 p-3 rounded-md"
                    value={user?.phoneNumber}
                  />
                </p>
                <button
                  className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                  onClick={updteUserMutation}
                >
                  Save Changes
                </button>
              </div>;
            })}
          </div>
          <Footer />
        </>
      );
};

export default AccountSettting;
