

import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const blogPosts = [
    {
      id: 1,
      title: "10 Health Benefits of Almonds You Should Know",
      excerpt: "Discover the amazing health benefits of almonds and why they should be part of your daily diet.",
      image: "/images/premium-almonds.png",
      category: "health",
      author: "Dr. Priya Sharma",
      date: "2024-01-15",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "How to Store Dry Fruits for Maximum Freshness",
      excerpt:
        "Learn the best practices for storing different types of dry fruits to maintain their quality and taste.",
      image: "/images/blueberries.png",
      category: "tips",
      author: "Rajesh Kumar",
      date: "2024-01-10",
      readTime: "3 min read",
    },
    {
      id: 3,
      title: "Cashews: The Creamy Superfood",
      excerpt: "Everything you need to know about cashews, from their nutritional value to delicious recipe ideas.",
      image: "/images/cashew-nuts.jpg",
      category: "nutrition",
      author: "Chef Amit Patel",
      date: "2024-01-08",
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "5 Easy Dry Fruit Recipes for Healthy Snacking",
      excerpt: "Quick and delicious recipes using dry fruits that are perfect for healthy snacking anytime.",
      image: "/images/flax-seeds.png",
      category: "recipes",
      author: "Chef Amit Patel",
      date: "2024-01-05",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "The Journey of Dates: From Farm to Your Table",
      excerpt: "Follow the fascinating journey of dates from cultivation to processing and packaging.",
      image: "/images/hazelnuts.png",
      category: "farming",
      author: "Rajesh Kumar",
      date: "2024-01-03",
      readTime: "7 min read",
    },
    {
      id: 6,
      title: "Walnuts for Brain Health: Science-Backed Benefits",
      excerpt: "Scientific research shows how walnuts can boost brain function and cognitive health.",
      image: "/images/pistachios.png",
      category: "health",
      author: "Dr. Priya Sharma",
      date: "2024-01-01",
      readTime: "5 min read",
    },
  ]

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "health", label: "Health" },
    { value: "nutrition", label: "Nutrition" },
    { value: "recipes", label: "Recipes" },
    { value: "tips", label: "Tips" },
    { value: "farming", label: "Farming" },
  ]

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div
        className="blog-hero"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/blog-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "700" }}>Our Blog</h1>
          <p style={{ fontSize: "20px", maxWidth: "600px" }}>
            Discover tips, recipes, and insights about dry fruits, nutrition, and healthy living
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        {/* Search and Filter */}
        <div style={{ marginBottom: "50px" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1", minWidth: "300px" }}>
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  border: "1px solid #ddd",
                  borderRadius: "25px",
                  fontSize: "16px",
                }}
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: "12px 20px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "16px",
                  backgroundColor: "white",
                }}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "40px" }}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="blog-card"
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)"
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.15)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)"
                }}
              >
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />

                <div style={{ padding: "30px" }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", gap: "15px" }}>
                    <span
                      style={{
                        backgroundColor: "#ff6b35",
                        color: "white",
                        padding: "4px 12px",
                        borderRadius: "15px",
                        fontSize: "12px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                      }}
                    >
                      {post.category}
                    </span>
                    <span style={{ color: "#999", fontSize: "14px" }}>{post.readTime}</span>
                  </div>

                  <h3
                    style={{
                      fontSize: "20px",
                      marginBottom: "15px",
                      color: "#333",
                      lineHeight: "1.4",
                    }}
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      color: "#666",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "15px",
                      borderTop: "1px solid #eee",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "14px", color: "#333", fontWeight: "500", marginBottom: "2px" }}>
                        {post.author}
                      </p>
                      <p style={{ fontSize: "12px", color: "#999" }}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      style={{
                        color: "#ff6b35",
                        textDecoration: "none",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", paddingTop: "60px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>📝</div>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>No posts found</h3>
            <p style={{ color: "#666" }}>Try adjusting your search terms or category filter.</p>
          </div>
        )}

        {/* Newsletter Signup */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "60px 40px",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <h3 style={{ fontSize: "28px", marginBottom: "15px", color: "#333" }}>Stay Updated with Our Latest Posts</h3>
          <p style={{ color: "#666", marginBottom: "30px", fontSize: "16px" }}>
            Subscribe to our newsletter and never miss our latest articles about healthy living and nutrition.
          </p>
          <div style={{ display: "flex", maxWidth: "400px", margin: "0 auto", gap: "10px" }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: "1",
                padding: "12px 20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "16px",
              }}
            />
            <button className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Blog
