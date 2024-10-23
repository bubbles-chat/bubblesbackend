import { Request, Response } from "express";
import Message from "../../models/Message.model";

export const getMessages = async (req: Request, res: Response) => {
    const { id } = req.params
    const { limit = 10, skip = 0 } = req.query


    if (!id) {
        res.status(400).json({ message: 'Chat id is required' })
    }

    const messages = await Message.find({ chatId: id })
        .sort({ createdAt: 'desc' })
        .skip(Number(skip))
        .limit(Number(limit))

    res.status(200).json({ message: 'Messages found', messages })
}

export const getMessage = async (req: Request, res: Response) => {
    let { id } = req.params

    if (!id) {
        res.status(400).json({ message: "Message id is required" })
        return
    }

    const message = await Message.findById(id)

    if (!message) {
        res.status(404).json({ message: "Message not found" })
        return
    }

    res.status(200).json({ message })
}