import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    chats: [{ type: Schema.ObjectId }],
    connections: [{ type: Schema.ObjectId }],
    displayName: String,
    email: {
        type: String,
        unique: true
    },
    pendingRequests: [{ type: String }],
    pendingRequestsSeen: Boolean,
    photoURL: String,
    sentRequests: [{ type: String }]
})

const User = model('User', UserSchema)
export default User