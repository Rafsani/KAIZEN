import React from "react";

import "./profile.css";

import { faChevronCircleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatDate from "../../utils/formatDate";

function ReviewCard({ review, showButtons }) {
  return (
    <div class="review-card">
      <div class="review-title">
        <h2>{review.lender}</h2>
        <p>
          <i class="fas fa-star">
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
          </i>
          {review.rating}/5
        </p>
      </div>
      <div class="review-comment">
        <p>{review.details}</p>
      </div>
      <div class="hide-contract " id="hide-contract">
        <div class="hidden-contract">
          <div class="contract-details">
            <div class="amount">
              <span class="field">Total Amount:</span>{" "}
              <span class="value">{review.totalAmount} BDT</span>
            </div>
            <div class="issue-date">
              <span class="field">Issued Date:</span>{" "}
              <span class="value">{formatDate(review.issueDate)}</span>
            </div>
          </div>
          {showButtons && (
            <div class="buttons">
              <a href="#" class="btn btn-dark">
                View Contract
              </a>
            </div>
          )}
        </div>

        <div class="down-arrow">
          <i class="fas fa-chevron-circle-down">
            <FontAwesomeIcon icon={faChevronCircleDown}></FontAwesomeIcon>
          </i>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
