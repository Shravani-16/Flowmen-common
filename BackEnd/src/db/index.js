import mongoose from 'mongoose'
import { DB_NAME } from '../utils/constants.js'
import dotenv from 'dotenv';
dotenv.config();
const URI= process.env.MONGODB_URI
const connectDB = async() => {
    try {
       const connectionInstance = await mongoose.connect(`${URI}/${DB_NAME}`) 
       console.log(`\n MongoDB connected !! db host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error)
        process.exit(1)
    }
}


export default connectDB


