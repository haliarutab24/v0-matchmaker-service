"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function JobCompletionVerificationPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const jobId = searchParams.get("jobId")
  const [step, setStep] = useState("review") // review, approve, complete
  const [photos] = useState(["photo1.jpg", "photo2.jpg", "photo3.jpg"])

  const jobDetails = {
    id: jobId,
    title: "Kitchen Tap Repair",
    provider: "Ahmed Plumbing",
    customer: "Sarah",
    completionNotes: "Replaced washer and valve seat. Tap now working perfectly. Used new parts, all tested.",
    partsUsed: "Tap washer, valve seat, new seal",
    timeSpent: "1.5 hours",
  }

  const handleApprove = async () => {
    setStep("approve")
    setTimeout(() => {
      setStep("complete")
      setTimeout(() => {
        alert("Job completed successfully! Provider payment is being released.")
        router.push("/jobs")
      }, 2000)
    }, 1500)
  }

  const handleReject = () => {
    alert("We will contact the provider to address your concerns.")
    router.back()
  }

  if (step === "approve") {
    return (
      <div className="page-container">
        <div className="verification-status processing">
          <div className="status-card">
            <div className="spinner"></div>
            <h2>Verifying Completion</h2>
            <p>Checking work quality and releasing payment...</p>
          </div>
        </div>
      </div>
    )
  }

  if (step === "complete") {
    return (
      <div className="page-container">
        <div className="verification-status success">
          <div className="status-card">
            <div className="success-icon">✓</div>
            <h2>Job Completed Successfully!</h2>
            <p>Payment has been released to {jobDetails.provider}.</p>
            <p className="sub-message">Redirecting...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Verify Job Completion</h1>
        <p>Review the provider's work before finalizing payment</p>
      </header>

      <div className="verification-wrapper">
        <section className="verification-section">
          <h2>Work Submitted by {jobDetails.provider}</h2>

          <div className="job-details-grid">
            <div className="detail-item">
              <label>Work Completed:</label>
              <p>{jobDetails.title}</p>
            </div>
            <div className="detail-item">
              <label>Time Spent:</label>
              <p>{jobDetails.timeSpent}</p>
            </div>
            <div className="detail-item">
              <label>Parts Used:</label>
              <p>{jobDetails.partsUsed}</p>
            </div>
          </div>

          <div className="work-notes">
            <h3>Provider's Notes</h3>
            <p>{jobDetails.completionNotes}</p>
          </div>
        </section>

        <section className="verification-section">
          <h2>Submitted Photos</h2>
          <div className="photos-grid">
            {photos.map((photo, idx) => (
              <div key={idx} className="photo-placeholder">
                <div className="photo-icon">📸</div>
                <p>{photo}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="verification-section">
          <h2>Verification Checklist</h2>
          <div className="checklist">
            <label className="checklist-item">
              <input type="checkbox" defaultChecked />
              Work appears to be completed as described
            </label>
            <label className="checklist-item">
              <input type="checkbox" defaultChecked />
              Photos show quality work
            </label>
            <label className="checklist-item">
              <input type="checkbox" defaultChecked />
              Happy with the service quality
            </label>
          </div>
        </section>

        <div className="verification-actions">
          <button className="approve-button" onClick={handleApprove}>
            Approve & Complete Job
          </button>
          <button className="reject-button" onClick={handleReject}>
            Needs Review
          </button>
        </div>

        <div className="verification-info">
          <h3>What Happens Next?</h3>
          <p>
            Once you approve, payment (£138) will be released to {jobDetails.provider} within 1-2 business days. You
            will then be able to leave a review.
          </p>
        </div>
      </div>
    </div>
  )
}
