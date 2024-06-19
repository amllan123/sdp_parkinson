import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const NavBar = () => {
  
  return (
    <Navbar bg="light" data-bs-theme="light" expand="lg" fixed="top">
      <Container fluid>
      <Navbar.Brand href="#home">Early PD Detector</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#main-content">Test for Parkinson's</Nav.Link>
          {/* <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#dataset">Dataset</Nav.Link>
          <Nav.Link href="#team">Team</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;