import React, { useState } from "react";
import "./App.css";

import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./components/login/login";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/signup/signup";
import TestComp from "./components/testComponent/testComponent";
import Home from "./components/home/home";


function App() {
  

  return (
    <div className="App">
      <Router>
      <Route name="login"  path='/login' component={Login} exact  />
      <PrivateRoute name="home" path = '/' component={TestComp} exact 
    />
    <PrivateRoute name="landing" path = '/home' component={Home} exact 
    />
    <Route name="signup"  path='/signup' component={Signup} exact  />
      </Router>
      
    </div>
  );
}

export default App;