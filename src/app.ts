import { config } from 'dotenv'
import express from 'express'
import connect from './db/connect'
import userRouter from './modules/user/user.router'
import checkAuth from './middlewares/auth.middleware'
import notificationTokenRouter from './modules/notificationToken/notificationToken.route'
import requestRouter from './modules/request/request.route'
import messageRouter from './modules/message/message.route'

config()

const app = express()

connect()

// config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// middlewares
app.use(checkAuth)

// routes
app.use('/user', userRouter)
app.use('/notificationToken', notificationTokenRouter)
app.use('/request', requestRouter)
app.use('/message', messageRouter)

app.get('/', (req, res, next) => {
    res.send('hello world')
})

export default app