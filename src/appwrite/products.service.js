import { ID, Query, Permission, Role } from "appwrite";
import { tables, DATABASE_ID, PRODUCTS_TABLE_ID } from "./client";

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

// Delete row
export async function deleteProduct(id) {
  await tables.deleteRow({
    databaseId: DATABASE_ID,
    tableId: PRODUCTS_TABLE_ID,
    rowId: id,
  });
}
