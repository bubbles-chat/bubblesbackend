import { config } from 'dotenv'
import express from 'express'

config()

const app = express()
const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})