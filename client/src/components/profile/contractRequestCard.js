import React, { useState, useEffect } from "react";

import "./profile.css";

import formatDate from "../../utils/formatDate";
import { Link } from "react-router-dom";
import fetchImage from "../../utils/fetchImage";

function ContractRequestCard({ offerDetails, onAccept, onDecline, userId }) {
  console.log("Offer details: ", offerDetails);
  return (
    <div class="card-profile">
      <Link
        to={{
          pathname: "/receiverViewsLender",
          receiverViewsLender: true,
          receiverId: userId,
          lenderId: offerDetails.lenderId,
        }}
      >
        <div
          class="photo-space"
          style={{
            backgroundImage: `url(${fetchImage(
              offerDetails.lenderImage.path
            )})`,
          }}
        ></div>
      </Link>
      <div class="user-info">
        <div class="name">{offerDetails.lenderName}</div>
        <div class="loan-contract-details">
          <div class="item">
            <div class="total">
              <span class="field">Total Amount</span>
            </div>
            <div class="collected">
              <span class="field">{offerDetails.totalAmount} BDT</span>
            </div>
          </div>
          <div class="item">
            <div class="next-installment">
              <span class="field">Expiration Date</span>
            </div>
            <div class="amount">
              <span class="field">
                {formatDate(offerDetails.expirationDate)}
              </span>
            </div>
          </div>
          <div class="item  special-item">
            <div class="next-installment">
              <span class="field">Installments</span>
            </div>
            <div class="amount">
              <span class="field">{offerDetails.installments}</span>
            </div>
          </div>
          <div class="item">
            <div class="interest-rate">
              <span class="field">Interest Rate</span>
            </div>
            <div class="default">
              <span class="field">{offerDetails.interestRate}%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="small-buttons-list">
        <div class="buttons ">
          <a
            onClick={() => onAccept(offerDetails)}
            href="#"
            class="small-btn-profile btn-dark"
          >
            Accept
          </a>
        </div>
        <div class="buttons">
          <a
            onClick={() => onDecline(offerDetails)}
            href="#"
            class="small-btn-profile btn-light"
          >
            Decline
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContractRequestCard;
