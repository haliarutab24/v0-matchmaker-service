"use client"
import Link from "next/link"

export default function JobCard({ job, userRole }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#10b981"
      case "in-progress":
        return "#f59e0b"
      case "pending":
        return "#6b7280"
      default:
        return "#3b82f6"
    }
  }

  return (
    <div className="job-card">
      <div className="job-header">
        <h3>{job.title}</h3>
        <span className="job-status" style={{ backgroundColor: getStatusColor(job.status) }}>
          {job.status}
        </span>
      </div>

      <div className="job-details">
        <p>
          <strong>Provider/Customer:</strong> {job.provider || job.customer}
        </p>
        <p>
          <strong>Amount:</strong> {job.amount || job.budget}
        </p>
        <p>
          <strong>Date:</strong> {job.date}
        </p>
        {job.rating && (
          <p>
            <strong>Rating:</strong> {job.rating} stars
          </p>
        )}
      </div>

      <div className="job-actions">
        <Link href={`/chat/${job.id}`} className="chat-link">
          View Chat
        </Link>
        {userRole === "provider" && job.status !== "completed" && (
          <button className="apply-button">Apply for Job</button>
        )}
      </div>
    </div>
  )
}
