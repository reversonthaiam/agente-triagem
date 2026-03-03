import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { sendMessage } from '../services/api'
import { MessageBubble } from './MessageBubble'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SESSION_ID = uuidv4()

export function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await sendMessage(SESSION_ID, userMessage)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Erro ao conectar com o servidor, tente mais tarde.' }])
    } finally {
      console.log(messages, 'messages')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="bg-[#55e5a4] text-white text-center py-3 rounded-t-xl font-semibold">
        Atendimento Virtual
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-4 border border-gray-200">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 mt-10">Inicie uma conversa...</p>
        )}
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-2xl text-sm rounded-bl-none">
              Digitando...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 bg-white border border-t-0 border-gray-200 rounded-b-xl p-3">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-[#55e5a4] hover:bg-[#3aa072] text-white px-5 py-2 rounded-full text-sm disabled:opacity-50"
        >
          Enviar
        </button>
      </div>
    </div>
  )
}