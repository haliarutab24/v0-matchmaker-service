"use client"

export default function JobQueueCard({ job, onTake, onSkip }) {
  return (
    <div className="queue-card">
      <div className="queue-header">
        <h3>{job.title}</h3>
        <span className="posted-time">{job.posted}</span>
      </div>

      <div className="queue-details">
        <p>
          <strong>Customer:</strong> {job.customer} ({job.customerRating} rating)
        </p>
        <p>
          <strong>Budget:</strong> {job.budget}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p className="job-description">
          <strong>Description:</strong> {job.description}
        </p>
      </div>

      <div className="queue-actions">
        <button onClick={onTake} className="take-button">
          Take This Job
        </button>
        {onSkip && (
          <button onClick={onSkip} className="skip-button">
            Skip
          </button>
        )}
      </div>
    </div>
  )
}
