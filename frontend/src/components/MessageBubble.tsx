interface Props {
  role: 'user' | 'assistant'
  content: string
}

export function MessageBubble({ role, content }: Props) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap
        ${isUser
          ? 'bg-[#55e5a4] text-white rounded-br-none'
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}>
        {content}
      </div>
    </div>
  )
}