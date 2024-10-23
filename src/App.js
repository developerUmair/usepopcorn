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
import CurrencyConvertor from "./components/CurrencyConvertor";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export default function App() {
  // const [watched, setWatched] = useState([]);

  const [movieRating, setMovieRating] = useState(0);
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], 'watched')

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

  // function to add move in watched list

  const handleAddWatched = (movie) => {
    setWatched((prevWatched) => [...prevWatched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
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

      {/* <CurrencyConvertor /> */}
    </>
  );
}
