import React from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className="center">
      <Container>
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
        <br/>
      </Container>
    </div>
  );
}

export default Loading;
