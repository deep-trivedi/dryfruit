import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>DryFruit</h3>
          <p>Premium quality dry fruits, nuts, and healthy snacks delivered fresh to your doorstep.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              📘
            </a>
            <a href="#" aria-label="Twitter">
              🐦
            </a>
            <a href="#" aria-label="Instagram">
              📷
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>
              <a href="#">Almonds</a>
            </li>
            <li>
              <a href="#">Cashews</a>
            </li>
            <li>
              <a href="#">Walnuts</a>
            </li>
            <li>
              <a href="#">Dates</a>
            </li>
            <li>
              <a href="#">Raisins</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul>
            <li>📍 123 Nut Street, Food City</li>
            <li>📞 +1 234 567 8900</li>
            <li>✉️ info@Dryfruit.com</li>
            <li>🕒 Mon-Fri: 9AM-6PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 DryFruit. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
