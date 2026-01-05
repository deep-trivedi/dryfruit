import Header from "../components/Header"
import Footer from "../components/Footer"

const About = () => {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div
        className="about-hero"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/about-hero.jpg')",
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
          <h1 style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "700" }}>About DryFruit Store</h1>
          <p style={{ fontSize: "20px", maxWidth: "600px" }}>
            Your trusted source for premium quality dry fruits and nuts since 2010
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "36px", marginBottom: "30px", color: "#333" }}>Our Story</h2>
            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "20px", color: "#666" }}>
              Founded in 2010, DryFruit Store began as a small family business with a simple mission: to provide the
              highest quality dry fruits and nuts to health-conscious consumers.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "20px", color: "#666" }}>
              Over the years, we've built strong relationships with farmers and suppliers worldwide, ensuring that every
              product meets our strict quality standards. From premium almonds to exotic dried fruits, we source only
              the best.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#666" }}>
              Today, we're proud to serve thousands of customers across the country, delivering nutrition and taste
              right to their doorstep.
            </p>
          </div>
          <div>
            <img
              src="/images/ourstory.png"
              alt="Our Story"
              style={{ width: "100%", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div style={{ backgroundColor: "#f8f9fa", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "60px", color: "#333" }}>Our Values</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
            <div style={{ textAlign: "center", padding: "30px" }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🌱</div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>Quality First</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                We source only the finest quality dry fruits and nuts, ensuring freshness and nutritional value in every
                product.
              </p>
            </div>

            <div style={{ textAlign: "center", padding: "30px" }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>🤝</div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>Trust & Transparency</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                We believe in honest business practices and transparent communication with our customers and suppliers.
              </p>
            </div>

            <div style={{ textAlign: "center", padding: "30px" }}>
              <div style={{ fontSize: "48px", marginBottom: "20px" }}>💚</div>
              <h3 style={{ fontSize: "24px", marginBottom: "15px", color: "#333" }}>Health & Wellness</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                We're committed to promoting healthy living through nutritious, natural dry fruits and nuts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <h2 style={{ textAlign: "center", fontSize: "36px", marginBottom: "60px", color: "#333" }}>Meet Our Team</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          <div style={{ textAlign: "center" }}>
            <img
              src="/images/rajesh.jpeg"
              alt="Rajesh Kumar"
              style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#333" }}>Rajesh Kumar</h3>
            <p style={{ color: "#ff6b35", marginBottom: "10px", fontWeight: "500" }}>Founder & CEO</p>
            <p style={{ color: "#666", fontSize: "14px" }}>
              With 15+ years in the food industry, Rajesh leads our vision of bringing quality dry fruits to every home.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <img
              src="/images/priya.jpeg"
              alt="Priya Sharma"
              style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#333" }}>Priya Sharma</h3>
            <p style={{ color: "#ff6b35", marginBottom: "10px", fontWeight: "500" }}>Quality Manager</p>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Priya ensures every product meets our high standards through rigorous quality control processes.
            </p>
          </div>

          <div style={{ textAlign: "center" }}>
            <img
              src="/images/amit.jpeg"
              alt="Amit Patel"
              style={{ width: "200px", height: "200px", borderRadius: "50%", objectFit: "cover", marginBottom: "20px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#333" }}>Amit Patel</h3>
            <p style={{ color: "#ff6b35", marginBottom: "10px", fontWeight: "500" }}>Operations Head</p>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Amit manages our supply chain and ensures timely delivery of fresh products to our customers.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ backgroundColor: "#ff6b35", color: "white", paddingTop: "60px", paddingBottom: "60px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", textAlign: "center" }}>
            <div>
              <h3 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "10px" }}>10K+</h3>
              <p style={{ fontSize: "18px" }}>Happy Customers</p>
            </div>
            <div>
              <h3 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "10px" }}>50+</h3>
              <p style={{ fontSize: "18px" }}>Product Varieties</p>
            </div>
            <div>
              <h3 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "10px" }}>13+</h3>
              <p style={{ fontSize: "18px" }}>Years Experience</p>
            </div>
            <div>
              <h3 style={{ fontSize: "48px", fontWeight: "700", marginBottom: "10px" }}>100%</h3>
              <p style={{ fontSize: "18px" }}>Quality Guarantee</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default About
