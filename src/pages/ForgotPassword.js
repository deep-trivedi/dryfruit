

import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "../components/Header"
import Footer from "../components/Footer"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setEmailSent(true)
      toast.success("Password reset link sent to your email!")
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div
        className="forgot-password-page"
        style={{ minHeight: "80vh", display: "flex", alignItems: "center", backgroundColor: "#f8f9fa" }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              backgroundColor: "white",
              padding: "40px",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {!emailSent ? (
              <>
                <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Forgot Password?</h2>
                <p style={{ textAlign: "center", marginBottom: "30px", color: "#666" }}>
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "48px", color: "#82ca9d", marginBottom: "20px" }}>✓</div>
                <h2 style={{ marginBottom: "20px", color: "#333" }}>Email Sent!</h2>
                <p style={{ marginBottom: "30px", color: "#666" }}>
                  We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the
                  instructions to reset your password.
                </p>
                <p style={{ fontSize: "14px", color: "#999" }}>
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Link to="/login" style={{ color: "#ff6b35", textDecoration: "none" }}>
                ← Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ForgotPassword
