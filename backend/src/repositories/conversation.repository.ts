import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaLibSql({ url: 'file:./dev.db' })
const prisma = new PrismaClient({ adapter })

export class ConversationRepository {
  async findOrCreate(sessionId: string) {
    let conversation = await prisma.conversation.findUnique({
      where: { sessionId }
    })

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { sessionId }
      })
    }

    return conversation
  }

  async saveMessage(conversationId: string, role: string, content: string) {
    return prisma.message.create({
      data: { conversationId, role, content }
    })
  }

  async getHistory(sessionId: string) {
    return prisma.conversation.findUnique({
      where: { sessionId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })
  }
}