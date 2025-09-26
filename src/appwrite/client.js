import { Client, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// New Tables API
export const tables = new TablesDB(client);

// IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const PRODUCTS_TABLE_ID =
  import.meta.env.VITE_APPWRITE_PRODUCTS_TABLE_ID ??
  import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID;

if (!PRODUCTS_TABLE_ID) {
  console.error(
    "Missing table id: set VITE_APPWRITE_PRODUCTS_TABLE_ID in .env"
  );
}
