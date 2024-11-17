import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getMessage, getMessages, uploadAttachment } from "./message.controller";
import upload from "../../middlewares/multer.middleware";
import checkAuth from "../../middlewares/auth.middleware";

const messageRouter = Router()

messageRouter.get('/getMessages/:id', checkAuth, expressAsyncHandler(getMessages))
messageRouter.get('/getMessage/:id', checkAuth, expressAsyncHandler(getMessage))
messageRouter.post('/uploadAttachment/:chatId', checkAuth, upload.single('file'), uploadAttachment)

export default messageRouter