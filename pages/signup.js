import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if username is taken
    const usernameTaken = await checkUsernameTaken(username);
    setIsUsernameTaken(usernameTaken);

    // Check if email is taken
    const emailTaken = await checkEmailTaken(email);
    setIsEmailTaken(emailTaken);

    if (!usernameTaken && !emailTaken) {
      const query = new URLSearchParams({
        username: username,
        email: email,
        password: password,
      }).toString();

      const url = `/verifyotp?${query}`;
      router.push(url);
    }
  };
  const checkUsernameTaken = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:5000/auth/checkUsername?username=${username}`
      );
      const data = await response.json();
      return data.isTaken; // Assuming the response format contains a property 'isTaken'
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const checkEmailTaken = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5000/auth/checkEmail?email=${email}`
      );
      const data = await response.json();
      return data.isTaken; // Assuming the response format contains a property 'isTaken'
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  return (
    <Layout>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="login-image-container">
          {/* Left Container with Image */}
          <img src="/logo.png" alt="Login Image" />
        </div>
        <div className="login-form-container">
          <Card style={{ width: "300px", padding: "20px" }}>
            <Card.Title className="text-center">Sign Up</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {isEmailTaken && (
                  <Form.Text className="text-danger">
                    This email is already taken.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
                {isUsernameTaken && (
                  <Form.Text className="text-danger">
                    This username is already in use.
                  </Form.Text>
                )}
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
                <Button variant="primary" type="submit" block>
                  Sign Up
                </Button>

                {/* Add the signup button using Link */}
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Container>
      <style jsx>
        {`
          .login-image-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .login-form-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .login-image-container img {
            max-width: 100%;
            max-height: 100%;
          }
        `}
      </style>
    </Layout>
  );
}

export default SignInPage;
