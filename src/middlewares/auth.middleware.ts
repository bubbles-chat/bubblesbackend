import { NextFunction, Request, Response } from "express";
import admin from 'firebase-admin'
import User from "../models/User.model";

const checkAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            res.status(401).json({ message: 'Missing auth headers' })
            return
        }

        const token = authHeader.split(' ')[1]

        if (!token) {
            res.status(401).json({ message: 'Missing token' })
            return
        }

        const verificationResult = await admin.auth().verifyIdToken(token)
        const user = await User.findOne({ email: verificationResult.email })
        
        if (user) {
            req.authUser = user.toObject()
        }

        next()
    } catch (e) {
        console.error(e);

        res.status(401).json({ message: 'Authorization failed' })
    }
}

export default checkAuth