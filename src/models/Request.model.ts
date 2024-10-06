import { model, Schema } from "mongoose";

const RequestSchema = new Schema({
    sender: { type: Schema.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    sentAt: { type: Date, default: Date.now },
    respondedAt: Date
})

const Request = model('Request', RequestSchema)
export default Request