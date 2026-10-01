import {Link} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { UseShop } from "../context/ShopContext";


import ProductCard from "../components/ProductCard";

import "../styles/wishlist.css";

function Wishlist()
{
  //Get wishlist data from global context.
  const {wishlist} = UseShop();

  return(
    <>
    <Navbar />

    <main className="wishlist-page">
      <div className="container">

        {/*Header*/}
        <div className="wishlist-header">

          <span className="section-label">YOUR COLLECTION</span>
          <h1>My <span>Wishlist.</span> </h1>
          <p>Save the products you love and come back to them later.</p>

        </div>

        {/* Wishlist items. */}
        {wishlist.length >0 ? 
        (
          <div className="row g-4">

            {wishlist.map((product)=>
            (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                <ProductCard product={product}/>
              </div>
            ))}
          </div>
        ): (
          /* Empty wishlist */
          <div className="empty-wishlist">

            <div className="empty-wishlist-icon">
              <i className="bi bi-heart"></i>
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p>Save products you love by clicking the heart icon.</p>

            <Link to = "/products" className="browse-products-btn">
            <i className="bi bi-grid"> Browse Products</i>
            </Link>

          </div>
        )}
      </div>

    </main>

    <Footer />

    </>
  );
}

export default Wishlist;