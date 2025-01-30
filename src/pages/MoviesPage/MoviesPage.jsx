import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchMovies } from "../../data/themoviedb-api/themoviedb.js";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchLinks, setSearchLinks] = useState([]);
  const query = searchParams.get("query");

  const fetchMoviesList = async (query) => {
    let moviesList = [];

    try {
      moviesList = await searchMovies(query);
    } finally {
      setSearchLinks(moviesList);
    }
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    fetchMoviesList(query);
  }, [query]);

  const updateSearchParams = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    setSearchParams(updatedParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    updateSearchParams("query", form.elements.query.value);
    form.reset();
  };

  return (
    <div>
      <h1>MoviesPage</h1>
      <form onSubmit={handleSubmit}>
        <input name="query" type="text" />
        <button type="submit">Search</button>
      </form>

      <MovieList items={searchLinks} />
    </div>
  );
}
