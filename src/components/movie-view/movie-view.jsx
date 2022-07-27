import React from 'react';
import "./movie-view.scss";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { setUser } from '../../actions/actions'
import { connect } from 'react-redux';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  addMovie(movie) {
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);

    axios.post(`https://myshowflix.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.props.setUser(response.data)
        console.log(response.data);
        alert(`${movie.Title} has been added from your list.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  delFavMovie = (movie) => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("user");
    console.log(movie);
    console.log(token);
    axios
      .delete(
        `https://myshowflix.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.props.setUser(response.data)
        console.log(response.data);
        alert(`${movie.Title} has been removed from your list.`);
      })
      .catch((e) => {
        console.log("Error");
      });
  };


  render() {
    const { movie, onBackClick, user } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} crossOrigin='anonymous' height= '200' />
        </div>

        <dl>
          <dt>Title:</dt>
          <dd>{movie.Title}</dd>
        </dl>
      
      <dl>
        <dt>Description</dt>
        <dd>{movie.Description}</dd>
        <dt>Director:</dt>
        <dd>
          { movie.Director.Name }
            {/* <dt>BIO:</dt> */}
            {/* <dd>{movie.Director.BIO}</dd> */}
            {/* <dt>DOB:</dt> */}
            {/* <dd>{movie.Director.DOB}</dd> */}
            
          
        </dd>
      </dl>


<dl>
  <dt>Genre:</dt>
  <dd>{movie.Genre.Name}</dd>
  {/* <dt>Description:</dt> */}
  {/* <dd>{movie.Genre.Description}</dd> */}
</dl>
<Button variant="dark" onClick={() => { onBackClick(null); }}>« Back</Button>
<Link to={`/genre/${movie.Genre.Name}`}>
  <Button variant="info">Genre Info</Button>
</Link> 
 <Link to={`/director/${movie.Director.Name}`}>
  <Button variant="success">Director Info</Button>
</Link>
<Button 
    onClick={() => {
        this.addMovie(movie);
          }} > Add to favorites </Button>
<Button 
    onClick={() => {
        this.delFavMovie(movie);
          }}>Remove from favorites</Button>

      </div>
    );
  }
}

let mapStateToProps = state => {
  console.log('hello')
  return { movies: state.movies, user: state.user }

}

export default connect(mapStateToProps, { setUser })(MovieView);
