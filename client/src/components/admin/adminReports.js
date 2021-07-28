import React, { useEffect, useState } from "react";
import Axios from "axios";

import "./adminReports.css";
import { faKickstarterK } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown, faStar } from "@fortawesome/free-solid-svg-icons";

import BASE_URL from "../Base_url";
import AdminHeader from "./header";
import formatDate from "../../utils/formatDate";
import { useHistory } from "react-router-dom";

function AdminReports() {
  const [reports, setReports] = useState([]);
  let pageHistory = useHistory();

  const fetchData = async () => {
    let tempReports;
    let tempIsAdmin;

    await Axios({
      method: "GET",
      withCredentials: true,
      url: `${BASE_URL}/api/auth/isloggedin`,
    })
      .then((res) => {
        console.log("Is logged in response: ", res);
        tempIsAdmin = res.data.isAdmin;
        if (!tempIsAdmin) {
          pageHistory.push("/");
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    await Axios({
      method: "GET",
      withCredentials: true,
      url: `${BASE_URL}/api/admin/report`,
    })
      .then((res) => {
        tempReports = res.data.data;
        console.log("Admin reports: ", tempReports);
        setReports(tempReports);
      })
      .catch((error) => {
        console.log(error);
        setReports(null);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEndContract = async (contractId) => {
    await Axios({
      method: "PUT",
      withCredentials: true,
      data: {
        contractId: contractId,
      },
      url: `${BASE_URL}/api/admin/contract`,
    })
      .then((res) => {
        console.log("Admin End Contract PUT Response: ", res);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };

  const handleRemoveCollateral = async (complaintAgainstId, contractId) => {
    if (!complaintAgainstId) return;

    await Axios({
      method: "PUT",
      withCredentials: true,
      url: `${BASE_URL}/api/admin/${complaintAgainstId}?update=collateral`,
      data: {
        contractId: contractId,
      },
    })
      .then((res) => {
        console.log("Admin Remove Collateral PUT Response: ", res);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };

  const handleIgnoreIssue = async (contractId) => {
    await Axios({
      method: "PUT",
      withCredentials: true,
      data: {
        reportId: contractId,
      },
      url: `${BASE_URL}/api/admin/report?type=ignore`,
    })
      .then((res) => {
        console.log("Admin Ignore Issue PUT Response: ", res);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };

  const showTransactions = (transactions) => {
    return (
      transactions &&
      transactions.map((transaction, index) => {
        console.log("Transaction #" + index + ": ", transaction);

        return (
          <div class="transaction-card">
            <h2>
              Transaction Statement #
              <span class="statement"> {index + 1} </span>
            </h2>
            <div class="details">
              <div class="type">
                {" "}
                {transaction.type === "lenderToReceiver"
                  ? "Lender Paid Receiver"
                  : "Receiver Paid Lender"}{" "}
              </div>
              <div class="issue-date">
                {" "}
                {formatDate(transaction.issueDate)}{" "}
              </div>
              <div class="bkash">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25"
                  width="20"
                  viewBox="-6.6741 -11.07275 57.8422 66.4365"
                >
                  <g fill="none">
                    <path
                      fill="#DF146E"
                      d="M42.31 44.291H2.182C.981 44.291 0 43.308 0 42.107V2.186C0 .982.981 0 2.182 0H42.31c1.203 0 2.184.982 2.184 2.186v39.921c0 1.201-.981 2.184-2.184 2.184"
                    />
                    <path
                      fill="#FFF"
                      d="M31.894 24.251l-14.107-2.246 1.909 8.329zm.572-.682L21.374 8.16l-3.623 13.106zm-15.402-2.482L5.441 6.239l15.221 1.819zm-5.639-6.154l-6.449-6.08h1.695zm24.504 1.15L33.2 23.486l-4.426-6.118zM21.417 30.232l10.71-4.3.454-1.365zm-8.933 7.821l4.589-16.102 2.326 10.479zm24.099-21.914l-1.128 3.056 4.059-.07z"
                    />
                  </g>
                </svg>
                <div class="number"> {transaction.bkash} </div>
              </div>
              {index > 0 && (
                <div class="installment">
                  Installment: <span class="value"> {index} </span>
                </div>
              )}
              <div class="transaction-id">
                Transaction Id: {transaction.bankTransactionId}
              </div>
              <div class="amount">Amount : {transaction.amount} BDT</div>
            </div>
          </div>
        );
      })
    );
  };

  const showReports = () => {
    return (
      <div class="registration">
        <div class="title-card">
          <h1>Reported Grievances</h1>
          <p>
            Here is a compilation of the users grievances. The grievances are
            sorted by time.{" "}
          </p>
        </div>
        {reports &&
          reports.map((report) => {
            return (
              <div class="transaction-history">
                <h1>
                  <div class="header-contract">
                    Contract ID <span class="value">#{report.contractId}</span>
                  </div>
                  {report.userType === "Lender" && (
                    <div class="lender ">Lender</div>
                  )}
                  {report.userType === "Receiver" && (
                    <div class="receiver">Receiver</div>
                  )}
                </h1>

                <div class="report-details">
                  <div class="issuer-name">
                    Full Name : <span class="value">{report.fullName}</span>
                  </div>
                  <div class="issuer-name">
                    Complaint Against :{" "}
                    <span class="value">{report.complaintAgainst}</span>
                  </div>
                  <div class="description">
                    Description: <span class="value">{report.description}</span>
                  </div>
                  <div class="issue-date">
                    Issued Date:{" "}
                    <span class="value"> {formatDate(report.issuedDate)} </span>
                  </div>
                </div>

                <div class="contract-details">
                  <div class="contract-data">
                    <div class="item">
                      <div class="total">
                        <span class="field">Total Amount:</span>{" "}
                        <span class="value"> {report.totalAmount} BDT </span>
                      </div>
                      <div class="collected">
                        <span class="field">Collected Amount:</span>{" "}
                        <span class="value">
                          {" "}
                          {Math.round(report.collectedAmount)} BDT
                        </span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="next-installment">
                        <span class="field">Next Installment:</span>{" "}
                        <span class="value">
                          {" "}
                          {formatDate(report.nextInstallment)}{" "}
                        </span>
                      </div>
                      <div class="amount">
                        <span class="field">Installment Amount: </span>{" "}
                        <span class="value">
                          {" "}
                          {Math.round(report.installmentAmount)} BDT
                        </span>
                      </div>
                    </div>
                    <div class="item">
                      <div class="installment-values">
                        <div class="centering">
                          <span class="field">Installments Completed: </span>{" "}
                          <span class="value">
                            {" "}
                            {report.installmentsCompleted}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="item">
                      <div class="interest-rate">
                        <span class="field">Interest Rate:</span>{" "}
                        <span class="value"> {report.interestRate}% </span>
                      </div>
                      <div class="default">
                        <span class="field">Defaulted Installments: </span>{" "}
                        <span class="value">
                          {" "}
                          {report.defaultedInstallment} times
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="hide-transaction">
                  <div class="down-arrow">
                    <i class="fas fa-chevron-circle-down">
                      <FontAwesomeIcon
                        icon={faChevronCircleDown}
                      ></FontAwesomeIcon>
                    </i>
                  </div>

                  <div class="user-cards scroller">
                    {showTransactions(report.transactions)}
                  </div>
                </div>

                <div class="buttons admin-buttons">
                  <a
                    href="#"
                    class="btn-profile btn-transparent"
                    onClick={() => handleEndContract(report.contractId)}
                  >
                    End Contract
                  </a>
                  <a
                    href="#"
                    class="btn-profile btn-transparent"
                    onClick={() =>
                      handleRemoveCollateral(
                        report.complaintAgainstId,
                        report.contractId
                      )
                    }
                  >
                    Remove Collateral
                  </a>
                  <a
                    href="#"
                    class="btn-profile btn-transparent"
                    onClick={() => handleIgnoreIssue(report.reportId)}
                  >
                    Ignore Issue
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    );
  };
  return (
    <div className="AdminReports">
      <div class="main content-box">
        <AdminHeader />
      </div>
      {showReports()}
    </div>
  );
}

export default AdminReports;
