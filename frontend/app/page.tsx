"use client"

import { useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    const res = await fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    })

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let reply = ""

    setMessages((prev) => [...prev, { role: "assistant", content: "" }])

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const text = line.slice(6)
          reply += text
          setMessages((prev) => {
            const updated = [...prev]
            updated[updated.length - 1] = { role: "assistant", content: reply }
            return updated
          })
        }
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-xl ${
              msg.role === "user"
                ? "bg-blue-100 ml-auto text-right"
                : "bg-gray-100"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="bg-gray-100 p-3 rounded-lg max-w-xl">考え中...</div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="メッセージを入力..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={sendMessage}
        >
          送信
        </button>
      </div>
    </div>
  )
}