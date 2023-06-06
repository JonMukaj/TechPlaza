import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../Components/Container";

const Contact = () => {
  return (
    <>
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.5909046576767!2d19.70377761157191!3d41.40468989480215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13502c4d8e14227d%3A0x92c16879aa946786!2sEpoka%20University!5e0!3m2!1sen!2s!4v1686067669279!5m2!1sen!2s"
              width="600"
              height="450"
              allowfullscreen="true"
              loading="lazy"
              // referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <div className="col-6">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <h3 className="contact-title mb-4">Get in touch with us</h3>
              <div>
                <ul className="ps-0">
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineHome className="fs-5" />
                    <address className="mb-0">
                      Autostrada Tiranë-Rinas, km. 12, 1000
                    </address>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiPhoneCall className="fs-5" />
                    <a href="tel:+355 69 420 69694">+355 69 420 6969</a>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineMail className="fs-5" />
                    <a href="mailto:tech-plaza@gmail.com">
                      tech-plaza@gmail.com
                    </a>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiInfoCircle className="fs-5" />
                    <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
