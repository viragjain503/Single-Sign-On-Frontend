import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function ClientCard({ data }) {
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
                className="mb-3"
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
            </Form>
          </Card.Body>
        </Card>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ClientCard;
