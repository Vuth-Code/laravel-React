import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { CartContext } from "../contexts/CartContext";
import RelatedProduct from "../components/RelatedProduct";
import { getImageUrl } from '../utils/imageUtils';

const Product = () => {
  const { productId } = useParams();
  const { currency } = useContext(ShopContext);
  const { addToCart } = useContext(CartContext); 
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data
  const fetchProductData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://54.179.0.116:8000/api';
      const response = await fetch(`${apiUrl}/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      setProductData(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <section className="sec-product-detail bg-white py-5 mt-4">
  <div className="container">
    <div className="row align-items-start gy-4">
      {/* Product Image */}
      <div className="col-md-6 col-lg-7">
        <div className="px-md-3">
          <div className="position-relative">
            <img
              src={getImageUrl(productData.image)}
              alt={productData.product_name}
              className="img-fluid rounded shadow-sm"
              style={{ objectFit: 'contain', maxHeight: '500px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="col-md-6 col-lg-5">
        <div className="px-md-3">
          <h4 className="h5 fw-bold mb-3">
            {productData.product_name}
          </h4>

          <span className="h6 text-success d-block mb-3">
            {currency}{productData.price}
          </span>

          <p className="text-muted mb-4">
            {productData.description}
          </p>

          {/* Add to Cart */}
          <div className="pt-2">
            <button
              onClick={() => addToCart(productData)}
              className="btn btn-primary w-100"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Tabs Section */}
    <div className="border rounded p-4 mt-5">
      <h6 className="fw-semibold mb-3">Description</h6>
      <p className="text-secondary mb-0">{productData.description}</p>
    </div>

    {/* Related Products */}
    <div className="mt-5">
      <RelatedProduct category={productData.categories?.name} />
    </div>
  </div>
</section>

  );
};

export default Product;
