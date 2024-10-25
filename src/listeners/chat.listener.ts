import { DefaultEventsMap, Server, Socket } from "socket.io"
import Message from "../models/Message.model"
import Chat from "../models/Chat.model"
import { notifySomeUsers } from "../services/fcm.service"

const registerChatHandler = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const joinChatRoom = (payload: string | string[]) => {
        socket.join(payload)
    }

    const leaveChatRoom = (payload: string) => {
        socket.leave(payload)
    }

    const newMessage = async (payload: { aattachmentsUrl: string[]; chatId: string; text: string }) => {
        try {
            const message = await Message.create({
                attachmentsUrl: payload.aattachmentsUrl,
                chatId: payload.chatId,
                sender: socket.data.user._id,
                text: payload.text,
                createdAt: Date.now()
            })
            const chat = await Chat.findByIdAndUpdate(payload.chatId, {
                lastMessage: message._id
            })
            const users = chat?.participants.filter(id => id !== socket.data.user._id) ?? []

            await notifySomeUsers(users, {
                title: chat?.chatName ? chat.chatName : socket.data.user.displayName,
                body: payload.text
            })
            io.to(payload.chatId).emit('chat:messageAdded', { chatId: payload.chatId, message })
        } catch (e) {
            console.error('newMessage', e);
        }
    }

    socket.on('chat:joinRoom', joinChatRoom)
    socket.on('chat:leaveRoom', leaveChatRoom)
    socket.on('chat:newMessage', newMessage)
}

export default registerChatHandler