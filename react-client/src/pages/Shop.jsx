import{ useEffect, useState, useContext } from "react";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../contexts/ShopContext";

const Shop = () => {
  // Context values
  const { products, loading, error, search, showSearch } = useContext(ShopContext);

  // Local state for filtering and sorting
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [searchText] = useState("");

  // Handle search input changes

  // Apply filters and sorting logic
  const applyFiltersAndSort = () => {
    if (!products) return;
    
    let productCopy = [...products];
    console.log('Filtering products:', productCopy);

    // Apply search filter
    if (showSearch && (search || searchText)) {
      const searchQuery = (search || searchText).toLowerCase();
      productCopy = productCopy.filter((item) =>
        item.product_name?.toLowerCase().includes(searchQuery)
      );
      console.log('After search filter:', productCopy);
    }

    // Apply category filter
    if (category.length > 0) {
      productCopy = productCopy.filter((item) => 
        category.includes(item.categories?.name)
      );
      console.log('After category filter:', productCopy);
    }

    // Apply sorting logic
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }
    console.log('After sorting:', productCopy);

    setFilterProduct(productCopy);
  };

  // Initialize product list and reapply filters when data changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [products, category, search, showSearch, sortType, searchText]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center text-danger">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <section className="bg0 p-t-30">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5 text-center">Product Overview</h3>
          </div>

          {/* Filter and Sorting Section */}
          <div className="d-flex justify-content-between align-items-center p-b-52 flex-wrap">
            {/* Filter Buttons */}
            <div className="d-flex flex-wrap mb-3">
              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  category.length === 0 ? "how-active1" : ""
                }`}
                onClick={() => setCategory([])}
              >
                All Products
              </button>
              {products && products[0]?.categories && (
                <button
                  className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                    category.includes(products[0].categories.name) ? "how-active1" : ""
                  }`}
                  onClick={() => setCategory([products[0].categories.name])}
                >
                  {products[0].categories.name}
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex-w flex-c-m m-tb-10">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-secondary text-sm stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04"
              >
                <option value="relavent">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Listing */}
          <div className="row isotope-grid">
            {filterProduct.map((item, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
              >
                <ProductItem
                  id={item.id}
                  name={item.product_name}
                  price={item.price}
                  image={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/storage/${item.image}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
