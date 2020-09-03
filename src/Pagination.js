import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Card, Spinner } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import AuthenticationContext from './AuthenticationContext';

function Pagination() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);

  const history = useHistory();
  const { setLoggedIn } = useContext(AuthenticationContext);

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/login');
  };

  const handlePageClick = data => {
    setIsLoading(true);
    fetch('http://react-practice/news?page=' + (data.selected + 1), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json.data);
      });
  }

  useEffect(() => {
    fetch('http://react-practice/news?page=1', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json.data);
        setLastPage(json.last_page);
      });
  }, []);

  return (
    <div>
      <Navbar bg="light" expand="lg" sticky="top">
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
      <br/>
      <Container>
        <Row>
          { 
            isLoading
            ?
              <Col className="text-center">
                <Spinner animation="border" role="status" variant="primary">
                </Spinner>
              </Col>
            :
              data.map(news =>
                <Col key={news.news_id} md={3}>
                  <Card style={{ width: '18rem' }} className="h-100">
                    <Card.Body style={{ position: 'relative' }}>
                      <Card.Title><b>{news.headline}</b></Card.Title>
                      <Card.Text>{news.abstract}</Card.Text>
                      <br/>
                      <Button style={{ position: 'absolute', bottom: 10, 'margin-left': 15, 'margin-right': 20, left: 0, right: 0, 'text-align': 'center' }} href={news.url} target="_blank">Read News</Button>
                    </Card.Body>
                  </Card>
                </Col> 
              )
          }
        </Row>
        <br/>
        <Row>
          <Col>
            <ReactPaginate
              pageCount={lastPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Pagination;
