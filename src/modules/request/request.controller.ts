import { Request, Response } from "express";
import ConnectionRequest from "../../models/Request.model";
import { notifyUser } from "../../services/fcm.service";
import { Types } from "mongoose";
import User from "../../models/User.model";
import Chat from "../../models/Chat.model";

export const addRequest = async (req: Request, res: Response): Promise<void> => {
    const { receiver } = req.params

    if (!receiver) {
        res.status(400).json({ message: "Receiver ID is required" })
        return
    }

    const receiverUser = await User.findById(receiver)

    if (!receiverUser) {
        res.status(404).json({ message: "Receiver doesn't exist" })
        return
    }

    const previousRequest = await ConnectionRequest.find({ sender: req.authUser._id, receiver, status: { $in: ['pending', 'accepted'] } })

    if (previousRequest.length > 0) {
        res.status(400).json({ message: "You have a pending request or you are already connected" })
        return
    }

    const request = await ConnectionRequest.create({
        sender: req.authUser._id, receiver
    })

    await notifyUser(Types.ObjectId.createFromHexString(receiver), {
        title: 'New connection request',
        body: `${req.authUser.displayName} sent a connection request`,
        imageUrl: req.authUser.photoURL && req.authUser.photoURL.length > 0 ? req.authUser.photoURL : undefined
    })

    res.status(201).json({ message: "Request sent successfully", request })
}

export const deleteRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({ message: "No request id was provided" })
        return
    }

    const request = await ConnectionRequest.findById(id)

    if (!request?.sender.equals(req.authUser._id)) {
        res.status(400).json({ message: "You can't cancel this request. You are not the sender" })
        return
    }

    const deletedRequest = await ConnectionRequest.findByIdAndDelete(id)

    if (!deletedRequest) {
        res.status(404).json({ message: "Reuqest not found" })
        return
    }

    res.status(200).json({ message: "Request deleted successfully", request: deletedRequest })
}

export const rejectRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({ message: "No request id was provided" })
        return
    }

    const request = await ConnectionRequest.findById(id)

    if (!request?.receiver.equals(req.authUser._id)) {
        res.status(400).json({ message: "You can't reject this request. You are not the receiver" })
        return
    }

    const rejectedRequest = await ConnectionRequest.findByIdAndUpdate(id, {
        status: 'rejected'
    }, { new: true })

    if (!rejectedRequest) {
        res.status(404).json({ message: "Reuqest not found" })
        return
    }

    res.status(200).json({ message: "Request has been rejected", request: rejectedRequest })
}

export const getSentRequestsForAUser = async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.authUser
    const requests = await ConnectionRequest.find({ sender: _id, status: 'pending' }).populate(['receiver', 'sender'])

    res.status(200).json({ message: "Requests found successfully", requests })
}

export const getPendingRequestForAUser = async (req: Request, res: Response): Promise<void> => {
    const { _id } = req.authUser
    const requests = await ConnectionRequest.find({ receiver: _id, status: 'pending' }).populate(['receiver', 'sender'])

    res.status(200).json({ message: "Requests found successfully", requests })
}

export const acceptReuqest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({ message: "No request id was provided" })
        return
    }

    const request = await ConnectionRequest.findById(id)

    if (!request?.receiver.equals(req.authUser._id)) {
        res.status(400).json({ message: "You can't accept this request. You are not the receiver" })
        return
    }

    const acceptedRequest = await ConnectionRequest.findByIdAndUpdate(id, {
        status: 'accepted'
    }, { new: true })

    if (!acceptedRequest) {
        res.status(404).json({ message: "Reuqest not found" })
        return
    }

    const chat = await Chat.create({
        participants: [{ user: acceptedRequest.sender }, { user: acceptedRequest.receiver }]
    })

    await User.findByIdAndUpdate(acceptedRequest.sender, {
        $push: {
            connections: acceptedRequest.receiver,
            chats: {
                $each: [chat._id],
                $position: 0
            }
        }
    })

    await User.findByIdAndUpdate(acceptedRequest.receiver, {
        $push: {
            connections: acceptedRequest.sender,
            chats: {
                $each: [chat._id],
                $position: 0
            }
        }
    })

    res.status(200).json({ message: 'Request has been accepted', request: acceptedRequest })
}