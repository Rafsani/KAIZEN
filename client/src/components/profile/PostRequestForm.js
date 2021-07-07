import React, { useState, useEffect } from "react";

import "./profile.css";

import formatDate from "../../utils/formatDate";

function PostRequestForm({ interestRate, onCancel, onSubmit }) {
  const [amount, setAmount] = useState([]);
  const [reason, setReason] = useState([]);
  const [minAmount, setMinAmount] = useState(1000);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [minReasonLength, setMinReasonLength] = useState(1);

  const handleAmountChange = (event) => {
    console.log(event.target.name, event.target.value);
    setAmount(event.target.value);
  };

  const handleReasonChange = (event) => {
    console.log(event.target.name, event.target.value);
    setReason(event.target.value);
  };

  const handleSubmit = () => {
    if (
      amount &&
      amount >= minAmount &&
      amount <= maxAmount &&
      reason &&
      reason.length >= minReasonLength
    ) {
      const value = {
        Amount: amount,
        Details: reason,
      };
      onSubmit(value);
    }
  };

  return (
    <div class="loan-request-popup " id="loan-request-popup">
      <div class="loan-request-card content-box" id="popup-request">
        <div class="title-card">
          <h1>Post A Loan Request</h1>
        </div>
        <div class="form">
          {/* <!-- Amount --> */}
          <div class="small-input-field inputs-div">
            <aside>
              <h3>Loan Amount</h3>
              <p>
                Between ({minAmount} - {maxAmount} BDT)
              </p>
              <p>
                {" "}
                +<span class="interest">{interestRate}%</span> interest-rate
                applies
              </p>
            </aside>
            <div class="input-field">
              <input
                type="number"
                class="small-input"
                max={maxAmount}
                min={minAmount}
                value={amount}
                onChange={handleAmountChange}
                required
              />
            </div>
          </div>

          {/* <!-- Details of the loan --> */}
          <div class="text-area-input-field inputs-div">
            <aside>
              <h3>Why Do You Need The Loan?</h3>
              <p>Max 140 Characters</p>
            </aside>
            <div class="input-field">
              {/* <!-- <input type="text" class="small-input" max="10000" min="1000" required> --> */}
              <textarea
                class="text-area-input"
                cols="20"
                rows="5"
                maxlength="140"
                minlength="1"
                value={reason}
                onChange={handleReasonChange}
              ></textarea>
            </div>
          </div>

          {/* <!-- Buttons --> */}
          <div class="buttons inputs-div">
            <a href="#!" class="btn-form btn-light" onClick={onCancel}>
              Cancel
            </a>
            <a href="#" class="btn-form btn-dark" onClick={handleSubmit}>
              Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostRequestForm;
