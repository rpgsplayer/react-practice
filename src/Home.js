import React, { useContext } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import AuthenticationContext from './AuthenticationContext';

function Home() {
  const history = useHistory();
  const { setLoggedIn } = useContext(AuthenticationContext);

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/login');
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={logout}>Logout</Nav.Link>
            <NavDropdown title="Examples" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Pagination</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar> 
    </div>
  );
}

export default Home;
