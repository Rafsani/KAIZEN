import React, { useState, useEffect } from "react";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./profile.css";

import formatDate from "../../utils/formatDate";
import AppNavBar from "../navbar/navbar";
import BasicInfo from "./basicInfo";
import LenderCard from "./lenderCard";
import ContractRequestCard from "./contractRequestCard";
import OfferContractForm from "./OfferContractForm";
import { useRadioGroup } from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import LoadingScreen from "../loadingScreen/loadingScreen";

function LenderViewsLender(props) {
  const [loadingData, setLoadingData] = useState(true);

  console.log("Props: ", props.location);

  if (loadingData) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1>Has not been done yet!</h1>
    </div>
  );
}

export default LenderViewsLender;
