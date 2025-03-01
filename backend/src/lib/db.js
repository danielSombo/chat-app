import mongoose from "mongoose";

export const connectDB= async () => {
try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connectée: ${conn.connection.host}`);
} catch (error) {
    console.log("Erreur de connexion à MongoDB", error);
    
}
};