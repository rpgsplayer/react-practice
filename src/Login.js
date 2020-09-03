import React, { useState, useContext } from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";
import { Form, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import * as yup from 'yup';
import AlertModal from './AlertModal';
import AuthenticationContext from './AuthenticationContext';

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialMedia, setIsSocialMedia] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const history = useHistory();
  const { loggedIn, setLoggedIn } = useContext(AuthenticationContext);
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
  });

  const responseGoogle = (response) => {
    console.log(response);
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    loggedIn
    ?
      <Redirect to="/home" />
    :
      !isSocialMedia
      ?
        <div className="center">
          <Container>
            <Formik
              validationSchema={schema}
              onSubmit={result => {
                setIsLoading(true);
                fetch('http://react-practice/sessions', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(result)
                }).then((response) => response.json())
                  .then((json) => {
                    setLoggedIn(json.success);
                    if(json.success) {
                      if(result.keep_login) {
                        sessionStorage.removeItem('token');
                        localStorage.setItem('token', json.token);
                      }
                      else {
                        localStorage.removeItem('token');
                        sessionStorage.setItem('token', json.token);
                      }
                      history.push('/home');
                    }
                    else {
                      setModalTitle('Error');
                      setModalMessage(json.message);
                      setShowModal(true);
                    }
                    setIsLoading(false);
                  });
              }}
              initialValues={{
                email: '',
                password: '',
                keep_login: ''
              }}
            >
              {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <h1 className="text-center">Login</h1>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email"
                          placeholder="Enter your email"
                          value={values.email} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="password"
                          placeholder="Enter your password"
                          value={values.password} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      <Form.Group controlId="keep_login">
                        <Form.Check 
                          type="checkbox"
                          name="keep_login"
                          value="true"
                          label="Keep me logged in"
                          feedback={errors.keep_login || 'Looks good!'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.keep_login && !errors.keep_login}
                          isInvalid={touched.keep_login && errors.keep_login} 
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col md={{ span: 6, offset: 3 }}>
                      {isLoading 
                        ?
                          <Button variant="primary" block disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          &nbsp;Loading...
                          </Button>
                        :
                          <Button variant="primary" type="submit" block>
                            Submit
                          </Button>
                      }
                    </Col>
                  </Form.Row>
                  <br/>
                </Form>
              )}
            </Formik>
            <Form>
              <Form.Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <Button variant="secondary" type="button" block onClick={() => setIsSocialMedia(true)}>
                    Login with Social Media
                  </Button>
                </Col>
              </Form.Row>
            </Form>
            <AlertModal 
              show={showModal}
              onHide={() => setShowModal(false)}
              title={modalTitle}
              message={modalMessage}
            />
          </Container>
        </div>
      :
        <div className="center">
          <Container>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <h1 className="text-center">Login</h1>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <GoogleLogin
                  clientId="react-practice-282807"
                  buttonText="Login with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  className="btn-block"
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <FacebookLogin
                  appId="1088597931155576"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  className="btn-block"
                />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Button variant="secondary" type="button" block onClick={() => setIsSocialMedia(false)}>
                  Back
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
  );
}

export default Login;
