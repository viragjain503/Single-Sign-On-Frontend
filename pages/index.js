import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../pages/login";
import VerifyOTPPage from "../pages/verifyotp";
import Signup from "../pages/signup";

function App() {
  return (
    <>
      <Login/>
    </>
  );
}

export default App;
