import mongoose from "mongoose";

const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri);
    console.log('connected to DB!');
  } catch (error) {
    console.log('Error connectiong to MongoDB', error);
  }
}

export default connectMongoDB; 