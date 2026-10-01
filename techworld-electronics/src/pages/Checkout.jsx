
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { UseShop } from "../context/ShopContext";
import { UseAuth } from "../context/AuthContext";
import "../styles/checkout.css";

function Checkout()
{
  //Get shopping cart information.
  const {cart, cartTotal, clearCart} = UseShop();

  //Get logged-in user and order function.
  const {currentUser, addOrder, isLoggedIn} = UseAuth();

  //Used to redirect the user.
  const naviagte = useNavigate();

  //Shipping form state.
  const [formData, setFormData] = useState({
    fullName : currentUser?.name || "",
    email : currentUser?.email || "",
    phone : "",
    address : "",
    city : "",
    state : "",
    pincode : "",
  });

  //Selected payment method.
  const [paymentMethod, setPaymentMethod] = useState("card");

  //Store form error.
  const [error, setError] = useState("");

  //Store whether payment is currently processing.
  const [isProcessing, setIsProcessing] = useState(false);

  //Free shipping for orders of Rs.5000 or more. Otherwise charge Rs.99.
  const shipping = cartTotal >= 5000 || cart.length === 0 ? 0 : 99;

  //Final amount payable.
  const grandTotal = cartTotal + shipping;

  //Handle form input changes.
  const handleChange = (event) =>
  {
    const {name, value} = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name] : value
    }));

    setError("");
  };

  //Handle checkout form submission.
  const handleSubmit = (event) =>
  {
    event.preventDefault();

    //User must be logged in before placing an order.
    if(!isLoggedIn)
    {
      setError("Please login before placing your order.");
      naviagte("/login", {state : {from : "/checkout"}});
      return;
    }

    //Cart cannot be empty.
    if(cart.length === 0)
    {
      setError("Your cart is empty.");
      return;
    }

    //Check required shipping fields.
    // IMPORTANT: "fullName" must match the state key exactly.
    const requireFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode"
    ];

    const hasEmptyField = requireFields.some(
      (field) => !String(formData[field] ?? "").trim()
    );

    if(hasEmptyField)
    {
      setError("Please fill in all shipping details.");
      return;
    }

    //Basic phone validation.
    if(!/^[0-9]{10}$/.test(formData.phone.trim()))
    {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    //Basic Indian PIN code validation.
    if(!/^[0-9]{6}$/.test(formData.pincode.trim()))
    {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    //Start simulated payment.
    setIsProcessing(true);
    setError("");

    //Simulate a short payment processing delay.
    setTimeout(() =>
    {
      //Generate a unique order ID.
      const orderId = `TW-${Date.now()}`;

      //Create order object.
      const newOrder =
      {
        id : orderId,

        date : new Date().toLocaleDateString(
          "en-IN",
          {
            day : "2-digit",
            month : "short",
            year : "numeric"
          }
        ),

        items : cart.map((item) =>
        ({
          id : item.id,
          name : item.name,
          price : item.price,
          quantity : item.quantity,
          image : item.image,
        })),

        subtotal : cartTotal,
        shipping,
        total : grandTotal,
        paymentMethod,
        paymentStatus : "Paid",
        orderStatus : "Confirmed",

        shippingAddress :
        {
          fullName : formData.fullName,
          email : formData.email,
          phone : formData.phone,
          address : formData.address,
          city : formData.city,
          state : formData.state,
          pincode : formData.pincode
        },
      };

      //Save the order inside the logged-in user's account.
      const result = addOrder(newOrder);

      if(!result.success)
      {
        setError(result.message);
        setIsProcessing(false);
        return;
      }

      //Clear the shopping cart after successful payment.
      clearCart();

      //Go to the order confirmation page.
      naviagte(
        "/order-confirmation",
        {
          state : {
            order : newOrder
          }
        }
      );

    }, 1500);
  };

  //If the cart is empty, show a friendly message.
  if(cart.length === 0)
  {
    return (
      <>
        <Navbar />

        <main className="checkout-page">
          <div className="container">

            <div className="checkout-empty">
              <i className="bi bi-cart-x"></i>

              <h1>Your Cart Is Empty</h1>

              <p>
                Add some products to your cart before proceeding to checkout.
              </p>

              <Link
                to="/products"
                className="checkout-primary-btn"
              >
                <i className="bi bi-shop me-2"></i>
                Browse Products
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

      <main className="checkout-page">
        <div className="container">

          {/* Page heading */}
          <div className="checkout-heading">
            <span>SECURE CHECKOUT</span>

            <h1>Complete Your Order</h1>

            <p>
              Enter your shipping details and choose payment method.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="alert alert-danger checkout-alert"
              role="alert"
            >
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="row g-4">

              {/* LEFT SIDE */}
              <div className="col-lg-7">

                {/* Shipping details */}
                <section className="checkout-cart">

                  <div className="checkout-cart-header">

                    <div className="checkout-step">
                      1
                    </div>

                    <div>
                      <h2>Shipping Information</h2>

                      <p>
                        Where should we deliver your order?
                      </p>
                    </div>

                  </div>

                  <div className="checkout-card-body">

                    <div className="row g-3">

                      {/* Full name */}
                      <div className="col-md-6">

                        <label htmlFor="fullName">
                          Full Name
                        </label>

                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                        />

                      </div>

                      {/* Email */}
                      <div className="col-md-6">

                        <label htmlFor="email">
                          Email Address
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />

                      </div>

                      {/* Phone */}
                      <div className="col-md-6">

                        <label htmlFor="phone">
                          Phone Number
                        </label>

                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="10-digit mobile number"
                          maxLength="10"
                        />

                      </div>

                      {/* Pincode */}
                      <div className="col-md-6">

                        <label htmlFor="pincode">
                          PIN Code
                        </label>

                        <input
                          type="text"
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="6-digit PIN code"
                          maxLength="6"
                        />

                      </div>

                      {/* Address */}
                      <div className="col-md-6">

                        <label htmlFor="address">
                          Full Address
                        </label>

                        <textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="House / Flat / Street / Area"
                          rows="3"
                        >
                        </textarea>

                      </div>

                      {/* City */}
                      <div className="col-md-6">

                        <label htmlFor="city">
                          City
                        </label>

                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Enter your city"
                        />

                      </div>

                      {/* State */}
                      <div className="col-md-6">

                        <label htmlFor="state">
                          State
                        </label>

                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="Enter your state"
                        />

                      </div>

                    </div>
                  </div>
                </section>

                {/* Payment */}
                <section className="checkout-card">

                  <div className="checkout-card-header">

                    <div className="checkout-step">
                      2
                    </div>

                    <div>
                      <h2>Payment Method</h2>

                      <p>
                        Choose how you want to pay.
                      </p>
                    </div>

                  </div>

                  <div className="checkout-card-body">

                    {/* Card payment */}
                    <label
                      className={`payment-option ${
                        paymentMethod === "card"
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                      />

                      <span className="payment-icon">
                        <i className="bi bi-credit-card"></i>
                      </span>

                      <span className="payment-content">
                        <strong>Credit / Debit Card</strong>

                        <small>
                          Visa, Mastercard, Rupay and more
                        </small>
                      </span>

                      {paymentMethod === "card" && (
                        <i className="bi bi-check-circle-fill payment-check"></i>
                      )}

                    </label>

                    {/* UPI */}
                    <label
                      className={`payment-option ${
                        paymentMethod === "upi"
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                      />

                      <span className="payment-icon">
                        <i className="bi bi-phone"></i>
                      </span>

                      <span className="payment-content">
                        <strong>UPI</strong>

                        <small>
                          Google Pay, PhonePe, Paytm and more
                        </small>
                      </span>

                      {paymentMethod === "upi" && (
                        <i className="bi bi-check-circle-fill payment-check"></i>
                      )}

                    </label>

                    {/* Cash on delivery */}
                    <label
                      className={`payment-option ${
                        paymentMethod === "cod"
                          ? "selected"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(event) =>
                          setPaymentMethod(event.target.value)
                        }
                      />

                      <span className="payment-icon">
                        <i className="bi bi-cash-stack"></i>
                      </span>

                      <span className="payment-content">
                        <strong>Cash on Delivery</strong>

                        <small>
                          Pay when your order arrives
                        </small>
                      </span>

                      {paymentMethod === "cod" && (
                        <i className="bi bi-check-circle-fill payment-check"></i>
                      )}

                    </label>

                    {/* Simulation notice */}
                    <div className="payment-notice">

                      <i className="bi bi-shield-check"></i>

                      <span>
                        This is a simulated payment system for the TechWorld
                        internship project. No real payment will be charged.
                      </span>

                    </div>

                  </div>
                </section>

              </div>

              {/* RIGHT SIDE - Order Summary */}
              <div className="col-lg-5">

                <section className="checkout-summary">

                  <div className="checkout-summary-header">

                    <h2>
                      <i className="bi bi-receipt me-2"></i>
                      Order Summary
                    </h2>

                    <span>
                      {cart.length} item(s)
                    </span>

                  </div>

                  {/* Products */}
                  <div className="checkout-items">

                    {cart.map((item) => (
                      <div
                        className="checkout-item"
                        key={item.id}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div className="checkout-item-info">

                          <h3>
                            {item.name}
                          </h3>

                          <p>
                            Qty: {item.quantity}
                          </p>

                        </div>

                        <strong>
                          Rs.{" "}
                          {(item.price * item.quantity).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>
                    ))}

                  </div>

                  {/* Price calculation */}
                  <div className="checkout-price-details">

                    <div>
                      <span>Subtotal</span>

                      <strong>
                        Rs. {cartTotal.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div>
                      <span>Shipping</span>

                      <strong>
                        {shipping === 0
                          ? "FREE"
                          : `Rs. ${shipping.toLocaleString("en-IN")}`}
                      </strong>
                    </div>

                    <div className="checkout-total">
                      <span>Total</span>

                      <strong>
                        Rs. {grandTotal.toLocaleString("en-IN")}
                      </strong>
                    </div>

                  </div>

                  {/* Place order */}
                  <button
                    type="submit"
                    className="place-order-btn"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>

                        Processing Payment
                      </>
                    ) : (
                      <>
                        <i className="bi bi-lock-fill me-2"></i>

                        Place Order . Rs.{" "}
                        {grandTotal.toLocaleString("en-IN")}
                      </>
                    )}
                  </button>

                  {/* Secure checkout message */}
                  <p className="secure-checkout-text">

                    <i className="bi bi-shield-check me-1"></i>

                    Secure simulated checkout

                  </p>

                </section>

              </div>

            </div>

          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Checkout;

