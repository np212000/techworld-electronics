import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UseAuth } from "../context/AuthContext";
import "../styles/auth.css";

function Login()
{
  //Store form input values.
  const [formData, setFormData] = useState({email : "", password : ""});

  //Store validation/error messages.
  const [error, setError] = useState("");

  //Access authentication function.
  const {loginUser} = UseAuth();

  //Used to redirect the user after success login.
  const navigate = useNavigate();

  //Get unformation about the page from which the user came.
  const location = useLocation();

  //Handle changes in input fields.
  const handleChange = (event) => 
  {
    const {name, value} = event.target;
    setFormData((previousData) => ({...previousData, [name]: value}));

    //Remove old error when user starts typing again.
    setError("");
  };

//Handle login form submission.
const handleSubmit = (event) =>
{
  event.preventDefault();

  //Basic validation.
  if(!formData.email || !formData.password)
  {
    setError("Please enter your email and password.");
    return;
  }

  //Try to log in the user.
  const result = loginUser(formData.email, formData.password);

  //Show error if login failed.
  if(!result.success)
  {
    setError(result.message);
    return;
  }

  //If the user was redirected to login from another page, send them back there after login.
  const redirectPath = location.state?.from || "/account";
  navigate(redirectPath);
};

return(
  <>
  <Navbar />

  <main className="auth-page">
    <div className="container">
      <div className="auth-wrapper">
        <div className="auth-card">

          {/*Login header */}
          <div className="auth-header">
            <div className="auth-icon"><i className="bi bi-person-circle"></i></div>
            <h1>Welcome Back</h1>
            <p>Login to your TechWorld account and continue shopping.</p>
          </div>

          {/*Error messafe */}
          {error && (
            <div className="alert alert-danger auth-alert" role="alert">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/*Email */}
            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>

              <div className="auth-input-wrapper">
                <i className="bi bi-envelope"></i>

                <input type="email" id = "email" name="email" value={formData.email}
                onChange={handleChange} placeholder="Enter your email" autoComplete="email"/>
              </div>
            </div>

            {/* Password */}
            <div className="auth-form-group">
              <label htmlFor="password">Password</label>

              <div className="auth-input-wrapper">
                <i className="bi bi-lock"></i>

                <input type="password" id="password" name="password" value={formData.password}
                onChange={handleChange} placeholder="Enter your passowrd" 
                autoComplete="current-password"/>
              </div>
            </div>

            {/*Login button */}
            <button type="submit" className="auth-submit-btn">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </button>
          </form>

          {/* Register link */}
          <div className="auth-switch">
            <p>Don't have an account ?{" "}
            <Link to = "/register">Create an account</Link>
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

export default Login;