"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function JobMatchingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const jobId = searchParams.get("jobId")
  const [step, setStep] = useState("search") // search, contact, quote, confirm
  const [selectedProviders, setSelectedProviders] = useState([])
  const [quote, setQuote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [availableProviders] = useState([
    {
      id: "p1",
      name: "Ahmed Plumbing",
      rating: 4.9,
      reviews: 50,
      hourlyRate: "£120",
      experience: "8 years",
      availability: "Available today",
      distance: "0.5 miles",
    },
    {
      id: "p2",
      name: "Bill's Services",
      rating: 4.7,
      reviews: 30,
      hourlyRate: "£100",
      experience: "6 years",
      availability: "Available today",
      distance: "1.2 miles",
    },
    {
      id: "p3",
      name: "Jane Pro",
      rating: 4.8,
      reviews: 45,
      hourlyRate: "£140",
      experience: "10 years",
      availability: "Available tomorrow",
      distance: "2 miles",
    },
  ])

  const handleSelectProvider = (providerId) => {
    if (selectedProviders.includes(providerId)) {
      setSelectedProviders(selectedProviders.filter((id) => id !== providerId))
    } else {
      setSelectedProviders([...selectedProviders, providerId])
    }
  }

  const handleContactProviders = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("contact")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitQuote = async () => {
    if (!quote.trim()) {
      alert("Please enter a quote amount")
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Quote sent to customer! Awaiting approval.")
      router.push("/")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Match Job with Provider</h1>
        <p>Job #{jobId}</p>
      </header>

      {step === "search" && (
        <section className="matching-section">
          <h2>Step 1: Find Best Providers</h2>
          <p className="section-description">
            Select the best providers for this job based on rating, availability, and rate.
          </p>

          <div className="providers-grid">
            {availableProviders.map((provider) => (
              <div
                key={provider.id}
                className={`provider-card ${selectedProviders.includes(provider.id) ? "selected" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={selectedProviders.includes(provider.id)}
                  onChange={() => handleSelectProvider(provider.id)}
                  className="provider-checkbox"
                />
                <div className="provider-info">
                  <h3>{provider.name}</h3>
                  <div className="rating">
                    {"★".repeat(Math.floor(provider.rating))} {provider.rating} ({provider.reviews} reviews)
                  </div>
                  <div className="provider-details">
                    <p>
                      <strong>Rate:</strong> {provider.hourlyRate}/hr
                    </p>
                    <p>
                      <strong>Experience:</strong> {provider.experience}
                    </p>
                    <p>
                      <strong>Availability:</strong> {provider.availability}
                    </p>
                    <p>
                      <strong>Distance:</strong> {provider.distance}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button
              className="submit-button"
              onClick={handleContactProviders}
              disabled={selectedProviders.length === 0 || isSubmitting}
            >
              {isSubmitting ? "Contacting..." : `Contact ${selectedProviders.length} Provider(s)`}
            </button>
          </div>
        </section>
      )}

      {step === "contact" && (
        <section className="matching-section">
          <h2>Step 2: Negotiate & Quote</h2>
          <p className="section-description">
            You have contacted the selected providers. Enter the final quote to send to customer.
          </p>

          <div className="quote-form">
            <div className="form-group">
              <label>Final Quote (GBP)</label>
              <input
                type="number"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="e.g., 150"
                className="quote-input"
              />
            </div>

            <div className="form-group">
              <label>Notes for Customer</label>
              <textarea placeholder="Any additional notes about the service..." rows="4" className="notes-input" />
            </div>

            <div className="action-buttons">
              <button className="submit-button" onClick={handleSubmitQuote} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Send Quote to Customer"}
              </button>
              <button className="secondary-button" onClick={() => setStep("search")}>
                Back
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
