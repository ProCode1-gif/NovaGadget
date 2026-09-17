import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const About = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  if (!token) {
    toast.error("Token not provided")
    navigate("/signup")
  }

  return (
    <>
      <Navbar />
      <main className="p-20 min-h-screen bg-black">
        <h3 className="text-white text-6xl text-center font-extrabold">
          NovaGadget
        </h3>
        <p className="text-white py-10 text-xl text-center">
          <span className="text-2xl italic">NovaGadget </span>
          is an ecommerce that sells all kinds of
          <span className="text-2xl italic"> Electronics Devices</span>.
        </p>
        <div className="space-y-10">
          <h5 className="text-white text-4xl text-center font-bold">
            Why NovaGadget?
          </h5>
          <ul className="text-white space-y-2">
            <li className="text-xl">Buy:
              <p className="text-sm text-white/60 mt-2"> Buy any electronic gadgets or acceessoies of your choice e.g, smartphone, laptop, headphone, earbud, earpod, smartwatch, extension, adaptor, cord, etc, </p>
            </li>
            <li className="text-xl">Return:
              <p className="text-sm text-white/60 mt-2"> You can return any device to us within 30-days</p>
            </li>
            <li className="text-xl">Delivery:
              <p className="text-sm text-white/60 mt-2">Your delivery is free if you buy something less than ₦70, 000</p>
            </li>
            <li className="text-xl">Secure Payment:
              <p className="text-sm text-white/60 mt-2">Your payment is very secure with us</p>
            </li>
            <li className="text-xl">Repair:
              <p className="text-sm text-white/60 mt-2">Bring any gadget or yours to be repair</p>
            </li>
            <li className="text-xl">Partner:
              <p className="text-sm text-white/60 mt-2">You can become ome of our seller by contaccting us on <Link to={""} className="text-blue-500 underline">email</Link></p>
            </li>
            <li className="text-xl">Swap:
              <p className="text-sm text-white/60 mt-2">You can swap your old phonne to new phone or to a second-hand phone. If you want to swap to new phone, you will havve to package your old phone with it's carton and it's follow-come accessories and make sure everything works fine</p>
            </li>
          </ul>
        </div>
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
};

export default About;
