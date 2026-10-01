import {Link, NavLink, useNavigate} from "react-router-dom";
import {UseShop} from "../context/ShopContext";
import {UseAuth} from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar()
{
  //Get cart and wishlist counts.
  const {cartCount, wishlist}  = UseShop();

  //Get authentication information from Authentication.
  const {currentUser, logoutUser, isLoggedIn} = UseAuth();

  //Used for redirectiong after logout.
  const navigate = useNavigate();

  //Handle logout.
  const handleLogout = () =>
  {
    logoutUser();
    navigate("/");
  };

  return(
    <nav className="navbar navbar-expand-lg tech-navbar sticky-top">
      <div className="container">

        {/*Logo */}
        <Link className="navbar-brand tech-logo" to = "/">
          <span className="logo-icon"><i className="bi bi-cpu"></i></span>
          {"  "}
          <span>Tech <span>World</span></span>
        </Link>

        {/*Mobile toggle */}
        <button className="navbar-toggler" type="button" data-bs-toggle = "collapse"
        data-bs-target = "#mainhNavbar" aria-controls="mainNavbar" aria-expanded = "false"
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id = "techNavbar">

          {/* Main links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink to = "/" className="nav-link">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to = "/products" className="nav-link">Products</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to = "/about" className="nav-link">About</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to = "/contact" className="nav-link">Contact</NavLink>
            </li>

          </ul>

          {/* Right side actions */}
          <div className="navbar-actions">

            {/* <button className="nav-action-btn" aria-label="Search">
              <i className="bi bi-search"></i>
            </button> */}

            {/* Wishlist */}
            <Link to="/wishlist" className="nav-action" aria-label="Wishlist">
            <i className="bi bi-heart"></i>
            {wishlist.length > 0 && (
              <span className="nav-count">{wishlist.length}</span>
            )}
            </Link>

            {/*Cart */}
            <Link to="/cart" className="nav-action" aria-label="Shopping cart">
            <i className="bi bi-cart3"></i>
            {cartCount > 0 && (
              <span className="nav-count">{cartCount}</span>
            )}
            </Link>

            {/*Authentication */}
            {isLoggedIn ? (
              <>
              {/*Account */}
              <Link to = "/account" className="navbar-user">
              <i className="bi bi-person-circle me-1"></i>
              <span>{currentUser.name.split(" ")[0]}</span>
              </Link>

              {/* Logout */}
              <button type="button" className="nav-login-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
              </>
              ) : (
              <Link to="/login" className="nav-login-btn">
                <i className="bi bi-person"></i> {" "}
                Login
              </Link>

            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;