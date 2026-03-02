import { Router } from 'express'
import { MessagesController } from '../controllers/messages.controller'

const messagesRouter = Router()
const controller = new MessagesController

messagesRouter.post('/', controller.send)
messagesRouter.get('/:sessionId', controller.history)

export { messagesRouter }
