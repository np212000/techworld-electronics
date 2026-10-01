import "../styles/products.css";

//This component contains all product filtring controls.
//This component only receives values and functions through props.
// Filters included:
//1.Search
//2. Category
//3. Brand
//4. Maximum Price
//5. Minimum Rating

function ProductFilter({search, setSearch, category, setCategory, priceRange, setPriceRange, 
  rating, setRating, sort, setSort, clearFilters})
  {
    return(
      <div className="filter-pannel">

        {/*Search */}
        <div className="filter-group">

          <label htmlFor="product-search">Search Products</label>

          <div className="filter-search">
            <i className="bi bi-search"></i>
            <input id = "product-search" type="text" onChange={(event)=>setSearch(event.target.value)}
            placeholder="Search phones, laptops..." value={search}/>
          </div>
        </div>

        {/*Category */}
        <div className="filter-group">

          <label htmlFor = "category-filter">Category</label>
          <select id = "category-filter" value={category} 
          onChange={(event)=>setCategory(event.target.value)}>

            <option value="all">All Category</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="audio">Audio</option>
            <option value="wearables">Wearables</option>
            <option value="gaming">Gaming</option>
            <option value="cameras">Cameras</option>
            <option value="monitors">Monitors</option>
            <option value="accessories">Accessories</option>

          </select>
        </div>

        {/*Price */}
        <div className="filter-group">

          <label htmlFor="price-filter">Maximum Price</label>
          <input id = "price-filter" type="range" min = "5000" max = "150000" step="5000"
          value={priceRange} onChange={(event)=>setPriceRange(Number(event.target.value))}/>
          <div className="range-value">Up to Rs.{priceRange.toLocaleString("en-IN")}</div>
        </div>

        {/* Rating */}
        <div className="filter-group">

          <label htmlFor="rating-filter">Minimum Rating</label>
          <select id = "rating-filter" value={rating} 
          onChange={(event)=>setRating(Number(event.target.value))}>

            <option value="0">All Ratings</option>
            <option value="4">⭐ 4.0+</option>
            <option value="4.5">⭐ 4.5+</option>
            <option value="4.7">⭐ 4.7+</option>
          </select>
        </div>

        {/* Sort */}
        <div className="filter-group">

          <label htmlFor="sort-filter">Sort By</label>
          <select id = "sort-filter" value={sort} onChange={(event)=>setSort(event.target.value)}>

            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Clear Filter */}
        <button type="button" className="clear-filter-btn" onClick={clearFilters}>
          <i className="bi bi-arrow-counterclockwise">Clear Filter</i>
        </button>
      </div>
    );
  }

export default ProductFilter;