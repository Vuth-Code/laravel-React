import React from 'react';

const FooterBottom = () => {
  return (
    <div id="footer-bottom">
      <div className="container">
        <div className="d-flex align-items-center flex-wrap justify-content-between">
          <div className="copyright">
          </div>
          <div className="payment-method">
            <p>Payment options :</p>
            <div className="card-wrap">
              <img src="images/visa-icon.jpg" alt="visa" />
              <img src="images/mastercard.png" alt="mastercard" />
              <img src="images/american-express.jpg" alt="american-express" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
