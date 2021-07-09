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
import LoadingScreen from "../loadingScreen/loadingScreen";

function LenderViewsReceiver(props) {
  const [lenderViewsReceiver, setLenderViewsReceiver] = useState(false);
  const [lenderId, setLenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [loanInfo, setLoanInfo] = useState(null);
  const [lenders, setLenders] = useState(null);
  const [lenderLimit, setLenderLimit] = useState(5);
  const [
    contractOfferPopUpFormVisible,
    setContractOfferPopUpFormVisible,
  ] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  let pageHistory = useHistory();

  const fetchData = async () => {
    let tempLenderViewsReceiver;
    let tempLenderId, tempReceiverId;
    let tempReceiverData;
    let tempLoanInfo;
    let tempLenders;

    console.log("From props.location: ", props.location);

    tempLenderViewsReceiver =
      props && props.location && props.location.lenderViewsReceiver;
    setLenderViewsReceiver(props.location.lenderViewsReceiver);

    tempLenderId = props && props.location && props.location.lenderId;
    setLenderId(tempLenderId);

    tempReceiverId = props && props.location && props.location.receiverId;
    setReceiverId(tempReceiverId);

    if (tempReceiverId) {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/user/${tempReceiverId}`,
      }).then((res) => {
        tempReceiverData = res.data.data;
        console.log("Receiver Data: ", tempReceiverData);
        setReceiverData(tempReceiverData);
      });
    }

    if (tempReceiverId) {
      // get loan info
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/loans/user/${tempReceiverId}`,
      })
        .then((res) => {
          tempLoanInfo = res.data.data;
          console.log("Receiver Loan Info: ", tempLoanInfo);
          setLoanInfo(tempLoanInfo);
        })
        .catch((error) => {
          console.log(error);
          setLoanInfo(null);
        });
    }

    // if loanInfo.lastIssuedLoan exists,
    // fetch the current lenders and contract requests
    if (tempLoanInfo && tempLoanInfo.lastIssuedLoan) {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/loans/lenders/${tempLoanInfo.lastIssuedLoan}`,
      })
        .then((res) => {
          tempLenders = res.data.data;
          console.log("Current lenders: ", tempLenders);
          setLenders(tempLenders);
        })
        .catch((error) => {
          console.log(error);
          setLenders(null);
        });
    }

    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("lenderId: ", lenderId);
  console.log("receiverId: ", receiverId);
  console.log("receiverData: ", receiverData);
  console.log("loanInfo: ", loanInfo);
  console.log("lenders: ", lenders);

  const showLoanInfo = () => {
    return (
      lenderViewsReceiver &&
      loanInfo && (
        <div class="loan-info " id="loan-info">
          <h1>Loan Information</h1>
          <p>
            {/* I want loan because I need treatment. I want to live and I want to
            be healthy again.{" "} */}
            {loanInfo.details}
          </p>
          <cite>
            - {formatDate(loanInfo.issueDate)} <br />
          </cite>
          <div class="loan-data">
            <div class="item">
              <div class="left">
                <span class="field">Left Amount:</span>{" "}
                <span class="value">{loanInfo.leftAmount} BDT</span>
              </div>
              <div class="total">
                <span class="field">Total Amount:</span>{" "}
                <span class="value">{loanInfo.totalAmount} BDT</span>
              </div>
            </div>
            <div class="item">
              <div class="next-installment">
                <span class="field">Next Installment:</span>{" "}
                <span class="value">
                  {formatDate(loanInfo.nextInstallment)}
                </span>
              </div>
              <div class="expiration">
                <span class="field">Expiration Date: </span>{" "}
                <span class="value">{formatDate(loanInfo.expirationDate)}</span>
              </div>
            </div>
            <div class="item">
              <div class="progress-values">
                <div class="centering">
                  <span class="field">Progress: </span>{" "}
                  <span class="value"> {loanInfo.progress}% </span>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="current-lenders">
                <span class="field">Current Lenders:</span>{" "}
                <span class="value"> {loanInfo.currentLenders} </span>
              </div>
              <div class="total-request">
                <span class="field">Total Requests: </span>{" "}
                <span class="value">{loanInfo.totalRequest}</span>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };

  const showLenders = () => {
    return (
      lenderViewsReceiver &&
      lenders && (
        <div
          class="current-lenders-section content-box "
          id="current-lenders-section"
        >
          <div class="accepted-requests">
            <h1>
              Current Lenders
              {lenders.length >= lenderLimit && (
                <i
                  class="fas fa-flag-checkered "
                  data-tooltip="Reached Your Limit For Lenders"
                ></i>
              )}
            </h1>
            <div class="user-cards">
              {lenders.map((lenderDetails) => (
                <LenderCard
                  lenderDetails={lenderDetails}
                  userId={lenderId}
                  targetId={lenderDetails.lenderId}
                  viewAsReceiver={false}
                  viewButtons={false}
                />
              ))}
            </div>
          </div>
        </div>
      )
    );
  };

  const handleOpenContractOfferPopUp = () => {
    setContractOfferPopUpFormVisible(true);
  };

  const handleCloseContractOfferPopUp = () => {
    setContractOfferPopUpFormVisible(false);
  };

  const handleSubmitContractOfferPopUp = async (val) => {
    console.log("Submitted: ", val);
    const data = {
      loanId: loanInfo.lastIssuedLoan,
      lenderId: lenderId,
      receiverId: receiverId,
      amount: val.amount,
      installments: val.installments,
    };
    console.log("Will submit: ", data);
    await Axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:5000/api/contract`,
      data: data,
    })
      .then((res) => {
        console.log("POST response: ", res);
      })
      .catch((error) => {
        console.log(error);
      });
    handleCloseContractOfferPopUp();
    pageHistory.push("/");
  };

  const showContractOfferForm = () => {
    if (lenderViewsReceiver && loanInfo) {
      if (contractOfferPopUpFormVisible) {
        return (
          <OfferContractForm
            interestRate={receiverData.verifiedStatus ? 5 : 8}
            onCancel={handleCloseContractOfferPopUp}
            onSubmit={handleSubmitContractOfferPopUp}
          />
        );
      }
    }
  };

  const showContractOfferButton = () => {
    if (lenderViewsReceiver && loanInfo) {
      if (!contractOfferPopUpFormVisible) {
        return (
          <div class="loan-buttons " id="loan-buttons">
            {/* <!-- thses buttons will only show when the lender is viewing the receiver profile --> */}
            <div class="buttons">
              <a
                href="#"
                onClick={handleOpenContractOfferPopUp}
                class="btn-profile btn-dark"
              >
                Offer Contract
              </a>
            </div>
          </div>
        );
      }
    }
  };

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    receiverData && (
      <div className="Profile">
        <AppNavBar />

        <main
          class={contractOfferPopUpFormVisible && "background-blur"}
          id="main"
        >
          {receiverData && <BasicInfo hiddenData={receiverData} />}
          <div class="loan-contract-info content-box" id="loan-contract-info">
            {showLoanInfo()}
          </div>
          <div class="buttons-list content-box" id="buttons-list">
            {showContractOfferButton()}
          </div>
          {showLenders()}
        </main>
        {showContractOfferForm()}
      </div>
    )
  );
}

export default LenderViewsReceiver;
