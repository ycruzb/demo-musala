const connectToDatabase = require("../../../lib/mongoDB");

export default async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  data.devices = [];

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = await db.collection("gateways");

  const result = await collection.insertOne(data);

  res.status(200).json({ result });
};
