import { Link } from "react-router-dom";
import { Rating } from "./Rating";

const PLACEHOLDER = "https://placehold.co/400x256?text=No+Image";

export const ProductCard = ({ product }) => {
  if (!product) return null; // defensive guard

  const { $id, name, long_description, poster, price, best_seller, rating } =
    product;
  const imgSrc = poster && /^https?:\/\//i.test(poster) ? poster : PLACEHOLDER;

  return (
    <div className="m-3 max-w-sm rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link
        to={`/products/${$id}`}
        className="relative"
        style={{ textDecoration: "none" }}
      >
        {best_seller && (
          <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">
            Best Seller
          </span>
        )}
        <img
          className="rounded-t-lg w-full h-64 object-cover"
          src={imgSrc}
          alt={name}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER;
          }}
        />
      </Link>

      <div className="p-5">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        {long_description && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {long_description}
          </p>
        )}
        <div className="flex items-center my-2">
          <Rating rating={rating} />
        </div>
        <p className="flex justify-between itmes-center mt-2">
          {typeof price !== "undefined" && (
            <span className="text-2xl dark:text-gray-200">
              <span>$</span>
              <span>{Number(price).toFixed(2)}</span>
            </span>
          )}
          <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
            Add To Cart <i className="ml-1 bi bi-plus-lg"></i>
          </button>
        </p>
      </div>
    </div>
  );
};
