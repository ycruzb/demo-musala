const connectToDatabase = require("../../../lib/mongoDB");
const ObjectId = require("mongodb").ObjectID;

export default async (req, res) => {
  const {
    query: { id },
  } = req;

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = await db.collection("gateways");

  const gateway = await collection.findOne({ _id: ObjectId(`${id}`) });

  res.status(200).json({ gateway });
};
