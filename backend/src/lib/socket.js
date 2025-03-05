import { Server } from "socket.io"
import http from "http"
import express from "express"
import { Socket } from "dgram";
import { log } from "console";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

// Utiliser pour stocker les utilisateurs en ligne
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("Un utilisateur connecté", socket.id);

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("Un utilisateur déconnecté", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
    
})

export {io, app, server};