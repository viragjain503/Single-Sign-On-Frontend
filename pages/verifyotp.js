import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function VerifyOTPPage() {
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handleResendOTP = () => {
    // Simulated OTP generation and sending logic
    const simulatedOTP = "123456"; // Simulated OTP sent via email
    setMessage(""); // Clear previous message
    setOTP(simulatedOTP); // Simulate OTP sent
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform OTP verification logic here
    // For this example, we'll just simulate a success or failure
    const simulatedOTP = "123456"; // Simulated OTP sent via email

    if (otp === simulatedOTP) {
      setMessage("OTP verified successfully!");
    } else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  return (
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
  );
}

export default VerifyOTPPage;
