import React, { useContext } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ShopContaxt } from "../contexts/ShopContext";

const SlideBar = () => {
  // Fetch products from ShopContext
  const { products } = useContext(ShopContaxt);

  // Check if products are available
  if (!products || products.length === 0) {
    return <div>Loading products...</div>;
  }

  // Slice to get the first 5 products
  const sliderProducts = products.slice(0, 5);

  return (
    <OwlCarousel
      items={1} // Number of items displayed at a time
      loop // Loop the carousel
      autoplay // Enable auto-play
      autoplayTimeout={5000} // Delay between slides (5000ms = 5s)
      className="owl-theme"
    >
      {/* Check if sliderProducts has products */}
      {sliderProducts.length > 0 ? (
        sliderProducts.map((product, index) => (
          <div
            key={index}
            className="item-slick1 "
            style={{
              backgroundImage: `url(${product.image} )`, // Set background image
              backgroundColor :"#eef1f3" ,
              backgroundSize: "contain",
              backgroundPosition: "right",
              backgroundRepeat: "no-repeat",
              height: "700px",
            }}
          >
            <div className="container h-full ">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5 ">
                <div className="layer-slick1 animated fadeInDown " data-delay="0">
                  <span className="ltext-101 cl2 respon2">
                    {product.category}
                  </span>
                </div>
                <div className="layer-slick1 animated fadeInUp" data-delay="800">
                  <h2
                    className="ltext-201 cl2 p-t-19 p-b-43 respon1"
                    style={{ width: "70%" }}
                  >
                    {product.title}
                  </h2>
                </div>
                <div className="btn-wrap layer-slick1 animated zoomIn" data-delay="1600">
                  <a
                    href={`/product/${product.id}`}
                    className="btn btn-light btn-medium d-flex align-items-center"
                  >
                    Shop Now <i className="icon icon-arrow-io"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <p>No products available</p>
        </div>
      )}
    </OwlCarousel>
  );
};

export default SlideBar;
