"use client"

import { useState } from "react"
import JobCard from "../../components/JobCard"

export default function JobHistoryPage() {
  const [filter, setFilter] = useState("all")
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
    {
      id: "3",
      title: "Electrical Fault Repair",
      status: "pending",
      provider: "Pending agent",
      rating: null,
      amount: "£200",
      date: "2024-01-20",
    },
  ])

  const filteredJobs = filter === "all" ? jobs : jobs.filter((j) => j.status === filter)

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>My Jobs</h1>
        <p>Track all your service requests</p>
      </header>

      <div className="filter-section">
        <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All Jobs
        </button>
        <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>
          Pending
        </button>
        <button
          className={`filter-btn ${filter === "in-progress" ? "active" : ""}`}
          onClick={() => setFilter("in-progress")}
        >
          In Progress
        </button>
        <button
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} userRole="customer" />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <p>No {filter !== "all" ? filter : ""} jobs found</p>
        </div>
      )}
    </div>
  )
}
