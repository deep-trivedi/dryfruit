

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"
import { products } from "../data/products"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number.parseInt(id))
    if (foundProduct) {
      setProduct(foundProduct)
    } else {
      toast.error("Product not found")
      navigate("/products")
    }
  }, [id, navigate])

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }
      toast.success(`${quantity} ${product.name}(s) added to cart!`)
    } else {
      toast.error("Product is out of stock!")
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity)
    }
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="product-detail-page">
      <Header />

      <div className="container">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")} className="breadcrumb-link">
            Home
          </span>
          <span className="separator">/</span>
          <span onClick={() => navigate("/products")} className="breadcrumb-link">
            Products
          </span>
          <span className="separator">/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img src={product.images ? product.images[selectedImage] : product.image} alt={product.name} />
              {product.stock === 0 && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? "active" : ""}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>

            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < product.rating ? "filled" : ""}`}></i>
              ))}
              <span className="rating-text">({product.rating} out of 5)</span>
            </div>

            <div className="product-price">
              <span className="current-price">₹{product.price}</span>
              {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
              {product.originalPrice && (
                <span className="discount">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.fullDescription || product.description}</p>
            </div>

            <div className="product-details">
              <h3>Product Details</h3>
              <ul>
                <li>
                  <strong>Category:</strong> {product.category}
                </li>
                <li>
                  <strong>Weight:</strong> {product.weight || "250g"}
                </li>
                <li>
                  <strong>Origin:</strong> {product.origin || "India"}
                </li>
                <li>
                  <strong>Shelf Life:</strong> {product.shelfLife || "12 months"}
                </li>
                <li>
                  <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
                </li>
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="quantity-btn">
                    -
                  </button>
                  <span className="quantity-display">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`add-to-cart-btn ${product.stock === 0 ? "disabled" : ""}`}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of Stock" : `Add ${quantity} to Cart`}
              </button>

              <button onClick={() => navigate("/products")} className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>

            <div className="product-benefits">
              <h3>Health Benefits</h3>
              <ul>
                {product.benefits ? (
                  product.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)
                ) : (
                  <>
                    <li>Rich in essential nutrients</li>
                    <li>Natural source of energy</li>
                    <li>Supports heart health</li>
                    <li>Boosts immunity</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="related-products">
          <h2>Related Products</h2>
          <div className="related-products-grid">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="related-product-card">
                  <img src={relatedProduct.image || "/placeholder.svg"} alt={relatedProduct.name} />
                  <h4>{relatedProduct.name}</h4>
                  <p>₹{relatedProduct.price}</p>
                  <button onClick={() => navigate(`/product/${relatedProduct.id}`)}>View Details</button>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductDetail
