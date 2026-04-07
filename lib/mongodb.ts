import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Fix for Next.js hot reload issue
declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;