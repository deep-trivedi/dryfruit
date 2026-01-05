
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { products } from "../data/products"

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="featured-products" style={{ padding: "4rem 0", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>Featured Products</h2>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>Discover our premium selection of dry fruits and nuts</p>
      </div>

      <div className="products-grid">
        {featuredProducts.map((product) => (
          <div key={product.id} className={`product-card ${product.stock <= 0 ? "out-of-stock" : ""}`}>
            {product.stock <= 0 && <span className="out-of-stock">Out of Stock</span>}
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <div className="product-actions">
                <button className="btn-secondary" onClick={() => addToCart(product)} disabled={product.stock <= 0}>
                  Add to Cart
                </button>
                <Link to={`/product/${product.id}`} className="eye-icon">
                  👁️
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <Link to="/products" className="btn-primary">
          View All Products
        </Link>
      </div>
    </section>
  )
}

export default FeaturedProducts
