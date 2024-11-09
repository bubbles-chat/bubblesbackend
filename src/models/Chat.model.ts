import { model, Query, Schema } from "mongoose";

const ChatSchema = new Schema({
    participants: [{
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        isAdmin: { type: Boolean }
    }],
    lastMessage: { type: Schema.ObjectId, ref: 'Message' },
    type: {
        type: String,
        enum: ['single', 'group'],
        default: 'single'
    },
    chatName: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String, required: false, default: ''
    }
}, { timestamps: true });

ChatSchema.pre('find', function () {
    this.populate('participants.user');
})

const Chat = model('Chat', ChatSchema)
export default Chat