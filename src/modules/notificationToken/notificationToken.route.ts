import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addToken, deleteToken } from "./notificationToken.controller";

const notificationTokenRouter = Router()

notificationTokenRouter.post('/addToken/:token', expressAsyncHandler(addToken))
notificationTokenRouter.delete('/deleteToken/:token', expressAsyncHandler(deleteToken))

export default notificationTokenRouter