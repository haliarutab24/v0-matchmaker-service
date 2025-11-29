"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SERVICES = [
  { id: "plumbing", name: "Plumbing", subcategories: ["Tap Repair", "Leak Fix", "Pipe Installation"] },
  { id: "electrical", name: "Electrical", subcategories: ["Socket Install", "Light Fix", "Fault Repair"] },
  { id: "cleaning", name: "Cleaning", subcategories: ["House Clean", "Window Clean", "Carpet Clean"] },
  { id: "carpentry", name: "Carpentry", subcategories: ["Furniture", "Door Repair", "Shelving"] },
]

export default function PostJobPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    service: "",
    subcategory: "",
    description: "",
    location: "",
    date: "",
    timeSlot: "",
    budget: "",
    photos: [],
  })
  const [selectedService, setSelectedService] = useState(null)

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId)
    setFormData((prev) => ({ ...prev, service: serviceId, subcategory: "" }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({ ...prev, photos: files }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Simulate job posting
    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      title: `${formData.subcategory} - ${formData.service}`,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      budget: formData.budget,
      status: "posted",
      createdAt: new Date().toISOString(),
    }

    console.log("Job posted:", newJob)
    alert("Job posted successfully! An agent will contact you soon.")
    router.push("/jobs")
  }

  const currentService = SERVICES.find((s) => s.id === selectedService)

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Post a New Job</h1>
        <p>Tell us what you need and we'll find the perfect professional</p>
      </header>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>Step 1: Select Service</h2>
            <div className="service-grid">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={`service-btn ${selectedService === service.id ? "active" : ""}`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </section>

          {selectedService && (
            <>
              <section className="form-section">
                <h2>Step 2: Specify Service</h2>
                <div className="form-group">
                  <label>What exactly do you need?</label>
                  <select name="subcategory" value={formData.subcategory} onChange={handleChange} required>
                    <option value="">Select service...</option>
                    {currentService?.subcategories.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <section className="form-section">
                <h2>Step 3: Describe the Problem</h2>
                <div className="form-group">
                  <label>Tell us about the issue (min 20 characters)</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the problem in detail..."
                    rows="5"
                    minLength="20"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Upload Photos (Optional)</label>
                  <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
                  {formData.photos.length > 0 && (
                    <p className="file-count">{formData.photos.length} photo(s) selected</p>
                  )}
                </div>
              </section>

              <section className="form-section">
                <h2>Step 4: Schedule & Budget</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>When do you need it?</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Time Slot</label>
                    <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
                      <option value="">Select time...</option>
                      <option value="morning">Morning (9am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-5pm)</option>
                      <option value="evening">Evening (5pm-8pm)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter your postcode or address"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Budget (GBP)</label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., 150"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <button type="submit" className="submit-button">
                  Post Job
                </button>
              </section>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
