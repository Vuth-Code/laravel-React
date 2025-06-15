/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter products based on category and subCategory
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 4)); // Limit to 4 related products
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-5'>
      <div className='text-center py-4'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
        {related.map((item, index) => (
          <div className='col' key={index}>
            <ProductItem
              id={item.id}
              name={item.title}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
