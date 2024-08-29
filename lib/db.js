import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('connected to DB!');
  } catch (error) {
    console.log('Error connectiong to MongoDB', error);
  }
}

export default connectMongoDB;