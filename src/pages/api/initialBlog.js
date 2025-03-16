//pages/api/saveData.js
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";
import { MongoClient } from "mongodb";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable();
    let client;

    try {
      // Ensure uploads directory exists
      await mkdir(join(process.cwd(), "public/uploads"), { recursive: true });

      // Update the formidable parsing
      const formData = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      const { fields, files } = formData;
      const { title, story, label, author, date, summary } = fields;
      const image = files.image[0];

      client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();

      const database = client.db("Blogs");
      const collection = database.collection("user_data_articles");

      // Save image to public/uploads folder
      const bytes = await readFile(image.filepath);
      const filePath = join(
        process.cwd(),
        "public/uploads",
        image.originalFilename
      );
      await writeFile(filePath, bytes);

      const imageUrl = `/uploads/${image.originalFilename}`; // Define the public URL

      const newStory = {
        title,
        story,
        label,
        summary,
        imageUrl,
        author,
        date,
        createdAt: new Date(),
      };

      await collection.insertOne(newStory);
      res.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong! Error --------------> ${error}`,
      });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
