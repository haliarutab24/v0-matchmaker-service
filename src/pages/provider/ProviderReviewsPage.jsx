"use client"

import { useState } from "react"

export default function ProviderReviewsPage() {
  const [reviews] = useState([
    {
      id: 1,
      customerName: "Sarah",
      rating: 5,
      date: "2024-01-15",
      jobTitle: "Kitchen Tap Repair",
      text: "Ahmed was professional, quick, and friendly. Fixed the tap perfectly. Will definitely use again!",
      verified: true,
    },
    {
      id: 2,
      customerName: "John",
      rating: 4,
      date: "2024-01-10",
      jobTitle: "Drain Unclogging",
      text: "Good work overall. A bit delayed but the job was done well.",
      verified: true,
    },
    {
      id: 3,
      customerName: "Emma",
      rating: 5,
      date: "2024-01-05",
      jobTitle: "Toilet Cistern Replacement",
      text: "Excellent service. Explained everything clearly. Highly recommended!",
      verified: true,
    },
  ])

  const [stats] = useState({
    averageRating: 4.9,
    totalReviews: 50,
    percentage5Star: 95,
    percentage4Star: 4,
    percentage3Star: 1,
    percentage2Star: 0,
    percentage1Star: 0,
  })

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating)
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>My Reviews</h1>
        <p>See what customers say about your work</p>
      </header>

      <div className="reviews-overview">
        <div className="rating-summary">
          <div className="big-rating">
            <div className="rating-number">{stats.averageRating}</div>
            <div className="rating-stars">★★★★★</div>
            <div className="rating-count">Based on {stats.totalReviews} reviews</div>
          </div>

          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="rating-bar">
                <span className="bar-label">{stars} ★</span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${stats[`percentage${stars}Star`]}%`,
                      backgroundColor: stars >= 4 ? "#10b981" : stars === 3 ? "#f59e0b" : "#ef4444",
                    }}
                  ></div>
                </div>
                <span className="bar-percent">{stats[`percentage${stars}Star`]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="reviews-section">
        <h2>Recent Reviews</h2>
        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <h4>{review.customerName}</h4>
                  <p className="job-title">{review.jobTitle}</p>
                </div>
                <div className="review-rating">
                  <span className="stars">{renderStars(review.rating)}</span>
                  {review.verified && <span className="verified-badge">Verified</span>}
                </div>
              </div>

              <p className="review-text">{review.text}</p>

              <p className="review-date">{review.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="review-tips">
        <h2>How to Get More Great Reviews</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Be Responsive</h4>
            <p>Reply quickly to customer messages and show you care.</p>
          </div>
          <div className="tip-card">
            <h4>Do Quality Work</h4>
            <p>Focus on delivering excellent service every time.</p>
          </div>
          <div className="tip-card">
            <h4>Communicate Clearly</h4>
            <p>Keep customers updated throughout the job.</p>
          </div>
          <div className="tip-card">
            <h4>Professional Behavior</h4>
            <p>Maintain cleanliness and professional demeanor.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
