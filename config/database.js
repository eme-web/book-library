import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const mongo_uri = process.env.mongo_uri
if(mongo_uri === undefined){
  console.log("mongo uri is undefined")
}


const option = {
  socketTimeoutMS: 30000,
};

const connectDb = async () => {
  try {
    await mongoose.connect(mongo_uri || "", option);
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;