import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import formatDate from "../../utils/formatDate";
import BasicInfo from "./basicInfo";
import CurrentlyLendingCard from "./currentlyLendingCard";
import AcceptedCOntractsCard from "./AcceptedContractCard";

function LenderProfile({ userId, hiddenData }) {
  const [lenderHistory, setLenderHistory] = useState(null);

  const fetchdata = async () => {
    let tempLenderHistory;

    if (userId) {
      // Get lender history
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/user/${userId}/history`,
      })
        .then((res) => {
          tempLenderHistory = res.data.data;
          console.log("tempLenderHistory:", tempLenderHistory);
          setLenderHistory(tempLenderHistory);
        })
        .catch((error) => {
          console.log(error);
          setLenderHistory(null);
        });
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log("Lender userId: ", userId);
  console.log("Lender hiddenData: ", hiddenData);
  console.log("Lender history: ", lenderHistory);

  const showLenderHistory = () => {
    return (
      lenderHistory && (
        <div class="site-stats content-box" id="site-stats">
          <h1>History</h1>
          <div class="stats-lender" id="stats-lender">
            <div class="item">
              <span class="field">Completed Contracts</span>
              <span class="value">{lenderHistory.completedContractCount}</span>
            </div>
            <div class="item">
              <span class="field">Maximum Amount Lent</span>
              <span class="value">{lenderHistory.maxAmountLent}</span>
            </div>
            <div class="item">
              <span class="field">Next Installment</span>
              <span class="value">
                {formatDate(lenderHistory.nextInstallmentDate)}
              </span>
            </div>
            <div class="item">
              <span class="field">Next Installment Amount</span>
              <span class="value">
                {Math.round(lenderHistory.nextInstallmentAmount)} BDT
              </span>
            </div>
          </div>
        </div>
      )
    );
  };

  const showCurrentlyLending = () => {
    return (
      lenderHistory &&
      lenderHistory.currentlyActiveContacts &&
      lenderHistory.currentlyActiveContacts.length > 0 && (
        <div class="side-scroll-section content-box " id="side-scroll-section">
          <div class="currently-lending " id="currently-lending">
            <h1>
              Currently Lending
              <i
                class="fas fa-flag-checkered "
                data-tooltip="Reached Your Limit For Lenders"
              ></i>
            </h1>
            <div class="user-cards scroller">
              {lenderHistory.currentlyActiveContacts &&
                lenderHistory.currentlyActiveContacts.map((contract) => (
                  <CurrentlyLendingCard
                    key={contract.contractId}
                    contractDetails={contract}
                    userId={userId}
                    targetId={contract.receiverId}
                    viewAsLender={true}
                    viewButtons={true}
                  />
                ))}
            </div>
          </div>
        </div>
      )
    );
  };


const showAcceptedOffers = () => {
  return (
    lenderHistory &&
    lenderHistory.currentlyActiveContacts &&
    lenderHistory.currentlyActiveContacts.length > 0 && (
      <div class="side-scroll-section content-box " id="side-scroll-section">
        <div class="currently-lending " id="currently-lending">
          <h1>
            Accepted Contracts
            <i
              class="fas fa-flag-checkered "
              data-tooltip="Reached Your Limit For Lenders"
            ></i>
          </h1>
          <div class="user-cards scroller">
            {lenderHistory.currentlyActiveContacts &&
              lenderHistory.currentlyActiveContacts.map((contract) => (
                <AcceptedCOntractsCard
                  key={contract.contractId}
                  contractDetails={contract}
                  userId={userId}
                  targetId={contract.receiverId}
                  viewAsLender={true}
                  viewButtons={true}
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
      <main class="" id="main">
        <BasicInfo hiddenData={hiddenData} />
        {showLenderHistory()}
        {showCurrentlyLending()}
        {showAcceptedOffers()}
      </main>
    </div>
  );
}

export default LenderProfile;
