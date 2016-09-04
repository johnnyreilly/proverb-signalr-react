import React from "react";
import { Link } from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";

const navbarInstance = (
  <Navbar bsStyle="inverse">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><span class="brand-title">Proverb</span></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default navbarInstance;