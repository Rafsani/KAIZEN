import React, { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/signup/signup";
import TestComp from "./components/testComponent/testComponent";
import Home from "./components/home/home";
import Loanrequest from "./components/loanRequest/loanrequest";
import HomePage from "./components/home/home1";
import Registration from "./components/registration/registration";
import Profile from "./components/profile/profile";
import LenderViewsReceiver from "./components/profile/LenderViewsReceiver";
import ReceiverViewsLender from "./components/profile/receiverViewsLender";
import LenderViewsLender from "./components/profile/lenderViewsLender";
import CoolLoginPage from "./components/coolSignUp/coolLoginPage";
import Transaction from "./components/transaction/transaction";
import Search from "./components/search/search";
import AdminReports from "./components/admin/adminReports";
import AdminVerifications from "./components/admin/adminVerifications";

function App() {
  return (
    <div className="App">
      <Router>
        <Route name="Log In" path="/login" component={CoolLoginPage} exact />
        <Route name="Sign Up" path="/signup" component={CoolLoginPage} exact />

        <Route name="home" path="/home" component={TestComp} exact />
        <PrivateRoute name="landing" path="/" component={HomePage} exact />
        <PrivateRoute
          name="landing"
          path="/request/:id"
          component={Loanrequest}
          exact
        />

        <PrivateRoute
          name="search"
          path="/search/:id"
          component={Search}
          exact
        />

        <PrivateRoute
          name="admin-reports"
          path="/admin/reports"
          component={AdminReports}
          exact
        />
        <PrivateRoute
          name="admin-verifications"
          path="/admin/verifications"
          component={AdminVerifications}
          exact
        />

        <PrivateRoute
          name="profile"
          path="/profile"
          component={Profile}
          exact
        />
        <PrivateRoute
          name="lenderViewsLender"
          path="/lenderViewsLender"
          component={LenderViewsLender}
          exact
        />
        <PrivateRoute
          name="lenderViewsReceiver"
          path="/lenderViewsReceiver"
          component={LenderViewsReceiver}
          exact
        />
        <PrivateRoute
          name="receiverViewsLender"
          path="/receiverViewsLender"
          component={ReceiverViewsLender}
          exact
        />

        <PrivateRoute
          name="reg"
          path="/registration"
          component={Registration}
          exact
        />
        <PrivateRoute
          name="transaction"
          path="/transactions"
          component={Transaction}
          exact
        />
      </Router>
    </div>
  );
}

export default App;
