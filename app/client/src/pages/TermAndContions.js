import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";

const TermAndContions = () => {
  return (
    <>
      <BreadCrumb title="Term And Conditions" />
      <Container className="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndContions;
