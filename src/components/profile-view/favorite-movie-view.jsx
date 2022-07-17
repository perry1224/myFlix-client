import React, {  useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';



export function FavoriteMovieView(props) {
  const { movies, favoriteMovies, currentUser, token } = props;
  
  const favoriteMoviesList = movies.filter(m => {
   favoriteMovies.includes(m._id) 
   return favoriteMovies.includes(m._id)
  })

  const handleMovieDelete = (movie) =>{
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);
    axios.delete(`https://myshowflix.herokuapp.com/users/${username}/movies/${movies._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was successfully deleted.`)
      window.open('/users/:username', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <>
      {favoriteMoviesList.length === 0 ? (
          <p>You have no favorite movies yet.</p>
          ) : (
            favoriteMoviesList.map((movie) => {
              return (
              <Col xs={10} sm={8} md={6} lg={4} key= {movies._id}>
                <Card id="movie-card">
                  <Link to={`/movies/${movies._id}`}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                      <Button className="button" variant="outline-primary" size="sm">Open</Button>
                    </Link>
                    <Button 
                    className="button ml-2" 
                    variant="outline-primary" 
                    size="sm" onClick={()=> {handleMovieDelete(movie._id)}} >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })
          )
        }
    </>
  )
}