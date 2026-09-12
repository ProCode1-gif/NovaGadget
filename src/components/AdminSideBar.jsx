import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
  <aside className="bg-white/20 w-70 min-h-screen shadow text-white hidden md:flex">
    <div>
      <h2 className="text-2xl text-blue-700 font-bold p-6">
        Admin Panel
      </h2>

      <hr className="text-gray-400 shadow text-sm my-4" />

      <ul className="py-6 px-10 text-lg">
        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="">Dashboard</Link>
        </li>

        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="product">Products</Link>
        </li>

        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="addProduct">Add Product</Link>
        </li>

        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="customersOrder">Orders</Link>
        </li>

        <li className="text-white hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="customers">Customers</Link>
        </li>
      </ul>
    </div>
  </aside>

  {/* MOBILE */}
  {open ? (
    <aside className="bg-gray-800 w-50 min-h-screen shadow text-white/70 fixed top-14 left-0 z-50">
      <X
        size={28}
        className="cursor-pointer m-2"
        onClick={() => setOpen(false)}
      />

      <h2 className="text-2xl text-blue-700 font-bold p-6">
        Admin Panel
      </h2>

      <hr className="text-gray-400 shadow" />

      <ul className="py-6 px-3 space-y-3">
        <li className="hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
        </li>

        <li className="hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="product" onClick={() => setOpen(false)}>
            Products
          </Link>
        </li>

        <li className="hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="addProduct" onClick={() => setOpen(false)}>
            Add Product
          </Link>
        </li>

        <li className="hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="customersOrder" onClick={() => setOpen(false)}>
            Orders
          </Link>
        </li>

        <li className="hover:bg-gray-600 p-3 rounded-lg cursor-pointer">
          <Link to="customers" onClick={() => setOpen(false)}>
            Customers
          </Link>
        </li>
      </ul>
    </aside>
  ) : (
    <div className="md:hidden">
      <Menu
        size={28}
        className="cursor-pointer text-white top-14 left-0 fixed m-2 z-50"
        onClick={() => setOpen(true)}
      />
    </div>
  )}
</div>
  );
};

export default AdminSideBar;
