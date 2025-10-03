import { ProductCard } from "../../../components";

export const ProductsList = ({ products }) => {
  return (
    <main>
      <section className="my-5">
        <div className="flex flex-wrap justify-center lg:flex-row">
          {products.map((product) => (
            <ProductCard key={product.$id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductsList;
