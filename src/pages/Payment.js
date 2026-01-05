

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

const Payment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartItems, clearCart, getCartTotal } = useCart()
  const { user } = useAuth()

  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue with payment")
      navigate("/login")
      return
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty")
      navigate("/cart")
      return
    }

    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData)
    } else {
      toast.error("Order information not found")
      navigate("/checkout")
    }
  }, [user, cartItems, navigate, location.state])

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      switch (paymentMethod) {
        case "cod":
          toast.success("Order placed successfully! You will pay on delivery.")
          break
        case "upi":
          toast.success("Payment successful via UPI!")
          break
        case "paypal":
          toast.success("Payment successful via PayPal!")
          break
        default:
          toast.error("Invalid payment method")
          return
      }

      clearCart()

      setTimeout(() => {
        navigate("/", {
          state: {
            message: "Order placed successfully!",
            orderId: `ORD${Date.now()}`,
          },
        })
      }, 1500)
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!orderData) {
    return (
      <div className="payment-page">
        <Header />
        <div className="container">
          <div className="loading">Loading payment details...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="payment-page">
      <Header />

      <div className="container">
        <div className="payment-header">
          <h1>Complete Your Payment</h1>
          <p>Choose your preferred payment method</p>
        </div>

        <div className="payment-content">
          <div className="payment-methods">
            <h2>Payment Methods</h2>

            <div className="payment-options">
              <div className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                <input
                  type="radio"
                  id="cod"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="cod">
                  <div className="payment-icon">💵</div>
                  <div className="payment-details">
                    <h3>Cash on Delivery</h3>
                    <p>Pay when your order arrives</p>
                  </div>
                </label>
              </div>

              <div className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                <input
                  type="radio"
                  id="upi"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="upi">
                  <div className="payment-icon">📱</div>
                  <div className="payment-details">
                    <h3>UPI Payment</h3>
                    <p>Pay instantly using UPI</p>
                  </div>
                </label>
              </div>

              <div className={`payment-option ${paymentMethod === "paypal" ? "selected" : ""}`}>
                <input
                  type="radio"
                  id="paypal"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label htmlFor="paypal">
                  <div className="payment-icon">💳</div>
                  <div className="payment-details">
                    <h3>PayPal</h3>
                    <p>Secure payment with PayPal</p>
                  </div>
                </label>
              </div>
            </div>

            {paymentMethod === "upi" && (
              <div className="upi-details">
                <h3>UPI Payment Details</h3>
                <p>You will be redirected to your UPI app to complete the payment</p>
                <div className="upi-id">
                  <strong>Merchant UPI ID:</strong> dryfruits@upi
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="paypal-details">
                <h3>PayPal Payment</h3>
                <p>You will be redirected to PayPal to complete your payment securely</p>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Price: ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="item-total">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>₹{orderData.shippingCost || 0}</span>
              </div>
              <div className="total-row">
                <span>Tax:</span>
                <span>₹{orderData.tax || 0}</span>
              </div>
              <div className="total-row final-total">
                <span>Total:</span>
                <span>₹{getCartTotal() + (orderData.shippingCost || 0) + (orderData.tax || 0)}</span>
              </div>
            </div>

            <div className="shipping-address">
              <h3>Shipping Address</h3>
              <div className="address-details">
                <p>
                  <strong>{orderData.fullName}</strong>
                </p>
                <p>{orderData.address}</p>
                <p>
                  {orderData.city}, {orderData.state} {orderData.zipCode}
                </p>
                <p>Phone: {orderData.phone}</p>
                <p>Email: {orderData.email}</p>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`payment-btn ${isProcessing ? "processing" : ""}`}
            >
              {isProcessing
                ? "Processing..."
                : `Pay ₹${getCartTotal() + (orderData.shippingCost || 0) + (orderData.tax || 0)}`}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Payment
