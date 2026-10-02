const OrderProduct = ({ status, createdAt, imageUrl, name, quantity, price }) => {
  return (
    <div className="bg-gray-600 minh-60 md:w-220 rounded-lg shadow-lg p-6">
      <div className="flex justify-between">
        <p className="text-black px-2 rounded-full">{status}</p>
      </div>
      <p className="text-gray-300 text-xs">
        Placed on {new Date(createdAt).toLocaleDateString()}
      </p>
      <div className="flex space-x-6 mt-6">
        <div>
          <img
            src={imageUrl}
            alt={name}
            className="h-20"
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-gray-300 text-sm">Quantity: {quantity}</p>
          <p className="text-green-500 text-sm font-bold py-3">
            {new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
          }).format(price)}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        {/* <button className="text-center w-[49%] border rounded-lg text-white text-sm bg-violet-700 p-2 cursor-pointer">
          Track Orders
        </button> */}
        <button className="text-center w-[49%] rounded-lg text-sm border-white border text-white cursor-pointer"
        onClick={"/productDetail"}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderProduct;
