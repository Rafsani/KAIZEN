import React, { useState, useEffect } from "react";
import Axios from "axios";

import "./adminVerifications.css";

import AdminHeader from "./header";
import { useHistory } from "react-router-dom";
import BASE_URL from "../Base_url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

function AdminVerifications() {
  const [users, setUsers] = useState(null);
  let pageHistory = useHistory();

  const fetchData = async () => {
    let tempUsers;
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
      url: `${BASE_URL}/api/admin/verify`,
    })
      .then((res) => {
        tempUsers = res.data.data;
        console.log("Unverified users:", tempUsers);
        setUsers(tempUsers);
      })
      .catch((error) => {
        console.log(error);
        setUsers(null);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyUser = async (userId) => {
    if (!userId) return;

    await Axios({
      method: "PUT",
      withCredentials: true,
      url: `${BASE_URL}/api/admin/${userId}?update=verify`,
    })
      .then((res) => {
        console.log("Admin Verify PUT Response: ", res);
      })
      .catch((error) => {
        console.log(error);
      });

    window.location.reload();
  };

  const showUser = (user) => {
    return (
      <div class="transaction-history">
        <h1>
          <div class="header-contract">
            User ID <span class="value"># {user.userId} </span>
          </div>
          {user.userType === "Lender" && <div class="lender ">Lender</div>}
          {user.userType === "Receiver" && <div class="receiver">Receiver</div>}
        </h1>

        <div class="report-details">
          <div class="issuer-name">
            Full Name : <span class="value"> {user.fullName} </span>
          </div>
          <div class="issuer-name">
            Email : <span class="value"> {user.email} </span> {/* ToDo */}
          </div>
          <div class="description">
            Details:{" "}
            <span class="value">
              {" "}
              {user.details ? user.details : "I am a good boi"}{" "}
            </span>{" "}
            {/* ToDo */}
          </div>
          <div class="issue-date">
            Bkash <span class="value">{user.bkash}</span>
          </div>
        </div>

        <div class="hide-transaction">
          <div class="down-arrow">
            <i class="fas fa-chevron-circle-down">
              <FontAwesomeIcon icon={faChevronCircleDown}></FontAwesomeIcon>
            </i>
          </div>

          <div class="video">
            <iframe src={user.collateral}></iframe>
          </div>
        </div>

        <div class="buttons admin-buttons">
          <a
            href="#"
            class="btn-profile btn-transparent"
            onClick={() => handleVerifyUser(user.userId)}
          >
            Verify User
          </a>
          {/* <!-- <a href="#" class="btn-profile btn-transparent">Ignore Issue</a> --> */}
        </div>
      </div>
    );
  };

  const showUsers = () => {
    return (
      <div class="registration">
        <div class="title-card">
          <h1>Verify Users</h1>
          <p>
            Here is a compilation of the users who have provided collateral.
            Verify the users whose collateral you see fit.{" "}
          </p>
        </div>

        {users &&
          users.map((user) => {
            return showUser(user);
          })}
      </div>
    );
  };

  return (
    <div className="AdminVerifications">
      <div class="main content-box">
        <AdminHeader />
        {showUsers()}
      </div>
    </div>
  );
}

export default AdminVerifications;
