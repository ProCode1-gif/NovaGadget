import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const AddToCart = ({
  imageUrl,
  name,
  brand,
  cartegory,
  stock,
  description,
  price,
  features,
}) => {
  const addToCart = async () => {
    const res = await axios.post(
      "https://novagadget-server.onrender.com/user/addToCart",
    );

    return res.data;
  };

  const addToCartMutation = useMutation({
    mutationFn: addToCart,

    onSuccess: (data) => {
      return data;
    },

    onError: (error) => {
      toast.error(error.response?.data?.message)
    },
  });
  
  return (
    <div
      className="bg-white/60 rounded-lg shadow-md m-3 hover:scale-103 transition-transform duration-300 space-y-3 cursor-pointer"
      >
      <img
        src={imageUrl}
          alt={name}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="md:p-6 p-2 space-y-3">
        <h3 className="text-lg font-bold text-center">{name}</h3>
        <span className="text-lg font-semibold text-gray-600">{brand}</span>
        <span className="text-lg font-semibold text-gray-600">{cartegory}</span>
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
            onClick={() => addToCartMutation}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
