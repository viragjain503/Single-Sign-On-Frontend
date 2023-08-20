import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { FaUserCircle } from 'react-icons/fa'; // Import the icon for the round profile button
import { useRouter } from "next/router";

function NavScrollExample() {

  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.clear();
    router.push("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
    <Container fluid>
      <Navbar.Brand href="#">Only Login</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          <Nav.Link href="/clients">Clients</Nav.Link>
          <Nav.Link href="/clientdetails">Add Client</Nav.Link>
          {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#" disabled>
            Link
          </Nav.Link> */}
        </Nav>
        <div className="d-flex align-items-center">
          {/* Round Profile Button with Dropdown */}
          <NavDropdown
            align="end"
            title={<FaUserCircle size={24} />}
            id="profile-dropdown"
          >
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavScrollExample;
