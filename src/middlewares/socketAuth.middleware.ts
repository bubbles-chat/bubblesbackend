import { DefaultEventsMap, ExtendedError, Socket } from "socket.io"
import User from "../models/User.model"
import admin from 'firebase-admin'

const socketAuth = async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: (err?: ExtendedError) => void) => {
    try {
        const auth = socket.handshake.auth

        if (!auth) {
            next(new Error("Auth handshake is missing"))
        }

        const token = auth.token.split(' ')[1]

        if (!token) {
            next(new Error("Token was not provided"))
        }

        const verificationResult = await admin.auth().verifyIdToken(token)
        const user = await User.findOne({ email: verificationResult.email })

        if (!user) {
            next(new Error("User not found"))
        }

        socket.data.user = user

        next()
    } catch (e) {
        const err = e as Error

        console.error("Socket auth middleware", err);
        next(err)
    }
}

export default socketAuth