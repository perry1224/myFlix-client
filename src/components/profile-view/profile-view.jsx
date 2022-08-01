import React from 'react';

import axios from 'axios';

import "./profile-view.scss";
import { Button, Col, Container, Row } from 'react-bootstrap';

import  FavoriteMovieView from './favorite-movie-view';
import  UpdateView  from './update-view';

import { setUser } from '../../actions/actions';
import { connect } from 'react-redux';



export function ProfileView(props) {
  console.log('profile view')
  const {movies, user} = props
  
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');


  const handleDelete = () => {
    axios.delete(`https://myshowflix.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The account ${user.Username} was successfully deleted.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Container id="profile-form" key={movies._id}>
      <Row><h4>Your Profile</h4></Row>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.Username}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">******</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.Birthday}</Col>
        </Row>
        <Row className="mt-5"><h4>Your Favorite Movies</h4></Row>
        <Row className="mt-3">
          <FavoriteMovieView 
          
          movies={movies} 
          favoriteMovies={user.FavoriteMovies} 
          currentUser={currentUser} 
          token={token}/>
        </Row>
        <UpdateView user={user}/>
        <Button className="d-block mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(ProfileView);