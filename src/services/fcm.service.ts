import { Types } from "mongoose";
import NotificationToken from "../models/NotificationToken.model";
import { getMessaging, Notification } from 'firebase-admin/messaging'

async function getUserTokens(userId: Types.ObjectId): Promise<string[]> {
    return (await NotificationToken.find({ userId })).map(doc => doc.token)
}

async function getTokensOfSomeUsers(userIds: Types.ObjectId[]): Promise<string[]> {
    return (await NotificationToken.find({ userId: { $in: userIds } })).map(doc => doc.token)
}

export async function notifyUser(userId: Types.ObjectId, notification: Notification) {
    try {
        const tokens = await getUserTokens(userId)

        if (!tokens.length)
            return

        await getMessaging().sendEachForMulticast({
            notification,
            tokens,
            android: {
                notification: {
                    channelId: 'default',
                    ...notification,
                }
            }
        })
    } catch (err) {
        console.error("Couldn't notify user:", err);
    }
}

export async function notifySomeUsers(userIds: Types.ObjectId[], notification: Notification) {
    try {
        const tokens = await getTokensOfSomeUsers(userIds)

        if (!tokens.length)
            return

        await getMessaging().sendEachForMulticast({
            notification,
            tokens,
            android: {
                notification: {
                    channelId: 'default',
                    ...notification,
                }
            }
        })
    } catch (err) {
        console.error("Couldn't notify users:", err);
    }
}