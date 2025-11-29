"use client"

import { useState, useContext } from "react"
import Link from "next/link"
import AuthContext from "../../context/AuthContext"
import JobCard from "../../components/JobCard"

export default function CustomerDashboard() {
  const { user } = useContext(AuthContext)
  const [jobs] = useState([
    {
      id: "1",
      title: "Kitchen Tap Repair",
      status: "completed",
      provider: "Ahmed Plumbing",
      rating: 4.9,
      amount: "£138",
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "Bathroom Tiles Installation",
      status: "in-progress",
      provider: "Jane Pro",
      rating: 4.8,
      amount: "£450",
      date: "2024-01-18",
    },
  ])

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Welcome, {user?.name}</h1>
        <p>Manage your service requests and connect with verified professionals</p>
      </header>

      <div className="dashboard-grid">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">2</div>
            <div className="stat-label">Active Jobs</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.8</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>

        <div className="quick-action">
          <Link href="/post-job" className="cta-button">
            Post New Job
          </Link>
        </div>
      </div>

      <section className="jobs-section">
        <h2>Your Recent Jobs</h2>
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} userRole="customer" />
          ))}
        </div>
      </section>
    </div>
  )
}
