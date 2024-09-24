import mongoose from "mongoose";

let connection: typeof mongoose;
const url = process.env.MONGO_URI;

if (!url) throw Error("Missing env variable 'MONGO_URI'");

const startDb = async () => {
  try {
    if (!connection) connection = await mongoose.connect(url);
  } catch (error) {
    throw Error((error as any).message);
  }
};

export default startDb;
