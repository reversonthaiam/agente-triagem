import { Request, Response } from 'express'
import { AgentService } from '../services/agent.service'

const service = new AgentService()

export class MessagesController {
  async send(req: Request, res: Response) {
    try {
      const { sessionId, message } = req.body

      if (!sessionId || !message) {
        return res.status(400).json({ error: 'sessionId e message são obrigatórios' })
      }

      const response = await service.sendMessage(sessionId, message)
      return res.json({ response })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }

  async history(req: Request, res: Response) {
    try {
      const sessionId = String(req.params.sessionId)

      const history = await service.getHistory(sessionId)

      if (!history) {
        return res.status(404).json({ error: 'Conversa não encontrada' })
      }

      return res.json(history)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
}