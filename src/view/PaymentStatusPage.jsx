"use client"

import { useState } from "react"

export default function PaymentStatusPage() {
  const [transactions] = useState([
    {
      id: "TXN001",
      date: "2024-01-15",
      description: "Kitchen Tap Repair - Ahmed",
      amount: "£138",
      status: "Released to Provider",
      statusColor: "#10b981",
    },
    {
      id: "TXN002",
      date: "2024-01-12",
      description: "Bathroom Cleaning - Jane Pro",
      amount: "£95",
      status: "In Escrow",
      statusColor: "#f59e0b",
    },
  ])

  const [accountBalance] = useState({
    available: "£240",
    onHold: "£95",
    total: "£335",
  })

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Payment History & Balance</h1>
        <p>Track your payments and account balance</p>
      </header>

      <div className="balance-cards">
        <div className="balance-card">
          <h3>Available Balance</h3>
          <p className="balance-amount">{accountBalance.available}</p>
        </div>
        <div className="balance-card">
          <h3>On Hold (Escrow)</h3>
          <p className="balance-amount">{accountBalance.onHold}</p>
        </div>
        <div className="balance-card highlight">
          <h3>Total Paid</h3>
          <p className="balance-amount">{accountBalance.total}</p>
        </div>
      </div>

      <section className="transactions-section">
        <h2>Transaction History</h2>
        <div className="transactions-table">
          <div className="table-header">
            <div className="table-cell">Date</div>
            <div className="table-cell">Description</div>
            <div className="table-cell">Amount</div>
            <div className="table-cell">Status</div>
          </div>
          {transactions.map((tx) => (
            <div key={tx.id} className="table-row">
              <div className="table-cell">{tx.date}</div>
              <div className="table-cell">{tx.description}</div>
              <div className="table-cell table-amount">{tx.amount}</div>
              <div className="table-cell">
                <span className="status-badge" style={{ backgroundColor: tx.statusColor }}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="payment-info">
        <h2>How Payments Work</h2>
        <div className="info-boxes">
          <div className="info-box">
            <h4>Booking Payment</h4>
            <p>
              When you book a service, payment is held securely in escrow. You have full protection until the job is
              completed.
            </p>
          </div>
          <div className="info-box">
            <h4>Job Completion</h4>
            <p>
              Once the job is marked complete and you confirm, payment is automatically released to the service
              provider.
            </p>
          </div>
          <div className="info-box">
            <h4>Payment Release</h4>
            <p>
              Payments are released to providers 1-2 business days after job completion. Our platform fee is deducted
              automatically.
            </p>
          </div>
          <div className="info-box">
            <h4>Disputes</h4>
            <p>If there's an issue, contact our support team. We can hold or reverse payments to protect you.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
