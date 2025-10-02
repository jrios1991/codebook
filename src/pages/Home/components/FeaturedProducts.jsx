import React from "react";
import { ProductCard } from "../../../components/Elements/ProductCard";
import { useProducts } from "../../Products/components/useProducts";

// put your 3 featured IDs here
const FEATURED_IDS = [
  "68d4982d000bb689510e",
  "68d4982d000bb8e1fae5",
  "68d4982d000bb20c2163",
];

export const FeaturedProducts = () => {
  const { items, loading, error } = useProducts(); // ← use items (array)

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong.</p>;

  // pick by ID, ignore any that aren't in the list yet
  let featured = FEATURED_IDS.map((id) => items.find((p) => p.$id === id))
    .filter(Boolean)
    .slice(0, 3);

  // optional: backfill if one of the IDs is missing
  if (featured.length < 3) {
    const backfill = items
      .filter((p) => !FEATURED_IDS.includes(p.$id))
      .slice(0, 3 - featured.length);
    featured = [...featured, ...backfill];
  }

  return (
    <section className="my-20">
      <h1 className="text-2xl text-center font-semibold mb-5">
        Featured eBooks
      </h1>
      <div className="flex flex-wrap justify-center lg:flex-row">
        {featured.map((p) => (
          <ProductCard key={p.$id} product={p} />
        ))}
      </div>
    </section>
  );
};
