import { useContext } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUtils';

function BillBoard() {
    const { products, loading, error } = useContext(ShopContext);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const slides = products.slice(0, 2);

    return (
        <section id="billboard" className="overflow-hidden" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
  <Swiper
    modules={[Navigation]}
    navigation={{
      nextEl: '.button-next',
      prevEl: '.button-prev',
    }}
    className="main-swiper"
    loop={true}
    spaceBetween={0}
  >
    {slides.map((product) => (
      <SwiperSlide key={product.id} className="bg-light"  style={{ height: '480px', minHeight: 'unset' }}>
        <div className="d-flex h-100 align-items-center container">
          <div className="row w-100 align-items-center">
            <div className="col-md-6 text-center">
              <img
                src={getImageUrl(product.image)}
                alt={product.product_name || product.title}
                style={{ maxHeight: 'auto', objectFit: 'contain' }}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2 style={{ fontSize: '14px', marginBottom: '0.3rem' }}>{product.title}</h2>
              <div className="btn-wrap ">
                <Link
                  to="/shop"
                  className="btn btn-light btn-sm"
                  tabIndex="0"
                >
                  Shop it now <i className="icon icon-arrow-io"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  <button className="button-prev">
    <i className="icon icon-chevron-left"></i>
  </button>
  <button className="button-next">
    <i className="icon icon-chevron-right"></i>
  </button>
</section>

    );
}

export default BillBoard;
