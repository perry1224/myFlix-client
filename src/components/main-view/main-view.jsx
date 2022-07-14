import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { Navbar } from "../navbar-view/navbar-view";
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
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myshowflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      userData: authData.user
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
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
  const { movies, user } = this.state;

  // if (!user) return <Row>
  //   <Col>
  //     <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
  //   </Col>
  // </Row>
  // if (movies.length === 0) return <div className="main-view" />;

  return (
    <Router>
      <Navbar></Navbar>
      
      <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
          if (!user) return <Col>
          <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        </Col>

        if (movies.length === 0) return <div className="main-view" />;

        return movies.map(m => (
          <Col md={3} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))
      }} />
      <Route path="/register" render={() => {
        if (user) return <Redirect to="/" />
        return <Col>
          <RegistrationView />
        </Col>
        }} />

       <Route path="/movies/:movieId" render={({ match, history }) => { 
        console.log(movies, match, movies.find(m => m._id === match.params.movieId))
        return <Col md={8}>
          <MovieView movie={movies.find(m => m._id === match.params.movieId)} 
            onBackClick={() => history.goBack()} />
            </Col>
        }} />

        <Route path="/director/:Name" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} 
            onBackClick={() => history.goBack()} />
          </Col>  
          }} />

        <Route path="/genre/:Name" render={({ match, history }) => {
          
          if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} 
            onBackClick={() => history.goBack()}/>
          </Col>
          }} />
      </Row>
      
    </Router>
  );
}
}