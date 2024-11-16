import { Request, Response } from "express";
import Message from "../../models/Message.model";
import { uploadFile } from "../../cloudinary/cloudinary.utils";
import { getResourceType } from "../../utils/fileTypes";

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
        .populate('sender')

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

export const uploadAttachment = async (req: Request, res: Response) => {
    try {
        const file = req.file
        const { chatId } = req.params

        if (!chatId) {
            res.status(400).json({ message: "Chat ID is required" })
            return
        }

        if (!file) {
            res.status(400).json({ message: "No file uploaded" })
            return
        }

        const uploadResult = await uploadFile(file.path, file.originalname, getResourceType(file.mimetype), chatId)

        res.status(201).json({
            message: "File uploaded",
            data: {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
                type: uploadResult.type
            }
        })
    } catch (e) {
        console.error('uploadAttachment:', e);
        res.status(500).json({ message: "Upload failed" })
    }
}