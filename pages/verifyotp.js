import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from 'next/router';
import Layout from "@/components/Layout";

function VerifyOTPPage() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [otpFromServer, setOtpFromServer] = useState("");

  const router = useRouter();

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleResendOTP = () => {
    // Simulated OTP generation and sending logic
    const simulatedOTP = "123456"; // Simulated OTP sent via email
    setMessage(""); // Clear previous message
    setOTP(simulatedOTP); // Simulate OTP sent
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("OTP from server: " + otpFromServer)
    console.log("OTP : " + otp)
    if (parseInt(otp) == parseInt(otpFromServer)) {
      try {
        // Make a fetch call or perform any other necessary action
        const response = await fetch("http://localhost:5000/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, username, password }) // Send email and otp in the request body
        });

        if (response.ok) {
          // Perform successful action, e.g., route to a success page
          const data = await response.json();
          localStorage.setItem("jwtToken",data.token);
          localStorage.setItem('Email',email) ;
          router.push("/clientdetails");
        } else {
          console.error("Failed to verify OTP:", response.statusText);
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };
  
  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const queryEmail = queryParams.get("email");
    const queryUsername = queryParams.get("username");
    const queryPassword = queryParams.get("password");

    if (queryEmail && queryUsername && queryPassword) {
      setEmail(queryEmail);
      setUsername(queryUsername);
      setPassword(queryPassword);
    }

    // Make a GET call to the server on component load
    fetch(`http://localhost:5000/verifyotp?email=${queryEmail}`)
      .then(response => response.json())
      .then(data => setOtpFromServer(data.otp)); // Set OTP from server response
  }, []);

  return (
    <Layout>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "300px", padding: "20px" }}>
        <Card.Title className="text-center">Verify OTP</Card.Title>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Enter OTP:</label>
            <input
              type="text"
              className="form-control"
              value={otp}
              onChange={handleOTPChange}
              required
              maxLength="6" // Allow only 6 characters
              pattern="[0-9]{6}" // Allow only numbers
            />
          </div>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Verify OTP
            </Button>
            <Button variant="secondary" onClick={handleResendOTP}>
              Resend OTP
            </Button>
          </div>
        </form>
        <p className="text-center mt-3">{message}</p>
      </Card>
    </Container>
    </Layout>
  );
}

export default VerifyOTPPage;
