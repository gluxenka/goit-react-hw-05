import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import css from "./MovieReviews.module.css";

import { getMovieExtraInfo } from "../../data/themoviedb-api/themoviedb.js";

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  const fetchMovieReviews = async () => {
    const { results } = await getMovieExtraInfo(movieId, "reviews");
    setReviews(results);
  };

  useEffect(() => {
    fetchMovieReviews(movieId);
  }, [movieId]);

  if (!reviews) {
    return <p>We don&#39;t have nay reviews for this movie.</p>;
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
