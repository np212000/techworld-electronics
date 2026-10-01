import {Link} from "react-router-dom";
import "../styles/footer.css";

function Footer()
{
  return(
    <footer className="tech-footer">
      <div className="container">
        <div className="row gy-5">

          <div className="col-lg-4">

            <Link to = "/" className="footer-logo">
            <span className="logo-icon"><i className="bi bi-cpu"></i></span>
            Tech<span>World</span>
            </Link>

            <p className="footer-description">
              Your destination for moder electronics, smart gadgets
              and technology that keeps you ahead.
            </p>

            <div className="social-links">
              <Link to="!#" aria-label="Facebook"><i className="bi bi-facebook"></i></Link>
              <Link to="!#" aria-label="Instagram"><i className="bi bi-instagram"></i></Link>
              <Link to="!#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></Link>
              <Link to="!#" aria-label="YouTube"><i className="bi bi-youtube"></i></Link>
            </div>

          </div>

          <div className="col-6 col-lg-2">

            <h2>Shop</h2>
            
            <ul>
              <li><Link to = "/products">All Products</Link></li>
              <li><Link to = "/products">SmartPhones</Link></li>
              <li><Link to = "/products">Laptops</Link></li>
              <li><Link to = "/products">Audio</Link></li>
              <li><Link to = "/products">Wearables</Link></li>
            </ul>

          </div>

          <div className="col-lg-4">

            <h4>Stay Updated</h4>
            <p className="newsletter-text">
            Get updates about products, special offers and exclusive tech deals.
            </p>

            <div className="newsletter-form">

              <input type="email" placeholder="Enter your email" aria-label="Email address"/>
              <button type="button"><i className="bi bi-arrow-right"></i></button>

            </div>

          </div>
        </div>

        <div className="footer-bottom">

          <p>© 2026 TechWorld. All rights reserved.</p>
          <div>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Support</span>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;