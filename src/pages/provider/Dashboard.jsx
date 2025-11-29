"use client"

import { useState } from "react"
import JobCard from "../../components/JobCard"

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState("available")
  const [availableJobs] = useState([
    {
      id: "1",
      title: "Kitchen Tap Repair",
      customer: "Sarah",
      budget: "£100-150",
      location: "London E1",
      rating: 4.2,
      date: "2024-01-15",
      description: "Leaking tap from the base. Needs fixing tomorrow afternoon.",
      posted: "2 hours ago",
    },
    {
      id: "2",
      title: "Bathroom Tiles Installation",
      customer: "John",
      budget: "£400-500",
      location: "London W1",
      rating: 4.5,
      date: "2024-01-18",
      description: "Need to install new bathroom tiles. Small bathroom.",
      posted: "5 hours ago",
    },
  ])

  const [acceptedJobs] = useState([
    {
      id: "3",
      title: "Toilet Cistern Replacement",
      customer: "Emma",
      budget: "£80-120",
      location: "London SW1",
      status: "accepted",
      date: "2024-01-22",
    },
  ])

  const [completedJobs] = useState([
    {
      id: "4",
      title: "Drain Unclogging",
      customer: "Mike",
      amount: "£150",
      rating: 4.9,
      date: "2024-01-10",
    },
  ])

  const handleApplyJob = (jobId) => {
    alert(`Application sent for job ${jobId}! Awaiting customer confirmation.`)
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Available Work Opportunities</h1>
        <p>Find and apply for service requests that match your skills</p>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">8</div>
          <div className="stat-label">Jobs Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4.9</div>
          <div className="stat-label">Rating</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">£3,240</div>
          <div className="stat-label">Total Earned</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2</div>
          <div className="stat-label">Active Jobs</div>
        </div>
      </div>

      <div className="provider-tabs">
        <button
          className={`tab-button ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          Available ({availableJobs.length})
        </button>
        <button
          className={`tab-button ${activeTab === "accepted" ? "active" : ""}`}
          onClick={() => setActiveTab("accepted")}
        >
          Accepted ({acceptedJobs.length})
        </button>
        <button
          className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed ({completedJobs.length})
        </button>
      </div>

      {activeTab === "available" && (
        <section className="jobs-section">
          <div className="jobs-grid">
            {availableJobs.map((job) => (
              <JobCard key={job.id} job={job} userRole="provider" />
            ))}
          </div>
        </section>
      )}

      {activeTab === "accepted" && (
        <section className="jobs-section">
          <div className="jobs-grid">
            {acceptedJobs.map((job) => (
              <JobCard key={job.id} job={{ ...job, status: "in-progress" }} userRole="provider" />
            ))}
          </div>
        </section>
      )}

      {activeTab === "completed" && (
        <section className="jobs-section">
          <div className="jobs-grid">
            {completedJobs.map((job) => (
              <JobCard key={job.id} job={{ ...job, status: "completed" }} userRole="provider" />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
