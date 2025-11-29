"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthContext from "../context/AuthContext"
import "./AuthPages.css"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  const { handleLogin, setIsLoading } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUsers = {
        "customer@test.com": { id: "1", name: "Sarah", email, role: "customer" },
        "provider@test.com": { id: "2", name: "Ahmed", email, role: "provider" },
        "agent@test.com": { id: "3", name: "Marcus", email, role: "agent" },
      }

      if (mockUsers[email] && password === "password") {
        handleLogin(mockUsers[email])
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Matchmaker</h1>
        <h2 className="auth-subtitle">Sign In</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="demo-accounts">
          <p className="demo-title">Demo Accounts:</p>
          <button className="demo-btn" onClick={() => setEmail("customer@test.com")}>
            Customer: customer@test.com
          </button>
          <button className="demo-btn" onClick={() => setEmail("provider@test.com")}>
            Provider: provider@test.com
          </button>
          <button className="demo-btn" onClick={() => setEmail("agent@test.com")}>
            Agent: agent@test.com
          </button>
          <p className="demo-note">Password: password</p>
        </div>

        <p className="auth-link">
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}
