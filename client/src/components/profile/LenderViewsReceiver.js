import React, { useState, useEffect } from "react";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faStar,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
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
import ReviewCard from "./reviewCard";
import PostReviewForm from "./PostReviewForm";
import ViewCollateral from "../registration/viewCollateral";

function LenderViewsReceiver(props) {
  const [lenderViewsReceiver, setLenderViewsReceiver] = useState(false);
  const [lenderId, setLenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [receiverData, setReceiverData] = useState(null);
  const [receiverReviews, setReceiverReviews] = useState(null);
  const [loanInfo, setLoanInfo] = useState(null);
  const [lenders, setLenders] = useState(null);
  const [activeContract, setActiveContract] = useState(null);
  const [lenderLimit, setLenderLimit] = useState(5);
  const [
    contractOfferPopUpFormVisible,
    setContractOfferPopUpFormVisible,
  ] = useState(false);
  const [reviewPopUpFormVisible, setReviewPopUpFormVisible] = useState(false);
  const [collateralVisible, setCollateralVisible] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  let pageHistory = useHistory();

  const fetchData = async () => {
    let tempLenderViewsReceiver;
    let tempLenderId, tempReceiverId;
    let tempReceiverData;
    let tempLoanInfo;
    let tempLenders;
    let tempReceiverReviews;
    let tempActiveContract;

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

      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/contract/${tempReceiverId}`,
      })
        .then((res) => {
          console.log("Contract: ", res);
          tempActiveContract = res.data.data;
          console.log("Active Contract: ", tempActiveContract);
          setActiveContract(tempActiveContract);
        })
        .catch((error) => {
          console.log(error);
          setActiveContract(null);
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

    // Get reviews for a receiver
    if (tempReceiverId) {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/review/${tempReceiverId}`,
      })
        .then((res) => {
          tempReceiverReviews = res.data.data;
          console.log("Receiver Reviews: ", tempReceiverReviews);
          setReceiverReviews(tempReceiverReviews);
        })
        .catch((error) => {
          console.log(error);
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
  console.log("Active Contract: ", activeContract);

  const showLoanInfo = () => {
    return (
      lenderViewsReceiver &&
      (!activeContract || !activeContract.activeContract) &&
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

  const showActiveContract = () => {
    return (
      lenderViewsReceiver &&
      activeContract &&
      activeContract.activeContract && (
        <div class="contract-info " id="contract-info">
          <h1>
            Contract Information{" "}
            <i
              class="fas fa-exclamation-triangle "
              data-tooltip="Installment Not Paid"
            >
              {" "}
              <FontAwesomeIcon
                icon={faExclamationTriangle}
              ></FontAwesomeIcon>{" "}
            </i>
          </h1>

          <p>
            I, hereby, agree to the terms & conditions set upon by this contract
            agreement.{" "}
          </p>
          <cite>
            - {formatDate(activeContract.signingDate)} <br />{" "}
          </cite>
          <div class="contract-data">
            <div class="item">
              <div class="total">
                <span class="field">Total Amount:</span>{" "}
                <span class="value">{activeContract.totalAmount} BDT</span>
              </div>
              <div class="collected">
                <span class="field">Collected Amount:</span>{" "}
                <span class="value">{activeContract.collectedAmount} BDT</span>
              </div>
            </div>
            <div class="item">
              <div class="next-installment">
                <span class="field">Next Installment:</span>{" "}
                <span class="value">
                  {formatDate(activeContract.nextInstallment)}
                </span>
              </div>
              <div class="amount">
                <span class="field">Installment Amount: </span>{" "}
                <span class="value">
                  {Math.round(activeContract.nextInstallmentAmount)} BDT
                </span>
              </div>
            </div>
            <div class="item">
              <div class="installment-values">
                <div class="centering">
                  <span class="field">Installments Completed: </span>{" "}
                  <span class="value">
                    {" "}
                    {activeContract.installmentsCompleted}{" "}
                  </span>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="interest-rate">
                <span class="field">Interest Rate:</span>{" "}
                <span class="value"> {activeContract.interestRate}% </span>
              </div>
              <div class="default">
                <span class="field">Defaulted Installments: </span>{" "}
                <span class="value">{"ToDo: Placeholder"} times</span>
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
    if (
      lenderViewsReceiver &&
      (!activeContract || !activeContract.activeContract) &&
      loanInfo
    ) {
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

  const handleSubmitReview = async (review) => {
    const data = {
      contract: activeContract.contractId,
      lender: lenderId,
      receiver: receiverId,
      ratingValue: review.ratingValue,
      details: review.details,
    };
    console.log("Review data to send: ", data);
    await Axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:5000/api/review`,
      data: data,
    })
      .then((res) => {
        console.log("Review POST response: ", res);
      })
      .catch((error) => {
        console.log(error);
      });
    setReviewPopUpFormVisible(false);
    pageHistory.push("/");
  };

  const showReviewForm = () => {
    if (
      lenderViewsReceiver &&
      activeContract &&
      activeContract.activeContract &&
      reviewPopUpFormVisible
    ) {
      return (
        <PostReviewForm
          onCancel={() => setReviewPopUpFormVisible(false)}
          onSubmit={handleSubmitReview}
        />
      );
    }
  };
  console.log("review pop up: ", reviewPopUpFormVisible);

  const showActiveContractButtons = () => {
    if (
      lenderViewsReceiver &&
      activeContract &&
      activeContract.activeContract &&
      !reviewPopUpFormVisible
    ) {
      return (
        <div class="contract-buttons " id="contract-buttons">
          <div class="buttons " id="end-contract-button">
            <a
              href="#!"
              class="btn-profile btn-dark"
              onClick={() => setReviewPopUpFormVisible(true)}
            >
              End Contract
            </a>
          </div>
          <div class="buttons">
            <a href="#!" class="btn-profile btn-light">
              Report Issue
            </a>
          </div>
          {/* <!-- <div class="buttons">
                    <a href="#" class="btn-profile btn-dark">Extend Contract</a>
                </div> --> */}
        </div>
      );
    }
  };

  const showReceiverReviews = () => {
    return (
      receiverReviews &&
      receiverReviews.length > 0 && (
        <div class="review-section content-box " id="review-section">
          <div class="title">
            <h1>Reviews</h1>
            <p>
              <i class="fas fa-star" data-tooltip="Current-Rating">
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
              </i>
              {receiverData.rating}/5
            </p>
          </div>
          <div class="reviews scroller">
            {receiverReviews.map((review) => (
              <ReviewCard review={review} showButtons={false} />
            ))}
          </div>
        </div>
      )
    );
  };

  const showCollateralPage = () => {
    return (
      collateralVisible && (
        <ViewCollateral
          collateral={receiverData.collateral}
          onBack={() => {
            setCollateralVisible(false);
          }}
        />
      )
    );
  };

  if (collateralVisible) {
    return <div>{showCollateralPage()}</div>;
  }

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    receiverData && (
      <div className="Profile">
        <AppNavBar />

        <main
          class={
            (contractOfferPopUpFormVisible || reviewPopUpFormVisible) &&
            "background-blur"
          }
          id="main"
        >
          {receiverData && (
            <BasicInfo
              hiddenData={receiverData}
              showBkash={false}
              showCollateralButton={true}
              setCollateralVisible={setCollateralVisible}
            />
          )}
          <div class="loan-contract-info content-box" id="loan-contract-info">
            {showLoanInfo()}
            {showActiveContract()}
          </div>
          <div class="buttons-list content-box" id="buttons-list">
            {showContractOfferButton()}
            {showActiveContractButtons()}
          </div>
          {showLenders()}
          {showReceiverReviews()}
        </main>
        {showContractOfferForm()}
        {showReviewForm()}
      </div>
    )
  );
}

export default LenderViewsReceiver;
