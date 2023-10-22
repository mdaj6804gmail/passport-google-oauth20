import { connect } from "mongoose";
import "dotenv/config";

const connectDb = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting BD", error);
  }
};

export default connectDb;
