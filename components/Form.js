import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

function EnhancedExample() {
  const [clientId, setClientId] = useState("-----------");
  const [clientSecret, setClientSecret] = useState("");
  const [validClientSecret, setValidClientSecret] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const generateClientId = () => {
    const randomString = Math.random().toString(36).substring(2, 10);
    setClientId(`${randomString}@ClientId`);
  };

  const handleClientSecretChange = (event) => {
    const newClientSecret = event.target.value;
    setClientSecret(newClientSecret);

    if (newClientSecret.length >= 8 &&
        /^[a-zA-Z0-9@#$!-]+$/.test(newClientSecret) &&
        /[!@#$]/.test(newClientSecret)) {
      setValidClientSecret(true);
      setIsFormValid(true);
    } else {
      setValidClientSecret(false);
      setIsFormValid(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Prepare the data to send to the server
    const formData = {
      clientId: clientId,
      clientSecret: clientSecret,
    };

    try {
      const response = await fetch("http://localhost:5000/clients/submitclient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        window.location.href = "/clients"; // Navigate to /clients on success
      } else {
        // Handle error response
        window.location.href = "/clients";
        console.error("Server request failed");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    generateClientId();
  }, []);

  return (
    <Form className="p-4 bg-light rounded"  onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="4">
          Client Id
        </Form.Label>
        <Col sm="8" className="p-2" >
            {clientId}
            <InputGroup>
                <Button variant="outline-secondary" onClick={generateClientId}>
                <i className="bi bi-arrow-clockwise">Generate Client ID</i>
                </Button>
          </InputGroup>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="4">
          Client Secret
        </Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            placeholder="Enter your client secret"
            value={clientSecret}
            onChange={handleClientSecretChange}
            isInvalid={!validClientSecret}
          />
          <Form.Control.Feedback type="invalid">
            Client secret must be at least 8 characters long and must contain alphanumeric and special characters.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <div className="text-center">
        <Button variant="primary" type="submit" disabled={!isFormValid}> 
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default EnhancedExample;
