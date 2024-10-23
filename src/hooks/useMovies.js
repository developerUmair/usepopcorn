import { useEffect, useState } from "react";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal; // Correctly access the signal

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}`,
          { signal } // Pass the signal to the fetch request
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies.");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found.");

        setMovies(data.Search); // Update state with the fetched movies
      } catch (error) {
        // Check if the error is due to the abort, otherwise handle the error
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false); // Always stop the loading state
      }
    }

    if (query) {
      //   handleCloseMovie();
      fetchMovies();
    }

    // Cleanup function to abort the fetch request if component unmounts or query changes
    return () => {
      controller.abort(); // Correctly call the abort method
    };
  }, [query]);

  return { movies, loading, error };
}
