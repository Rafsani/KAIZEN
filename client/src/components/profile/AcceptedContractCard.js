import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Base_url from "../Base_url";
import "./profile.css";
import { useHistory } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import fetchImage from "../../utils/fetchImage";

function AcceptedCOntractsCard({
  contractDetails,
  userId,
  targetId,
  viewAsLender,
  viewButtons,
  loanSanctioned,
}) {
  let history = useHistory();
  const [redirecturl, setredirecturl] = useState(null);
  const fetchdata = async () => {
    let tempLenderHistory;

    if (userId) {
      // Get lender history
      await Axios({
        method: "POST",
        data: {
          total_amount: contractDetails.amount,
          bkash: "01747783158",
          contractId: contractDetails.contractId,
          paymentType: "lenderToReceiver",
        },
        withCredentials: true,
        url: `${Base_url}/api/payment/ssl-transaction`,
      })
        .then((res) => {
          console.log(res.data.redirectedURL);
          //history.push(res.data.redirectedURL);
          setredirecturl(res.data.redirectedURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (loanSanctioned === true) return <> </>;

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
                <span class="field">Amount:</span>{" "}
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
            <div class="buttons " onClick={fetchdata}>
              <a href={redirecturl} class="small-btn-profile btn-dark">
                proceed To Payment
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AcceptedCOntractsCard;
