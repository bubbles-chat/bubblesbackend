import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addRequest, deleteRequest, getPendingRequestForAUser, getSentRequestsForAUser } from "./request.controller";

const requestRouter = Router()

requestRouter.post('/addRequest/:receiver', expressAsyncHandler(addRequest))
requestRouter.delete('/deleteRequest/:id', expressAsyncHandler(deleteRequest))
requestRouter.get('/getSentRequests', expressAsyncHandler(getSentRequestsForAUser))
requestRouter.get('/getPendingRequests', expressAsyncHandler(getPendingRequestForAUser))

export default requestRouter