import {Link} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {UseShop} from "../context/ShopContext";

import "../styles/cart.css";

function Cart()
{
  //Get cart data and functions.
  const {cart, cartTotal, updateCartQuantity, removeFromCart, clearCart} = UseShop();

  //calculate shipping
  //Free shipping when cart reaches Rs. 5,000.
  const shipping = cartTotal >= 5000 || cartTotal === 0 ? 0 : 99;

  //Final order total.
  const grandTotal = cartTotal + shipping;

  //Empty cart UI.
  if(cart.length === 0)
  {
    return(
      <>
      <Navbar />
      <main className="cart-page">
        <div className="container">
          <div className="empty-cart">

            <div className="empty-cart-icon"><i className="bi bi-cart-x"></i></div>
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added anyrhing youe cart yet.</p>
            <Link to = "/products" className="shop-now-btn">
            Start Shopping
            <i className="bi bi-bag"></i>
            </Link>

          </div>
        </div>
      </main>

      <Footer />
      </>
    );
  }

  return(
    <>
    <Navbar />

    <main className="cart-page">
      <div className="container">

        {/* Header */}
        <div className="cart-header">

          <div>
            <span className="section-label">SHOPPING BAG</span>
            <h1>Your <span>Cart.</span> </h1>
          </div>

          <button type="button" className="clear-cart-btn" onClick={clearCart}>
            <i className="bi bi-trash3"></i>
            Clear Cart
          </button>

        </div>

        <div className="row g-4">

          {/* Cart items */}
          <div className="col-lg-8">
            <div className="cart-items">

              {cart.map((item)=>
              (
                <div className="cart-item" key={item.id}>
                  {/* Image */}
                  <Link to={`/products/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.name}/>
                  </Link>

                  {/*Details */}
                  <div className="cart-item-details">

                    <span className="cart-item-brand">{item.brand}</span>
                    <Link to = {`/products/${item.id}`} className="cart-item-name">
                    {item.name}
                    </Link>
                    <span className="cart-item-price">
                      Rs.{item.price.toLocaleString("en-IN")}
                    </span>

                    {/* Quantity */}
                    <div className="cart-item-bottom">
                      <div className="cart-item-quantity">

                        <button type="button" 
                        onClick={()=>updateCartQuantity(item.id,item.quantity - 1)}>
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button type="button" 
                        onClick={()=>updateCartQuantity(item.id,item.quantity + 1)}>
                          +
                        </button>

                      </div>

                      <strong className="cart-item-total">
                        Rs.{(item.price * item.quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  {/* Remove */}
                  <button type="button" className="remove-cart-item"
                  onClick={()=>removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}>
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/*Summary */}
          <div className="col-lg-4">
            <div className="cart-summary">

              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <strong>Rs.{cartTotal.toLocaleString("en-IN")}</strong>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <strong>
                  {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                </strong>
              </div>

              <div className="free-shipping-note">
                <i className="bi bi-truck"></i>
                {shipping === 0 ? "You've unlocaked free shipping !" : "Add Rs.5000 for free shipping."}
              </div>

              <hr />

              <div className="summary-total">
                <span>Total</span>
                <strong>Rs.{grandTotal.toLocaleString("en-IN")}</strong>
              </div>

              {/* Checkput will be created later */}
              <Link to = "/checkout" className="checkout-btn">
              Proceed to Checkout
              <i className="bi bi-arrow-right"></i>
              </Link>

              <Link to = "/products" className="continue-shopping">
              <i className="bi bi-arrow-left"></i>
              Continue Shopping
              </Link>

            </div>
          </div>
        </div>
      </div>

    </main>

    <Footer />

    </>
  );
}

export default Cart;