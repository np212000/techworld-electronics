import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

import categories from "../data/categories";

import "../styles/home.css";

function Home()
{
  return(
    <>
    <Navbar />

    <main>
      <Hero />

      <section className="home-section categoris-section">
        <div className="container">
          <div className="section-heading text-center">

            <span>Shop By <span>Category.</span></span>
            <p>
              Find the technology you need, organized into
              categoies made for easier shopping.
            </p>
          </div>

          <div className="row g-4">

            {categories.map((category)=>
            (
              <div className="col-12 col-sm-6 col-lg-3" key={category.id}>
                <CategoryCard category={category}/>
              </div>
            ))}
          </div>
        </div>

      </section>
      
      <WhyChooseUs />

    </main>

    <Footer />

    </>
  );
}

export default Home;