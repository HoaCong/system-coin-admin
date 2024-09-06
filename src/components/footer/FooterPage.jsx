import React from "react";

const FooterPage = () => {
  return (
    <section className="container text-secondary">
      <div className="row">
        <div className="col-12 col-sm-4 mt-5">
          <h3 className="text-info">Base layout</h3>
          <div className="desc mt-4">
            <span className="text-info">Base layout</span> provides broad range
            of learning programs and activities that's unique in itself
          </div>
          <ul className="ps-3 mt-3">
            <li> Mountain Trekking Programs</li>
            <li> Inter School Competitions</li>
            <li> Awards and Ceremony</li>
          </ul>
        </div>
        <div className="col-12 col-sm-4 mt-5">
          <h3 className="text-warning">Contact Us</h3>
          <div className="mt-4">
            <span
              className="text-center d-inline-block"
              style={{ width: "24px" }}
            >
              <i className="fas fa-phone"></i>
            </span>
            Phone: +555 666 8888
          </div>
          <div className="mt-2">
            <span
              className="text-center d-inline-block"
              style={{ width: "24px" }}
            >
              <i className="far fa-envelope"></i>
            </span>
            Email: contact@gmail.com
          </div>
          <div className="mt-2">
            <span
              className="text-center d-inline-block"
              style={{ width: "24px" }}
            >
              <i className="fas fa-map-marker-alt"></i>
            </span>
            Address: 99 BlueStar - Galaxy - Mitsubixy
          </div>
        </div>
        <div className="col-12 col-sm-4 mt-5 mb-5">
          <h3 className="text-danger">Newsletter Signup</h3>
          <div className="desc mt-4">
            Get latest updates, news, surveys & offers
          </div>
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
              aria-label="Enter your email"
              aria-describedby="btn-send"
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              id="btn-send"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterPage;
