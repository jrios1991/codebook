import { useCallback, useEffect, useState } from "react";
import {
  listProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../../appwrite/products.service";
import {
  ensureAnonymousSession,
  tables, // from client.js
  DATABASE_ID,
  PRODUCTS_TABLE_ID,
} from "../../../appwrite/client";

export function useProducts(id) {
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
  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        await ensureAnonymousSession();
        // Tables API
        if (typeof tables.getRow === "function") {
          const row = await tables.getRow({
            databaseId: DATABASE_ID,
            tableId: PRODUCTS_TABLE_ID,
            rowId: id,
          });
          setItems(row);
        } else {
          // Fallback if you still use Databases
          const { databases } = await import("../../../appwrite/client");
          const doc = await databases.getDocument(
            DATABASE_ID,
            PRODUCTS_TABLE_ID,
            id
          );
          setItems(doc);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return { items, loading, error, refresh, add, patch, remove };
}
