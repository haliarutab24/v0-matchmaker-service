"use client"

import { useState } from "react"

export default function ProviderProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Ahmed Plumbing",
    email: "ahmed@plumbing.com",
    phone: "+44 7700 123456",
    services: ["Plumbing", "Drainage", "Emergency Repairs"],
    experience: "8 years",
    rating: 4.9,
    completedJobs: 50,
    bio: "Experienced plumber with focus on quality service and customer satisfaction. Fully insured and available 24/7.",
    insuranceExpiry: "2025-12-31",
    certifications: ["Gas Safe Register", "Water Regulations Approved"],
    availability: "Available weekdays and weekends",
  })

  const [editForm, setEditForm] = useState(profile)

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setProfile(editForm)
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>My Professional Profile</h1>
        <p>Manage your professional information and credentials</p>
      </header>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">AP</div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p className="rating">Rating: {profile.rating} (50+ completed jobs)</p>
          </div>
          {!isEditing && (
            <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>

        <div className="profile-content">
          {!isEditing ? (
            <>
              <section className="profile-section">
                <h3>Contact Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Email</label>
                    <p>{profile.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <p>{profile.phone}</p>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h3>Professional Details</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Services Offered</label>
                    <p>{profile.services.join(", ")}</p>
                  </div>
                  <div className="info-item">
                    <label>Experience</label>
                    <p>{profile.experience}</p>
                  </div>
                  <div className="info-item">
                    <label>Availability</label>
                    <p>{profile.availability}</p>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h3>Credentials & Insurance</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Insurance Expiry</label>
                    <p>{profile.insuranceExpiry}</p>
                  </div>
                  <div className="info-item">
                    <label>Certifications</label>
                    <p>{profile.certifications.join(", ")}</p>
                  </div>
                </div>
              </section>

              <section className="profile-section">
                <h3>About Me</h3>
                <p>{profile.bio}</p>
              </section>

              <section className="profile-section">
                <h3>Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-value">{profile.completedJobs}</div>
                    <div className="stat-name">Jobs Completed</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{profile.rating}</div>
                    <div className="stat-name">Average Rating</div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <form className="edit-form">
              <section className="profile-section">
                <h3>Edit Profile</h3>

                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" name="name" value={editForm.name} onChange={handleEditChange} />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={editForm.email} onChange={handleEditChange} />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" name="phone" value={editForm.phone} onChange={handleEditChange} />
                </div>

                <div className="form-group">
                  <label>Services (comma separated)</label>
                  <input
                    type="text"
                    name="services"
                    value={editForm.services.join(", ")}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        services: e.target.value.split(",").map((s) => s.trim()),
                      }))
                    }
                  />
                </div>

                <div className="form-group">
                  <label>About You</label>
                  <textarea name="bio" value={editForm.bio} onChange={handleEditChange} rows="5" />
                </div>

                <div className="form-group">
                  <label>Availability</label>
                  <input type="text" name="availability" value={editForm.availability} onChange={handleEditChange} />
                </div>

                <div className="form-actions">
                  <button type="button" className="save-btn" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </section>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
