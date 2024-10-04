import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addUser, deleteUserByEmail, getUserByEmail, updateUserInfo } from "./user.controller";

const userRouter = Router()

userRouter.post('/addUser', expressAsyncHandler(addUser))
userRouter.get('/getUserByEmail/:email', expressAsyncHandler(getUserByEmail))
userRouter.put('/updateUser/:id', expressAsyncHandler(updateUserInfo))
userRouter.delete('/deleteUser/:email', expressAsyncHandler(deleteUserByEmail))

export default userRouter