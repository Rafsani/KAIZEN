import React, { useState } from "react";
import "./App.css";

import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/login/login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/signup/signup";
import TestComp from "./components/testComponent/testComponent";
import Home from "./components/home/home";
import Loanrequest from "./components/loanRequest/loanrequest";
import HomePage from "./components/home/home1";
import Registration from "./components/registration/registration";


function App() {

  return (
    <div className="App">
      <Router>
      <Route name="login"  path='/login' component={Login} exact  />
      <PrivateRoute name="home" path = '/home' component={TestComp} exact />
      <PrivateRoute name="landing" path = '/' component={HomePage} exact />
      <PrivateRoute name="landing" path = '/request/:id' component={Loanrequest} exact />
      <Route name="signup"  path='/signup' component={Signup} exact  />
      <PrivateRoute name="reg" path = '/registration' component={Registration} exact />
      </Router>
      
    </div>
  );
}

export default App;