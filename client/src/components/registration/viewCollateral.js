import React from "react";

import "./collateral.css";
import { faKickstarterK } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewCollateral({ collateral, onBack }) {
  console.log("Collateral: ", collateral);

  return (
    <div className="Collateral">
      <div class="main content-box">
        <div class="icon">
          <i class="fab fa-kickstarter-k fa-6x">
            <FontAwesomeIcon icon={faKickstarterK}></FontAwesomeIcon>
          </i>
        </div>
        <div class="registration">
          <div class="title-card">
            <h1>Collateral information</h1>
            <p>
              Collateral is a video on the item you are mortgaging. The item
              needs to be of value more than 10000 BDT. Our employees will
              review your item personally and after verifying your item we will
              add you to our verified receivers and you will be able to get
              loans with only <span style={{ color: "red" }}>5%</span> interest
              rate. Before that, the interest rate will be 8%. Thanks for your
              patience.{" "}
            </p>
          </div>
          <div class="form">
            <div class="video">
              <iframe src={collateral}></iframe>
            </div>
            <div class="buttons inputs-div">
              <a href="#" class="btn-form btn-light" onClick={onBack}>
                Go Back
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCollateral;
