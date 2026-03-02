import dotenv from 'dotenv'
import Anthropic from '@anthropic-ai/sdk'
import { ConversationRepository } from '../repositories/conversation.repository'

dotenv.config()
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const repository = new ConversationRepository()

const SYSTEM_PROMPT = `Você é um assistente virtual de atendimento ao cliente. Seu objetivo é identificar o motivo do contato e encaminhar o cliente para o setor correto.

Os setores disponíveis são:
- Vendas: compra, dúvidas sobre produto, preços, negociação de desconto
- Suporte: reclamações, atrasos, erros, problemas com produto ou serviço
- Financeiro: pagamento, estorno, boleto, nota fiscal

Regras:
1. Inicie o atendimento de forma amigável e pergunte o motivo do contato.
2. Quando a intenção do cliente estiver clara, informe que está transferindo para o setor correto.
3. Gere um resumo da solicitação nesse formato: [Resumo para o Atendente: descreva brevemente o problema do cliente]
4. Após a transferência, encerre sua participação.
5. Se o cliente tentar falar sobre assuntos fora de vendas, suporte ou financeiro, diga que não tem autorização para falar sobre outros assuntos e redirecione para o atendimento.`

export class AgentService {
  async sendMessage(sessionId: string, userMessage: string) {
    const conversation = await repository.findOrCreate(sessionId)
    await repository.saveMessage(conversation.id, 'user', userMessage)

    const history = await repository.getHistory(sessionId)
    const messages = history?.messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content
    })) || []

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages
    })

    const assistantMessage = response.content[0].type === 'text'
      ? response.content[0].text
      : ''

    await repository.saveMessage(conversation.id, 'assistant', assistantMessage)

    return assistantMessage
  }

  async getHistory(sessionId: string) {
    return repository.getHistory(sessionId)
  }
}