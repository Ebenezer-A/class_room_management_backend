import mongoose from 'mongoose';
import * as envVars from './env.js';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(envVars.mongo_url);
    console.log(`MongoDB Connected: ${envVars.mongo_url}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
