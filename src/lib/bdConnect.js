import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
  text_services: "text_services",
   user: "user",
  // bookingCollection: "test_booking"
};

const uri = process.env.NEXT_PUBLIC_MONGODB_URI; // ✅ Fixed
const dbName = process.env.DB_NAME;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedClient = null;

export async function dbConnect(collectionName) {
  if (!cachedClient) {
    await client.connect();
    cachedClient = client;
  }

  const db = cachedClient.db(dbName);
  return db.collection(collectionName); // ✅ Now will return the collection
}
