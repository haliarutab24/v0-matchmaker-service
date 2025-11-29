"use client"

import { useContext } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import AuthContext from "../context/AuthContext"
import "./Navigation.css"

export default function Navigation() {
  const { user, handleLogout } = useContext(AuthContext)
  const router = useRouter()

  const handleLogoutClick = () => {
    handleLogout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          Matchmaker
        </Link>
        <div className="nav-menu">
          {user?.role === "customer" && (
            <>
              <Link href="/" className="nav-link">
                Dashboard
              </Link>
              <Link href="/post-job" className="nav-link">
                Post Job
              </Link>
              <Link href="/jobs" className="nav-link">
                My Jobs
              </Link>
            </>
          )}
          {user?.role === "provider" && (
            <>
              <Link href="/" className="nav-link">
                Available Jobs
              </Link>
              <Link href="/profile" className="nav-link">
                My Profile
              </Link>
            </>
          )}
          {user?.role === "agent" && (
            <>
              <Link href="/" className="nav-link">
                Job Queue
              </Link>
            </>
          )}
          <div className="nav-user">
            <span className="user-name">{user?.name}</span>
            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
