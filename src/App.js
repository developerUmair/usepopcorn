import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Numresults from "./components/Numresults";
import Search from "./components/Search";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import StarRating from "./components/StarRating";
import TextExapnder from "./components/TextExapnder";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [movieRating, setMovieRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /*   useEffect(() => {
    console.log('C')
  }, [])

  useEffect(() => {
    console.log('B')
  })
  useEffect(() => {
    console.log('D')
  }, [query])


  console.log('A') */

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal; // Correctly access the signal
  
    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
          { signal }  // Pass the signal to the fetch request
        );
        if (!res.ok) throw new Error("Something went wrong with fetching movies.");
        
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found.");
        
        setMovies(data.Search);  // Update state with the fetched movies
      } catch (error) {
        // Check if the error is due to the abort, otherwise handle the error
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);  // Always stop the loading state
      }
    }
  
    if (query) {
      fetchMovies();
    }
  
    // Cleanup function to abort the fetch request if component unmounts or query changes
    return () => {
      controller.abort();  // Correctly call the abort method
    };
  }, [query]);
  

  // function to add move in watched list

  const handleAddWatched = (movie) => {
    setWatched((prevWatched) => [...prevWatched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((prevWatched) =>
      prevWatched.filter((movie) => movie.imdbID !== id)
    );
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {loading ? (
            <h3 className="loader">Loading...</h3>
          ) : (
            <MovieList movies={movies} />
          )} */}
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <span className="error">⛔ {error}</span>}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}

          {/* <StarRating
            maxRating={5}
            messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
            // defaultRating={}
            onSetRating={setMovieRating}
          />
          <h3>Rating for the movie {movieRating}</h3> */}
        </Box>
      </Main>
      {/* <TextExapnder limit={20} expanded={false}>
        Create a simple game using React.js that allows users to play, track
        their scores, and save their progress. The game should have the
        following features Design an interactive game
        with a simple user interface using React.js (e.g., a basic memory or
        number guessing game).The game should allow users to play and
        accumulate scores based on their performance.
      </TextExapnder> */}
    </>
  );
}
