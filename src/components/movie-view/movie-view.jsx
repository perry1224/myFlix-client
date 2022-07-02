import React from 'react';

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

        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">
            {movie.Director.Name + 
              ' BIO: ' + 
              movie.Director.BIO +
              ' DOB: ' + 
              movie.Director.DOB}
          </span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">
            {movie.Genre.Name + ' Description: ' + movie.Genre.Description}
          </span> </div>

        <button onClick={() => { onBackClick(null); }}>Back</button>

      </div>
    );
  }
}

