

import { useContext } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { CartContext } from "../context/CartContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useContext(CartContext)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      toast.info("Item removed from cart")
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id, name) => {
    removeFromCart(id)
    toast.success(`${name} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success("Cart cleared")
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <div
          className="empty-cart"
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f9fa",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🛒</div>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>Your Cart is Empty</h2>
            <p style={{ marginBottom: "30px", color: "#666" }}>Add some delicious dry fruits to get started!</p>
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div
        className="cart-page"
        style={{ minHeight: "80vh", backgroundColor: "#f8f9fa", paddingTop: "40px", paddingBottom: "40px" }}
      >
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h1 style={{ color: "#333" }}>Shopping Cart ({cartItems.length} items)</h1>
            <button onClick={handleClearCart} className="btn" style={{ backgroundColor: "#dc3545", color: "white" }}>
              Clear Cart
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
            {/* Cart Items */}
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-item"
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  />

                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: "5px", color: "#333" }}>{item.name}</h3>
                    <p style={{ color: "#666", marginBottom: "10px" }}>₹{item.price} per kg</p>
                    {item.stock < 5 && (
                      <p style={{ color: "#ff6b35", fontSize: "14px", fontWeight: "500" }}>
                        Only {item.stock} left in stock!
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid #ddd",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                    <span style={{ minWidth: "30px", textAlign: "center", fontWeight: "500" }}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid #ddd",
                        backgroundColor: item.quantity >= item.stock ? "#f5f5f5" : "white",
                        borderRadius: "4px",
                        cursor: item.quantity >= item.stock ? "not-allowed" : "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: "right", minWidth: "100px" }}>
                    <p style={{ fontWeight: "600", fontSize: "18px", color: "#333" }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#dc3545",
                        cursor: "pointer",
                        fontSize: "14px",
                        marginTop: "5px",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div
                className="order-summary"
                style={{
                  backgroundColor: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  position: "sticky",
                  top: "20px",
                }}
              >
                <h3 style={{ marginBottom: "20px", color: "#333" }}>Order Summary</h3>

                <div style={{ borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span>Subtotal:</span>
                    <span>₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span>Shipping:</span>
                    <span>{getCartTotal() > 500 ? "Free" : "₹50"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span>Tax:</span>
                    <span>₹{(getCartTotal() * 0.05).toFixed(2)}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  <span>Total:</span>
                  <span>₹{(getCartTotal() + (getCartTotal() > 500 ? 0 : 50) + getCartTotal() * 0.05).toFixed(2)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary"
                  style={{ width: "100%", textAlign: "center", display: "block", textDecoration: "none" }}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/products"
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "15px",
                    color: "#ff6b35",
                    textDecoration: "none",
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart
