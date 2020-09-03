import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="center">
      <Container>
        <Row className="justify-content-center">
          <Col md={4}>
            <h1 className="text-center">Welcome</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={4}>
            <Link to="/login">
              <Button variant="outline-primary" block>
                Login
              </Button>
            </Link>
          </Col>
        </Row>
        <br/>
        <Row className="justify-content-center">
          <Col md={4}>
            <Link to="/register">
              <Button variant="outline-danger" block>
                Register
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Welcome;
