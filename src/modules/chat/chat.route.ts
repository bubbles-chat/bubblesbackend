import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addUserToGroupChat, changeGroupChatPhoto, changeParticipantRoleToAdmin, createGroupChat, removeParticipant } from "./chat.controller";
import upload from "../../middlewares/multer.middleware";

const chatRouter = Router()

chatRouter.post('/createGroupChat', expressAsyncHandler(createGroupChat))
chatRouter.put('/addUserToGroupChat/:userId/:chatId', expressAsyncHandler(addUserToGroupChat))
chatRouter.put('/changeParticipantRoleToAdmin/:userId/:chatId', expressAsyncHandler(changeParticipantRoleToAdmin))
chatRouter.put('/removeParticipant/:userId/:chatId', expressAsyncHandler(removeParticipant))
chatRouter.put('/changeGroupChatPhoto/:chatId', upload.single('file'), expressAsyncHandler(changeGroupChatPhoto))

export default chatRouter