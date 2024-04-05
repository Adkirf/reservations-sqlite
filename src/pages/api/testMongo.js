// pages/api/testDb.js
import clientPromise from "../../lib/mongoDB";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("Blog"); // Replace 'yourDatabaseName' with your actual database name

    // Perform a simple operation, like fetching documents from a collection
    const data = await db.collection("challenges").find({}).limit(20).toArray(); // Replace 'yourCollectionName' with the name of your collection

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to connect to the database" });
  }
}
//tets
