import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Samsumg from "../assets/images/samsung.jpg";
import GalaxyUltra from "../assets/images/galaxyultra.jpg";
import S24Ultra from "../assets/images/s24ultra.jpg";

const Account = () => {
  const pathname = useParams();
  const navigate = useNavigate();
  const links = [
    "My Orders",
    "Shipping Address",
    "Payment Method",
    "Account Setting",
  ];
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Token not providedd");
    navigate("/signup");
  }

  return (
    <>
      <Navbar />
      <section className="bg-black min-h-screen py-40 px-40 text-white">
        <h2 className="text-4xl font-bold">My Account</h2>
        <div className="md:flex space-x-6 space-y-6 my-12">
          <div className="space-y-10">
            <div className="h-60 w-full md:w-60 bg-gray-600 shadow-lg rounded-2xl">
              <ul className="p-6">
                {links.map((link) => {
                  const slug = link.toLocaleLowerCase().replace(/\s+/g, "-");
                  const active = pathname === `/user/${slug}`;
                  return (
                    <li key={link}>
                      <button className="w-full text-left hover:bg-gray-500 p-2 rounded-lg">
                        <Link
                          name={link}
                          to={`/user/${slug}`}
                          className={`text-lg ${active ? "" : ""}`}
                        >
                          {link}
                        </Link>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-600 h-60 md:w-220 rounded-lg shadow-lg p-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold">Order #12345</h2>
                <p className="bg-green-200 text-green-500 px-2 rounded-full">
                  Delivered
                </p>
              </div>
              <p className="text-gray-300 text-xs">Placed on may 15, 2026</p>
              <div className="flex space-x-6 mt-6">
                <div>
                  <img src={S24Ultra} alt="product" className="h-20" />
                </div>
                <div>
                  <h4 className="font-semibold">Samsung S24 Ultra</h4>
                  <p className="text-gray-300 text-sm">Quanlity: 1</p>
                  <p className="text-green-500 text-sm font-bold py-3">
                    $1, 499
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="text-center w-[49%] border rounded-lg text-white text-sm bg-violet-700 p-2 cursor-pointer">
                  Track Orders
                </button>
                <button className="text-center w-[49%] rounded-lg text-sm border-white border text-white cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-gray-600 h-60 md:w-220 rounded-lg shadow-lg p-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold">Order #12346</h2>
                <p className="bg-yellow-200 text-yellow-500 px-2 rounded-full">
                  Pending
                </p>
              </div>
              <p className="text-gray-300 text-xs">Placed on July 24, 2024</p>
              <div className="flex space-x-6 mt-6">
                <div>
                  <img src={Samsumg} alt="product" className="h-20" />
                </div>
                <div>
                  <h4 className="font-semibold">Samsung Galaxy S25 Ultra</h4>
                  <p className="text-gray-300 text-sm">Quanlity: 1</p>
                  <p className="text-green-500 text-sm font-bold py-3">
                    $1, 789
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="text-center w-[49%] border rounded-lg text-white text-sm bg-violet-700 p-2 cursor-pointer">
                  Track Orders
                </button>
                <button className="text-center w-[49%] rounded-lg text-sm border-white border text-white cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-gray-600 h-60 md:w-220 rounded-lg shadow-lg p-6">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold">Order #12347</h2>
                <p className="bg-red-200 text-red-500 px-2 rounded-full">
                  Cancelled
                </p>
              </div>
              <p className="text-gray-300 text-xs">Placed on June 6, 2024</p>
              <div className="flex space-x-6 mt-6">
                <div>
                  <img src={GalaxyUltra} alt="product" className="h-20" />
                </div>
                <div>
                  <h4 className="font-semibold">Samsung Galaxy S24 Ultra</h4>
                  <p className="text-gray-300 text-sm">Quanlity: 1</p>
                  <p className="text-green-500 text-sm font-bold py-3">
                    $1, 249
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="text-center w-[49%] border rounded-lg text-white text-sm bg-violet-700 p-2 cursor-pointer">
                  Track Orders
                </button>
                <button className="text-center w-[49%] rounded-lg text-sm border-white border text-white cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Account;
