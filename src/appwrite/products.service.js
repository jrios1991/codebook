import { ID, Query, Permission, Role } from "appwrite";
import { tables, DATABASE_ID, PRODUCTS_TABLE_ID } from "./client";
import { ensureAnonymousSession } from "./client";

await ensureAnonymousSession();
// List rows
export async function listProducts() {
  const res = await tables.listRows({
    databaseId: DATABASE_ID,
    tableId: PRODUCTS_TABLE_ID,
  });
  return res.rows; // new API returns rows instead of documents
}

// Create row
export async function createProduct(input) {
  const permissions = [
    Permission.read(Role.any()),
    Permission.create(Role.any()),
    Permission.update(Role.any()),
    Permission.delete(Role.any()),
  ];

  const res = await tables.createRow({
    databaseId: DATABASE_ID,
    tableId: PRODUCTS_TABLE_ID,
    rowId: ID.unique(),
    data: input,
    permissions,
  });

  return res;
}
export async function getProductById(id) {
  // returns the document or throws if not found
  return tables.getDocument(DATABASE_ID, PRODUCTS_TABLE_ID, id);
}
export async function getProductBySlug(slug) {
  const res = await tables.listDocuments(DATABASE_ID, PRODUCTS_TABLE_ID, [
    Query.equal("slug", slug),
    Query.limit(1),
  ]);
  return res.documents[0] || null;
}

export async function listSearch({ q = "", limit = 20, offset = 0 } = {}) {
  if (!q || !q.trim()) {
    return listProducts({ limit, offset });
  }
  const queries = [Query.limit(limit), Query.offset(offset)];
  try {
    queries.unshift(
      Query.or([
        Query.search("name", q.trim()),
        Query.search("overview", q.trim()),
      ])
    );
  } catch {
    queries.unshift(Query.search("name", q.trim())); // fallback if Query.or isn't available
  }
  const res = await tables.listRows({
    databaseId: DATABASE_ID,
    tableId: PRODUCTS_TABLE_ID,
    queries,
  });
  console.log("[searchProducts] term:", "count:", res.rows?.length ?? 0);
  return res.rows;
}
// Update row
export async function updateProduct(id, patch) {
  const res = await tables.updateRow({
    databaseId: DATABASE_ID,
    tableId: PRODUCTS_TABLE_ID,
    rowId: id,
    data: patch,
  });
  return res;
}

const explain = (e) =>
  console.error("searchProducts 400:", {
    message: e?.message,
    code: e?.code,
    response: e?.response, // Appwrite often puts the human reason here
  });

export async function searchProducts({ q = "", limit = 20, offset = 0 } = {}) {
  await ensureAnonymousSession();

  const term = (q ?? "").trim();
  // Full-text indexes usually need ≥ 2 characters; short tokens can 400.
  if (term.length < 2) {
    const r = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: PRODUCTS_TABLE_ID,
      queries: [Query.limit(limit), Query.offset(offset)],
    });
    return r.rows;
  }

  const queries = [
    Query.search("name", term), // make sure the column id is EXACTLY "name"
    Query.limit(limit),
    Query.offset(offset),
  ];

  try {
    const r = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: PRODUCTS_TABLE_ID,
      queries,
    });
    return r.rows;
  } catch (e) {
    explain(e);
    // graceful fallback so the UI still shows something
    const r = await tables.listRows({
      databaseId: DATABASE_ID,
      tableId: PRODUCTS_TABLE_ID,
      queries: [Query.limit(limit), Query.offset(offset)],
    });
    return r.rows;
  }
}
// Delete row
export async function deleteProduct(id) {
  await tables.deleteRow({
    databaseId: DATABASE_ID,
    tableId: PRODUCTS_TABLE_ID,
    rowId: id,
  });
}
