import mongoose from "mongoose";
import colors from 'colors'


export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL);
        const url = `${connection.host}:${connection.port}`
        console.log(colors.green.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}