import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'; // Import the Button component

function ClientCard({ data }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch("http://localhost:5000/clients/deleteClient", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "token" : localStorage.getItem("jwtToken")
        },
        body: JSON.stringify({ clientId: data.clientId }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        window.location.reload();
        router.replace('/login');
        console.error("Server request failed");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {data ? (
        <Card style={{ width: "20rem" }}>
          <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card.Title>Your Single Sign on Details</Card.Title>
            <Form>
              <Form.Group
                as={Row}
                className="mb-1"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="5">
                  Client Id :
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={data.clientId}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-1"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="5">
                  Client Secret:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={data.clientSecret}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-1"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="5">
                  Expires In:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={data.expiresIn}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-1"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="5">
                  Permissions:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={data.permissions.join(', ')}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-1"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="5">
                  Redirect Page:
                </Form.Label>
                <Col sm="7">
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue={data.redirectPage}
                  />
                </Col>
              </Form.Group>
            </Form>
             {/* Delete Button */}
             <Button
              variant="danger"
              className="mt-auto"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ClientCard;
