import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";

import { MdArrowBack } from "react-icons/md";

import { getMovieById } from "../../data/themoviedb-api/themoviedb.js";

import Loader from "../../components/Loader/Loader.jsx";
import MovieAdditionalInfo from "../../components/MovieAdditionalInfo/MovieAdditionalInfo.jsx";
import MovieOverview from "../../components/MovieOverview/MovieOverview.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";

import css from "./MovieDetailsPage.module.css";

const getInitialMovieDetailsState = () => ({
  movieInfo: null,
  error: null,
  loading: true,
});

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movieState, setMovieState] = useState(getInitialMovieDetailsState());
  const backUrl = useRef(location.state || "/movies");

  const fetchMovieDetails = async (id) => {
    setMovieState((currentState) => ({ ...currentState, loading: true }));
    try {
      const details = await getMovieById(id);

      setMovieState((currentState) => ({
        ...currentState,
        movieInfo: details,
      }));
    } catch {
      setMovieState((currentState) => ({ ...currentState, error: true }));
    } finally {
      setMovieState((currentState) => ({ ...currentState, loading: false }));
    }
  };

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, [movieId]);

  if (movieState.error) {
    return <NotFoundPage />;
  }

  if (movieState.loading) {
    return <Loader />;
  }

  return (
    <div className={css.MovieDetailsPage}>
      <Link className={css.MovieDetailsBackLink} to={backUrl.current}>
        <MdArrowBack />
        Go back
      </Link>
      <MovieOverview details={movieState.movieInfo} />
      <MovieAdditionalInfo details={movieState.movieInfo} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
