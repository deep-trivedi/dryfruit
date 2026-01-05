

import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const user = {
        id: 1,
        email: formData.email,
        name: "User",
      }

      login(user)
      toast.success("Login successful!")
      navigate("/")
    } catch (error) {
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      <div
        className="login-page"
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
            <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Login to Your Account</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div
                className="form-group"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    style={{ marginRight: "8px" }}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" style={{ color: "#ff6b35", textDecoration: "none" }}>
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", marginTop: "20px" }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p>
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "#ff6b35", textDecoration: "none" }}>
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
