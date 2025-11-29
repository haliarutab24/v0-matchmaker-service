"use client"

import { useState } from "react"
import Link from "next/link"
import JobQueueCard from "../../components/JobQueueCard"

export default function AgentDashboard() {
  const [activeTab, setActiveTab] = useState("queue")
  const [jobs] = useState([
    {
      id: "1",
      title: "Kitchen Tap Repair",
      customer: "Sarah",
      budget: "£100-150",
      location: "London E1",
      posted: "2 hours ago",
      status: "new",
      description: "Leaking tap from base. Needs fixing tomorrow afternoon.",
      customerRating: 4.5,
    },
    {
      id: "2",
      title: "Electrical Fault Repair",
      customer: "Mike",
      budget: "£150-250",
      location: "London N1",
      posted: "30 mins ago",
      status: "new",
      description: "Faulty socket in bedroom. Tripping breaker.",
      customerRating: 4.8,
    },
  ])

  const [activeMatches] = useState([
    {
      id: "3",
      title: "Bathroom Tiles Installation",
      customer: "John",
      provider: "Jane Pro",
      budget: "£450",
      location: "London W1",
      status: "matched",
      daysLeft: 2,
    },
  ])

  const [completedMatches] = useState([
    {
      id: "4",
      title: "Drain Unclogging",
      customer: "Emma",
      provider: "Ahmed Plumbing",
      commission: "£22.50",
      revenue: "£150",
      status: "completed",
      date: "2024-01-10",
      satisfaction: 5,
    },
  ])

  const [stats] = useState({
    jobsMatched: 24,
    revenue: "£3,600",
    satisfactionRate: "98%",
    activeJobs: 12,
  })

  const handleTakeJob = (jobId) => {
    alert(`Job ${jobId} assigned to you! You can now find and negotiate with providers.`)
  }

  const handleSkipJob = (jobId) => {
    alert(`Job ${jobId} skipped. It will be offered to other agents.`)
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Agent Dashboard</h1>
        <p>Manage job queue, match providers with customers, and earn commission</p>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{stats.jobsMatched}</div>
          <div className="stat-label">Jobs Matched</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.revenue}</div>
          <div className="stat-label">Commission Earned</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.satisfactionRate}</div>
          <div className="stat-label">Satisfaction Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeJobs}</div>
          <div className="stat-label">Active Jobs</div>
        </div>
      </div>

      <div className="agent-tabs">
        <button className={`tab-button ${activeTab === "queue" ? "active" : ""}`} onClick={() => setActiveTab("queue")}>
          Job Queue ({jobs.length})
        </button>
        <button
          className={`tab-button ${activeTab === "active" ? "active" : ""}`}
          onClick={() => setActiveTab("active")}
        >
          Active Matches ({activeMatches.length})
        </button>
        <button
          className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed ({completedMatches.length})
        </button>
      </div>

      {activeTab === "queue" && (
        <section className="jobs-section">
          <h2>New Jobs Waiting for Assignment</h2>
          <div className="job-queue">
            {jobs.map((job) => (
              <JobQueueCard
                key={job.id}
                job={job}
                onTake={() => handleTakeJob(job.id)}
                onSkip={() => handleSkipJob(job.id)}
              />
            ))}
          </div>
        </section>
      )}

      {activeTab === "active" && (
        <section className="jobs-section">
          <h2>Active Matches (In Progress)</h2>
          <div className="matches-grid">
            {activeMatches.map((match) => (
              <div key={match.id} className="match-card active-match">
                <div className="match-header">
                  <h3>{match.title}</h3>
                  <span className="match-badge">Active</span>
                </div>
                <div className="match-details">
                  <div className="detail-row">
                    <span className="detail-label">Customer:</span>
                    <span className="detail-value">{match.customer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Provider:</span>
                    <span className="detail-value">{match.provider}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Budget:</span>
                    <span className="detail-value">{match.budget}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span className="detail-value">{match.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">Due in {match.daysLeft} days</span>
                  </div>
                </div>
                <div className="match-actions">
                  <Link href={`/chat/${match.id}`} className="chat-link">
                    Monitor Chat
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "completed" && (
        <section className="jobs-section">
          <h2>Completed Matches</h2>
          <div className="matches-grid">
            {completedMatches.map((match) => (
              <div key={match.id} className="match-card completed-match">
                <div className="match-header">
                  <h3>{match.title}</h3>
                  <span className="completed-badge">Paid</span>
                </div>
                <div className="match-details">
                  <div className="detail-row">
                    <span className="detail-label">Customer:</span>
                    <span className="detail-value">{match.customer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Provider:</span>
                    <span className="detail-value">{match.provider}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total Revenue:</span>
                    <span className="detail-value detail-revenue">{match.revenue}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Your Commission:</span>
                    <span className="detail-value detail-commission">{match.commission}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Customer Rating:</span>
                    <span className="detail-value">{"★".repeat(match.satisfaction)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
