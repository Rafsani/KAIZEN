import React, { useState, useEffect } from "react";

import "./profile.css";

import formatDate from "../../utils/formatDate";

function LenderCard({ lenderDetails }) {
  return (
    <div class="card-profile">
      <div class="photo-space"></div>
      <div class="user-info">
        <div class="name">{lenderDetails.lenderName}</div>
        <div class="loan-contract-details">
          <div class="item">
            <div class="total">
              <span class="field">Total Amount:</span>{" "}
              <span class="value">{lenderDetails.totalAmount} BDT</span>
            </div>
            <div class="collected">
              <span class="field">Collected Amount:</span>{" "}
              <span class="value">{lenderDetails.collectedAmount} BDT</span>
            </div>
          </div>
          <div class="item">
            <div class="next-installment">
              <span class="field">Next Installment:</span>{" "}
              <span class="value">
                {formatDate(lenderDetails.nextInstallmentDate)}
              </span>
            </div>
            <div class="amount">
              <span class="field">Installment: </span>{" "}
              <span class="value">
                {Math.round(lenderDetails.installmentAmount)} BDT
              </span>
            </div>
          </div>
          <div class="item">
            <div class="installment-values">
              <div class="centering">
                <span class="field">Installments Completed: </span>{" "}
                <span class="value">
                  {" "}
                  {lenderDetails.installmentsCompleted}{" "}
                </span>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="interest-rate">
              <span class="field">Interest Rate:</span>{" "}
              <span class="value"> {lenderDetails.interestRate}% </span>
            </div>
            <div class="default">
              <span class="field">My Defaults: </span>{" "}
              <span class="value">{lenderDetails.myDefaults} times</span>
            </div>
          </div>
        </div>
      </div>
      <div class="small-buttons-list" id="report-issue-1">
        <div class="buttons">
          <a href="#" class="small-btn-profile btn-dark">
            Repay Loan
          </a>
        </div>
        <div class="buttons">
          <a href="#" class="small-btn-profile btn-light">
            Report Issue
          </a>
        </div>
      </div>
    </div>
  );
}

export default LenderCard;
