import { config } from 'dotenv'
import express from 'express'
import connect from './db/connect'

config()

const app = express()
const port = process.env.PORT ?? 3000

connect()

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})