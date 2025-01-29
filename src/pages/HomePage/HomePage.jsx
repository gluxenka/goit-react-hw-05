import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getMoviesTrendingList,
  searchMovies,
} from "../../data/themoviedb-api/themoviedb.js";

export default function HomePage() {
  const [trendingLinks, setTrendingLinks] = useState([]);
  const location = useLocation();

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
      <ul>
        {trendingLinks.map(({ id, title }, index) => (
          <li key={id}>
            <Link to={`/movies/${id}`} state={location}>
              {index + 1}. {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
