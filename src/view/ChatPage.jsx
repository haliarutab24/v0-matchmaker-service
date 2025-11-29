"use client"

import { useState, useEffect, useContext, useRef } from "react"
import { useSearchParams } from "next/navigation"
import AuthContext from "../context/AuthContext"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId") || "1"
  const { user } = useContext(AuthContext)
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Marcus (Agent)",
      role: "agent",
      text: "Hi Sarah! I found Ahmed, a 4.9-star plumber who can come tomorrow 11am!",
      timestamp: "10:45 AM",
      type: "received",
    },
    {
      id: 2,
      sender: "Sarah",
      role: "customer",
      text: "Perfect! Ahmed sounds great. I am ready! Let us book.",
      timestamp: "10:48 AM",
      type: "sent",
    },
    {
      id: 3,
      sender: "Ahmed (Provider)",
      role: "provider",
      text: "Hi Sarah, I will be there tomorrow at 11am sharp. Looking forward to helping you!",
      timestamp: "10:50 AM",
      type: "received",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [attachments, setAttachments] = useState([])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() || attachments.length > 0) {
      const message = {
        id: messages.length + 1,
        sender: user?.name || "You",
        role: user?.role,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "sent",
        attachments: attachments.length > 0 ? attachments : null,
      }
      setMessages([...messages, message])
      setNewMessage("")
      setAttachments([])

      // Simulate receiving response
      setTimeout(() => {
        const responses = [
          "Thanks for the update!",
          "Sounds good to me.",
          "Let me check and get back to you.",
          "Great! When would be the best time?",
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const reply = {
          id: messages.length + 2,
          sender: user?.role === "customer" ? "Marcus (Agent)" : "Sarah",
          role: user?.role === "customer" ? "agent" : "customer",
          text: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "received",
        }
        setMessages((prev) => [...prev, reply])
      }, 1000)
    }
  }

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files)
    setAttachments(files)
  }

  const handleQuickReply = (text) => {
    setNewMessage(text)
  }

  const quickReplies = {
    customer: ["Can you confirm the time?", "What should I prepare?", "Do you need access to anything?"],
    provider: ["I will arrive shortly.", "Do you have all the materials?", "Work is complete!"],
    agent: ["Job matched successfully!", "Payment confirmed.", "Please confirm completion."],
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Job Chat - #{jobId}</h1>
        <p>Real-time conversation between customer, provider, and agent</p>
      </header>

      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-info">
            <h3>Kitchen Tap Repair</h3>
            <span className="chat-status">3 participants</span>
          </div>
          <div className="chat-actions">
            <button className="info-button">Info</button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={msg.id} className={`message ${msg.type}`}>
              <div className="message-content">
                <div className="message-header">
                  <p className="message-sender">{msg.sender}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>
                <p className="message-text">{msg.text}</p>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="message-attachments">
                    {msg.attachments.map((file, idx) => (
                      <div key={idx} className="attachment-badge">
                        📎 {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="message received">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-quick-replies">
          {quickReplies[user?.role]?.map((reply, idx) => (
            <button key={idx} className="quick-reply-btn" onClick={() => handleQuickReply(reply)}>
              {reply}
            </button>
          ))}
        </div>

        <div className="chat-input-section">
          <form onSubmit={handleSendMessage}>
            <div className="input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
              />
              <label className="attachment-label">
                <input
                  type="file"
                  multiple
                  onChange={handleAttachmentChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                📎
              </label>
              <button type="submit" className="send-button">
                Send
              </button>
            </div>
            {attachments.length > 0 && (
              <div className="attachments-preview">
                {attachments.map((file, idx) => (
                  <span key={idx} className="attachment-item">
                    {file.name}
                    <button
                      type="button"
                      onClick={() => setAttachments(attachments.filter((_, i) => i !== idx))}
                      className="remove-attachment"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
