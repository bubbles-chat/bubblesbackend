import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    chats: [{ type: Schema.ObjectId, ref: 'Chat' }],
    connections: [{ type: Schema.ObjectId, ref: 'User' }],
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photoURL: String,
}, { timestamps: true })

const User = model('User', UserSchema)
export default User