import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getMessage, getMessages, uploadAttachment } from "./message.controller";
import upload from "../../middlewares/multer.middleware";

const messageRouter = Router()

messageRouter.get('/getMessages/:id', expressAsyncHandler(getMessages))
messageRouter.get('/getMessage/:id', expressAsyncHandler(getMessage))
messageRouter.post('/uploadAttachment/:chatId', upload.single('file'), uploadAttachment)

export default messageRouter