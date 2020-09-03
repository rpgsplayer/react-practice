import React, { useState } from 'react';
import { Form, Container, Col, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from "react-router-dom";
import AlertModal from './AlertModal';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  
  const history = useHistory();
  const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
  const schema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    dob: yup.date().max(new Date()).required(),
    address: yup.string().required(),
    phone_no: yup.string().matches(phoneRegExp, 'phone number is not valid').required(),
    occupation: yup.string(),
    password: yup.string().required().min(8),
    password_confirm: yup.string().required().min(8).oneOf([yup.ref('password'), null], 'password doesn\'t match')
  });

  return (
    <Container className="mt-2">
      <Formik
        validationSchema={schema}
        onSubmit={values => {
          setIsLoading(true);
          fetch('http://react-practice/users', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          }).then((response) => response.json())
            .then((json) => {
              setIsLoading(false);
              if(json.success) {
                setModalTitle('Success');
                setModalMessage('Registration successful. You will be redirected to login page shortly.');
                setShowModal(true);
                setTimeout(() => {
                  setShowModal(false);
                  history.push('/login');
                }, 3000);
              }
              else {
                console.log(json);
                setModalTitle('Error');
                setModalMessage(json.email);
                setShowModal(true);
              }
            });
        }}
        initialValues={{
          first_name: '',
          last_name: '',
          gender: '',
          email: '',
          dob: '',
          address: '',
          phone_no: '',
          occupation: '',
          password: '',
          password_confirm: ''
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
              <Form.Group as={Col} controlId="firstName" md={6}>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={values.first_name} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.first_name && !errors.first_name}
                  isInvalid={touched.first_name && errors.first_name} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="lastName" md={6}>
                <Form.Label>Last name</Form.Label>
                <Form.Control 
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={values.last_name} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.last_name && !errors.last_name}
                  isInvalid={touched.last_name && errors.last_name} 
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="gend" md={6}>
                <Form.Label>
                  Gender
                </Form.Label>
                <Form.Check
                  type="radio"
                  label="male"
                  value="male"
                  name="gender"
                  id="gender1"
                  feedback={errors.gender || 'Looks good!'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.gender && !errors.gender}
                  isInvalid={touched.gender && errors.gender} 
                />
                <Form.Check
                  type="radio"
                  label="female"
                  value="female"
                  name="gender" 
                  id="gender2"
                  feedback={errors.gender || 'Looks good!'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.gender && !errors.gender}
                  isInvalid={touched.gender && errors.gender}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="email" md={6}>
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
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="dob" md={6}>
                <Form.Label>Date of birth</Form.Label>
                <Form.Control 
                  type="date" 
                  name="dob"
                  placeholder="Enter your birth date"
                  value={values.dob} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.dob && !errors.dob}
                  isInvalid={touched.dob && errors.dob}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="address" md={6}>
                <Form.Label>Address</Form.Label>
                <Form.Control 
                  as="textarea" 
                  placeholder="Enter your address"
                  value={values.address} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.address && !errors.address}
                  isInvalid={touched.address && errors.address}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="phone_no" md={6}>
                <Form.Label>Phone number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your phone number"
                  value={values.phone_no} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.phone_no && !errors.phone_no}
                  isInvalid={touched.phone_no && errors.phone_no}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.phone_no}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="occupation" md={6}>
                <Form.Label>Occupation</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your occupation" 
                  value={values.occupation} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.occupation && !errors.occupation}
                  isInvalid={touched.occupation && errors.occupation}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.occupation}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="password" md={6}>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
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
              <Form.Group as={Col} controlId="password_confirm" md={6}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Confirm your password" 
                  value={values.password_confirm} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password_confirm && !errors.password_confirm}
                  isInvalid={touched.password_confirm && errors.password_confirm}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.password_confirm}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
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
          </Form>
        )}
      </Formik>
      <AlertModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </Container>
  );
}

export default Register;
