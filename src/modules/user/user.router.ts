import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addUser, deleteUserByEmail, getUserByEmail, getUserById, getUserByUsername, updateUserInfo } from "./user.controller";

const userRouter = Router()

userRouter.post('/addUser', expressAsyncHandler(addUser))
userRouter.get('/getUserByEmail/:email', expressAsyncHandler(getUserByEmail))
userRouter.get('/getUserByUsername/:username', expressAsyncHandler(getUserByUsername))
userRouter.get('/getUserById/:id', expressAsyncHandler(getUserById))
userRouter.put('/updateUser/:id', expressAsyncHandler(updateUserInfo))
userRouter.delete('/deleteUser/:email', expressAsyncHandler(deleteUserByEmail))

export default userRouter