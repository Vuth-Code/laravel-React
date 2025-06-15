/* eslint-disable no-unused-vars */
import React from 'react'
const Contact = () => {
  return (
    <section className="contact-information padding-large">
      <div className="container">
        <div className="row">
          {/* Contact Details Section */}
          <div className="col-md-6">
            <div className="section-header">
              <h2 className="section-title">Get in Touch</h2>
            </div>
            <div className="contact-detail">
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <ul className="list-unstyled list-icon">
                <li>
                  <a href="tel:+16502430000">
                    <i className="icon-phone"></i>+1650-243-0000
                  </a>
                </li>
                <li>
                  <a href="mailto:info@yourcompany.com">
                    <i className="icon-mail"></i>info@yourcompany.com
                  </a>
                </li>
                <li>
                  <a href="https://www.google.com/maps?q=North+Melbourne+VIC+3051,+Australia">
                    <i className="icon-map-pin"></i>North Melbourne VIC 3051, Australia
                  </a>
                </li>
              </ul>

              <div className="social-links">
                <h3>Social Links</h3>
                <ul className="d-flex list-unstyled">
                  <li><a href="#" className="icon-facebook" aria-label="Facebook"></a></li>
                  <li><a href="#" className="icon-twitter" aria-label="Twitter"></a></li>
                  <li><a href="#" className="icon-instagram" aria-label="Instagram"></a></li>
                  <li><a href="#" className="icon-youtube-play" aria-label="YouTube"></a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="col-md-6">
            <div className="contact-form-section">
              <div className="section-header">
                <h2 className="section-title">Send Us a Message</h2>
              </div>
              <form name="contactform" action="contact.php" method="post" className="contact-form">
                <div className="form-item">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="u-full-width bg-light"
                    required
                    minLength="2"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="u-full-width bg-light"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="u-full-width bg-light"
                    style={{ height: '180px' }}
                    required
                  />
                </div>
                <label>
                  <input type="checkbox" required />
                  <span className="label-body">
                    I agree to all the <a href="#">terms and conditions</a>
                  </span>
                </label>
                <button type="submit" name="submit" className="btn btn-dark btn-full btn-medium">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact