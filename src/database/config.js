//this is where we are able to make a connection to our mongodb database
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDb was succesfully connected");
  } catch (error) {
    console.log("There was an error with connectignto mongodb", error.message);
    process.exit(1);
  }
};
