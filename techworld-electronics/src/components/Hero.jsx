import {Link} from "react-router-dom";
import "../styles/hero.css";

const BASE_URL = import.meta.env.BASE_URL;

function Hero()
{
  return(
    <section className="hero-section" 
    style={{backgroundImage : `url(${BASE_URL}images/banners.hero.jpg)`}}>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <div className="row align-items-center">
          <div className="col-lg-7">

            <div className="hero-badge">
              <i className="bi bi-lightning-charge-fill"> Next-Gen Technology</i>
            </div>

            <h1>Power Your <span> Digital Life.</span></h1>
            <p className="hero-description">
              Discover the latest smartphones, laptops, audio devices,<br></br>
              wearables and gadgets designed to make every moment smarter.
            </p>

            <div className="hero-button">

              <Link to="/products" className="hero-primary-btn">
              Shop Now
              <i className="bi bi-arrow-right"></i>
              </Link>

              <Link className="hero-secondary-btn" to="/products">Explore Deals</Link>
            </div>

            <div className="hero-trust">
            <div>
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>50k</strong>
              <span>Happy Customers</span>
            </div>

            <div>
              <strong>4.8/5</strong>
              <span>Customer Rating</span>
            </div>

          </div>
        </div>

        <div className="col-lg-5 d-none d-lg-block">

          <div className="hero-floating-card card-one">
            <i className="bi bi-cpu"></i>
            <div>
              <strong>Latest Tech</strong>
              <small>Always ahead</small>
            </div>
          </div>

          <div className="hero-floating-card card-two">
            <i className="bi bi-truck"></i>
            <div>
              <strong>Fast Delivery</strong>
              <small>Across India</small>
            </div>
          </div>

          <div className="hero-tech-circle"><i className="bi bi-phone"></i></div>

        </div>
      </div>
      </div>

    </section>
  );
}

export default Hero;

