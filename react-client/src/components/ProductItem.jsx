import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({id, image, name, price }) => {
  return (
    <div className="block2">
      <div className=" border block2-pic hov-img0 item-center" style={{ width: "18rem" }}>
        <img
          src={image}
          alt="Product"
          style={{ width: "100%", height: '18rem' }}  // Set objectFit to maintain aspect ratio
        />
        <Link
         to={`/product/${id}`}
          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
        >
          Quick View
        </Link>
      </div>

      <div className="block2-txt flex-w flex-t p-t-14">
        <div className="block2-txt-child1 flex-col-l">
          <a
            href="product-detail.html"  // Optionally replace with dynamic product link if necessary
            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
          >
            {name}
          </a>
          <span className="stext-105 cl3">${price}</span>
        </div>

        <div className="block2-txt-child2 flex-r p-t-3">
          <a href="#" className="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
            
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
