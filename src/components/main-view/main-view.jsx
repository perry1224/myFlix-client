import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Row, Col, } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      shouldregistered: false
  };
  }
  componentDidMount(){
    axios.get('https://myshowflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

onLoggedIn(user) {
  this.setState({
    user
  });
}
// When a user successfully register, this function updates the user properties
  navigateRegistration(x) {
    this.setState({
      shouldregistered:x,
    });
  }
onRegistration() {
  this.navigateRegistration(false)
}


 render() {
  const { movies, selectedMovie, user, shouldregistered } = this.state;

/* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
  if (!user) { 
    if (shouldregistered)
    return (
    <RegistrationView
      onRegistration={(register) => this.onRegistration(register)}
    />
  );
    
    return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegistration={() => this.navigateRegistration(true) } />  
  }

  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col key={movie._id} md={3}>
              <MovieCard movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
             
            </Col>
          ))
        }
      </Row>
    );
  }
}