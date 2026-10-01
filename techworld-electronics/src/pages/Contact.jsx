import { useState } from "react";
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/contact.css";

function Contact()
{
  //Store contact from information.
  const [formData, setFormData] = useState({name : "", email : "", subject : "", message : ""});

  //Store whether the message was succeessfully submitted.
  const [submitted, setSubmitted] = useState(false);

  //Handle input change.
  const handleChange = (event) =>
  {
    const {name , value} = event.target;
    setFormData((previousData)=>({...previousData,[name] : value}));
  };

  //Handle constact from submission.
  const handleSubmit = (event) =>
  {
    event.preventDefault();

    //This is a simulated contact form.
    setSubmitted(true);

    //Clear the form after submission.
    setFormData({name : "", email : "", subject : "", message : ""});
  };

  return (
    <>
    <Navbar />

    <main className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">

            <span>GET IN TOUCH</span>
            <h1>How Can We Help ?</h1>
            <p>
              Have a question about a product, your order or anything else? Send us a message 
              and we'll be happy to help.
            </p>

          </div>
        </div>

      </section>

      {/* Contact content */}
      <section className="contact-content section-space">
        <div className="container">
          <div className="row g-4">

            {/*Contact information */}
            <div className="col-lg-5">
              <div className="contact-info">
                
                <span className="contact-section-label">CONTACT INFORMATION</span>
                <h2>Let's Talk</h2>
                <p>
                  We're here to make your TEchWorld exprerience as smooth as possible.
                  Reach out using any of the options below.
                </p>

                {/* Email */}
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="bi bi-envelope"></i></div>

                  <div>
                    <span>Email</span>
                    <strong> support@techworld.com</strong>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="bi bi-telephone"></i></div>

                  <div>
                    <span>Phone</span>
                    <strong> +91 1800 123 4567</strong>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="bi bi-geo-alt"></i></div>

                  <div>
                    <span>Adress</span>
                    <strong> TechWorld Electronics <br />Ahemdabad, Gujrat, India</strong>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="bi bi-clock"></i></div>

                  <div>
                    <span>Support Hours</span>
                    <strong> Mon - Sat, 9:00 AM - 6:00 PM</strong>
                  </div>
                </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="col-lg-7">
                <div className="contact-form-card">
                  {submitted ? (
                    /*Success message */
                    <div className="contact-success">
                      <div className="contact-success-icon"><i className="bi bi-check-lg"></i></div>
                      <h2>Message Sent !</h2>
                      <p>
                        Thank you for contacting TechWorld. Your message has been received successfully.
                      </p>
                      <button type="button" className="contact-submit-btn"
                      onClick={()=>setSubmitted(false)}>
                        Send Another Message
                      </button>

                    </div>
                  ):(
                    <>
                    <div className="contact-form-heading">
                      <span className="contact-section-label">SEND A MESSAGE</span>
                      <h2>We're Listening</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="row g-3">

                        {/* Name */}
                        <div className="col-md-6">
                          <label htmlFor="contact-name">Your Name</label>
                          <input type="text" id = "contact-name" name = "name" value={formData.name}
                          onChange={handleChange} placeholder="Enter your name" required/>
                        </div>

                        {/* Email */}
                        <div className="col-md-6">
                          <label htmlFor="contact-email">Email Address</label>
                          <input type="email" id = "contact-email" name = "email" value={formData.email}
                          onChange={handleChange} placeholder="Enter your email" required/>
                        </div>

                        {/*Subject */}
                        <div className="col-12">
                          <label htmlFor="contact-subject">Subject</label>
                          <input type="text" id = "contact-subject" name = "subject" 
                          value={formData.subject} onChange={handleChange} 
                          placeholder="What can we help you with ?" required/>
                        </div>

                        {/*Message */}
                        <div className="col-12">
                          <label htmlFor="contact-message">Message</label>
                          <textarea id = "contact-message" name = "message" 
                          value={formData.message} onChange={handleChange} 
                          placeholder="Write your message here..." rows="6" required></textarea>
                        </div>

                        {/*Submit */}
                        <div className="col-12">
                          <button type="submit" className="contact-submit-btn">
                            <i className="bi bi-send me-2"></i>
                            Send Message
                          </button>
                        </div>
                      </div>

                    </form>
                    </>
                  )}
                </div>
              </div>  
            </div>
          </div>

      </section>

      {/* FAQ STYLE Information */}
      <section className="contact-help section-space">
        <div className="container">
          <div className="contact-help-box">

            <div>
              <span className="contact-section-label">NEED QUICK HELP ?</span>
              <h2>Check Tour Account First</h2>
              <p>
                For order information, saved prodcuts, and previous purchases, visit your
                TechWolrd account.
              </p>
            </div>

            <Link to="/account" className="contact-account-btn">
            <i className="bi bi-person me-2"></i>
            My Account
            </Link>
          </div>
        </div>
      </section>

    </main>

    <Footer />
    </>
  );
}

export default Contact;