"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import AuthContext from "./context/AuthContext"
import Navigation from "./components/Navigation"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import CustomerDashboard from "./pages/customer/Dashboard"
import PostJobPage from "./pages/customer/PostJob"
import JobHistoryPage from "./pages/customer/JobHistory"
import ProviderDashboard from "./pages/provider/Dashboard"
import ProviderProfilePage from "./pages/provider/Profile"
import AgentDashboard from "./pages/agent/Dashboard"
import ChatPage from "./pages/ChatPage"
import "./App.css"
import "./Pages.css"

export default function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    router.push("/")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }

  React.useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Route logic based on pathname and user role
  const renderContent = () => {
    if (!user) {
      if (pathname === "/signup") return <SignupPage />
      return <LoginPage />
    }

    const role = user.role
    const path = pathname

    // Customer routes
    if (role === "customer") {
      if (path === "/post-job") return <PostJobPage />
      if (path === "/jobs") return <JobHistoryPage />
      if (path.startsWith("/chat/")) return <ChatPage />
      return <CustomerDashboard />
    }

    // Provider routes
    if (role === "provider") {
      if (path === "/profile") return <ProviderProfilePage />
      if (path.startsWith("/chat/")) return <ChatPage />
      return <ProviderDashboard />
    }

    // Agent routes
    if (role === "agent") {
      if (path.startsWith("/chat/")) return <ChatPage />
      return <AgentDashboard />
    }

    return <LoginPage />
  }

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, isLoading, setIsLoading }}>
      {user && <Navigation />}
      <div className="app-content">{renderContent()}</div>
    </AuthContext.Provider>
  )
}
