import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown, Card, Spinner } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthenticationContext from './AuthenticationContext';

function InfiniteScrolling() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const history = useHistory();
  const { setLoggedIn } = useContext(AuthenticationContext);

  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/login');
  };

  const fetchMoreData = () => {
    fetch('http://react-practice/news?page=' + (currentPage + 1), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        setCurrentPage(json.current_page);
        setData(data.concat(json.data));
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
        setLastPage(json.last_page);
        setData(json.data);
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
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={currentPage < lastPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {data.map(news =>
            <Row key={news.news_id}>
              <Col md={{ span: 6, offset: 3 }}>
                <Card style={{ width: '36rem' }} className="h-100">
                  <Card.Body>
                    <Card.Title><b>{news.headline}</b></Card.Title>
                    <Card.Text>{news.abstract}</Card.Text>
                    <div className="text-center">
                      <Button href={news.url} target="_blank">Read News</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col> 
            </Row>
          )}
        </InfiniteScroll>
      </Container>
    </div>
  );
}

export default InfiniteScrolling;
