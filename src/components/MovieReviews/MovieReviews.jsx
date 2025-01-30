import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieReviews.module.css";

import { getMovieExtraInfo } from "../../data/themoviedb-api/themoviedb.js";
import Loader from "../Loader/Loader.jsx";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  const fetchMovieReviews = async () => {
    setLoading(true);
    const { results } = await getMovieExtraInfo(movieId, "reviews");
    setReviews(results ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovieReviews(movieId);
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!reviews.length) {
    return <p>We don&#39;t have any reviews for this movie.</p>;
  }
  return (
    <ul className={css.MovieReviews}>
      {reviews.map((review) => (
        <li key={review.id}>
          <h4>Author: {review.author}</h4>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
