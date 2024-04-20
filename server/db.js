import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect("mongodb+srv://simoneaballard:ptOADHVogJtfrhjg@cluster0.ly974xk.mongodb.net/telehealth");
        console.log(`MongoDb Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

export default connectToDatabase;