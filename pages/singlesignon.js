import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import SSOLayout from "@/components/SSOLayout";
import Cookies from 'js-cookie';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState(null); // Use state to store clientId
  const [loginStatus, setLoginStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const clientIdParam = params.get("clientId");
    setClientId(clientIdParam); // Set the clientId state
  }, []); // Empty dependency array ensures the effect runs once after initial render

  // Check if clientId exists; if not, show a message or redirect
  if (!clientId) {
    return (
      <>
        <SSOLayout>
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
          <Card style={{ width: "300px", padding: "20px" }}>
            <Card.Title className="text-center">No client provided</Card.Title>
          </Card>
        </Container>
        </SSOLayout>
      </>
    );
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // You can perform your authentication logic here
    try {
        // Make an HTTP POST request to your authentication endpoint
        const response = await fetch('http://localhost:5000/jwttoken/signdetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
            clientId: clientId
          }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          // Authentication successful, you can handle success here
          setLoginStatus('success');
          console.log('Authentication successful');

          // Storing data in sessionStorage
          Cookies.set('jwtToken', data.token, { expires: 1 }); // Expires in 1 day
          Cookies.set('permissions', data.permissions, { expires: 1 });
          Cookies.set('username', data.username, { expires: 1 });          

          // Redirect
          window.location.href = data.redirectPage;
        } else {
          // Authentication failed, you can handle error here
          setLoginStatus('error');
          console.log('Authentication failed');
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('An error occurred:', error);
        setLoginStatus('error');
      }

  };
  return (
    <SSOLayout>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "300px", padding: "20px" }}>
        <Card.Title className="text-center">Single Sign On</Card.Title>
        {loginStatus === 'error' && (
            <div className="text-center text-danger mb-3">
            Incorrect credentials. Please try again.
            </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
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

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
    </SSOLayout>
  );
}

export default LoginForm;
