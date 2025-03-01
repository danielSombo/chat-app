import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body
    try {
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires"});
        }

        // hasher le mot de passe
        if (password.length < 6) {
            return res.status(400).json({ message: "Le mot de passe doit comporter au moins 6 caractères"});
        }

        const user = await User.findOne({email})

        if (user) return res.status(400).json({ message: "L'email existe déjà" });

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User ({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            // générer jwt token ici
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilPic: newUser.profilPic 
            })
        } else {
            res.status(400).json({ message: "Donneés utilisateur non valides" });
        }

    } catch (error) {
        console.log("Erreur dans le contrôleur d'inscription", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({ message: "Informations d'identification non valides" })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Informations d'identification non valides" })
        }

        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilPic: user.profilPic 
        })
    } catch (error) {
        console.log("Erreur dans le contrôleur de connexion", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" }) 
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Déconnexion réussie" })
    } catch (error) {
        console.log("Erreur dans le contrôleur de déconnexion", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" }) 
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;
    
        if (!profilePic) {
            return res.status(400).json({ message: "La photo de profil est obligatoire" });
        }
    
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
    
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Erreur dans la mise à jour du profil:", error);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Erreur dans le contrôleur checkAuth", error.message);
        res.status(500).json({ message: "Erreur de serveur interne" });
    }
};
