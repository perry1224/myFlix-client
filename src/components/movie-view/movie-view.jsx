import React from 'react';
import "./movie-view.scss";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

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


      </div>
    );
  }
}

