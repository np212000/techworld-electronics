import {Link} from "react-router-dom";
import "../styles/products.css";
import { UseShop } from "../context/ShopContext";

function ProductCard({product})
{
  //Get cart and wishlist functions from global context.
  const {addToCart, toggleWishlist, isInWishlist} = UseShop();

  //calculate the discount percentagr
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  //Check whether this product is already in wishlist.
  const wishlisted = isInWishlist(product.id);

  //Add product to cart.
  const handleAddToCart = () =>
  {
    addToCart(product, 1);
  };

  //Add/remove product from wishlist.
  const handleWishlist = () =>
  {
    toggleWishlist(product);
  };

  return(
    <div className="product-card">

      {/* Product image area */}
      <div className="product-image-wrapper">

        {/*Product badge such as Best Seller or New */}
        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        {/*Wishlist button - fuctionality will be added later */}
        <button type="button" 
        className= {`product-wishlist ${wishlisted ? "Wishlist-active" : ""}`}
        onClick={handleWishlist} 
        aria-label={wishlisted ? `Remove ${product.name} from wishlist` : 
        `Add ${product.name} to wishlist`}>
        <i className={wishlisted ? "bi bi-heart-fill" : "bi bi-heart"}></i>
        </button>

        {/*Product image links to details page */}
        <Link to={`/products/${product.id}`}>
        <img src = {product.image} alt={product.name} className="product-image"/>
        </Link>

        {/* Quick view button */}
        <Link to={`/products/${product.id}`} className="quick-view-btn">
        <i className="bi bi-eye"></i>
        Quick View
        </Link>
      </div>

      {/*Product information */}
      <div className="product-info">

        {/*Product brand */}
        <span className="product-brand">{product.brand}</span>

        {/*Product name */}
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>

        {/*Rating */}
        <div className="product-rating">

          <div className="stars">
            <i className="bi bi-star-fill"></i>
            <span>{product.rating}</span>
          </div>

          <span className="review-count">({product.reviews})</span>
        </div>

        {/*Pricing */}
        <div className="product-price-row">

          <div>
            <span className="product-price">Rs.{product.price.toLocaleString("en-IN")}</span>
            <span className="product-old-price">Rs. {product.oldPrice.toLocaleString("en-IN")}</span>
          </div>

          <span className="discount">{discount}% OFF</span>

        </div>

        {/* Add to cart button */}
        <button type="button" className="add-cart-btn" onClick={handleAddToCart}>
          <i className="bi bi-cart3"></i>
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;