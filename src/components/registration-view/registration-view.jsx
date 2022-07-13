import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "./registration-view.scss";
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

   // Validate user inputs
   const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email Required');
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("You must enter a valid email address");
      isReq = false
    }
    return isReq;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios.post('https://myshowflix.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
        
          console.log(data);
          alert("Registration successful, please login!");
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
    }
  };


 // const handleSubmit = (e) => {
   // e.preventDefault();
   // console.log(username, password, email, birthdate);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  //  props.onRegistration(username);
 // };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
            <Card.Title>Please Register</Card.Title>
            <Form>
              <Form.Group>
              
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)} required
                placeholder="Enter username" 
                />
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

              <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} required
                minLength="6"
                placeholder="Minimum 6 characters"
                />
                {passwordErr && <p>{passwordErr}</p>}
              </Form.Group>

              <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required
                placeholder="Enter e-mail"
                />
                {emailErr && <p>{emailErr}</p>}
              </Form.Group>

              <Form.Group>
              <Form.Label>Birthday:</Form.Label>
              <Form.Control 
                type="date" 
                value={birthday} 
                onChange={e => setBirthday(e.target.value)} 
                required
                />
                {birthdayErr && <p>{birthdayErr}</p>}
              </Form.Group>

          

              <Button variant="primary" type="Submit" 
                onClick={handleRegister}>
                Register
              
       
              </Button>
              </Form>  
              </Card.Body>
            </Card>
          
        </Col>
      </Row>
    </Container>
  ); 
}

//RegistrationView.propTypes = {
  //Email: PropTypes.string.isRequired,
  //Birthday: PropTypes.instanceOf(Date).isRequired,
  //Username: PropTypes.string.isRequired,
 // Password: PropTypes.string.isRequired
//};