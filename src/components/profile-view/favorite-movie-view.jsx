import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';
import { setUser } from '../../actions/actions';
import { connect } from 'react-redux';


export function FavoriteMovieView(props) {
  const { movies, favoriteMovies, setUser } = props;
  
  const favoriteMoviesList = movies.filter(m => {
   favoriteMovies.includes(m._id) 
   return favoriteMovies.includes(m._id)
  })

  const handleMovieDelete = (movieId) =>{
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios.delete(`https://myshowflix.herokuapp.com/users/${username}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      setUser(response.data)
      alert(`The movie was successfully deleted.`)
    
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
              <Col key= {movie._id} xs={10} sm={8} md={6} lg={4} >
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

let mapStateToProps = state => {
  console.log('hello')
  return { movies: state.movies, user: state.user }

}

export default connect(mapStateToProps, { setUser })(FavoriteMovieView);
