import React, { useState, useEffect } from "react";

import "./profile.css";

import formatDate from "../../utils/formatDate";

function OfferContractForm({ interestRate, onCancel, onSubmit }) {
  const [amount, setAmount] = useState([]);
  const [minAmount, setMinAmount] = useState(1000);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [installments, setInstallments] = useState(null);

  const handleAmountChange = (event) => {
    console.log(event.target.name, event.target.value);
    setAmount(event.target.value);
  };

  const handleInstallmentsChange = (event) => {
    console.log(event.target.name, event.target.value);
    setInstallments(event.target.value);
  };

  const handleSubmit = () => {
    if (
      amount &&
      amount >= minAmount &&
      amount <= maxAmount &&
      installments &&
      installments >= 1 &&
      installments <= 3
    ) {
      const value = {
        amount: amount,
        installments: installments,
      };
      onSubmit(value);
    }
  };

  return (
    <div class="contract-offer-card content-box " id="popup-contract">
      <div class="title-card">
        <h1>Contract Offer</h1>
      </div>
      <div class="contract-form">
        {/* <!-- Amount --> */}
        <div class="small-input-field inputs-div">
          <aside>
            <h3>Loan Amount</h3>
            <p>
              Between ({minAmount} - {maxAmount} BDT)
            </p>
            <p>
              Interest Rate will be{" "}
              <span class="value" style={{ color: "red" }}>
                5%
              </span>
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
            <span> BDT</span>
          </div>
        </div>
        {/* <!-- <div class="small-input-field inputs-div">
                <aside>
                    <h3>Interest Rate</h3>
                    <p>Between <span class="interest-min">5%</span> to <span class="interest-max">8%</soan></p>
                </aside>
                <div class="input-field">
                    <input type="number" class="small-input" max="8" min="5" required>
                    <span> %</span>
                </div>
            </div> --> */}

        <div class="inputs-div">
          <aside>
            <h3>Installments</h3>
          </aside>
          <div class="radio-field">
            <input
              type="radio"
              id="one"
              name="option"
              value="1"
              checked={installments === "1"}
              onChange={handleInstallmentsChange}
            />
            <label for="one">1</label>
            <input
              type="radio"
              id="two"
              name="option"
              value="2"
              checked={installments === "2"}
              onChange={handleInstallmentsChange}
            />
            <label for="two">2</label>
            <input
              type="radio"
              id="three"
              name="option"
              value="3"
              checked={installments === "3"}
              onChange={handleInstallmentsChange}
            />
            <label for="three">3</label>
          </div>
        </div>

        {/* <!-- Buttons --> */}
        <div class="buttons inputs-div">
          <a href="#" class="btn-form btn-light" onClick={onCancel}>
            Cancel
          </a>
          <a href="#" class="btn-form btn-dark" onClick={handleSubmit}>
            Post
          </a>
        </div>
      </div>
    </div>
  );
}

export default OfferContractForm;
