import React, { useState, useEffect } from "react";
import BASE_URL from "../Base_url";
import "./profile.css";
import Axios from "axios";
import formatDate from "../../utils/formatDate";

function PaymentPopupReceiver({ lenderDetails, onCancel, onSubmit }) {
  const [amount, setAmount] = useState([]);
  const [minAmount, setMinAmount] = useState(1000);
  const [maxAmount, setMaxAmount] = useState(10000);
  const [installments, setInstallments] = useState(null);
  const [repayAmount, setrepayAmount] = useState(1200);
  const [NextPayDate, setNextPayDate] = useState("01/2/2012");
  const [LeftAmount, setLeftAmount] = useState(1200);
  const [NextInstallmentAmount, setNextInstallmentAmount] = useState(1200);
  const [redirecturl, setredirecturl] = useState(null);

  console.log("Data well received by Pay Pop up: ", lenderDetails);

  /*{
    "total_amount": 2160,
    "bkash": "01961145456",
    "contractId" : "60a2288f788f921b543cd814",
    "paymentType": "receiverToLender",
    "installments": "2"
} */
  const fetchdata = async () => {
    let tempLenderHistory;

    // Get lender history
    await Axios({
      method: "POST",
      data: {
        total_amount: "1500",
        bkash: "01747783158",
        contractId: "8485105",
        paymentType: "receiverToLender",
        installments: installments,
      },
      withCredentials: true,
      url: `${BASE_URL}/api/payment/ssl-transaction`,
    })
      .then((res) => {
        console.log(res.data.redirectedURL);
        //history.push(res.data.redirectedURL);
        setredirecturl(res.data.redirectedURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      onSubmit();
    }
  };

  return (
    <div class="contract-offer-card content-box " id="popup-contract">
      <div class="title-card">
        <h1>Pay Back The Loan</h1>
      </div>
      <div class="contract-form">
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

        <div class="repay-loan-details">
          <div class="amount">
            Repay Loan Amount : <span class="value">{repayAmount}</span> BDT
          </div>
          <div class="date">
            Next Installment Date : <span class="value">{NextPayDate}</span>
          </div>
          <div class="next-amount">
            Next Installment Amount :{" "}
            <span class="value">{NextInstallmentAmount}</span> BDT
          </div>
          <div class="amount">
            Total Amount Left : <span class="value">{LeftAmount}</span> BDT
          </div>
        </div>

        {/* <!-- Buttons --> */}
        <div class="buttons inputs-div">
          <a href="#" class="btn-form btn-light" onClick={onCancel}>
            Cancel
          </a>
          <a href={redirecturl} class="btn-form btn-dark" onClick={fetchdata}>
            Proceed to Pay
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaymentPopupReceiver;
