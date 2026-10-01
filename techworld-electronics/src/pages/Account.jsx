import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UseAuth } from "../context/AuthContext";
import { UseShop } from "../context/ShopContext";
import "../styles/account.css";

function Account()
{
  //Get logged-in user and logout fuction.
  const {currentUser, logoutUser} = UseAuth();

  //Get wishlist information from ShopContext.
  const {wishlist} = UseShop();

  //Used to redirect after logout.
  const navigate = useNavigate();

  //Logout handler.
  const handleLogout = () =>
  {
    logoutUser();
    navigate("/");
  };

  //Safety check normally Navbar/Login naviagation will prevent this situation, but this pretects
  // the page if somebody opens /account directly.
  if(!currentUser)
  {
    return (
      <>
      <Navbar />

      <main className="account-page">
        <div className="container">

          <div className="account-login-required">
            <i className="bi bi-person-lock"></i>
            <h1>Login Required</h1>
            <p>Please login to view your TechWrold account.</p>
            <Link to = "/login" className="account-primary-btn">
            <i className="bi bi-box-arrow-in-right me-2"></i>
            </Link>
          </div>
        </div>

      </main>

      <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar />

    <main className="account-page">
      <div className="container">

        {/*Page heading */}
        <div className="account-heading">
          <div>
            <span>MY ACCOUNT</span>
            <h1>Welcome, {currentUser.name} 👋🏻</h1>
            <p>Manage your Techworld account and shopping activity.</p>
          </div>

          <button onClick={handleLogout} className="account-logout-btn">
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>

        {/*Account content */}
        <div className="row g-4">

          {/*Profile card */}
          <div className="col g-4">
            <div className="account-card">

              <div className="account-card-header">
                <h2><i className="bi bi-person-vcard me-2">Profile Information</i></h2>
              </div>

              <div className="account-profile">
                <div className="account-avatar">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>

                <div className="account-profile-info">
                  <h3>{currentUser.name}</h3>
                  <p><i className="bi bi-envelope me-2"></i>{currentUser.email}</p>

                  <span className="account-member-badge">
                    <i className="bi bi-patch-check-fill me-1"></i>
                    TechWorld Member
                  </span>
                </div>
              </div>
            </div>

            {/* Order history */}
            <div className="account-card">
              <div className="account-card-header">
                <h2><i className="bi bi-bag-check me-2"></i>Order History</h2>
              </div>

              {currentUser.orders && currentUser.orders.length > 0 ? (
                <div className="order-history">
                  {currentUser.orders.map((order)=> (
                    <div className="order-item" key={order.id}>
                      <div>
                        <strong>Order #{order.id}</strong>
                        <p>{order.date}</p>
                      </div>

                      <span>Rs. {order.total.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
              ): (
                <div className="account-empty">
                  <i className="bi bi-bag-x"></i>
                  <h3>No Orders Yet</h3>
                  <p>Your completed orders will appear here.</p>
                  <Link to = "/products" className="account-primary-btn">Start Shopping</Link>
                </div>
              )}
            </div>
          </div>

          {/*Quick action */}
          <div className="col-lg-4">
            <div className="account-card account-actions-card">
              <div className="account-card-header">
                <h2>
                  <i className="bi bi-grid me-2"></i>
                  Quick Actions
                </h2>
              </div>

              <Link to = "/products" className="account-action">
              <span><i className="bi bi-shop"></i>Continue Shopping</span>
              <i className="bi bi-chevron-right"></i>
              </Link>

              <Link to = "/wishlist" className="account-action">
              <span><i className="bi bi-heart"></i>My Wishlist</span>
              <strong>{wishlist.length}</strong>
              </Link>

              <Link to = "/cart" className="account-action">
              <span><i className="bi bi-cart3"></i>Shopping Cart</span>
              <i className="bi bi-chevron-right"></i>
              </Link>

              <Link to = "/contact" className="account-action">
              <span><i className="bi bi-headset"></i>Contact Support</span>
              <i className="bi bi-chevron-right"></i>
              </Link>
            </div>

            {/*Account information */}
            <div className="account-info-box">
              <i className="bi bi-shield-check"></i>

              <div>
                <h3>Account Security</h3>
                <p>
                  Your account session is saved locally for this Frontend-only project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>

    <Footer />
    </>
  );
}

export default Account;