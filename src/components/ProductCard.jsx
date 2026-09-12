import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({
  imageUrl,
  description,
  price,
  name,
  brand,
  category,
  stock,
  features,
  onClick
}) => {
  const navigate = useNavigate();

  const placeOrder = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token not provided");
      navigate("/signup");
    }

    try {
      const order = await axios.post("https://novagadget-server.onrender.com/user/placeOrder", product);
      return order.data.order;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="bg-white/60 rounded-lg shadow-md m-3 hover:scale-103 transition-transform duration-300 space-y-3 cursor-pointer" onClick={onClick}>
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="md:p-6 p-2 space-y-3">
        <h3 className="text-lg font-bold text-center">{name}</h3>
        <span className="text-lg font-semibold text-gray-600">{brand}</span>
        <span className="text-lg font-semibold text-gray-600">{category}</span>
        <span className="text-lg font-semibold text-gray-600">{stock}</span>
        <p className="text-gray-600 mt-1 mb-3">{description}</p>
        <p className="text-black font-bold">
          {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(price)}
        </p>
        <ul className="list-disc list-inside mt-2">
          {features?.map((feature, index) => (
            <li key={index} className="text-gray-600">
              {feature}
            </li>
          ))}
        </ul>
        <div>
          
        <button
          className="bg-indigo-500 text-white w-full rounded py-3 font-bold hover:bg-indigo-600"
          onClick={() => placeOrder}
        >
          Place Order
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
