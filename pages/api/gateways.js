const connectToDatabase = require("../../lib/mongoDB");

module.exports = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collectionG = await db.collection("gateways");

  const gateways = await collectionG.find({}).toArray();

  res.status(200).json({ gateways });
};
