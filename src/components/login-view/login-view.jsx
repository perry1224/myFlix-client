import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

    // declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState("");
    const [ passwordErr, setPasswordErr ] = useState("");
  
    // validate user inputs
    const validate = () => {
      let isReq = true;
      if (!username){
        setUsernameErr("Username Required");
        isReq = false;
      } else if (username.length < 5) {
        setUsernameErr("Username but be 5 characters or more");
        isReq = false;
      }
      if (!password) {
        setPasswordErr("Password Required");
        isReq = false;
      } else if (password.length < 6) {
        setPasswordErr("Password must be 6 characters or more");
        isReq = false;
      }
  
      return isReq;
    }
  

const handleSubmit = (e) => {
  e.preventDefault();
  const isReq = validate();
  if (isReq) {
  /* Send a request to the server for authentication */
  axios.post('https://myshowflix.herokuapp.com/login', {
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
  }
};




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
          {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} required
        placeholder="Enter password" />
        {passwordErr && <p>{passwordErr}</p>}

      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>

      <Link to={`/register`}>
  <Button variant="secondary">Register</Button>
</Link>

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