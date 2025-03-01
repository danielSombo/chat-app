import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Serveur en marche sur le port ${PORT}`);
    connectDB()
});