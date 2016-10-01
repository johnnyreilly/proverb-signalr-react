import * as React from "react";
import { Link, PlainRoute } from "react-router";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
  path: string;
  routes: PlainRoute[];
}

const TopNav = ({ path, routes }: Props) => {
  return (<Navbar bsStyle="inverse">
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><span className="brand-title">Proverb</span></Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav activeHref={ path }>
        <LinkContainer to="/sayings">
          <NavItem eventKey={1}>Sayings</NavItem>
        </LinkContainer>
        <LinkContainer to="/sages">
          <NavItem eventKey={2}>Sages</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to="/about">
          <NavItem eventKey={1}>About</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
};

export default TopNav;
