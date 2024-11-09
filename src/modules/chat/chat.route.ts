import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addUserToGroupChat, changeParticipantRoleToAdmin, createGroupChat, removeParticipant } from "./chat.controller";

const chatRouter = Router()

chatRouter.post('/createGroupChat', expressAsyncHandler(createGroupChat))
chatRouter.put('/addUserToGroupChat/:userId/:chatId', expressAsyncHandler(addUserToGroupChat))
chatRouter.put('/changeParticipantRoleToAdmin/:userId/:chatId', expressAsyncHandler(changeParticipantRoleToAdmin))
chatRouter.put('/removeParticipant/:userId/:chatId', expressAsyncHandler(removeParticipant))

export default chatRouter