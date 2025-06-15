import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ShopContext } from '../contexts/ShopContext';

const CartTotal = () => {
  const { getCartCount, getCartAmount } = useContext(CartContext);
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/place-order');
  };

  return (
    <div className="col-sm-10 col-lg-7 col-xl-5 m-lr-auto m-b-50">
      <div className="bor10 p-lr-40 p-t-30 p-b-40 m-l-63 m-r-40 m-lr-0-xl p-lr-15-sm">
        <h4 className="mtext-109 cl2 p-b-30">
          Cart Totals
        </h4>

        <div className="flex-w flex-t bor12 p-b-13">
          <div className="size-208">
            <span className="stext-110 cl2">
              Subtotal:
            </span>
          </div>

          <div className="size-209">
            <span className="mtext-110 cl2">
              {currency}{getCartAmount().toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex-w flex-t bor12 p-t-15 p-b-30">
          <div className="size-208 w-full-ssm">
            <span className="stext-110 cl2">
              Shipping:
            </span>
          </div>

          <div className="size-209 p-r-18 p-r-0-sm w-full-ssm">
            <p className="stext-111 cl6 p-t-2">
              Free shipping on orders over $200
            </p>
            
            <div className="p-t-15">
              <span className="stext-112 cl8">
                Shipping Address
              </span>
              <div className="bor8 bg0 m-b-12">
                <input className="stext-111 cl8 plh3 size-111 p-lr-15" type="text" placeholder="Address" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-w flex-t p-t-27 p-b-33">
          <div className="size-208">
            <span className="mtext-101 cl2">
              Total:
            </span>
          </div>

          <div className="size-209 p-t-1">
            <span className="mtext-110 cl2">
              {currency}{getCartAmount().toFixed(2)}
            </span>
          </div>
        </div>

        <button onClick={handleCheckout} className="flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer mb-3">
          Proceed to Checkout
        </button>
        
        <div className="my-3">
          <button onClick={handleCheckout} className="flex-c-m stext-101 cl0 size-116 bg1 bor14 hov-btn3 p-lr-15 trans-04 pointer">
            Checkout with PayPal
          </button>
        </div>
        
        <div className="mt-3">
          <Link to="/shop" className="flex-c-m stext-101 cl2 size-116 bg8 bor14 hov-btn3 p-lr-15 trans-04 pointer">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
