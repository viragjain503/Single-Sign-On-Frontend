"use client"

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BasicExample from './Form';

function ClientDetails() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Container className="d-flex align-items-center justify-content-center">
        <Row>
          <Col xs={{ order: 12 }}>
            <BasicExample/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ClientDetails;
