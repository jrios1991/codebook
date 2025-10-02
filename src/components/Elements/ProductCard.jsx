import { Link } from "react-router-dom";

const PLACEHOLDER = "https://placehold.co/400x256?text=No+Image";
export const ProductCard = ({ product }) => {
  if (!product) return null; // defensive guard

  const { name, overview, poster, price } = product;
  const imgSrc = poster && /^https?:\/\//i.test(poster) ? poster : PLACEHOLDER;

  return (
    <div className="m-3 max-w-sm rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <Link to="/" className="relative" style={{ textDecoration: "none" }}>
        <span className="absolute top-4 left-2 px-2 bg-orange-500 bg-opacity-90 text-white rounded">
          Best Seller
        </span>
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
        {overview && (
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {overview}
          </p>
        )}
        {typeof price !== "undefined" && (
          <div className="font-semibold">${Number(price).toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};
