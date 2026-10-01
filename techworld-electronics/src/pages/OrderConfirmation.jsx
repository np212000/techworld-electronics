import {Link, useLocation, Navigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/order-confirmation.css";

function OrderConfirmation()
{
  //Get order information passed from checkout.
  const location = useLocation();
  const order = location.state?.order;

  //If somebody opens this page directly without placing an order.send them back to products page
  if(!order)
  {
    return <Navigate to = "/products" replace/>;
  }

  //Convert payment method into user-friendly text.
  const paymentLabels = {card : "Credit / Debit Card", upi : "UPI", cod : "Cash on Delivery"};

  return (
    <>
    <Navbar />

    <main className="confirmation-page">
      <div className="container">
        <div className="confirmation-wrapper">

          {/*Success icon */}
          <div className="confirmation-success-icon">
            <i className="bi bi-check-lg"></i>
          </div>

          {/* Main message */}
          <span className="confirmation-label">ORDER CONFIRMATION</span>
          <h1>Thank You for Your Order ! 🎉</h1>
          <p className="confirmation-message">
            Your order has been successfully placed and is now being prepared for delivery.
          </p>

          {/*Order UD */}
          <div className="confirmation-order-id">
            <span>Order ID</span>
            <strong>{order.id}</strong>
          </div>

          {/* Order details */}
          <div className="confirmation-card">
            <div className="confirmation-card-header">
              <h2><i className="bi bi-box-seam me-2"></i>Order Details</h2>
              <span>{order.dete}</span>
            </div>

            {/* Products */}
            <div className="confirmation-items">
              {order.items.map((item) =>
              (
                <div className="confirmation-item" key={item.id}>
                  <img src = {item.image} alt = {item.name}/>

                  <div className="confirmation-item-info">
                    <h3>{item.name}</h3>
                    <p>Quantity : {item.quantity}</p>
                  </div>

                  <strong>Rs.{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                </div>
              ))}
            </div>

            {/*Price details */}
            <div className="confirmation-price">

              <div>
                <span>Subtotal</span>
                <strong>Rs.{order.subtotal.toLocaleString("en-IN")}</strong>
              </div>

              <div>
                <span>Shipping</span>
                <strong>
                  {order.shipping === 0 ? "FREE" : `Rs.${order.shipping.toLocaleString("en-IN")}`}
                </strong>
              </div>

              <div className="confirmation-total">
                <span>Total Paid</span>
                <strong>Rs.{order.total.toLocaleString("en-IN")}</strong>
              </div>
            </div>
          </div>

          {/*Delivery and payment information */}
          <div className="row g-4 confirmation-info-row">

            {/*delivery */}
            <div className="col-md-6">
              <div className="confirmation-info-card">
                <i className="bi bi-geo-alt"></i>

                <div>
                  <h3>Delivery Address</h3>

                  <p>
                    <strong>{order.shippingAddress.fullName}</strong>
                    <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}
                    <br />
                    PIN : {order.shippingAddress.pincode}
                    <br />
                    phone : {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </div>

            {/*Payment */}
            <div className="col-md-6">
              <div className="confirmation-info-card">

                <i className="bi bi-credit-card"></i>

                <div>
                  <h3>Payment</h3>
                  <p>Method : {" "}
                  <strong>{paymentLabels[order.paymentMethod]}</strong>
                  <br />
                  Status : {" "}
                  <span className="paid-status">{order.paymentStatus}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="confirmation-status">
            <div className="status-icon">
              <i className="bi bi-check2-circle"></i>
            </div>

            <div>
              <strong>Order Confirmed</strong>
              <p>We'll prepare your items and get them ready for delivery.</p>
            </div>
          </div>

          {/* Action button */}
          <div className="confirmation-actions">
            <Link to = "/products" className="confirmation-primary-btn">
            <i className="bi bi-shop me-2"></i>
            Continue Shopping
            </Link>

            <Link to = "/account" className="confirmation-secondary-btn">
            <i className="bi bi-person me-2"></i>
            View My Orders
            </Link>

          </div>
        </div>
      </div>

    </main>

    <Footer />
    </>
  );
}

export default OrderConfirmation;