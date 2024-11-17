import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addToken, deleteToken } from "./notificationToken.controller";
import checkAuth from "../../middlewares/auth.middleware";

const notificationTokenRouter = Router()

notificationTokenRouter.post('/addToken/:token', checkAuth, expressAsyncHandler(addToken))
notificationTokenRouter.delete('/deleteToken/:token', checkAuth, expressAsyncHandler(deleteToken))

export default notificationTokenRouter