"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function JobReviewPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const jobId = searchParams.get("jobId")
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [review, setReview] = useState("")
  const [recommendToOthers, setRecommendToOthers] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const jobInfo = {
    id: jobId,
    title: "Kitchen Tap Repair",
    provider: "Ahmed Plumbing",
    amount: "£138",
    completedDate: "2024-01-15",
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Review submitted! Thank you for your feedback.")
      router.push("/jobs")
    } catch (error) {
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Rate Your Experience</h1>
        <p>Help us improve by sharing your feedback</p>
      </header>

      <div className="review-container">
        <div className="review-job-info">
          <h2>{jobInfo.title}</h2>
          <p>
            <strong>Service Provider:</strong> {jobInfo.provider}
          </p>
          <p>
            <strong>Completed:</strong> {jobInfo.completedDate}
          </p>
          <p>
            <strong>Amount Paid:</strong> {jobInfo.amount}
          </p>
        </div>

        <form onSubmit={handleSubmitReview} className="review-form">
          <section className="review-section">
            <h3>How was the work quality?</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= (hoverRating || rating) ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="rating-labels">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </section>

          <section className="review-section">
            <h3>Write a Review (Optional)</h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with the service provider. What did they do well? Any areas for improvement?"
              rows="6"
              className="review-textarea"
            />
          </section>

          <section className="review-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={recommendToOthers}
                onChange={(e) => setRecommendToOthers(e.target.checked)}
              />
              I would recommend this provider to others
            </label>
          </section>

          <div className="review-actions">
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button type="button" className="secondary-button" onClick={() => router.push("/jobs")}>
              Skip for Now
            </button>
          </div>
        </form>

        <div className="review-benefits">
          <h3>Why leave a review?</h3>
          <ul>
            <li>Help other customers find great service providers</li>
            <li>Reward excellent service with positive feedback</li>
            <li>Help us maintain quality standards</li>
            <li>Your review will be visible on the provider's profile</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
