import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { messagesRouter } from './routes/messages.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.use('/messages', messagesRouter)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
})