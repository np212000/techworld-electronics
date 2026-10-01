import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UseAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Register()
{
  //Store registration form data.
  const [formData, setFormData] = useState({
    name : "", email : "", password : "", confirmpassword : ""
  });

  //Store valication/error message.
  const [error, setError] = useState("");

  //Authentication function from AuthContect.
  const {registerUser} = UseAuth();

  //Used to redirect the user after registeration.
  const navigate = useNavigate();

  //Handle input changes.
  const handleChange = (event) =>
  {
    const {name, value} = event.target;
    setFormData((previousData)=>({...previousData, [name]:value}));

    //Remove old error while user edits the form.
    setError("");
  };

  //Handle registration form submission.
  const handleSubmit = (event) =>
  {
    event.preventDefault();

    //Make sure all fields are filled.
    if(!formData.name || !formData.email || !formData.password || !formData.confirmpassword)
    {
      setError("Plese fill in al fields.");
      return;
    }

    //Make sure password mathch.
    if(formData.password !== formData.confirmpassword)
    {
      setError("Passwords do not match.");
      return;
    }

    //Basic password lenth validation
    if(formData.password.length < 6)
    {
      setError("Passoerd must contain at least 6 characters.");
      return;
    }

    //Create the account
    const result = registerUser(formData.name, formData.email, formData.password);

    //Display error if registration failed.
    if(!result.success)
    {
      setError(result.message);
      return;
    }

    //Registration succeedded. send the user to login page.
    navigate("/login");
  };

  return(
    <>
    <Navbar />

    <main className="auth-page">
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-card register-card">

            {/* Register header */}
            <div className="auth-header">
              <div className="auth-icon">
                <i className="bi bi-person-plus"></i>
              </div>
              <h1>Create Account</h1>
              <p>Join TechWorld and enjoy a better shopping experience.</p>
            </div>

            {/*Error message */}
            {error && (
              <div className="alert alert-danger auth-alert" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
              </div>
            )}

            {/* Registration form */}
            <form onSubmit={handleSubmit}>
              {/* Full name */}
              <div className="auth-form-group">
                <label htmlFor="name">Full Name</label>

                <div className="auth-input-wrapper">
                  <i className="bi bi-person"></i>

                  <input type="text" id = "name" name  = "name" value={formData.name}
                  onChange={handleChange} placeholder="Enter your full name" autoComplete="name"/>
                </div>
              </div>

              {/*Email */}
              <div className="auth-form-group">
                <label htmlFor="email">Email Address</label>

                <div className="auth-input-wrapper">
                  <i className="bi bi-envelope"></i>

                  <input type="email" id = "email" name  = "email" value={formData.email}
                  onChange={handleChange} placeholder="Enter your email" autoComplete="email"/>
                </div>
              </div>

              {/* Password */}
              <div className="auth-form-group">
                <label htmlFor="password">Password</label>

                <div className="auth-input-wrapper">
                  <i className="bi bi-lock"></i>

                  <input type="password" id = "password" name  = "password" value={formData.password}
                  onChange={handleChange} placeholder="Create a password" autoComplete="new-password"/>
                </div>
              </div>

              {/*Confirm password */}
              <div className="auth-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>

                <div className="auth-input-wrapper">
                  <i className="bi bi-shield-lock"></i>

                  <input type="password" id = "confirmPassword" name = "confirmpassword" 
                  value={formData.confirmpassword} onChange={handleChange} 
                  placeholder="Confirm your password" autoComplete="new-password"/>
                </div>
              </div>

              {/*Register button */}
              <button type="submit" className="auth-submit-btn">
                <i className="bi bi-person-plus me-2"></i>
                Create Account
              </button>
            </form>

            {/*Login link */}
            <div className="auth-switch">
              <p>Already have an account ?{" "}
                <Link to = "/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>

    <Footer />

    </>
  );
}

export default Register;