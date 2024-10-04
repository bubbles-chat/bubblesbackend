import { config } from 'dotenv'
import express from 'express'
import connect from './db/connect'
import userRouter from './modules/user/user.router'

config()

const app = express()
const port = process.env.PORT ?? 3000

connect()

// config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/user', userRouter)
app.get('/', (req, res, next) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})