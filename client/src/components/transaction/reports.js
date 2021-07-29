import React, { useEffect, useState } from "react";
import Axios from "axios";


import { faKickstarterK } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown, faStar } from "@fortawesome/free-solid-svg-icons";

import BASE_URL from "../Base_url";

import formatDate from "../../utils/formatDate";
import { useHistory } from "react-router-dom";
import AppNavBar from "../navbar/navbar";
//import "./adminReports.css";

function Reports() {
  const [reports, setReports] = useState([]);
  const [userId,setuserId] = useState();
  let pageHistory = useHistory();

  const fetchData = async () => {
    let tempReports;
    let tempIsAdmin;

    let tempUserId;
    await Axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:5000/api/auth/isloggedin",
      })
        .then((res) => {
          tempUserId = res.data.data.data;
          console.log("tempUserId: ", tempUserId);
          setuserId(tempUserId);
        })
        .catch((error) => {
          console.log(error);
          setuserId(null);
        });


        if( tempUserId){

    await Axios({
      method: "GET",
      withCredentials: true,
      url: `${BASE_URL}/api/user/${tempUserId}/report`,
    })
      .then((res) => {
        tempReports = res.data.data;
        console.log("Admin reports: ", res.data.data);
        console.log("userID " + userId);
        setReports(tempReports);
      })
      .catch((error) => {
        console.log(error);
        console.log("userID " + userId);
        setReports(null);
      });
  }
};

  useEffect(() => {
    fetchData();
  }, []);



//   const showTransactions = (transactions) => {
//     return (
//       transactions &&
//       transactions.map((transaction, index) => {
//         console.log("Transaction #" + index + ": ", transaction);

//         return (
//           <div class="transaction-card">
//             <h2>
//               Transaction Statement #
//               <span class="statement"> {index + 1} </span>
//             </h2>
//             <div class="details">
//               <div class="type">
//                 {" "}
//                 {transaction.type === "lenderToReceiver"
//                   ? "Lender Paid Receiver"
//                   : "Receiver Paid Lender"}{" "}
//               </div>
//               <div class="issue-date">
//                 {" "}
//                 {formatDate(transaction.issueDate)}{" "}
//               </div>
//               <div class="bkash">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   height="25"
//                   width="20"
//                   viewBox="-6.6741 -11.07275 57.8422 66.4365"
//                 >
//                   <g fill="none">
//                     <path
//                       fill="#DF146E"
//                       d="M42.31 44.291H2.182C.981 44.291 0 43.308 0 42.107V2.186C0 .982.981 0 2.182 0H42.31c1.203 0 2.184.982 2.184 2.186v39.921c0 1.201-.981 2.184-2.184 2.184"
//                     />
//                     <path
//                       fill="#FFF"
//                       d="M31.894 24.251l-14.107-2.246 1.909 8.329zm.572-.682L21.374 8.16l-3.623 13.106zm-15.402-2.482L5.441 6.239l15.221 1.819zm-5.639-6.154l-6.449-6.08h1.695zm24.504 1.15L33.2 23.486l-4.426-6.118zM21.417 30.232l10.71-4.3.454-1.365zm-8.933 7.821l4.589-16.102 2.326 10.479zm24.099-21.914l-1.128 3.056 4.059-.07z"
//                     />
//                   </g>
//                 </svg>
//                 <div class="number"> {transaction.bkash} </div>
//               </div>
//               {index > 0 && (
//                 <div class="installment">
//                   Installment: <span class="value"> {index} </span>
//                 </div>
//               )}
//               <div class="transaction-id">
//                 Transaction Id: {transaction.bankTransactionId}
//               </div>
//               <div class="amount">Amount : {transaction.amount} BDT</div>
//             </div>
//           </div>
//         );
//       })
//     );
//   };

  const showReports = () => {
    return (
      <div class="registration">
        <div class="title-card" style={{textAlign: "center"}}>
          <h1>Reported Grievances</h1>
          <p style={{width: "100%"}}>
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
                    Report ID <span class="value">#{report._id}</span>
                  </div>
                  {report.status === "pending" && (
                    <div class="lender ">pending</div>
                  )}
                  {report.status === "ignore" &&  (
                    <div class="receiver" style= {{ color: "#736f6f" }}>ignored</div>
                  )}
                  {report.status === "resolved" &&  (
                    <div class="receiver">Resolved</div>
                  )}
                </h1>

                <div class="report-details">
                  <div class="issuer-name">
                    Full Name : <span class="value">{report.issuerId.username}</span>
                  </div>
                  <div class="issuer-name">
                    Complaint Against :{" "}
                    {report.issuerId._id === report.contractId.lenderId._id ? ( <span class="value">{report.contractId.receiverId.username} </span>) : ( <span class="value">{report.contractId.lenderId.username} </span>)    }
                    
                  </div>
                  <div class="description">
                    Description: <span class="value">{report.description}</span>
                  </div>
                  <div class="issue-date">
                    Issued Date:{" "}
                    <span class="value"> {formatDate(report.issuedDate)} </span>
                  </div>
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
        <AppNavBar />
      </div>
      <div style={{paddingTop: "80px"}}>

      </div>
      {showReports()}
    </div>
  );
}

export default Reports;
