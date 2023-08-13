import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/login";
import VerifyOTPPage from "../pages/verifyotp";
import Signup from "../pages/signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/verify-otp" component={VerifyOTPPage} />
      </Switch>
    </Router>
  );
}

export default App;
