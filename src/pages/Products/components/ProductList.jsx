export default function ProductList({ items }) {
  if (!items.length) return <p>No products available.</p>;

  return (
    <ul className="space-y-4">
      {items.map((product) => (
        <li key={product.$id} className="flex items-start gap-4 border-b pb-4">
          {/* Poster */}
          {product.poster ? (
            <img
              src={product.poster}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
              No Image
            </div>
          )}

          {/* Text */}
          <div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            {product.overview && (
              <p className="text-sm text-gray-700">{product.overview}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
