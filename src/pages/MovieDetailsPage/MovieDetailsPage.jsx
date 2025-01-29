import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { MdArrowBack } from "react-icons/md";

import { getMovieById } from "../../data/themoviedb-api/themoviedb.js";

import Loader from "../../components/Loader/Loader.jsx";
import MovieAdditionalInfo from "../../components/MovieAdditionalInfo/MovieAdditionalInfo.jsx";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieOverview from "../../components/MovieOverview/MovieOverview.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.jsx";

import css from "./MovieDetailsPage.module.css";

const getInitialMovieDetailsState = () => ({
  movieInfo: null,
  error: null,
  loading: true,
});

export default function MovieDetailsPage() {
  const { movieId, section } = useParams();
  const location = useLocation();
  const [movieState, setMovieState] = useState(getInitialMovieDetailsState());
  const backUrl = useMemo(() => location.state || "/movies", [location]);
  const showCastSection = useMemo(() => section === "cast", [section]);
  const showReviewsSection = useMemo(() => section === "reviews", [section]);

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
      <Link className={css.MovieDetailsBackLink} to={backUrl}>
        <MdArrowBack />
        Go back
      </Link>
      <MovieOverview details={movieState.movieInfo} />
      <MovieAdditionalInfo details={movieState.movieInfo} />
      {showCastSection && <MovieCast details={movieState.movieInfo} />}
      {showReviewsSection && <MovieReviews details={movieState.movieInfo} />}
    </div>
  );
}
