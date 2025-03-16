import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
const client = new MongoClient(uri);

export default async function handler(req, res) {
  await client.connect();
  const database = client.db("Blogs"); // Replace with your database name
  const blogsCollection = database.collection("user_data_articles"); // Replace with your collection name

  const { id } = req.query; // Get blog ID from route params
  const { fields } = req.body; // Get fields to update from request body

  if (req.method === "PATCH") {
    try {
      const result = await blogsCollection.updateOne(
        { _id: ObjectId.createFromHexString(id) }, // Convert id to ObjectId
        { $set: fields }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    } finally {
      await client.close(); // Ensure the client is closed after the operation
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
