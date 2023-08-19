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
        const response = await fetch("http://localhost:5000/clients/getClient");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
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
    
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <Container className='p-4'>
        <Row>
          <Col><ClientCard data={clientData} /></Col>
        </Row>
      </Container>
    </div>
    
  );
}

export default ClientPage;
