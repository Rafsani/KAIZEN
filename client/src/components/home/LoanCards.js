import React, { useState, useEffect } from "react";
import "./home.css";
import "./navbar.css";
import AppNavBar from "../navbar/navbar";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import BASE_URL from "../Base_url";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function LoanCards({ requests, userId }) {
  return (
    <div class="receiver-list">
      {requests.map((value, index) => {
        // console.log(value);
        return (
          <div class="user-item">
            <div class="user-card">
              <Link
                to={{
                  pathname: "/lenderViewsReceiver",
                  lenderViewsReceiver: true,
                  lenderId: userId,
                  receiverId: value.Receiver._id,
                }}
              >
                <div class="photo-space"></div>
              </Link>
              <div class="user-info content-box">
                <div class="name-rating">
                  <p>{value.Receiver.username}</p>
                  <div class="review">
                    <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                    4.5/5
                  </div>
                </div>
                <div class="loan-info">
                  <div class="amount">
                    <span class="field">Loan Amount </span>
                    <span class="highlight"> {value.Amount}</span>
                  </div>
                  <div class="date">
                    <span class="field">Issued Date </span>
                    <span class="highlight"> {value.issueDate} </span>
                  </div>
                </div>
                <div class="progress">
                  Progress :{" "}
                  <div class="bar">
                    <div class="fillup-bar"></div>
                  </div>
                </div>
                <div class="buttons">
                  <a href="" class="btn-card btn-dark">
                    Offer Contract
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LoanCards;
