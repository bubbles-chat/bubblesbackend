import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { acceptReuqest, addRequest, deleteRequest, getPendingRequestForAUser, getSentRequestsForAUser, rejectRequest } from "./request.controller";
import checkAuth from "../../middlewares/auth.middleware";

const requestRouter = Router()

requestRouter.post('/addRequest/:receiver', checkAuth, expressAsyncHandler(addRequest))
requestRouter.delete('/deleteRequest/:id', checkAuth, expressAsyncHandler(deleteRequest))
requestRouter.get('/getSentRequests', checkAuth, expressAsyncHandler(getSentRequestsForAUser))
requestRouter.get('/getPendingRequests', checkAuth, expressAsyncHandler(getPendingRequestForAUser))
requestRouter.put('/rejectRequest/:id', checkAuth, expressAsyncHandler(rejectRequest))
requestRouter.put('/acceptRequest/:id', checkAuth, expressAsyncHandler(acceptReuqest))

export default requestRouter