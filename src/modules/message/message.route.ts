import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getMessage, getMessages } from "./message.controller";

const messageRouter = Router()

messageRouter.get('/getMessages/:id', expressAsyncHandler(getMessages))
messageRouter.get('/getMessage/:id', expressAsyncHandler(getMessage))

export default messageRouter