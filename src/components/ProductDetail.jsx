const ProductDetail = ({ imageUrl, name, brand, cartegory, stock, description, price, features }) => {
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
      </div>
    </div>
  )
}

export default ProductDetail