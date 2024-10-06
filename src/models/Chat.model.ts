import { model, Schema } from "mongoose";

const ChatSchema = new Schema({
    participants: [{ type: Schema.ObjectId, required: true, ref: 'User' }],
    lastMessage: { type: Schema.ObjectId, ref: 'Message' },
    type: {
        type: String,
        enum: ['single', 'group'],
        default: 'single'
    },
    chatName: {
        type: String,
        required: false
    }
}, { timestamps: true });

const Chat = model('Chat', ChatSchema)
export default Chat