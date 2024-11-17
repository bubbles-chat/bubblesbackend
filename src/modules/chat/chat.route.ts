import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addUserToGroupChat, changeGroupChatPhoto, changeParticipantRoleToAdmin, createGroupChat, removeParticipant } from "./chat.controller";
import upload from "../../middlewares/multer.middleware";
import checkAuth from "../../middlewares/auth.middleware";

const chatRouter = Router()

chatRouter.post('/createGroupChat', checkAuth, expressAsyncHandler(createGroupChat))
chatRouter.put('/addUserToGroupChat/:userId/:chatId', checkAuth, expressAsyncHandler(addUserToGroupChat))
chatRouter.put('/changeParticipantRoleToAdmin/:userId/:chatId', checkAuth, expressAsyncHandler(changeParticipantRoleToAdmin))
chatRouter.put('/removeParticipant/:userId/:chatId', checkAuth, expressAsyncHandler(removeParticipant))
chatRouter.put('/changeGroupChatPhoto/:chatId', checkAuth, upload.single('file'), expressAsyncHandler(changeGroupChatPhoto))

export default chatRouter