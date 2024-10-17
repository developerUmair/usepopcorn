import React from "react";

const WatchedMovie = ({ movie, onDeleteWatched }) => {

  const handleDelete = movie => onDeleteWatched(movie)
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button onClick={handleDelete(movie.imdbID)}>Delete</button>
    </li>
  );
};

export default WatchedMovie;
