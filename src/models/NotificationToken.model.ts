import { model, Schema } from "mongoose";

const NotificationTokenSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
        unique: true
    }
})

const NotificationToken = model('NotificationToken', NotificationTokenSchema)
export default NotificationToken