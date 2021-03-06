import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import "./profile.css";

import formatDate from "../../utils/formatDate";
import fetchImage from "../../utils/fetchImage";

function CurrentlyLendingCard({
  contractDetails,
  userId,
  targetId,
  viewAsLender,
  viewButtons,
  loanSanctioned,
}) {
  console.log("Currently Lending Card: ", contractDetails);

  if (loanSanctioned === false) return <> </>;

  return (
    <div>
      <div class="card-profile">
        <Link
          to={{
            pathname: "/lenderViewsReceiver",
            lenderViewsReceiver: viewAsLender,
            lenderId: userId,
            receiverId: targetId,
          }}
        >
          <div
            class="photo-space"
            style={{
              backgroundImage: `url(${fetchImage(contractDetails.image.path)})`,
            }}
          ></div>
        </Link>
        <div class="user-info">
          <div class="name">{contractDetails.receiverName}</div>
          <div class="loan-contract-details">
            <div class="item">
              <div class="total">
                <span class="field">Lent Amount:</span>{" "}
                <span class="value">
                  {Math.round(contractDetails.amount)} BDT
                </span>
              </div>
              <div class="collected">
                <span class="field">Collected Amount:</span>{" "}
                <span class="value">
                  {Math.round(contractDetails.collectedAmount)} BDT
                </span>
              </div>
            </div>
            <div class="item">
              <div class="next-installment">
                <span class="field">Next Installment:</span>{" "}
                <span class="value">
                  {formatDate(contractDetails.nextInstallmentDate)}
                </span>
              </div>
              <div class="amount">
                <span class="field">Installment: </span>{" "}
                <span class="value">
                  {Math.round(contractDetails.nextInstallmentAmount)} BDT
                </span>
              </div>
            </div>
            <div class="item">
              <div class="installment-values">
                <div class="centering">
                  <span class="field">Installments Completed: </span>{" "}
                  <span class="value">
                    {" "}
                    {contractDetails.installmentsCompleted}{" "}
                  </span>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="interest-rate">
                <span class="field">Interest Rate:</span>{" "}
                <span class="value"> {contractDetails.interestRate} % </span>
              </div>
              <div class="default">
                <span class="field">Contract Defaults: </span>{" "}
                <span class="value">
                  {contractDetails.contractDefaults} times
                </span>
              </div>
            </div>
          </div>
        </div>
        {viewButtons && (
          <div class="small-buttons-list">
            <div class="buttons ">
              <a class="small-btn-profile btn-dark">
                <Link
                  style={{ color: "inherit", textDecoration: "inherit" }}
                  to={{
                    pathname: "/lenderViewsReceiver",
                    lenderViewsReceiver: viewAsLender,
                    lenderId: userId,
                    receiverId: targetId,
                  }}
                >
                  View Profile
                </Link>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CurrentlyLendingCard;
