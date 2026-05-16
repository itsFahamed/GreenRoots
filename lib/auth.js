import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  tls: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
});

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  database: mongodbAdapter(client.db("GreenRoots")),
  emailAndPassword: {
    enabled: true,
  },
});
