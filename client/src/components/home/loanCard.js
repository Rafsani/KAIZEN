import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./home.css";
import "./navbar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function LoanCard({ loanRequest, userId, showButtons }) {
  console.log("I am here!");
  console.log("LoanCard loan request: ", loanRequest);
  return (
    loanRequest &&
    userId && (
      <div class="user-item">
        <div class="user-card">
          {showButtons ? (
            <Link
              to={{
                pathname: "/lenderViewsReceiver",
                lenderViewsReceiver: true,
                lenderId: userId,
                receiverId: loanRequest.Receiver._id,
              }}
            >
              <div class="photo-space"></div>
            </Link>
          ) : (
            <div class="photo-space"></div>
          )}
          <div class="user-info content-box">
            <div class="name-rating">
              <p>{loanRequest.Receiver.username}</p>
              <div class="review">
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                4.5/5
              </div>
            </div>
            <div class="loan-info">
              <div class="amount">
                <span class="field">Loan Amount </span>
                <span class="highlight"> {loanRequest.Amount}</span>
              </div>
              <div class="date">
                <span class="field">Issued Date </span>
                <span class="highlight"> {loanRequest.issueDate} </span>
              </div>
            </div>
            <div class="progress">
              Progress :{" "}
              <div class="bar">
                <div class="fillup-bar"></div>
              </div>
            </div>
            {showButtons && (
              <div class="buttons">
                <Link
                  to={{
                    pathname: "/lenderViewsReceiver",
                    lenderViewsReceiver: true,
                    lenderId: userId,
                    receiverId: loanRequest.Receiver._id,
                  }}
                >
                  <a href="" class="btn-card btn-dark">
                    View Profile
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default LoanCard;
