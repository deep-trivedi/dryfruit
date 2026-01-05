import { useState } from "react"
import { toast } from "react-toastify"
import Header from "../components/Header"
import Footer from "../components/Footer"
import emailjs from "emailjs-com"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.targetx   
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await emailjs.send(
      "service_x1y2z3",   // ✅ Your actual Service ID
      "template_a1b2c3",  // ✅ Your actual Template ID
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      },
      "AbCdEfGhIjKlMnOp"  // ✅ Your Public Key
    );
    toast.success("Message sent successfully!");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Failed to send message. Please try again.");
  }
};

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div
        className="contact-hero"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/contact-us-customer-service.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "700" }}>Contact Us</h1>
          <p style={{ fontSize: "20px" }}>We'd love to hear from you. Get in touch!</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
          {/* Contact Information */}
          <div>
            <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "#333" }}>Get In Touch</h2>
            <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "40px", color: "#666" }}>
              Have questions about our products or need assistance with your order? We're here to help! Reach out to us
              through any of the following channels.
            </p>

            <div style={{ marginBottom: "30px" }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "24px", marginRight: "15px", color: "#ff6b35" }}>📍</div>
                <div>
                  <h4 style={{ marginBottom: "5px", color: "#333" }}>Address</h4>
                  <p style={{ color: "#666" }}>123 Dry Fruit Street, Mumbai, Maharashtra 400001</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "24px", marginRight: "15px", color: "#ff6b35" }}>📞</div>
                <div>
                  <h4 style={{ marginBottom: "5px", color: "#333" }}>Phone</h4>
                  <p style={{ color: "#666" }}>+91 98765 43210</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "24px", marginRight: "15px", color: "#ff6b35" }}>✉️</div>
                <div>
                  <h4 style={{ marginBottom: "5px", color: "#333" }}>Email</h4>
                  <p style={{ color: "#666" }}>info@dryfruitstore.com</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "24px", marginRight: "15px", color: "#ff6b35" }}>🕒</div>
                <div>
                  <h4 style={{ marginBottom: "5px", color: "#333" }}>Business Hours</h4>
                  <p style={{ color: "#666" }}>
                    Mon - Sat: 9:00 AM - 7:00 PM
                    <br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 style={{ marginBottom: "15px", color: "#333" }}>Follow Us</h4>
              <div style={{ display: "flex", gap: "15px" }}>
                <a href="#" style={{ fontSize: "24px", color: "#ff6b35" }}>📘</a>
                <a href="#" style={{ fontSize: "24px", color: "#ff6b35" }}>📷</a>
                <a href="#" style={{ fontSize: "24px", color: "#ff6b35" }}>🐦</a>
                <a href="#" style={{ fontSize: "24px", color: "#ff6b35" }}>💼</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div
              className="contact-form"
              style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ fontSize: "24px", marginBottom: "30px", color: "#333" }}>Send us a Message</h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
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
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Related</option>
                    <option value="product">Product Information</option>
                    <option value="complaint">Complaint</option>
                    <option value="feedback">Feedback</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter your message here..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%" }}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
     <div
  style={{
    height: "400px",
    borderRadius: "10px",
    overflow: "hidden",
  }}
>
  <iframe
    title="Dry Fruit Store Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.722822706093!2d72.82645687501937!3d19.08148105240174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8f83dc75a67%3A0x41bbab9677ebca1e!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1730080453123!5m2!1sen!2sin"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>


      <Footer />
    </div>
  )
}

export default Contact
