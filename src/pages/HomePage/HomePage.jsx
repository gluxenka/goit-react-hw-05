import { useEffect, useState } from "react";
import { getMoviesTrendingList } from "../../data/themoviedb-api/themoviedb.js";
import MovieList from "../../components/MovieList/MovieList.jsx";

export default function HomePage() {
  const [trendingLinks, setTrendingLinks] = useState([]);

  const fetchMoviesList = async () => {
    let moviesList = [];
    try {
      moviesList = await getMoviesTrendingList("day");
    } finally {
      setTrendingLinks(moviesList);
    }
  };

  useEffect(() => {
    fetchMoviesList();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList items={trendingLinks} />
    </div>
  );
}
