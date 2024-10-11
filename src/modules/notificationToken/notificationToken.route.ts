import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addToken } from "./notificationToken.controller";

const notificationTokenRouter = Router()

notificationTokenRouter.post('/addToken/:token', expressAsyncHandler(addToken))

export default notificationTokenRouter