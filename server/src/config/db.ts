import mongoose from "mongoose";
import 'dotenv/config'

//connecting to database
export default async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('Database connected successfully!')
    } catch (error) {
        console.log('Something went wrong')
        process.exit(1)
    }
}