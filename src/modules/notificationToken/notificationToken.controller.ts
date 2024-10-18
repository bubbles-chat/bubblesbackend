import { Request, Response } from "express";
import NotificationToken from "../../models/NotificationToken.model";

export const addToken = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params

    if (!token) {
        res.status(400).json({ message: "Please provide a token" })
        return
    }

    const doc = await NotificationToken.create({
        token,
        userId: req.authUser._id
    })

    res.status(200).json({ message: "Device token has been added", token: doc })
}

export const deleteToken = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params

    if (!token) {
        res.status(400).json({ message: "Please provide a token" })
        return
    }

    await NotificationToken.deleteOne({ token })

    res.status(200).json({ message: "A token has been deleted" })
}