"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")
  const router = useRouter()
  const [paymentStep, setPaymentStep] = useState("confirm") // confirm, processing, success
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const jobDetails = {
    id: jobId,
    title: "Kitchen Tap Repair",
    provider: "Ahmed Plumbing",
    serviceAmount: 120,
    platformFee: 18,
    totalAmount: 138,
  }

  const handleCardChange = (e) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setPaymentStep("processing")

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In production, this would call your backend to process the Stripe payment
      console.log("[Payment] Processing payment with card:", cardData)

      setPaymentStep("success")

      // Auto redirect after 3 seconds
      setTimeout(() => {
        router.push(`/jobs`)
      }, 3000)
    } catch (error) {
      console.error("Payment failed:", error)
      setPaymentStep("confirm")
      setIsProcessing(false)
      alert("Payment failed. Please try again.")
    }
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Secure Payment</h1>
        <p>Complete your booking with secure Stripe payment</p>
      </header>

      {paymentStep === "confirm" && (
        <div className="payment-wrapper">
          <div className="payment-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Service: {jobDetails.title}</span>
              <span>{jobDetails.provider}</span>
            </div>
            <div className="summary-item">
              <span>Service Cost</span>
              <span>£{jobDetails.serviceAmount}</span>
            </div>
            <div className="summary-item">
              <span>Platform Fee (15%)</span>
              <span>£{jobDetails.platformFee}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span>£{jobDetails.totalAmount}</span>
            </div>

            <div className="payment-info">
              <p>Your payment will be held securely in escrow until the job is completed.</p>
            </div>
          </div>

          <form onSubmit={handlePaymentSubmit} className="payment-form">
            <h2>Payment Details</h2>

            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={cardData.cardName}
                onChange={handleCardChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleCardChange}
                placeholder="4242 4242 4242 4242"
                maxLength="19"
                required
              />
              <p className="help-text">Use test card: 4242 4242 4242 4242</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleCardChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  value={cardData.cvc}
                  onChange={handleCardChange}
                  placeholder="123"
                  maxLength="3"
                  required
                />
              </div>
            </div>

            <div className="payment-agreement">
              <input type="checkbox" required />
              <label>I agree to the terms and confirm this payment</label>
            </div>

            <button type="submit" className="pay-button" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay £${jobDetails.totalAmount}`}
            </button>
          </form>
        </div>
      )}

      {paymentStep === "processing" && (
        <div className="payment-status processing">
          <div className="status-card">
            <div className="spinner"></div>
            <h2>Processing Payment</h2>
            <p>Please wait while we process your payment securely...</p>
          </div>
        </div>
      )}

      {paymentStep === "success" && (
        <div className="payment-status success">
          <div className="status-card">
            <div className="success-icon">✓</div>
            <h2>Payment Successful!</h2>
            <p>Your booking is confirmed.</p>
            <div className="success-details">
              <p>
                <strong>Transaction ID:</strong> TXN#{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p>
                <strong>Amount:</strong> £{jobDetails.totalAmount}
              </p>
              <p>
                <strong>Status:</strong> Payment held in escrow
              </p>
            </div>
            <p className="success-message">You will be redirected shortly...</p>
          </div>
        </div>
      )}
    </div>
  )
}
