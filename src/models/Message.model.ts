import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
    chatId: { type: Schema.ObjectId, ref: 'Chat', required: true },
    sender: { type: Schema.ObjectId, ref: 'User', required: true },
    text: { type: String, required: false },
    attachmentsUrl: [{ url: String, mimeType: String }],
}, { timestamps: true })

const Message = model('Message', MessageSchema)
export default Message