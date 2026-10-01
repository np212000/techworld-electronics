import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/about.css";

function About()
{
  return (
    <>
    <Navbar />

    <main className="about-page">

      {/* Hero section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">

            <span>ABOUT TECHWORLD</span>
            <h1>Technology That Fits<br />Your World.</h1>
            <p>
              TechWorld brings smartphones, laptops, audio devices, wearables, and everyday tech
              accessories together in one simple shopping ecpericence.
            </p>

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="about-intro section-space">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-intro-content">

                <span>WHO WE ARE</span>
                <h2>Your Everyday <br/>Tech Destination</h2>
                <p>
                  TechWorld is a modern electronics and gadgets store created to make discovering
                  technology easier and more enjoyable.
                </p>
                <p>
                  From poweful smartphones, and laptops to headphones, smartwatches, speakes, and 
                  useful accessories, our collection focuses on products that fit different 
                  lifestlyes and everyday needs.
                </p>
                <p>
                  Our goal is simple : provide a clean, convenient, and user-friendly shopping
                  experience from products discovery to checkout.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-visual">

                <div className="about-visual-icon"><i className="bi bi-cpu"></i></div>
                <h3>Smart. Simple. Connected.</h3>
                <p>Explore technology designed for the way you live, work, create, and connect.</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Features */}
      <section className="about-features section-space">
        <div className="container">
          <div className="about-section-heading">

            <span>WHY TECHWORLD</span>
            <h2>Everything You Need in One Place</h2>
            <p>Designed around a simple and enjoyable shopping experience.</p>

          </div>

          <div className="row g-4 mt-2">

            {/*Feature 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="about-feature-card">

                <div className="about-feature-icon"><i className="bi bi-grid"></i></div>
                <h3>Wide Selection</h3>
                <p>Discover products across smartphones, laptops, audio, wearables, and accessories.</p>

              </div>
            </div>
            
            {/*Features 2 */}
            <div className="cd-md-6 col-lg-3">
              <div className="about-feature-card">

                <div className="about-feature-icon"><i className="bi bi-search"></i></div>
                <h3>Easy Discovery</h3>
                <p>Search, filter, cpmpare , and explore products without unnecessary complexity.</p>

              </div>
            </div>

            {/*Feature 3*/}
            <div className="cd-md-6 col-lg-3">
              <div className="about-feature-card">

                <div className="about-feature-icon"><i className="bi bi-heart"></i></div>
                <h3>Wishlist</h3>
                <p>Save products you love and come back to them whenever you are ready.</p>

              </div>
            </div>

            {/*Feature 4*/}
            <div className="cd-md-6 col-lg-3">
              <div className="about-feature-card">

                <div className="about-feature-icon"><i className="bi bi-shield-check"></i></div>
                <h3>Simple Checkout</h3>
                <p>Manage your cart, shipping details, payment method, and ordes in one smooth flow.</p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission section-space">
        <div className="container">
          <div className="about-mission-box">

            <div className="about-mission-icon"><i className="bi bi-lightbulb"></i></div>
            <div>
              <span className="about-section-label">OUR MISSION</span>
              <h2>Make Technology Easier to Explore</h2>
              <p>
                We believe shopping for technology should feel simple, informative, and enjoyable.
                TechWorld is designed around that idea - helping users discover products, save their
                favourites, build a cart, and complete an order with ease.
              </p>

            </div>
          </div>
        </div>
      </section>

    </main>

    <Footer />
    </>
  );
}

export default  About;