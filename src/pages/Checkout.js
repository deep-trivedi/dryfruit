

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { CartContext } from "../context/CartContext"
import { AuthContext } from "../context/AuthContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  })

  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate("/login")
    return null
  }

  if (cartItems.length === 0) {
    navigate("/cart")
    return null
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const requiredFields = ["firstName", "lastName", "email", "phone", "address", "city", "state", "pincode"]
    const missingFields = requiredFields.filter((field) => !shippingInfo[field])

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!/^\d{10}$/.test(shippingInfo.phone)) {
      toast.error("Please enter a valid 10-digit phone number")
      return
    }

    if (!/^\d{6}$/.test(shippingInfo.pincode)) {
      toast.error("Please enter a valid 6-digit pincode")
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const order = {
        id: Date.now(),
        items: cartItems,
        shippingInfo,
        paymentMethod,
        total: getCartTotal() + (getCartTotal() > 500 ? 0 : 50) + getCartTotal() * 0.05,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      }

      // Store order in localStorage (in real app, this would be API call)
      const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      localStorage.setItem("orders", JSON.stringify([...existingOrders, order]))

      // Clear cart
      clearCart()

      toast.success("Order placed successfully!")
      navigate("/payment", { state: { order } })
    } catch (error) {
      toast.error("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  return (
    <div>
      <Header />
      <div className="checkout-page" style={{ backgroundColor: "#f8f9fa", paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="container">
          <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "40px" }}>
              {/* Shipping Information */}
              <div>
                <div className="card" style={{ padding: "30px", marginBottom: "30px" }}>
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>Shipping Information</h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address *</label>
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter your full address"
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px" }}>
                    <div className="form-group">
                      <label>City *</label>
                      <input type="text" name="city" value={shippingInfo.city} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={shippingInfo.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card" style={{ padding: "30px" }}>
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>Payment Method</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "cod" ? "#f0f8ff" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <strong>Cash on Delivery (COD)</strong>
                        <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
                          Pay when you receive your order
                        </p>
                      </div>
                    </label>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "upi" ? "#f0f8ff" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <strong>UPI Payment</strong>
                        <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
                          Pay using Google Pay, PhonePe, Paytm, etc.
                        </p>
                      </div>
                    </label>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "15px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "paypal" ? "#f0f8ff" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      <div>
                        <strong>PayPal</strong>
                        <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#666" }}>
                          Pay securely with your PayPal account
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="card" style={{ padding: "30px", position: "sticky", top: "20px" }}>
                  <h3 style={{ marginBottom: "20px", color: "#333" }}>Order Summary</h3>

                  {/* Order Items */}
                  <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "20px" }}>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 0",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <div>
                          <p style={{ fontWeight: "500" }}>{item.name}</p>
                          <p style={{ fontSize: "14px", color: "#666" }}>Qty: {item.quantity}</p>
                        </div>
                        <p style={{ fontWeight: "500" }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span>Shipping:</span>
                      <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                      <span>Tax (5%):</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "18px",
                        fontWeight: "600",
                        borderTop: "1px solid #eee",
                        paddingTop: "15px",
                      }}
                    >
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ width: "100%", marginTop: "20px" }}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Checkout
