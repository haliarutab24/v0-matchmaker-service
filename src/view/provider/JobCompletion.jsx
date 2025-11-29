"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function JobCompletionPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")
  const router = useRouter()
  const [formData, setFormData] = useState({
    photos: [],
    description: "",
    partsUsed: "",
    timeSpent: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({ ...prev, photos: files }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Job completion submitted! Customer will verify shortly.")
      router.push("/")
    } catch (error) {
      alert("Failed to submit completion. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Mark Job Complete</h1>
        <p>Job #{jobId}</p>
      </header>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>Work Completion Details</h2>
            <p className="section-description">Provide details about the completed work to finalize the job.</p>

            <div className="form-group">
              <label>Upload Before/After Photos</label>
              <p className="form-hint">Upload at least 1 photo showing your completed work</p>
              <input type="file" multiple accept="image/*" onChange={handlePhotoChange} required />
              {formData.photos.length > 0 && <p className="file-count">{formData.photos.length} photo(s) selected</p>}
            </div>

            <div className="form-group">
              <label>Work Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what you did to fix the issue..."
                rows="5"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Parts/Materials Used</label>
                <input
                  type="text"
                  name="partsUsed"
                  value={formData.partsUsed}
                  onChange={handleChange}
                  placeholder="e.g., Tap washer, seal, valve"
                  required
                />
              </div>

              <div className="form-group">
                <label>Time Spent (hours)</label>
                <input
                  type="number"
                  name="timeSpent"
                  value={formData.timeSpent}
                  onChange={handleChange}
                  placeholder="e.g., 1.5"
                  step="0.5"
                  required
                />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>Summary</h2>
            <div className="completion-summary">
              <p>Once submitted, your work will be reviewed by the customer. Payment will be released upon approval.</p>
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Completion"}
            </button>
            <button type="button" className="cancel-btn" onClick={() => router.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
