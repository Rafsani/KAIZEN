import React, { useState, useEffect } from "react";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./profile.css";

import formatDate from "../../utils/formatDate";
import AppNavBar from "../navbar/navbar";
import BasicInfo from "./basicInfo";
import CurrentlyLendingCard from "./currentlyLendingCard";
import LoadingScreen from "../loadingScreen/loadingScreen";
import { useHistory } from "react-router-dom";

function LenderViewsLender(props) {
  const [lenderId, setLenderId] = useState(null);
  const [lender2Id, setLender2Id] = useState(null);
  const [lender2HiddenData, setLender2HiddenData] = useState(null);
  const [lender2History, setLender2History] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  let pageHistory = useHistory();

  console.log("Props: ", props.location);

  const fetchData = async () => {
    let tempLenderId, tempLender2Id;
    let tempLender2HiddenData;
    let tempLender2History;

    tempLenderId = props && props.location && props.location.lenderId;
    setLenderId(tempLenderId);

    tempLender2Id = props && props.location && props.location.lender2Id;
    setLender2Id(tempLender2Id);

    if (tempLenderId === tempLender2Id) {
      pageHistory.push("/profile");
    }

    if (tempLender2Id) {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/user/${tempLender2Id}`,
      })
        .then((res) => {
          tempLender2HiddenData = res.data.data;
          console.log("Lender2 Hidden Data: ", tempLender2HiddenData);
          setLender2HiddenData(tempLender2HiddenData);
        })
        .catch((error) => {
          console.log(error);
          setLender2HiddenData(null);
        });
    }

    if (tempLender2Id && tempLender2HiddenData) {
      await Axios({
        method: "GET",
        withCredentials: true,
        url: `http://localhost:5000/api/user/${tempLender2Id}/history`,
      })
        .then((res) => {
          tempLender2History = res.data.data;
          console.log("Lender2 History:", tempLender2History);
          setLender2History(tempLender2History);
        })
        .catch((error) => {
          console.log(error);
          setLender2History(null);
        });
    }

    setLoadingData(false);
  };

  console.log("Viewing Lender Id: ", lenderId);
  console.log("Viewed Lender Id: ", lender2Id);
  console.log("Viewed Lender Hidden Data: ", lender2HiddenData);
  console.log("Viewed Lender History: ", lender2History);

  useEffect(() => {
    fetchData();
  }, []);

  const showCurrentlyLending = () => {
    return (
      lender2History &&
      lender2History.currentlyActiveContacts &&
      lender2History.currentlyActiveContacts.length > 0 && (
        <div class="side-scroll-section content-box " id="side-scroll-section">
          <div class="currently-lending " id="currently-lending">
            <h1>
              Currently Lending
              <i
                class="fas fa-flag-checkered "
                data-tooltip="Reached Your Limit For Lenders"
              ></i>
            </h1>
            <div class="user-cards scroller">
              {lender2History.currentlyActiveContacts &&
                lender2History.currentlyActiveContacts.map((contract) => (
                  <CurrentlyLendingCard
                    key={contract.contractId}
                    contractDetails={contract}
                    userId={lenderId}
                    targetId={contract.receiverId}
                    viewAsLender={true}
                    viewButtons={false}
                  />
                ))}
            </div>
          </div>
        </div>
      )
    );
  };

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    <div className="Profile">
      <AppNavBar />
      {lender2HiddenData && (
        <BasicInfo hiddenData={lender2HiddenData} showBkash={false} />
      )}
      {showCurrentlyLending()}

      <div class="footer">
        <p>
          You can find the project link here:
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </p>
        <a href="#">
          <i class="fab fa-github fa-2x"></i>
        </a>
      </div>
    </div>
  );
}

export default LenderViewsLender;
