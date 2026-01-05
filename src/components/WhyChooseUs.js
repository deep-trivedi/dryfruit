const WhyChooseUs = () => {
  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "Free shipping on orders over ₹500",
    },
    {
      icon: "🌟",
      title: "Premium Quality",
      description: "Hand-picked premium quality products",
    },
    {
      icon: "💯",
      title: "100% Natural",
      description: "No artificial colors or preservatives",
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "Safe and secure payment methods",
    },
  ]

  return (
    <section style={{ padding: "4rem 0", backgroundColor: "#f8f9fa" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>Why Choose Us</h2>
          <p style={{ fontSize: "1.1rem", color: "#666" }}>
            We provide the best quality products with excellent service
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                padding: "2rem",
                background: "white",
                borderRadius: "15px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.icon}</div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#333" }}>{feature.title}</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
