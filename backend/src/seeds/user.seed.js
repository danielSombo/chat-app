import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Male Users
    {
        email: "alex@gmail.com",
        fullName: "Alex N'Guessan",
        password: "123456",
        profilePic: "",
    },
    {
        email: "anessi@gmail.com",
        fullName: "Anessi Boka",
        password: "123456",
        profilePic: "",
    },
    

    // Female Users
    {
        email: "bene@gmail.com",
        fullName: "Bénédicte Goudjanou",
        password: "123456",
        profilePic: "",
    },
    {
        email: "jeanny@gmail.com",
        fullName: "Jeanny Kassy",
        password: "123456",
        profilePic: "",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Call the function
seedDatabase();