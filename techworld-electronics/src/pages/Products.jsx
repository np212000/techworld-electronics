import { useMemo, useState } from "react";
import {useSearchParams} from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

import products from "../data/products";

import "../styles/products.css";

function Products()
{
  //Read category from the URL.
  //Ex. /products?category=smartphones
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState(""); //Search State
  const [category, setCategory] = useState(initialCategory); //Category state
  const [priceRange, setPriceRange] = useState(150000); //Maximun price state
  const [rating, setRating] = useState(0); //Minimum rating state
  const [sort, setSort] = useState("featured"); //Sorting state
  const [showFilters, setShowFilters] = useState(false); //Movile fitler visibility

  //Filter and sort products.
  const filteredProducts =  useMemo(()=>
  {
    let result = [...products];

    //Search filter
    if(search.trim())
    {
      const searchText = search.toLowerCase().trim();
      result = result.filter((product)=>
      product.name.toLowerCase().includes(searchText) ||
      product.brand.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    );}

    //Category filter.
    if(category !== "all")
    {
      result = result.filter((product)=>product.categorySlug === category);
    }

    //Price filter.
    result = result.filter((product)=> product.price <= priceRange);

    //Rating filter
    if(rating > 0)
    {
      result = result.filter((product)=> product.rating >= rating);
    }

    //Sorting
    switch(sort)
    {
      case "price-low":
        result.sort((a,b) => a.price - b.price);
        break;

      case "price-hign":
        result.sort((a,b)=> b.price - a.price);
        break;

      case "rating":
        result.sort((a,b)=> b.rating - a.rating);
        break;

      case "newest":
        result.sort((a,b) => b.id - a.id);
        break;

      default:
        break;
    }

    return result;
  },[search, category, priceRange, rating, sort]);

  // Reset every filter.
  const clearFilters = () =>
  {
    setSearch("");
    setCategory("all");
    setPriceRange(150000);
    setRating(0);
    setSort("featured");
  };

  return(
    <>
    <Navbar />

    <main className="products-page">

      {/*Page heading */}
      <section className="products-header">
        <div className="container">
          
          <span className="section-label">TECHWORLD STORE</span>
          <h1>Explore Our <span>Products.</span></h1>
          <p>
            Discover poweful technology,smart gadgets and accessories built for your everyday life.
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="container">

          {/* Mobile filter button */}
          <button type="button" className="mobile-filter-btn"
          onClick={()=>setShowFilters(!showFilters)}>
            <i className="bi bi-sliders"></i>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <div className="row g-4">

            {/*Fiter sidebar */}
            <div className={`col-lg-3 ${showFilters ? "filter-mobile-show" : "filter-mobile-hide"}`}>
              <ProductFilter search={search} setSearch={setSearch} category={category}
              setCategory={setCategory} priceRange={priceRange} setPriceRange={setPriceRange}
              rating={rating} setRating={setRating} sort={sort} setSort={setSort}
              clearFilters={clearFilters}/>
            </div>

            {/* Products */}
            <div className="col-lg-9">
              <div className="product-toolbar">

                <p>Showing{" "}<strong>{filteredProducts.length}</strong>{" "}products</p>
                <span>{category === "all" ? "All category" : category}</span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="row g-4">
                  {filteredProducts.map((product)=>
                  (
                    <div className="col-12 col-sm-6 col-xl-4" key={product.id}>
                      <ProductCard product={product}/>
                    </div>
                  ))}
                </div>
              ): (
                <div className="no-products">
                  <div className="no-products-icon">
                    <i className="bi bi-search"></i>
                  </div>
                  <h2>No Products Found</h2>
                  <p>Try changing your search or filters.</p>
                  <button type="button" onClick={clearFilters}>Reset Filters</button>
                </div>
              )}
            </div>
          </div>
        </div>

      </section>
    </main>

    <Footer />

    </>
  );
}

export default Products;