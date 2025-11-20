import { useState, useMemo, useEffect } from "react";
import { FilterBar } from "./components/FilterBar";
import ProductList from "./components/ProductList";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../../appwrite/products.service";

export const Products = () => {
  const [show, setShow] = useState(false);
  // const { items, loading, error } = useProducts();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  // you can make these stateful if you add pagination later
  const limit = 30;
  const offset = 0;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // optional: memoize the request args so useEffect deps are simple
  const req = useMemo(() => ({ q, limit, offset }), [q, limit, offset]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const rows = await searchProducts(req); // ← your function
        if (alive) setItems(rows || []);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [req]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <main>
      <section className="my-4">
        <div className="my-5 flex justify-between">
          <span className="text-2xl font-semibold dark:text-slate-100 mb-5">
            {q ? <>Results for “{q}”</> : `All eBooks (${items.length})`}
          </span>
          <span>
            <button
              onClick={() => setShow(!show)}
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700"
              type="button"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>
          </span>
        </div>

        <div className="flex flex-wrap justify-center lg:flex-row"></div>
        {show && <FilterBar setShow={setShow} />}
      </section>
      {items.length === 0 ? (
        <p className="text-gray-500">No results found.</p>
      ) : (
        <ProductList products={items} />
      )}
    </main>
  );
};
