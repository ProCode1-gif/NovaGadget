import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User, ShoppingCart, Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    const res = await axios.get(
      `https://novagadget-server.onrender.com/user/shop?search=${encodeURIComponent(search)}`,
    );
    return res.data.products;
  };

  const { data, error } = useQuery({
    queryKey: ["product", search],
    queryFn: handleSearch,
    enabled: search.length > 0,
  });

  if (error) return toast.error(error.response?.data?.message);

  return (
    <nav className="top-0 w-full z-50 bg-gray-800 flex fixed justify-around align-middle py-3 shadow-lg text-white">
      <div className="flex justify-between space-x-3">
        <Link to={"/"}>
          <img
            src="/favicon.png"
            alt=""
            width={30}
            height={20}
            className="absolute"
          />
        </Link>
      </div>

      <form
        onSubmit={handleSearch}
        className="hidden md:flex space-x-3 w-60 bg-gray-600 rounded-full justify-center align-middle"
      >
        <button type="submit">
          <Search />
        </button>
        <input
          type="search"
          placeholder="Search electronics product"
          value={data}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none w-40 bg-gray-600 text-white"
        />
      </form>

      <div className="md:hidden">
        {showForm ? (
          <div className="grid items-center">
            <X
              size={22}
              className="cursor-pointer text-center"
              onClick={() => setShowForm(false)}
            />
            <form
              className="space-x-3 w-60 bg-gray-600 rounded-full justify-center align-middle"
              onSubmit={handleSearch}
            >
              <button type="submit">
                <Search size={22} className="cursor-pointer" />
              </button>
              <input
                type="search"
                placeholder="Search electronics product"
                value={data}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none w-40 bg-gray-600 text-white"
              />
            </form>
          </div>
        ) : (
          <Search
            size={22}
            className="cursor-pointer text-center"
            onClick={() => setShowForm(true)}
          />
        )}
      </div>

      {token ? (
        <div className="flex justify-between space-x-3">
          <Link to={"/user/cart"}>
            <ShoppingCart />
          </Link>
          <Link to={"/user/account"}>
            <User />
          </Link>
        </div>
      ) : (
        <Link to={"/signin"}>
          <button className="bg-blue-700 px-3 py-1 rounded-lg cursor-pointer text-white hover:bg-blue-600 hover:text-white/90">
            Sign In
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
