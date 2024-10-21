import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const watchedIMdbIDs = watched.map((movie) => movie.imdbID);
  const isWatched = watchedIMdbIDs.includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${selectedId}`
        );

        if (!res.ok)
          throw new Error("Something went wrong in fetching movie details");
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {}
    };
    fetchMovieDetails();
  }, [selectedId]);

  // const [avgRating, setAvgRating] = useState(0);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(" ")[0],
      userRating,
    };

    if (!isWatched) {
      onAddWatched(newWatchedMovie);
    }

    onCloseMovie();
    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating + userRating) /2)
    // setAvgRating((avgRating) => (avgRating + userRating) / 2);
    // alert(avgRating)
  };

  /* eslint-disable */

  // if (imdbRating > 8) {
  //   const [top, setTop] = useState(false);
  // }

  // if(imdbRating > 8) return <h2>Testing the early return.</h2>
  // updating title of the page

  // const [top, setTop] = useState(imdbRating > 8);
  // console.log(top)

  // useEffect(() => {
  //   setTop(imdbRating > 8)
  // }, [imdbRating])

  const top = imdbRating > 8;
  console.log(top);

  useEffect(() => {
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("CLOSING!");
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button onClick={onCloseMovie} className="btn-back">
              &larr;
            </button>
            <img src={poster} loading="lazy" alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>
          {/* <h2>{avgRating}</h2> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={26}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You already rated {watchedUserRating} 🌟</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
