

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"
import { products } from "../data/products"

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { addToCart } = useCart()

  const categories = ["all", "nuts", "dried-fruits","seeds", "berries"]

  useEffect(() => {
    let filtered = products

    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    filtered.sort((a, b) => {
       switch (sortBy) {
      case "name":
        return b.name.localeCompare(a.name); 
      case "name-desc":
        return a.name.localeCompare(b.name); 
      case "price-low":
        return b.price - a.price; 
      case "price-high":
        return a.price - b.price; 
      case "rating":
        return b.rating - a.rating; 
      default:
        return 0;
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, sortBy, selectedCategory])

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      addToCart(product)
      toast.success(`${product.name} added to cart!`)
    } else {
      toast.error("Product is out of stock!")
    }
  }

  return (
    
    <div className="products-page">
      <Header />


      <div className="hero-section" style={{ padding: "4rem 0", background: "#98730ccd" }}>
  <div
    className="container"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "2rem",
      flexWrap: "wrap",
    }}
  >
    {/* Left side text */}



    
    <div style={{ flex: "1 1 400px" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "700", color: "#333" }}>
        Premium Dry Fruits & Nuts
      </h1>
      <p style={{ fontSize: "20px", maxWidth: "600px", color: "#555" }}>
        Discover our finest collection of healthy, premium quality dry fruits, nuts, seeds, and
        berries. Packed with nutrition and freshness since 2010.
      </p>
    </div>

    {/* Right side image */}
    <div style={{ flex: "1 1 400px", textAlign: "center" }}>
      <img
        src="/images/propage.png"
        alt="Dry Fruits Banner"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  </div>
</div>


      
      <br/>

      <div className="container">
       <div
  className="filters-section"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap", // keeps it responsive on smaller screens
  }}
>
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
    style={{
      flex: "1",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      minWidth: "200px",
    }}
  />

  {/* Category Filter */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="filter-select"
    style={{
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      minWidth: "160px",
    }}
  >
    {categories.map((category) => (
      <option key={category} value={category}>
        {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
      </option>
    ))}
  </select>

  {/* Sort Dropdown */}
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="sort-select"
    style={{
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      minWidth: "160px",
    }}
  >
    <option value="name">Sort A–Z</option>
        <option value="name-desc">Sort Z–A</option>
    <option value="price-low">Price: Low to High</option>
    <option value="price-high">Price: High to Low</option>
    <option value="rating">Highest Rated</option>
  </select>
</div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image || "/placeholder.svg"} alt={product.name} />
                {product.stock === 0 && <div className="out-of-stock">Out of Stock</div>}
                <div className="product-overlay">
                  <Link to={`/product/${product.id}`} className="view-details">
                    <i className="fas fa-eye"></i>
                  </Link>
                </div>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < product.rating ? "filled" : ""}`}></i>
                  ))}
                  <span>({product.rating})</span>
                </div>
                <div className="product-price">
                  <span className="current-price">₹{product.price}</span>
                  {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`add-to-cart-btn ${product.stock === 0 ? "disabled" : ""}`}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Products
