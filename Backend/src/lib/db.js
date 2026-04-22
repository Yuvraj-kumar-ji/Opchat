import mongoose from 'mongoose';
import {ENV} from './env.js';

const connectDB = async () => {
  try {
    const {MONGO_URI} = ENV;
    if (!MONGO_URI) throw new Error('MONGO_URI is not defined in environment variables');
    
    const conn = await mongoose.connect(ENV.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connection with mongoDB: ${error.message}`);
        process.exit(1);    // Exit with failure on 1 And exit with success on 0
    }
}

export default connectDB;