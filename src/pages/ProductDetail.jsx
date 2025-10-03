import { useParams, Link } from "react-router-dom";
import { useProducts } from "/src/pages/Products/components/useProducts.jsx";
import { Rating } from "../components/Elements/Rating";

const PLACEHOLDER = "https://placehold.co/640x360?text=No+Image";

export const ProductDetail = () => {
  const { id } = useParams();
  const { items, loading, error } = useProducts();
  const product = items.find((p) => p.$id === id);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">
        Error: {error.message || "Failed to load"}
      </div>
    );
  if (!product) return <div className="p-6">Not found.</div>;

  const { name, poster, overview, long_description, price, in_stock, rating } =
    product;
  const imgSrc = poster && /^https?:\/\//i.test(poster) ? poster : PLACEHOLDER;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <nav className="mb-4 text-sm">
        <Link to="/products" className="underline">
          Products
        </Link>
      </nav>
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-80 object-cover rounded"
          onError={(e) => {
            e.currentTarget.oneerror = null;
            e.currentTarget.src = PLACEHOLDER;
          }}
        />
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-200">
            {name}
          </h1>
          {price != null && (
            <div className="text-2xl font-semibold mb-3">
              ${Number(price).toFixed(2)}
            </div>
          )}
          {overview && <p className="mb-3 text-gray-700">{overview}</p>}
          {long_description && (
            <div className="prose prose-sm">{long_description}</div>
          )}{" "}
          <span>
            <Rating rating={rating} />
          </span>
        </div>
      </div>
      <section>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-xl my-3">
            <p className="my-3"></p>
            <p className="my-4 select-none">
              <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">
                BEST SELLER
              </span>
              {in_stock ? (
                <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                  INSTOCK
                </span>
              ) : (
                <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                  OUT OF STOCK
                </span>
              )}

              <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">
                5 MB
              </span>
            </p>
            <p className="my-3">
              <button
                className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800`}
              >
                Add To Cart <i className="ml-1 bi bi-plus-lg"></i>
              </button>
              <button
                className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}
                disabled={product.in_stock ? "" : "disabled"}
              >
                Remove Item <i className="ml-1 bi bi-trash3"></i>
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
