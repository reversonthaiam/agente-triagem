import axios from 'axios'

const api = axios.create({
  baseURL: 'https://agente-triagem-backend.onrender.com'
})

export async function sendMessage(sessionId: string, message: string) {
  const response = await api.post('/messages', { sessionId, message })
  return response.data.response
}

export async function getHistory(sessionId: string) {
  const response = await api.get(`/messages/${sessionId}`)
  return response.data
}