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
  const [repayAmount, setrepayAmount] = useState(null);
  const [NextPayDate, setNextPayDate] = useState("01/2/2012");
  const [LeftAmount, setLeftAmount] = useState(null);
  const [NextInstallmentAmount, setNextInstallmentAmount] = useState(null);
  const [redirecturl, setredirecturl] = useState(null);

  console.log("Data well received by Pay Pop up: ", lenderDetails);

  /*{
    "total_amount": 2160,
    "bkash": "01961145456",
    "contractId" : "60a2288f788f921b543cd814",
    "paymentType": "receiverToLender",
    "installments": "2"
} */

/**lender details
 * {contractId: "60a2288f788f921b543cd814", lenderId: "6076cfa408541e2ba057e337", lenderName: "Akid", lenderImage: {…}, totalAmount: 3000, …}
collectedAmount: 0
contractId: "60a2288f788f921b543cd814"
installmentAmount: 1000
installments: 3
installmentsCompleted: 0
interestRate: 8
lenderId: "6076cfa408541e2ba057e337"
lenderImage: {path: "../client/public/uploads/user.png", contentType: "image/jpeg"}
lenderName: "Akid"
myDefaults: 0
nextInstallmentDate: "2021-08-26T22:08:42.035Z"
totalAmount: 3000
 * 
 */






useEffect(() => {
    setrepayAmount(lenderDetails.installmentAmount);
    setNextPayDate(formatDate(lenderDetails.nextInstallmentDate));
    setInstallments(1);
    setNextInstallmentAmount(lenderDetails.installmentAmount);
    setLeftAmount(lenderDetails.totalAmount - lenderDetails.collectedAmount);
  }, []);


  const fetchdata = async () => {
    let tempLenderHistory;

    // send payment request 
    await Axios({
      method: "POST",
      data: {
        total_amount: repayAmount,
        bkash: "01747783158",
        contractId: lenderDetails.contractId,
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
    console.log(event.target.value);
    setInstallments(event.target.value);
    setInstallments(event.target.value);
    console.log("installments=" + installments);
    setrepayAmount(lenderDetails.installmentAmount * event.target.value);
    setLeftAmount(lenderDetails.totalAmount + lenderDetails.totalAmount*lenderDetails.interestRate/100 - lenderDetails.installmentAmount * event.target.value - lenderDetails.collectedAmount);
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
          <div class="radio-field" onChange={handleInstallmentsChange}>
            <input
              type="radio"
              id="one"
              name="option"
              value="1"
              checked={installments === "1"}
              
            />
            <label for="one">1</label>
            <input
              type="radio"
              id="two"
              name="option"
              value="2"
              checked={installments === "2"}
              //nChange={handleInstallmentsChange}
              disabled={lenderDetails.installmentsCompleted >= 2 || lenderDetails.installments < 2}
            />
            <label for="two">2</label>
            <input
              type="radio"
              id="three"
              name="option"
              value="3"
              checked={installments === "3"}
              //onChange={handleInstallmentsChange}
              disabled={lenderDetails.installmentsCompleted >= 1 || lenderDetails.installments < 3}
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
