import React, { useState, useEffect } from "react";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./profile.css";

import formatDate from "../../utils/formatDate";
import AppNavBar from "../navbar/navbar";
import BasicInfo from "./basicInfo";
import LenderCard from "./lenderCard";
import ContractRequestCard from "./contractRequestCard";
import OfferContractForm from "./OfferContractForm";
import { useRadioGroup } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";

function ReceiverViewsLender(props) {
  const [lenderId, setLenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [lenderData, setLenderData] = useState(null);
  const [lenderContract, setLenderContract] = useState(null);

  console.log(props);

  const fetchdata = async () => {
    let tempLenderId, tempReceiverId, tempLenderData, tempLenderContract;

    tempLenderId = props && props.location && props.location.lenderId;
    setLenderId(tempLenderId);

    tempReceiverId = props && props.location && props.location.receiverId;
    setReceiverId(tempReceiverId);

    // Get hiddenData
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/user/${tempLenderId}`,
    })
      .then((res) => {
        console.log("Dat: ", res);
        tempLenderData = res.data.data;
        console.log("tempLenderData: ", tempLenderData);
        setLenderData(tempLenderData);
      })
      .catch((error) => {
        console.log(error);
        setLenderData(null);
      });

    // Get contract
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/contract/${tempLenderId}`,
    })
      .then((res) => {
        console.log("Contract: ", res);
        tempLenderContract = res.data.data;
        console.log("tempLenderContract: ", tempLenderContract);
        setLenderContract(tempLenderContract);
      })
      .catch((error) => {
        console.log(error);
        setLenderContract(null);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log("ids: ", lenderId, receiverId);
  console.log("lenderData: ", lenderData);
  console.log("lenderContract: ", lenderContract);

  const showNoActiveContract = () => {
    return (
      lenderContract &&
      !lenderContract.activeContract && (
        <div>
          <div class="loan-contract-info content-box " id="loan-contract-info">
            <div class="offer-info " id="offer-info">
              <h1>
                <div>Contract Offer</div>
                <i class="far fa-laugh-beam"></i>
              </h1>

              <p>{lenderData.username} has made an offer.</p>
              <cite>
                - {formatDate(lenderContract.signingDate)} <br />{" "}
              </cite>
              <div class="contract-data">
                <div class="item">
                  <div class="offer-condition">
                    <span class="field">Loan Amount:</span>{" "}
                    <span class="value">{lenderContract.totalAmount} BDT</span>
                  </div>
                </div>
                <div class="item">
                  <div class="offer-condition">
                    <span class="field">Interest Rate:</span>{" "}
                    <span class="value"> {lenderContract.interestRate}% </span>
                  </div>
                </div>
                <div class="item">
                  <div class="offer-condition">
                    <span class="field">Installments:</span>{" "}
                    <span class="value">{lenderContract.installments}</span>
                  </div>
                </div>
                <div class="item">
                  <div class="offer-condition">
                    <span class="field">First Installment Date: </span>{" "}
                    <span class="value">
                      {formatDate(lenderContract.firstInstallmentDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div class="conditions" style={{ textAlign: "left" }}>
                <ul>
                  <li>
                    You have to finish payment by:{" "}
                    <span class="highlight">
                      {formatDate(lenderContract.finalInstallmentDate)}
                    </span>
                  </li>
                  <li>
                    Total amount with interest is:{" "}
                    <span class="highlight">
                      {lenderContract.totalAmountWithInterest}
                    </span>{" "}
                    BDT
                  </li>
                  <li class="collateral remove" id="collateral">
                    Your collateral will be subjected to seizure in case of{" "}
                    <span class="highlight">default.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="buttons-list content-box " id="buttons-list">
            <div class="contract-buttons " id="offer-buttons">
              <div class="buttons">
                <a class="btn-profile btn-dark">Accept</a>
              </div>
              <div class="buttons">
                <a class="btn-profile btn-light">Decline</a>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div className="Profile">
      <main class="" id="main">
        {lenderData && <BasicInfo hiddenData={lenderData} />}
        {showNoActiveContract()}
      </main>
    </div>
  );
}

export default ReceiverViewsLender;
