import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Identifier (email/username):", identifier);
    console.log("Password:", password);

    try {
      // Make a fetch call or perform any other necessary action
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ identifier, password }) // Send email and otp in the request body
      });
      const data = await response.json();

      if(data.isValid){
        localStorage.setItem('jwtToken',data.token)
        localStorage.setItem('Email',identifier) 
        router.push("/clients");
      }else{
        setMessage("Incorrect credentials")
      }

    } catch (error) {
      console.error("Error while logging in:", error);
    }

    // You can add authentication logic here
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "300px", padding: "20px" }}>
        <Card.Title className="text-center">Login</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicIdentifier">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or username"
              value={identifier}
              onChange={handleIdentifierChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">
              Login
            </Button>

            {/* Add the signup button using Link */}
            <Button
              variant="secondary"
              type="button"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </div>
          <p className="text-center mt-3">{message}</p>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
