import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';

const handleSubmit = (e) => {
  e.preventDefault();
  /* Send a request to the server for authentication */
  axios.post('https://myshowflix.herokuapp.com/users', {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user')
  });
};

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
     props.onLoggedIn(username, password);
  };

  const handleRegister = (e) => {
    e.preventDefault()
    console.log(props);
    props.onRegistration()
}

  return (
    <Container>
    <Row>
      <Col>
      
        <Card>
          <Card.Body>
          <Card.Title>Please Log In</Card.Title>
          <Form>
      <Form.Group controlId="formUsername">
       
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          type="text"
          onChange={e => setUsername(e.target.value)} required
          placeholder="Enter username"
          />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} required
        placeholder="Enter password" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="secondary" type="submit" onClick={handleRegister}>
      Register Here
      </Button>
    </Form>
          </Card.Body>
        </Card>
        </Col>
      </Row>
  </Container>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};