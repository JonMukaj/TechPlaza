import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import { useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Autostrada Tiranë-Rinas, km. 12, 1000
                </address>
                <a
                  href="tel:+355 69 420 6969"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +355 69 420 6969
                </a>
                <a
                  href="mailto:tech-plaza@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  tech-plaza@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-3">
              <h4 className="text-white mb-4">Address</h4>
              <div className="footer-link d-flex flex-column">
                <Link
                  to="/contact"
                  className="text-white py-2 mb-1"
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1" to={"/categories/1"}>
                  Android
                </Link>
                <Link className="text-white py-2 mb-1" to={"/categories/2"}>
                  iPhone
                </Link>
                <Link className="text-white py-2 mb-1" to={"/categories/3"}>
                  Laptop
                </Link>
                <Link className="text-white py-2 mb-1" to={"/categories/4"}>
                  Smart Tv
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
