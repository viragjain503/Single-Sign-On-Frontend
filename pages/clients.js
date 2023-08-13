import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClientCard from '@/components/ClientCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function ClientPage() {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("your-api-endpoint");
        if (response.ok) {
          const data = await response.json();
          setClientData(data);
        } else {
          console.error("Server request failed");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className='p-4'>
      <Row>
        <Col><ClientCard data={clientData} /></Col>
      </Row>
    </Container>
  );
}

export default ClientPage;
