// pages/api/getAllData.js

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
      await client.connect();

      // Choose a name for your database
      const database = client.db("Blogs");

      // Choose a name for your collection
      const collection = database.collection("user_data_articles");
      const allData = await collection.find({}).toArray();

      res.status(200).json(allData);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
