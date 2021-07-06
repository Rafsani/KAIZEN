import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import ContractCard from "./contractCard";
import formatDate from "../../utils/formatDate";
import BasicInfo from "./basicInfo";

function LenderProfile({ userId, hiddenData }) {
  const [history, setHistory] = useState([]);

  const fetchdata = async () => {
    let tempHistory;

    // Get history
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:5000/api/user/${userId}/history`,
    }).then((res) => {
      tempHistory = res.data.data;
      console.log("tempHistory:", tempHistory);
      setHistory(res.data.data);
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log("userId: ", userId);
  console.log(" hiddenData: ", hiddenData);
  console.log("history: ", history);

  return (
    <div>
      <main class="" id="main">
        <BasicInfo hiddenData={hiddenData} />
        <div class="site-stats content-box" id="site-stats">
          <h1>History</h1>
          <div class="stats-lender" id="stats-lender">
            <div class="item">
              <span class="field">Completed Contracts</span>
              <span class="value">{history.completedContractCount}</span>
            </div>
            <div class="item">
              <span class="field">Maximum Amount Lent</span>
              <span class="value">{history.maxAmountLent}</span>
            </div>
            <div class="item">
              <span class="field">Next Installment</span>
              <span class="value">
                {formatDate(history.nextInstallmentDate)}
              </span>
            </div>
            <div class="item">
              <span class="field">Next Installment Amount</span>
              <span class="value">
                {Math.round(history.nextInstallmentAmount)} BDT
              </span>
            </div>
          </div>
        </div>

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
              {history.currentlyActiveContacts &&
                history.currentlyActiveContacts.map((contract) => (
                  <ContractCard
                    key={contract.contractId}
                    contractDetails={contract}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LenderProfile;
