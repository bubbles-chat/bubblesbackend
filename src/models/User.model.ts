import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    chats: [{ type: Schema.ObjectId }],
    connections: [{ type: Schema.ObjectId }],
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    pendingRequests: [{ type: String }],
    pendingRequestsSeen: Boolean,
    photoURL: String,
    sentRequests: [{ type: String }]
})

const User = model('User', UserSchema)
export default User