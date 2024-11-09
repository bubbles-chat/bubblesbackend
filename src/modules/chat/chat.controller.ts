import { Request, Response } from "express";
import Chat from "../../models/Chat.model";
import User from "../../models/User.model";
import { notifyUser } from "../../services/fcm.service";
import { io } from "../../io";
import { uploadFile } from "../../cloudinary/cloudinary.utils";
import { getResourceType } from "../../utils/fileTypes";

export const createGroupChat = async (req: Request, res: Response) => {
    const { chatName } = req.body
    const requesterId = req.authUser._id

    if (!chatName) {
        res.status(400).json({ message: "Chat name is required" })
        return
    }

    const chat = await Chat.create({
        chatName,
        participants: [{ user: requesterId, isAdmin: true }],
        type: 'group'
    })

    const user = await User.findByIdAndUpdate(requesterId, {
        $push: {
            chats: {
                $each: [chat._id],
                $position: 0
            }
        }
    }, { new: true }).populate(['connections', 'chats'])

    res.status(201).json({ message: "Group chat created", chat, user })
}

export const addUserToGroupChat = async (req: Request, res: Response) => {
    const { userId, chatId } = req.params
    const requesterId = req.authUser._id.toString()

    if (!userId) {
        res.status(400).json({ message: "User ID is required" })
        return
    }

    if (!chatId) {
        res.status(400).json({ message: "Chat ID is required" })
        return
    }

    let user = await User.findById(userId)

    if (!user) {
        res.status(404).json({ message: "User not found" })
        return
    }

    let chat = await Chat.findById(chatId)

    if (chat?.type !== 'group') {
        res.status(400).json({ message: "You can't add participants to a non-group chat" })
        return
    }

    const participants = chat?.participants
    const userIds = participants.map(participant => participant.user._id.toString())
    const requesterIndex = userIds.indexOf(requesterId)

    if (requesterIndex < 0) {
        res.status(400).json({ message: "You are not a participant" })
        return
    }

    if (!participants[requesterIndex].isAdmin) {
        res.status(400).json({ message: "You are not an admin" })
        return
    }

    if (userIds.includes(userId)) {
        res.status(400).json({ message: "User is already a participant" })
        return
    }

    chat = await Chat.findByIdAndUpdate(chatId, {
        $push: {
            participants: { user: user?._id, isAdmin: false }
        }
    }, { new: true })

    user = await User.findByIdAndUpdate(userId, {
        $push: {
            chats: {
                $each: [chat?._id],
                $position: 0
            }
        }
    })

    if (!chat) {
        res.status(404).json({ message: "Chat not found" })
        return
    }

    if (user) {
        await notifyUser(user?._id, {
            title: "Added to chat",
            body: `An admin added you to ${chat.chatName}`
        })
        io.to(chat._id.toString()).emit('chat:userAdded', { chatId, participant: { user, isAdmin: false } })
    }

    res.status(200).json({ message: "User added successfully", chat })
}

export const changeParticipantRoleToAdmin = async (req: Request, res: Response) => {
    const { userId, chatId } = req.params
    const requesterId = req.authUser._id.toString()

    if (!userId) {
        res.status(400).json({ message: "User ID is required" })
        return
    }

    if (!chatId) {
        res.status(400).json({ message: "Chat ID is required" })
        return
    }

    const user = await User.findById(userId)

    if (!user) {
        res.status(404).json({ message: "User not found" })
        return
    }

    let chat = await Chat.findById(chatId)

    if (chat?.type !== 'group') {
        res.status(400).json({ message: "You can't modify participants' role in a non-group chat" })
        return
    }

    const participants = chat?.participants
    const userIds = participants.map(participant => participant.user._id.toString())
    const requesterIndex = userIds.indexOf(requesterId)

    if (requesterIndex < 0) {
        res.status(400).json({ message: "You are not a participant" })
        return
    }

    if (!participants[requesterIndex].isAdmin) {
        res.status(400).json({ message: "You are not an admin" })
        return
    }

    chat = await Chat.findOneAndUpdate(
        { _id: chatId, "participants.user": userId },
        { $set: { "participants.$.isAdmin": true } },
        { new: true }
    )

    await notifyUser(user._id, {
        title: "Role update",
        body: `You are an admin in ${chat?.chatName}`
    })

    if (chat) {
        io.to(chat._id.toString()).emit("chat:userRoleChanged", { chatId, userId })
    }

    res.status(200).json({ message: "Changed user role", chat })
}

export const removeParticipant = async (req: Request, res: Response) => {
    const { userId, chatId } = req.params
    const requesterId = req.authUser._id.toString()

    if (!userId) {
        res.status(400).json({ message: "User ID is required" })
        return
    }

    if (!chatId) {
        res.status(400).json({ message: "Chat ID is required" })
        return
    }

    let user = await User.findById(userId)

    if (!user) {
        res.status(404).json({ message: "User not found" })
        return
    }

    let chat = await Chat.findById(chatId)

    if (chat?.type !== 'group') {
        res.status(400).json({ message: "You can't modify participants' role in a non-group chat" })
        return
    }

    const participants = chat?.participants
    const userIds = participants.map(participant => participant.user._id.toString())
    const requesterIndex = userIds.indexOf(requesterId)
    const userIndex = userIds.indexOf(userId)

    if (requesterIndex < 0) {
        res.status(400).json({ message: "You are not a participant" })
        return
    }

    if (!participants[requesterIndex].isAdmin) {
        res.status(400).json({ message: "You are not an admin" })
        return
    }

    if (userIndex < 0) {
        res.status(400).json({ message: "User is not a participant" })
        return
    }

    if (participants[userIndex].isAdmin) {
        res.status(400).json({ message: "You can't remove an admin" })
        return
    }

    chat = await Chat.findByIdAndUpdate(chatId, {
        $pull: {
            participants: {
                user: {
                    $eq: userId
                }
            }
        }
    })

    user = await User.findByIdAndUpdate(userId, {
        $pull: {
            chats: chat?._id
        }
    })

    if (user && chat) {
        await notifyUser(user._id, {
            body: `An admin removed you from ${chat?.chatName}`,
            title: "Removed from chat"
        })
        io.to(chat._id.toString()).emit('chat:userRemoved', { chatId, userId: user._id })
    }

    res.status(200).json({ message: "Removed participant", chat })
}

export const changeGroupChatPhoto = async (req: Request, res: Response) => {
    const file = req.file
    const { chatId } = req.params
    const requesterId = req.authUser._id.toString()

    if (!chatId) {
        res.status(400).json({ message: "Chat ID is required" })
        return
    }

    if (!file) {
        res.status(400).json({ message: "No file uploaded" })
        return
    }

    let chat = await Chat.findById(chatId)

    if (chat?.type !== 'group') {
        res.status(400).json({ message: "You can't modify participants' role in a non-group chat" })
        return
    }

    const participants = chat?.participants
    const userIds = participants.map(participant => participant.user._id.toString())
    const requesterIndex = userIds.indexOf(requesterId)

    if (requesterIndex < 0) {
        res.status(400).json({ message: "You are not a participant" })
        return
    }

    if (!participants[requesterIndex].isAdmin) {
        res.status(400).json({ message: "You are not an admin" })
        return
    }

    const uploadResult = await uploadFile(file.path, 'chatPhoto', getResourceType(file.mimetype), chatId)
    chat = await Chat.findByIdAndUpdate(chatId, {
        photoUrl: uploadResult.secure_url
    }, { new: true })

    if (chat) {
        io.to(chat._id.toString()).emit("chat:photoUpdated", { chatId, url: uploadResult.secure_url })
    }

    res.status(200).json({
        message: "File uploaded",
        chat
    })
}