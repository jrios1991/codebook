import { useCallback, useEffect, useState } from "react";
import {
  listProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../appwrite/products.service";

export function useProducts() {
  const [items, setItems] = useState([]); // rows, not documents
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listProducts(); // returns res.rows
      setItems(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const add = useCallback(async (row) => {
    const created = await createProduct(row); // returns the created row
    setItems((prev) => [created, ...prev]);
  }, []);

  const patch = useCallback(async (id, rowPatch) => {
    const updated = await updateProduct(id, rowPatch); // returns updated row
    setItems((prev) => prev.map((it) => (it.$id === id ? updated : it)));
  }, []);

  const remove = useCallback(async (id) => {
    await deleteProduct(id);
    setItems((prev) => prev.filter((it) => it.$id !== id));
  }, []);

  return { items, loading, error, refresh, add, patch, remove };
}
