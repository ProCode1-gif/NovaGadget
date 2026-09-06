import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User, ShoppingCart, Search } from "lucide-react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const handleSearch = async (e) => {
    e.preventDefaut;

    if (!search.trim) return;

    try {
      const res = await axios.geet(
        `http://localhost:2574/user/search?search=${encodeURIComponent(search)}`,
      );
      setProducts(res.daa.products);

      if (!products) return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="top-0 w-full z-50 bg-gray-800 flex fixed justify-between align-middle py-3  px-20 shadow-lg text-white">
      <div className="flex justify-between space-x-3">
        <Link to={"/"}>
          <h1 className="text-2xl text-blue-700 font-bold">NovaGadget</h1>
        </Link>
      </div>

      <form
        onSubmit={handleSearch}
        className="flex space-x-3 w-60 bg-gray-600 rounded-full justify-center align-middle"
      >
        <Search className="md:hidden" />
        <input
          type="search"
          placeholder="Search electronics product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none"
        />
      </form>

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
