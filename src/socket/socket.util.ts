import { Types } from "mongoose";
import { io } from "./socketServer";

export function emitToUser(userId: string | Types.ObjectId, event: string, ...args: any[]): void {
    const sockets = io.sockets.sockets

    sockets.forEach(socket => {
        if (socket.data.user._id.equals(userId)) {
            io.to(socket.id).emit(event, ...args)
            return
        }
    })
}