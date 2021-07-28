import React from 'react';
import { useState , useEffect} from 'react';
import AppNavBar from '../navbar/navbar';
import './transaction.css'
import BASE_URL from '../Base_url';
import Axios from "axios";
import formatDate from "../../utils/formatDate";





function Transaction(props) {
const [transactions,settransactions] = useState([]); 
const [userId, setUserId] = useState([]);

const fetchdata = async () => {
    let tempUserId;
    

    // Get userId
    await Axios({
      method: "GET",
      withCredentials: true,
      url: `${BASE_URL}/api/auth/isloggedin`,
    })
      .then((res) => {
        tempUserId = res.data.data.data;
        console.log("tempUserId: ", tempUserId);
        setUserId(tempUserId);
      })
      .catch((error) => {
        console.log(error);
        setUserId(null);
      });

    if (tempUserId) {
      // Get hiddenData
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `${BASE_URL}/api/user/transaction/${tempUserId}`,
      })
        .then((res) => {
          console.log(res.data);
          settransactions(res.data.data);
          console.log(transactions.length);
        })
        .catch((error) => {
          console.log(error);
          settransactions(null);
        });
    }
    
}


useEffect(() => {
    fetchdata();
  }, []);


    return (
        <div>
            <AppNavBar />
        <div className="main content-box">
            <div className="icon">
                <i className="fab fa-kickstarter-k fa-6x"></i>
            </div>
            <div className="registration">
                <div className="title-card">
                <h1>Transaction History</h1>
                <h3 >Your entire transaction history will show up in this page </h3>
                </div>

                <div className="side-scroll-section content-box">

                {transactions.map((array1) => (
                    <div className="transaction-history" >
                        <h1>
                                <div className="header">Contract ID  <span className="value">{array1[0].contractId}</span></div>
                                <div className="buttons contract-button">
                                    <a href="#!" className="btn-form btn-transparent">View Contract</a>
                                </div>
                        </h1>
                        <div className="user-cards scroller">
                        {array1.map((transaction_data,idx) => (
                            <div className="transaction-card">
                                <h2>Transaction Statement #<span className="statement"> {idx+1}</span></h2>
                                <div className="details">
                                    <div className="type">{transaction_data.type}</div>
                                    <div className="issue-date">{formatDate(transaction_data.issueDate)}</div>
                                    <div className="bkash"><svg xmlns="http://www.w3.org/2000/svg" height="25" width="20" viewBox="-6.6741 -11.07275 57.8422 66.4365"><g fill="none"><path fill="#DF146E" d="M42.31 44.291H2.182C.981 44.291 0 43.308 0 42.107V2.186C0 .982.981 0 2.182 0H42.31c1.203 0 2.184.982 2.184 2.186v39.921c0 1.201-.981 2.184-2.184 2.184"/><path fill="#FFF" d="M31.894 24.251l-14.107-2.246 1.909 8.329zm.572-.682L21.374 8.16l-3.623 13.106zm-15.402-2.482L5.441 6.239l15.221 1.819zm-5.639-6.154l-6.449-6.08h1.695zm24.504 1.15L33.2 23.486l-4.426-6.118zM21.417 30.232l10.71-4.3.454-1.365zm-8.933 7.821l4.589-16.102 2.326 10.479zm24.099-21.914l-1.128 3.056 4.059-.07z"/></g></svg><div className="number">{transaction_data.bkash}</div></div>
                                    <div className="transaction-id">Transaction Id: {transaction_data.bankTransactionId}</div>
                                    <div className="amount">Amount : {transaction_data.amount} BDT</div>
                                </div>
                            </div>
                            
                        ))}
                        </div>
                    </div>

                ))}
                </div>
            </div>
        </div>
    </div>
                
                    
    )
}

export default Transaction;