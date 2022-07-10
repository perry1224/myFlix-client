import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
  };

  return (
    <Form>
      <Form.Group>
      <h2>Welcome to the registration page!</h2>
      <Form.Label>Username:</Form.Label>
        <Form.Control
        type="text" 
        value={username} 
        onChange={e => setUsername(e.target.value)} required
        placeholder="Enter username" 
        />
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
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control 
          type="email" v
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required
          placeholder="Enter e-mail"
          />
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthdate:</Form.Label>
        <Form.Control 
        type="date" 
        value={birthdate} 
        onChange={e => setBirthdate(e.target.value)} 
        required
        />
      </Form.Group>

      <Button variant="primary" type="Submit" 
        onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  ); 
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};