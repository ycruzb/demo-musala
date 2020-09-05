const connectToDatabase = require("../../../lib/mongoDB");
const ObjectId = require("mongodb").ObjectID;

export default async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = await db.collection("gateways");

  // expect { data: { gateway_id: "xxxx", device_uid: "xxxx" } }

  const gateway = await collection.findOne({
    _id: ObjectId(`${data.gateway_id}`),
  });

  if (!gateway) {
    res.status(400).end("Wrong Data");
  } else {
    let devices = gateway.devices.filter(
      (item) => item.uid !== data.device_uid
    );

    const result = await collection.updateOne(
      { _id: ObjectId(`${data.gateway_id}`) },
      { $set: { devices: devices } }
    );

    res.status(200).json({ result });
  }
};
