import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { addUser, deleteUserByEmail, getUserByEmail, getUserById, getUserByUsername, updateUserInfo } from "./user.controller";
import checkAuth from "../../middlewares/auth.middleware";

const userRouter = Router()

userRouter.post('/addUser', expressAsyncHandler(addUser))
userRouter.get('/getUserByEmail/:email', checkAuth, expressAsyncHandler(getUserByEmail))
userRouter.get('/getUserByUsername/:username', checkAuth, expressAsyncHandler(getUserByUsername))
userRouter.get('/getUserById/:id', checkAuth, expressAsyncHandler(getUserById))
userRouter.put('/updateUser/:id', checkAuth, expressAsyncHandler(updateUserInfo))
userRouter.delete('/deleteUser/:email', checkAuth, expressAsyncHandler(deleteUserByEmail))

export default userRouter