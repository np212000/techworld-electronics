import { useState } from "react";
import {Link, useParams} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { UseShop } from "../context/ShopContext";

import products from "../data/products";

import "../styles/product-details.css";

function ProductDetails()
{
  //Get product ID from URL
  //Ex. /products/3
  const {id} = useParams();
  const product = products.find((item)=>item.id === Number(id)); //Find matching products.

  //Get Shoping fucntions from context.
  const {addToCart, toggleWishlist, isInWishlist} = UseShop();
  
  const [quantity, setQuantity] = useState(1); //Qunatity state.

  //product doesn't exist.
  if(!product)
  {
    return(
      <>
      <Navbar />
      <div className="product-not-found">

        <div>
          <i className="bi bi-box-seam"></i>
          <h1>Product Not Found</h1>
          <p>Sorry, we couldn't find this product.</p>
          <Link to = "/products" className="back-products-btn">
          <i className="bi bi-arrow-left"></i>Back to Products
          </Link>
        </div>
      </div>

      <Footer />

      </>
    );
  }

  //Check wishlist status
  const wishlisted = isInWishlist(product.id);

  //Calculate discount.
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  //Increase quantity
  const increaseQuantity = () =>
  {
    if(quantity < product.stock)
    {
      setQuantity(quantity + 1);
    }
  };

  //Decrease quantity
  const decreaseQuantity = () =>
  {
    if(quantity > 1)
    {
      setQuantity(quantity - 1);
    }
  };

  //Add selected quantity to cart.
  const handleAddToCart = () => 
  {
    addToCart(product,quantity);
  };

  //Toggle wishlist
  const handleWishlist = () =>
  {
    toggleWishlist(product);
  };

  return(
    <>
    <Navbar />
    <main className="product-details-page">
      <div className="container">

        {/*Breadcrumb */}
        <div className="product-breadcrumb">

          <Link to = "/">Home</Link>
          <i className="bi bi-chevron-right"></i>
          <Link to = "/products">Products</Link>
          <i className="bi bi-chevron-right"></i>
          <span>{product.name}</span>

        </div>

        <div className="row g-5">

          {/*Product image */}
          <div className="col-lg-6">
            <div className="details-image-box">

              {product.badge && (
                <span className="details-badge">{product.badge}</span>
              )}

              <img src={product.image} alt={product.name} className="details-image"/>

            </div>
          </div>

          {/*Product Information */}
          <div className="col-lg-6">
            <div className="details-content">

              <span className="details-brand">{product.brand}</span>
              <h1>{product.name}</h1>

              {/* Rating */}
              <div className="details-rating">

                <span className="rating-stars">
                  <i className="bi bi-star-fill"></i>
                  {product.rating}
                  </span>
                  <span>{product.reviews} Reviews</span>

              </div>

              {/* Description */}
              <p className="details-description">{product.description}</p>

              {/*Price */}
              <div className="details-price">

                <strong>Rs. {product.price.toLocaleString("en-IN")}</strong>
                <span>Rs. {product.oldPrice.toLocaleString("en-IN")}</span>
                <small>{discount}% OFF</small>

              </div>

              {/*Stock */}
              <div className="stock-status">

                <i className="bi bi-check-circle-fill"></i>
                {product.stock} items available

              </div>

              {/*Quantity */}
              <div className="quantity-section">

                <span>Quantity</span>
                <div className="quantity-control">
                  <button type="button" onClick={decreaseQuantity} disabled = {quantity === 1}>
                    -
                  </button>
                  <strong>{quantity}</strong>
                  <button type="button" onClick={increaseQuantity} 
                  disabled = {quantity === product.stock}>
                    +
                  </button>
                </div>
              </div>

              {/*Action buttons */}
              <div className="details-actions">
                <button type="button" className="details-cart-btn" onClick={handleAddToCart}>
                  <i className="bi bi-cart3"></i>{" "}
                  Add {quantity} to Cart
                </button>

                <button type="button" 
                className={`details-wishlist-btn ${wishlisted ? "Wishlist-active" : ""}`}
                onClick={handleWishlist}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                  <i className={wishlisted ? "bi bi-heart-fill" : "bi bi-heart"}></i>
                </button>
              </div>

              {/*Product benefits */}
              <div className="product-benefits">

                <div>
                  <i className="bi bi-truck"></i>

                  <div>
                    <strong>Free Delivery</strong>
                    <span>On eligible orders</span>
                  </div>
                </div>

                <div>
                  <i className="bi bi-shield-check"></i>

                  <div>
                    <strong>Secure Payment</strong>
                    <span>Safe & protected checkout</span>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/*Product features */}
        <section className="features-section">
          <div className="section-heading">

            <span>PRODUCT DETAILS</span>
            <h2>Built For <span>Performance.</span></h2>
          </div>

          <div className="row g-3">
            {product.features.map((feature, index)=>
            (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="feature-item">
                  <i className="bi bi-check2-circle"></i>
                  <span>{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>

    <Footer />

    </>
  );
}

export default ProductDetails;