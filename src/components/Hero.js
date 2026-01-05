import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="fade-in">We Serve Fresh Dry Fruits & Nuts</h1>
        <p className="fade-in">Premium quality dry fruits, nuts, and healthy snacks delivered fresh to your doorstep</p>
        <Link to="/products" className="btn-primary fade-in">
          Shop Now
        </Link>
      </div>
    </section>
  )
}

export default Hero
