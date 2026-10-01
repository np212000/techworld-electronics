import {Link} from "react-router-dom";

function CategoryCard ({category})
{
  return(
    <Link to={`/products?category=${category.slug}`} className="category-card">
      <div className="category-image" style={{backgroundImage : `url(${category.image})`,}}>

        <div className="category-overlay"></div>

        <div className="category-icon">
          <i className={`bi ${category.icon}`}></i>
        </div>
        
        <div className="category-content">
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <span>Explore <i className="bi bi-arrow-right"></i></span>
        </div>
      </div>

    </Link>
  );
}

export default CategoryCard;