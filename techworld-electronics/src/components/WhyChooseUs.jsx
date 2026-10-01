const features = 
[
  {
    icon : "bi-truck",
    title : "Fast Delivery",
    description : "Get your favorite gadgets delivered quickly and safely to your doorstep."
  },

  {
    icon : "bi-shield-check",
    title : "Secure Shopping",
    description : "Your shopping experience is protected with secure and reliable checkout."
  },

  {
    icon : "bi-award",
    title : "Quality Products",
    description : "Explore carefully selected technology from trusted product category."
  },

  {
    icon : "bi-headset",
    title : "Expert Support",
    description : "Our support team is ready to help you choose the right technology."
  },
];

function WhyChooseUs()
{
  return(
    <section className="why-section">
      <div className="container">
        <div className="section-heading text-center">

          <span className="section-label">WHY TECHWORLD</span>
          <h2>Technology Shopping, <span>Made Better.</span></h2>
          <p>Everything you need for a smarter digital lifestyle, all in one place.</p>

        </div>

        <div className="row g-4 mt-3">

          {features.map((feature)=>
          (
            <div className="col-md-6 col-lg-3" key={feature.title}>
              <div className="feature-card">

                <div className="feature-icon">
                  <i className={`bi ${feature.icon}`}></i>
                </div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;