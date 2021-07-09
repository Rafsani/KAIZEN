import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import formatDate from "../../utils/formatDate";
import BasicInfo from "./basicInfo";
import LenderCard from "./lenderCard";
import ContractRequestCard from "./contractRequestCard";
import PostRequestForm from "./PostRequestForm";

function ReceiverProfile({ userId, hiddenData }) {
  const [activeRequest, setActiveRequest] = useState(null);
  const [history, setHistory] = useState(null);
  const [loanInfo, setLoanInfo] = useState(null);
  const [lenders, setLenders] = useState(null);
  const [lenderLimit, setLenderLimit] = useState(5);
  const [contractRequests, setContractRequests] = useState(null);
  const [
    postRequestPopUpFormVisible,
    setPostRequestPopUpFormVisible,
  ] = useState(false);

  const fetchData = async () => {
    let tempActiveRequest;
    let tempHistory;
    let tempLoanInfo;
    let tempLenders, tempContractRequests;

    // check if receiver has active loan request
    await Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/api/user/loanverify",
    })
      .then((res) => {
        tempActiveRequest = !res.data.data;
        console.log("Receiver has active loan request: ", tempActiveRequest);
        setActiveRequest(tempActiveRequest);
      })
      .catch((error) => {
        console.log(error);
        setActiveRequest(null);
      });

    // check user's past history
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/user/${userId}/history`,
    })
      .then((res) => {
        tempHistory = res.data.data;
        console.log("Receiver history: ", tempHistory);
        setHistory(tempHistory);
      })
      .catch((error) => {
        console.log(error);
        setHistory(null);
      });

    // get loan info
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/loans/user/${userId}`,
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

      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/loans/request/${tempLoanInfo.lastIssuedLoan}`,
      })
        .then((res) => {
          tempContractRequests = res.data.data;
          console.log("Contract Requests/Offers: ", tempContractRequests);
          setContractRequests(tempContractRequests);
        })
        .catch((error) => {
          console.log(error);
          setContractRequests(null);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNoLoanRequest = () => {
    return (
      !activeRequest && (
        <div class="no-loan-info" id="no-loan-info">
          <h1>Loan Request</h1>
          <div>
            <p>You have no active loan request at this moment.</p>{" "}
          </div>
        </div>
      )
    );
  };

  const showLoanInfo = () => {
    return (
      activeRequest &&
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

  const showReceiverHistory = () => {
    return (
      history && (
        <div class="site-stats content-box " id="site-stats">
          <h1>History</h1>
          <div class="stats-receiver " id="stats-receiver">
            <div class="item">
              <span class="field">Loan Requests</span>
              <span class="value">{history.loanRequests}</span>
            </div>
            <div class="item">
              <span class="field">Total Offers</span>
              <span class="value">{history.totalContracts}</span>
            </div>
            <div class="item">
              <span class="field">Defaults</span>
              <span class="value">{history.defaults}</span>
            </div>
            <div class="item">
              <span class="field">Review</span>
              <span class="value">
                <i
                  class="fas fa-star"
                  data-tooltip="Current-Rating"
                  style={{ color: "yellow", paddingRight: "5px" }}
                >
                  <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                </i>
                {history.review}/5
              </span>
            </div>
          </div>
        </div>
      )
    );
  };

  const handleOpenPostRequestPopUp = () => {
    setPostRequestPopUpFormVisible(true);
  };

  const handleClosePostRequestPopUp = () => {
    setPostRequestPopUpFormVisible(false);
  };

  const handleSubmitPostRequestPopUp = async (val) => {
    console.log("Submitted!", val);
    await Axios({
      method: "POST",
      withCredentials: true,
      url: `http://localhost:5000/api/loans`,
      data: val,
    })
      .then((res) => {
        console.log("POST response: ", res);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
    handleClosePostRequestPopUp();
  };

  const showPostRequestForm = () => {
    if (!activeRequest && (!lenders || lenders.length === 0)) {
      if (postRequestPopUpFormVisible) {
        return (
          <PostRequestForm
            interestRate={hiddenData.verifiedStatus ? 5 : 8}
            onCancel={handleClosePostRequestPopUp}
            onSubmit={handleSubmitPostRequestPopUp}
          />
        );
      }
    }
  };

  const showPostRequest = () => {
    if (!activeRequest && (!lenders || lenders.length === 0)) {
      if (!postRequestPopUpFormVisible) {
        return (
          <div class="no-loan-buttons" id="no-loan-buttons">
            <div class="buttons">
              <a
                onClick={handleOpenPostRequestPopUp}
                href="#!"
                class="btn-profile btn-dark"
              >
                Post A Request
              </a>
            </div>
          </div>
        );
      }
    }
  };

  const showLenders = () => {
    return (
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
                  userId={userId}
                  targetId={lenderDetails.lenderId}
                  viewAsReceiver={true}
                  viewButtons={true}
                />
              ))}
            </div>
          </div>
        </div>
      )
    );
  };

  const handleAcceptContractRequest = async (contractDetails) => {
    console.log("handling Accept", contractDetails);
    await Axios({
      method: "PUT",
      withCredentials: true,
      url: `http://localhost:5000/api/contract/${contractDetails.contractId}`,
      data: {
        issuerId: userId,
      },
    })
      .then((res) => {
        console.log("PUT Response: ", res);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeclineContractRequest = async (contractDetails) => {
    console.log("handling Decline", contractDetails);
    await Axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:5000/api/contract/${contractDetails.contractId}`,
      data: {
        issuerId: userId,
      },
    })
      .then((res) => {
        console.log("DELETE Response: ", res);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showContractRequests = () => {
    return (
      contractRequests &&
      contractRequests.length > 0 && (
        <div class="side-scroll-section content-box " id="side-scroll-section">
          <div class="loan-offers " id="loan-offers">
            <h1>Contract Requests</h1>
            <div class="user-cards scroller">
              {contractRequests.map((offerDetails) => (
                <ContractRequestCard
                  offerDetails={offerDetails}
                  userId={userId}
                  onAccept={handleAcceptContractRequest}
                  onDecline={handleDeclineContractRequest}
                  key={offerDetails.contractId}
                />
              ))}
            </div>
          </div>
        </div>
      )
    );
  };

  return (
    <div>
      <main class={postRequestPopUpFormVisible && "background-blur"} id="main">
        <BasicInfo hiddenData={hiddenData} />
        <div class="loan-contract-info content-box" id="loan-contract-info">
          {showNoLoanRequest()}
          {showLoanInfo()}
        </div>
        <div class="buttons-list content-box" id="buttons-list">
          {showPostRequest()}
        </div>
        {showReceiverHistory()}
        {showLenders()}
        {showContractRequests()}
      </main>
      {showPostRequestForm()}
    </div>
  );
}

export default ReceiverProfile;
