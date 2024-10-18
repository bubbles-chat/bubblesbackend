import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { acceptReuqest, addRequest, deleteRequest, getPendingRequestForAUser, getSentRequestsForAUser, rejectRequest } from "./request.controller";

const requestRouter = Router()

requestRouter.post('/addRequest/:receiver', expressAsyncHandler(addRequest))
requestRouter.delete('/deleteRequest/:id', expressAsyncHandler(deleteRequest))
requestRouter.get('/getSentRequests', expressAsyncHandler(getSentRequestsForAUser))
requestRouter.get('/getPendingRequests', expressAsyncHandler(getPendingRequestForAUser))
requestRouter.put('/rejectRequest/:id', expressAsyncHandler(rejectRequest))
requestRouter.put('/acceptRequest/:id', expressAsyncHandler(acceptReuqest))

export default requestRouter